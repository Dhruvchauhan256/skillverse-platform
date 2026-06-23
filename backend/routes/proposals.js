const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Submit proposal
router.post("/", auth, async (req, res) => {
  try {
    const { projectId, bidAmount, deliveryDays, coverLetter } = req.body;
    const freelancerId = req.user.id;

    // Check if already proposed
    const existing = await prisma.proposal.findUnique({
      where: { projectId_freelancerId: { projectId, freelancerId } },
    });

    if (existing) {
      return res.status(400).json({ error: "Already proposed for this project" });
    }

    const proposal = await prisma.proposal.create({
      data: {
        projectId,
        freelancerId,
        bidAmount: parseFloat(bidAmount),
        deliveryDays: parseInt(deliveryDays),
        coverLetter,
      },
      include: {
        freelancer: { select: { id: true, name: true, avatarUrl: true } },
        project: { select: { id: true, title: true } },
      },
    });

    res.json(proposal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get proposals for project
router.get("/project/:projectId", async (req, res) => {
  try {
    const proposals = await prisma.proposal.findMany({
      where: { projectId: req.params.projectId },
      include: {
        freelancer: { select: { id: true, name: true, avatarUrl: true, hourlyRate: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(proposals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Accept proposal
router.post("/:proposalId/accept", auth, async (req, res) => {
  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id: req.params.proposalId },
      include: { project: true },
    });

    if (!proposal) return res.status(404).json({ error: "Proposal not found" });

    // Verify client owns project
    if (proposal.project.clientId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update proposal status
    const updatedProposal = await prisma.proposal.update({
      where: { id: req.params.proposalId },
      data: { status: "accepted" },
    });

    // Reject other proposals
    await prisma.proposal.updateMany({
      where: {
        projectId: proposal.projectId,
        id: { not: req.params.proposalId },
      },
      data: { status: "rejected" },
    });

    // Update project status
    await prisma.project.update({
      where: { id: proposal.projectId },
      data: { status: "in_progress" },
    });

    // Create order (for payments)
    const order = await prisma.order.create({
      data: {
        proposalId: req.params.proposalId,
        projectId: proposal.projectId,
        freelancerId: proposal.freelancerId,
        clientId: req.user.id,
        amount: proposal.bidAmount,
        platformFee: proposal.bidAmount * 0.08, // 8% commission
        amountHeld: proposal.bidAmount,
        deadline: proposal.project.deadline,
      },
    });

    res.json({ proposal: updatedProposal, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;