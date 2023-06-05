import React from "react";

import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./store/store";

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("toasterNotification");
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
);
reportWebVitals();
