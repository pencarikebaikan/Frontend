import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Preview() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const perPage = 5;

  useEffect(() => {
    axios.get("http://localhost:3000/article/100/0")
      .then(res => {
        // filter hanya publish
        const published = res.data.filter(p => p.Status === "publish");
        setPosts(published);
      })
      .catch(err => console.error("ERROR:", err));
  }, []);

  // pagination logic
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));

  return (
    <div className="container card">
      <h1>Preview Blog</h1>

      {/* 🔥 NAV BUTTONS */}
      <div className="nav-buttons">
        <button className="nav-btn home" onClick={() => navigate("/")}>🏠 Home</button>
        <button className="nav-btn publish" onClick={() => navigate("/posts?filter=publish")}>Published</button>
        <button className="nav-btn draft" onClick={() => navigate("/posts?filter=draft")}>Drafts</button>
        <button className="nav-btn trash" onClick={() => navigate("/posts?filter=trash")}>Trashed</button>
        <button className="nav-btn preview" onClick={() => navigate("/preview")}>👁️ Preview</button>
      </div>

      {/* LIST ARTIKEL */}
      {currentPosts.length === 0 ? (
        <p>Tidak ada artikel publish</p>
      ) : (
        currentPosts.map(post => (
          <div key={post.ID} className="post-card">
            <h2>{post.Title}</h2>
            <p><b>Category:</b> {post.Category}</p>
            <p>{post.Content}</p>
          </div>
        ))
      )}

      {/* PAGINATION */}
      <div className="pagination">
        <button
          className="page-btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ⬅️ Prev
        </button>

        <span className="page-info">
          Page {page} of {totalPages}
        </span>

        <button
          className="page-btn"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}
