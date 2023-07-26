import React from "react";
import ReactDOM from "react-dom/client";
import { TokenStore } from "./components/store/TokenContext";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TokenStore>
      <App />
    </TokenStore>
  </BrowserRouter>
);
