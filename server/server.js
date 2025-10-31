import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import { fileURLToPath } from "url";

// Routes
import postRoutes from "./routes/posts.js";
import categoryRoutes from "./routes/categoryRoutes.js"; 
import errorHandler from "./middleware/errorHandler.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

// Path setup for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes); 

// Serve static files (for image uploads later)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test routes
app.get("/", (req, res) => res.send("🌿 MERN Blog API is running"));
app.get("/api", (req, res) =>
  res.send("✅ Backend is working and connected to frontend!")
);


// API routes
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/comments", commentRoutes);

// Global error handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
