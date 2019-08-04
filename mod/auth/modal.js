const router = require('po/router')

function error(btn, msg){
	btn.removed('disabled')
	alert(msg)
}

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
		const group = deps.config.getSelected() || {name: 'xin.com'}
		this.el.innerHTML = deps.tpl(Object.assign({company: group.name}, deps))
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
			const btn = target.classList
			if (btn.contains('disabled')) return

			const form = target.closest('form')
			if (!form.reportValidity()) return

			btn.add('disabled')

			const els = form.elements
			const company = els.company.value
			const deps = this.deps
			const ums = deps.ums

			deps.config.read(company, (err, group) => {
				if (err) return error(btn, `company name [${company}] not found`)
				ums.setGroup(group)
				deps.config.setSelected(group.name)
				const username = els.username.value
				const password = els.password.value

				switch(target.id){
				case 'btn-login':
					ums.signin(company, username, password, err => {
						if (err) return error(btn, JSON.stringify(err, null, '\t'))
						router.go('/dash')
					})
					break
				case 'btn-register':
					if (password !== els.repeat.value) return error(btn, 'password not match')

					ums.signup(company, username, password, els.email.value, els.phone.value, (err, result) => {
						if (err) return error(btn, JSON.stringify(err, null, '\t'))
						if (result.userUnconfirmed){
							router.go('/dash')
						}else{
							error(btn, 'Please confirm your account before login', 'Signup Successfully')
						}
					})
					break
				case 'btn-forget':
					break
				default:
					return error(btn, 'unexpected auth form button pressed')
				}
			}, true)
		}
	}
}
