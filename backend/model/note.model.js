import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      default: "Untitled",
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Note = model("Note", noteSchema);
