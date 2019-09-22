return {
	create(deps, params){
		this.setElement(this.el.querySelector('.col-ex-12'))
		this.super.create.call(this, deps, params)
	},
	render(){
		this.signal.moduleAdded().send(this.host)
		return this.el
	},
	slots: {
		'changeContent': function(from, sender, route, spec, params){
			this.clear()
			this.spawnBySpec([spec], params)
		}
	}
}
