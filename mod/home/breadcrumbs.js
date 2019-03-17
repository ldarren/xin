const router = require('po/router')

return {
	deps: {
		tpl: 'file',
		menu: 'models',
		breadcrumbs: 'models'
	},
	create(deps, params){
		this.super.create.call(this, deps, params)
		this._ul = this.el.querySelector('ul')
	},
	events: {
		'click a': function(evt, target){
			evt.preventDefault()
			router.go(target.hash.substring(1))
		}
	},
	slots: {
		changeContent(from, sender, route, spec, params){
			const urlParams = new URLSearchParams(window.location.search)
			const href = '#' + urlParams.get('_')
			const menuItem = this.deps.menu.find(item => item.href === href)
			if (!menuItem) return // page without menu item
			const bc = this.deps.breadcrumbs
			const ul = this._ul
			const last = bc.at(bc.length()-1)
			if (last && last.href === menuItem.href) bc.remove(last.id)
			if (bc.length() > 4) bc.remove(bc.at(0).id)
			ul.innerHTML = ''
			bc.forEach(b => {
				const li = document.createElement('li')	
				li.innerHTML = this.deps.tpl(b)
				ul.appendChild(li)
			})
			
			bc.create({
				id: Date.now(),
				name: menuItem.name,
				icon: menuItem.icon,
				href: menuItem.href
			})
			const li = document.createElement('li')
			li.classList.add('active')
			li.innerText = menuItem.name
			ul.appendChild(li)
		}
	}
}
