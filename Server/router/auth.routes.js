import {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
} from "../controller/user.controller.js";
import express from "express";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/logout", logoutUser);
route.get("/profile", userProfile);

export default route;
