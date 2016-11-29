var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var User    = mongoose.Schema({
	email : {
		type      : String,
		lowercase : true,
		require   : true
		
		// unique    : true,
	},
	password: {
		type      : String,
		required  : true
	},
	role: {
		type : String,
		enum : ['User','Owner','Admin'],
		default: 'User' 
	}

});

User.pre('save',function(next){
	var user = this;

	if(this.isModified('password') || this.isNew){
		bcrypt.genSalt(5, function(err, salt) {
			if (err) return next(err);
			bcrypt.hash(user.password, salt, null, function(err, hash){
				if(err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

User.methods.comparePassword = function(pw, cb){
	bcrypt.compare(pw, this.password, function(err, isMatch){
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', User);