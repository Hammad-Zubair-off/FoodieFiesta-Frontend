import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../shared/axiosInstance";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const ProceedToCheckout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartReducer || { cartItems: [] });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "PK",
  });

  const { cartItems } = cart;

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
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

      //  checkout session using axiosInstance
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
        ) : (
          "Proceed to Checkout"
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
      `}</style>
    </div>
  );
};

export default ProceedToCheckout;
