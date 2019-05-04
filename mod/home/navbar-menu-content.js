return {
	deps: {
		ums: 'cognito',
		greet: ['text', ''],
		photo: 'text',
		icon_right: 'text',
		icon_left: 'text',
		tpl: 'file'
	},
	create(deps, params){
		deps.ums.getProfile((err, attr) => {
			if (err) return console.error(err)
			const d = {
				text: attr.name || attr.preferred_username || attr.username,
				greet: deps.greet,
				photo: attr.picture || deps.photo,
				icon_right: deps.icon_right,
				icon_left: deps.icon_left
			}
			this.el.innerHTML = deps.tpl(d)
			this.super.create.call(this, deps, params)
		})
	},
	events: {
		'click a': function(evt, target){
			evt.preventDefault()
		}
	}
}
