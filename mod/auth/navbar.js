return {
	events: {
		'click #btn-login-dark': function(evt, target){
			evt.preventDefault();

			$('body').attr('class', 'login-layout');
			$('#id-text2').attr('class', 'white');
			$('#id-company-text').attr('class', 'blue');
		},
		'click #btn-login-light': function(evt, target){
			evt.preventDefault();

			$('body').attr('class', 'login-layout light-login');
			$('#id-text2').attr('class', 'grey');
			$('#id-company-text').attr('class', 'blue');
		},
		'click #btn-login-blur': function(evt, target){
			evt.preventDefault();

			$('body').attr('class', 'login-layout blur-login');
			$('#id-text2').attr('class', 'white');
			$('#id-company-text').attr('class', 'light-blue');
		}
	}
}
