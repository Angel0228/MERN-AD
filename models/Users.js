const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    max: 200
  },
  creationdate: {
    type: Date,
    required: true
  },
  avatar: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
