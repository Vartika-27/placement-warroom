const authMiddleware = require("../middleware/authMiddleware")
const express = require("express")

const router = express.Router()

const Goal = require("../models/Goal")

// GET ALL GOALS

router.get("/", authMiddleware, async (req, res) => {

  try {

    const goals = await Goal.find({

  user: req.user.userId,
    })

    res.json(goals)

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch goals",
    })
  }
})

// CREATE GOAL

router.post("/", authMiddleware, async (req, res) => {

  try {

    const newGoal = new Goal({

  task: req.body.task,

  user: req.user.userId,
})

    const savedGoal = await newGoal.save()

    res.status(201).json(savedGoal)

  } catch (error) {

    res.status(500).json({
      message: "Failed to create goal",
    })
  }
})

// DELETE GOAL

router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const deletedGoal = await Goal.findOneAndDelete({

  _id: req.params.id,

  user: req.user.userId,
})

    res.json(deletedGoal)

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete goal",
    })
  }
})

// TOGGLE GOAL COMPLETION

router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const goal = await Goal.findOne({

  _id: req.params.id,

  user: req.user.userId,
})

    if (!goal) {

      return res.status(404).json({
        message: "Goal not found",
      })
    }

    goal.completed = !goal.completed

    const updatedGoal = await goal.save()

    res.json(updatedGoal)

  } catch (error) {

    res.status(500).json({
      message: "Failed to update goal",
    })
  }
})

module.exports = router