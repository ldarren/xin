<div class="sidebar-shortcuts" id="sidebar-shortcuts">
	<% var sc_colors = ["btn-success", "btn-info", "btn-warning", "btn-danger"]; %>
	<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
		<% for (var i=0, scs=d.shortcuts, sc; sc=scs[i]; i++){ %>
			<a class="btn <%sc_colors[i]%>" href=<%sc.href%>> <i class="ace-icon fa <%sc.icon%>"></i> </a>
		<% } %>
	</div>

	<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
		<% for (var i=0, scs=d.shortcuts, sc; sc=scs[i]; i++){ %>
			<span class="btn <%sc_colors[i]%>"></span>
		<% } %>
	</div>
</div>

<ul class="nav nav-list">
	<% d.renderMenu(d.menu, 0) %>
</ul>

<!-- #section:basics/sidebar.layout.minimize -->
<div class="sidebar-toggle sidebar-collapse" id=sidebar-collapse>
	<i id=sidebar-toggle-icon class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
</div>
