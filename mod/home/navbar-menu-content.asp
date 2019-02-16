<a data-toggle="dropdown" href="#" class="dropdown-toggle">
	<% if (d.icon_left) {%><i class="ace-icon fa <%d.icon_left%>"></i><% } %>
	<%if (d.text && d.photo) {%>
	<img class="nav-user-photo" src="<%d.photo%>" alt="<%d.text%>'s Photo" />
	<span class="user-info"> <small><%d.greet%></small> <%d.text%> </span>
	<% } else { d.text } %>
	<% if (d.icon_right) {%><i class="ace-icon fa <%d.icon_right%>"></i><% } %>
</a>
