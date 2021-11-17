import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "sanitize.css/sanitize.css";
import "bootstrap/dist/css/bootstrap.min.css";

import store from "./store";
import App from "./containers/app";

import "./index.css";

const target = document.querySelector("#root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
);
