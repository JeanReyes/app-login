import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useContext";

interface Props {
  children: JSX.Element;
}

export const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // if (!router.isReady) {
    //   return;
    // }

    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated) {
      navigate("/auth/login", { replace: true, state: { redirect: true } });
    } else {
      navigate(location.pathname, { replace: true });
      setChecked(true);
    }
  }, [isAuthenticated, navigate, location.pathname]);

  if (!checked) {
    return null;
  }

  return children;
};
