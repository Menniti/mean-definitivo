

/* Get homeList */

module.exports.homelist = function(req, res){
	res.render('locations-list', {
		title: 'Loc8r - find a place to work with wifi',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Find places to work with wifi near you!'
		}

	});
};

/* Get locationInfo */
module.exports.locationinfo = function(req, res){
	res.render('location-info', {title:'locationInfo'});
};

/* Get addReview */
module.exports.addreview = function(req, res){
	res.render('location-review-form', {title:'addReview'});
};

