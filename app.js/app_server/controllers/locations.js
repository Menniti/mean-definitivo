

/* Get homeList */

module.exports.homelist = function(req, res){
	res.render('locations-list', {title: 'Home'});
};

/* Get locationInfo */
module.exports.locationinfo = function(req, res){
	res.render('location-info', {title:'locationInfo'});
};

/* Get addReview */
module.exports.addreview = function(req, res){
	res.render('location-review-form', {title:'addReview'});
};

