const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((acc, totalLikes) => acc + totalLikes.likes, 0);
  return total;
};

module.exports = {
  dummy,
  totalLikes,
};
