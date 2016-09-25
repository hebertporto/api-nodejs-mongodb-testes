'use strict';

var mongoose = require('mongoose');
var config = require('./config');

mongoose.Promise = require('bluebird');

mongoose.connect(config.db[process.env.NODE_ENV]);


mongoose.connection.on('error', (err) => {
    console.log("Erro: ", err);
});

mongoose.connection.on('connected', () => {
    console.log("Conectado ao MongoDB");
});

mongoose.connection.on('disconnected', () => {
    console.log("Desconectado do MongoDB");
});


module.exports = mongoose;
