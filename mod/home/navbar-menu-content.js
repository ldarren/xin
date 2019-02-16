return {
	deps: {
		greet: ['text', ''],
		text: 'text',
		photo: 'text',
		icon_right: "text",
		icon_left: "text",
		tpl: 'file'
	},
	create(deps, params){
		this.el.innerHTML = deps.tpl(deps)
		this.super.create.call(this, deps, params)
	},
	events: {
		'click a': function(evt, target){
			evt.preventDefault()
		}
	}
}
