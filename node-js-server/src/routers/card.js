const express = require('express');
const WhiteCard = require('../models/whiteCard');
const BlackCard = require('../models/blackCard');
const auth = require('../middleware/authentication');
const router = new express.Router();

// add new white card
router.post('/api/card/white', auth, (req, res) => {
    const whiteCard = new WhiteCard(req.body.content);
    whiteCard.save().then(() => {
        res.status(201).send(whiteCard);
    }).catch((error) => {
        res.status(400).send(error);
    })
});

// add new black card
router.post('/api/card/black', auth, (req, res) => {
    const blackCard = new BlackCard(req.body.content);
    blackCard.save().then(() => {
        res.status(201).send(blackCard);
    }).catch((error) => {
        res.status(400).send(error);
    })
});

// get all white cards
router.get('/api/card/white', auth, (req, res) => {
    WhiteCard.find({}).then((whiteCards) => {
        res.send(whiteCards);
    }).catch((error) => {
        res.status(500).send();
    });
});

// get all black cards
router.get('/api/card/black', auth, (req, res) => {
    BlackCard.find({}).then((blackCards) => {
        res.send(blackCards);
    }).catch((error) => {
        res.status(500).send();
    });
});

// get specific white card by ID
router.get('/api/card/white/:id', (req, res) => {
    const _id = req.params.id;
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        WhiteCard.findById(_id).then((whiteCard) => {
            if (!whiteCard) {
                return res.status(404).send();
            }
            return res.send(whiteCard);
        }).catch((error) => {
            return res.status(500).send();
        });
    } else {
        res.status(400).send({
            "errorMessage": "Please provide valid 24-character hex-string"
        });
    }
});

// get specific black card by ID
router.get('/api/card/black/:id', (req, res) => {
    const _id = req.params.id;
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        BlackCard.findById(_id).then((blackCard) => {
            if (!blackCard) {
                return res.status(404).send();
            }
            return res.send(blackCard);
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