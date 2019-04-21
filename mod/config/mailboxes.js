return {
	deps: {
		configMailbox: 'models',
	},
	create(deps, params){
		this.table
	},
	render(){
		this.table = $('#dynamic-table').DataTable({
			columns: [
				{ title: 'name', data: 'name' },
				{ title: 'region', data: 'region' },
				{ title: 'Bucket', data: 'Bucket' },
				{ title: 'IdentityPoolId', data: 'IdentityPoolId' },
				{ title: 'UserPoolId', data: 'UserPoolId' },
				{ title: 'ClientId', data: 'ClientId' }
			]
		})
		const configMailbox = this.deps.configMailbox
		configMailbox.list(1, 10, (err, models) => {
			if (err) alert(JSON.stringify(err))

			configMailbox.forEach(model => {
				this.table.row.add(model.env).draw()
			})
		})
		return this.el
	}
}
