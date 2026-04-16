import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function App() {
  return (
    <div className="container">
      <nav>
        <h1>Dashboard</h1>
        <div className="links">
          <Link to="/posts">All Posts</Link>
          <Link to="/add">Add New</Link>
          <Link to="/preview">Preview</Link>
        </div>
      </nav>

      <main>
        <div className="card">
          <h2>Welcome!</h2>
          <p>Ini contoh konten dashboard dengan styling card.</p>
        </div>
        <div className="card">
          <h2>Tips</h2>
          <p>Gunakan card untuk daftar post atau informasi lain.</p>
        </div>
      </main>
    </div>
  );
}
