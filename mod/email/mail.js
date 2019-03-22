const router = require('po/router')

return {
	deps: {
		bucket: 's3bucket',
		inbox: 'models',
		tpl: 'file'
	},
	create(deps, params){
		deps.bucket.read(params.id, deps.inbox, (err, mail) => {
			const content = new TextDecoder('utf-8').decode(new Uint8Array(mail.body))
			this.el.innerHTML = deps.tpl({
				sender: mail.sender,
				time: mail.time,
				subject: mail.subject,
				content
			})
		})
	},
	events: {
		'click .messagebar-item-left': function(evt, target){
			router.go('/dash/mail')
		}
	}
}
