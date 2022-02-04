const Content = require('../models/content');

const ingestContent = async (req, res, next) => {
  try {
    const dateTime = new Date();
    const user_id = req.user_id;
    req.csvData.forEach(async (element) => {
      let content = await Content.findOne({ 'title': element[0] });
      if (!content) {
        content = new Content({
          'title': element[0],
          'date_published': dateTime,
          'user_id': user_id,
          'story': element[1]
        });
        content.save();
      }
    });
    next()
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = ingestContent;
