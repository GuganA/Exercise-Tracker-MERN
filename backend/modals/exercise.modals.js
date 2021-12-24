const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: 'string', required: true },
    description: { type: 'string', required: true},
    duration: { type: 'number', required: true},
    date: { type: 'number', required: true}
}, {
    timestamp: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;