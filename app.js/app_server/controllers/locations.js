

/* Get homeList */

module.exports.homeList = function(req, res){
	res.render('index', {title: 'Homelist'});
};

/* Get locationInfo */
module.exports.locationInfo = function(req, res){
	res.render('index', {title:'locationInfo'});
};

/* Get addReview */
module.exports.addReview = function(req, res){
	res.render('index', {title:'addReview'});
};