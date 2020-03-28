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
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({
            errorMessage: 'Login failed!'
        });
    }
});

// get all users
router.get('/api/user', auth, async (req, res) => {
    try {
        const users = await User.find({ });
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/api/user/me', auth, async (req, res) => {
    res.send(req.user);
})

// get specific user by ID
router.get('/api/user/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        if (_id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            const user = await User.findById(_id);

            if (!user) {
                return res.status(404).send();
            }
            return res.send(user);
        } else {
            res.status(400).send({ "errorMessage":"Please provide valid 24-character hex-string" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});


// update specific user by ID
router.patch('/api/user/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['lastLogin', 'username', 'password'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send( { errorMessage: 'Invalid updates!' });
        }

        if (_id.match(/^[0-9a-fA-F]{24}$/)) {
            const user = await User.findById(_id);

            updates.forEach((update) => user[update] = req.body[update]);
            await user.save();

            // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true } );

            if (!user) {
                return res.status(404).send();
            }

            res.send(user);
        } else {
            res.status(400).send({ "errorMessage":"Please provide valid 24-character hex-string" });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;