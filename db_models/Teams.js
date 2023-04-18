const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  name: { type: String, required: true },
  logo_url: { type: String, required: true },
  division: { type: String, required: true },
  foundation: { type: String, required: true },
  origin: { type: String, required: true },
  shortName: { type: String, required: true },
});

const model = mongoose.model("teams", schema);

module.exports = model;
