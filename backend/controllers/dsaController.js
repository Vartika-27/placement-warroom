const SolvedQuestion = require("../models/SolvedQuestion");
const DsaTopic = require("../models/DsaTopic");

/**
 * Updates the topic counters whenever a question is added or removed.
 */
async function updateTopicCounts(userId, topicName, difficulty, operation) {
  let topic = await DsaTopic.findOne({
    user: userId,
    topic: topicName,
  });

  // Create topic automatically if adding the first question
  if (!topic && operation === "increment") {
    topic = await DsaTopic.create({
      user: userId,
      topic: topicName,
    });
  }

  if (!topic) return null;

  const delta = operation === "increment" ? 1 : -1;

  switch (difficulty) {
    case "Easy":
      topic.easySolved = Math.max(0, topic.easySolved + delta);
      break;

    case "Medium":
      topic.mediumSolved = Math.max(0, topic.mediumSolved + delta);
      break;

    case "Hard":
      topic.hardSolved = Math.max(0, topic.hardSolved + delta);
      break;

    default:
      break;
  }

  topic.completed =
    topic.easySolved >= topic.easyTarget &&
    topic.mediumSolved >= topic.mediumTarget &&
    topic.hardSolved >= topic.hardTarget;

  await topic.save();

  return topic;
}

/**
 * POST /api/dsa/question
 * Add a solved question
 */
const addSolvedQuestion = async (req, res) => {
  try {
    const {
      title,
      topic,
      difficulty,
      platform,
      problemUrl,
      notes,
    } = req.body;

    const solvedQuestion = await SolvedQuestion.create({
      user: req.user.userId,
      title,
      topic,
      difficulty,
      platform,
      problemUrl,
      notes,
    });

    await updateTopicCounts(
      req.user.userId,
      topic,
      difficulty,
      "increment"
    );

    res.status(201).json(solvedQuestion);

  } catch (error) {
  console.error("REGISTER ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};

/**
 * GET /api/dsa/questions
 * Get all solved questions
 */
const getSolvedQuestions = async (req, res) => {
  try {
    const questions = await SolvedQuestion.find({
      user: req.user.userId,
    }).sort({
      solvedAt: -1,
    });

    res.json(questions);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch questions",
    });
  }
};

/**
 * GET /api/dsa/topics
 * Get topic statistics
 */
const getTopics = async (req, res) => {
  try {
    const topics = await DsaTopic.find({
      user: req.user.userId,
    }).sort({
      topic: 1,
    });

    res.json(topics);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch topics",
    });
  }
};

/**
 * DELETE /api/dsa/question/:id
 * Delete a solved question
 */
const deleteSolvedQuestion = async (req, res) => {
  try {
    const question = await SolvedQuestion.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    await updateTopicCounts(
      req.user.userId,
      question.topic,
      question.difficulty,
      "decrement"
    );

    await question.deleteOne();

    res.json({
      message: "Question deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete question",
    });
  }
};

module.exports = {
  addSolvedQuestion,
  getSolvedQuestions,
  getTopics,
  deleteSolvedQuestion,
};