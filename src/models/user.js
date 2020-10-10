const mongoose = require('../service/index');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
  name:      { type: String, required: true },
  age:       { type: Number, min: 5, index: true },
  password:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer
});