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
	var locationid = req.params.locationid;
	// atualizando a nota media
	var updateAverageRating = function(location){
		Loc
			.findById(locationid) // Encontra o documento correto a partir do ID fornecido
			.select('rating reviews')
			.exec(
				function(err, location){
					if(!err){
						doSetAverageRating(location);
					}
				});
	};

	// seta e faz a conta do rating medio
	var doSetAverageRating = function(location){
		var i, reviewCount, ratingAverage, ratingTotal;
		if(location.reviews && location.reviews.length > 0){
			reviewCount = location.reviews.length;
			ratingTotal = 0;
			// faz um lado que percorre os subdocumentos da resenha e soma as notas
			for(i = 0; i < reviewCount; i++){
				ratingTotal = ratingTotal + location.reviews[i].rating;
			}
			// calcula a nota media
			ratingAverage = parseInt(ratingTotal / reviewCount, 10);
			// atualiza a nota media no documento pai
			location.rating = ratingAverage;
			// salva o documento pai no banco.
			location.save(function(err){
				if(err){
					console.log(err);
				} else {
					console.log("Average rating update to", ratingAverage);
				}
			});
		}
	};



	// funcao que adiciona e salva subdocumentos review
	var doAddReview = function(req, res, location){
		// Quando a funcao e alimentada com um documento pai
		if(!location){
			sendJsonResponse(res, 404, {
				"message": "locationid not found"
			});
		} else {
			location.reviews.push({
				// salva os novos dados no array de subdocumentos...
				author: req.body.author,
				rating: req.body.rating,
				reviewText: req.body.reviewText
			});
			location.save(function(err, location){
				// antes de salvar no documento pai
				var thisReview;
				if(err){
					sendJsonResponse(res, 400, err);
				} else {
					// Se a operacao de salvar for completar com sucesso, chama a funcao para atualizar a nota media
					updateAverageRating(location._id);
					// Recupera a ultima resenha do array e devolve como uma resposta de confirmacao do Json
					thisReview = location.reviews[location.reviews.length - 1];
					sendJsonResponse(res, 201, thisReview);
				}
			});
		}
	};
	if (locationid){
		Loc
			.findById(locationid)
			.select('reviews')
			.exec(function(err, location){
				if(err){
					sendJsonResponse(res, 400, err);
				} else {
					// Se a operacao de busca tiver sucesso, isso chamara a nova funcao para adicionar a resenha
					// passando a ela os objeto de solicitacao, resposta e estabelecimento
					doAddReview(req, res, location);
				}
			}
		);
	} else {
		sendJsonResponse(res, 404, {
			"message": "Not found, locationid required"
		});
	};
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