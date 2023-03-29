const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = Schema({
  tournaments: { type: Schema.Types.ObjectId, ref: "tournaments" },
  gameIndex: { type: Number, required: true },
  stage: {
    type: String,
    enum: ["groups", "initial", "32", "16", "8", "4", "2"],
    require: true,
  },
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

// SET VIRTUAL
gameSchema.virtual("date").get(function () {
  const date = new Date();
  date.setDate(this.dayOfTheMonth);
  date.setMonth(this.month - 1);
  // convert hours and minutes.
  const hour = (this.hour = Math.floor(hour / 1000));
  const minute = (hour % 1000) / 10;
  date.setHours(hour);
  date.setMinutes(minute);

  return date.toISOString().substring(0, 10);
});

module.exports = model;
