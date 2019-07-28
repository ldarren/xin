const router = require('po/router')

return {
	deps: {
		name: ['text', 'Home'],
		icon: ['text', 'fa-home'],
		tpl: 'file'
	},
	create(deps, params){
		setTimeout(() => {
			this.el.innerHTML = deps.tpl(deps)
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
