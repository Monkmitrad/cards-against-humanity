const IoHandler = require('../io/ioHandler');

const gameStatuses = {
    NotStarted: 'NotStarted',
    Submit: 'CardSubmit',
    Reveil: 'CardReveil'
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
    gameStatus = gameStatuses.Submit;
    
    playingUsers.forEach(user => {
        ingameInfo.players.push({username: user.username, points: 0, played: false, playedCard: ''});
    });
    ingameInfo.currentCzar = ingameInfo.players[Math.floor(Math.random() * ingameInfo.players.length)].username;
    IoHandler.sendStatus(gameStatus);
};

const getIngameInfo = () => {
    return ingameInfo;
};

const submitCard = (username, cardId) => {
    isCardCzar(username);
    hasPlayed(username);

    const index = ingameInfo.players.findIndex((player) => player.username === username);
    ingameInfo.players[index].playedCard = cardId;
    ingameInfo.players[index].played = true;

    if(checkSubmitted()) {
        console.log('All users played a card, start reveil');
        startReveil();
    }
};

const isCardCzar = (username) => {
    if (ingameInfo.currentCzar === username) {
        throw new Error('This user is card czar!');
    }
    return false;
};

const hasPlayed = (username) => {
    if (ingameInfo.players.find((player) => player.username === username).played) {
        throw new Error('This user has already played a card!');
    }
    return false;
};

const checkSubmitted = () => {
    const players = ingameInfo.players; // copy of players to filter out czar
    const index = ingameInfo.players.findIndex((player) => player.username === ingameInfo.currentCzar); // index of czar
    players.splice(index, 1); // delete czar from users
    if (players.every((player) => player.played)) {
        // all players have submitte a card, reveil can start
        return true;
    } else {
        return false;
    }
};

const startReveil = () => {
    gameStatus = gameStatuses.CardReveil;
};

const nextRound = () => {

};

module.exports = {getGameStatus, gameStatuses: gameStatuses, startGame, getIngameInfo, submitCard, checkSubmitted };