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

    const proposal = await prisma.proposal.create({
      data: {
        projectId,
        coverLetter,
        bidAmount: Number(bidAmount),
        deliveryDays: Number(deliveryDays),
        freelancerId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      proposal,
    });
  } catch (error) {
    console.log(error);

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

    res.json({
      success: true,
      proposals,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};