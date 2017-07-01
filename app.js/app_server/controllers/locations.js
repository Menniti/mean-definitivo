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

// tratamento de erros de códigos vindo da API, caso o código não seja 200

var _showError = function(req, res, status){
	var title, 
		content;
	// caso o status seja 404, define o conteúdo da página
	if(status === 404){
		title = "404, page not found";
		content = "Oh dear, looks like you are not having API information sorry";
	} else {
		// caso o status seja diferente de 404, alguma coisa deu errada na API
		title = "Something got wrong, really wrong"
		content = "Your api for somereason get back other information then 404, what happenedd ?";
	}
	// utiliza o parametro status para definir o status de resposta
	res.status(status);
	// renderiza a pagina, envia ao navegador, de acordo com o status do retorno da API
	res.render('generic-text',{
		title: title,
		content: content
	});
}

// função reutilizável para obtencao dos estabelecimentos
// aceita um callback como terceiro paramatro e contem o codigo usado no controlador
var getLocationInfo = function(req, res, callback){
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
		// verifica se a resposta da api é 200
		if(response.statusCode === 200) {
			// continua a renderização caso a resposta seja 200
			data.coords = {
				lng: body.coords[0],
				lat: body.coords[1]
			}
		//caso receba a resposta positiva da API response, invoca o callback em vez de uma função identificada
			callback(req, res, data);
		} else {
			// se o status for diferente de 200, repassa o erro para a função _showError
			_showError(req, res, response.statusCode);
		}
	});
};


/* Get locationInfo */
module.exports.locationinfo = function(req, res){
	// chama a funcao getLocationInfo passando um callback como parametro para a funcao renderDetailPage
	getLocationInfo(req, res, function(req, res, responseData){
		renderDetailPage(req, res, responseData);
	});
};

// cria a função para abrir o controlador do addReview
var renderReviewForm = function(req, res, locDetail){
	res.render('location-review-form', {
		title: 'Review ' + locDetail.name + ' on Loc8r',
		pageHeader: { title: 'Review ' + locDetail.name}
	});
};

/* Get addReview */
module.exports.addreview = function(req, res){
	// chama a função que requisita as informações da LocationInfo
	getLocationInfo(req, res, function(req, res, responseData){
		// chama a função que irá rederizar o addReview
		// tambem passa a renderReviewForm como callback
		renderReviewForm(req, res, responseData);
	});	
};

/* Post doAddReview */

module.exports.doAddReview = function(req, res){
	res.render('', {title: "doAddReview"});
};