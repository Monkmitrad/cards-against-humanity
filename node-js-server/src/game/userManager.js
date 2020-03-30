const loggedInUsers = [];

const getLoggedInUsers = () => {
    return loggedInUsers;
};

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
        return checkReady();
    } else {
        throw new Error('Invalid user');
    }
};

const checkReady = () => {
    const users = getLoggedInUsers();
    if (users.length > 1 && users.every((user) => user.ready)) {
        return true;
    } else {
        return false;
    }
};

const doesUserPlay = (username) => {
    return loggedInUsers.some((user) => user.username == username)
}

module.exports = { getLoggedInUsers, addUser, ready, doesUserPlay };