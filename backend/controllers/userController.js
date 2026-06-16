const prisma = require("../prisma/client");

// ================================
// GET CURRENT USER
// ================================
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
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
    console.error("GET CURRENT USER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================================
// UPDATE FREELANCER PROFILE
// ================================
exports.updateFreelancerProfile = async (req, res) => {
  try {
    const {
      title,
      bio,
      skills,
      hourlyRate,
      country,
    } = req.body;

    // Validation
    if (!title || !bio || !skills || !hourlyRate || !country) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingProfile = await prisma.freelancerProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    let profile;

    if (existingProfile) {
      profile = await prisma.freelancerProfile.update({
        where: {
          userId: req.user.id,
        },
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
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// UPDATE CLIENT PROFILE
// ================================
exports.updateClientProfile = async (req, res) => {
  try {
    const { name, companyName, description } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // Update user name
    await prisma.user.update({
      where: { id: req.user.id },
      data: { name },
    });

    // Update or create client profile
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

    // Return updated user
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
    console.error("UPDATE CLIENT PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
