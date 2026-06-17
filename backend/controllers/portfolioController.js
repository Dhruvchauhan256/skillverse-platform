const prisma = require("../prisma/client");
const { logError } = require("../utils/logger");

exports.createPortfolio = async (req, res) => {
  try {
    const { title, description, imageUrl, liveUrl, githubUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const freelancerProfile = await prisma.freelancerProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!freelancerProfile) {
      return res.status(404).json({
        success: false,
        message: "Freelancer profile not found. Create profile first.",
      });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        imageUrl,
        liveUrl,
        githubUrl,
        freelancerId: freelancerProfile.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      portfolio,
    });
  } catch (error) {
    logError("CREATE PORTFOLIO", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getMyPortfolio = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const freelancerProfile = await prisma.freelancerProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!freelancerProfile) {
      return res.status(404).json({
        success: false,
        message: "Freelancer profile not found",
      });
    }

    const portfolios = await prisma.portfolio.findMany({
      where: { freelancerId: freelancerProfile.id },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      portfolios,
    });
  } catch (error) {
    logError("GET PORTFOLIO", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updatePortfolio = async (req, res) => {
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

    const updated = await prisma.portfolio.update({
      where: { id },
      data: req.body,
    });

    return res.json({
      success: true,
      message: "Updated successfully",
      portfolio: updated,
    });
  } catch (error) {
    logError("UPDATE PORTFOLIO", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

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

    await prisma.portfolio.delete({
      where: { id },
    });

    return res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    logError("DELETE PORTFOLIO", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
