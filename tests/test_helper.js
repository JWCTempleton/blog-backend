const Blog = require("../models/blog");
const User = require("../models/user");

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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialPosts,
  postsInDb,
  usersInDb,
};
