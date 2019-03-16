function S3Bucket(env){
	const ac = this.awsConfig = env.aws
	this.s3 = new AWS.S3({apiVersion: '2006-03-01'})
	this.Bucket = ac.Bucket
}

S3Bucket.prototype = {
	list(cb){
	console.log('>>>> get s3 list', AWS.config.credentials)
		this.s3.listObjects({Bucket: this.Bucket}, (err, bucket) => {
			if (err) return cb(err)
			cb(null, bucket.Contents)
		})
	},
	read(Key, cb){
		const params = {
			Bucket: this.Bucket,
			Key
		}
		this.s3.getObject(params, cb)
	}
}

return S3Bucket
