import { useAuth } from "../context/AuthContext.jsx";
import { loginUser } from "../api/auth.api.js";

const useAuthAction = () => {
  const authContext = useAuth();

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    const { accessToken, safeUser } = res;
    authContext.login(accessToken, safeUser);
  };

  return { login };
};

export { useAuthAction };
