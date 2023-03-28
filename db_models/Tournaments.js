const mongoose = require("mongoose");
const { Schema } = mongoose;
const { date } = require("../utils/environments");

const schema = Schema({
  active: { type: Boolean, required: true },
  beginning: { type: Date, required: true },
  ending: { type: Date, required: true },
  stage: { type: String, enum: ['32', '16', '8', '4', '2'], require: true},
  title: { type: String, unique: true, required: true },
  details: { type: String, required: true },
  teams: [{ type: Schema.Types.ObjectId, ref: "teams" }],
  type: { type: String, default: "Table" },
  games: [{ type: Schema.Types.ObjectId, ref: "games" }],
});

//FUNCION PARA AGREGAR FECHA.
date(schema);
schema.plugin(require('mongoose-autopopulate'));
const model = mongoose.model("tournaments", schema);

module.exports = model;
