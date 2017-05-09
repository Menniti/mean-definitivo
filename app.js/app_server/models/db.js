var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/loc8r';

mongoose.connect('dbURL');

mongoose.connection.on('connect', function(){
	console.log('Mongoose connect to'+ dbURI);
});

mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error' + err);
});

mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnect');
});