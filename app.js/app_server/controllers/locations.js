

/* Get homeList */

module.exports.homelist = function(req, res){
	res.render('locations-list', {
		title: 'Loc8r - find a place to work with wifi',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Find places to work with wifi near you!'
		},
		locations:{
			name: 'Starcups',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Hot drinks', 'Food', 'Premium Wifi'],
			distance: '100m'
		},{
			name: 'Cafe Hero',
			address: '1225 High Street'
			rating: 4,
			facilities: ['Hot drinks HOT', 'Food HOT'],
			distance: '200m'
		},{
			name: 'Burguer Queen',
			address: '1225 High Street, reading'
			rating: 2,
			facilities: ['Cold drinks cold', 'cold Food'],
			distance: '1250m'
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

