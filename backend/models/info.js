const mongoose = require("mongoose");
const { Schema } = mongoose;
const infoSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  a:{
    type: Number,
    required: true,
    default: 0,
  },
  b:{
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});
// cart collection 생성. 
module.exports = mongoose.model("Info", infoSchema);