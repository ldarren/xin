const router = require('po/router')

/*
 * variables
 * sender: name of sender
 * time: mail created at, has a few display levels: show time(today), yesterday, day month, year
 * subject: mail subject
 * star: true or false
 * read: true or false
 * clip: true or false, attachment paperclip
 * status: array: fa-reply, fa-mail-forward
 * tag: colour: badge-pink, badge-grey, badge-success
 */
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
	mail += `<span class=text id="${item.id}">${item.subject}</span></span></div>`
	return mail + renderMail(items, idx)
}

return {
	deps: {
		bucket: 's3bucket',
		inbox: 'models',
		tpl: 'file'
	},
	create(deps, params){
		deps.bucket.list(deps.inbox, err => {
			if (err) return alert(err)
			deps.inbox.sort((r1, r2) => r1.id > r2.id)

			this.el.innerHTML = deps.tpl({inbox:deps.inbox, renderMail})
		})
	},
	events: {
		'click .message-list .text': function(evt, target){
			router.go('/dash/mail/view/'+target.id)
		}
	}
}
