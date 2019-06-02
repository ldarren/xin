const router = require('po/router')

return {
	deps: {
		config: 'models',
	},
	render(){
		this.table = $('#dynamic-table').DataTable({
			columns: [
				{ title: 'name', data: 'name' },
				{ title: 'region', data: 'region' },
				{ title: 'Bucket', data: 'Bucket' },
				{ title: 'IdentityPoolId', data: 'IdentityPoolId' },
				{ title: 'UserPoolId', data: 'UserPoolId' },
				{ title: 'ClientId', data: 'ClientId' },
				{
					title: 'Actions',
					data: null,
					className: 'center',
					defaultContent: '<a href="" class="editor_edit">Edit</a> / <a href="" class="editor_remove">Delete</a>',
				}
			]
		})
		const config = this.deps.config
		config.list(1, 10, (err, models) => {
			if (err) alert(JSON.stringify(err))

			config.forEach(model => {
				this.table.row.add(model.env).draw()
			})
		})
		return this.el
	},
	events: {
		'click a.editor_edit': function(evt, target){
			evt.preventDefault()
			const tr = target.closest('tr')
			const name = tr.getElementsByTagName('td')[0].innerHTML
			router.go('/dash/config/mailbox/' + name)
		},
		'click a.editor_remove': function(evt, target){
			evt.preventDefault()
			const tr = target.closest('tr')
			const name = tr.getElementsByTagName('td')[0].innerHTML
			if (!name) return
			__.dialogs.confirm(`Are you sure you wish to remove [${name}] record?`, 'Remove Mailbox Config', 'ok,cancel', btn => {
				if (2 === btn) return
				this.deps.config.remove(name, (err, model) => {
					if (err) return alert(JSON.stringify(err))
					this.table.row(tr).remove().draw()
				})
			})
		}
	}
}
