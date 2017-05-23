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

// Nova funcao sendo chamada em cada função do controlador
// cria um novo location
module.exports.locationsCreate = function(req, res){
	sendJsonResponse(res, 200, {'status': 'success LocationCreate'});
};

// Le um location
module.exports.locationsReadOne = function(req,res){
	// Extrai o parametro locationid do URL e repassa ao metodo findById
	// executa a query
	Loc
		.findById(req.params.locationid)
		.exec(function(err, location){ 
			// define o callback que aceite parametros devolvidos
			// devolve em formato JSON o documento encontrado.
			sendJsonResponse(res, 200, location);
		});
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
	Loc
		.find()
		.exec(function(err, location){
			sendJsonResponse(res, 200, location);
		});
};
