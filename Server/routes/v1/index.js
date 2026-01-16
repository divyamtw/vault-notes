import express from "express";
import authRoute from "./auth.routes.js";
import notesRoute from "./notes.routes.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/notes", notesRoute);

export default router;
