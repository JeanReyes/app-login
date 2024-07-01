/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./components/auth/login";
import { Layout } from "./components/layout/Layout";
import { DASHBOARD } from "./utils/constants";
import { useState } from "react";

// import { useEffect } from "react";
const menu = [
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "contact",
    element: <div>contact</div>,
  },
];

export const App = () => {
  const [isAuthenticated] = useState(
    (typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("authenticated") as string)
      : null) !== null
      ? true
      : false
  );
  const router = createBrowserRouter([
    {
      path: "auth/login",
      element: <Login />,
    },
    {
      path: DASHBOARD,
      element: <Layout />,
      children: [
        ...menu.map((route) => ({
          path: route.path,
          element: route.element,
        })),
      ],
    },
    {
      path: "*",
      element: isAuthenticated ? (
        <Navigate to={DASHBOARD} />
      ) : (
        <Navigate to="/auth/login" />
      ),
    },
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
