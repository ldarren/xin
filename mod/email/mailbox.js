const router = require('po/router')
const LOCALE = 'en-US'
const TIME_OPTIONS = { hour12: true, hour: '2-digit', minute: '2-digit' }
const DATE_OPTIONS = { day: 'numeric', month: 'short' }

function mailTime(time, now){
	if (time.getFullYear() !== now.getFullYear())
		return time.toLocaleDateString()
	if (time.getMonth() === now.getMonth() && time.getDate() === now.getDate())
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
function renderMail(item, select, now = new Date) {
	let selected = false
	switch(select){
	case 'all': selected = true; break
	case 'read': selected = !!item.read; break
	case 'unread': selected = !item.read; break
	}
	let mail = `
	<div class="message-item ${item.read ? '' : 'message-unread'}">
		<label class=inline><input type=checkbox class=ace ${selected ? 'checked' : ''}><span class=lbl></span></label>

		<i class="message-star ace-icon fa ${item.star ? 'fa-star orange2' : 'fa-star-o light-grey'}"></i>
		<span class=sender title="${item.sender}">${item.sender} </span>
		<span class=time>${mailTime(new Date(item.time), now)}</span>
	`
	if (item.attachments) {
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
		return (a, b) => ((a.subject > b.subject) ? 1 : (a.subject < b.subject) ? -1 : 0)
	case 'from':
		return (a, b) => ((a.sender > b.sender) ? 1 : (a.sender < b.sender) ? -1 : 0)
	default:
		return (a, b) => ((a.time < b.time) ? 1 : (a.time > b.time) ? -1 : 0)
	}
}

function countUnread(inbox){
	let count = 0
	inbox.forEach(m => {
		count += m.read ? 0 : 1
	})
	return count
}

function refresh(ctx){
	const {
		tpl,
		inbox,
		setting,
	} = ctx.deps
	const config = setting.get('mailbox')
	const search = config.search
	const select = config.select

	let all = []
	if (search){
		all = inbox.filter(m => {
			return -1 !== m.sender.toLowerCase().indexOf(search) || -1 !== m.subject.toLowerCase().indexOf(search)
		})
	} else {
		inbox.forEach(m => {
			all.push(m)
		})
	}

	const pageSort = config.sort
	all.sort(sortCB(pageSort))

	let items = []
	const pageSize = parseInt(config.size)
	const pageIndex = parseInt(config.index)
	for(let i = pageSize * (pageIndex - 1), l = Math.min(pageSize * pageIndex, all.length); i < l; i++){
		items.push(all[i])
	}

	ctx.el.innerHTML = tpl({
		inbox,
		items,
		renderMail,
		pageIndex,
		pageMax: Math.ceil(inbox.length() / pageSize),
		pageSize,
		pageSort,
		unread: countUnread(inbox),
		search,
		select
	})
}

return {
	deps: {
		tpl: 'file',
		inbox: 'models',
		setting: 'models',
	},
	create(deps, params){
		refresh(this)
		this.super.create.call(this, deps, params)
	},
	events: {
		'click .text': function(evt, target){
			router.go('/dash/mail/view/'+target.id)
		},
	},
	slots: {
		mailboxRefresh(sender, from){
			refresh(this)
		}
	}
}
