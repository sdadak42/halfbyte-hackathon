const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  getQuizResults,
  getMyQuizResults
} = require("./quiz.controller");

router.use(authMiddleware);

router.post("/", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/submit", submitQuiz);
router.get("/:id/results", getQuizResults);
router.get("/:id/my-results", getMyQuizResults);

module.exports = router;
