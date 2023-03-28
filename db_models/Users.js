const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  uid: { type: String, unique: true },
  name: { type: String },
  lastName: { type: String },
  rol: { type: String, default: "user" },
  address: { type: String },
  country: { type: String },
  cellphone: { type: String },
  tournaments: [{ type: Schema.Types.ObjectId, ref: "tournaments" }],
  scores: { type: Object, default: {} },
});

// SET VIRTUAL FULL NAME
schema.virtual("fullName").get(function () {
  return `${this.name} ${this.lastName}`;
});

// SET VIRTUAL TOURNAMENTS
schema.virtual("tournamentScores").get(function () {
  let tournaments = {};
  Object.keys(this.scores).forEach((tournamentId) => {
    tournaments[tournamentId] = {
      score: this.scores[tournamentId],
    };
  });
  return tournaments;
});

const model = mongoose.model("users", schema);

module.exports = model;
