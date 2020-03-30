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
console.log(ingameInfo);
ingameInfo.players.push({username: 'Dieter', points: 0, played: false});
ingameInfo.currentCzar = 'Dieter';
console.log(ingameInfo);

const getGameStatus = () => {
    return gameStatus;
};

const startGame = () => {
    console.log('Start Game');
    gameStatus = gameStatuses.Started;
    IoHandler.sendStatus(gameStatus);
};

const getIngameInfo = () => {
    return ingameInfo;
}

module.exports = {getGameStatus, gameStatuses, startGame, getIngameInfo };