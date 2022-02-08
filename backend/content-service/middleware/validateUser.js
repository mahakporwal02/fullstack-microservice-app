const axios = require('axios');

const validateUser = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    const response = await axios.get(
      `${process.env.USER_INTERACTION_URL || `http://user-interaction-service:3000`}/users/validate`,
      {
        headers: {
          'x-auth-token': token,
        },
      },
    );
    req.user_id = response.data.user_id;
    next();
  } catch (err) {
    return res.status(err.status || 500).send(err.message || 'Internal Server Error');
  }
};

module.exports = validateUser;
