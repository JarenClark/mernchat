import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import alertTemplate from "react-alert-template-basic";

import {
  Root,
  Home,
  Login,
  Register,
  ErrorPage,
  ProtectedRoute,
} from "./components";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const alertOptions = {
  timeout: 5000,
  positions: positions.TOP_RIGHT,
  transitions: transitions.FADE,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <AlertProvider template={alertTemplate} {...alertOptions}>
        <RouterProvider router={router} />
      </AlertProvider>
    </Provider>
  </>
);
