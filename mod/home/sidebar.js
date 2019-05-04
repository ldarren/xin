const router = require('po/router')

function renderMenu(items, idx) {
	if (items.length <= idx) return ''
	const item = items[idx++]
	let menu = `
	<li id=m${item.id}>
		<a href="${item.href || ''}" class=${item.childs ? 'dropdown-toggle' : ''}>
			<i class="menu-icon fa ${item.parent ? 'fa-caret-right' : item.icon}"></i>
			${item.parent ? item.name : '<span class="menu-text"> ' + item.name + ' </span>'}
			<b class="${item.childs ? 'arrow fa fa-angle-down' : ''}"></b>
		</a>

		<b class=arrow></b>
	`
	if (item.childs) {
		menu += '<ul class=submenu>'
		menu += renderMenu(item.childs, 0)
		menu += '</ul>'
	}
	menu += '</li>'
	return menu + renderMenu(items, idx)
}

function getParent(menu, item){
	if (!item.parent) return
	return menu.get(item.parent)
}

function activateMenu(el, menu, item){
	if (!item) return
	const active = el.querySelector('#m'+item.id)
	if (!active) return
	if (active.querySelector('.dropdown-toggle')) active.classList.add('open')
	active.classList.add('active')

	item = getParent(menu, item)
	if (!item) return
	return activateMenu(el, menu, item)
}

function auth(userPerm, menuPerm){
	return !menuPerm.find((p, i) => {
		if (!p) return false
		if (p & userPerm[i]) return false
		return true
	})
}

return {
	deps: {
		menu: 'models',
		config: 'models',
		tpl: 'file'
	},
	create(deps, params){
		let { perm } = deps.config.getSelected()
		perm = perm || []
		const shortcuts = []
		const menu = []
		const menuMap = {}

		deps.menu.sort((r1, r2) => r1.id > r2.id)

		// TODO check env.perm
		deps.menu.forEach((row, i, id, coll) => {
			if (!auth(perm, row.perm)) return
			const r = Object.assign(menuMap[row.id] || {}, row)
			if (r.shortcut) shortcuts.push(r)
			menuMap[r.id] = r
			if (r.parent){
				const parent = menuMap[r.parent] = menuMap[r.parent] || {}
				parent.childs = parent.childs || []
				parent.childs.push(r)
			}else{
				menu.push(r)
			}
		})

		this.el.innerHTML = deps.tpl({shortcuts, menu, renderMenu})
	},
	render(){
		try{
			ace.settings.loadState('sidebar')
		}catch(e){}
		ace.demo.functions.enableSidebar()
		return this.el
	},
	events: {
		[ace.click_event + ' a']: function(evt, target){
			evt.preventDefault()
			if (!target.hash) return
			router.go(target.hash.substring(1))
		}
	},
	slots: {
		changeContent: function(from, sender, route, spec, params){
			const href = '#/' + route
			let item = this.deps.menu.find(i => href === i.href)
			if (!item) return
			this.el.querySelectorAll('.active').forEach(el => el.classList.remove('open', 'active'))

			activateMenu(this.el, this.deps.menu, item)
		}
	}
}
