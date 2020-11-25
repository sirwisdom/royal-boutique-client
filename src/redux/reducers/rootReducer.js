import { combineReducers } from "redux";
import userReducer from "./userReducer";
import uiReducer from "./uiReducers";
import cartReducer from './cartReducer'

const allReducers = combineReducers({
  user: userReducer,
  UI: uiReducer,
  cartReducer: cartReducer
});

export default allReducers;
