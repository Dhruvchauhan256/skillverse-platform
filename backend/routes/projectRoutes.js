// backend/routes/projectRoutes.js

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createProject,
  getAllProjects,
  getMyProjects,
  updateProject,
  deleteProject,
  closeProject,
} = require("../controllers/projectController");

// ✅ SPECIFIC routes MUST come before generic /:id routes
router.get("/", getAllProjects);
router.get("/my", protect, getMyProjects);
router.post("/", protect, createProject);

// ✅ /close/:id BEFORE /:id — otherwise Express matches /:id first
router.put("/close/:id", protect, closeProject);

router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
