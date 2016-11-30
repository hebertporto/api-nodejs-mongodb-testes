var express  = require('express');
var router   = express.Router();
var passport = require('passport');

require('./../../config/passport.js')(passport);

router.use(function (req, res, next){
	//console.log(req.headers);
	next();
});

router.get('/:id?', passport.authenticate('jwt', {session: false}), require('./services/find'));
router.post('/', require('./services/create'));
router.post('/authenticate', require('./services/authenticate'));


module.exports = router;

// /   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4M2UwZTQ3ZmQ3MWQ0MTY3MWRhMmI4MCIsImlhdCI6MTQ4MDQ2Mzg2MywiZXhwIjoxNDgwNDczOTQzfQ.XNanES8sWuTC1RagD39iVVLQY3GJ1vX6MXH1Cw0FjpQ
