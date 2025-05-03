import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";

const Admin = () => {
  const navigate = useNavigate();
  const { adminLogin, error, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username) {
      errors.username = "Username is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await adminLogin(formData.username, formData.password);

    if (result.success) {
      navigate("/productList");
    }
  };

  return (
    <AuthForm
      title="Admin Login"
      submitText="Login as Admin"
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
    >
      <p>admin@FoodieFiesta.com</p>
      <FormInput
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Admin Username"
        required
        error={formErrors.username}
      />
      <p>admin</p>
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Admin Password"
        required
        error={formErrors.password}
      />
    </AuthForm>
  );
};

export default Admin;
