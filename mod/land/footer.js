const router = require('po/router')

return {
	events: {
		'click ul.legal a': function(e, target){
			e.preventDefault()
			router.go($(target).attr('href').replace('#','/'))
		}
	}
}
