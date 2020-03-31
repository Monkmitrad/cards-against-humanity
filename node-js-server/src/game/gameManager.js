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
// ingameInfo.players.push({username: 'Dieter', points: 0, played: false, playedCard: ''});

const getGameStatus = () => {
    return gameStatus;
};

const startGame = (playingUsers) => {
    console.log('Start Game');
    gameStatus = gameStatuses.Started;
    playingUsers.forEach(user => {
        ingameInfo.players.push({username: user.username, points: 0, played: false, playedCard: ''});
    });
    ingameInfo.currentCzar = ingameInfo.players[Math.floor(Math.random() * ingameInfo.players.length)].username;
    IoHandler.sendStatus(gameStatus);
};

const getIngameInfo = () => {
    return ingameInfo;
}

const submitCard = (username, cardId) => {
    const index = ingameInfo.players.findIndex((player) => player.username = username);
    ingameInfo.players[index].playedCard = cardId;
    ingameInfo.players[index].played = true;
}

module.exports = {getGameStatus, gameStatuses, startGame, getIngameInfo, submitCard };