const express = require('express');
const UserManager = require('../game/userManager');
const GameManager = require('../game/gameManager');
const IoHandler = require('../io/ioHandler');
const WhiteCard = require('../models/whiteCard');
const auth = require('../middleware/authentication');
const router = new express.Router();

// get all logged in users
router.get('/api/game/users', auth, async (req, res) => {
    res.send(await UserManager.getLoggedInUsers());
});

// get game status
router.get('/api/game/status', auth, (req, res) => {
    res.send({ status: GameManager.getGameStatus() });
});

// user wants to join game
router.post('/api/game/lobby/join', auth, (req, res) => {
    if (GameManager.getGameStatus() === GameManager.gameStatuses.NotStarted) {
        if (UserManager.addUser(req.user.username)) {
            IoHandler.onUserJoined(req.user.username);
            res.send();
        } else {
            res.status(400).send({ errorMessage: 'Already joined the game!' });
        }
    } else {
        res.status(400).send({ errorMessage: 'Game already started!' });
    }
});

// user makes himself ready
router.post('/api/game/lobby/ready', auth, (req, res) => {
    if (GameManager.getGameStatus() == GameManager.gameStatuses.NotStarted) {
        if (UserManager.ready(req.user.username, req.body.status)) {
            IoHandler.updateClients();
            GameManager.startGame(UserManager.getLoggedInUsers());
        } else {
            IoHandler.updateClients();
        }

        res.send();
    } else {
        res.status(400).send({ errorMessage: 'Game already started!' });
    }
});

// user request ingame info
router.get('/api/game/ingame/info', auth, (req, res) => {
    if (UserManager.doesUserPlay(req.user.username)) {
        res.send({ info: GameManager.getIngameInfo() });
    } else {
        res.status(400).send({ errorMessage: 'This user does not play at the moment!' });
    }
});

router.post('/api/game/ingame/submitCard', auth, (req, res) => {
    if (GameManager.getGameStatus() === GameManager.gameStatuses.Submit) {
        if (UserManager.doesUserPlay(req.user.username)) {
            try {
                const cardId = req.body.cardId;
                if (cardId.match(/^[0-9a-fA-F]{24}$/)) {
                    WhiteCard.findById(cardId).then(() => {
                        GameManager.submitCard(req.user.username, cardId);
                        IoHandler.updateGame(GameManager.getIngameInfo());
                        res.send();
                    });
                } else {
                    res.send(400).send('Invalid Card ID');
                }
            } catch (error) {
                res.status(500).send({ error });
            }
        } else {
            res.status(400).send({ errorMessage: 'This user does not play at the moment!' });
        }
    } else {
        res.status(400).send({ errorMessage: 'Game has not started yet or game is in reveil phase!' });
    }
});

module.exports = router;