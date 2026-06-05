const prisma = require("../prisma/client");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      budget,
      category,
    } = req.body;

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
    console.log(error);

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
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};