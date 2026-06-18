const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createReview,
  getUserReviews,
  getProjectReviews,
  updateReview,
  deleteReview,
  getMyReviewsGiven,
} = require("../controllers/reviewController");

// Create review
router.post("/", protect, createReview);

// Get reviews for a user
router.get("/user/:userId", getUserReviews);

// Get reviews for a project
router.get("/project/:projectId", getProjectReviews);

// Get my reviews given
router.get("/my/given", protect, getMyReviewsGiven);

// Update review
router.put("/:id", protect, updateReview);

// Delete review
router.delete("/:id", protect, deleteReview);

module.exports = router;