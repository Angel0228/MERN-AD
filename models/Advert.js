const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AdvertSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    max: 200
  },
  price: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  creationdate: {
    type: Date,
    required: true
  },
  avatar: {
    type: String
  },
  status: {
    type: String
  }
});

module.exports = Advert = mongoose.model("advert", AdvertSchema);
