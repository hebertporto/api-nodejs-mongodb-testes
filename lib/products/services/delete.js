var Products = require('./../entity/products');

var Service = function  (req, res, next) {
	var findById = Products.findById(req.params.id).exec();
	var remove   = Products.remove({
		_id: req.params.id
	});
	
	findById
		.then(function  (product) {
			if(!product){
				return res.status(404)
						  .json({
						  		status: false,
						  		data: {}
						  });
			}
			return remove
				 .exec()
				 .then(function  () {
				 	return res.status(200)
				 			  .json({
				 			  	 status: true,
				 			  	 data: {}
				 			  });
				 })
				 .catch(function  (err) {
				 		return res.status(500)
				 				  .json({
				 				  	status: false,
				 				  	data: {}
				 				  });
				 });
		})
		.catch(function  (err) {
			return res.status(500)
				 				  .json({
				 				  	status: false,
				 				  	data: {}
				 				  });
		});

}

module.exports = Service;