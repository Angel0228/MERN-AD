const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const BoughtSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  advertID: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = Bought = mongoose.model("bought", BoughtSchema);
