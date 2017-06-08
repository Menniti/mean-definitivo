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

// funcao que calcula os radianos e raio de distancia baseado nas coordenadas da terra
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
	console.log(req.body.name);
	console.log(req.body.address);
	Loc.create({
		// aplica o método create no modelo
		name: req.body.name,
		address: req.body.address,
		// cria um array com itens de facilities, a partir de uma lista separada por virgulas
		facilities: req.body.facilities.split(","),	
		/// converte coordenadas de string para numeros
		coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
		openingTimes: [{
			days: req.body.days1,
			opening: req.body.opening1,
			closing: req.body.closing1,
			closed: req.body.closed1,
		},{
			days: req.body.days2,
			opening: req.body.opening2,
			closing: req.body.closing2,
			closed: req.body.closed2,
		}]
	}, function(err, location){
		// funcao de callback
		if(err){
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 201, location);
		}
	});
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
	if(!req.params.locationid){
		sendJsonResponse(res, 404, {
			"message":"location nao foi encontrado, location é necessário"
		});
		console.log(locationid);
		return;
	}
	Loc
		.findById(req.params.locationid) // encontra o documento correto
		// utilizamos o método select para selecionar apenas o que desejamos vizualizar como resposta
		// no exemplo abaixo, utilizamos -reviews e -ratings por que é exatamente o que não queremos vizualizar.
		.select("-reviews -ratings")
		.exec(
			function(err, location){
			// modifica os parametros do location.name	
			location.name = req.body.name;
			// grava todos os parametros de acordo com o formulário do site.
			location.address = req.body.address;
			location.facilities = req.body.facilities;
			location.coords = [parseFloat(req.body.lng),
				parseFloat(req.body.lat)];
			location.openingTimes = [{
				days:req.body.days1,
				opening:req.body.opening1,
				closing:req.body.closing1,
				closed:req.body.closed1,
			}, {
				days:req.body.days2,
				opening:req.body.opening2,
				closing:req.body.closing2,
				closed:req.body.closed2,
			}];
			// salva o documento location com o método save do mongoose
			location.save(function(err, location){
				if(err){
					// checa se existe algum erro
					sendJsonResponse(res, 404, err);
				} else {
					// caso não tenha erro, envia uma resposta json 200.
					sendJsonResponse(res, 200, location);
				}
			});	
		});
};

// encontra e deleta um location
module.exports.locationsDeleteOne = function(req,res){
	var locationid = req.params.locationid;
	if(locationid || locationid.length > 0){
		Loc
			.findById(locationid) // Chama o método findById passando o locationid a ele
			.exec( // Executa o método
				function(err, location){
					// Faz algo com o documento
					// código de alteração do documento


					// verifica se o location id foi encontrado
					if(!location){
						sendJsonResponse(res, 404, {
						"message":"locationid not found"
					});
					return;
					} else if (err) {
						sendJsonResponse(res, 400, err);
						return;
					}
					// Remove o documento
					// seleciona o documento pelo _id e depois remove
					Loc.remove({_id:locationid}, function(err, location){
						if(err){
							sendJsonResponse(res, 404, err);
							return;
						}
						sendJsonResponse(res, 204, location); 
					});
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message": "No locationid"
		});
	}
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
		// cria objetos opção, incluindo uma distancia maxima de 20000m
		maxDistance: theEarth.getRadsFromDistance(20000),
		num: 10

	};
	// Cria a coordenada geoJSON
	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};

	if(!lng || !lat){
		// Verifica se os parametros lng e lat existe no formato correto, caso não devolve 404 e uma mensagem se não tiverem
		sendJsonResponse(res, 404, {
			"message": "lgn and lat query are parameters requered"
		});
		return;
	};
	// Envia a coordenada ao metodo geoNEar como seu primeiro parametro
	Loc.geoNear(point, geoOptions, function(err, results, stats){
		// Novo array para armazenar os dados processados
		var locations = [];
		if(err){
			// Se a query geoNear devolver um erro, envia ele com 404
			sendJsonResponse(res, 404, err);
		} else {
		// laco que percoe os resultados da query geoNear
			results.forEach(function(doc){
				locations.push({
				// extrai a distancia e converte em radianos para KM, usando a funação criada
				distance: theEarth.getDistanceFromRads(doc.dis),
				// coloca o resto dos dados em um objeto de retorno.
				name: doc.obj.name,
				address: doc.obj.address,
				rating: doc.obj.rating,
				facilities: doc.obj.facilities,
				_id: doc.obj._id
				});
			});
			// envia os dados processados ao solicitando no formato JSON
			sendJsonResponse(res, 200, locations);
		}
	}); 
};
