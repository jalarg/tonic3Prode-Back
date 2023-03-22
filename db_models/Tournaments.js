const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  active: { type: Boolean},
  beggining: { type: String},
  ending: { type: String },
  title: { type: String},
  details: { type: String },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "teams" }],
  type: { type: String },
});

const model = mongoose.model("tournaments", schema);

module.exports = model;
