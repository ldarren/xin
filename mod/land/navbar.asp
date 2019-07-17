<button data-target="#menu" data-toggle="collapse" type="button" class="pull-right navbar-toggle collapsed">
	<span class="sr-only">Toggle menu</span>
	<span class="icon-bar"></span>
	<span class="icon-bar"></span>
	<span class="icon-bar"></span>
</button>

<div class="navbar-header navbar-left">
	<a href="#land#top" class="navbar-brand">
		<small>
			<i class="fa fa-cloud"></i>
			<span class="light-green">Kloud</span> Konsole
		</small>
	</a>
</div>

<div class=" navbar-header navbar-right" role="navigation">
	<div id="menu" class="collapse navbar-collapse">
		<ul class="nav navbar-nav navbar-right" role="tablist">
			<%if (d.shortcuts) {%>
			<li>
				<a href="#why">Why</a>
			</li>
			
			<li class="sep visible-md visible-lg">
				<i class="ace-icon fa fa-circle white"></i>
			</li>
			
			<li>
				<a href="#info">Info</a>
			</li>
			
			<li class="sep visible-md visible-lg">
				<i class="ace-icon fa fa-circle white"></i>
			</li>
			
			<li>
				<a href="#slider">Slider</a>
			</li>
			
			<li class="sep visible-md visible-lg">
				<i class="ace-icon fa fa-circle white"></i>
			</li>
			
			<li>
				<a href="#contact">Contact</a>
			</li>
			
			<li class="sep visible-md visible-lg">
				<i class="ace-icon fa fa-circle white"></i>
			</li>
			<%}%>
			
			<li id=auth>
				<a href="#login">
					<span class=dark>Login</span> &nbsp;<i class="fa fa-user bigger-110"></i>
				</a>
			</li>
		</ul>
	</div>				
</div>
