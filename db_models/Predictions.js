const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  gameId: { type: Schema.Types.ObjectId, ref: "games", required: true },
  prediction: { type: Object, required: true },
  points: { type: Number, default: 0 },
  status: { type: String,  enum: [
    "pending",
    "pre_match",
    "close",
  ],
  default: "pending" },
});

schema.plugin(require("mongoose-autopopulate"));
const model = mongoose.model("predictions", schema);

module.exports = model;
