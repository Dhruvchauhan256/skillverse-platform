const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createProfile,
  getMyProfile,
} = require("../controllers/profileController");

// CREATE PROFILE
router.post("/freelancer", protect, createProfile);

// GET PROFILE
router.get("/freelancer", protect, getMyProfile);

module.exports = router;
