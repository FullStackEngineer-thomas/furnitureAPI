const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  blogTitle: String,
  blogContent: String,
});

module.exports = mongoose.model("blogs", Schema);
