const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const { goalSchema } = require("../validators/goalValidator");

const {
  getGoals,
  createGoal,
  deleteGoal,
  toggleGoal,
} = require("../controllers/goalController");

const router = express.Router();

// Get all goals
router.get(
  "/",
  authMiddleware,
  getGoals
);

// Create goal
router.post(
  "/",
  authMiddleware,
  validate(goalSchema),
  createGoal
);

// Toggle goal
router.put(
  "/:id",
  authMiddleware,
  toggleGoal
);

// Delete goal
router.delete(
  "/:id",
  authMiddleware,
  deleteGoal
);

module.exports = router;