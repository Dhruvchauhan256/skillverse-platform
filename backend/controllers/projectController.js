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
console.log("CREATE PROJECT ERROR:", error);


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
console.log("GET ALL PROJECTS ERROR:", error);


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
where: {
clientId: req.user.id,
},
orderBy: {
createdAt: "desc",
},
});


res.status(200).json({
  success: true,
  projects,
});


} catch (error) {
console.log("GET MY PROJECTS ERROR:", error);


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


const {
  title,
  description,
  budget,
  category,
} = req.body;

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

const updatedProject =
  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      budget,
      category,
    },
  });

res.status(200).json({
  success: true,
  project: updatedProject,
});


} catch (error) {
console.log(error);


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

    console.log("DELETE PROJECT ID:", id);
    console.log("USER:", req.user);

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

    await prisma.project.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Project deleted",
    });

  } catch (error) {
    console.log("DELETE ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};