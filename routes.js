module.exports = function (app) {
        app.use('/products', require('./lib/products'));
};
