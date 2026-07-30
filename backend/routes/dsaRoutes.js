const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const {
  solvedQuestionSchema,
} = require("../validators/dsaValidator");

const {
  addSolvedQuestion,
  getSolvedQuestions,
  getTopics,
  deleteSolvedQuestion,
} = require("../controllers/dsaController");

const router = express.Router();

router.post(
  "/question",
  authMiddleware,
  validate(solvedQuestionSchema),
  addSolvedQuestion
);

router.get(
  "/questions",
  authMiddleware,
  getSolvedQuestions
);

router.get(
  "/topics",
  authMiddleware,
  getTopics
);

router.delete(
  "/question/:id",
  authMiddleware,
  deleteSolvedQuestion
);

module.exports = router;