var mongoose = require('mongoose');
var dbURI = 'mongodb://127.0.0.1:27017/Loc8r';

mongoose.connect(dbURI);

mongoose.connection.on('connect', function(){
	console.log('Mongoose connect to'+ dbURI);
});

mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error' + err);
});

mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnect');
});

var gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function (){
		console.log('Mongoose disconnect through' + msg);
		callback();
	});
};

