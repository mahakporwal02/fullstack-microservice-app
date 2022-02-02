// importing user context
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send('All input is required');
    }
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
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
    // save user token
    user.token = token;
    await user.save();
    res.status(201).json({user_email: user.email, user_token: user.token});
  } catch (err) {
    console.log(err);
  }
};

module.exports = registerUser;
