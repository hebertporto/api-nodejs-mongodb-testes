var User = require('./../entity/users');

var Service = function (req, res, next){
	var user = new User(req.body);

	user
		.save()
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
		.catch(function (err){
			return res.status(500)
					  .json({
					  	status : false,
					  	data   : {}
					  });
		});
}

module.exports = Service;