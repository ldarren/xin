const router = require('po/router')
const LOCALE = 'en-US'
const TIME_OPTIONS = { hour12: true, hour: '2-digit', minute: '2-digit' }
const DATE_OPTIONS = { day: 'numeric', month: 'short' }

function mailTime(time, now){
	if (time.getFullYear() !== now.getFullYear())
		return time.toLocaleDateString()
	if (time.getMonth() === now.getMonth() && time.getDay() === now.getDay())
		return time.toLocaleTimeString(LOCALE, TIME_OPTIONS)
	return time.toLocaleDateString(LOCALE, DATE_OPTIONS)
}

/*
 * variables
 * sender: name of sender
 * time: mail created at, has a few display levels: show time(today), yesterday, day month, year
 * subject: mail subject
 * star: true or false
 * read: true or false
 * attachments: array of attachment, for paperclip icon
 * status: array: fa-reply, fa-mail-forward
 * tag: colour: badge-pink, badge-grey, badge-success
 */
function renderMail(item, now = new Date) {
	let mail = `
	<div class="message-item ${item.read ? '' : 'message-unread'}">
		<label class=inline><input type=checkbox class=ace /><span class=lbl></span></label>

		<i class="message-star ace-icon fa ${item.star ? 'fa-star orange2' : 'fa-star-o light-grey'}"></i>
		<span class=sender title="${item.sender}">${item.sender} </span>
		<span class=time>${mailTime(new Date(item.time), now)}</span>
	`
	if (item.attachments.length) {
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
	return mail
}

function sortCB(orderby){
	switch(orderby){
	case 'subject':
		return (a, b) => ((a.subject < b.subject) ? 1 : (a.subject > b.subject) ? -1 : 0)
	case 'from':
		return (a, b) => ((a.sender < b.sender) ? 1 : (a.sender > b.sender) ? -1 : 0)
	default:
		return (a, b) => ((a.time < b.time) ? 1 : (a.time > b.time) ? -1 : 0)
	}
}

function countUnread(inbox){
	let count = 0
	inbox.forEach(m => {
		count += m.unread ? 1 : 0
	})
	return count
}

function refresh(ctx){
	const {
		config,
		tpl,
		inbox
	} = ctx.deps
	const pageSort = config.get('sort')
	const pageSize = config.get('size')
	inbox.sort(sortCB(pageSort))

	ctx.el.innerHTML = tpl({
		inbox,
		renderMail,
		pageIndex: config.get('index'),
		pageMax: Math.ceil(inbox.length() / pageSize),
		pageSize,
		pageSort,
		unread: countUnread(inbox),
	})
}

return {
	deps: {
		bucket: 's3bucket',
		inbox: 'models',
		config: 'cache',
		tpl: 'file',
	},
	create(deps, params){
		deps.bucket.list(deps.inbox, err => {
			if (err) return alert(err)
			refresh(this)
		})
	},
	events: {
		'click .message-list .text': function(evt, target){
			router.go('/dash/mail/view/'+target.id)
		},
		'click a.orderby': function(evt, target){
			evt.preventDefault()
			const type = target.href.split('#')[1]
			const config = this.deps.config
			if (config.get('sort') === type) return
			config.set('sort', type)
			refresh(this)
		},
		'click ul.pagination li a': function(evt, target){
			evt.preventDefault()
			if (target.classList.contains('disabled')) return
			const config = this.deps.config
			let index = config.get('index')
			switch(target.href.split('#')[1]){
			case 'first':
				index = 1
				break
			case 'prev':
				index -= 1
				break
			case 'next':
				index += 1
				break
			case 'last':
				index = Math.ceil(this.deps.inbox.length() / this.deps.config.get('size'))
				break
			default:
				return
			}
			config.set('index', index)
			refresh(this)
		}
	}
}
