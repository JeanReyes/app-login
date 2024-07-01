/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { User } from "../../interfaces/Auth";

export interface ContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

export const AuthContext = createContext({} as ContextProps);
