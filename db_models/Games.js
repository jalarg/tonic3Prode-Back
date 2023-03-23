const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = Schema({
  tournament: { type: Schema.Types.ObjectId, ref: "tournaments" },
  stage: { type: String, required: true },
  status: { type: String, required: true },
  day: { type: Date, required: true },
  hour: { type: Date, required: true },
  date: { type: Date, required: true },
  details: { type: String, required: true },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "teams",
    },
  ],
  result: { type: Array, required: true },
});

const model = mongoose.model("Games", gameSchema);

module.exports = model;
