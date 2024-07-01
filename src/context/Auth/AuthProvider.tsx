/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useReducer, useRef } from "react";
import { User } from "../../interfaces/Auth";
import { AuthReducer } from "./AuthReducer";
import { AuthContext } from "./AuthContext";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
}

const AUTH_INITIAL_STATE: AuthState = {
  isAuthenticated:
    (typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("authenticated") as string)
      : null) !== null
      ? true
      : false,
  isLoading: true,
  user: {} as User,
};

interface Props {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
  const [stateAuth, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = stateAuth.isAuthenticated;

    try {
      isAuthenticated = window.localStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      //aqui hacer la autenticacion
      const user: User = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/avatar-anika-visser.png",
        name: "Jean Reyes",
        email: "nes@company.cl",
      };

      dispatch({
        type: "init-login",
        payload: user,
      });
    } else {
      dispatch({
        type: "init-login",
      });
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      window.localStorage.setItem("authenticated", "true");
      const user: User = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/avatar-anika-visser.png",
        name: "Jean Reyes",
        email: "nes@company.cl",
      };

      dispatch({
        type: "sign-in",
        payload: user,
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const signOut = () => {
    window.localStorage.removeItem("authenticated");
    dispatch({
      type: "sing-out",
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...stateAuth,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
