import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import { SpaApp } from "./SpaApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SpaApp />
    </BrowserRouter>
  </React.StrictMode>
);
