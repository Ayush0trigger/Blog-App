import React, { useContext } from "react";
import LatestBlogs from "../minicomponents/LatestBlogs";
import { Context } from "../../main";
import { useParams } from "react-router-dom";

const Blogs = () => {
  const { mode, blogs } = useContext(Context);
  const { category } = useParams();

  // Filter blogs by category if a category is specified
  const filteredBlogs = category 
    ? blogs.filter(blog => blog.category === category)
    : blogs;

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      {filteredBlogs.length > 0 ? (
        <LatestBlogs 
          blogs={filteredBlogs} 
          title={category ? `${category} Blogs` : "All Blogs"} 
        />
      ) : (
        <div style={{
          textAlign: "center",
          padding: "4rem 0",
          color: mode === "dark" ? "#ccc" : "#666"
        }}>
          <h2>No Blogs Yet</h2>
          <p>There are no blogs available for this category.</p>
        </div>
      )}
    </article>
  );
};

export default Blogs;