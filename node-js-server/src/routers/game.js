const express = require('express');
const UserManager = require('../game/userManager');
const auth = require('../middleware/authentication');
const router = new express.Router();

// get all logged in users
router.get('/api/game/*', auth, (req, res) => {
    res.send(UserManager.getLoggedInUsers);
});

module.exports = router