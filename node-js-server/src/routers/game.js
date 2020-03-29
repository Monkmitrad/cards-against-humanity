const express = require('express');
const UserManager = require('../game/userManager');
const auth = require('../middleware/authentication');
const router = new express.Router();

// get all logged in users
router.get('/api/game/users', auth, (req, res) => {
    res.send(UserManager.getLoggedInUsers());
});

router.post('/api/game/join', auth, (req, res) => {
    if (UserManager.addUser(req.user.username)) {
        res.send();
    } else {
        res.status(400).send({errorMessage: 'Already joined the game!'});
    }  
});

module.exports = router;