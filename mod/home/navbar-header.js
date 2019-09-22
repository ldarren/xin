const router = require('po/router')

return {
	deps: {
		icon: ['text', 'fa-home'],
		config: 'models',
		tpl: 'file'
	},
	create(deps, params){
		setTimeout(() => {
			const { name } = deps.config.getSelected()
			this.el.innerHTML = deps.tpl(Object.assign(deps, {name}))
		}, 0)
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
