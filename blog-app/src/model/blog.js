// models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  permissions: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      level: String,
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
