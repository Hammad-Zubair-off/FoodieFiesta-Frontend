import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [prices, setPrices] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle variant selection
  const handleVariantChange = (e) => {
    const variants = [...e.target.selectedOptions].map(
      (option) => option.value
    );
    setSelectedVariants(variants);

    // Initialize prices when variants are selected
    const initialPrices = {};
    variants.forEach((variant) => {
      initialPrices[variant] = prices[variant] || 0; // Retain old values if already set
    });
    setPrices(initialPrices);
  };

  // Handle price changes dynamically
  const handlePriceChange = (variant, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [variant]: Number(value),
    }));
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add products");
      setLoading(false);
      return;
    }

    // Convert `prices` object into an array of objects with correct property names
    const formattedPrices = selectedVariants.map((variant) => ({
      varient: variant,
      price: prices[variant],
    }));

    const newProduct = {
      name: productName,
      varients: selectedVariants,
      prices: formattedPrices,
      category: selectedCategory,
      image: productImage,
      description: productDescription,
    };

    try {
      const response = await axios.post("/api/pizzas/addpizza", newProduct, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully");
      navigate("/productList");
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add New Product</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
      >
        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* Variants Selection */}
        <div className="mb-3">
          <label className="form-label">Select Variants</label>
          <select
            multiple
            className="form-control"
            onChange={handleVariantChange}
            value={selectedVariants}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <small className="text-muted">
            Hold Ctrl/Cmd to select multiple variants
          </small>
        </div>

        {/* Prices */}
        {selectedVariants.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Set Prices</label>
            {selectedVariants.map((variant) => (
              <div key={variant} className="mb-2">
                <label>Price for {variant}:</label>
                <input
                  type="number"
                  className="form-control"
                  value={prices[variant] || ""}
                  onChange={(e) => handlePriceChange(variant, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        )}

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="cheese-special">Cheese Special</option>
            <option value="spicy">Spicy</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="mb-3">
          <label className="form-label">Product Image URL</label>
          <input
            type="text"
            className="form-control"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
