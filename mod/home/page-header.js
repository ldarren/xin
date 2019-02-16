const specMgr = require('p/specMgr')

return {
	deps: {
		tpl: 'file'
	},
	slots: {
		changeContent(from, sender, route, spec, params){
			this.el.innerHTML = this.deps.tpl({
				title: specMgr.find('title', specMgr.getValue(spec)),
				desc: specMgr.find('desc', specMgr.getValue(spec))
			})
		}
	}
}
