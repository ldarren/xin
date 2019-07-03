<div id=message-list class=message-list>
<% for(let i = 0, m; m = d.items[i]; i++) { %>
	<% d.renderMail(m, d.select) %>
<% } %>
</div>
