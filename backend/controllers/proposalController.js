const prisma = require("../prisma/client");

// Create Proposal
exports.createProposal = async (req, res) => {
  try {
    const {
      projectId,
      coverLetter,
      bidAmount,
      deliveryDays,
    } = req.body;

    if (
      !projectId ||
      !coverLetter ||
      !bidAmount ||
      !deliveryDays
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const existingProposal =
      await prisma.proposal.findFirst({
        where: {
          projectId,
          freelancerId: req.user.id,
        },
      });

    if (existingProposal) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted a proposal",
      });
    }

    const proposal = await prisma.proposal.create({
      data: {
        projectId,
        freelancerId: req.user.id,
        coverLetter,
        bidAmount: Number(bidAmount),
        deliveryDays: Number(deliveryDays),
      },
    });

    res.status(201).json({
      success: true,
      proposal,
    });
  } catch (error) {
    console.log("CREATE PROPOSAL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get My Proposals
exports.getMyProposals = async (req, res) => {
  try {
    const proposals = await prisma.proposal.findMany({
      where: {
        freelancerId: req.user.id,
      },
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      proposals,
    });
  } catch (error) {
    console.log("GET PROPOSALS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Proposals For Specific Project
exports.getProjectProposals = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
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
        message: "Not authorized",
      });
    }

    const proposals = await prisma.proposal.findMany({
      where: {
        projectId,
      },
      include: {
        freelancer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      proposals,
    });
  } catch (error) {
    console.log("GET PROJECT PROPOSALS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Accept Proposal
exports.acceptProposal = async (req, res) => {
  try {
    const proposal = await prisma.proposal.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        project: true,
      },
    });

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    if (proposal.project.clientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedProposal =
      await prisma.proposal.update({
        where: {
          id: req.params.id,
        },
        data: {
          status: "accepted",
        },
      });

    res.status(200).json({
      success: true,
      proposal: updatedProposal,
    });
  } catch (error) {
    console.log("ACCEPT PROPOSAL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Reject Proposal
exports.rejectProposal = async (req, res) => {
  try {
    const proposal = await prisma.proposal.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        project: true,
      },
    });

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    if (proposal.project.clientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedProposal =
      await prisma.proposal.update({
        where: {
          id: req.params.id,
        },
        data: {
          status: "rejected",
        },
      });

    res.status(200).json({
      success: true,
      proposal: updatedProposal,
    });
  } catch (error) {
    console.log("REJECT PROPOSAL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};