import mongoose, { Schema } from "mongoose";

const userSchema = Schema.create({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    index: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "password is required!"],
    trim: true,
    select: false,
    minlength: 8,
  },
});

export const User = mongoose.model("User", userSchema);
