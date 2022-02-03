const axios = require('axios');

const validateUser = async (req, res) => {
  try {
    USER_INTERACTION_PORT = process.env.USER_INTERACTION_PORT;
    const token = req.header('x-auth-token');
    const response = await axios.get(
      `localhost:${USER_INTERACTION_PORT}/users/validate`,
      {
        headers: {
          'x-auth-token': token,
        },
      },
    );
    console.log(response);
    req.user_id = response.data.user_id;
    next();
  } catch (err) {
    return res.status(err.status || 400).send(err.message || 'something went wrong');
  }
};

module.exports = validateUser;
