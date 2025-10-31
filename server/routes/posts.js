import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  upload, // <-- import multer upload config
} from "../controllers/postController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// -----------------------------
// 📝 Public Routes
// -----------------------------
router.get("/", getPosts);          // Get all posts
router.get("/:id", getPostById);    // Get single post

// -----------------------------
// 🔐 Protected Routes
// -----------------------------
router.post("/", protect, upload.single("image"), createPost);     // Create new post
router.put("/:id", protect, upload.single("image"), updatePost);   // Update post
router.delete("/:id", protect, deletePost);                        // Delete post

export default router;
