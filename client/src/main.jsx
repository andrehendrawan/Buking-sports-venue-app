import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./style.css";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import { Carousel, initTE } from "tw-elements";
import BookingHistoryPage from "./pages/BookingHistoryPage.jsx";
initTE({ Carousel }, true); // set second parameter to true if you want to use a debugger
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import store from "./store/index.js";
import { Provider } from "react-redux";

const auth = () => {
  const access_token = localStorage.access_token;
  if (!access_token) {
    throw redirect("/login");
  }
  return null;
};

const authLogin = () => {
  const access_token = localStorage.access_token;
  if (access_token) {
    throw redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: auth,
      },
      {
        path: "/venues/detail/:id",
        element: <DetailPage />,
        loader: auth,
      },
      {
        path: "/order/history/:id",
        element: <BookingHistoryPage />,
        loader: auth,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: authLogin,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: authLogin,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
