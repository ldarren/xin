// https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js # Use case 32
// https://github.com/aws-amplify/amplify-js/issues/405 # missing credentials in config
const router = require('po/router')

function getSession(ctx, cb){
	const user = ctx.userPool.getCurrentUser()
	if (!user) return readied(ctx)

	user.getSession((err, session) => {
		if (err) return readied(ctx, err)
		if (!session.isValid()) return readied(ctx)

		user.refreshSession(session.getRefreshToken(), cb)
	})
}

function setConfig(aws, token, cb){
	AWS.config.update({
		region: aws.region,
		credentials: new AWS.CognitoIdentityCredentials({
			IdentityPoolId: aws.IdentityPoolId,
			Logins: {
				[`cognito-idp.${aws.region}.amazonaws.com/${aws.UserPoolId}`]: token
			}
		})
	})
	AWS.config.credentials.get(cb)
}

function readied(ctx, err){
	if (err) console.error(err)
	ctx.readyListeners.forEach(cb => cb(err))
	ctx.readyListeners = void 0
	router.go('/auth')
}

function Cognito(company, user, config, dependant){
	this.company = company
	this.user = user
	this.config = config
	this.dependant = dependant
	if (!config) return
	const selected = config.getSelected()
	if (!selected) return
	this.env(selected.name, selected.env)
}

Cognito.prototype = {
	env(company, aws){
		if (!aws) return

		this.readyListeners = []
		this.awsConfig = aws

		this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
			UserPoolId: aws.UserPoolId,
			ClientId: aws.ClientId
		})

		getSession(this, (err, session) => {
			if (err) return readied(this, err)
			if (!session.isValid()) return readied(this)

			setConfig(aws, session.getIdToken().getJwtToken(), err => {
				if (company === this.company) this.user.create({
					company,
					accessToken: session.getAccessToken().getJwtToken(),
					idToken: session.getIdToken().getJwtToken(),
				})
				this.dependant.env(this.config)
				readied(this, err)
			})
		})
	},
	ready(cb){
		if (this.readyListeners) return this.readyListeners.push(cb)
		cb()
	},

	signin(company, Username, Password, cb){
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
				setConfig(this.awsConfig, idToken, err => {
					if (err) return cb(err)
					if (company === this.company) this.user.create({
						company,
						accessToken: result.accessToken.jwtToken,
						idToken
					})
					cb(err)
				})
			},

			onFailure: cb
		})
	},

	signup(company, Username, Password, email, phone, cb){
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
			if (!result.user || !result.userUnconfirmed) return cb(err, result)
			result.user.getSession((err, session) => {
				if (err) return cb(err)
				if (company === this.company) this.user.create({
					company,
					accessToken: session.getAccessToken().getJwtToken(),
					idToken: session.getIdToken().getJwtToken()
				})
				cb(null, result)
			})
		})
	},

	signout(){
		AWS.config.credentials = void 0
		const user = this.userPool.getCurrentUser()
		if (!user) return
		user.signOut()
	},

	isValid(){
	//TODO check AWS.config.credentials.needsRefresh()
		return !!AWS.config.credentials
	},

	getProfile(cb){
		const user = this.userPool.getCurrentUser()
		if (!user) return cb('no current user')
		user.getSession((err, session) => {
			if (err) return cb(err)
			user.getUserAttributes((err, result) => {
				if (err) return cb(err)
				const attr = {username: user.username}
				for (let i = 0; i < result.length; i++) {
					attr[result[i].getName()] = result[i].getValue()
				}
				return cb(null, attr)
			})
		})
	}
}

return Cognito
