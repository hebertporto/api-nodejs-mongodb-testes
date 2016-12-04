var express     = require('express');
var http        = require('http');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var cors        = require('cors');
var passport    = require('passport');

var app         = express();
var server      = http.createServer(app);

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// cors
app.use(cors());

// Start Passaport
app.use(passport.initialize());  


var config      = require('./config/config');
var db          = require('./config/db');

require('./routes')(app);


server.listen(3000, function(){
    console.log("Server na porta 3000");
});

module.exports = server;
