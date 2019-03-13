const router = require('po/router')

function signin(Username, Password, cb){
	const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
		Username,
		Password
	})
	const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
		Username,
		Pool: this.userPool
	})
	cognitoUser.authenticateUser(authDetails, {
		onSuccess: result => {
			const idToken = result.idToken.jwtToken
			const ac = this.deps.env.aws

			AWS.config.region = ac.region
			AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				IdentityPoolId: ac.IdentityPoolId,
				Logins: {
					[`cognito-idp.${ac.region}.amazonaws.com/${ac.UserPoolId}`]: idToken
				}
			})

			AWS.config.credentials.get(cb)
		},

		onFailure: cb
	})
}

function signup(Username, Password, email, phone, cb){
	const attributes = [
		new AmazonCognitoIdentity.CognitoUserAttribute({
			Name : 'email',
			Value : email,
		}),
		new AmazonCognitoIdentity.CognitoUserAttribute({
			Name : 'phone_number',
			Value : phone
		})
	]

	this.userPool.signUp(Username, Password, attributes, null, (err, result) => {
		if (err) return cb(err)
		const cognitoUser = result.user
		console.log('user name:', cognitoUser)
		signin.call(this, Username, Password, cb)
	})
}

return {
	deps: {
		tpl: 'file',
		auth: 'model',
		env: 'map',
		socialBtn: 'list',
		enableReset: 'bool',
		enableRegister: 'bool',
	},
	create(deps, params){
		this.super.create.call(this, deps, params)
		this.el.innerHTML = deps.tpl(deps)

		const ac = deps.env.aws

		this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
			UserPoolId: ac.UserPoolId,
			ClientId: ac.ClientId
		})
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
				signin.call(this, els.username.value, els.password.value, err => {
					if (err) return alert(JSON.stringify(err, null, '\t'))
					router.go('/')
				})
				break
			case 'btn-register':
				const Password = els.password.value
				if (Password !== els.repeat.value) return alert('password not match')

				signup.call(this, els.username.value, Password, els.email.value, els.phone.value, err => {
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
