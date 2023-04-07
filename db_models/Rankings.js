const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  country: { type: String, required: true },
  position: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
});

schema.index({ tournamentId: 1, country: 1, position: 1 }, { unique: true });

const model = mongoose.model("ranking", schema);

module.exports = model


