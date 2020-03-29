const mongoose = require('mongoose');
const chalk = require('chalk');

const _port = '27017';
const _connectionURL = 'mongodb://127.0.0.1:' + _port + '/cah-db-api';

mongoose.connect(_connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log(chalk.blue('MongoDB connection established'));
}).catch((error) => {
    console.error(chalk.inverse.red('An error occured: ', error));
});