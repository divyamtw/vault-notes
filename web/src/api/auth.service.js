import { api, setAxiosAccessToken } from "./api.js";

// Register
const registerUser = async (userData) => {
  const response = await api.post("/v1/auth/register", userData);
  return response.data;
};

// Login
const loginUser = async (credentials) => {
  const response = await api.post("/v1/auth/login", credentials);

  if (response.data.accessToken) {
    setAxiosAccessToken(response.data.accessToken);
  }

  return response.data;
};

// Refresh Login
const refreshLogin = async () => {
  try {
    const response = await api.post("/v1/auth/refresh-token");

    if (response.data.accessToken) {
      setAxiosAccessToken(response.data.accessToken);
    }

    return response.data;
  } catch (error) {
    setAxiosAccessToken(null);
    throw new Error("Session expired");
  }
};

// Logout
const logoutUser = async () => {
  const response = await api.post("/v1/auth/logout");
  setAxiosAccessToken(null);
  return response.data;
};

// Profile
const getUserProfile = async () => {
  const response = await api.get("/v1/auth/profile");
  return response.data;
};

export { registerUser, loginUser, logoutUser, getUserProfile, refreshLogin };