var express = require('express');
var router = express.Router();

// inclui os arquivos dos controllers da API(que criaremos a seguir)
var ctrlLocations = require('../controllers/locations');
var crtlOthers = require('../controllers/others');

/* GET locations pages. */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationinfo);
// inserindo o locationid na rota abaixo, com objetivo de captura-la no formulário
router.get('/location/:locationid/review/new', ctrlLocations.addreview);
// inserindo a mesma rota acima, no método post, mas colocando um controller diferente
router.post('/location/:locationid/review/new', ctrlLocations.doAddReview);

/* GET Other pages */
router.get('/about', crtlOthers.about);

module.exports = router;
