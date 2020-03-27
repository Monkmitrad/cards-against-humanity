const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        trim: true
    },
    lastLogin: {
        type: Date,
        default: new Date()
    }
});

module.exports = User;