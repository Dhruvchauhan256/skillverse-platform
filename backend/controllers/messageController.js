const prisma = require("../prisma/client");

// Send Message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        success: false,
        message: "receiverId and content are required",
      });
    }

    const receiver = await prisma.user.findUnique({
      where: {
        id: receiverId,
      },
    });

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    const message = await prisma.message.create({
      data: {
        senderId: req.user.id,
        receiverId,
        content,
      },
    });

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.log("SEND MESSAGE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Messages Between Users (also marks them as read)
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: req.user.id,
            receiverId: userId,
          },
          {
            senderId: userId,
            receiverId: req.user.id,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Mark all messages FROM this user TO me as read
    await prisma.message.updateMany({
      where: {
        senderId: userId,
        receiverId: req.user.id,
        read: false,
      },
      data: {
        read: true,
      },
    });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log("GET MESSAGES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Conversations
exports.getConversations = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: req.user.id,
          },
          {
            receiverId: req.user.id,
          },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        receiver: {
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
      conversations: messages,
    });
  } catch (error) {
    console.log("GET CONVERSATIONS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Unread Message Count (NEW)
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await prisma.message.count({
      where: {
        receiverId: req.user.id,
        read: false,
      },
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.log("GET UNREAD COUNT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
