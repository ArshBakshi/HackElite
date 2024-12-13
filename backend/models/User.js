const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store the password in plain text for now
});

module.exports = mongoose.model("User", userSchema);
