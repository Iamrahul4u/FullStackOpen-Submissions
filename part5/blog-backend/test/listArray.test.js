const listHelper = require("../utils/list-helper");
const blog = require("../utils/blogsdata");
test("dummy returns one", () => {
  const blogs = [1, 2, 3, 4, 5];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0, 2
    },
  ];
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("favourite blog", () => {
    const results = listHelper.favouriteBlog(blog);
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    expect(results).toEqual(expected);
  });
});
