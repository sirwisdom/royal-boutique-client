import { combineReducers } from "redux";
import userReducer from "./userReducer";
import uiReducer from "./uiReducers";

const allReducers = combineReducers({
  user: userReducer,
  UI: uiReducer,
});

export default allReducers;
