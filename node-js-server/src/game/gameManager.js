const IoHandler = require('../io/ioHandler');

const gameStatuses = {
    NotStarted: 'NotStarted',
    Started: 'Started'
}

let gameStatus = gameStatuses.NotStarted;

class IngameInfo {
    constructor(players, currentCzar) {
        this.players = players;
        this.currentCzar = currentCzar;
    }
}

const ingameInfo = new IngameInfo([], '');
// ingameInfo.players.push({username: 'Dieter', points: 0, played: false});
// ingameInfo.currentCzar = 'Dieter';
// console.log(ingameInfo);

const getGameStatus = () => {
    return gameStatus;
};

const startGame = (playingUsers) => {
    console.log('Start Game');
    gameStatus = gameStatuses.Started;
    playingUsers.forEach(user => {
        ingameInfo.players.push({username: user.username, points: 0, played: false});
    });
    console.log(playingUsers);
    ingameInfo.currentCzar = ingameInfo.players[Math.floor(Math.random() * ingameInfo.players.length)];
    console.log(ingameInfo.currentCzar);
    IoHandler.sendStatus(gameStatus);
};

const getIngameInfo = () => {
    return ingameInfo;
}

module.exports = {getGameStatus, gameStatuses, startGame, getIngameInfo };