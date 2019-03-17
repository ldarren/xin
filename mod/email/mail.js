const router = require('po/router')

return {
	deps: {
		inbox: 'models',
		tpl: 'file'
	},
	create(deps, params){
		this.el.innerHTML = deps.tpl()
	},
	events: {
		'click .message-list .text': function(evt, target){
		}
	}
}
