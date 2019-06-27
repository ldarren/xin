const router = require('po/router')
const pObj = pico.export('pico/obj')
const KB = 1024
const MB = KB * KB

/* attachment
 * - content
 * - headers
 * -- content-id[0]
 * --- initial
 * --- value
 * -- content-disposition
 * --- initial
 * --- params
 * ---- size
 * -- content-type[0]
 * --- initial
 * --- params: {name: xxx.jpg}
 * --- type: image
 * --- value: image/jpeg
 */

function attachmentSize(attachments){
	if (!attachments.length) return 0
	const bytes = attachments.reduce((acc, a) => {
		acc += parseInt(pObj.dot(a, ['headers', 'content-disposition', 0, 'params', 'size'], 0))
		return acc
	}, 0)
	if (bytes < KB) return `${bytes} B`
	if (bytes < MB) return `${(bytes/KB).toFixed(2)} KB`
	return `${(bytes/MB).toFixed(2)} MB`
}

function decodeAttachment(input, output){
	if (input.length === output.length) return output
	const a = input[output.length]
	const bytes = new Uint8Array(a.content)
	const content = btoa(bytes.reduce((data, byte) => data + String.fromCharCode(byte), ''))
	output.push({
		content,
		cid: pObj.dot(a, ['headers', 'content-id', 0, 'value'], '').slice(4, -4),
		contentType: pObj.dot(a, ['headers', 'content-type', 0], {})
	})
	return decodeAttachment(input, output)
}

function replaceCID(el, attachments){
	attachments.forEach(a => {
		const imgs = el.querySelectorAll(`img[src="cid:${a.cid}"]`)
		imgs.forEach(img => {
			img.src = `data:${a.contentType.value};base64, ${a.content}`
		})
	})
}

return {
	deps: {
		tpl: 'file',
		inbox: 'models',
		mails: 'models',
		bucket: 's3bucket',
	},
	create(deps, params){
		deps.bucket.read(params.id, deps.inbox, deps.mails, (err, item, mail) => {
			const content = new TextDecoder('utf-8').decode(new Uint8Array(mail.body))
			const attachments = decodeAttachment(mail.attachments, [])
			this.el.innerHTML = deps.tpl({
				sender: item.sender,
				time: item.time,
				subject: item.subject,
				content,
				attachments,
				attachmentSize: attachmentSize(mail.attachments)
			})
			replaceCID(this.el, attachments)
		})
	},
	events: {
		'click .messagebar-item-left': function(evt, target){
			router.go('/dash/mail')
		}
	}
}
