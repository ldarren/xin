return {
	deps: {
		configMailbox: 'models',
	},
	create(deps, params){
		this.form = this.el.querySelector('form')
	},
	events: {
		'click button#mailbox-submit': function(evt, target){
			const f = this.form
			if (!f.reportValidity()) return

			const data = {
				name: f['name'].value,
				region: f['region'].value,
				Bucket: f['Bucket'].value,
				IdentityPoolId: f['IdentityPoolId'].value,
				UserPoolId: f['UserPoolId'].value,
				ClientId: f['ClientId'].value
			}

			this.deps.configMailbox.create(data, (err, model) => {
				console.log(err, model)
			})

		},
		'click button#mailbox-reset': function(evt, target){
		}
	}
}
