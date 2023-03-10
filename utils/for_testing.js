const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((acc, totalLikes) => acc + totalLikes.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  let mostLikes = -Infinity;
  let favoriteBlog;
  blogs.map((blog) => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes;
      favoriteBlog = blog;
    }
  });
  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  const result = blogs.reduce((acc, blog) => {
    if (!acc[blog.author]) {
      acc[blog.author] = 0;
    }
    acc[blog.author]++;
    return acc;
  }, {});
  let highestNumber = -Infinity;
  let authorResult;
  for (let author in result) {
    if (result[author] > highestNumber) {
      highestNumber = result[author];
      authorResult = {
        author: author,
        blogs: result[author],
      };
    }
  }
  return authorResult;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
