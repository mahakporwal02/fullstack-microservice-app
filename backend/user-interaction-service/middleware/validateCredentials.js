const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema
  .is()
  .min(10)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols();

const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validateCredentials = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    if (!validateEmail(email)) {
      return res.status(400).send("Invalid Email Address");
    }

    if (!schema.validate(password)) {
      return res.status(400).send("Invalid Password");
    }
    next();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = validateCredentials;
