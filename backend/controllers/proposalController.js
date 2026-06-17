const prisma = require("../prisma/client");
const { logError } = require("../utils/logger");

exports.createProposal = async (req, res) => {
  try {
    const { projectId, coverLetter, bidAmount, deliveryDays } = req.body;

    if (!projectId || !coverLetter || !bidAmount || !deliveryDays) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const existingProposal = await prisma.proposal.findFirst({
      where: { projectId, freelancerId: req.user.id },
    });

    if (existingProposal) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a proposal",
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
    logError("CREATE PROPOSAL", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getMyProposals = async (req, res) => {
  try {
    const proposals = await prisma.proposal.findMany({
      where: { freelancerId: req.user.id },
      include: { project: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      proposals,
    });
  } catch (error) {
    logError("GET MY PROPOSALS", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getProjectProposals = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
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
      where: { projectId },
      include: {
        freelancer: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      proposals,
    });
  } catch (error) {
    logError("GET PROJECT PROPOSALS", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.acceptProposal = async (req, res) => {
  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id: req.params.id },
      include: { project: true },
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

    const updatedProposal = await prisma.proposal.update({
      where: { id: req.params.id },
      data: { status: "accepted" },
    });

    res.status(200).json({
      success: true,
      proposal: updatedProposal,
    });
  } catch (error) {
    logError("ACCEPT PROPOSAL", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.rejectProposal = async (req, res) => {
  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id: req.params.id },
      include: { project: true },
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

    const updatedProposal = await prisma.proposal.update({
      where: { id: req.params.id },
      data: { status: "rejected" },
    });

    res.status(200).json({
      success: true,
      proposal: updatedProposal,
    });
  } catch (error) {
    logError("REJECT PROPOSAL", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
