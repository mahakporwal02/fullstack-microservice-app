const axios = require('axios');

const validateTitle = async (req, res, next) => {
  try {
    let {title} = req.body;
    title = title.trim();
    if (!title) {
        return res.status(400).send('title is required');
    }
    let url = `${process.env.CONTENT_SERVICE_URL || `http://content-service:3001`}/content/validateTitle/${title}`;
    const response = await axios.get(`${process.env.CONTENT_SERVICE_URL || `http://content-service:3001`}/content/validateTitle/${title}`);
    if (response.status !== 200) {
        return res.status(400).send('Invalid title');
    }
    next();
  } catch (err) {
    console.log(err)
    return res.status(err.status || 500).send(err.message || 'Internal Server Error');
  }
};

module.exports = validateTitle;
