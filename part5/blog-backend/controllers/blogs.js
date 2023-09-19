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

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    // user: body.user,
    likes: body.likes,
    author: body.user,
    title: body.title,
    url: body.url,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.status(200).json(updatedBlog);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = blogsRouter;
