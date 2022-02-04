const axios = require('axios');

const getContentLikes = async (req, res, next) => {
  try {
    const PORT = process.env.USER_INTERACTION_PORT;
    const response = await axios.get(
      `http://localhost:${PORT}/likes/getContentLikes`,
    );
    if (response.status !== 200) {
      return res.status(400).send('something went wrong');
    }
    req.likeData = response.data.likeData;
    next();
  } catch (err) {
    return res.status(err.response.status || 400).send(err.response.data || 'something went wrong');
  }
};

module.exports = getContentLikes;