import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { PostsContext } from "../context/PostsContext";

export default function PostList() {
  const { posts, setPosts, loading, setLoading } = useContext(PostsContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // 🧩 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // 📰 Fetch posts (with pagination, search, and category filter)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page,
          limit: 4,
          search,
          category: selectedCategory,
        }).toString();

        const res = await api.get(`/posts?${query}`);
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, search, selectedCategory]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="post-list" style={{ padding: "20px" }}>
      <h2>📰 Blog Posts</h2>

      {/* 🔍 Search and Category Filter */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "15px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🧾 Post List */}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            {post.image && (
              <img
                src={`http://localhost:5000/${post.image}`}
                alt={post.title}
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}
            <h3>{post.title}</h3>
            <p>
              <strong>Category:</strong>{" "}
              {post.category?.name || "Uncategorized"}
            </p>
            <p>{post.content.slice(0, 150)}...</p>
            <Link to={`/posts/${post._id}`}>Read More</Link>
          </div>
        ))
      )}

      {/* ⏭ Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
