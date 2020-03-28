"use strict";
const express = require('express');
const compression = require('compression');
const chalk = require('chalk');

require('./db/mongoose');

const userRouter = require('./routers/user');
const cardRouter = require('./routers/card');

const _port = 4100;
const _app_folder = '../../angular/dist/';
const app = express();

app.use((req, res, next) => {
    
    next();
});

app.use(express.json());
app.use(compression());

app.use(userRouter);
app.use(cardRouter);

// default api response
app.get('/api/*', (req, res) => {
    res.send({
        response: 'LuL'
    });
});

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APPLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log(chalk.blue("Node Express server for " + app.name + " listening on http://localhost:" + _port));
});