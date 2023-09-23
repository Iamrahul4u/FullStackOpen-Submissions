const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("author");
  response.status(200).json(blogs);
});

function getToken(request) {
  const auth = request.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    return auth.replace("Bearer ", "");
  }
  return null;
}
blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(getToken(request), process.env.JWT_SECRET);
  console.log(decodedToken);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Invalid Token" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
    author: user.id,
  });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const id = request.params.id;
  try {
    const blog = await Blog.findById(id);
    response.status(201).json(blog);
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});
blogsRouter.post("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const { comment } = request.body;

  try {
    const blog = await Blog.findById(id);
    blog.comments.push(comment);
    const updatedBlog = await blog.save();
    response.status(201).json(updatedBlog);
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blogToUpdate = await Blog.findById(request.params.id);

  if (!blogToUpdate) {
    return response.status(404).json({ error: "Blog not found" });
  }
  blogToUpdate.likes += 1;
  try {
    const updatedBlog = await blogToUpdate.save();
    response.status(200).json(updatedBlog);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = blogsRouter;
