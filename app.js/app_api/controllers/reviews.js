// reviews.js

// required
//te da acesso a conneccao ao banco de dados
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

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
	if(req.params && req.params.locationid && req.params.reviewid){ // Verifica se o parametro reviewid existe
		Loc
			.findById(req.params.locationid)
			.select('name reviews') // Adiciona o metodo select do mongoose a query do modelo, informando que queremos apenas o nome e o conjunto de resenhas do documento.
			.exec(
				function(err, location){
					var response, review;
					if(!location) {
						sendJsonResponse(res, 404, {
							"message": "location not found"
						});
						return;
					} else if (err) {
						sendJsonResponse(res, 400, err);
						return;
					}
					if(location.reviews && location.reviews.length > 0 ){ // Verifica se o estabelecimento possui uma ou mais resenhas
						review = location.reviews.id(req.params.reviewid);
						console.log(review)
						if(!review){
							sendJsonResponse(res, 404, { // se a resenha nao puder ser encontrada, devolve mensagem e status apropriados
								"message": "reviewid not found"
							});
						} else { // Se a resenha existir, monta um objeto resposta que contenha a resenha, o nome do estabelecimento e o  id do estabelecimento
							response = {
								location: {
									name: location.name,
									id : req.params.locationid
								},
								review: review
							};
							sendJsonResponse(res, 200, response);
						}						
					} else {
						sendJsonResponse(res, 404, { // Se nao ouver nenhuma resenha, devolve mensagem e status apropriado.
							"message": "No reviews founded"
						})
					}
				});
	} else {
		sendJsonResponse(res, 404, {
			"message":"Not found, location id and review id are both required"
		});
	}
};

// encontra e da update em um review
module.exports.reviewsUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success UpdateOne"});
};

// Encontra e remove um
module.exports.reviewsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status": "success RemoveOne"})
};