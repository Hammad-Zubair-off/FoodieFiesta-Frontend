import React, { useState, useEffect } from "react";
import { Container, Badge, Dropdown } from "react-bootstrap";
import axios from "axios";
import Loader from "../components/Loader";
import styled from "styled-components";
import {
  FaBox,
  FaTruck,
  FaClock,
  FaMapMarkerAlt,
  FaTimes,
  FaFilter,
} from "react-icons/fa";
import { theme } from "../styles/theme";

const OrdersContainer = styled.div`
  min-height: 100vh;
  background: #fff8f3;
  width: 100%;
  padding: 3rem 0;
`;

const ContentWrapper = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;

  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
  }
`;

const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${theme.colors.primary};
    font-size: 1.8rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0;
  position: relative;
  display: inline-block;
  font-family: "Nunito", sans-serif;

  span {
    color: ${theme.colors.primary};
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: ${theme.colors.primary};
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }
  }

  &:hover span::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #f1f1f1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
`;

const OrderHeader = styled.div`
  padding: 0.75rem 1rem;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

const OrderId = styled.span`
  font-weight: 600;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;

  svg {
    color: ${theme.colors.primary};
    font-size: 0.9rem;
  }
`;

const OrderDate = styled.span`
  color: #636e72;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${theme.colors.primary};
    font-size: 0.85rem;
  }
`;

const StatusBadge = styled(Badge)`
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const OrderBody = styled.div`
  padding: 1rem;
  background: white;
`;

const OrderTable = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: separate;
  border-spacing: 0;

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #f1f1f1;
    font-size: 0.9rem;

    &:last-child {
      text-align: right;
    }
  }

  th {
    font-weight: 600;
    color: #2d3436;
    background: #f8f9fa;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  td {
    color: #636e72;
  }

  tbody tr {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #fff8f3;
    }
  }
`;

const ShippingInfo = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  background: #fff8f3;
  border: 1px solid #ffe5dc;

  h6 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #2d3436;
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 0.9rem;

    svg {
      color: ${theme.colors.primary};
      font-size: 0.9rem;
    }
  }

  p {
    color: #636e72;
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 0.85rem;
  }
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border-top: 1px solid #f1f1f1;

  span:first-child {
    color: #636e72;
    font-size: 0.9rem;
  }

  span:last-child {
    font-weight: 700;
    color: ${theme.colors.primary};
    font-size: 1rem;
  }
`;

