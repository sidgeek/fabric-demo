import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { InstanceProvider } from "@backium/use-instance";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <InstanceProvider>
      <App />
    </InstanceProvider>
  </React.StrictMode>,
  rootElement
);
