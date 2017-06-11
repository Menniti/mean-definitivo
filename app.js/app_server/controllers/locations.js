// request
var request = require('request');
// definie as opcoes do local da API para localHost
var apiOptions = {
	server: "http://localhost:3000"
};
// caso o node esteja em producao
if(process.env.NODE_ENV === 'production'){
	apiOptions.server = "production_url"
};

// homepage rendering
var renderHomepage = function(req, res, respondeBody){
		// o pedido de renderizacao fica dentro da funcao que esta atribuida a variavel renderHomepage
		res.render('locations-list', {
		title: 'Loc8r - find a place to work with wifi',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Find places to work with wifi near you!'
		},
		sidebar: 'Loc8r helps you find places to work when out and about. Perhaps with coffe, cake or a pint? let loc8r help you find the place you´re looking for.',
		locations: respondeBody
	});
};

/* Get homeList */

module.exports.homelist = function(req, res){
	// chama a variavel renderHomepage que contem a funcao de renderizacao e repassa os req - request, e res - reponse
	// renderHomepage(req, res);

	var requestOptions, path;
	// Define o caminho de chamada para api ( o servidor ja foi definido no inicio do arquivo)
	path = '/api/locations';
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		// query string, parametros passados no GET
		qs: {
			lng: -0.9630883,
			lat: 51.451041,
			maxDistance: 20000,
		}
	};
	// passando parametros para o request * comentados abaixo
	// requestOptions e function(err, response, body)
	// enviando solicitacao e suas opcoes
	request(
		requestOptions,
		// funcao de callback para renderizar a homepage.
		function(err, response, body) {
			// passa os dados devolvidos pela API diretamente para funcao renderHomepage
			renderHomepage(req, res, body);
		}
	);
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

