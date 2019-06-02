const router = require('po/router')

function saved(err, model){
	if (err) return alert(err)
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
		if (!data) return router.go('/dash/config/mailboxes')
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
			const f = this.form
			if (!f.reportValidity()) return

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

		},
		'click button#mailbox-reset': function(evt, target){
		}
	}
}
