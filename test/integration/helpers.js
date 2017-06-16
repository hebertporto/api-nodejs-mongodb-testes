var supertest   = require('supertest');
var chai        = require('chai');
var app         = require('./../../app.js');
var Product     = require('./../../lib/products/entity/products.js');

global.app      = app;
global.expect   = chai.expect;
global.request  = supertest(app);
global.Product  = Product;
