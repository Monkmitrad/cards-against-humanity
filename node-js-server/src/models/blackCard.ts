const mongoose = require('mongoose');

const BlackCard = mongoose.model('BlackCard', {
    content: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = BlackCard;