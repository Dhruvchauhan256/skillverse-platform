const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
createProject,
getAllProjects,
getMyProjects,
} = require("../controllers/projectController");

router.get("/", getAllProjects);

router.get("/my", protect, getMyProjects);

router.post("/", protect, createProject);

module.exports = router;
