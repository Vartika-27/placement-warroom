const Goal = require("../models/Goal");

// GET ALL GOALS
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user.userId,
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch goals",
    });
  }
};

// CREATE GOAL
const createGoal = async (req, res) => {
  try {
    const newGoal = new Goal({
      task: req.body.task,
      user: req.user.userId,
    });

    const savedGoal = await newGoal.save();

    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create goal",
    });
  }
};

// DELETE GOAL
const deleteGoal = async (req, res) => {
  try {
    const deletedGoal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    res.json(deletedGoal);
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete goal",
    });
  }
};

// TOGGLE GOAL
const toggleGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    goal.completed = !goal.completed;

    const updatedGoal = await goal.save();

    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update goal",
    });
  }
};

module.exports = {
  getGoals,
  createGoal,
  deleteGoal,
  toggleGoal,
};