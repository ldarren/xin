const router = require('po/router')

return {
	deps: {
		tpl: 'file',
		auth: 'model',
		socialBtn: 'list',
		enableReset: 'bool',
		enableRegister: 'bool'
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
			const elements = form.elements

			switch(target.id){
			case 'btn-login':
				this.deps.auth.create({
					Username: elements.Username.value,
					Password: elements.Password.value,
					CCode: elements.CCode.value
				}, (err, model) => {
					if (err) return console.error(err)
					router.go('/')
				})
				break
			case 'btn-register':
				if (elements.password.value !== elements.repeat.value) return alert('password not match')
				__.ajax('POST', 'https://st-api.metroresidences.com/api/2.0/signup', {
					email: elements.email.value,
					username: elements.username.value,
					password: elements.password.value
				}, {
					headers: { 'Content-Type': 'application/json' }
				}, (err, state, res) => {
					if (4 !== state) return
					if (err) return console.error(err)

					try { var user = JSON.parse(res) }
					catch (exp) { return console.error(exp) }
					this.deps.auth.create({
						id: user.id,
						username: elements.username.value,
						password: elements.password.value
					}, (err, model) => {
						if (err) return console.error(err)
						router.go('/')
					})
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
