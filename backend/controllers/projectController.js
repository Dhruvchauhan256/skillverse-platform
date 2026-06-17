const prisma = require("../prisma/client");
const { logError } = require("../utils/logger");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { title, description, budget, category } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        budget,
        category,
        clientId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    logError("CREATE PROJECT", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    logError("GET ALL PROJECTS", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get My Projects
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { clientId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    logError("GET MY PROJECTS", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Edit Project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, budget, category } = req.body;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.clientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { title, description, budget, category },
    });

    res.status(200).json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    logError("UPDATE PROJECT", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.clientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await prisma.proposal.deleteMany({
      where: { projectId: id },
    });

    await prisma.project.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    logError("DELETE PROJECT", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Close Project
exports.closeProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.clientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { status: "closed" },
    });

    res.status(200).json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    logError("CLOSE PROJECT", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
