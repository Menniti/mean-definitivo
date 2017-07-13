var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');


var auth = jwt({
	// define a chave secreta usando a variavel de ambiente
	secret: process.env.JWT_SECRET,
	// define a propriedade req como payload
	userProperty: 'payload'
});

// inclui os arquivos dos controllers da API(que criaremos a seguir)
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');

// estabelecimentos (locations)
// define as rotas da API para estabelecimentos
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

// resenha reviews (reviews)
// define as todas da API para reviews
// Adicionando auth, middleware que ira verificar se o usuario esta autenticado antes de entrar na rota.
router.post('/locations/:locationid/reviews', auth, ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsDeleteOne);

// api register
router.post('/register', ctrlAuth.register);
// api login
router.post('/login', ctrlAuth.login);


module.exports = router;