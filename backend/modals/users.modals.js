const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: 'string',
        required: true,
        unique: true,
        minLength: 4,
        trim: true
    },
}, {
    timestamp: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;