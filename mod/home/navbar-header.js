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
	}
}
