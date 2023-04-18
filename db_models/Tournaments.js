const mongoose = require("mongoose");
const { Schema } = mongoose;
const { date } = require("../utils/environments");

const schema = Schema({
  active: { type: Boolean, required: true },
  beginning: { type: Date, required: true },
  ending: { type: Date, required: true },
  stage: {
    type: String,
    enum: ["groups", "initial", "32", "16", "8", "4", "2", "1"],
    require: true,
  },
  title: { type: String, required: true },
  details: { type: String, required: true },
  teams: [{ type: Schema.Types.ObjectId, ref: "teams" }],
  type: {
    type: String,
    enum: [
      "winner remains on court",
      "points tournament",
      "points tournament with group face",
    ],
    require: true,
  },
  games: [{ type: Schema.Types.ObjectId, ref: "games", default: []}],
  users: [{ type: Schema.Types.ObjectId, ref: "users" }],
  image_url: {
    type: String,
    default:
      "https://www.frecuenciaalbirroja.com/images/Copa_Argentina_2016.jpg",
  },
});

//FUNCION PARA AGREGAR FECHA.
date(schema);
schema.plugin(require("mongoose-autopopulate"));
const model = mongoose.model("tournaments", schema);

module.exports = model;
