import { api } from "./api.js";

// Get All Notes
const getAllNotes = async () => {
  const response = await api.get("/v1/notes");
  return response.data;
};

// Create a Note
const createNote = async (noteData) => {
  const response = await api.post("/v1/notes", noteData);
  return response.data;
};

// Update a Note
const updateNote = async (id, noteData) => {
  const response = await api.patch(`/v1/notes/${id}`, noteData);
  return response.data;
};

// Delete a Note
const deleteNote = async (id) => {
  const response = await api.delete(`/v1/notes/${id}`);
  return response.data;
};

export { getAllNotes, createNote, updateNote, deleteNote };
