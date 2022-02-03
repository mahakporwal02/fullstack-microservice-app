const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  story : { type: String },
  date_published: { type: Date },
  user_id: { type: String }
});

module.exports = mongoose.model("content", contentSchema);