function S3Bucket(env){
	const ac = this.awsConfig = env.aws
	this.s3 = new AWS.S3({apiVersion: '2006-03-01'})
	this.Bucket = ac.Bucket
}

// get html content if possible
function getContent(node, contents, attachments){
	switch(node.contentType.value){
	case 'multipart/related':
	case 'multipart/alternative':
		node.childNodes.forEach(n => getContent(n, contents, attachments))
		break
	case 'text/plain':
	case 'text/html':
		contents[node.contentType.value] = Array.prototype.slice.call(node.content)
		break;
	default:
		attachments.push({
			contentType: node.contentType,
			content: Array.prototype.slice.call(node.content)
		})
		break
	}
}

function readMails(ctx, mails, inbox, cb){
	if (!mails || !mails.length) return cb()

	const mail = mails.shift()
	console.log('reading', mail.Key, mail.Size)

	ctx.read(mail.Key, inbox, err => {
		if (err) return cb(err)
		return readMails(ctx, mails, inbox, cb)
	})
}

S3Bucket.prototype = {
	list(inbox, cb){
		this.s3.listObjects({Bucket: this.Bucket}, (err, bucket) => {
			if (err) return cb(err)
			readMails(this, bucket.Contents, inbox, cb)
		})
	},
	read(Key, inbox, cb){
		let mail = inbox.get(Key)
		if (mail) return cb(null, mail)

		const params = {
			Bucket: this.Bucket,
			Key
		}
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
					time: headers.date[0].value,
					subject: headers.subject[0].value,
					headers,
					body: contents['text/html'] || contents['text/plain'],
					attachments
				})
			}catch(exp){
				// supress parse exception
				return cb(exp)
			}
			cb(null, inbox.get(Key))
		})
	}
}

return S3Bucket
