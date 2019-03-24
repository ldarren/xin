return {
	render(){
		Holder.run({
			images:this.el.querySelectorAll('.carousel-inner img')
		})
		return this.el
	}
}
