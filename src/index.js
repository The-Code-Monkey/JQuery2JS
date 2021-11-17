import React from "react";
import { render } from "react-dom";

import "sanitize.css/sanitize.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./containers/app";

import "./index.css";

const target = document.querySelector("#root");

render(
  <App />,
  target
);
