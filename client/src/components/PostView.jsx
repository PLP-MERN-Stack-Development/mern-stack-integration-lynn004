import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function PostView() {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [id]);

  // Submit new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await api.post(
        `/comments/${id}`,
        { content: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to post comment");
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{post.title}</h2>
      {post.image && (
        <img
          src={`http://localhost:5000/${post.image}`}
          alt={post.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />
      )}
      <p>{post.content}</p>

      <hr style={{ margin: "20px 0" }} />

      <h3>💬 Comments ({comments.length})</h3>

      {user ? (
        <form onSubmit={handleCommentSubmit} style={{ marginBottom: "20px" }}>
          <textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 15px",
              background: "dodgerblue",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p>Please log in to comment.</p>
      )}

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div
            key={c._id}
            style={{
              background: "#f9f9f9",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <strong>{c.user?.name || "Anonymous"}</strong>
            <p>{c.content}</p>
            <small>{new Date(c.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}
