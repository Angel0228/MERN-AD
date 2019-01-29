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
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  creationdate: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String
  },
  status: {
    type: String,
    default: "Active"
  },
  comments: [
    {
      userName: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      creationdate: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Advert = mongoose.model("advert", AdvertSchema);
