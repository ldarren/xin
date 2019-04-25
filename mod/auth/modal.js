const router = require('po/router')

return {
	deps: {
		tpl: 'file',
		ums: 'cognito',
		config: 'models',
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
			this.el.querySelector(targetData).classList.add('visible')//show target
		},
		'click button': function(evt, target){
			const form = target.closest('form')
			if (!form.reportValidity()) return
			const els = form.elements
			const deps = this.deps
			const ums = deps.ums

			deps.config.read(els.company.name, (err, company) => {
				if (err) return alert(`company name [${els.company.name}] not found`)
				ums.env(company.env)

				switch(target.id){
				case 'btn-login':
					ums.signin(els.username.value, els.password.value, err => {
						if (err) return alert(JSON.stringify(err, null, '\t'))
						router.go('/dash')
					})
					break
				case 'btn-register':
				{
					const password = els.password.value
					if (password !== els.repeat.value) return alert('password not match')

					ums.signup(els.username.value, password, els.email.value, els.phone.value, err => {
						if (err) return alert(JSON.stringify(err, null, '\t'))
						alert('Please confirm your account before login', 'Signup Successfully')
					})
					break
				}
				case 'btn-forget':
					break
				default:
					return console.error('unexpected auth form button pressed')
				}
			}, true)
		}
	}
}
