function Cognito(env){
	const ac = this.awsConfig = env.aws

	this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
		UserPoolId: ac.UserPoolId,
		ClientId: ac.ClientId
	})
	
	this.readyListeners = void 0

	const user = this.userPool.getCurrentUser()
	if (!user) return

	this.readyListeners = []
	user.getSession((err, session) => {
		if (err) return console.error(err)
		if (!session.isValid()) return

		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId : ac.IdentityPoolId,
			Logins : {
				[`cognito-idp.${ac.region}.amazonaws.com/${ac.UserPoolId}`]: session.getIdToken().getJwtToken()
			}
		})

		AWS.config.credentials.get(err => {
			this.readyListeners.forEach(cb => cb(err))
			this.readyListeners = void 0
		})
	})
}

Cognito.prototype = {
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
				const idToken = result.idToken.jwtToken
				const ac = this.awsConfig

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
	},

	signup(Username, Password, email, phone, cb){
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
