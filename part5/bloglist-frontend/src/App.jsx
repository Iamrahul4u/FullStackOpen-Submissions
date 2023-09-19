import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import loginService from "./services/login";
import "./index.css";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import { PropTypes } from "prop-types";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newblog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(true);
  const closeBlogForm = useRef(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.createToken(user.token);
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login(username, password);
      blogService.createToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage(`Invalid username and password`);
      setSuccess(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const addBlog = async (e) => {
    e.preventDefault();

    if (
      newblog.title.length === 0 ||
      newblog.author.length === 0 ||
      newblog.url.length === 0
    )
      return null;
    try {
      closeBlogForm.current();
      const saveBlog = await blogService.create(newblog);
      blogService.getAll().then((blogs) => setBlogs(blogs));

      setErrorMessage(`a new blog ${newblog.title} by ${newblog.author}`);
      setSuccess(true);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage(exception);
      setSuccess(false);
    }
  };
  function handleLogout(e) {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.createToken("");
  }
  function handleBlogChange(e) {
    const { name, value } = e.target;
    setNewBlog({ ...newblog, [name]: value });
  }
  const handleLike = async (blog, blogId) => {
    const updateBlog = {
      user: blog.author.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
    };
    try {
      const updatedBlog = await blogService.update(blogId, updateBlog);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (exception) {
      setErrorMessage(exception);
      setSuccess(false);
    }
  };
  useEffect(() => {
    async function addBlogs() {
      const blogsArr = await blogService.getAll();
      const sortedBlogs = blogsArr.sort((a, b) => {
        return b.likes - a.likes;
      });
      setBlogs(sortedBlogs);
    }
    addBlogs();
  }, []);
  const handleDelete = (id, title, author) => {
    // blogService.delete(id);
    if (window.confirm(`Remove blog ${title} by ${author}`))
      setBlogs(blogs.filter((blog) => blog.id !== id));
  };
  const blogForm = () => {
    return (
      <Togglable buttonLabel='Open Form' ref={closeBlogForm}>
        <CreateBlog
          user={user}
          handleLogout={handleLogout}
          addBlog={addBlog}
          handleBlogChange={handleBlogChange}
          newblog={newblog}
        />
      </Togglable>
    );
  };
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <div>
      <div>
        <Notification message={errorMessage} success={success} />

        {user === null && (
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        )}

        {user !== null && (
          <>
            <h1>Blogs</h1>
            <p>{user.user.username} logged in</p>
            <button onClick={() => handleLogout()}>Logout</button>
            <h2>Add New blog</h2>
            {user && blogForm()}
          </>
        )}
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
