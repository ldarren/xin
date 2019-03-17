const router = require('po/router')

return {
	deps: {
		bucket: 's3bucket',
		inbox: 'models',
		tpl: 'file'
	},
	create(deps, params){
		const mail = deps.inbox.get(params.id)
		const content = new TextDecoder('utf-8').decode(new Uint8Array(mail.body))
		this.el.innerHTML = deps.tpl({
			sender: mail.sender,
			time: mail.time,
			subject: mail.summary,
			content
		})
	},
	events: {
		'click .messagebar-item-left': function(evt, target){
			router.go('/')
		}
	}
}
