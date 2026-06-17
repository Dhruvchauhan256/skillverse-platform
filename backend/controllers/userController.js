const prisma = require("../prisma/client");
const { logError } = require("../utils/logger");

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        freelancerProfile: true,
        clientProfile: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...userData } = user;

    res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    logError("GET CURRENT USER", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateFreelancerProfile = async (req, res) => {
  try {
    const { title, bio, skills, hourlyRate, country } = req.body;

    if (!title || !bio || !skills || !hourlyRate || !country) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingProfile = await prisma.freelancerProfile.findUnique({
      where: { userId: req.user.id },
    });

    let profile;

    if (existingProfile) {
      profile = await prisma.freelancerProfile.update({
        where: { userId: req.user.id },
        data: {
          title,
          bio,
          skills,
          hourlyRate: Number(hourlyRate),
          country,
        },
      });
    } else {
      profile = await prisma.freelancerProfile.create({
        data: {
          title,
          bio,
          skills,
          hourlyRate: Number(hourlyRate),
          country,
          userId: req.user.id,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Freelancer profile updated successfully",
      profile,
    });
  } catch (error) {
    logError("UPDATE FREELANCER PROFILE", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateClientProfile = async (req, res) => {
  try {
    const { name, companyName, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { name },
    });

    const existing = await prisma.clientProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (existing) {
      await prisma.clientProfile.update({
        where: { userId: req.user.id },
        data: {
          companyName: companyName || null,
          description: description || null,
        },
      });
    } else {
      await prisma.clientProfile.create({
        data: {
          userId: req.user.id,
          companyName: companyName || null,
          description: description || null,
        },
      });
    }

    const updatedUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        clientProfile: true,
        freelancerProfile: true,
      },
    });

    const { password, ...userData } = updatedUser;

    res.status(200).json({
      success: true,
      message: "Client profile updated successfully",
      user: userData,
    });
  } catch (error) {
    logError("UPDATE CLIENT PROFILE", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
