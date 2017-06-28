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
var renderHomepage = function(req, res, responseBody){
		var message; // define uma variável para armazenar mensagem
		console.log(responseBody)
		if(!(responseBody instanceof Array)){ 
			// se a resposta não for um array, define uma mensagem e responseBody como um array vazio.
			message: "API Lookup error";
			responseBody = [];
		} else {
			if(!responseBody.length){ // caso o array seja nulo, devolve nenhum resultado
				message = "no places found nearby";
			}
		}
		// o pedido de renderizacao fica dentro da funcao que esta atribuida a variavel renderHomepage
		res.render('locations-list', {
		title: 'Loc8r - find a place to work with wifi',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Find places to work with wifi near you!'
		},
		sidebar: 'Loc8r helps you find places to work when out and about. Perhaps with coffe, cake or a pint? let loc8r help you find the place you´re looking for.',
		locations: responseBody,
		message: message
	});
};

/* Get homeList */

var _formatDistance = function(distance){
	var numDistance, unit;
	if(distance > 1){
		numDistance = parseFloat(distance).toFixed(1);
		unit = 'km';
	} else {
		numDistance = parseInt(distance * 1000,10);
		unit = 'm';
	}
	return numDistance + unit;
};

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
			//lng:1,
			//lat:1,
			lng: -0.79922599,
			lat: 51.378091,
			maxDistance: 2000000000,
		}
	};
	// passando parametros para o request * comentados abaixo
	// requestOptions e function(err, response, body)
	// enviando solicitacao e suas opcoes
	request(
		requestOptions,
		// funcao de callback para renderizar a homepage.
		function(err, response, body) {
			var i, data;
			data = body;
			if(response.statusCode === 200 && data.length) {	
				for(i=0; i<data.length; i++){
					data[i].distance = _formatDistance(data[i].distance);
				}
			}
			// passa os dados devolvidos pela API diretamente para funcao renderHomepage
			renderHomepage(req, res, data);
		}
	);
};

// renderDetailPage

var renderDetailPage = function(req, res, locDetail){ // locDetail e um novo parametro com o JSON vindo da funcao request
	console.log(locDetail)
	res.render('location-info', {
		// faz referencia aos dados a itens especificos
		title: locDetail.name,
		pageHeader: {title: locDetail.name},
		sidebar: 'Loc8r helps you find places to work when out and about. Perhaps with coffe, cake or a pint? let loc8r help you find the place you´re looking for.',
		// repassa a visao o objeto de dados locDetail, que contem todos os detalhes do estabelecimento.
		locations: locDetail
	});
};

/* Get locationInfo */
module.exports.locationinfo = function(req, res){
	var requestOptions, path;
	path = "/api/locations/" + req.params.locationid; // extrai os parametros a partir da URL para colocar na URL da API
	console.log(req.params.locationid)
	// requestOptions define todos os parametros do request, antes de fazer a chamada da API.
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {}
	};
	request(requestOptions, function(err, response, body){
		// faz um pedido para renderizar a pagina, depois que a API responder
		var data = body;
		console.log(data.coords)
		data.coords = {
			lng: body.coords[0],
			lat: body.coords[1]
		}
		// envia dados transformados para renderizacao
		renderDetailPage(req, res, data);
	});
};

/* Get addReview */
module.exports.addreview = function(req, res){
	res.render('location-review-form', {title:'addReview'});
};

