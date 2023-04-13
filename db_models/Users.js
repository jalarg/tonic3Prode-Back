const mongoose = require("mongoose");
const { Schema } = mongoose;
const {fullname} = require("../utils/environments");

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
  isVerified: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
});

// SET VIRTUAL FULL NAME

fullname(schema);

schema.plugin(require("mongoose-autopopulate"));
const model = mongoose.model("users", schema);

module.exports = model;
