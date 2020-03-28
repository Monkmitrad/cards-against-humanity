const mongoose = require('mongoose');

const BlackDeck = mongoose.model('BlackDeck', {
    deckName: {
        type: String,
        required: true,
        trim: true
    },
    cards: {
        type: [String],
        required: true
    }
})

module.exports = BlackDeck;