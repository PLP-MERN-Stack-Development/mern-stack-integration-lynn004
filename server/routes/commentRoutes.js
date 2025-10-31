import express from "express";
import Comment from "../models/Comment.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

// ✅ Add a new comment
router.post("/:postId", protect, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content.trim()) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const comment = new Comment({
      post: req.params.postId,
      user: req.user._id,
      content,
    });

    await comment.save();
    const populated = await comment.populate("user", "name");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
});

export default router;
