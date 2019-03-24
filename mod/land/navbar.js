return {
	create(deps, params){
		///make navbar compact when scrolling down
		var isCompact = false;
		$(window).on('scroll.scroll_nav', function() {
			var scroll = $(window).scrollTop();
			var h = $(window).height();
			var body_sH = document.body.scrollHeight;
			if(scroll > parseInt(h / 4) || (scroll > 0 && body_sH >= h && h + scroll >= body_sH - 1)) {//|| for smaller pages, when reached end of page
				if(!isCompact) $('.navbar').addClass('navbar-compact');
				isCompact = true;
			} else {
				$('.navbar').removeClass('navbar-compact');
				isCompact = false;
			}
		}).triggerHandler('scroll.scroll_nav');
	},
	events: {
		'click a': function(e, target){
			var href = $(target).attr('href');
			if(!( /^\#/.test(href) )) return;
			var target = $(href);
			if(target.length == 1) {
				var offset = target.offset();
				var top = parseInt(Math.max(offset.top - 30, 0));
				$('html,body').animate({scrollTop: top}, 250);
			}
		}
	}
}
