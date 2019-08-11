const router = require('po/router')

function error(btn, msg){
	btn.remove('disabled')
	alert(msg)
}

function hideEmail(ctx, company){
	const label = document.querySelector('label#signupEmail')
	const email = label.querySelector('input[name=email]')
	if (ctx.deps.ums.company0.toLowerCase() === (company || '').toLowerCase()){
		if (!ctx.emailHidden) return
		label.classList.add('block')
		label.classList.remove('hidden')
		email.required = true
		ctx.emailHidden = false
	}else{
		if (ctx.emailHidden) return
		label.classList.add('hidden')
		label.classList.remove('block')
		email.required = false
		ctx.emailHidden = true
	}
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
		const group = deps.config.getSelected() || {name: 'kloudkonsole'}
		this.el.innerHTML = deps.tpl(Object.assign({company: group.name}, deps))
		this.emailHidden = false
	},
	render(){
		hideEmail(this, this.deps.config.getSelected().name)
		return this.el
	},
	events: {
		'click .toolbar a[data-target]': function(evt, target){
			evt.preventDefault()
			var targetData = target.dataset.target
			var visible = document.querySelectorAll('.widget-box.visible')
			visible.forEach(v => v.classList.remove('visible'))
			this.el.querySelector(targetData).classList.add('visible')//show target
		},
		'input input#companyInput': function(evt, target){
			hideEmail(this, target.value)
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
				{
					if (password !== els.repeat.value) return error(btn, 'password not match')
					const email = els.email.value

					ums.signup(company, username, password, this.hiddenEmail ? null : email, (err, result) => {
						if (err) return error(btn, JSON.stringify(err, null, '\t'))
						if (result.userUnconfirmed){
							router.go('/dash')
						}else{
							if (this.emailHidden){
								error(btn, 'Almost done...\nPlease contact your account administrator and request for the account confirmation.', 'Success')
							}else{
								error(btn, `Almost done...\nWe are sending an email verification link to ${email}. Please click on it to activate your account.`, 'Success')
							}
						}
					})
					break
				}
				case 'btn-forget':
					break
				default:
					return error(btn, 'unexpected auth form button pressed')
				}
			}, true)
		}
	}
}
