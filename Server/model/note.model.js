import { Schema, model } from "mongoose";

const noteSchema = Schema.create(
  {
    Owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      default: "untitled",
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
