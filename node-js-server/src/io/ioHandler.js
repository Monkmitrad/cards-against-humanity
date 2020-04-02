const UserManager = require('../game/userManager');

let io = undefined;

const socketHandler = function(_io, socket) {
    console.log('New WebSocket connection');
    io = _io;

    socket.on('message', (message) => {
        console.log(message);
    });
};

const onUserJoined = (username) => {
    io.emit('userJoined', username + ' has joined the game!');
    updateClients();
};

const updateClients = () => {
    io.emit('joinedUsers', UserManager.getLoggedInUsers());
};

const sendStatus = (status) => {
    io.emit('status', status);
};

const updateGame = (ingameInfo) => {
    io.emit('gameUpdate', ingameInfo);
};

const winnerCard = (username) => {
    io.emit('winnerCard', username);
}

module.exports = { socketHandler, onUserJoined, updateClients, sendStatus, updateGame, winnerCard };