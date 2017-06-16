var passport = require('passport');

require('./config/passport.js')(passport);


module.exports = function (app) {
        // app.use('/products',passport.authenticate('jwt', {session: false}), require('./lib/products'));
        app.use('/products', require('./lib/products'));
        app.use('/users', require('./lib/users'));

};
