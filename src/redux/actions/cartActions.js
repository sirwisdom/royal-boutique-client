import {
  SET_SNACKBAR,
  // HIDE_SNACKBAR,
  // TOGGLE_DARK_MODE,
} from "../types/uiTypes";
import { INCREMENT_CART_ITEM } from "../types/cartTypes";

const ROYAL_BOUTIQUE_CART = "ROYAL_BOUTIQUE_CART";

export const addItemToCart = function (item, moreInfo) {
  return (dispatch, getState) => {
    // const { cartReducer } = getState();

    const initialItem = { qty: 1 };
    initialItem.product = item;
    initialItem.moreInfo = moreInfo;
    let existingCart = [];
    if (localStorage.getItem(ROYAL_BOUTIQUE_CART) !== null) {
      existingCart = JSON.parse(localStorage.getItem(ROYAL_BOUTIQUE_CART));
    }
    if (existingCart && existingCart.length > 0) {
      let searchProduct = existingCart.find(
        (cartItem) => cartItem.product._id === item._id
      );
      if (searchProduct) {
        return dispatch({
          type: SET_SNACKBAR,
          payload: {
            snackBarMessage: "Item Already In Cart ",
            snackBarType: "success",
          },
        });
      }
    }
    existingCart.push(initialItem);
    localStorage.setItem(ROYAL_BOUTIQUE_CART, JSON.stringify(existingCart));

    dispatch({
      type: "ADD_ITEM",
      payload: existingCart,
    });
    dispatch({
      type: SET_SNACKBAR,
      payload: {
        snackBarMessage: "Item Added to Cart Successfully",
        snackBarType: "success",
      },
    });
  };
};

export const removeItemFromCart = function (itemId) {
  return (dispatch) => {
    let existingCart = [];
    let newCart = [];
    existingCart = JSON.parse(localStorage.getItem(ROYAL_BOUTIQUE_CART));
    newCart = existingCart.filter(
      (cartItem) => cartItem.product._id !== itemId
    );

    localStorage.setItem(ROYAL_BOUTIQUE_CART, JSON.stringify(newCart));
    dispatch({
      type: "DELETE_ITEM",
      payload: newCart,
    });
  };
};

export const clearCart = function () {
  return (dispatch) => {
    localStorage.removeItem(ROYAL_BOUTIQUE_CART);
    dispatch({
      type: "CLEAR_CART",
      payload: [],
    });
  };
};

export const getCartItems = function () {
  return (dispatch) => {
    let existingCart = [];
    if (localStorage.getItem(ROYAL_BOUTIQUE_CART) !== null) {
      existingCart = JSON.parse(localStorage.getItem(ROYAL_BOUTIQUE_CART));
      dispatch({
        type: "GET_CART_ITEMS",
        payload: existingCart,
      });
    } else
      dispatch({
        type: "GET_CART_ITEMS",
        payload: [],
      });
  };
};

export const incrementCartItem = (itemId) => async (dispatch) => {
  let existingCart = JSON.parse(localStorage.getItem(ROYAL_BOUTIQUE_CART));

  const itemIndex = existingCart
    .map((item) => item.product._id)
    .indexOf(itemId);

  let newCart = [...existingCart];
  let foundItem = newCart.find((item) => item.product._id === itemId);

  foundItem = { ...foundItem, qty: foundItem.qty + 1 };

  existingCart[itemIndex] = foundItem;
  localStorage.setItem(ROYAL_BOUTIQUE_CART, JSON.stringify(existingCart));
  return dispatch({ type: INCREMENT_CART_ITEM, payload: existingCart });
};

export const decrementCartItem = (itemId) => async (dispatch) => {
  let existingCart = JSON.parse(localStorage.getItem(ROYAL_BOUTIQUE_CART));

  const itemIndex = existingCart
    .map((item) => item.product._id)
    .indexOf(itemId);

  let newCart = [...existingCart];
  let foundItem = newCart.find((item) => item.product._id === itemId);

  foundItem = { ...foundItem, qty: foundItem.qty - 1 };

  existingCart[itemIndex] = foundItem;
  localStorage.setItem(ROYAL_BOUTIQUE_CART, JSON.stringify(existingCart));
  return dispatch({ type: INCREMENT_CART_ITEM, payload: existingCart });
};
