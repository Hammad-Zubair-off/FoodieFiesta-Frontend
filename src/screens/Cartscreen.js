import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  fetchCartItems,
  removeFromCart,
  updateCartItemQuantity,
  clearCartItems,
} from "../reducers/cartReducer";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import ProceedToCheckout from "../components/ProceedToCheckout";
import "../styles/Cart.css";

const Cartscreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { cartItems, loading, error } = useSelector(
    (state) => state.cartReducer
  );
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a check to prevent multiple redirects
    let isMounted = true;
    
    const checkAuthAndLoadCart = async () => {
      try {
        if (isAuthenticated()) {
          dispatch(fetchCartItems());
        } else {
          // Save the current location to redirect back after login
          navigate("/login", { 
            state: { from: location.pathname }
          });
        }
      } catch (err) {
        console.error("Error in cart authentication:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    checkAuthAndLoadCart();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuthenticated, navigate, location]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity(itemId, newQuantity));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCartItems());
  };

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

  // Show loading while checking authentication or fetching cart
  if (isLoading || (loading && cartItems.length === 0)) {
    return (
      <Container className="cart-container d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="cart-container">
        <div className="alert alert-danger shadow-sm">{error}</div>
      </Container>
    );
  }

  return (
    <Container fluid className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">
          <FaShoppingCart className="cart-icon" />
          Shopping Cart
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <Card className="empty-cart-card text-center">
          <Card.Body>
            <div className="empty-cart-icon">
              <FaShoppingCart />
            </div>
            <h4>Your cart is empty</h4>
            <p className="text-muted">Add some delicious Foods to your cart!</p>
            <Link to="/menu" className="btn btn-primary btn-lg mt-3">
              <FaArrowLeft className="me-2" />
              Continue Shopping
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          <Col lg={7}>
            <div className="cart-items-container">
              {cartItems.map((item) => (
                <Card key={item?._id} className="cart-item-card mb-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={3} sm={2} className="text-center">
                        <img
                          src={item?.pizza?.image}
                          alt={item?.pizza?.name}
                          className="cart-item-image"
                        />
                      </Col>
                      <Col xs={9} sm={4}>
                        <h5 className="cart-item-name">{item?.pizza?.name}</h5>
                        <p className="cart-item-size">Size: {item?.size}</p>
                        <p className="cart-item-price">
                          ${item?.price?.toFixed(2)}
                        </p>
                      </Col>
                      <Col xs={6} sm={3}>
                        <div className="quantity-control">
                          <Button
                            variant="light"
                            className="quantity-btn"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                          >
                            <FaMinus />
                          </Button>
                          <div className="quantity-display">
                            {item?.quantity}
                          </div>
                          <Button
                            variant="light"
                            className="quantity-btn"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </Col>
                      <Col xs={4} sm={2} className="text-end">
                        <p className="cart-item-total">
                          ${(item?.price * item?.quantity).toFixed(2)}
                        </p>
                      </Col>
                      <Col xs={2} sm={1} className="text-end">
                        <Button
                          variant="link"
                          className="remove-item-btn"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>

          <Col lg={5}>
            <div className="cart-sidebar">
              <Card className="cart-summary-card mb-4">
                <Card.Body>
                  <h4 className="summary-title">Order Summary</h4>
                  <div className="summary-item">
                    <span>Subtotal</span>
                    <span className="text-primary fw-bold">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <hr />
                  <div className="summary-item total">
                    <span>Total</span>
                    <span className="text-primary fw-bold">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <Button
                    variant="outline-danger"
                    className="clear-cart-btn w-100 mb-3"
                    onClick={handleClearCart}
                  >
                    <FaTrash className="me-2" />
                    Clear Cart
                  </Button>
                  <ProceedToCheckout />
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cartscreen;