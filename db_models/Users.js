const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true}, 
    uid: {type: String},
    name: {type: String},
    lastName: {type: String},
    superAdmin: {type: Boolean, default: false},
    address: {type: String},
    country: {type: String},
    cellphone: {type: String},
});

// SET VIRTUAL
schema.virtual('fullName').get(function () {
    return `${this.name} ${this.lastName}`;
  });

const model = mongoose.model('users', schema);

module.exports = model