import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "../screens/project-list/search-panel";
import { useMount } from "../utils";
import { http } from "utils/http";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (from: AuthForm) => Promise<void>;
      login: (from: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useMount(() => {
    bootstrapUser().then(setUser);
  });

  const login = (from: AuthForm) =>
    auth.login(from).then((user) => setUser(user));
  const register = (from: AuthForm) =>
    auth.register(from).then((user) => setUser(user));
  const logout = () => auth.logout().then((user) => setUser(null));

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth必现在AuthProvider中使用");
  }
  return context;
};
