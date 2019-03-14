const router = require('po/router')

return {
	deps: {
		tpl: 'file',
		ums: 'cognito',
		socialBtn: 'list',
		enableReset: 'bool',
		enableRegister: 'bool',
	},
	create(deps, params){
		this.super.create.call(this, deps, params)
		this.el.innerHTML = deps.tpl(deps)
	},
	events: {
		'click .toolbar a[data-target]': function(evt, target){
			evt.preventDefault()
			var targetData = target.dataset.target
			var visible = document.querySelectorAll('.widget-box.visible')
			visible.forEach(v => v.classList.remove('visible'))
			this.el.querySelector(targetData).classList.add('visible');//show target
		},
		'click button': function(evt, target){
			const form = target.closest('form')
			if (!form.reportValidity()) return
			const els = form.elements

			switch(target.id){
			case 'btn-login':
				this.deps.ums.signin(els.username.value, els.password.value, err => {
					if (err) return alert(JSON.stringify(err, null, '\t'))
					router.go('/')
				})
				break
			case 'btn-register':
				const Password = els.password.value
				if (Password !== els.repeat.value) return alert('password not match')

				this.deps.ums.signup(els.username.value, Password, els.email.value, els.phone.value, err => {
					if (err) return alert(JSON.stringify(err, null, '\t'))
					alert('Please confirm your account before login', 'Signup Successfully')
				})
				break
			case 'btn-forget':
				break
			default:
				return console.error('unexpected auth form button pressed')
			}
		}
	}
}
