// importing user context
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { response } = require('express');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send('All input is required');
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
    user.token = token;
    await user.save();
    res.status(201).json({user_email: user.email, user_token: user.token});
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = registerUser;
