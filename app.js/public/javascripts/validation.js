$('#addReview').submit(function (e){
	// detect erro no evento submit
	$('.alert.alert-danger').hide();
	// verifica se os valores obrigatorios estao vazios
	if(!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()){
		if($('.alert.alert-danger').length) {
			// mostra ou injeta a mensagem de erro na pagina em caso afirmativo de erro
			$('.alert.alert-danger').show();
		} else {
			$(this).prepend('<div role="alert" class="alert alert-danger"> All fields required, please try again HUE HUE</div>')
		}
		// evita que o formulario seja enviado se tiver algum valor faltando
		return false;
	}
});