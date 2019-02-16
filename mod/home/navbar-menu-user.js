const router = require('po/router')

return {
	deps: {
		auth: 'models'
	},
	events: {
		'click a': function(evt, target){
			switch(target.hash){
			case '#settings':
			case '#profile':
				break
			case '#logout':
				this.deps.auth.clear()
				router.go('auth')
				break
			default:
				return
			}
		}
	}
}
