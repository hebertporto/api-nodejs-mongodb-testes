var User     = require('./../entity/users');
var config   = require('./../../../config/config.js');
var passport = require('passport');
var jwt      = require('jsonwebtoken');


var Service = function (req, res, next) {

	var findOne = {};

	findOne = User.findOne({email: req.body.email}, {email:1, password:1}).exec();

	findOne
		.then(function (result){
			if(!result){
				return res.status(404)
					      .json({
					      	status : false,
					      	data   :{}
					      });
			}

			result.comparePassword(req.body.password, function (err, isMatch){
					if(isMatch && !err)
					{
						var user = { password: result.password,
								     email: result.email,
								     _id: result._id };

						var token = "JWT " +jwt.sign(user, config.secret, {expiresIn: 10080});
						console.log(token);
						return res.status(200)
						  .json({
							  	 status : true,
							  	 data   : {
									  	 	token : token
							  	 }
						  });
					}
					else
					{
						return res.status(404)
						          .json({
						           	 status: false,
						           	 data: {
						           	 			msg: "User or Password Not Found."
						           	 }
						           });
					}
				});

		})
		.catch(function (err){
			return res.status(500)
			          .json({
			          	status: false,
			          	data: {}
			          });
		});
}

module.exports = Service;
