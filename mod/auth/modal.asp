<div id="login-box" class="login-box visible widget-box no-border">
	<div class="widget-body">
		<div class="widget-main">
			<h4 class="header blue lighter bigger">
				<i class="ace-icon fa fa-pencil-square-o green"></i>
				Please Enter Your Information
			</h4>

			<div class="space-6"></div>

			<form>
			<fieldset>
				<label class="block clearfix">
				<span class="block input-icon input-icon-right">
				<input name=company type=text class=form-control placeholder=Company value=<%d.company%>
					autocapitalize=off
					autocomplete=off
					spellcheck=false
					autocorrect=off
					required/>
				<i class="ace-icon fa fa-bank"></i>
				</span>
				</label>

				<label class="block clearfix">
				<span class="block input-icon input-icon-right">
				<input name=username type=text class=form-control placeholder=Username
					autocapitalize=off
					autocomplete=off
					spellcheck=false
					autocorrect=off
					required/>
				<i class="ace-icon fa fa-user"></i>
				</span>
				</label>

				<label class="block clearfix">
				<span class="block input-icon input-icon-right">
				<input name=password type=password class=form-control placeholder=Password required/>
				<i class="ace-icon fa fa-lock"></i>
				</span>
				</label>

				<div class="space"></div>

				<div class=clearfix>
				<label class="inline">
				<input type=checkbox class=ace checked/>
				<span class=lbl> Remember Me</span>
				</label>

				<button id=btn-login type="button" class="width-35 pull-right btn btn-sm btn-primary">
				<i class="ace-icon fa fa-key"></i>
				<span class="bigger-110">Login</span>
				</button>
				</div>

				<div class=space-4></div>
			</fieldset>
			</form>

			<% if (d.socialBtn && d.socialBtn.length) { %>
			<div class="social-or-login center">
				<span class="bigger-110">Or Login Using</span>
			</div>

			<div class=space-6></div>

			<div class="social-login center">
				<% for (var i = 0, btn, btns = d.socialBtn; btn = btns[i]; i++) { %>
				<a id="<%btn.id%>" class="btn <%btn.color%>"> <i class="ace-icon fa <%btn.icon%>"></i> </a>
				<% } %>
			</div>
			<% } %>
		</div><!-- /.widget-main -->

		<% if (d.enableReset || d.enableRegister) { %>
		<div class="toolbar clearfix">
			<% if (d.enableReset) { %>
			<div> <a href="#" data-target="#forgot-box" class="forgot-password-link"><i class="ace-icon fa fa-arrow-left"></i>I forgot my password</a> </div>
			<% } %>

			<% if (d.enableRegister) { %>
			<div> <a href="#" data-target="#signup-box" class="user-signup-link">
				<% if (d.enableReset) { %>
				I want to register
				<i class="ace-icon fa fa-arrow-right"></i>
				<% } else { %>
				<i class="ace-icon fa fa-arrow-left"></i>
				I want to register
				<% } %>
			</a> </div>
			<% } %>
		</div>
		<% } %>
	</div><!-- /.widget-body -->
</div><!-- /.login-box -->

<div id="forgot-box" class="forgot-box widget-box no-border">
	<div class="widget-body">
		<div class="widget-main">
			<h4 class="header red lighter bigger">
				<i class="ace-icon fa fa-key"></i>
				Retrieve Password
			</h4>

			<div class="space-6"></div>
			<p> Enter your email and to receive instructions </p>

			<form>
			<fieldset>
				<label class="block clearfix">
				<span class="block input-icon input-icon-right">
				<input name=email type="email" class="form-control" placeholder="Email" required/>
				<i class="ace-icon fa fa-envelope"></i>
				</span>
				</label>

				<div class="clearfix">
				<button id=btn-forget type=button class="width-35 pull-right btn btn-sm btn-danger">
				<i class="ace-icon fa fa-lightbulb-o"></i>
				<span class="bigger-110">Send Me!</span>
				</button>
				</div>
			</fieldset>
			</form>
		</div><!-- /.widget-main -->

		<div class="toolbar center">
		<a href="#" data-target="#login-box" class="back-to-login-link">
		Back to login
		<i class="ace-icon fa fa-arrow-right"></i>
		</a>
		</div>
	</div><!-- /.widget-body -->
</div><!-- /.forgot-box -->

<div id="signup-box" class="signup-box widget-box no-border">
	<div class="widget-body">
		<div class="widget-main">
			<h4 class="header green lighter bigger">
				<i class="ace-icon fa fa-users blue"></i>
				New User Registration
			</h4>

			<div class="space-6"></div>
			<p> Enter your details to begin: </p>

			<form>
			<fieldset>
				<label class="block clearfix">
				<span class="block input-icon input-icon-right">
				<input name=company type=text class=form-control placeholder=Company value=<%d.company%>
					autocapitalize=off
					autocomplete=off
					spellcheck=false
					autocorrect=off
					required/>
				<i class="ace-icon fa fa-bank"></i>
				</span>
				</label>

				<label class="block clearfix">
				<span class="block input-icon input-icon-right">
				<input name="email" type=email class="form-control" placeholder="name@pmail.com" required/>
				<i class="ace-icon fa fa-envelope"></i>
				</span>
				</label>

				<label class="block clearfix">
				<span class="block input-icon input-icon-right">
				<input name="phone" type=tel class="form-control" placeholder="+6598765432" required/>
				<i class="ace-icon fa fa-mobile"></i>
				</span>
				</label>

				<label class="block clearfix">
				<span class="block input-icon input-icon-right">
				<input name="username" type=text class="form-control" placeholder=Username
					autocapitalize=off
					autocomplete=off
					spellcheck=false
					autocorrect=off
					required/>
				<i class="ace-icon fa fa-user"></i>
				</span>
				</label>

				<label class="block clearfix">
				<span class="block input-icon input-icon-right">
				<input name="password" type="password" class="form-control" placeholder="Password" required/>
				<i class="ace-icon fa fa-lock"></i>
				</span>
				</label>

				<label class="block clearfix">
				<span class="block input-icon input-icon-right">
				<input name="repeat" type="password" class="form-control" placeholder="Repeat password" required/>
				<i class="ace-icon fa fa-retweet"></i>
				</span>
				</label>

				<label class="block">
				<input type="checkbox" class="ace" required/>
				<span class="lbl">
				I accept the
				<a href="#">User Agreement</a>
				</span>
				</label>

				<div class="space-24"></div>

				<div class="clearfix">
				<button type=reset class="width-30 pull-left btn btn-sm">
				<i class="ace-icon fa fa-refresh"></i>
				<span class="bigger-110">Reset</span>
				</button>

				<button id=btn-register type=button class="width-65 pull-right btn btn-sm btn-success">
				<span class="bigger-110">Register</span>

				<i class="ace-icon fa fa-arrow-right icon-on-right"></i>
				</button>
				</div>
			</fieldset>
			</form>
		</div>

		<div class="toolbar center">
		<a href="#" data-target="#login-box" class="back-to-login-link">
		<i class="ace-icon fa fa-arrow-left"></i>
		Back to login
		</a>
		</div>
	</div><!-- /.widget-body -->
</div><!-- /.signup-box -->
