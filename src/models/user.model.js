const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);
