'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.register = function(req, res){
	// verifica se tem algum campo nao preenchido
	if(!req.body.name || !req.body.email || !req.body.password){
		sendJSONresponse(res, 400, {
			"message": "all fields are required"
		});
	return;
	} 
	// cria um novo usuario user
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	// emprega o metodo setPassword para gerar o salt + hash
	user.setPassword(req.body.password);
	// Grava o novo usuario no MongoDB
	user.save(function(err){
		var token;
		if(err){
			console.log(err)
			sendJSONresponse(res, 404, err);
		} else {
			// gera um JWT usando o metodo do schema e envia ao navegador
			token = user.generateJwt();
			sendJSONresponse(res, 200, {
				"token": token
			});
		}
	});
};

module.exports.login = function(req, res){
	// verifica se email e senha foram preenchidos
	if(!req.body.email || !req.body.password){
		sendJSONresponse(res, 400, {
			"message": "all fields are required"
		});
	return;
	}
	// Faz autenticacao do usuario
	// passa o nome da estrategia e um callback para o metodo de autenticacao
	passport.authenticate('local', function(err, user, info){
		var token;
		// passaport devolve um erro
		if(err){
			sendJSONresponse(res, 404, err);
			return;
		}
		// se o passaport devolver uma instancia de usuario, gera e envia o JWT
		if(user){
			token = user.generateJwt();
			sendJSONresponse(res, 200, {
				"token": token
			});
		} else {
			// em caso de erro, devolve uma mensagem falando por que falhou
			sendJSONresponse(res, 401, info);
		}
		// garante que o req, res estajam disponiveis para o passport
	})(req,res);
}