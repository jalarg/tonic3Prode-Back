const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActionLogSchema = Schema({
  timestamp: { type: Date, default: Date.now },
  user: { type: String },
  method: { type: String },
  path: { type: String },
  data: { type: Object },
});

const model = mongoose.model("ActionLog", ActionLogSchema);

module.exports = model;

