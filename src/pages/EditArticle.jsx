import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/article/id/${id}`)
      .then(res => {
        const data = res.data;
        setTitle(data.Title);
        setContent(data.Content);
        setCategory(data.Category);
      })
      .catch(err => console.error(err));
  }, [id]);

  const updateArticle = (status) => {
    axios.put(`http://localhost:3000/article/id/${id}`, {
      title,
      content,
      category,
      status
    })
    .then(() => {
      alert("Article updated!");
      navigate("/posts");
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="container card">
      <h1>Edit Article</h1>

      {/* 🔥 NAV BUTTONS */}
      <div className="nav-buttons">
        <button className="nav-btn home" onClick={() => navigate("/")}>🏠 Home</button>
        <button className="nav-btn publish" onClick={() => navigate("/posts?filter=publish")}>Published</button>
        <button className="nav-btn draft" onClick={() => navigate("/posts?filter=draft")}>Drafts</button>
        <button className="nav-btn trash" onClick={() => navigate("/posts?filter=trash")}>Trashed</button>
        <button className="nav-btn preview" onClick={() => navigate("/preview")}>👁️ Preview</button>
      </div>

      {/* FORM */}
      <div className="form-group">
        <label>Title</label>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </div>

      {/* BUTTONS */}
      <div className="form-actions">
        <button className="action-btn publish" onClick={() => updateArticle("publish")}>
          🚀 Publish
        </button>
        <button className="action-btn draft" onClick={() => updateArticle("draft")}>
          📝 Draft
        </button>
      </div>
    </div>
  );
}
