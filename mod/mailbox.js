function renderMail(items, idx) {
	if (items.length() <= idx) return ''
	const item = items.at(idx++)
	let mail = `
	<div class="message-item ${item.read ? '' : 'message-unread'}">
		<label class=inline><input type=checkbox class=ace /><span class=lbl></span></label>

		<i class="message-star ace-icon fa ${item.star ? 'fa-star orange2' : 'fa-star-o light-grey'}"></i>
		<span class=sender title="${item.sender}">${item.sender} </span>
		<span class=time>${item.time}</span>
	`
	if (item.clip) {
		mail += '<span class=attachment><i class="ace-icon fa fa-paperclip"></i></span>'
	}
	mail += '<span class=summary>'
	if (item.status && item.status.length) {
		mail += '<span class=message-flags>'
		mail += item.status.reduce((acc, flag) => `<i class="ace-icon fa ${flag} light-grey"></i>`, '')
		mail += '</span>'
	}
	if (item.tag){
		mail += `<span class="badge ${item.tag} mail-tag"></span>`
	}
	mail += `<span class=text>${item.summary}</span></span></div>`
	return mail + renderMail(items, idx)
}

return {
	deps: {
		mails: 's3bucket',
		inbox: 'models',
		tpl: 'file',
		eml: 'file'
	},
	create(deps, params){
		const mail = emailjs.parse(deps.eml)
		deps.inbox.sort((r1, r2) => r1.id > r2.id)

		this.el.innerHTML = deps.tpl({inbox:deps.inbox, renderMail})

		deps.mails.list((err, list) => {
			const mail = list[10]
			deps.mails.read(mail.Key, (err, detail) => {
				console.log(err, detail)
				console.log(emailjs.parse(detail.Body))
			})
		})
	}
}
