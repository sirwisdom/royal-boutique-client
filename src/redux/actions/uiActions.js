import {
  SET_SNACKBAR,
  HIDE_SNACKBAR,
  TOGGLE_DARK_MODE,
} from "../types/uiTypes";

export function setSnackbar(snackBarMessage, snackBarType) {
  return (dispatch) =>
    dispatch({
      type: SET_SNACKBAR,
      payload: {
        snackBarMessage,
        snackBarType,
      },
    });
}

export function hideSnackBar() {
  return (dispatch) =>
    dispatch({
      type: HIDE_SNACKBAR,
    });
}

export function toggleDarkMode() {
  return (dispatch) =>
    dispatch({
      type: TOGGLE_DARK_MODE,
    });
}
