const Content = require('../models/content');

const ingestContent = async (req, res, next) => {
  try {
    const dateTime = new Date();
    const user_id = req.user_id;
    for (let element of req.csvData) {
      let content = await Content.findOne({ 'title': element[0].trim() });
      if (!content) {
        content = new Content({
          'title': element[0].trim(),
          'date_published': dateTime,
          'user_id': user_id,
          'story': element[1]
        });
        await content.save();
      }
    }
    next();
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = ingestContent;
