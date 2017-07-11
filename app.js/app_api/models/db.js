var mongoose = require('mongoose');
require('./locations');
require('./users');
// define uma variavel de conneccao com o mongoose
var dbURI = 'mongodb://127.0.0.1:27017/Loc8r';
if(process.env.NODE_ENV ==='production'){
	dbURI = 'mongodb:/addressProduction:8080'
}

mongoose.connect(dbURI);

// rastreia eventos de connecao com o mongoose
mongoose.connection.on('connect', function(){
	console.log('Mongoose connect to'+ dbURI);
});

mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error' + err);
});

mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnect');
});

// Eventos de encerramento de processos
var gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function (){
		console.log('Mongoose disconnect through' + msg);
		callback();
	});
};

// rastreadores quando a aplicação reinicia
// rastreia o sinal SIGUSR2 que o nodemon usa
process.once('SIGUSR2', function(){
	gracefulShutdown('nodemon restart', function(){
		// envia o sinal para matar o processo do SIGUSR2
		process.kill(process.pid, 'SIGUSR2')
	});
});

// rastreadores quano a aplicacao encerra
// Rastreia o sinal SIGINT emitido quando a aplicação é encerrada
process.on('SIGINT', function(){
	gracefulShutdown('app terminator', function(){
		// Envia mensagem função gracefulShutdown em callback para encerrar o processo NODE.js
		process.exit(0);
	});
});

// Rastreia sinal SIGTERM emitido pelo Heroku quando encerra um processo
process.on('SIGTERM', function(){
	gracefulShutdown('Heroku app shutdown', function(){
		// Envia mensagem função gracefulShutdown em callback para encerrar o processo NODE.js
		process.exit(0);
	});
});