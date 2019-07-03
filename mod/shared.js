const Collection = inherit('po/Collection')

function ajax(method, route, params, cb){
	if (!route) return cb(null, params)

	const headers = {
		'Content-Type': 'application/json'
	}

	pico.ajax(method, route, params, {headers}, function(err, state, res){
		if (4 !== state) return
		if (err) return cb(err)
		try {
			var obj = JSON.parse(res)
		} catch(ex) {
			return cb(ex)
		}
		cb(null, obj.Contents ? obj.Contents : obj)
	})
}

return {
	init(name, opt, restParams){
		opt = Object.assign({}, opt, {restParams})
		Collection.prototype.init.call(this, name, opt)
	},
	setSelected(key){
		if (!this.name || !this.get(key)) return

		return window.localStorage.setItem('sel:config', key)
	},
	getSelected(){
		const key = window.localStorage.getItem('sel:config')
		return this.get(key)
	},
	ajax,
}
