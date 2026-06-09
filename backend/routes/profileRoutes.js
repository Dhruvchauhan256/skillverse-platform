const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createFreelancerProfile,
  getFreelancerProfile,
} = require("../controllers/profileController");

router.post("/freelancer", protect, createFreelancerProfile);
router.get("/freelancer", protect, getFreelancerProfile);

module.exports = router;
