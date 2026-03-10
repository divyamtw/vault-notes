import { createContext, useContext, useState, useEffect } from "react";
import { setAxiosAccessToken } from "../api/api.js";
import { logoutUser, refreshLogin, getUserProfile } from "../api/auth.service.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await refreshLogin();
        if (res?.accessToken) {
          setAccessToken(res.accessToken);
          // refreshLogin already calls setAxiosAccessToken, but to be sure:
          setAxiosAccessToken(res.accessToken);
          const profileRes = await getUserProfile();
          setUser(profileRes.user);
        }
      } catch (error) {
        // Valid case if user is not logged in / refreshToken is missing or expired
        setAccessToken(null);
        setAxiosAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = (token, userData) => {
    setAccessToken(token);
    setAxiosAccessToken(token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setAccessToken(null);
      setAxiosAccessToken(null);
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        accessToken,
        user,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
