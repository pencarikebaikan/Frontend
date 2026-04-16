import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function AddNew() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submit = (status) => {
    let newErrors = {};
    if (title.length > 20) newErrors.title = "Title maksimal 20 karakter";
    if (content.length > 500) newErrors.content = "Content maksimal 500 karakter";
    if (category.length < 3) newErrors.category = "Category minimal 3 karakter";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    axios.post("http://localhost:3000/article", {
      title,
      content,
      category,
      status
    })
    .then(() => {
      alert("Article berhasil dibuat");
      setTitle("");
      setContent("");
      setCategory("");
      setErrors({});
    })
    .catch(err => {
      alert(err.response?.data?.error || "Terjadi error");
    });
  };

  return (
    <div className="container card">
      <h1>Add New Article</h1>

      {/* 🔥 NAV BUTTONS */}
      <div className="nav-buttons">
        <button className="nav-btn home" onClick={() => navigate("/")}>🏠 Home</button>
		  {/* 🔥 Tambahan Preview */}
	    <button className="nav-btn preview" onClick={() => navigate("/preview")}>
		👁️ Preview
	    </button>
        <button className="nav-btn publish" onClick={() => navigate("/posts?filter=publish")}>Published</button>
        <button className="nav-btn draft" onClick={() => navigate("/posts?filter=draft")}>Drafts</button>
        <button className="nav-btn trash" onClick={() => navigate("/posts?filter=trash")}>Trashed</button>
      </div>

      {/* TITLE */}
      <div className="form-group">
        <label>Title</label>
        <input
          placeholder="Title"
          value={title}
          maxLength={20}
          onChange={e => setTitle(e.target.value)}
        />
        <p className="counter">{title.length}/20</p>
        {errors.title && <p className="error">{errors.title}</p>}
      </div>

      {/* CONTENT */}
      <div className="form-group">
        <label>Content</label>
        <textarea
          placeholder="Content"
          value={content}
          maxLength={500}
          onChange={e => setContent(e.target.value)}
        />
        <p className="counter">{content.length}/500</p>
        {errors.content && <p className="error">{errors.content}</p>}
      </div>

      {/* CATEGORY */}
      <div className="form-group">
        <label>Category</label>
        <input
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        {errors.category && <p className="error">{errors.category}</p>}
      </div>

      {/* BUTTONS */}
      <div className="form-actions">
        <button className="action-btn publish" onClick={() => submit("publish")}>
          🚀 Publish
        </button>
        <button className="action-btn draft" onClick={() => submit("draft")}>
          📝 Draft
        </button>
      </div>
    </div>
  );
}
