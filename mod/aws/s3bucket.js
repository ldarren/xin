// get html content if possible
function getContent(node, contents, attachments){
	switch(node.contentType.value){
	case 'multipart/mixed':
	case 'multipart/related':
	case 'multipart/alternative':
		node.childNodes.forEach(n => getContent(n, contents, attachments))
		break
	case 'text/plain':
	case 'text/html':
		contents[node.contentType.value] = Array.prototype.slice.call(node.content)
		break
	default:
		attachments.push({
			headers: node.headers,
			content: Array.prototype.slice.call(node.content)
		})
		break
	}
}

function readMails(ctx, list, inbox, mails, cb){
	if (!list || !list.length) return cb()

	const item = list.shift()
	if (inbox.get(item.Key)) return readMails(ctx, list, inbox, mails, cb)
	console.log('reading', item.Key, item.Size)

	ctx.read(item.Key, inbox, mails, err => {
		if (err) return cb(err)
		return readMails(ctx, list, inbox, mails, cb)
	})
}

function list(ctx, params, inbox, mails, cb){
	ctx.ums.getAccessToken(err => {
		if (err) return cb(err)
		ctx.s3.listObjectsV2(params, (err, bucket) => {
			if (err) return cb(err)
			readMails(ctx, bucket.Contents, inbox, mails, err => {
				if (err) return cb(err)
				if (bucket.IsTruncated){
					params.ContinuationToken = bucket.NextContinuationToken
					return list(ctx, params, inbox, mails, cb)
				}
				cb()
			})
		})
	})
}

function S3Bucket(ums){
	this.ums = ums
	ums.callback.on('load', this.init, this)
}

S3Bucket.prototype = {
	init(evt, config){
		if (!config) return
		const selected = config.getSelected()
		if (!selected) return
		const aws = selected.env
		if (!aws) return
		this.s3 = new AWS.S3({apiVersion: '2006-03-01'})
		this.awsConfig = aws
		this.Bucket = aws.Bucket
	},
	list(inbox, mails, cb){
		list(this, {Bucket: this.Bucket}, inbox, mails, cb)
	},
	read(Key, inbox, mails, cb){
		let mail = mails.get(Key)
		if (mail) return cb(null, inbox.get(Key), mail)

		const params = {
			Bucket: this.Bucket,
			Key
		}
		this.ums.getAccessToken(err => {
			if (err) return cb(err)
			this.s3.getObject(params, (err, detail) => {
				if (err) return cb(err)
				try{
					const mimeNode = emailjs.parse(detail.Body)
					const headers = mimeNode.headers
					const attachments = []
					const contents = {}
					getContent(mimeNode, contents, attachments)
					inbox.create({
						id: Key,
						sender: headers.from[0].value[0].name,
						time: new Date(headers.date[0].value),
						subject: headers.subject[0].value,
						attachments: attachments.length
					})
					mails.create({
						id: Key,
						headers,
						body: contents['text/html'] || contents['text/plain'],
						attachments
					})
				}catch(exp){
					// supress parse exception
					return cb(exp)
				}
				cb(null, inbox.get(Key), mails.get(Key))
			})
		})
	}
}

return S3Bucket
