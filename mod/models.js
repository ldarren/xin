const Collection = inherit('po/Collection')

function getAccessToken(ctx, cb){
	if (!ctx.ums) return cb()
	ctx.ums.getAccessToken(cb)
}

function ajax(method, route, params, cb){
	if (!route) return cb(null, params)

	let headers = {
		'Content-Type': 'application/json'
	}

	getAccessToken(this, (err, token) => {
		if (err) return cb(err)
		headers = Object.assign(headers, {
			Authorization: 'Bearer ' + token
		})

		pico.ajax(method, route, params, {headers}, function(err, state, res){
			if (4 !== state) return
			if (err) return cb(err)
			try{
				var obj = JSON.parse(res)
			} catch(ex){
				return cb(ex)
			}
			cb(null, obj.Contents ? obj.Contents : obj)
		})
	})
}

function encodeCacheKey(id){
	return this.name + ':' + this.ums.getId() + ':' + id
}

function decodeCacheKey(key){
	var arr = key.split(':')
	if (arr[0] !== this.name) return
	if (arr[1] !== this.user.getId()) return
	return arr
}

return {
	init(name, opt, ums, restParams){
		this.ums = ums
		opt = Object.assign({}, opt, {restParams})
		Collection.prototype.init.call(this, name, opt)
	},
	setSelected(key){
		if (!this.name || !this.get(key)) return

		return window.localStorage.setItem(encodeCacheKey('sel'), key)
	},
	getSelected(){
		const key = window.localStorage.getItem(encodeCacheKey('sel'))
		return this.get(key)
	},
	ajax,
	encodeCacheKey,
	decodeCacheKey,
}
