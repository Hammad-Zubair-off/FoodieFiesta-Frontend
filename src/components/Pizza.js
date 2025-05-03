// Pizza.js - This is the component that displays individual pizzas on the homepage
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

export default function Pizza({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [varient, setVarient] = useState(
    pizza.varients ? pizza.varients[0] : ""
  );
  const dispatch = useDispatch();

  const getPrice = () => {
    if (!pizza.prices || !Array.isArray(pizza.prices)) return 0;

    const priceObj = pizza.prices.find((p) => p.varient === varient);
    return priceObj ? priceObj.price : 0;
  };

  const addToCartHandler = () => {
    dispatch(addToCart(pizza, quantity, varient));
  };

  return (
    <div className="card shadow-sm p-3 mb-5 bg-white rounded">
      <h5 className="m-1">{pizza.name}</h5>
      <img
        src={pizza.image}
        className="img-fluid"
        style={{ height: "200px", width: "100%", objectFit: "cover" }}
        alt={pizza.name}
      />

      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between mt-3">
          <div>
            <p>Variant</p>
            <select
              className="form-control"
              value={varient}
              onChange={(e) => setVarient(e.target.value)}
            >
              {pizza.varients &&
                pizza.varients.map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <p>Quantity</p>
            <select
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[...Array(10).keys()].map((x, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div className="mt-2">
            <h6>Price: Rs. {getPrice()}</h6>
          </div>
          <div>
            <button className="btn btn-primary" onClick={addToCartHandler}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
