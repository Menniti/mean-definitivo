'use strict';

// incluindo mongoose
var mongoose = require('mongoose');

//sub-document - Schema openTime
var openingTimeSchema = new mongoose.Schema({
	days: {
		type: String, 
		required: true,
	},
	opening: String,
	closing: String,
	closed: {
		type: Boolean,
		required: true
	}
});

//sub-document - Schema review
var reviewSchema = new mongoose.Schema({
	author: String,
	rating: {
		type: Number,
		required: true,
		min: 0,
		max: 5
	},
	reviewText: String,
	createdOn: {
		type: Date,
		"default": Date.now
	}
});

//document - Schema location
var locationSchema = new mongoose.Schema({
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
	// coordenadas e pares de coordenadas geográficas.
	coords: {
		type: [Number],
		index: '2dsphere',
		required: true
	},
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]

});

// nomeia o locationSchema para ser chamado de Location pelo controller
mongoose.model('Location', locationSchema);

