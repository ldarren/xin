const router = require('po/router')
const pObj = pico.export('pico/obj')
const util = require('email/util')
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
			if (err) return console.error(err)
			item.read = Date.now()
			const content = new TextDecoder('utf-8').decode(new Uint8Array(mail.body))
			const attachments = decodeAttachment(mail.attachments, [])
			this.el.innerHTML = deps.tpl({
				inbox: deps.inbox,
				index: deps.inbox.indexOf(item.id),
				sender: item.sender,
				time: util.mailTime(new Date(item.time)),
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
		},
		'click ul.pagination.middle li': function(evt, target){
			evt.preventDefault()
			if (target.classList.contains('disabled')) return
			const a = target.querySelector('a')
			const id = a.href.split('#')[1]
			router.go('/dash/mail/view/'+id)
		},
		'click ul#inbox-tabs a': function(evt, target){
			const route = target.href.split('#')[1]
			switch(route){
			case 'write':
			case 'sent':
			case 'draft':
			case '':
				evt.preventDefault()
				alert('Coming soon')
				break
			}
		},
		'click a': function(evt, target){
			const route = target.href.split('#')[1]
			switch(route){
			case 'preview':
			case 'reply':
			case 'forward':
			case 'delete':
			case 'soon':
				evt.preventDefault()
				alert('Coming soon')
				break
			}
		}
	}
}
