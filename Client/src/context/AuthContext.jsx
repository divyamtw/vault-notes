import { createContext, useContext, useState } from "react";
import { setAxiosAccessToken } from "../api/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    setAccessToken(token);
    setAxiosAccessToken(token);
    setUser(userData);
  };
  const logout = () => {
    setAccessToken(null);
    setAxiosAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, accessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
