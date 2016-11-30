var Users   = require('./../entity/users');


var Service = function(req, res, next) {
	var find = {};

	if(req.params.id){
		find = Users.findById(req.params.id).exec();
	}

	if(!req.params.id){
		find = Users.find({}).exec();
	}


	find
		.then(function(result){
				if(!result){
					return res.status(404)
							  .json({
							  	status : false,
							  	data   : {}
							  });
				}
				return res.status(200)
						  .json({
						  	 status : true,
						  	 data   : result 
						  });
		})
		.catch(function(err){
			console.log("err",err);
			 return res.status(500)
			 		   .json({
			 		   		status : false,
			 		   		data   : {} 
			 		   })
		});
}

module.exports = Service;