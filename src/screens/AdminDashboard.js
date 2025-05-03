import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Alert,
  Modal,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import { theme } from "../styles/theme";

const DashboardContainer = styled.div`
  padding: 2rem 1rem;
  background: #fff8f3;
  min-height: calc(100vh - 80px);
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);

  .container {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 15px;
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const DashboardWrapper = styled.div`
  background: #fff8f3;
  min-height: 100vh;
  width: 100%;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${theme.colors.primary}20;
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding: 0 1rem 1rem;
  }
`;

const PageTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: 2rem;
  font-weight: 700;
  font-family: "Nunito", sans-serif;
  margin-bottom: 1rem;

  span {
    color: #2d3436;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const TabButton = styled(Button)`
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  font-size: 0.95rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

const StyledTable = styled(Table)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  th {
    background: #f8f9fa;
    font-weight: 600;
    font-family: "Nunito", sans-serif;
    padding: 1rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #2d3436;

    @media (max-width: 768px) {
      font-size: 0.8rem;
      padding: 0.75rem;
    }
  }

  td {
    padding: 1rem;
    vertical-align: middle;
    font-size: 0.95rem;
    color: #636e72;

    @media (max-width: 768px) {
      font-size: 0.85rem;
      padding: 0.75rem;
    }
  }

  tbody tr {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #fff8f3;
    }
  }

  @media (max-width: 576px) {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const ActionButton = styled(Button)`
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  border-radius: 6px;
  font-weight: 500;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.35rem 0.75rem;
    font-size: 0.8rem;

    &:not(:last-child) {
      margin-right: 0.35rem;
    }
  }
`;

const StyledBadge = styled(Badge)`
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  border-radius: 20px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    padding: 0.35rem 0.75rem;
    font-size: 0.75rem;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 16px;
    border: none;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-height: 90vh;
    overflow-y: auto;
    margin: 1rem;
  }

  .modal-header {
    padding: 1.25rem;

    @media (max-width: 768px) {
      padding: 1rem;
    }

    .modal-title {
      font-size: 1.25rem;

      @media (max-width: 768px) {
        font-size: 1.1rem;
      }
    }
  }

  .modal-body {
    padding: 1.5rem;

    @media (max-width: 768px) {
      padding: 1rem;
    }
  }

  .form-label {
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  .form-control,
  .form-select {
    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 0.6rem 0.8rem;
    }
  }
`;

const FormSection = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    margin-bottom: 1.5rem;
    padding-bottom: 0;
    border-bottom: none;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
`;

const SectionTitle = styled.h5`
  color: ${theme.colors.primary};
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.4;

  svg {
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }
`;

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const PriceInputGroup = styled.div`
  position: relative;
  background: #f8f9fa;
  padding: 1.25rem;
  border-radius: 12px;
  border: 2px solid #eee;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary}50;
  }

  .form-label {
    color: #2d3436;
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    display: block;
  }

  .form-control {
    padding: 0.8rem 1rem 0.8rem 3rem;
    border: 2px solid #eee;
    border-radius: 8px;
    font-size: 1rem;
    width: 100%;
    transition: all 0.3s ease;
    background: white;

    &:hover {
      border-color: ${theme.colors.primary}50;
    }

    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px ${theme.colors.primary}15;
    }

    &::placeholder {
      color: #aaa;
      font-size: 0.9rem;
    }
  }

  &::before {
    content: "Rs.";
    position: absolute;
    left: calc(1.25rem + 1rem);
    top: 3.9rem;
    color: #666;
    font-weight: 500;
    z-index: 1;
    font-size: 0.9rem;
  }

  .status-indicator {
    margin-top: 0.75rem;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &.available {
      background: ${theme.colors.primary}10;
      color: ${theme.colors.primary};
    }

    &.not-available {
      background: #f1f3f5;
      color: #868e96;
    }

    i {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .form-label {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }

    .form-control {
      font-size: 0.9rem;
      padding: 0.7rem 1rem 0.7rem 2.75rem;
    }

    &::before {
      left: calc(1rem + 0.875rem);
      top: 3.4rem;
      font-size: 0.85rem;
    }

    .status-indicator {
      font-size: 0.8rem;
      padding: 0.4rem;
    }
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ddd;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.has-image {
    border: none;
  }

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const IngredientInput = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  .form-control {
    flex: 1;
  }

  .btn {
    flex-shrink: 0;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;

    .btn {
      padding: 0 0.75rem;
    }
  }
`;

const AddIngredientButton = styled(Button)`
  margin-top: 1rem;
  width: auto;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;

  i {
    margin-right: 0.5rem;
  }
`;

const AvailabilitySwitch = styled(Form.Check)`
  .form-check-input {
    width: 3rem;
    height: 1.5rem;
    margin-right: 1rem;
  }

  .form-check-label {
    font-size: 1rem;
    padding-top: 0.25rem;
  }
`;

const StatsContainer = styled(Row)`
  margin-bottom: 2rem;
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;

    > div {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
`;

const StatCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }

  .card-body {
    padding: 1.5rem;

    @media (max-width: 768px) {
      padding: 1rem;
    }
  }

  .stat-title {
    color: #636e72;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  .stat-value {
    color: #2d3436;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .stat-change {
    color: #00b894;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.5rem;

    &.negative {
      color: #d63031;
    }

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    button {
      width: 100%;
    }
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("pizzas");

  // State for pizza form
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPizza, setCurrentPizza] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    varients: ["small", "medium", "large"],
    prices: [
      { varient: "small", price: "" },
      { varient: "medium", price: "" },
      { varient: "large", price: "" },
    ],
    category: "",
    image: "",
    description: "",
    ingredients: [""],
    cookingTime: 15,
    spiceLevel: 1,
    rating: 4.0,
    popularity: 80,
    tags: [],
    isAvailable: true,
  });
  const [formError, setFormError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please login again.");
        navigate("/admin/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Fetch pizzas
      const pizzasResponse = await axios.get("/api/pizzas", { headers });
      setPizzas(pizzasResponse.data);

      // Fetch orders
      const ordersResponse = await axios.get("/api/orders/all", { headers });
      setOrders(ordersResponse.data.orders);

      // Fetch users
      const usersResponse = await axios.get("/api/auth/users", { headers });
      setUsers(usersResponse.data.users);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to fetch data";
      setError(errorMessage);
      setLoading(false);

      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        navigate("/admin/login");
      }
    }
  }, [navigate]);

  // Fetch data on component mount
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [isAdmin, navigate, fetchData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle price changes
  const handlePriceChange = (index, value) => {
    const newPrices = [...formData.prices];
    // Only update if value is empty or a positive number
    if (value === "" || Number(value) > 0) {
      newPrices[index].price = value === "" ? "" : Number(value);
      setFormData({
        ...formData,
        prices: newPrices,
      });
    }
  };

  // Handle ingredient changes
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  // Add new ingredient field
  const addIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  // Remove ingredient field
  const removeIngredientField = (index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  // Handle form submission for adding new pizza
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      // Validate form
      if (!formData.name || !formData.image || !formData.description) {
        setFormError("Please fill in all required fields");
        return;
      }

      // Filter out empty ingredients
      const filteredIngredients = formData.ingredients.filter(
        (ing) => ing.trim() !== ""
      );

      if (filteredIngredients.length === 0) {
        setFormError("Please add at least one ingredient");
        return;
      }

      // Filter out sizes with empty or zero prices
      const availablePrices = formData.prices.filter((price) => {
        const priceValue = Number(price.price);
        return !isNaN(priceValue) && priceValue > 0;
      });

      if (availablePrices.length === 0) {
        setFormError("Please set at least one valid price (greater than 0)");
        return;
      }

      // Prepare pizza data with only available sizes
      const pizzaData = {
        ...formData,
        ingredients: filteredIngredients,
        prices: availablePrices,
        varients: availablePrices.map((price) => price.varient),
        category: formData.category || null,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        setFormError("No authentication token found. Please login again.");
        navigate("/admin/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Add new pizza
      const response = await axios.post("/api/pizzas", pizzaData, { headers });

      if (response.data) {
        // Refresh pizzas list
        const pizzasResponse = await axios.get("/api/pizzas", { headers });
        setPizzas(pizzasResponse.data);

        // Close modal and reset form
        setShowAddModal(false);
        resetForm();
        toast.success("food added successfully!");
      }
    } catch (err) {
      console.error("Error adding pizza:", err);
      const errorMessage = err.response?.data?.message || "Failed to add pizza";
      setFormError(errorMessage);

      if (err.response?.status === 401) {
        navigate("/admin/login");
      }
    }
  };

  // Handle pizza update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      // Validate form
      if (!formData.name || !formData.image || !formData.description) {
        setFormError("Please fill in all required fields");
        return;
      }

      // Filter out empty ingredients
      const filteredIngredients = formData.ingredients.filter(
        (ing) => ing.trim() !== ""
      );

      if (filteredIngredients.length === 0) {
        setFormError("Please add at least one ingredient");
        return;
      }

      // Filter out sizes with empty or zero prices
      const availablePrices = formData.prices.filter((price) => {
        const priceValue = Number(price.price);
        return !isNaN(priceValue) && priceValue > 0;
      });

      if (availablePrices.length === 0) {
        setFormError("Please set at least one valid price (greater than 0)");
        return;
      }

      // Prepare pizza data with only available sizes
      const pizzaData = {
        ...formData,
        ingredients: filteredIngredients,
        prices: availablePrices,
        varients: availablePrices.map((price) => price.varient),
        category: formData.category || null,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        setFormError("No authentication token found. Please login again.");
        navigate("/admin/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Update pizza
      const response = await axios.put(
        `/api/pizzas/${currentPizza._id}`,
        pizzaData,
        { headers }
      );

      if (response.data) {
        // Refresh pizzas list
        const pizzasResponse = await axios.get("/api/pizzas", { headers });
        setPizzas(pizzasResponse.data);

        // Close modal and reset form
        setShowEditModal(false);
        resetForm();
        toast.success("Food updated successfully!");
      }
    } catch (err) {
      console.error("Error updating food:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to update food";
      setFormError(errorMessage);

      if (err.response?.status === 401) {
        navigate("/admin/login");
      }
    }
  };

  // Handle pizza deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this food?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please login again.");
          navigate("/admin/login");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Delete pizza
        await axios.delete(`/api/pizzas/${id}`, { headers });

        // Refresh pizzas list
        const response = await axios.get("/api/pizzas", { headers });
        setPizzas(response.data);
        toast.success("food deleted successfully!");
      } catch (err) {
        console.error("Error deleting food:", err);
        const errorMessage =
          err.response?.data?.message || "Failed to delete food";
        setError(errorMessage);

        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          navigate("/admin/login");
        }
      }
    }
  };

  // Handle edit pizza
  const handleEdit = (pizza) => {
    setCurrentPizza(pizza);
    setFormData({
      name: pizza.name,
      varients: pizza.varients,
      prices: pizza.prices,
      category: pizza.category,
      image: pizza.image,
      description: pizza.description,
      ingredients: pizza.ingredients,
      cookingTime: pizza.cookingTime,
      spiceLevel: pizza.spiceLevel,
      rating: pizza.rating,
      popularity: pizza.popularity,
      tags: pizza.tags,
      isAvailable: pizza.isAvailable,
    });
    setShowEditModal(true);
  };

  // Handle order status update
  const handleOrderStatusUpdate = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.put(`/api/orders/${orderId}/status`, { status }, { headers });

      // Refresh orders list
      const response = await axios.get("/api/orders/all", { headers });
      setOrders(response.data.orders);
    } catch (err) {
      console.error("Error updating order status:", err);
      setError(err.response?.data?.message || "Failed to update order status");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      varients: ["small", "medium", "large"],
      prices: [
        { varient: "small", price: "" },
        { varient: "medium", price: "" },
        { varient: "large", price: "" },
      ],
      category: "",
      image: "",
      description: "",
      ingredients: [""],
      cookingTime: 15,
      spiceLevel: 1,
      rating: 4.0,
      popularity: 80,
      tags: [],
      isAvailable: true,
    });
    setFormError("");
  };

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <DashboardContainer>
      <div className="container">
        <DashboardHeader>
          <PageTitle>
            Admin <span>Dashboard</span>
          </PageTitle>
        </DashboardHeader>

        <StatsContainer>
          <Col lg={3} md={6} className="mb-4">
            <StatCard>
              <Card.Body>
                <div className="stat-title">Total Orders</div>
                <div className="stat-value">{orders.length}</div>
                <div className="stat-change">
                  <i className="fas fa-arrow-up"></i>
                  12% from last month
                </div>
              </Card.Body>
            </StatCard>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <StatCard>
              <Card.Body>
                <div className="stat-title">Active Users</div>
                <div className="stat-value">{users.length}</div>
                <div className="stat-change">
                  <i className="fas fa-arrow-up"></i>
                  8% from last month
                </div>
              </Card.Body>
            </StatCard>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <StatCard>
              <Card.Body>
                <div className="stat-title">Menu Items</div>
                <div className="stat-value">{pizzas.length}</div>
                <div className="stat-change">
                  <i className="fas fa-arrow-up"></i>
                  5% from last month
                </div>
              </Card.Body>
            </StatCard>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <StatCard>
              <Card.Body>
                <div className="stat-title">Revenue</div>
                <div className="stat-value">
                  Rs.{" "}
                  {orders
                    .reduce((acc, order) => acc + order.totalAmount, 0)
                    .toFixed(2)}
                </div>
                <div className="stat-change">
                  <i className="fas fa-arrow-up"></i>
                  15% from last month
                </div>
              </Card.Body>
            </StatCard>
          </Col>
        </StatsContainer>

        <TabsContainer>
          <TabButton
            variant={activeTab === "pizzas" ? "primary" : "outline-primary"}
            onClick={() => setActiveTab("pizzas")}
          >
            Manage Foods
          </TabButton>
          <TabButton
            variant={activeTab === "orders" ? "primary" : "outline-primary"}
            onClick={() => setActiveTab("orders")}
          >
            Manage Orders
          </TabButton>
          <TabButton
            variant={activeTab === "users" ? "primary" : "outline-primary"}
            onClick={() => setActiveTab("users")}
          >
            Manage Users
          </TabButton>
        </TabsContainer>

        {/* Pizzas Management */}
        {activeTab === "pizzas" && (
          <>
            <Row className="mb-3">
              <Col>
                <TabButton
                  variant="success"
                  onClick={() => setShowAddModal(true)}
                >
                  Add New Food
                </TabButton>
              </Col>
            </Row>
            <Row>
              <Col>
                <StyledTable responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price (Small)</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pizzas.map((pizza) => (
                      <tr key={pizza._id}>
                        <td>{pizza.name}</td>
                        <td>
                          <StyledBadge
                            bg={
                              pizza.category === "Veg"
                                ? "success"
                                : pizza.category === "Non-Veg"
                                ? "danger"
                                : "secondary"
                            }
                          >
                            {pizza.category || "None"}
                          </StyledBadge>
                        </td>
                        <td>Rs. {pizza.prices[0]?.price || "N/A"}</td>
                        <td>
                          <StyledBadge
                            bg={pizza.isAvailable ? "success" : "danger"}
                          >
                            {pizza.isAvailable ? "Available" : "Not Available"}
                          </StyledBadge>
                        </td>
                        <td>
                          <ActionButton
                            variant="info"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(pizza)}
                          >
                            Edit
                          </ActionButton>
                          <ActionButton
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(pizza._id)}
                          >
                            Delete
                          </ActionButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              </Col>
            </Row>
          </>
        )}

        {/* Orders Management */}
        {activeTab === "orders" && (
          <Row>
            <Col>
              <StyledTable responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.slice(-6)}</td>
                      <td>{order.user?.name || "Guest"}</td>
                      <td>Rs. {order.totalAmount.toFixed(2)}</td>
                      <td>
                        <StyledBadge
                          bg={
                            order.status === "pending"
                              ? "warning"
                              : order.status === "confirmed"
                              ? "info"
                              : order.status === "preparing"
                              ? "primary"
                              : order.status === "out_for_delivery"
                              ? "info"
                              : order.status === "delivered"
                              ? "success"
                              : "danger"
                          }
                        >
                          {order.status.replace(/_/g, " ").toUpperCase()}
                        </StyledBadge>
                      </td>
                      <td>
                        <Form.Select
                          size="sm"
                          value={order.status}
                          onChange={(e) =>
                            handleOrderStatusUpdate(order._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="out_for_delivery">
                            Out for Delivery
                          </option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </Form.Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </Col>
          </Row>
        )}

        {/* Users Management */}
        {activeTab === "users" && (
          <Row>
            <Col>
              <StyledTable responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <StyledBadge
                          bg={user.role === "admin" ? "danger" : "info"}
                        >
                          {user.role.toUpperCase()}
                        </StyledBadge>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </Col>
          </Row>
        )}

        {/* Add Pizza Modal */}
        <StyledModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Food</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {formError && (
                <Alert
                  variant="danger"
                  className="mb-4"
                  style={{
                    borderRadius: "12px",
                    border: "none",
                    background: "#FEE2E2",
                    color: "#DC2626",
                    padding: "1rem 1.25rem",
                  }}
                >
                  {formError}
                </Alert>
              )}

              <FormSection>
                <SectionTitle>
                  <i className="fas fa-info-circle"></i> Basic Information
                </SectionTitle>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter Food name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Veg">Vegetarian</option>
                        <option value="Non-Veg">Non-Vegetarian</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter Food description"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </FormSection>

              <FormSection>
                <SectionTitle>
                  <i className="fas fa-tag"></i> Pricing
                </SectionTitle>
                <PriceGrid>
                  {formData.prices.map((price, index) => (
                    <PriceInputGroup key={price.varient}>
                      <Form.Label className="text-capitalize">
                        {price.varient} Size
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        step="0.01"
                        value={price.price}
                        onChange={(e) =>
                          handlePriceChange(index, e.target.value)
                        }
                        placeholder="Enter price"
                      />
                      {price.price !== "" && Number(price.price) > 0 ? (
                        <div className="status-indicator available">
                          <i className="fas fa-check-circle"></i>
                          Available at Rs. {price.price}
                        </div>
                      ) : (
                        <div className="status-indicator not-available">
                          <i className="fas fa-times-circle"></i>
                          Not Available
                        </div>
                      )}
                    </PriceInputGroup>
                  ))}
                </PriceGrid>
                <div
                  className="text-muted mt-3"
                  style={{
                    fontSize: "0.85rem",
                    padding: "0.75rem 1rem",
                    background: "#f8f9fa",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <i className="fas fa-info-circle"></i>
                  Leave price empty to mark size as unavailable
                </div>
              </FormSection>

              <FormSection>
                <SectionTitle>
                  <i className="fas fa-image"></i> Image
                </SectionTitle>
                <Form.Group>
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    required
                  />
                  {formData.image && (
                    <ImagePreview className="has-image">
                      <img src={formData.image} alt="Preview" />
                    </ImagePreview>
                  )}
                </Form.Group>
              </FormSection>

              <FormSection>
                <SectionTitle>
                  <i className="fas fa-list"></i> Ingredients & Details
                </SectionTitle>
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Cooking Time (minutes)</Form.Label>
                      <Form.Control
                        type="number"
                        name="cookingTime"
                        value={formData.cookingTime}
                        onChange={handleInputChange}
                        min="1"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Spice Level (1-5)</Form.Label>
                      <Form.Control
                        type="number"
                        name="spiceLevel"
                        value={formData.spiceLevel}
                        onChange={handleInputChange}
                        min="1"
                        max="5"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label>Ingredients</Form.Label>
                  {formData.ingredients.map((ingredient, index) => (
                    <IngredientInput key={index}>
                      <Form.Control
                        type="text"
                        value={ingredient}
                        onChange={(e) =>
                          handleIngredientChange(index, e.target.value)
                        }
                        placeholder="Enter ingredient"
                      />
                      <Button
                        variant="outline-danger"
                        onClick={() => removeIngredientField(index)}
                        disabled={formData.ingredients.length === 1}
                      >
                        <i className="fas fa-times"></i>
                      </Button>
                    </IngredientInput>
                  ))}
                  <AddIngredientButton
                    variant="outline-primary"
                    size="sm"
                    onClick={addIngredientField}
                  >
                    <i className="fas fa-plus"></i> Add Ingredient
                  </AddIngredientButton>
                </Form.Group>
              </FormSection>

              <FormSection>
                <SectionTitle>
                  <i className="fas fa-toggle-on"></i> Availability
                </SectionTitle>
                <AvailabilitySwitch
                  type="switch"
                  id="availability-switch"
                  name="isAvailable"
                  label="Available for Order"
                  checked={formData.isAvailable}
                  onChange={handleInputChange}
                />
              </FormSection>

              <div className="d-grid">
                <Button variant="primary" type="submit" size="lg">
                  Add Food
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </StyledModal>

        {/* Edit Pizza Modal */}
        <StyledModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Food</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              {formError && <Alert variant="danger">{formError}</Alert>}

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  <option value="Veg">Vegetarian</option>
                  <option value="Non-Veg">Non-Vegetarian</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Prices</Form.Label>
                {formData.prices.map((price, index) => (
                  <div key={price.varient} className="d-flex mb-2">
                    <Form.Label className="me-2 w-25">
                      {price.varient}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={price.price}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ingredients</Form.Label>
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="d-flex mb-2">
                    <Form.Control
                      type="text"
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      className="me-2"
                    />
                    <Button
                      variant="danger"
                      onClick={() => removeIngredientField(index)}
                      disabled={formData.ingredients.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button variant="secondary" onClick={addIngredientField}>
                  Add Ingredient
                </Button>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cooking Time (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="cookingTime"
                  value={formData.cookingTime}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Spice Level (1-5)</Form.Label>
                <Form.Control
                  type="number"
                  name="spiceLevel"
                  value={formData.spiceLevel}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="isAvailable"
                  label="Available"
                  checked={formData.isAvailable}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update Food
              </Button>
            </Form>
          </Modal.Body>
        </StyledModal>
      </div>
    </DashboardContainer>
  );
};

export default AdminDashboard;
