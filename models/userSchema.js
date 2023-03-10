const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  name: String,
  userId: String,
});
module.exports = mongoose.model("Users", userSchema);
