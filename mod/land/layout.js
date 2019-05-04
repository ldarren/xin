return {
	remove(){
		this.el.classList.remove('no-skin', 'pos-rel')
		const ds = this.el.dataset
		delete ds.spy
		delete ds.target
		this.super.remove.call(this)
	}
}
