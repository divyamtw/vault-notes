import { Note } from "../model/note.model.js";

const createNote = async (req, res) => {
  const { title, content, isImportant } = req.body;
  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Note content is required!" });
  }

  try {
    let finalTitle = title?.trim();
    if (!finalTitle) {
      finalTitle = `Untitled - ${content.trim().substring(0, 30)}`;
    }

    const note = await Note.create({
      owner: req.user._id,
      title: finalTitle,
      content: content?.trim(),
      isImportant: isImportant ?? false,
    });

    return res
      .status(201)
      .json({ message: "Note created successfully!", note });
  } catch (error) {
    console.log("note creation failed! : ", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while creating note!" });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, isImportant } = req.body;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found!" });
    }

    // check ownership
    if (note.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this note" });
    }

    if (title !== undefined) {
      const trimmedTitle = title.trim();
      if (trimmedTitle) {
        note.title = trimmedTitle;
      } else if (content !== undefined) {
        note.title = `Untitled - ${content.trim().substring(0, 30)}`;
      }
    }
    if (content !== undefined) note.content = content.trim();
    if (isImportant !== undefined) note.isImportant = isImportant;

    await note.save();

    return res.status(200).json({ message: "Note updated successfully!" });
  } catch (error) {
    console.log("update note error: ", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while updating note" });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found!" });
    }

    if (note.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this note!" });
    }

    await note.deleteOne();

    return res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.log("delete note error : ", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong while deleting note" });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user._id });
    return res.status(200).json({ message: "All notes!", notes });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong while getting all notes" });
  }
};

export { createNote, updateNote, deleteNote, getAllNotes };
