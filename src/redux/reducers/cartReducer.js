import { INCREMENT_CART_ITEM } from "../types/cartTypes";

const initialState = {
  cartItems: [],
};

const cartReducer = function (state = initialState, action) {
  switch (action.type) {
    case "DELETE_ITEM":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "ADD_ITEM":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "GET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    case INCREMENT_CART_ITEM:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
