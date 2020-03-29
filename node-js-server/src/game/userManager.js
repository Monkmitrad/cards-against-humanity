const mongoose = require('mongoose');

const loggedInUsers = [];

const getLoggedInUsers = () => {
    return loggedInUsers;
}