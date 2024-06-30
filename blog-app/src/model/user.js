// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: akash_dutta,
  email: akashdutta@gmail.com,
  password: Akash12, // Hashed password
});

module.exports = mongoose.model("User", userSchema);
