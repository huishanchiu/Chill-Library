import { createStore } from "redux";
import allReducers from "./reducer/index";

export const store = createStore(
  allReducers,
  window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()
);
