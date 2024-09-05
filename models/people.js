const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
  fname: String,
  lname: String,
  age: Number,
});

module.exports = mongoose.model("People", peopleSchema);
