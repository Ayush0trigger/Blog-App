import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axiosInstance from "../../utils/axios";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const { mode } = useContext(Context);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axiosInstance.get("/user/authors");
        setAuthors(data.authors);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors();
  }, []);

  return (
    <article
      className={
        mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"
      }
    >
      <h2>ALL AUTHORS</h2>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.map((author) => (
            <Link 
              to={`/author/${author._id}`} 
              key={author._id}
              className="author-card"
              style={{
                textDecoration: "none",
                color: "inherit"
              }}
            >
              <div className="card">
                <img src={author.avatar.url} alt="author_avatar" />
                <h3>{author.name}</h3>
                <p>{author.role}</p>
              </div>
            </Link>
          ))
        ) : (
          <BeatLoader color="gray" size={50} style={{ padding: "200px 0" }} />
        )}
      </div>
    </article>
  );
};

export default AllAuthors;
