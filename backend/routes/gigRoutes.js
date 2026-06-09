const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const gigController = require("../controllers/gigController");

// DEBUG CHECK (important)
console.log("gigController:", gigController);

// ROUTES
router.post("/", protect, gigController.createGig);
router.get("/", gigController.getAllGigs);

module.exports = router;
