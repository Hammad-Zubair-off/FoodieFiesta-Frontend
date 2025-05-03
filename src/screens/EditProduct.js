import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = useMemo(() => location.state?.data || {}, [location.state]);

  const [productName, setProductName] = useState("");
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [prices, setPrices] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize form with product data
  useEffect(() => {
    if (product && product._id) {
      setProductName(product.name || "");
      setSelectedVariants(product.varients || []);
      setSelectedCategory(product.category || "");
      setProductImage(product.image || "");
      setProductDescription(product.description || "");

      // Convert prices array to object format for easier editing
      const priceObj = {};
      if (product.prices && Array.isArray(product.prices)) {
        product.prices.forEach((item) => {
          priceObj[item.varient] = item.price;
        });
      }
      setPrices(priceObj);
    } else {
      // No product data, redirect to products list
      navigate("/productList");
    }
  }, [product, navigate]);

  // Handle variant selection
  const handleVariantChange = (e) => {
    const variants = [...e.target.selectedOptions].map(
      (option) => option.value
    );
    setSelectedVariants(variants);

    // Keep existing prices and initialize any new variants
    const updatedPrices = { ...prices };
    variants.forEach((variant) => {
      if (!updatedPrices[variant]) {
        updatedPrices[variant] = 0;
      }
    });
    setPrices(updatedPrices);
  };

  // Handle price changes dynamically
  const handlePriceChange = (variant, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [variant]: Number(value),
    }));
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to update products");
      setLoading(false);
      return;
    }

    // Convert `prices` object to array format for API
    const formattedPrices = selectedVariants.map((variant) => ({
      varient: variant,
      price: prices[variant] || 0,
    }));

    const updatedProduct = {
      name: productName,
      varients: selectedVariants,
      prices: formattedPrices,
      category: selectedCategory,
      image: productImage,
      description: productDescription,
    };

    try {
      await axios.put(`/api/pizzas/editpizza/${product._id}`, updatedProduct, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product updated successfully");
      navigate("/productList");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update product");
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Edit Product</h2>

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
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/productList")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
