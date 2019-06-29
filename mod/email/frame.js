function countUnread(inbox){
	let count = 0
	inbox.forEach(m => {
		count += m.read ? 0 : 1
	})
	return count
}

function update(){
	const {
		tpl,
		inbox,
		setting,
	} = this.deps
	const config = setting.get('mailbox')
	const pageSize = parseInt(config.size)

	this.el.innerHTML = tpl({
		inbox,
		pageIndex: parseInt(config.index),
		pageMax: Math.ceil(inbox.length() / pageSize),
		pageSize,
		pageSort: config.sort,
		unread: countUnread(inbox),
		search: config.search,
	})
	this.spawn(this.deps['email/mailbox'])
}

return {
	signals: ['mailboxRefresh'],
	deps: {
		tpl: 'file',
		inbox: 'models',
		setting: 'models',
		'email/mailbox': 'view'
	},
	create(deps, params){
		update.call(this)
		deps.inbox.callback.on('*', update, this)
	},
	remove(){
		this.deps.inbox.callback.off('*')
		this.super.remove.call(this)
	},
	events: {
		'click a.orderby': function(evt, target){
			evt.preventDefault()
			const sort = target.href.split('#')[1]
			const config = this.deps.setting.get('mailbox')
			if (config.sort === sort) return
			config.sort = sort
			this.signals.mailboxRefresh().send([this.host])
		},
		'click ul.pagination li': function(evt, target){
			evt.preventDefault()
			if (target.classList.contains('disabled')) return
			const a = target.querySelector('a')
			const config = this.deps.setting.get('mailbox')
			let index = parseInt(config.index)
			switch(a.href.split('#')[1]){
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
				index = Math.ceil(this.deps.inbox.length() / config.size)
				break
			default:
				return
			}
			config.index = index
			update.call(this)
			this.signals.mailboxRefresh().send([this.host])
		},
		'input .nav-search-input': function(evt, target){
			const config = this.deps.setting.get('mailbox')
			config.search = target.value.toLowerCase()
			this.signals.mailboxRefresh(target.value.toLowerCase()).send([this.host])
		},
		'click .select-message': function(evt, target){
			const config = this.deps.setting.get('mailbox')
			config.select = target.id.slice('id-select-message-'.length)
			this.signals.mailboxRefresh().send([this.host])
		},
		'change #id-toggle-all': function(evt, target){
			const config = this.deps.setting.get('mailbox')
			config.select = target.checked ? 'all' : 'none'
			this.signals.mailboxRefresh().send([this.host])
		}
	}
}
