import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import "sanitize.css/sanitize.css";
import "bootstrap/dist/css/bootstrap.min.css";

import store, { history } from "./store";
import App from "./containers/app";

import "./index.css";

const target = document.querySelector("#root");

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);
