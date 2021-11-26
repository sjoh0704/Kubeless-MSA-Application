const mongoose = require("mongoose");
const { Schema } = mongoose;
const infoSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  dog:{
    type: Number,
    required: true,
    default: 0,
  },
  cat:{
    type: Number,
    required: true,
    default: 0,
  },
  dino:{
    type: Number,
    required: true,
    default: 0,
  },
  bear:{
    type: Number,
    required: true,
    default: 0,
  },
  fox:{
    type: Number,
    required: true,
    default: 0,
  },
  rabbit:{
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