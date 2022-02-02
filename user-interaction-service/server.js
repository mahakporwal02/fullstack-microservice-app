const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

mongoose
  .connect("mongodb://localhost/UserInteraction")
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error("could not connect to MongoDB...", err));

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};

app.use(express.json());
app.use(allowCrossDomain);
app.use('/users', userRoutes);

const PORT = process.env.USER_INTERACTION_PORT || 3000;
app.listen(PORT, () => console.log(`User Interaction Service is listening on port ${PORT}.`));