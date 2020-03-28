const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/authentication');
const router = new express.Router();

// add new user (signup)
router.post('/api/user', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// login user
router.post('/api/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        await user.UpdateLogin();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({
            errorMessage: 'Login failed!',
            error: error
        });
    }
});

// logout user
router.post('/api/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

// logout of all sessions
router.post('/api/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

// get all usernames
router.get('/api/user', auth, async (req, res) => {
    try {
        const users = await User.find({});
        const sanitizedUsers = [];
        users.forEach((user) => {
            sanitizedUsers.push(user.getUsername());
        });
        res.send(sanitizedUsers);
    } catch (error) {
        res.status(500).send();
    }
});

// get own user
router.get('/api/user/me', auth, async (req, res) => {
    res.send(req.user);
})

// update own user
router.patch('/api/user/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['lastLogin', 'username', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ errorMessage: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();

        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true } );

        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// delete own user
router.delete('/api/user/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;