const mongoose = require("mongoose");
const { Schema } = mongoose;
const { gameDate } = require("../utils/environments");

const schema = Schema({
  tournaments: { type: Schema.Types.ObjectId, ref: "tournaments" },
  gameIndex: { type: Number, required: true },
  stage: {
    type: String,
    enum: ["groups", "initial", "32", "16", "8", "4", "2"],
    require: true,
  },
  status: { type: String, required: true, default: "pending" },
  hour: { type: Number },
  dayOfTheWeek: { type: Number, required: true },
  dayOfTheMonth: { type: Number, required: true },
  month: { type: Number, required: true },
  details: { type: String },
  teams: { type: Array, required: true },
  result: {
    type: Object,
    default: {
      HomeTeamScore: "",
      AwayTeamScore: "",
      HomeTeamPenalties: "",
      AwayTeamPenalties: "",
      Winner: "",
      WinningTeam: "",
      WinningType: "",
      stage: "",
    },
  },
});

gameDate(schema);
schema.plugin(require("mongoose-autopopulate"));
const model = mongoose.model("games", schema);

module.exports = model;
