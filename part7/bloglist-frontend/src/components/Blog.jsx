import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [view, setView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleView = () => {
    setView(!view);
  };
  const visibleDelete = {
    display: blog.author.id === user?.user?.id ? "" : "none",
  };
  return (
    <div style={blogStyle} className='blogs'>
      <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
      <button onClick={handleView}>{view ? "hide" : "view"}</button>

      {view && (
        <div className='blog'>
          <p>{blog.url}</p>
          <p>
            likes:{blog.likes ? blog.likes : 0}
            <button id='blog-like' onClick={() => handleLike(blog, blog.id)}>
              like
            </button>
          </p>
          <p>{blog.author.name}</p>
          {user && (
            <button
              style={visibleDelete}
              onClick={() =>
                handleDelete(blog.id, blog.title, blog.author.name)
              }
            >
              delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
