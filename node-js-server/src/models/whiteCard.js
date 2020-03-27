const mongoose = require('mongoose');

const WhiteCard = mongoose.model('WhiteCard', {
    content: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = WhiteCard;