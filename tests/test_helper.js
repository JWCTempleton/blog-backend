const Blog = require("../models/blog");

const initialPosts = [
  {
    title: "First Blog",
    author: "JWCTempleton",
    url: "www.google.com",
    likes: 3,
  },
  {
    title: "Second Blog",
    author: "Jamie Baldwin",
    url: "www.google.com",
    likes: 10,
  },
];

const postsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialPosts,
  postsInDb,
};
