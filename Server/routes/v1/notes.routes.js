import express from "express";
import {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
} from "../../controller/note.controller.js";
import verifyAccessToken from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyAccessToken, createNote);
router.patch("/:id", verifyAccessToken, updateNote);
router.delete("/:id", verifyAccessToken, deleteNote);
router.get("/", verifyAccessToken, getAllNotes);

export default router;
