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
});

// SET VIRTUAL
schema.virtual("fullName").get(function () {
  return `${this.name} ${this.lastName}`;
});

const model = mongoose.model("users", schema);

module.exports = model;
