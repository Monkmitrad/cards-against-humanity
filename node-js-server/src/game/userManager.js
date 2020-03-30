const GameManager = require('./gameManager');
const loggedInUsers = [];

const getLoggedInUsers = () => {
    return loggedInUsers;
}

const addUser = (username) => {
    if (!loggedInUsers.some((user) => user.username == username)) {
        loggedInUsers.push({
            username: username,
            ready: false
        });
        return true;
    } else {
        return false;
    }
};

const ready = (username, status) => {
    if (!loggedInUsers.includes(username)) {
        userIndex = loggedInUsers.findIndex((user) => username == user.username);
        loggedInUsers[userIndex].ready = status;
        checkReady();
    } else {
        throw new Error('Invalid user');
    }
};

const checkReady = () => {
    const users = getLoggedInUsers();
    console.log(users.length);
    if(users.length > 1 && users.every((user) => user.ready)) {
        GameManager.startGame();
    };
};

module.exports = { getLoggedInUsers, addUser, ready };