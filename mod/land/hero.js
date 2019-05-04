return {
	create(deps, params){
		//optinal: when window is too small change background presentation
		$(window).on('resize.bg_update', function() {
			var width = $(window).width()

			if(width < 992) {
				$('.img-main-background').addClass('hide')
				$('.jumbotron').addClass('has-background')
			} else {
				$('.img-main-background').removeClass('hide')
				$('.jumbotron').removeClass('has-background')
			}
		}).triggerHandler('resize.bg_update')
	}
}
