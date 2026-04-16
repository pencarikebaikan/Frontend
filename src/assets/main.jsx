import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import App from "./App";
import AllPosts from "./pages/AllPosts";
import AddNew from "./pages/AddNew";
import EditArticle from "./pages/EditArticle";
import Preview from "./pages/Preview";






ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/posts" element={<AllPosts />} />
      <Route path="/add" element={<AddNew />} />
      <Route path="/edit/:id" element={<EditArticle />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  </BrowserRouter>
);
