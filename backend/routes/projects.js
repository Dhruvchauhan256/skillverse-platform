const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Create project
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, category, budget, deadline } = req.body;

    if (!title || !description || !budget || !deadline) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        category: category || "other",
        budget: parseFloat(budget),
        deadline: new Date(deadline),
        clientId: req.user.id,
      },
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all projects (browsable)
router.get("/", async (req, res) => {
  try {
    const { category, minBudget, maxBudget, search } = req.query;

    const where = {
      status: "open",
    };

    if (category) where.category = category;
    if (minBudget) where.budget = { gte: parseFloat(minBudget) };
    if (maxBudget) {
      where.budget = { ...where.budget, lte: parseFloat(maxBudget) };
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        client: { select: { id: true, name: true, avatarUrl: true } },
        proposals: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project
router.get("/:projectId", async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.projectId },
      include: {
        client: { select: { id: true, name: true, avatarUrl: true } },
        proposals: {
          include: { freelancer: { select: { id: true, name: true, avatarUrl: true, hourlyRate: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's projects
router.get("/user/:userId", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { clientId: req.params.userId },
      include: {
        proposals: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;