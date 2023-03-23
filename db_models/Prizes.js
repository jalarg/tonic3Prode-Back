const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    tournament: {type: Number, required: true},
    first: {type: Object, required: true},
    second: {type: Object, required: true},
    third: {type: Object, required: true}, 
    details: {type: String}, 
});


const model = mongoose.model('prizes', schema);

module.exports = model