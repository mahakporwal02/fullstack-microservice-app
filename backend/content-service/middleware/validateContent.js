const Content = require('../models/content')

const validateContent = async (req, res) => {
  try {
    const { title } = req.query;
    const content = await Content.findOne({ title });
    if(!content) {
        return res.status(404).send('Content not found');
    }
    return res.status(200).send('Content found');
  } catch (err) {
    return res.status(400).send('Something went wrong');
  }
};

module.exports = validateContent;
