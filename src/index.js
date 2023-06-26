import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import ReactDOM from "react-dom/client";

import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

import { store } from "./app/store/index";
import { ServicesContextProvider } from "./app/context/ServicesContext";
import App from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ServicesContextProvider>
        <App />
      </ServicesContextProvider>
    </PersistGate>
  </Provider>
);
