function scroll(evt_, target){
	var scroll = ace.helper.scrollTop();
	var h = ace.helper.winHeight();
	var body_sH = document.body.scrollHeight;
	if(scroll > parseInt(h / 4) || (scroll > 0 && body_sH >= h && h + scroll >= body_sH - 1)) {//|| for smaller pages, when reached end of page
		if(!this._is_visible) {
			target.classList.add('display');
			this._is_visible = true;
		}
	} else {
		if(this._is_visible) {
			target.classList.remove('display');
			this._is_visible = false;
		}
	}
}

return {
	create(deps, params){
		this.super.create.call(this, deps, params)
		this._is_visible = false
		$(window).on('scroll.scroll_btn', () => {
			scroll.call(this, null, this.el)
		})
		scroll.call(this, null, this.el)
	},
	remove(){
		$(window).off('scroll.scroll_btn')
	},
	events: {
		[ace.click_event]: function(evt, target){
			var duration = Math.min(500, Math.max(100, parseInt(ace.helper.scrollTop() / 3)));
			$('html,body').animate({scrollTop: 0}, duration);
			return false;
		}
	}
}
