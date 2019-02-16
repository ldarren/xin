return {
	create(deps, params){
		this.setElement(this.el.querySelector('.main-content-inner'))
		this.super.create.call(this, deps, params)
	}
}
