const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
createProject,
getAllProjects,
getMyProjects,
} = require("../controllers/projectController");

router.get("/", getAllProjects);
router.get("/debug-users", async (req, res) => {
  const prisma = require("../prisma/client");

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  res.json(users);
});
router.get("/my", protect, getMyProjects);

router.post("/", protect, createProject);

module.exports = router;
