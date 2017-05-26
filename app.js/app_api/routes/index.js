var express = require('express');
var router = express.Router();

// inclui os arquivos dos controllers da API(que criaremos a seguir)
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

// estabelecimentos (locations)
// define as rotas da API para estabelecimentos
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.post('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

// resenha reviews (reviews)
// define as todas da API para reviews
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;