var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/loc8r';

mongoose.connect('dbURL');

mongoose.connect.on('connect', function(){
	console.log('Mongoose connect to'+ dbURI);
});

mongoose.connect.on('error', function(err){
	console.log('Mongoose connection error' + err);
});

mongoose.connect.on('disconnected', function(){
	console.log('Mongoose disconnect');
});