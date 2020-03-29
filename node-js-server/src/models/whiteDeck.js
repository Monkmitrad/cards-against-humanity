const mongoose = require('mongoose');

const WhiteDeck = mongoose.model('WhiteDeck', {
    deckName: {
        type: String,
        required: true,
        trim: true
    },
    cardIds: {
        type: [String],
        required: true
    }
})

module.exports = WhiteDeck;