const express = require("express");
const router = express.Router();
const {
  addQuizQuestion,
  getQuizQuestions,
  submitQuiz
} = require("../controllers/quizController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Admin adds quiz
router.post(
  "/add",
  protect,
  authorizeRoles("admin"),
  addQuizQuestion
);

// Student fetches quiz
router.get(
  "/",
  protect,
  authorizeRoles("student"),
  getQuizQuestions
);

// Student submits quiz
router.post(
  "/submit",
  protect,
  authorizeRoles("student"),
  submitQuiz
);

module.exports = router;
