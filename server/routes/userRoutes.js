import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Register new user
router.post("/register", registerUser);

// ✅ Login user
router.post("/login", loginUser);

// ✅ Get logged-in user profile
router.get("/profile", protect, getProfile);

export default router;
