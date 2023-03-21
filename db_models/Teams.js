const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    nombre: {type: String, required: true},
    logo_url: {type: String, required: true},
    fundacion: {type: String, required: true},
    origen: {type: String, required: true}, 
});


const model = mongoose.model('teams', schema);

module.exports = model