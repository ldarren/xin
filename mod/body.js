const router = require('po/router')
const specMgr = require('p/specMgr')

function changeContent(state, params){
	if (!state) return
	this.signal.changeContent(state, this.specMap[state], params).send([this.host])
}

function pageChanged(evt, states, params){
	if (!states){
		if (this.deps.ums.isValid()) return router.go('/dash')
		else return router.go('/')
	}
	if (states.includes('home') || states.includes('auth')){
		if (this.deps.ums.isValid()){
			if (states.includes('auth')) return router.go('/dash')
		} else {
			if (!states.includes('auth')) return router.go('/auth')
		}
	}

	this._params = params
	this._pageState = states[1]

	if (states[0] !== this._currState){
		this.clear()
		this.spawnBySpec([this.specMap[states[0]]], params)
	} else {
		changeContent.call(this, states[1], params)
	}

	this._currState = states[0]
}

return {
	signals: ['changeContent'],
	deps: {
		ums: 'cognito',
		pages: 'map',
		routes: 'map'
	},
	create: function(deps, params){
		this.super.create.call(this, deps, params)

		this._currState = ''
		this._pageState = ''
		this._params = null

		const rawSpec = []
		const keys = Object.keys(deps.pages)
		for (var i=0,k; (k=keys[i]); i++){
			rawSpec.push(deps.pages[k])
		}

		const specMap = this.specMap = {}
		specMgr.load(this, params, rawSpec, (err, spec)=>{
			for (var i=0, k; (k=keys[i]); i++){
				specMap[k]=spec.shift()
			}

			deps.ums.callback.on('ready', () => {
				router.off('change',pageChanged,this)
				router.on('change',pageChanged,this).start(deps.routes)
			})
		})
	},
	remove: function(){
		router.off('change',pageChanged,this)
		this.super.remove.call(this)
	},
	slots: {
		moduleAdded: function(from, sender){
			changeContent.call(this, this._pageState, this._params)
		}
	}
}
