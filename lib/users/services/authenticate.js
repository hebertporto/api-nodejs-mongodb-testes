var User     = require('./../entity/users');
var config   = require('./../../../config/config.js');  
var passport = require('passport');  
var jwt      = require('jsonwebtoken');  


var Service = function (req, res, next) {

	var findOne = {};

	findOne = User.findOne({email: req.body.email}).exec();

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
						
						var token = jwt.sign(result, config.secret, {expiresIn: 10080});
						console.log("token", token);
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
						           	 	msg: "Password not found"
						           	 }
						           });
					}
				});

		})
		.catch(function (err){
			console.log("error 500", err);
			return res.status(500)
			          .json({
			          	status: false,
			          	data: {}
			          });
		});
}

module.exports = Service;