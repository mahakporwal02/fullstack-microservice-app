const Content = require('../models/content');

const getContent = async (req, res) => {
  try {
    const { title } = req.params;
    const content = await Content.findOne({ title });
    if (content) {
      res
        .status(200)
        .json({
          title: content.title,
          story: content.story,
          date_published: content.date_published,
          user_id: content.user_id,
        });
    } else {
      res.status(404).send('Not Found');
    }
  } catch (err) {
    res.status(400).send('something went wrong');
  }
};

module.exports = getContent;