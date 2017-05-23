var express = require('express');
var router = express.Router();

// inclui os arquivos dos controllers da API(que criaremos a seguir)
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

// estabelecimentos (locations)
// define as rotas da API para estabelecimentos
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationsid', ctrlLocations.locationsReadOne);
router.post('/locations/:locationsid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationsid', ctrlLocations.locationsDeleteOne);

// resenha reviews (reviews)
// define as todas da API para reviews
router.post('/locations/:locationsid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationsid/reviews/:reviewsid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationsid/reviews/:reviewsid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationsid/reviews/:reviewsid', ctrlReviews.reviewsDeleteOne);

module.exports = router;