

/* Get homeList */

module.exports.homelist = function(req, res){
	res.render('locations-list', {
		title: 'Loc8r - find a place to work with wifi',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Find places to work with wifi near you!'
		},
		sidebar: 'Loc8r helps you find places to work when out and about. Perhaps with coffe, cake or a pint? let loc8r help you find the place you´re looking for.',
		locations: [{
			name: 'Starcups',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Hot drinks', 'Food', 'Premium Wifi'],
			distance: '100m'
		},{
			name: 'Cafe Hero',
			address: '1225 High Street',
			rating: 4,
			facilities: ['Hot drinks HOT', 'Food HOT'],
			distance: '200m'
		},{
			name: 'Burguer Queen',
			address: '1225 High Street, reading',
			rating: 2,
			facilities: ['Cold drinks cold', 'cold Food'],
			distance: '1250m'
		}]
	});
};

/* Get locationInfo */
module.exports.locationinfo = function(req, res){
	res.render('location-info', {
		title:'locationInfo',
		sidebar: 'Loc8r helps you find places to work when out and about. Perhaps with coffe, cake or a pint? let loc8r help you find the place you´re looking for.',
		locations: {
			name: 'Starcups',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Hot drinks', 'Food', 'Premium Wifi'],
			distance: '100m',
			mapUrl: 'http://www.cbronline.com/wp-content/uploads/2016/06/what-is-URL.jpg',
			opening: ['Monday - Friday : 7:00am - 7:00pm',
						'Saturday - 8:00am - 5:00pm',
						'Sunday : closed'
			]  
		},
		reviews:{
			authors: [{
				name: 'Simon Holmes',
				date: '16 July 2013',
				comment: 'What a great place. I cant say enough good things about it',
				rating: 3,
			},{
				name: 'Charlie Chaplin16',
				date: '16 July 2013',
				comment: 'It was okay. Coffee wasnt great, but the wifi was fast.',
				rating: 4,
			}]
		}
	});
};

/* Get addReview */
module.exports.addreview = function(req, res){
	res.render('location-review-form', {title:'addReview'});
};

