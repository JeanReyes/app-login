import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./components/auth/login";
import { Layout } from "./components/layout/Layout";
import { AuthProvider } from "./context/Auth/AuthProvider";
import { DASHBOARD } from "./utils/constants";

function App() {
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

  const router = createBrowserRouter([
    {
      path: DASHBOARD,
      element: <Layout />,
      children: [
        ...menu.map((route) => ({
          path: route.path,
          element: route.element,
        })),
        {
          path: " ",
          element: <Navigate to="/about" />,
        },
      ],
    },
    {
      path: "auth/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="auth/login" />,
    },
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
