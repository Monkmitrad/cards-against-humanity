"use strict";
const express = require('express');
const compression = require('compression');
const chalk = require('chalk');

require('./db/mongoose');

const userRouter = require('./routers/user');

const WhiteCard = require('./models/whiteCard');
const BlackCard = require('./models/blackCard');

const _port = 4100;
const _app_folder = '../angular/dist/';
const app = express();

app.use((req, res, next) => {
    
    next();
});

app.use(express.json());
app.use(compression());

app.use(userRouter);

// ---- SERVE POST API REQUEST ---- //

// add new white card
app.post('/api/card/white', (req, res) => {
    const whiteCard = new WhiteCard(req.body);
    whiteCard.save().then(() => {
        res.status(201).send(whiteCard);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// add new black card
app.post('/api/card/black', (req, res) => {
    const blackCard = new BlackCard(req.body);
    whiteCard.save().then(() => {
        res.status(201).send(blackCard);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// ---- SERVE GET API REQUEST ---- //

// get all white cards
app.get('/api/card/white', (req, res) => {
    WhiteCard.find({}).then((whiteCards) => {
        res.send(whiteCards);
    }).catch((error) => {
        res.status(500).send();
    });
});

// get specific white card by ID
app.get('/api/card/white/:id', (req, res) => {
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
            "errorMessage":"Please provide valid 24-character hex-string"
        });
    }
});

// get all black cards
app.get('/api/card/black', (req, res) => {
    BlackCard.find({}).then((blackCards) => {
        res.send(blackCards);
    }).catch((error) => {
        res.status(500).send();
    });
});

// get specific black card by ID
app.get('/api/card/black/:id', (req, res) => {
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
            "errorMessage":"Please provide valid 24-character hex-string"
        });
    }
});

// default api response
app.get('/api/*', (req, res) => {
    res.send({
        response: 'LuL'
    });
});

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APPLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log(chalk.blue("Node Express server for " + app.name + " listening on http://localhost:" + _port));
});