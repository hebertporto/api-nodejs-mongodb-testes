var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;
var User 		= require('./../lib/users/entity/users');
var config      = require('./config.js');

module.exports = function (passport) {
	var  opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader('authorization');

	opts.secretOrKey  = config.secret;

	passport.use(new JwtStrategy(opts, function(jwt_payload, done){
	
		console.log("entrou na estrategia");

		User.findOne({_id: jwt_payload.id}, function(err, user){
			if (err) return done(err, false);

			if(user){
				console.log("user", user);
				done(null, user)
			}
			else
			{
				console.log("fail user");
				done(null, false);
			}
		});
	}));
};