const mongoose = require('mongoose');

const BlackCard = mongoose.model('BlackCard', {
    content: {
        type: String,
        required: true
    }
});

const WhiteCard = mongoose.model('WhiteCard', {
    content: {
        type: String,
        required: true
    }
});

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

module.exports = {BlackCard, WhiteCard, Deck};