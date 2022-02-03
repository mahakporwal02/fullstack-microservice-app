const { request } = require('express');
const likes = require('../models/likes');
const Likes = require('../models/likes');

const updateLikes = async (req, res) => {
  try {
    const { title } = req.body;
    const { user_id } = req;
    const liked_content = await Likes.findOne({ title });
    console.log(liked_content);
    if (!liked_content) {
      const likes = new Likes({
        title: title.toLowerCase(),
        likes: [user_id],
      });
      await likes.save();
      return res.status(200).json({ title, 'likes': likes.likes.length });
    }
    const likes = liked_content.likes;
    if (likes.includes(user_id)) {
      liked_content.likes = likes.filter(function (item) {
        return item !== user_id;
      });
    } else {
      liked_content.likes.push(user_id);
    }
    liked_content.save();
    res.status(200).json({ title, 'likes': liked_content.likes.length });
  } catch (err) {
    console.log(err)
    res.status(400).send('Content not found');
  }
};

module.exports = updateLikes;
