const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");

const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialPosts.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  console.log("entered test");
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialPosts.length);
});

test("a valid post can be added", async () => {
  const newBlog = {
    title: "API Test Blog",
    author: "JWCTempleton",
    url: "www.google.com",
    likes: 13,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.postsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialPosts.length + 1);

  const contents = blogsAtEnd.map((n) => n.title);

  expect(contents).toContain("API Test Blog");
});

test("A post without number of likes specified defaults to 0", async () => {
  const newBlog = {
    title: "This should have 0 likes",
    author: "Jamie Baldwin",
    url: "www.google.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.postsInDb();
  const contents = blogsAtEnd.map((n) => n.likes);
  expect(contents).toContain(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
