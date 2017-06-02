// locations.js

// required
//te da acesso a conneccao ao banco de dados
var mongoose = require('mongoose');
// chama o modelo location
var Loc = mongoose.model('Location');

// função que aceita um objeto resposta, um codigo de estado, e um objeto de dados
var sendJsonResponse = function(res, status, content){
	// responde com um codigo de estado
	res.status(status);
	// responde com dados
	res.json(content);
};

var theEarth = (function(){
	// Valor em KM do raio da terra
	var earthRadius = 6371;
	// funcao para converter radianos em metros
	var getDistanceFromRads = function(rads){
		return parseFloat(rads * earthRadius);
	};
	// funcao para converter metros em radianos
	var getRadsFromDistance = function(distance){
		return parseFloat(distance / earthRadius);
	};
	// expõe as duas funções
	return {
		getDistanceFromRads: getDistanceFromRads,
		getRadsFromDistance: getRadsFromDistance
	};
	
})();


// Nova funcao sendo chamada em cada função do controlador
// cria um novo location
module.exports.locationsCreate = function(req, res){
	sendJsonResponse(res, 200, {'status': 'success LocationCreate'});
};

// Le um location
module.exports.locationsReadOne = function(req,res) {
	// Extrai o parametro locationid do URL e repassa ao metodo findById
	// executa a query
	if(req.params && req.params.locationid){ // verifica se existe o parametro ID na solicitacao
		Loc
			.findById(req.params.locationid) 
			.exec(function(err, location){ 
				if(!location){ //Captura de erro: se o mongose nao encontrar o estabelecimento, devolve uma mensagem 404 e sai da funcao com return
					sendJsonResponse(res, 404, {
						"message": "locationid not found"
					});
					return;
				} else if(err) { // se o mongoose encontrar algum erro, ele devolve o erro como mensagem e sai do controlador
					sendJsonResponse(res, 404, err);
					return;
				}
				// define o callback que aceite parametros devolvidos
				// devolve em formato JSON o documento encontrado.
				sendJsonResponse(res, 200, location); // envia o objeto do estabelecimento corretamente
			});
	} else {
		sendJsonResponse(res, 404, {
			"messagem": "no locationid in request"
		});
	}
};

// encontra e da update em um location
module.exports.locationsUpdateOne = function(req,res){
	sendJsonResponse(res, 200, {'status': 'success LocationUpdate'})
};

// encontra e deleta um location
module.exports.locationsDeleteOne = function(req,res){
	sendJsonResponse(res, 200, {'status': 'success LocationDeleteone'})
};

// lista as locations pela distancia
module.exports.locationsListByDistance = function(req,res){
	// extrai as coordenadas da string de query no url e convert a string em numeros
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	var geoOptions = {
		// consideramos um mapa esférico
		spherical: true,
		// retorna no máximo 10 resultados
		num: 10,
		// cria objetos opção, incluindo uma distancia maxima de 20km
		maxDistance: theEarth.getRadsFromDistance(20)
	};

	// Cria a coordenada geoJSON
	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};
	// Envia a coordenada ao metodo geoNEar como seu primeiro parametro
	Loc.geoNear(point, options, callback); 
};
