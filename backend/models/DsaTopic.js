const mongoose = require("mongoose");

const dsaTopicSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
      unique: false,
    },

    easySolved: {
      type: Number,
      default: 0,
    },

    mediumSolved: {
      type: Number,
      default: 0,
    },

    hardSolved: {
      type: Number,
      default: 0,
    },

    easyTarget: {
      type: Number,
      default: 25,
    },

    mediumTarget: {
      type: Number,
      default: 20,
    },

    hardTarget: {
      type: Number,
      default: 10,
    },

    revisionDue: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DsaTopic",
  dsaTopicSchema
);