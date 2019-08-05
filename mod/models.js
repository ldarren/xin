const shared = inherit('shared')

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
			try {
				var obj = JSON.parse(res)
			} catch(ex) {
				return cb(ex)
			}
			cb(null, obj.Contents ? obj.Contents : obj)
		})
	})
}

function encodeCacheKey(id){
	if (!this.name) return
	const com = this.ums.config.selected()
	const uid = this.ums.getId()
	if (!uid) return
	return this.name + ':' + com + ':' + uid + (id ? ':' + id : '')
}

function decodeCacheKey(key){
	var arr = key.split(':')
	if (arr[0] !== this.name) return
	if (arr[1] !== this.ums.config.selected()) return
	if (arr[2] !== this.ums.getId()) return
	return arr
}

return {
	init(name, opt, ums, restParams){
		this.ums = ums
		shared.prototype.init.call(this, name, opt, restParams)
	},
	ajax,
	encodeCacheKey,
	decodeCacheKey,
}
