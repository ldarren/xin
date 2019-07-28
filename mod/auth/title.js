const router = require('po/router')

return {
	deps: {
		tpl: 'file',
		appIcon: ['text', 'fa-cogs'],
		appName: ['list', ['App', 'Name']],
		companyName: ['text', 'Company Name']
	},
	create(deps, params){
		this.el.innerHTML = deps.tpl(deps)
	},
	events: {
		'click a': function(e, target){
			const href = $(target).attr('href')
			switch(href){
			case '#':
				e.preventDefault()
				router.go(href.replace('#','/'))
				break
			}
		}
	}
}
