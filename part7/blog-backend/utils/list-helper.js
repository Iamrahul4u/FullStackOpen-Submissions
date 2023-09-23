const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.length === 1
    ? blogs[0].likes
    : blogs.reduce((acc, item) => item.likes + acc, 0);
};
const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  const fav = _.maxBy(blogs, "likes");
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
