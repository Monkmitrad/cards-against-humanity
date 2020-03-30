const express = require('express');
const UserManager = require('../game/userManager');
const GameManager = require('../game/gameManager');
const IoHandler = require('../io/ioHandler');
const auth = require('../middleware/authentication');
const router = new express.Router();

// get all logged in users
router.get('/api/game/users', auth, async (req, res) => {
    res.send(await UserManager.getLoggedInUsers());
});

// get game status
router.get('/api/game/status', auth, (req, res) => {
    res.send(GameManager.getGameStatus());
});

// user wants to join game
router.post('/api/game/lobby/join', auth, (req, res) => {
    if (GameManager.getGameStatus() == GameManager.gameStatuses.NotStarted) {
        if (UserManager.addUser(req.user.username)) {
            IoHandler.onUserJoined(req.user.username);
            res.send();
        } else {
            res.status(400).send({errorMessage: 'Already joined the game!'});
        }
    } else {
        res.status(400).send({errorMessage: 'Game already started!'});
    }
});



// user makes himself ready
router.post('/api/game/lobby/ready', auth, (req, res) => {
    if (GameManager.getGameStatus() == GameManager.gameStatuses.NotStarted) {
        UserManager.ready(req.user.username, req.body.status);
        IoHandler.updateClients();
        res.send();
    } else {
        res.status(400).send({errorMessage: 'Game already started!'});
    }
});

module.exports = router;