const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
  tournament: { type: Schema.Types.ObjectId, ref: "tournaments", required: true },
  firstPrize: { type: Object, required: true },
  secondPrize: { type: Object, required: true },
  thirdPrize: { type: Object, required: true },
  details: { type: String },
});


const model = mongoose.model('prizes', schema);

module.exports = model