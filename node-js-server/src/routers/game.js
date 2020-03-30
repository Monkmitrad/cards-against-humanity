const express = require('express');
const UserManager = require('../game/userManager');
const IoHandler = require('../io/ioHandler');
const auth = require('../middleware/authentication');
const router = new express.Router();

// get all logged in users
router.get('/api/game/users', auth, async (req, res) => {
    res.send(await UserManager.getLoggedInUsers());
});

router.post('/api/game/join', auth, (req, res) => {
    console.log('JoinPre');
    if (UserManager.addUser(req.user.username)) {
        console.log('JoinPost');
        IoHandler.onUserJoined(req.user.username);
        res.send();
    } else {
        res.status(400).send({errorMessage: 'Already joined the game!'});
    }  
});

module.exports = router;