<!-- #section:pages/inbox -->
<div class=tabbable>
	<ul id=inbox-tabs class="inbox-tabs nav nav-tabs padding-16 tab-size-bigger tab-space-1">

		<!-- #section:pages/inbox.compose-btn -->
		<li class="li-new-mail pull-right">
			<a data-toggle="tab-disable" href="#write" data-target="write" class="btn-new-mail">
				<span class="btn btn-purple no-border">
					<i class="ace-icon fa fa-envelope bigger-130"></i>
					<span class="bigger-110">Write Mail</span>
				</span>
			</a>
		</li><!-- /.li-new-mail -->

		<li class="li-new-mail pull-right">
			<a data-toggle="tab-disable" href="#refresh" class="btn-new-mail">
				<span class="btn btn-yellow no-border">
					<i class="ace-icon glyphicon glyphicon-refresh bigger-130"></i>
					<span class="bigger-110">Refresh</span>
				</span>
			</a>
		</li>

		<!-- /section:pages/inbox.compose-btn -->
		<li class="active">
			<a data-toggle="tab" href="#inbox" data-target="inbox">
				<i class="blue ace-icon fa fa-inbox bigger-130"></i>
				<span class="bigger-110">Inbox</span>
			</a>
		</li>

		<li>
			<a data-toggle="tab-disable" href="#sent" data-target="sent">
				<i class="orange ace-icon fa fa-location-arrow bigger-130"></i>
				<span class="bigger-110">Sent</span>
			</a>
		</li>

		<li>
			<a data-toggle="tab-disable" href="#draft" data-target="draft">
				<i class="green ace-icon fa fa-pencil bigger-130"></i>
				<span class="bigger-110">Draft</span>
			</a>
		</li>

		<li class="dropdown">
			<a data-toggle="dropdown-disable" class="dropdown-toggle" href="#">
				<i class="pink ace-icon fa fa-tags bigger-130"></i>

				<span class="bigger-110">
					Tags
					<i class="ace-icon fa fa-caret-down"></i>
				</span>
			</a>

			<ul class="dropdown-menu dropdown-light-blue dropdown-125">
				<li>
					<a data-toggle="tab" href="#tag-1">
						<span class="mail-tag badge badge-pink"></span>
						<span class="pink">Tag#1</span>
					</a>
				</li>

				<li>
					<a data-toggle="tab" href="#tag-family">
						<span class="mail-tag badge badge-success"></span>
						<span class="green">Family</span>
					</a>
				</li>

				<li>
					<a data-toggle="tab" href="#tag-friends">
						<span class="mail-tag badge badge-info"></span>
						<span class="blue">Friends</span>
					</a>
				</li>

				<li>
					<a data-toggle="tab" href="#tag-work">
						<span class="mail-tag badge badge-grey"></span>
						<span class="grey">Work</span>
					</a>
				</li>
			</ul>
		</li><!-- /.dropdown -->
	</ul>

	<div class="tab-content no-border no-padding">
		<div id="inbox" class="tab-pane in active">
			<div class="message-container">
				<!-- #section:pages/inbox.navbar -->
				<div id="id-message-list-navbar" class="message-navbar clearfix">
					<div class="message-bar">
						<div class="message-infobar" id="id-message-infobar">
							<span class="blue bigger-150">Inbox</span>
							<span class="grey bigger-110">(<%d.unread%> unread messages)</span>
						</div>

						<div class="message-toolbar hide">
							<div class="inline position-relative align-left">
								<button type="button" class="btn-white btn-primary btn btn-xs dropdown-toggle" data-toggle="dropdown">
									<span class="bigger-110">Action</span>

									<i class="ace-icon fa fa-caret-down icon-on-right"></i>
								</button>

								<ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125">
									<li>
										<a href="#">
											<i class="ace-icon fa fa-mail-reply blue"></i>&nbsp; Reply
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-mail-forward green"></i>&nbsp; Forward
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-folder-open orange"></i>&nbsp; Archive
										</a>
									</li>

									<li class="divider"></li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-eye blue"></i>&nbsp; Mark as read
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-eye-slash green"></i>&nbsp; Mark unread
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-flag-o red"></i>&nbsp; Flag
										</a>
									</li>

									<li class="divider"></li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-trash-o red bigger-110"></i>&nbsp; Delete
										</a>
									</li>
								</ul>
							</div>

							<div class="inline position-relative align-left">
								<button type="button" class="btn-white btn-primary btn btn-xs dropdown-toggle" data-toggle="dropdown">
									<i class="ace-icon fa fa-folder-o bigger-110 blue"></i>
									<span class="bigger-110">Move to</span>

									<i class="ace-icon fa fa-caret-down icon-on-right"></i>
								</button>

								<ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125">
									<li>
										<a href="#">
											<i class="ace-icon fa fa-stop pink2"></i>&nbsp; Tag#1
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-stop blue"></i>&nbsp; Family
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-stop green"></i>&nbsp; Friends
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-stop grey"></i>&nbsp; Work
										</a>
									</li>
								</ul>
							</div>

							<button type="button" class="btn btn-xs btn-white btn-primary">
								<i class="ace-icon fa fa-trash-o bigger-125 orange"></i>
								<span class="bigger-110">Delete</span>
							</button>
						</div>
					</div>

					<div>
						<div class="messagebar-item-left">
							<label class="inline middle">
								<input type="checkbox" id="id-toggle-all" class="ace" />
								<span class="lbl"></span>
							</label>

							&nbsp;
							<div class="inline position-relative">
								<a href="#" data-toggle="dropdown" class="dropdown-toggle">
									<i class="ace-icon fa fa-caret-down bigger-125 middle"></i>
								</a>

								<ul class="dropdown-menu dropdown-lighter dropdown-100">
									<li>
										<a id="id-select-message-all" class=select-message href="#">All</a>
									</li>

									<li>
										<a id="id-select-message-none" class=select-message href="#">None</a>
									</li>

									<li class="divider"></li>

									<li>
										<a id="id-select-message-unread" class=select-message href="#">Unread</a>
									</li>

									<li>
										<a id="id-select-message-read" class=select-message href="#">Read</a>
									</li>
								</ul>
							</div>
						</div>

						<div class="messagebar-item-right">
							<div class="inline position-relative">
								<a href="#" data-toggle="dropdown" class="dropdown-toggle">
									Sort &nbsp;
									<i class="ace-icon fa fa-caret-down bigger-125"></i>
								</a>

								<ul class="dropdown-menu dropdown-lighter dropdown-menu-right dropdown-100">
									<li>
										<a class=orderby href="#date">
											<i class="ace-icon fa fa-check <%"time" === d.pageSort ? "green" : "invisible"%>"></i>
											Date
										</a>
									</li>

									<li>
										<a class=orderby href="#from">
											<i class="ace-icon fa fa-check <%"from" === d.pageSort ? "green" : "invisible"%>"></i>
											From
										</a>
									</li>

									<li>
										<a class=orderby href="#subject">
											<i class="ace-icon fa fa-check <%"subject" === d.pageSort ? "green" : "invisible"%>"></i>
											Subject
										</a>
									</li>
								</ul>
							</div>
						</div>

						<!-- #section:pages/inbox.navbar-search -->
						<!-- <div class="nav-search minimized"> -->
						<div class=nav-search>
							<form class="form-search">
								<span class="input-icon">
									<input type="text" autocomplete="off" class="input-small nav-search-input" placeholder="Search inbox ..." value=<%d.search%> >
									<i class="ace-icon fa fa-search nav-search-icon"></i>
								</span>
							</form>
						</div>

						<!-- /section:pages/inbox.navbar-search -->
					</div>
				</div>

				<div id="id-message-item-navbar" class="hide message-navbar clearfix">
					<div class="message-bar">
						<div class="message-toolbar">
							<div class="inline position-relative align-left">
								<button type="button" class="btn-white btn-primary btn btn-xs dropdown-toggle" data-toggle="dropdown">
									<span class="bigger-110">Action</span>

									<i class="ace-icon fa fa-caret-down icon-on-right"></i>
								</button>

								<ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125">
									<li>
										<a href="#">
											<i class="ace-icon fa fa-mail-reply blue"></i>&nbsp; Reply
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-mail-forward green"></i>&nbsp; Forward
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-folder-open orange"></i>&nbsp; Archive
										</a>
									</li>

									<li class="divider"></li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-eye blue"></i>&nbsp; Mark as read
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-eye-slash green"></i>&nbsp; Mark unread
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-flag-o red"></i>&nbsp; Flag
										</a>
									</li>

									<li class="divider"></li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-trash-o red bigger-110"></i>&nbsp; Delete
										</a>
									</li>
								</ul>
							</div>

							<div class="inline position-relative align-left">
								<button type="button" class="btn-white btn-primary btn btn-xs dropdown-toggle" data-toggle="dropdown">
									<i class="ace-icon fa fa-folder-o bigger-110 blue"></i>
									<span class="bigger-110">Move to</span>

									<i class="ace-icon fa fa-caret-down icon-on-right"></i>
								</button>

								<ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125">
									<li>
										<a href="#">
											<i class="ace-icon fa fa-stop pink2"></i>&nbsp; Tag#1
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-stop blue"></i>&nbsp; Family
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-stop green"></i>&nbsp; Friends
										</a>
									</li>

									<li>
										<a href="#">
											<i class="ace-icon fa fa-stop grey"></i>&nbsp; Work
										</a>
									</li>
								</ul>
							</div>

							<button type="button" class="btn btn-xs btn-white btn-primary">
								<i class="ace-icon fa fa-trash-o bigger-125 orange"></i>
								<span class="bigger-110">Delete</span>
							</button>
						</div>
					</div>

					<div>
						<div class="messagebar-item-left">
							<a href="#" class="btn-back-message-list">
								<i class="ace-icon fa fa-arrow-left blue bigger-110 middle"></i>
								<b class="bigger-110 middle">Back</b>
							</a>
						</div>

						<div class="messagebar-item-right">
							<i class="ace-icon fa fa-clock-o bigger-110 orange"></i>
							<span class="grey">Today, 7:15 pm</span>
						</div>
					</div>
				</div>

				<div id="id-message-new-navbar" class="hide message-navbar clearfix">
					<div class="message-bar">
						<div class="message-toolbar">
							<button type="button" class="btn btn-xs btn-white btn-primary">
								<i class="ace-icon fa fa-floppy-o bigger-125"></i>
								<span class="bigger-110">Save Draft</span>
							</button>

							<button type="button" class="btn btn-xs btn-white btn-primary">
								<i class="ace-icon fa fa-times bigger-125 orange2"></i>
								<span class="bigger-110">Discard</span>
							</button>
						</div>
					</div>

					<div>
						<div class="messagebar-item-left">
							<a href="#" class="btn-back-message-list">
								<i class="ace-icon fa fa-arrow-left bigger-110 middle blue"></i>
								<b class="middle bigger-110">Back</b>
							</a>
						</div>

						<div class="messagebar-item-right">
							<span class="inline btn-send-message">
								<button type="button" class="btn btn-sm btn-primary no-border btn-white btn-round">
									<span class="bigger-110">Send</span>

									<i class="ace-icon fa fa-arrow-right icon-on-right"></i>
								</button>
							</span>
						</div>
					</div>
				</div>

				<!-- /section:pages/inbox.navbar -->
				<div class="message-list-container">
				</div>

				<!-- #section:pages/inbox.message-footer -->
				<div class="message-footer clearfix">
					<div class="pull-left"> <%d.inbox.length()%> messages total </div>

					<div class="pull-right">
						<div class="inline middle"> page <%d.pageIndex%> of <%d.pageMax%> </div>

						&nbsp; &nbsp;
						<ul class="pagination middle">
							<li class="<%1 === d.pageIndex ? "disabled" : ""%>">
								<a href="#first">
									<i class="ace-icon fa fa-step-backward middle"></i>
								</a>
							</li>

							<li class="<%1 === d.pageIndex ? "disabled" : ""%>">
								<a href="#prev">
									<i class="ace-icon fa fa-caret-left bigger-140 middle"></i>
								</a>
							</li>

							<li>
								<span>
									<input value=<%d.pageIndex%> maxlength=<%d.pageMax%> type=text />
								</span>
							</li>

							<li class="<%d.pageMax === d.pageIndex ? "disabled" : ""%>">
								<a href="#next">
									<i class="ace-icon fa fa-caret-right bigger-140 middle"></i>
								</a>
							</li>

							<li class="<%d.pageMax === d.pageIndex ? "disabled" : ""%>">
								<a href="#last">
									<i class="ace-icon fa fa-step-forward middle"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div class="hide message-footer message-footer-style2 clearfix">
					<div class="pull-left"> simpler footer </div>

					<div class="pull-right">
						<div class="inline middle"> message 1 of 151 </div>

						&nbsp; &nbsp;
						<ul class="pagination middle">
							<li class="disabled">
								<span>
									<i class="ace-icon fa fa-angle-left bigger-150"></i>
								</span>
							</li>

							<li>
								<a href="#">
									<i class="ace-icon fa fa-angle-right bigger-150"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>

				<!-- /section:pages/inbox.message-footer -->
			</div>
		</div>
	</div><!-- /.tab-content -->
</div><!-- /.tabbable -->

<!-- /section:pages/inbox -->
