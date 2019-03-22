// https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html
const router = require('po/router')

return {
	deps: {
		ums: 'cognito'
	},
	events: {
		'click a': function(evt, target){
			switch(target.hash){
			case '#settings':
			case '#profile':
				break
			case '#logout':
				this.deps.ums.signout()
				router.go('/auth')
				break
			default:
				return
			}
		}
	}
}
