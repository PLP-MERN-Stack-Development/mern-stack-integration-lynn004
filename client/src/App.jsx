import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostView from "./components/PostView";
import PostForm from "./components/PostForm";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import protected route

export default function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "10px",
          background: "#f0f0f0",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Link to="/">Home</Link>{" "}
          {user && (
            <>
              {" | "}
              <Link to="/create">New Post</Link>
            </>
          )}
        </div>

        <div>
          {user ? (
            <>
              <span>👋 Hi, {user.name}</span>{" "}
              <button
                onClick={logout}
                style={{
                  marginLeft: "10px",
                  background: "tomato",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> |{" "}
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostView />} />

        {/* ✅ Protected routes for logged-in users only */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
