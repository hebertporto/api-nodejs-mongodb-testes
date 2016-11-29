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
						console.log(result._id);
						var token = jwt.sign({id: result._id}, config.secret, {expiresIn: 10080});

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
			
			// result.comparePassword(req.body.password, function (err, isMatch){

			// });

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