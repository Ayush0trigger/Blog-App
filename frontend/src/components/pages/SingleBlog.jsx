import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import toast from "react-hot-toast";
import "./SingleBlog.css";

const SingleBlog = () => {
  const { mode, user, isAuthenticated } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  
  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const { data } = await axiosInstance.get(`/blog/singleblog/${id}`);
        setBlog(data.blog);
        // Check if user has liked or disliked
        if (isAuthenticated && user._id) {
          setIsLiked(data.blog.likes.includes(user._id));
          setIsDisliked(data.blog.dislikes.includes(user._id));
        }
      } catch (error) {
        setBlog({});
      }
    };
    getSingleBlog();
  }, [id, isAuthenticated, user._id]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to like blogs");
      return;
    }
    try {
      const { data } = await axiosInstance.post(`/blog/like/${id}`);
      setBlog(prev => ({
        ...prev,
        likes: data.likes,
        dislikes: data.dislikes
      }));
      setIsLiked(!isLiked);
      setIsDisliked(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating like");
    }
  };

  const handleDislike = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to dislike blogs");
      return;
    }
    try {
      const { data } = await axiosInstance.post(`/blog/dislike/${id}`);
      setBlog(prev => ({
        ...prev,
        likes: data.likes,
        dislikes: data.dislikes
      }));
      setIsDisliked(!isDisliked);
      setIsLiked(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating dislike");
    }
  };
  
  return (
    <article
      className={mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}
    >
      {blog && (
        <>
          <section className="container">
            <div className="category">{blog.category}</div>
            <h1>{blog.title}</h1>
            <div className="writer_section">
              <div className="author">
                <img src={blog.authorAvatar} alt="author_avatar" />
                <p>{blog.authorName}</p>
              </div>
              <div className="reactions">
                <button 
                  className={`reaction-btn ${isLiked ? 'active' : ''}`}
                  onClick={handleLike}
                >
                  <FaThumbsUp />
                  <span>{blog.likes?.length || 0}</span>
                </button>
                <button 
                  className={`reaction-btn ${isDisliked ? 'active' : ''}`}
                  onClick={handleDislike}
                >
                  <FaThumbsDown />
                  <span>{blog.dislikes?.length || 0}</span>
                </button>
              </div>
            </div>
            {blog && blog.mainImage && (
              <img
                src={blog.mainImage.url}
                alt="mainBlogImg"
                className="mainImg"
              />
            )}
            <p className="intro-text">{blog.intro}</p>
            <div className="sub-para">
              <h3>{blog.paraOneTitle}</h3>
              {blog && blog.paraOneImage && (
                <img src={blog.paraOneImage.url} alt="paraOneImg" />
              )}
              <p>{blog.paraOneDescription}</p>
            </div>
            <div className="sub-para">
              <h3>{blog.paraTwoTitle}</h3>
              {blog && blog.paraTwoImage && (
                <img src={blog.paraTwoImage.url} alt="paraOneImg" />
              )}
              <p>{blog.paraThreeDescription}</p>
            </div>
            <div className="sub-para">
              <h3>{blog.paraThreeTitle}</h3>
              <p>{blog.paraThreeDescription}</p>
              {blog && blog.paraThreeImage && (
                <img src={blog.paraThreeImage.url} alt="paraOneImg" />
              )}
            </div>
          </section>
        </>
      )}
    </article>
  );
};

export default SingleBlog;