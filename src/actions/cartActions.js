// cartActions.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CLEAR_CART,
} from "../constants/cartConstants";
import { toast } from "react-toastify";

export const addToCart =
  (pizza, variant = "small", quantity = 1) =>
  (dispatch, getState) => {
    const variantPrice = pizza.prices.find(
      (p) => p.varient && p.varient.toLowerCase() === variant.toLowerCase()
    );

    const cartItem = {
      _id: pizza._id,
      name: pizza.name,
      image: pizza.image,
      variant: variant,
      price: variantPrice ? variantPrice.price : pizza.prices[0].price,
      quantity: quantity,
      totalPrice: variantPrice
        ? variantPrice.price * quantity
        : pizza.prices[0].price * quantity,
    };

    dispatch({
      type: ADD_TO_CART,
      payload: cartItem,
    });

    const userId = getState().userLogin?.userInfo?._id;
    const storageKey = userId ? `cartItems_${userId}` : "cartItems";

    const cartItems = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const existItem = cartItems.find(
      (x) => x._id === cartItem._id && x.variant === cartItem.variant
    );

    if (existItem) {
      const updatedCartItems = cartItems.map((x) =>
        x._id === existItem._id && x.variant === existItem.variant
          ? { ...cartItem, quantity: x.quantity + cartItem.quantity }
          : x
      );
      localStorage.setItem(storageKey, JSON.stringify(updatedCartItems));
    } else {
      localStorage.setItem(
        storageKey,
        JSON.stringify([...cartItems, cartItem])
      );
    }

  };

export const removeFromCart = (id, variant) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { id, variant },
  });

  const userId = getState().userLogin?.userInfo?._id;
  const storageKey = userId ? `cartItems_${userId}` : "cartItems";

  const cartItems = JSON.parse(localStorage.getItem(storageKey) || "[]");
  const updatedCartItems = cartItems.filter(
    (x) => !(x._id === id && x.variant === variant)
  );
  localStorage.setItem(storageKey, JSON.stringify(updatedCartItems));
};

export const updateCartItemQuantity =
  (id, variant, quantity) => (dispatch, getState) => {
    dispatch({
      type: UPDATE_CART_ITEM,
      payload: { id, variant, quantity },
    });

    const userId = getState().userLogin?.userInfo?._id;
    const storageKey = userId ? `cartItems_${userId}` : "cartItems";

    const cartItems = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const updatedCartItems = cartItems.map((item) =>
      item._id === id && item.variant === variant
        ? { ...item, quantity: quantity, totalPrice: item.price * quantity }
        : item
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedCartItems));
  };

export const clearCart = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_CART });

  const userId = getState().userLogin?.userInfo?._id;
  const storageKey = userId ? `cartItems_${userId}` : "cartItems";

  localStorage.removeItem(storageKey);
};
