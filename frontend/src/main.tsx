import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Main Layout
import LayoutPage from "./views/LayoutPage.tsx";

// Pages
import HomePage from "./views/HomePage.tsx";
import CarDetailsPage from "./views/CarDetailsPage.tsx";
import ErrorPage from "./views/ErrorPage.tsx";
import TradeInFormPage from "./views/TradeInFormPage.tsx";
import LoginPage from "./views/LoginPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "details/:id",
        element: <CarDetailsPage />,
      },
      {
        path: "trade",
        element: <TradeInFormPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
