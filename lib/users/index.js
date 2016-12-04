var express  = require('express');
var router   = express.Router();
var passport = require('passport');

require('./../../config/passport.js')(passport);


router.get('/:id?', require('./services/find'));
router.post('/', require('./services/create'));
router.post('/authenticate', require('./services/authenticate'));


module.exports = router;

