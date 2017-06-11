
// homepage rendering
var renderHomepage = function(req, res){
		// o pedido de renderizacao fica dentro da funcao que esta atribuida a variavel renderHomepage
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

/* Get homeList */

module.exports.homelist = function(req, res){
	// chama a variavel renderHomepage que contem a funcao de renderizacao e repassa os req - request, e res - reponse
	renderHomepage(req, res);
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
			mapUrl: 'http://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=markers=51;455041,-0;96088$scale=2',
			openingTimes: [{
				days: 'Monday - Friday',
				opening: '7:00am',
				close: '7:00pm',
				closed: false
			},{
				days: 'Saturday',
				opening: '8:00am', 
				close: '5:00pm',
				closed: false
			},{
				days: 'Sunday',
				closed: true	
			}]  
		},
		reviews:{
			authors: [{
				name: 'Simon Holmes',
				timestamp: '16 July 2013',
				reviewText: 'What a great place. I cant say enough good things about it',
				rating: 3,
			},{
				name: 'Charlie Chaplin16',
				timestamp: '16 July 2013',
				reviewText: 'It was okay. Coffee wasnt great, but the wifi was fast.',
				rating: 4,
			}]
		}
	});
};

/* Get addReview */
module.exports.addreview = function(req, res){
	res.render('location-review-form', {title:'addReview'});
};

