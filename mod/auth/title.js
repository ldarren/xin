return {
	deps: {
		tpl: 'file',
		appIcon: ['text', 'fa-cogs'],
		appName: ['text', 'Ace'],
		appVer: ['text', '1.0'],
		companyName: ['text', 'Company Name']
	},
	create(deps, params){
		this.el.innerHTML = deps.tpl(deps)
	}
}
