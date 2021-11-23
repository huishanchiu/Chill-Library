import { combineReducers } from "redux";
import getCurrentUserReducer from "./getCurrentUser_reducer";

const allReducers = combineReducers({
  currentUser: getCurrentUserReducer,
});

export default allReducers;
