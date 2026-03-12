const express = require("express");
const router = express.Router();

const {
  createPlacement,
  getPlacements,
  getPlacementById,
  applyForPlacement,
  shortlistStudent,
  getMyApplications,
  closePlacement
} = require("../controllers/placementController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Admin creates placement
router.post(
  "/create",
  protect,
  authorizeRoles("admin"),
  createPlacement
);

// Get all placements (students see all, admin/recruiter see with stats)
router.get(
  "/",
  protect,
  getPlacements
);

// Get single placement
router.get(
  "/:id",
  protect,
  getPlacementById
);

// Student applies for placement
router.post(
  "/apply/:id",
  protect,
  authorizeRoles("student"),
  applyForPlacement
);

// Get my applications
router.get(
  "/student/applications",
  protect,
  authorizeRoles("student"),
  getMyApplications
);

// Admin shortlists student
router.post(
  "/shortlist/:id",
  protect,
  authorizeRoles("admin"),
  shortlistStudent
);

// Admin closes placement
router.put(
  "/:id/close",
  protect,
  authorizeRoles("admin"),
  closePlacement
);

module.exports = router;
