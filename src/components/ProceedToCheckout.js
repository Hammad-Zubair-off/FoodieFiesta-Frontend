import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../shared/axiosInstance";
import { clearCartItems } from "../reducers/cartReducer"; // Import the clear cart action

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const ProceedToCheckout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartReducer || { cartItems: [] });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "PK",
  });

  const { cartItems } = cart;

  // Calculate subtotal from cart items
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Handle changes to the shipping address form fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes to the payment method selection
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Process Cash on Delivery orders
  const handleCashOnDelivery = async () => {
    // Validate cart has items
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
      return;
    }

    // Validate shipping address is complete
    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zipCode
    ) {
      toast.error("Please fill in all shipping address fields");
      return;
    }

    try {
      setLoading(true);
      
      // Format the order data according to the Order model schema
      const orderData = {
        items: cartItems.map(item => ({
          pizza: item.pizza._id, // Send just the ID reference
          quantity: item.quantity,
          price: item.price
          // Note: 'size' is not in your Order schema, so we don't include it
        })),
        totalAmount: calculateSubtotal(),
        shippingAddress: shippingAddress,
        // These are optional according to your schema and have defaults
        status: 'pending',
        paymentStatus: 'pending'
      };
      
      console.log("Sending order data:", orderData);
      
      // Create order with data structured for the Order model
      const response = await axiosInstance.post("/orders", orderData);
      
      setLoading(false);
      
      // Check if the order was successfully created
      if (response.data.success) {
        // Clear cart after successful order
        dispatch(clearCartItems());
        
        // Redirect to success page
        navigate("/success", { 
          state: { 
            orderId: response.data.order._id,
            paymentMethod: "Cash on Delivery" 
          } 
        });
      } else {
        throw new Error(response.data.message || "Order creation failed");
      }
      
    } catch (error) {
      console.error("Order creation error:", error);
      // Show more detailed error message for debugging
      if (error.response) {
        console.error("Error response data:", error.response.data);
        toast.error(
          `Order failed: ${error.response.data.message || "Server error"}`
        );
      } else {
        toast.error(`Order failed: ${error.message}`);
      }
      setLoading(false);
    }
  };

  // Process Stripe checkout
  const handleStripeCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
      return;
    }

    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zipCode
    ) {
      toast.error("Please fill in all shipping address fields");
      return;
    }

    try {
      setLoading(true);

      // Load Stripe
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error(
          "Failed to load Stripe. Please check your Stripe publishable key."
        );
      }

      // For Stripe, we'll need the full cart item details
      const response = await axiosInstance.post(
        "stripe/create-checkout-session",
        {
          cartItems: cartItems.map((item) => ({
            ...item,
            name: item.pizza.name,
            image: item.pizza.image,
            variant: item.size,
          })),
          shippingAddress,
        }
      );

      // Clear cart immediately after successful session creation
      dispatch(clearCartItems());

      if (!response.data.id) {
        throw new Error("Invalid session response from server");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        `Checkout failed: ${error.response?.data?.error || error.message}`
      );
      setLoading(false);
    }
  };

  // Route to appropriate payment handler based on selected method
  const handleCheckout = () => {
    if (paymentMethod === "cash") {
      handleCashOnDelivery();
    } else {
      handleStripeCheckout();
    }
  };

  return (
    <div className="proceed-checkout">
      <ToastContainer />
      <Form className="mb-4">
        <h5 className="mb-3">Shipping Address</h5>
        <Form.Group className="mb-3">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={shippingAddress.street}
            onChange={handleAddressChange}
            placeholder="Enter your street address"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleAddressChange}
            placeholder="Enter your city"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={shippingAddress.state}
            onChange={handleAddressChange}
            placeholder="Enter your state"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ZIP Code</Form.Label>
          <Form.Control
            type="text"
            name="zipCode"
            value={shippingAddress.zipCode}
            onChange={handleAddressChange}
            placeholder="Enter your ZIP code"
            required
          />
        </Form.Group>
        
        {/* Payment Method Selection */}
        <Form.Group className="mb-4">
          <h5 className="mb-3">Payment Method</h5>
          <div className="payment-options">
            <Form.Check
              type="radio"
              id="stripe-payment"
              name="paymentMethod"
              value="stripe"
              label="Pay with Stripe"
              checked={paymentMethod === "stripe"}
              onChange={handlePaymentMethodChange}
              className="mb-2"
            />
            <Form.Check
              type="radio"
              id="cash-payment"
              name="paymentMethod"
              value="cash"
              label="Cash on Delivery"
              checked={paymentMethod === "cash"}
              onChange={handlePaymentMethodChange}
            />
          </div>
        </Form.Group>
      </Form>
      <div className="subtotal">
        <h4>Subtotal: Rs. {calculateSubtotal().toFixed(2)}/-</h4>
        <p>
          Total Items:{" "}
          {cartItems.reduce((total, item) => total + item.quantity, 0)}
        </p>
      </div>
      <Button
        className="w-100"
        variant="success"
        disabled={cartItems.length === 0 || loading}
        onClick={handleCheckout}
      >
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Processing...
          </>
        ) : cartItems.length === 0 ? (
          "Cart is Empty"
        ) : paymentMethod === "cash" ? (
          "Order Now (Cash on Delivery)"
        ) : (
          "Pay with Stripe"
        )}
      </Button>
      <style jsx>{`
        .proceed-checkout {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-top: 20px;
        }
        .subtotal {
          margin-bottom: 15px;
        }
        .subtotal h4 {
          color: #28a745;
          margin-bottom: 10px;
        }
        .subtotal p {
          margin-bottom: 0;
          color: #6c757d;
        }
        .payment-options {
          padding: 10px;
          border-radius: 8px;
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default ProceedToCheckout;