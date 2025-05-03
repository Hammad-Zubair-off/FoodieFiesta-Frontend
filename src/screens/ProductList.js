import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../actions/pizzaActions";
import Loader from "../components/Loader";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pizzas, loading, error } = useSelector((state) => state.pizzaReducer);

  useEffect(() => {
    dispatch(fetchPizzas());
  }, [dispatch]); // Only depend on dispatch

  // Function to handle product editing
  const handleEdit = (product) => {
    navigate("/admin/product/edit/" + product._id, {
      state: { data: product },
    });
  };

  // Function to navigate to the AddProduct component
  const handleAddProduct = () => {
    navigate("/admin/product/add");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Authentication token not found. Please log in again.");
          navigate("/admin/login");
          return;
        }

        const authHeader = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
        await axios.delete(`/api/pizzas/${id}`, {
          headers: {
            Authorization: authHeader,
          },
        });

        // Refresh the pizza list after deletion
        dispatch(fetchPizzas());
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error.response?.data || error.message);
        alert(
          `Error deleting product: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product List</h2>
        <button className="btn btn-primary" onClick={handleAddProduct}>
          Add New food
        </button>
      </div>

      {pizzas && pizzas.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price (Small)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pizzas.map((pizza) => (
                <tr key={pizza._id}>
                  <td>
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </td>
                  <td>{pizza.name}</td>
                  <td>{pizza.category}</td>
                  <td>${pizza.prices?.[0]?.price || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(pizza)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(pizza._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">
          No foods found. Add some foods to get started!
        </div>
      )}
    </div>
  );
};

export default ProductList;
