import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded successfully",
    imageUrl: `/uploads/${req.file.filename}`,
  });
});

export default router;
