import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";
const blog = {
  title: "Test Blog",
  author: {
    name: "Test Author",
    id: "123",
  },
  url: "https://test.com",
  likes: 10,
};
const user = {
  user: {
    id: "123",
  },
};

test(" blog renders the blog's title and author", () => {
  render(<Blog blog={blog} user={user} />);
  const element = screen.getByText("Test Blog");
  //   To run this we need to move the element rendering this component outside of conditional
  //   const author = screen.getByText("Test Author");
});

test("clicking the button shows number of likes and url", async () => {
  const handleLike = jest.fn();
  render(<Blog blog={blog} user={user} handleLike={handleLike} />);
  const viewButton = screen.getByText("view", { exact: false });
  await userEvent.click(viewButton);
  const url = screen.getByText("https://test.com");
  const likes = screen.getByText("likes:10");
});

test("like button is clicked twice", async () => {
  const handleLike = jest.fn();
  render(<Blog blog={blog} user={user} handleLike={handleLike} />);
  const viewButton = screen.getByText("view", { exact: false });
  await userEvent.click(viewButton);
  const likeButton = screen.getByText("like");
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);
  expect(handleLike.mock.calls).toHaveLength(2);
});

// Renders a form with input fields for title, author, and url
it("should call the event handler with the right details when a new blog is created", () => {
  // Arrange
  const handleBlogChange = jest.fn();
  const addBlog = jest.fn();
  const newblog = {
    title: "",
    author: "",
    url: "",
  };
  render(
    <CreateBlog
      handleBlogChange={handleBlogChange}
      addBlog={addBlog}
      newblog={newblog}
    />
  );

  // Act
  fireEvent.change(screen.getByPlaceholderText("title"), {
    target: { value: "Test Title" },
  });
  fireEvent.change(screen.getByPlaceholderText("author"), {
    target: { value: "Test Author" },
  });
  fireEvent.change(screen.getByPlaceholderText("url"), {
    target: { value: "Test URL" },
  });
  fireEvent.submit(screen.getByTestId("create-blog-form"));

  // Assert
  expect(addBlog).toHaveBeenCalledTimes(1);
  expect(addBlog).toHaveBeenCalledWith({
    title: "Test Title",
    author: "Test Author",
    url: "Test URL",
  });
});
