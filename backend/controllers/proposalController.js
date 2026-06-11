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

    // Validation
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

    // Check project exists
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

    // Prevent duplicate proposals
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
