const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send('All input is required');
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
      });
      user.token = token;
      res.status(200).json({ user_email: user.email, user_token: user.token });
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = userAuth;
