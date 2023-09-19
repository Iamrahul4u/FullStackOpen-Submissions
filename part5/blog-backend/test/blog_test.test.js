const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("should return 200", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("unique identifier property of the blog posts is named id", async () => {
  const blog = await api.get("/api/blogs");

  blog.body.forEach((blogPost) => {
    expect(blogPost.id).toBeDefined();
    expect(blogPost._id).toBeUndefined();
  });
});
test("should successfully add a post", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Rahul Gupta",
    url: "sdksjsk",
    likes: 545,
  };
  const initialLength = (await api.get("/api/blogs")).body.length;
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);
  expect(response.body.length).toBe(initialLength + 1);
  expect(contents).toContain(newBlog.title);
});

test("should successfully delete a post", async () => {
  await api.delete("/api/blogs/65031d00a551c3cc4c67eef0").expect(204);
});
afterAll(async () => {
  await mongoose.connection.close();
});
