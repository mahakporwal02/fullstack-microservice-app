// importing user context
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { response } = require("express");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const validateUser = user.validateSync();
    if (!!validateUser) {
      if (validateUser.errors["email"]) {
        return res.status(400).send(validateUser.errors["email"].message);
      }
      return res.status(400).send("Bad request");
    }

    const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY);

    await user.save();
    return res.status(201).json({ user_email: user.email, user_token: token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = registerUser;
