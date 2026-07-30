const mongoose = require("mongoose");

const solvedQuestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    platform: {
      type: String,
      default: "LeetCode",
    },

    problemUrl: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    solvedAt: {
      type: Date,
      default: Date.now,
    },

    revisionCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SolvedQuestion",
  solvedQuestionSchema
);