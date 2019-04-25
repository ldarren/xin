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

function Cognito(env){
	this.env(env.aws)
}

Cognito.prototype = {
	env(aws){
		this.readyListeners = void 0
		if (!aws) return
		this.awsConfig = aws

		this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
			UserPoolId: aws.UserPoolId,
			ClientId: aws.ClientId
		})

		const user = this.userPool.getCurrentUser()

		if (!user) return
		this.readyListeners = []

		user.getSession((err, session) => {
			if (err) return console.error(err)
			if (!session.isValid()) return

			setConfig(aws, session.getIdToken().getJwtToken(), err => {
				this.readyListeners.forEach(cb => cb(err))
				this.readyListeners = void 0
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
