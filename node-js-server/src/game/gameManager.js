const IoHandler = require('../io/ioHandler');
const ioHandler = require('../io/ioHandler');

const gameStatuses = {
    NotStarted: 'NotStarted',
    Submit: 'CardSubmit',
    Reveil: 'CardReveil',
}

let gameStatus = gameStatuses.NotStarted;

class IngameInfo {
    constructor(players, currentCzar) {
        this.players = players;
        this.currentCzar = currentCzar;
    }
}

const ingameInfo = new IngameInfo([], '');
// ingameInfo.players.push({username: 'Dieter', points: 0, played: false, playedCard: '', cardContent: ''});

const getGameStatus = () => {
    return gameStatus;
};

const startGame = (playingUsers) => {
    console.log('Start Game');
    gameStatus = gameStatuses.Submit;
    
    playingUsers.forEach(user => {
        ingameInfo.players.push({username: user.username, points: 0, played: false, playedCard: '', cardContent: ''});
    });
    ingameInfo.currentCzar = ingameInfo.players[Math.floor(Math.random() * ingameInfo.players.length)].username;
    IoHandler.sendStatus(gameStatus);
};

const getIngameInfo = () => {
    return ingameInfo;
};

const submitCard = (username, cardId, cardContent) => {
    isCardCzar(username);
    hasPlayed(username);

    const index = ingameInfo.players.findIndex((player) => player.username === username);
    ingameInfo.players[index].playedCard = cardId;
    ingameInfo.players[index].played = true;
    ingameInfo.players[index].cardContent = cardContent;
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
    const ingamePlayers = [...ingameInfo.players]; // copy of players to filter out czar
    const index = ingameInfo.players.findIndex((player) => player.username === ingameInfo.currentCzar); // index of czar
    ingamePlayers.splice(index, 1); // delete czar from users
    if (ingamePlayers.every((player) => player.played)) {
        // all players have submitted a card, reveil can start
        return true;
    } else {
        return false;
    }
};

const startReveil = () => {
    gameStatus = gameStatuses.Reveil;
    IoHandler.sendStatus(gameStatus);
};

const winnerCard = (cardId, username) => {
    const winningPlayerIndex = ingameInfo.players.findIndex((player) => player.played && player.playedCard === cardId);
    ingameInfo.players[winningPlayerIndex].points++;
    if (ingameInfo.players[winningPlayerIndex].points >= 6) {
        // player has won the game
        console.log(ingameInfo.players[winningPlayerIndex].username, 'has won the game!');
    } else {
        nextRound();
    }
};

const nextRound = () => {
    gameStatus = gameStatuses.Submit;
    // get index of current czar
    const index = ingameInfo.players.findIndex((player) => player.username === ingameInfo.currentCzar);
    // determine next czar
    if (ingameInfo.players.length - 1 === index) {
        ingameInfo.currentCzar = ingameInfo.players[0].username;
    } else {
        ingameInfo.currentCzar = ingameInfo.players[index + 1].username;
    }
    IoHandler.updateGame(getIngameInfo());
    IoHandler.sendStatus(gameStatus);
};

module.exports = {getGameStatus, gameStatuses: gameStatuses, startGame, getIngameInfo, submitCard, checkSubmitted, startReveil, winnerCard };