import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password });
      login(res.data.user, res.data.token);
      alert("✅ Registered successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "❌ Registration failed.");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "auto", padding: 16 }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label><br />
        <input value={name} onChange={(e)=>setName(e.target.value)} required /><br/><br/>
        <label>Email</label><br />
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /><br/><br/>
        <label>Password</label><br />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required /><br/><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
