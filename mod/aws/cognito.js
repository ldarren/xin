// https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js # Use case 32
// https://github.com/aws-amplify/amplify-js/issues/405 # missing credentials in config
const pObj = pico.export('pico/obj')
const Callback = require('po/Callback')

function setAWSConfig(aws, token, cb){
	const region = aws.IdentityPoolId.split(':')[0]
	AWS.config.update({
		region: region,
		credentials: new AWS.CognitoIdentityCredentials({
			IdentityPoolId: aws.IdentityPoolId,
			Logins: {
				[`cognito-idp.${region}.amazonaws.com/${aws.UserPoolId}`]: token
			}
		})
	})
	AWS.config.credentials.get(cb)
}

function refreshToken(user, aws, session, cb){
	const cred = pObj.dot(AWS, ['config', 'credentials'])
	if (cred && !cred.needsRefresh()) return cb(null, session, false)

	user.refreshSession(session.getRefreshToken(), (err, session) => {
		if (err) return cb(err)
		const region = aws.IdentityPoolId.split(':')[0]
		cred.params.Logins[`cognito-idp.${region}.amazonaws.com/${aws.UserPoolId}`] = session.getIdToken().getJwtToken()
		cred.refresh(err => cb(err, session, true))
	})
}

function createUser(ctx, company, accessToken, idToken){
	if (company !== ctx.company0) return
	ctx.user.create({
		company,
		accessToken,
		idToken
	})
}

function readied(ctx, err){
	if (err) console.error(err)
	ctx.callback.toggle('ready', true)
}

function Cognito(company0, user, config){
	this.company0 = company0
	this.user = user
	this.config = config

	this.callback = new Callback

	this.setGroup(config.getSelected() || {})
}

Cognito.prototype = {
	setGroup({name: company, env: aws}){
		if (!company || !aws) return readied(this)
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

			setAWSConfig(aws, session.idToken.jwtToken, err => {
				if (err) return readied(this, err)
				refreshToken(user, aws, session, (err, session) => {
					if (err) return readied(this, err)
					createUser(
						this,
						company,
						session.accessToken.jwtToken,
						session.idToken.jwtToken)
					this.callback.trigger('load', this.config)
					readied(this)
				})
			})
		})
	},
	isValid(){
		return !!AWS.config.credentials
	},
	signin(company, Username, Password, cb){
		const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
			Username,
			Pool: this.userPool
		})
		const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
			Username,
			Password
		})
		cognitoUser.authenticateUser(authDetails, {
			onSuccess: result => {
				const idToken = result.idToken.jwtToken
				setAWSConfig(this.awsConfig, idToken, err => {
					if (err) return cb(err)
					createUser(
						this,
						company,
						result.accessToken.jwtToken,
						idToken)
					this.callback.trigger('load', this.config)
					cb(err)
				})
			},

			onFailure: cb
		})
	},
	signup(company, Username, Password, email, cb){
		const attributes = []
		if (email){
			attributes.push( new AmazonCognitoIdentity.CognitoUserAttribute({
				Name : 'email',
				Value : email,
			}))
		}

		this.userPool.signUp(Username, Password, attributes, null, (err, result) => {
			if (err) return cb(err)
			if (!result.user || !result.userUnconfirmed) return cb(err, result)
			result.user.getSession((err, session) => {
				if (err) return cb(err)
				if (!session.isValid()) return cb('invalid session')

				setAWSConfig(this.awsConfig, session.getIDToken().getJwtToken(), err => {
					if (err) return cb(err)
					createUser(
						this,
						company,
						session.getAccessToken().getJwtToken(),
						session.getIdToken().getJwtToken()),
					this.callback.trigger('load', this.config)
					cb(null, result)
				})
			})
		})
	},
	signout(){
		AWS.config.credentials = void 0
		const user = this.userPool.getCurrentUser()
		if (!user) return
		user.signOut()
		this.callback.trigger('unload')
	},
	getId(){
		if (!this.userPool) return 0
		const user = this.userPool.getCurrentUser()
		if (!user) return 0
		return user.username || 0
	},
	getAccessToken(cb){
		const user = this.userPool.getCurrentUser()
		if (!user) return cb('invalid userpool')

		user.getSession((err, session) => {
			if (err) return cb(err)
			if (!session.isValid()) return cb('invalid session')

			refreshToken(user, this.awsConfig, session, (err, session, refreshed) => {
				if (err) return cb(err)
				const accessToken = session.getAccessToken().getJwtToken()
				cb(null, accessToken)
				if (!refreshed) return
				const {name:company} = this.config.getSelected()
				createUser(
					this,
					company,
					accessToken,
					session.getIdToken().getJwtToken())
			})
		})
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
