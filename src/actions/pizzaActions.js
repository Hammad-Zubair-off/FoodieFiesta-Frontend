import axios from "axios";
import {
  FETCH_PIZZAS_REQUEST,
  FETCH_PIZZAS_SUCCESS,
  FETCH_PIZZAS_FAILURE,
  ADD_PIZZA_REQUEST,
  ADD_PIZZA_SUCCESS,
  ADD_PIZZA_FAILURE,
  UPDATE_PIZZA_REQUEST,
  UPDATE_PIZZA_SUCCESS,
  UPDATE_PIZZA_FAILURE,
  DELETE_PIZZA_REQUEST,
  DELETE_PIZZA_SUCCESS,
  DELETE_PIZZA_FAILURE,
} from "../constants/pizzaConstants";


export const fetchPizzas =
  (category = "", sort = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_PIZZAS_REQUEST });

      let queryString = "";
      if (category) queryString += `?category=${category}`;
      if (sort) queryString += `${queryString ? "&" : "?"}sort=${sort}`;

      const { data } = await axios.get(`/pizzas${queryString}`);
      dispatch({ type: FETCH_PIZZAS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_PIZZAS_FAILURE,
        payload: error.response?.data?.message || "Error fetching pizzas",
      });
    }
  };

export const fetchPizzaById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PIZZAS_REQUEST });
    const { data } = await axios.get(`/pizzas/${id}`);
    dispatch({ type: FETCH_PIZZAS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PIZZAS_FAILURE,
      payload: error.response?.data?.message || "Error fetching pizza",
    });
  }
};

export const addPizza = (pizzaData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PIZZA_REQUEST });
    const { data } = await axios.post(`/pizzas`, pizzaData);
    dispatch({ type: ADD_PIZZA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_PIZZA_FAILURE,
      payload: error.response?.data?.message || "Error adding pizza",
    });
  }
};

export const updatePizza = (id, pizzaData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PIZZA_REQUEST });
    const { data } = await axios.put(`/pizzas/${id}`, pizzaData);
    dispatch({ type: UPDATE_PIZZA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PIZZA_FAILURE,
      payload: error.response?.data?.message || "Error updating pizza",
    });
  }
};

export const deletePizza = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PIZZA_REQUEST });
    await axios.delete(`/pizzas/${id}`);
    dispatch({ type: DELETE_PIZZA_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_PIZZA_FAILURE,
      payload: error.response?.data?.message || "Error deleting pizza",
    });
  }
};
