const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'mySecret');
        const user = await User.findById({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ errorMessage: 'Please authenticate! '});
    }
}

module.exports = auth;