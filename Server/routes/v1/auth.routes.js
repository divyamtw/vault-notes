import {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
} from "../../controller/user.controller.js";
import express from "express";
import verifyAccessToken from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", verifyAccessToken, userProfile);

export default router;
