import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useContext";

interface Props {
  children: JSX.Element;
}

export const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!router.isReady) {
    //   return;
    // }

    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting");
      navigate("auth/login", { replace: true, state: { redirect: true } });
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, navigate]);

  if (!checked) {
    return null;
  }

  return children;
};
