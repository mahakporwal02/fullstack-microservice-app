const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  likes: { type: Array}
});

module.exports = mongoose.model("content", likesSchema);