const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createGig,
  getAllGigs,
} = require("../controllers/gigController");

router.post("/", protect, createGig);
router.get("/", getAllGigs);

module.exports = router;
