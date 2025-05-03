// store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";

import pizzaReducer from "./reducers/pizzaReducer";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";

// Get cart items from localStorage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// Get user info from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cartReducer: {
    cartItems: cartItemsFromStorage,
  },
  authReducer: {
    user: userInfoFromStorage,
    isAuthenticated: !!userInfoFromStorage,
  },
};

const rootReducer = combineReducers({
  pizzaReducer,
  authReducer,
  cartReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
