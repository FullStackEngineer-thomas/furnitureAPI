const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  content: String,
  count: Number,
});

module.exports = mongoose.model("products", schema);
