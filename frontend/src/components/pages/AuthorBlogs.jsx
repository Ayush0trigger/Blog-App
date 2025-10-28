import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import LatestBlogs from "../minicomponents/LatestBlogs";
import { BeatLoader } from "react-spinners";

const AuthorBlogs = () => {
  const { mode } = useContext(Context);
  const { authorId } = useParams();
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorBlogs = async () => {
      try {
        const { data } = await axiosInstance.get(`/blog/author/${authorId}`);
        setAuthorBlogs(data.blogs);
        setAuthor(data.author);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author blogs:", error);
        setLoading(false);
      }
    };
    fetchAuthorBlogs();
  }, [authorId]);

  if (loading) {
    return (
      <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
        <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
          <BeatLoader color={mode === "dark" ? "#fff" : "#000"} size={50} />
        </div>
      </article>
    );
  }

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      {author && (
        <div className="container" style={{ padding: "2rem 0" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1rem", 
            marginBottom: "2rem" 
          }}>
            <img 
              src={author.avatar.url} 
              alt={author.name} 
              style={{ 
                width: "80px", 
                height: "80px", 
                borderRadius: "50%",
                objectFit: "cover"
              }} 
            />
            <div>
              <h2>{author.name}</h2>
              <p style={{ color: mode === "dark" ? "#ccc" : "#666" }}>
                {author.role} • {authorBlogs.length} {authorBlogs.length === 1 ? "blog" : "blogs"}
              </p>
            </div>
          </div>
        </div>
      )}
      {authorBlogs.length > 0 ? (
        <LatestBlogs 
          blogs={authorBlogs} 
          title={`${author?.name}'s Blogs`} 
        />
      ) : (
        <div className="container" style={{ 
          textAlign: "center", 
          padding: "4rem 0",
          color: mode === "dark" ? "#ccc" : "#666"
        }}>
          <h2>No Blogs Yet</h2>
          <p>This author hasn't published any blogs yet.</p>
        </div>
      )}
    </article>
  );
};

export default AuthorBlogs; 