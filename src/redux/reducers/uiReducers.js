const initialState = {
  loading: false,
  errors: null,
  signUpErrors: null,
  updateErrors: null,
  showNavbar: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_SIGNUP_ERRORS":
      return {
        ...state,
        loading: false,
        signUpErrors: action.payload,
      };
    case "CLEAR_SIGNUP_ERRORS":
      return {
        ...state,
        loading: false,
        signUpErrors: null,
      };
    case "SET_UPDATE_ERRORS":
      return {
        ...state,
        loading: false,
        updateErrors: action.payload,
      };
    case "CLEAR_UPDATE_ERRORS":
      return {
        ...state,
        loading: false,
        updateErrors: null,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case "CLEAR_MESSAGE":
      return {
        ...state,
        loading: false,
        message: null,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case "LOADING_UI":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING_UI":
      return {
        ...state,
        loading: false,
      };
    case "TOGGLE_NAVBAR":
      return {
        ...state,
        showNavbar: !state.showNavbar,
      };

    case "HIDE_NAVBAR":
      return {
        ...state,
        showNavbar: false,
      };

    default:
      return state;
  }
}
