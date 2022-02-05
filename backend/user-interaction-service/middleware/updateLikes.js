const Content = require('../models/content');

const updateLikes = async (req, res) => {
  try {
    const { title } = req.body;
    const { user_id } = req;
    const content = await Content.findOne({ title });
    if (!content) {
      res.status(404).send('Invalide Ttile');
    }
    const likes = content.likes;
    if (likes.includes(user_id)) {
      content.likes = likes.filter(function (item) {
        return item !== user_id;
      });
    } else {
      content.likes.push(user_id);
    }
    await content.save();
    res.status(200).json({ title, 'likes': content.likes.length, 'is_liked': content.likes.includes(user_id)});
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = updateLikes;
