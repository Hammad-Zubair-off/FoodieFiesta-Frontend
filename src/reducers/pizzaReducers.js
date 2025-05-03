export const getAllPizzasReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case "GET_PIZZAS_REQUEST":
      return { loading: true, ...state };
    case "GET_PIZZAS_SUCCESS":
      return { loading: false, pizzas: action.payload };
    case "GET_PIZZAS_FAILED":
      return { error: action.payload, loading: false };
    case "ADD_PIZZA_SUCCESS":
      return { ...state, pizzas: [...state.pizzas, action.payload] };
    case "DELETE_PIZZA_SUCCESS":
      return {
        ...state,
        pizzas: state.pizzas.filter((pizza) => pizza._id !== action.payload),
      };
    default:
      return state;
  }
};
