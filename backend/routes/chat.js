const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Get all chats for user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await prisma.chat.findMany({
      where: {
        OR: [{ freelancerId: userId }, { clientId: userId }],
      },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { content: true, createdAt: true },
        },
        freelancer: { select: { id: true, name: true, avatarUrl: true } },
        client: { select: { id: true, name: true, avatarUrl: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    const formattedChats = chats.map((chat) => ({
      id: chat.id,
      otherUser: chat.freelancerId === userId ? chat.client : chat.freelancer,
      lastMessage: chat.messages[0]?.content || "No messages",
      lastMessageTime: chat.messages[0]?.createdAt || chat.createdAt,
      projectId: chat.projectId,
    }));

    res.json(formattedChats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create or get chat
router.post("/create-or-get", auth, async (req, res) => {
  try {
    const { otherUserId, projectId } = req.body;
    const currentUserId = req.user.id;

    // Check if chat exists
    let chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { freelancerId: currentUserId, clientId: otherUserId },
          { freelancerId: otherUserId, clientId: currentUserId },
        ],
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          freelancerId: currentUserId,
          clientId: otherUserId,
          projectId: projectId || null,
        },
      });
    }

    const otherUser = await prisma.user.findUnique({
      where: { id: otherUserId },
      select: { id: true, name: true, avatarUrl: true },
    });

    res.json({ id: chat.id, otherUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get messages for chat
router.get("/:chatId/messages", async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await prisma.message.findMany({
      where: { chatId },
      include: {
        sender: { select: { id: true, name: true, avatarUrl: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;