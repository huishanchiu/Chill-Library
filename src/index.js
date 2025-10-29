import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import ScrollToTop from "./Components/common/ScrollToTop";
import { store } from "./redux/store";

const Root = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <App />
      </Provider>
    </ScrollToTop>
  </BrowserRouter>
);

export default Root;
