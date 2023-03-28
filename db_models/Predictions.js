const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  gameId: { type: String, required: true },
  prediction: { type: Object, required: true },
  points: { type: Number, default: 0 },
  status: { type: String, default: "active" },
});


const model = mongoose.model('predictions', schema);

module.exports = model