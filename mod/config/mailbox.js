return {
	deps: {
		config_mailbox: 'models',
		tpl: 'file'
	},
	create(deps, params){
		this.el.innerHTML = deps.tpl({
		})
	}
}
