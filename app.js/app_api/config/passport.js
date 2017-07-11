var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	function(username, password, done) {		
		User.findOne(
			// envia o parametro de encontra para o findOne
			// procura por email
			{email: username},
			function(err, user){
				// nao encontrar algum erro devolve um erro
				if(err){
					return done(err);
				}
				// se nao encontrar nenhum usuario devolve a incorrec username
				if(!user){
					return done(null, false, {
						"message":'Incorrect username'
					});
				}
				// valida o password no validPassword
				// se nao encontrar, retorna password falso
				if(!user.validPassword(password)){
					return done(null, false, {
						"message":'Incorrect password'
					})
				}
				// devolve o usuario a aplicacao
				return done(null, user);
			}

		)
	}
));

