const Content = require('../models/content');

const getContent = async (req, res) => {
  try {
    let contents = await Content.find({}).lean();
    for(let content of contents) {
      let likes = content['likes'];
      content['is_liked'] = likes.includes(req.user_id);
      content['likes'] = content['likes'].length;
    }
    contents.sort((a, b) => {
      return (b.likes - a.likes);
    });
    return res.status(200).json({contents});
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = getContent;