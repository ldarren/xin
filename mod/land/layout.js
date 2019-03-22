return {
	remove(){
		this._el.classList.remove('no-skin pos-rel')
		this.super.remove.call(this)
	},
	render(){
		this.setElement(this.el.querySelector('div.login-container'))
		return this.el
	}
}