const NoOrders = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  max-width: 600px;
  margin: 2rem auto;
  border: 1px solid #f1f1f1;

  h5 {
    color: #2d3436;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    color: #636e72;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
`;

const StatusSection = styled.div`
  margin-bottom: 2rem;
`;

const StatusHeader = styled.h2`
  font-size: 1.2rem;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${theme.colors.primary}20;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  span.count {
    background: ${theme.colors.primary}15;
    color: ${theme.colors.primary};
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const FilterButton = styled(Dropdown.Toggle)`
  background: white !important;
  color: ${theme.colors.primary} !important;
  border: 1px solid ${theme.colors.primary}20 !important;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover,
  &:focus,
  &:active {
    background: ${theme.colors.primary}10 !important;
    border-color: ${theme.colors.primary}30 !important;
    box-shadow: none !important;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;

const FilterDropdownMenu = styled(Dropdown.Menu)`
  border: 1px solid ${theme.colors.primary}20;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;

  .dropdown-item {
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    color: #2d3436;

    &:hover {
      background: ${theme.colors.primary}10;
      color: ${theme.colors.primary};
    }

    &.active {
      background: ${theme.colors.primary};
      color: white;
    }
  }
`;

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const groupOrdersByStatus = (orders) => {
    const statusPriority = {
      pending: 1,
      confirmed: 2,
      preparing: 3,
      out_for_delivery: 4,
      delivered: 5,
      cancelled: 6,
    };

    const groups = orders.reduce((acc, order) => {
      if (!acc[order.status]) {
        acc[order.status] = [];
      }
      acc[order.status].push(order);
      return acc;
    }, {});

    Object.keys(groups).forEach((status) => {
      groups[status].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    });

    return Object.entries(groups).sort(
      ([statusA], [statusB]) =>
        statusPriority[statusA] - statusPriority[statusB]
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock />;
      case "confirmed":
        return <FaBox />;
      case "preparing":
        return <FaBox />;
      case "out_for_delivery":
        return <FaTruck />;
      case "delivered":
        return <FaBox />;
      case "cancelled":
        return <FaTimes />;
      default:
        return <FaBox />;
    }
  };

  const formatStatusText = (status) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const filterOrders = (orders) => {
    if (selectedStatus === "all") return orders;
    return orders.filter((order) => order.status === selectedStatus);
  };

  const getStatusLabel = (status) => {
    if (status === "all") return "All Orders";
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your orders");
          setLoading(false);
          return;
        }

        const response = await axios.get("/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const ordersWithDetails = response.data.orders;
        setOrders(ordersWithDetails);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "warning",
      confirmed: "info",
      preparing: "primary",
      out_for_delivery: "info",
      delivered: "success",
      cancelled: "danger",
    };

    return (
      <StatusBadge bg={statusColors[status] || "secondary"}>
        {status.replace(/_/g, " ")}
      </StatusBadge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const groupedOrders = groupOrdersByStatus(orders);

  return (
    <OrdersContainer>
      <ContentWrapper>
        <FilterContainer>
          <PageTitleWrapper>
            <FaBox />
            <PageTitle>
              My <span>Orders</span>
            </PageTitle>
          </PageTitleWrapper>
          <Dropdown>
            <FilterButton variant="success" id="dropdown-basic">
              <FaFilter />
              {getStatusLabel(selectedStatus)}
            </FilterButton>

            <FilterDropdownMenu>
              <Dropdown.Item
                active={selectedStatus === "all"}
                onClick={() => setSelectedStatus("all")}
              >
                All Orders
              </Dropdown.Item>
              <Dropdown.Divider />
              {[
                "pending",
                "confirmed",
                "preparing",
                "out_for_delivery",
                "delivered",
                "cancelled",
              ].map((status) => (
                <Dropdown.Item
                  key={status}
                  active={selectedStatus === status}
                  onClick={() => setSelectedStatus(status)}
                >
                  {getStatusLabel(status)}
                </Dropdown.Item>
              ))}
            </FilterDropdownMenu>
          </Dropdown>
        </FilterContainer>

        {orders.length === 0 ? (
          <NoOrders>
            <h5>No orders found</h5>
            <p>You haven't placed any orders yet.</p>
          </NoOrders>
        ) : filterOrders(orders).length === 0 ? (
          <NoOrders>
            <h5>
              No{" "}
              {selectedStatus !== "all" ? getStatusLabel(selectedStatus) : ""}{" "}
              orders found
            </h5>
            <p>There are no orders with the selected status.</p>
          </NoOrders>
        ) : (
          groupOrdersByStatus(filterOrders(orders)).map(
            ([status, statusOrders]) => (
              <StatusSection key={status}>
                <StatusHeader>
                  {getStatusIcon(status)}
                  {formatStatusText(status)}
                  <span className="count">{statusOrders.length}</span>
                </StatusHeader>
                {statusOrders.map((order) => (
                  <OrderCard key={order._id}>
                    <OrderHeader>
                      <OrderInfo>
                        <OrderId>
                          <FaBox className="me-2" />
                          Order #{order._id.slice(-6)}
                        </OrderId>
                        <OrderDate>
                          <FaClock className="me-2" />
                          {formatDate(order.createdAt)}
                        </OrderDate>
                      </OrderInfo>
                      {getStatusBadge(order.status)}
                    </OrderHeader>

                    <OrderBody>
                      <OrderTable>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <div
                                  style={{
                                    fontWeight: "500",
                                    color: "#2d3436",
                                  }}
                                >
                                  {item.pizza?.name || "Pizza"}
                                </div>
                                {item.size && (
                                  <small style={{ color: "#636e72" }}>
                                    Size:{" "}
                                    {item.size.charAt(0).toUpperCase() +
                                      item.size.slice(1)}
                                  </small>
                                )}
                              </td>
                              <td>{item.quantity}</td>
                              <td>Rs. {item.price.toFixed(2)}</td>
                              <td>
                                Rs. {(item.price * item.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </OrderTable>

                      <ShippingInfo>
                        <h6>
                          <FaMapMarkerAlt />
                          Shipping Address
                        </h6>
                        <p>
                          {order.shippingAddress.street}
                          <br />
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state}{" "}
                          {order.shippingAddress.zipCode}
                          <br />
                          {order.shippingAddress.country}
                        </p>
                      </ShippingInfo>
                    </OrderBody>

                    <TotalAmount>
                      <span>Total Amount:</span>
                      <span>Rs. {order.totalAmount.toFixed(2)}</span>
                    </TotalAmount>
                  </OrderCard>
                ))}
              </StatusSection>
            )
          )
        )}
      </ContentWrapper>
    </OrdersContainer>
  );
};

export default OrdersScreen;
