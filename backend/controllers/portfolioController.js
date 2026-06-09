const prisma = require("../prisma/client");

// CREATE PORTFOLIO
exports.createPortfolio = async (req, res) => {
  try {
    const { title, description, imageUrl, liveUrl, githubUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        imageUrl,
        liveUrl,
        githubUrl,
        freelancerId: req.user.id, // from JWT middleware
      },
    });

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      portfolio,
    });
  } catch (error) {
    console.log("CREATE PORTFOLIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET MY PORTFOLIO
exports.getMyPortfolio = async (req, res) => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: {
        freelancerId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      portfolios,
    });
  } catch (error) {
    console.log("GET PORTFOLIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE PORTFOLIO
exports.updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, liveUrl, githubUrl } = req.body;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // security check
    if (portfolio.freelancerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updated = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        liveUrl,
        githubUrl,
      },
    });

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      portfolio: updated,
    });
  } catch (error) {
    console.log("UPDATE PORTFOLIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// DELETE PORTFOLIO
exports.deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    if (portfolio.freelancerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await prisma.portfolio.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    console.log("DELETE PORTFOLIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
