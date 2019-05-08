const router = require('po/router')

function attachmentSize(attachments){
	if (!attachments.length) return 0
	const bytes = attachments.reduce((acc, a) => {
		acc += a.content.length
		return acc
	}, 0)
	return (bytes/1048576).toFixed(2)
}

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
				content,
				attachments: mail.attachments,
				attachmentSize: attachmentSize(mail.attachments)
			})
		})
	},
	events: {
		'click .messagebar-item-left': function(evt, target){
			router.go('/dash/mail')
		}
	}
}
