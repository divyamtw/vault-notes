import { api } from "./api.js";

const createNote = async (title, content, isImportant) => {
  try {
    const response = await api.post("/api/v1/notes", {
      title,
      content,
      isImportant,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong while creating note"
    );
  }
};

const updateNote = async (id, data) => {
  try {
    const response = await api.patch(`/api/v1/notes/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong while updating note"
    );
  }
};

const deleteNote = async (id) => {
  try {
    const response = await api.delete(`/api/v1/notes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong while deleting note"
    );
  }
};

const getAllNotes = async () => {
  try {
    const response = await api.get("/api/v1/notes");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong while fetching notes"
    );
  }
};

export { createNote, updateNote, deleteNote, getAllNotes };
