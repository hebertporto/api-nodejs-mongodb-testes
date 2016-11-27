module.exports = function (app) {
        app.use('/products', require('./lib/products'));
        app.use('/users', require('./lib/users'));

};
