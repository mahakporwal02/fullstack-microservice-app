const axios = require('axios');

const getLikes = async (req, res, next) => {
  try {
    const response = await axios.get(`${process.env.USER_INTERACTION_URL || `http://user-interaction-service:3000`}/likes/read`);
    if (response.status !== 200) {
        return res.status(400);
    }
    req.likes = response.data;
    next();
  } catch (err) {
    return res.status(err.status || 500).send(err.message || 'Internal Server Error');
  }
};

module.exports = getLikes;
