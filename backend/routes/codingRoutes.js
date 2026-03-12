const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  addQuestion,
  getQuestions,
  submitCode
} = require("../controllers/codingController");

// Admin
router.post("/add", protect, authorizeRoles("admin"), addQuestion);

// Student
router.get("/", protect, authorizeRoles("student"), getQuestions);
router.post("/submit", protect, authorizeRoles("student"), submitCode);

module.exports = router;
