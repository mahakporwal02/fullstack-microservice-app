const Content = require('../models/content');

const getContent = async (req, res) => {
  try {
    const { likes } = req;
    let contents = await Content.find({}).lean();
    for(let content of contents) {
      let likeData = likes[content.title] || [];
      content['is_liked'] = likeData.includes(req.user_id);
      content['likes'] = likeData.length;
    }
    contents.sort((a, b) => {
      return (b.likes - a.likes);
    });
    return res.status(200).json({contents});
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = getContent;