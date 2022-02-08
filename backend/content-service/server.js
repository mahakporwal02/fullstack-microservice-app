const express = require('express');
const mongoose = require('mongoose');
const contentRoutes = require('./routes/contentRoutes');
const fileupload = require("express-fileupload");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const mongodb_url = process.env.MONGO_URL || `mongodb://mongo:27017`;

mongoose
  .connect(`${mongodb_url}/contentService`)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error("could not connect to MongoDB...", err));

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
};

app.use(express.json());
app.use(allowCrossDomain);
app.use(fileupload());
app.use('/content', contentRoutes)

const PORT = process.env.CONTENT_SERVICE_PORT || 3001;
app.listen(PORT, () => console.log(`Content Service is listening on port ${PORT}.`));