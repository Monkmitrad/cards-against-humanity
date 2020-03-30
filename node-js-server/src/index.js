"use strict";
const http = require('http');
const express = require('express');
const compression = require('compression');
const chalk = require('chalk');
const fs = require('fs');
const socketio = require('socket.io');

require('./db/mongoose');

const userRouter = require('./routers/user');
const cardRouter = require('./routers/card');
const deckRouter = require('./routers/deck');
const gameRouter = require('./routers/game');

const _port = 4100;
const _app_folder = '../angular/dist/';
const app = express();
const server = http.createServer(app);

const io = socketio(server);

// ---- HANDLE IO CONNECTION ---- //
io.on('connection', function(socket) {
    require('./io/ioHandler').socketHandler(io, socket);
});

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use(express.json());
app.use(compression());

// add routers
app.use(userRouter);
app.use(cardRouter);
app.use(deckRouter);
app.use(gameRouter);

// default api response
app.get('/api/*', (req, res) => {
    res.status(404).send({
        errorMessage: 'This API endpoint does not exist!'
    });
});

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APPLICATION PATHS ---- //
app.all('*', (req, res) => {
    try {
        if (fs.existsSync(_app_folder)) {
                res.status(200).sendFile(`/`, {root: _app_folder});
        } else {
                res.status(404).send('404');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

// ---- START UP THE NODE SERVER  ----
server.listen(_port, function () {
    console.log(chalk.blue("Node Express server for " + app.name + " listening on http://localhost:" + _port));
});

