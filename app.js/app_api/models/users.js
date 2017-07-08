'use strict';

var mongoose = require('mongoose');
// importanto o modulo de cryptografia
// randomBytes - Gera uma string crptografaa for para ser usada no SALT
// pbkd2Sync - Cria um hash a partir da senha e do salt; pbkdf2 significa
// password-based key derivation function

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

userSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 100, 64).toString('hex');
	return this.hash === hash;
};

userSchema.methods.generateJwt = function(){
	// cria um objeto data
	var expiry = new Date();
	// atribui 7 dias a ele
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign(
		// pass o payload method
		{
			_id: this._id,
			email: this.email,
			password: this.name,
			// inclui a exp em segundos
			exp: parseInt(expiry.getTime() / 1000)	
		},
		// envia a chave secreta para o algoritmo de hashing
		// JAMAIS mantenha chaves secretas no codigo, utilize variaveis de ambiente
		process.env.JWT_SECRET
	);
};

userSchema.methods.setPassword = function(password){
	// cria uma string aletoria para o salt
	this.salt = crypto.randomBytes(16).toString('hex');
	// cria um hash criptografado
	this.hash = crypto.pbkd2Sync(password, this.salt, 1000, 64).toString('hex');
};

const userSchema = new mongoose.Schema({
	// email devera ser obrigatorio e unico
	email:{
		type: String,
		required: true,
		unique: true,
	}
	// password devera se obrigatorio
	password: {
		type: String,
		required: true,
	}
	// hash e salt deverao ser strings simples
	hash: String,
	salt: String
});



