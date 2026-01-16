import {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
} from "../controller/user.controller.js";
import express from "express";
import verifyAccessToken from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/logout", logoutUser);
route.get("/profile", verifyAccessToken, userProfile);

export default route;
