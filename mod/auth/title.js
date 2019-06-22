return {
	deps: {
		tpl: 'file',
		appIcon: ['text', 'fa-cogs'],
		appName: ['list', ['App', 'Name']],
		companyName: ['text', 'Company Name']
	},
	create(deps, params){
		this.el.innerHTML = deps.tpl(deps)
	}
}
