const Likes = require('../models/likes');

const getContentLikes = async (req, res) => {
  try {
    const likeData = (await Likes.find({})).map((item) => {
      return { title: item.title, likes: item.likes.length };
    });
    res.status(200).json({ likeData });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = getContentLikes;