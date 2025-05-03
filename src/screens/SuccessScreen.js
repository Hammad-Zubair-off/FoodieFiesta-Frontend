import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../actions/cartActions";
import { FaCheckCircle, FaShoppingBag, FaClipboardList } from "react-icons/fa";
import "../styles/SuccessScreen.css";

const SuccessScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart after successful payment
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Container fluid className="success-container">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6}>
          <Card className="success-card">
            <Card.Body className="p-5">
              <div className="text-center">
                <div className="success-icon">
                  <FaCheckCircle size={100} />
                </div>
                <h1 className="success-title">Payment Successful!</h1>
                <p className="success-message">
                  Thank you for your order. Your payment has been processed
                  successfully. We'll send you an email with your order details
                  shortly.
                </p>
                <div className="success-buttons d-grid gap-3">
                  <Link to="/menu" className="text-decoration-none">
                    <Button className="btn-continue w-100 d-flex align-items-center justify-content-center gap-2">
                      <FaShoppingBag />
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link to="/orders" className="text-decoration-none">
                    <Button className="btn-view-orders w-100 d-flex align-items-center justify-content-center gap-2">
                      <FaClipboardList />
                      View Orders
                    </Button>
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessScreen;
