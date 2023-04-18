const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
});

const model = mongoose.model("stadiums", schema);

module.exports = model;

