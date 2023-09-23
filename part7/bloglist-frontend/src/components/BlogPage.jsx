import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";

function BlogPage({ blogs, handleLike }) {
  const id = useParams().id;
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const blog = blogs?.find((n) => n.id === id);

    setBlog(blog);
  }, [blog, handleLike]);
  useEffect(() => {
    async function fetchComment() {
      const allComments = await blogService.getComments(id);
      setComments(allComments.data.comments);
    }
    fetchComment();
  }, []);
  async function getComment() {
    if (comment === "") return;

    const response = await blogService.setComments(id, comment);
    setComments(response.data.comments);
    setComment("");
  }
  return (
    blog && (
      <div>
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes </p>
        <p>
          likes:{blog.likes ? blog.likes : 0}
          <button onClick={() => handleLike(blog, blog.id)}>like</button>
        </p>

        <h3>Comments</h3>
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type='button' onClick={() => getComment()}>
          Comment
        </button>
        <ul>
          {comments?.map((comm, index) => {
            if (comm != null) return <li key={index}>{comm}</li>;
          })}
        </ul>
      </div>
    )
  );
}

export default BlogPage;
