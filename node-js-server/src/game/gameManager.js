const IoHandler = require('../io/ioHandler');

const gameStatuses = {
    NotStarted: 'notStarted',
    Started: 'started'
}

const gameStatus = gameStatuses.NotStarted;

const getGameStatus = () => {
    return gameStatus;
};

const startGame = () => {
    console.log('Start Game');
    gameStatus = gameStatuses.Started;
    IoHandler.sendStatus(gameStatus);
};

module.exports = {getGameStatus, gameStatuses, startGame }