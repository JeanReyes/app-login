import { AuthGuard } from "../../utils/auth/AuthGuard";
import { NavBar } from "../NavBar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <AuthGuard>
        <>
          <NavBar />
          <Outlet />
        </>
      </AuthGuard>
    </div>
  );
};
