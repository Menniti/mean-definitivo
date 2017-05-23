// reviews.js

// required
//te da acesso a conneccao ao banco de dados
var mongoose = require('mongoose');

// função que aceita um objeto resposta, um codigo de estados e um objeto de dados
var sendJsonResponse = function(res, status, content){
	// responde com codigo de estado
	res.status(status);
	// responde com dados
	res.json(content);
};

// nova função sendo camada em cada função do controlador
// cria novo review
module.exports.reviewsCreate = function(req, res){
	sendJsonResponse(res, 200, {"status": "success CreateOne"});
};

// Le e retorna um review
module.exports.reviewsReadOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success ReadOne"});
};

// encontra e da update em um review
module.exports.reviewsUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success UpdateOne"});
};

// Encontra e remove um
module.exports.reviewsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success RemoveOne"})
};