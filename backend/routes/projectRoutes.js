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

router.get("/", getAllProjects);

router.get("/my", protect, getMyProjects);

router.post("/", protect, createProject);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

router.put("/close/:id", protect, closeProject);

module.exports = router;
