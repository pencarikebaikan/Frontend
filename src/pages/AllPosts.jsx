import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";   // 🔥 tambahkan ini

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://backend-b-753721120012.asia-southeast2.run.app/article/100/0")
      .then(res => {
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setPosts([]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(post => {
    if (filter === "all") return true;
    return post.Status === filter;
  });

  const handleTrash = async (post) => {
    try {
      await axios.put(`https://backend-b-753721120012.asia-southeast2.run.app/article/id/${post.ID}`, {
        Title: post.Title,
        Content: post.Content,
        Category: post.Category,
        Status: "trash"
      });
      setPosts(posts.map(p =>
        p.ID === post.ID ? { ...p, Status: "trash" } : p
      ));
    } catch (err) {
      console.error("ERROR:", err.response?.data);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>All Posts</h1>

      {/* 🔥 TABS */}
      <div className="filter-buttons">
		<button
		  className="home-btn"
		  onClick={() => navigate("/")}
		>
		  🏠 Home
		</button>	  
		  
	    <button className="nav-btn preview" onClick={() => navigate("/preview")}>
		👁️ Preview
	    </button>		
        <button
          onClick={() => setFilter("publish")}
          className={filter === "publish" ? "active" : ""}
        >
          Published
        </button>
        <button
          onClick={() => setFilter("draft")}
          className={filter === "draft" ? "active" : ""}
        >
          Drafts
        </button>
        <button
          onClick={() => setFilter("trash")}
          className={filter === "trash" ? "active" : ""}
        >
          Trashed
        </button>
		  {/* 🔥 ADD NEW */}
	  <button
		className="add-btn"
		onClick={() => navigate("/add")}
	  >
		➕ Add New
	  </button>
		
      </div>

      {/* 🔥 TABLE */}
      {filteredPosts.length === 0 ? (
        <p>Tidak ada data</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
              <tr key={post.ID}>
                <td>{post.Title}</td>
                <td>{post.Category}</td>
                <td>
                  <span className={`badge ${post.Status}`}>
                    {post.Status}
                  </span>
                </td>
				<td className="action-cell">
				  <button
					className="action-btn edit"
					onClick={() => navigate(`/edit/${post.ID}`)}
				  >
					✏️ <span>Edit</span>
				  </button>
				  <button
					className="action-btn trash"
					onClick={() => handleTrash(post)}
				  >
					🗑️ <span>Trash</span>
				  </button>
				</td>

				
				
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
