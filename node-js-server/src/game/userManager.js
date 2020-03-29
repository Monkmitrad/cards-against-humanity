const mongoose = require('mongoose');

const loggedInUsers = [];

const getLoggedInUsers = () => {
    return loggedInUsers;
}

const addUser = (username) => {
    if (!loggedInUsers.includes(username)) {
        loggedInUsers.push(username);
        return true;
    } else {
        return false;
    }
}

module.exports = { getLoggedInUsers, addUser }