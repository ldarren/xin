return {
	remove(){
		this._el.classList.remove('login-layout')
		this.super.remove.call(this)
	},
	render(){
		this.setElement(this.el.querySelector('div.login-container'))
		return this.el
	}
}
