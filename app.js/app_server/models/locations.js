
var mongoose = require('mongoose');

var locationScheema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	address: String,
	rating: {
		type: Number,
		"default": 0,
		max: 5,
		min: 0 
	},
	// declarando array
	facilities: [String],
	coords: {
		type: [Number],
		index: '2dsphere'
	}
});