const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createGig,
  getAllGigs,
} = require("../controllers/gigController");

// CREATE GIG
router.post("/", protect, createGig);

// GET ALL GIGS
router.get("/", getAllGigs);

module.exports = router;
