// Pizza Action Types
export const FETCH_PIZZAS_REQUEST = 'FETCH_PIZZAS_REQUEST';
export const FETCH_PIZZAS_SUCCESS = 'FETCH_PIZZAS_SUCCESS';
export const FETCH_PIZZAS_FAILURE = 'FETCH_PIZZAS_FAILURE';

export const ADD_PIZZA_REQUEST = 'ADD_PIZZA_REQUEST';
export const ADD_PIZZA_SUCCESS = 'ADD_PIZZA_SUCCESS';
export const ADD_PIZZA_FAILURE = 'ADD_PIZZA_FAILURE';

export const UPDATE_PIZZA_REQUEST = 'UPDATE_PIZZA_REQUEST';
export const UPDATE_PIZZA_SUCCESS = 'UPDATE_PIZZA_SUCCESS';
export const UPDATE_PIZZA_FAILURE = 'UPDATE_PIZZA_FAILURE';

export const DELETE_PIZZA_REQUEST = 'DELETE_PIZZA_REQUEST';
export const DELETE_PIZZA_SUCCESS = 'DELETE_PIZZA_SUCCESS';
export const DELETE_PIZZA_FAILURE = 'DELETE_PIZZA_FAILURE';

// Pizza Categories
export const PIZZA_CATEGORIES = [
    'Veg',
    'Non-Veg',
    'Special',
    'Seasonal'
];

// Pizza Spice Levels
export const SPICE_LEVELS = [
    'Mild',
    'Medium',
    'Hot',
    'Extra Hot'
];

// Pizza Sizes
export const PIZZA_SIZES = [
    'Small',
    'Medium',
    'Large',
    'Extra Large'
]; 