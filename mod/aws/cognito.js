function setConfig(aws, token, cb){
	AWS.config.region = aws.region
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: aws.IdentityPoolId,
		Logins: {
			[`cognito-idp.${aws.region}.amazonaws.com/${aws.UserPoolId}`]: token
		}
	})

	AWS.config.credentials.get(cb)
}

function readied(ctx, err){
	if (err) console.error(err)
	ctx.readyListeners.forEach(cb => cb(err))
	ctx.readyListeners = void 0
}

function Cognito(config){
	if (!config) return
	let aws
	const key = window.localStorage.getItem('selected:config')
	const selected = config.get(key)
	if (!selected) return
	this.env(selected.env)
}

Cognito.prototype = {
	env(aws){
		if (!aws) return

		this.readyListeners = []
		this.awsConfig = aws

		this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
			UserPoolId: aws.UserPoolId,
			ClientId: aws.ClientId
		})

		const user = this.userPool.getCurrentUser()

		if (!user) return readied(this)

		user.getSession((err, session) => {
			if (err) return readied(this, err)
			if (!session.isValid()) return readied(this)

			setConfig(aws, session.getIdToken().getJwtToken(), err => {
				readied(this, err)
			})
		})
	},
	ready(cb){
		if (this.readyListeners) return this.readyListeners.push(cb)
		cb()
	},

	signin(Username, Password, cb){
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
				setConfig(this.awsConfig, result.idToken.jwtToken, cb)
			},

			onFailure: cb
		})
	},

	signup(Company, Username, Password, email, phone, cb){
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
			cb(null, result.user)
		})
	},

	signout(){
		AWS.config.credentials = void 0
		const user = this.userPool.getCurrentUser()
		if (!user) return
		user.signOut()
	},

	isValid(){
		return !!AWS.config.credentials
	}
}

return Cognito
