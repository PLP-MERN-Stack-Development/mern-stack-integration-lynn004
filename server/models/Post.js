import mongoose from "mongoose";

// Define the schema for a Post
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: String,
      default: "Anonymous",
    },
    category: {
      type: String,
      default: "General",
    },
    image: {
      type: String, // You can store image URLs or file paths here
      default: "",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create and export the Post model
const Post = mongoose.model("Post", postSchema);

export default Post;
