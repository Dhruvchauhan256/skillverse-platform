const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Multer config
const upload = multer({
  dest: "uploads/temp/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"));
    }
  },
});

// Upload avatar
router.post("/upload", auth, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const userId = req.user.id;
    const fileExt = path.extname(req.file.originalname);
    const fileName = `${userId}-${Date.now()}${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Read and upload
    const fileBuffer = fs.readFileSync(req.file.path);
    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, fileBuffer, { contentType: req.file.mimetype });

    fs.unlinkSync(req.file.path);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const avatarUrl = urlData.publicUrl;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });

    res.json({ success: true, avatarUrl, user: updatedUser });
  } catch (error) {
    console.error("Avatar upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get user avatar
router.get("/:userId", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
      select: { avatarUrl: true, name: true, role: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;