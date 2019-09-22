function countUnread(inbox){
	let count = 0
	inbox.forEach(m => {
		count += m.read ? 0 : 1
	})
	return count
}

function update(evt){
	if ('clear' === evt) return
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

function refresh(ctx, cb){
	const deps = ctx.deps
	const inbox = deps.inbox
	const len = inbox.length()
	deps.bucket.list(inbox, deps.mails, err => {
		if (err) return alert(err)
		inbox.callback.off('*', update, ctx)
		if (len !== inbox.length()){
			update.call(ctx)
		}
		inbox.callback.on('*', update, ctx)
		if (cb) cb()
	})
}

return {
	signals: ['mailboxRefresh'],
	deps: {
		tpl: 'file',
		mails: 'models',
		inbox: 'models',
		setting: 'models',
		bucket: 's3bucket',
		'email/mailbox': 'view',
	},
	create(deps, params){
		update.call(this)
		refresh(this)
	},
	remove(){
		this.deps.inbox.callback.off('*', update, this)
		this.super.remove.call(this)
	},
	events: {
		'click ul#inbox-tabs a': function(evt, target){
			switch(target.href.split('#')[1]){
			case 'write':
			case 'sent':
			case 'draft':
			case '':
				evt.preventDefault()
				alert('Coming soon')
				break
			case 'refresh':
				{
					const btn = target.querySelector('span.btn').classList
					if (btn.contains('disabled')) break
					btn.add('disabled')
					refresh(this, () => {
						setTimeout(() => {
							btn.remove('disabled')
						}, 15000)
					})
				}
				break
			}
		},
		'click a.orderby': function(evt, target){
			evt.preventDefault()
			const sort = target.href.split('#')[1]
			const config = this.deps.setting.get('mailbox')
			if (config.sort === sort) return
			config.sort = sort
			update.call(this)
			//this.signal.mailboxRefresh().send([this.host])
		},
		'click ul.pagination li': function(evt, target){
			evt.preventDefault()
			if (target.classList.contains('disabled')) return
			const config = this.deps.setting.get('mailbox')
			let index = parseInt(config.index)
			const a = target.querySelector('a')
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
			//this.signal.mailboxRefresh().send([this.host])
		},
		'input .nav-search-input': function(evt, target){
			const config = this.deps.setting.get('mailbox')
			config.search = target.value.toLowerCase()
			this.signal.mailboxRefresh(target.value.toLowerCase()).send([this.host])
		},
		'click .select-message': function(evt, target){
			const config = this.deps.setting.get('mailbox')
			config.select = target.id.slice('id-select-message-'.length)
			this.signal.mailboxRefresh().send([this.host])
		},
		'change #id-toggle-all': function(evt, target){
			const config = this.deps.setting.get('mailbox')
			config.select = target.checked ? 'all' : 'none'
			this.signal.mailboxRefresh().send([this.host])
		}
	}
}
