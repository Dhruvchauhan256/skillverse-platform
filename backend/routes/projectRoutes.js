const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProject,
  getAllProjects,
} = require("../controllers/projectController");

router.get("/", getAllProjects);

router.post("/", protect, createProject);

module.exports = router;