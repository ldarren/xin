const router = require('po/router')

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

		const env = deps.env;

		const identity = {
			IdentityPoolId: env.aws-region;
		};

		AWS.config.region = aws1.region; // Region
		AWS.config.credentials = new AWS.CognitoIdentityCredentials(identity);

		AWSCognito.config.region = aws1.region;
		AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials(identity);

		const poolData = {
			UserPoolId : env.aws-user-pool-id,
			ClientId : env.aws-client-id
		};
		const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
			UserPoolId: env.aws-user-pool-id,
			ClientId: env.client_id
		});

		const attributeList = [];

		const dataEmail = {
			Name : 'email',
			Value : 'email@yopmail.com'
		};
		const dataPhoneNumber = {
			Name : 'phone_number',
			Value : '+15555555555'
		};
		const attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
		const attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

		attributeList.push(attributeEmail);
		attributeList.push(attributePhoneNumber);

		userPool.signUp('test2', 'P@55w0rD', attributeList, null, function(err, result){
			if (err) return alert(err);
			cognitoUser = result.user;
			console.log('user name:', cognitoUser.getUsername());
		});
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
