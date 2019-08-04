const router = require('po/router')

function saved(err, model){
	const btn = document.querySelector('button#mailbox-submit').classList
	btn.remove('disabled')

	if (err) return alert(JSON.stringify(err))
	alert('saved')
	router.go('/dash/config/mailboxes')
}

return {
	deps: {
		config: 'models',
	},
	create(deps, params){
		this.form = this.el.querySelector('form')
		const data = deps.config.get(params.name)
		if (!data) return
		this.configId = data.id
		if (data.name){
			const f = this.form
			const env = data.env
			f['name'].value = env.name,
			f['region'].value = env.region,
			f['Bucket'].value = env.Bucket,
			f['IdentityPoolId'].value = env.IdentityPoolId,
			f['UserPoolId'].value = env.UserPoolId,
			f['ClientId'].value = env.ClientId
		}
	},
	events: {
		'click button#mailbox-submit': function(evt, target){
			const btn = target.classList
			if (btn.contains('disabled')) return

			const f = this.form
			if (!f.reportValidity()) return

			btn.add('disabled')

			const data = {
				id: this.configId,
				name: f['name'].value,
				region: f['region'].value,
				Bucket: f['Bucket'].value,
				IdentityPoolId: f['IdentityPoolId'].value,
				UserPoolId: f['UserPoolId'].value,
				ClientId: f['ClientId'].value
			}

			if (data.id){
				this.deps.config.replace(data, saved)
			}else{
				this.deps.config.create(data, saved)
			}
		}
	}
}
