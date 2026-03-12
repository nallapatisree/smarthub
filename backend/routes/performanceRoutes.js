const express = require("express");
const router = express.Router();
const { getMyPerformance } = require("../controllers/performanceController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get(
  "/me",
  protect,
  authorizeRoles("student"),
  getMyPerformance
);

module.exports = router;
