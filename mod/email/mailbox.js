const router = require('po/router')

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
	mail += `<span class=text id="${item.id}">${item.summary}</span></span></div>`
	return mail + renderMail(items, idx)
}

function readMails(bucket, mails, inbox, cb){
	if (!mails || !mails.length) return cb()

	const mail = mails.shift()
	console.log('reading', mail.Key, mail.Size)
	bucket.read(mail.Key, (err, detail) => {
		if (err) return cb(err)
		try{
			const { headers, childNodes } = emailjs.parse(detail.Body)
			inbox.create({
				id: headers['message-id'][0].value,
				sender: headers.from[0].value[0].name,
				time: headers.date[0].value,
				summary: headers.subject[0].value,
				headers,
				childNodes
			})
		}catch(exp){
			console.error(exp)
		}
		return readMails(bucket, mails, inbox, cb)
	})
}

return {
	deps: {
		bucket: 's3bucket',
		inbox: 'models',
		tpl: 'file'
	},
	create(deps, params){
		deps.bucket.list((err, mails) => {
			if (err) return alert(err)
			readMails(deps.bucket, mails, deps.inbox, err => {
				if (err) return alert(err)
				deps.inbox.sort((r1, r2) => r1.id > r2.id)

				this.el.innerHTML = deps.tpl({inbox:deps.inbox, renderMail})
			})
		})
	},
	events: {
		'click .message-list .text': function(evt, target){
			router.go('/mail/'+target.id)
		}
	}
}
