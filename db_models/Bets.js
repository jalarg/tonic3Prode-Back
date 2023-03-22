const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    gameId: {type: Number, required: true},
    bet: {type: Object, required: true},
    points: {type: Number, default: 0}, 
});


const model = mongoose.model('bets', schema);

module.exports = model