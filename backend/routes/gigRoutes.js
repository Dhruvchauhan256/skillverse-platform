const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createGig,
  getAllGigs,
} = require("../controllers/gigController");

// Public
router.get("/", getAllGigs);

// Protected
router.post("/", protect, createGig);

module.exports = router;