const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const BelongSchema = new Schema({
  advertID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  categoryType: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = Belong = mongoose.model("belong", BelongSchema);
