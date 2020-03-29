const express = require('express');
const WhiteDeck = require('../models/whiteDeck');
const BlackDeck = require('../models/blackDeck');
const auth = require('../middleware/authentication');
const router = new express.Router();

// add new white deck
router.post('/api/deck/white', auth, (req, res) => {
    const whiteDeck = new WhiteDeck(req.body);
    whiteDeck.save().then(() => {
        res.status(201).send(whiteDeck);
    }).catch((error) => {
        res.status(400).send(error);
    })
});

// add new black deck
router.post('/api/deck/black', auth, (req, res) => {
    const blackDeck = new BlackDeck(req.body);
    blackDeck.save().then(() => {
        res.status(201).send(blackDeck);
    }).catch((error) => {
        res.status(400).send(error);
    })
});

// get all white decks
router.get('/api/deck/white', auth, (req, res) => {
    WhiteDeck.find({}).then((whiteDecks) => {
        res.send(whiteDecks);
    }).catch((error) => {
        res.status(500).send();
    });
});

// get all black decks
router.get('/api/deck/black', auth, (req, res) => {
    BlackDeck.find({}).then((blackDecks) => {
        res.send(blackDecks);
    }).catch((error) => {
        res.status(500).send();
    });
});

// get specific white deck by ID
router.get('/api/deck/white/:id', auth, (req, res) => {
    const _id = req.params.id;
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        WhiteDeck.findById(_id).then((whiteDeck) => {
            if (!whiteDeck) {
                return res.status(404).send();
            }
            return res.send(whiteDeck);
        }).catch((error) => {
            return res.status(500).send();
        });
    } else {
        res.status(400).send({
            "errorMessage": "Please provide valid 24-character hex-string"
        });
    }
});

// get specific black deck by ID
router.get('/api/deck/black/:id', auth, (req, res) => {
    const _id = req.params.id;
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        BlackDeck.findById(_id).then((blackDeck) => {
            if (!blackDeck) {
                return res.status(404).send();
            }
            return res.send(blackDeck);
        }).catch((error) => {
            return res.status(500).send();
        });
    } else {
        res.status(400).send({
            "errorMessage": "Please provide valid 24-character hex-string"
        });
    }
});

// update specific white deck by ID
router.patch('/api/deck/white/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['deckName', 'cards'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ errorMessage: 'Invalid updates!' });
    }

    const _id = req.params.id;
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        try {
            WhiteDeck.findByIdAndUpdate(_id, req.body).then((whiteDeck) => {
                res.send(whiteDeck);
            }).catch((error) => res.status(500).send(error));
        } catch (error) {
            console.log(error);
            res.status(400).send();
        }
    }
});

// update specific black deck by ID
router.patch('/api/deck/black/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['deckName', 'cards'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ errorMessage: 'Invalid updates!' });
    }

    const _id = req.params.id;
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        try {
            BlackDeck.findByIdAndUpdate(_id, req.body).then((blackDeck) => {
                res.send(blackDeck);
            }).catch((error) => res.status(500).send(error));
        } catch (error) {
            console.log(error);
            res.status(400).send();
        }
    }
});

// delete specific white deck by ID
router.delete('/api/deck/white/:id', auth, async (req, res) => {
    const _id = req.params.id;
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        WhiteDeck.findByIdAndDelete(_id).then((whiteDeck) => {
            if (!whiteDeck) {
                return res.status(404).send();
            }
            return res.send(whiteDeck);
        }).catch((error) => {
            return res.status(500).send();
        });
    } else {
        res.status(400).send({
            "errorMessage": "Please provide valid 24-character hex-string"
        });
    }
});

// delete specific black deck by ID
router.delete('/api/deck/black/:id', auth, async (req, res) => {
    const _id = req.params.id;
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        BlackDeck.findByIdAndDelete(_id).then((blackDeck) => {
            if (!blackDeck) {
                return res.status(404).send();
            }
            return res.send(blackDeck);
        }).catch((error) => {
            return res.status(500).send();
        });
    } else {
        res.status(400).send({
            "errorMessage": "Please provide valid 24-character hex-string"
        });
    }
});

module.exports = router;