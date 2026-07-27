const mongoose = require("mongoose")

const goalSchema = new mongoose.Schema({

  task: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

}, {
  timestamps: true,
})

const Goal = mongoose.model("Goal", goalSchema)

module.exports = Goal