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

const initialState = {
  pizzas: [],
  loading: false,
  error: null,
  success: false,
};

const pizzaReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PIZZAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PIZZAS_SUCCESS:
      return {
        ...state,
        loading: false,
        pizzas: action.payload,
        error: null,
      };
    case FETCH_PIZZAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_PIZZA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_PIZZA_SUCCESS:
      return {
        ...state,
        loading: false,
        pizzas: [...state.pizzas, action.payload],
        success: true,
        error: null,
      };
    case ADD_PIZZA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PIZZA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PIZZA_SUCCESS:
      return {
        ...state,
        loading: false,
        pizzas: state.pizzas.map((pizza) =>
          pizza._id === action.payload._id ? action.payload : pizza
        ),
        success: true,
        error: null,
      };
    case UPDATE_PIZZA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PIZZA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_PIZZA_SUCCESS:
      return {
        ...state,
        loading: false,
        pizzas: state.pizzas.filter((pizza) => pizza._id !== action.payload),
        success: true,
        error: null,
      };
    case DELETE_PIZZA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_PIZZAS":
      return {
        ...state,
        loading: false,
        pizzas: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default pizzaReducer;
