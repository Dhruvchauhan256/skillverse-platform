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

    const freelancerProfile = await prisma.freelancerProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!freelancerProfile) {
      return res.status(404).json({
        success: false,
        message: "Freelancer profile not found",
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

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      portfolio,
    });
  } catch (error) {
    console.error("CREATE PORTFOLIO ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET MY PORTFOLIO
exports.getMyPortfolio = async (req, res) => {
  try {
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
    });

    res.status(200).json({
      success: true,
      portfolios,
    });
  } catch (error) {
    console.error("GET PORTFOLIO ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE
exports.updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.portfolio.update({
      where: { id },
      data: req.body,
    });

    res.json({
      success: true,
      message: "Updated successfully",
      portfolio: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE
exports.deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.portfolio.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
