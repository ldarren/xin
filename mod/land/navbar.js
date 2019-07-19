const router = require('po/router')

return {
	deps: {
		ums: 'cognito',
		tpl: 'file',
		shortcuts: ['boolean', false]
	},
	create(deps, params){
		const el = this.el.querySelector('#navbar-container')
		this.setElement(el)
		el.innerHTML = deps.tpl(deps)
		///make navbar compact when scrolling down
		var isCompact = false
		$(window).on('scroll.scroll_nav', function() {
			var scroll = $(window).scrollTop()
			var h = $(window).height()
			var body_sH = document.body.scrollHeight
			if(scroll > parseInt(h / 4) || (scroll > 0 && body_sH >= h && h + scroll >= body_sH - 1)) {//|| for smaller pages, when reached end of page
				if(!isCompact) $('.navbar').addClass('navbar-compact')
				isCompact = true
			} else {
				$('.navbar').removeClass('navbar-compact')
				isCompact = false
			}
		}).triggerHandler('scroll.scroll_nav')

		const a = el.querySelector('li#auth a')
		const span = a.querySelector('span')
		if (deps.ums.isValid()){
			a.href= '#dash'
			span.innerText = 'Dashboard'
		}else{
			a.href= '#login'
			span.innerText = 'Login'
		}
	},
	events: {
		'click a': function(e, target){
			const href = $(target).attr('href')
			switch(href){
			case '#land#top':
			case '#login':
			case '#dash':
				e.preventDefault()
				router.go(href.replace('#','/'))
				break
			default:
			{
				const $href = $(href)
				if($href.length === 1) {
					const offset = $href.offset()
					const top = parseInt(Math.max(offset.top - 30, 0))
					$('html, body').animate({scrollTop: top}, 250)
				}
				break
			}
			}
		}
	}
}
