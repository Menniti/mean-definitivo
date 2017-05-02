var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var crtlOthers = require('../controllers/others');

/* GET locations pages. */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationinfo);
router.get('/location/review/new', ctrlLocations.addreview);

/* GET Other pages */
router.get('/about', crtlOthers.about);

module.exports = router;
