const mongoose = require('mongoose');

const Deck = mongoose.model('Deck', {
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

module.exports = Deck;