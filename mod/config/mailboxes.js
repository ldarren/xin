return {
	deps: {
		configMailbox: 'models',
	},
	render(){
		//initiate dataTables plugin
		const table = $('#dynamic-table')
			//.wrap("<div class='dataTables_borderWrap' />")   //if you are applying horizontal scrolling (sScrollX)
			.DataTable({
				bAutoWidth: false,
				aoColumns: [ { bSortable: false }, null, null,null, null, null, { bSortable: false } ],
				aaSorting: [],

				//bProcessing: true,
				//bServerSide: true,
				//sAjaxSource: 'http://127.0.0.1/table.php',

				//sScrollY: '200px',
				//bPaginate: false,

				//sScrollX: '100%',
				//sScrollXInner: '120%',
				//bScrollCollapse: true,
				// Note: if you are applying horizontal scrolling (sScrollX) on a ".table-bordered"
				// you may want to wrap the table inside a "div.dataTables_borderWrap" element

				//iDisplayLength: 50

				select: { style: 'multi' }
			});
		$.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';
		return this.el
	}
}
