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
import { useBlogs } from "./contexts/BlogsProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import Blogs from "./components/Blogs";
import BlogPage from "./components/BlogPage";
import axios from "axios";
import Users from "./components/Users";
import User from "./components/User";
import Menu from "./components/Menu";

const initialState = {
  title: "",
  author: "",
  url: "",
  likes: 0,
};
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newblog, setNewBlog] = useState(initialState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const closeBlogForm = useRef(null);
  const { setNotification, setError } = useBlogs();
  const navigate = useNavigate();
  const match = useMatch("/blogs/:id");
  const blog = match
    ? blogs?.find((blog) => blog.id === match.params.id)
    : null;
  const queryClient = useQueryClient();
  const blogsData = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
  });

  useEffect(() => {
    if (blogsData) {
      setBlogs(blogsData.data);
    }
  }, [blogsData]);
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.createToken(user.token);
    }
  }, []);
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (data) => {
      setNotification(`a new blog ${newblog.title} by ${newblog.author}`);
      setBlogs([...blogs, data]);
      queryClient.invalidateQueries({ queryKey: "blogs" });
      setNewBlog(initialState);
    },
  });
  const blogDeletee = useMutation(blogService.removeBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "blogs" });
    },
  });
  const blogLike = useMutation(blogService.updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "blogs" });
      // setBlogs([...blogs, data]);
    },
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login(username, password);
      blogService.createToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setBlogs(blogsData.data);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (exception) {
      setError(`Invalid username and password`);
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
      newBlogMutation.mutate(newblog);
    } catch (exception) {
      setError(exception.message);
    }
  };
  function handleLogout(e) {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.createToken("");
    navigate("/login");
  }
  function handleBlogChange(e) {
    const { name, value } = e.target;
    setNewBlog({ ...newblog, [name]: value });
  }
  const handleLike = async (blog, blogId) => {
    try {
      const updateBlog = {
        user: blog.author.id,
        likes: blog.likes + 1,
        title: blog.title,
        url: blog.url,
      };
      blogLike.mutate(blogId, updateBlog);
    } catch (exception) {
      setError(exception);
    }
  };
  const handleDelete = (id, title, author) => {
    // blogService.delete(id);
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      blogDeletee.mutate(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };
  if (blogsData.isLoading) {
    return <div>Loading...</div>;
  }

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
        <Notification />
        {user !== null && (
          <>
            <Menu />
            {user.user.username} logged in
            <button onClick={() => handleLogout()}>Logout</button>
            <br />
          </>
        )}
        <Routes>
          <Route
            path='/'
            element={
              <Blogs
                blogs={blogs}
                handleLike={handleLike}
                handleDelete={handleDelete}
                user={user}
                blogForm={blogForm}
              />
            }
          />
          <Route
            path='/login'
            element={
              <Login
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
              />
            }
          />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route
            path='/blogs/:id'
            element={<BlogPage blogs={blogs} handleLike={handleLike} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
