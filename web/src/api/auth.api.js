import { api } from "./api.js";

const registerUser = async (firstName, lastName, email, password) => {
  try {
    const response = await api.post("/api/v1/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong while registering user"
    );
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await api.post("/api/v1/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong while logging in user"
    );
  }
};

const logoutUser = async () => {
  try {
    const response = await api.post("/api/v1/auth/logout");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong while logging out user"
    );
  }
};

const getUserProfile = async () => {
  try {
    const response = await api.get("/api/v1/auth/profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong while getting user profile"
    );
  }
};

export { registerUser, loginUser, logoutUser, getUserProfile };
