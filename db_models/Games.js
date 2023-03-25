  const mongoose = require("mongoose");
  const { Schema } = mongoose;

  const gameSchema = Schema({
    tournaments: { type: Schema.Types.ObjectId, ref: "tournaments" },
    stage: { type: String, required: true },
    status: { type: String, required: true },
    hour: { type: Number },
    dayOfTheWeek: { type: Number, required: true },
    dayOfTheMonth: { type: Number, required: true },
    month: { type: Number, required: true },
    details: { type: String },
    teams: { type: Array, required: true },
    result: { type: Array, default: [] },
  });

  const model = mongoose.model("Games", gameSchema);

  module.exports = model;
