import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Alert, Button, Spinner } from "react-bootstrap";
import "../styles/Auth.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If admin is already authenticated, redirect to admin dashboard
    if (isAuthenticated() && isAdmin()) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    // Update local error state when auth context error changes
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password, true);

      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="auth-overlay">
          <div className="auth-content">
            <h1>Admin Portal</h1>
            <p>Access the admin dashboard to manage your Food store.</p>
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-container">
          <h2 className="text-center mb-4">Admin Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <p className='m-0' >Default Credentials: <br />admin@FoodieFiesta.com</p>
              <p> Password: admin</p>


              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="mb-3">

              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="rememberMe"
                label="Remember me"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={loading}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" disabled={loading}>
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
                    Logging in...
                  </>
                ) : (
                  "Login as Admin"
                )}
              </Button>
              <Button
                variant="link"
                className="w-100"
                onClick={() => navigate("/login")}
              >
                Back to User Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
