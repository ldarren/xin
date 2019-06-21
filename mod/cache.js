function Cache(name, ums, def){
	this.name = name
	this.ums = ums
	this.def = def
	this.data = {}
}

Cache.prototype = {
	set(name, value){
		this.data[name] = value
	},
	get(name){
		return this.data[name] || this.def[name]
	}
}

return Cache
