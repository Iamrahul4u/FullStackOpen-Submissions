import { Link } from "react-router-dom";
import Blog from "./Blog";

function Blogs({ blogs, handleLike, handleDelete, user, blogForm }) {
  return (
    <div>
      <h3>blog app</h3>
      {user && blogForm()}

      {blogs?.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </div>
  );
}

export default Blogs;
