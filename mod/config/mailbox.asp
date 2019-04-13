<form class="form-horizontal" role="form">
	<!-- #section:elements.form -->
	<div class="form-group">
		<label class="col-sm-3 control-label no-padding-right" for="region"> Region </label>

		<div class="col-sm-9">
			<input type="text" id="region" placeholder="ap-southeast-1" class="col-xs-10 col-sm-5" />
		</div>
	</div>

	<div class="form-group">
		<label class="col-sm-3 control-label no-padding-right" for="Bucket"> S3 Bucket Name </label>

		<div class="col-sm-9">
			<input type="text" id="Bucket" placeholder="my-mailbox-bucket" class="form-control" />
		</div>
	</div>

	<!-- /section:elements.form -->
	<div class="space-4"></div>

	<div class="form-group">
		<label class="col-sm-3 control-label no-padding-right" for="IdentityPoolId"> Cognito Identity Pool Id</label>

		<div class="col-sm-9">
			<input type="text" id="IdentityPoolId" placeholder="ap-southeast-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" class="col-xs-10 col-sm-5" />
			<span class="help-inline col-xs-12 col-sm-7">
				<span class="middle">Inline help text</span>
			</span>
		</div>
	</div>

	<div class="space-4"></div>

	<div class="form-group">
		<label class="col-sm-3 control-label no-padding-right" for="UserPoolId"> Cognito User Pool Id </label>

		<div class="col-sm-9">
			<input readonly="" type="text" class="col-xs-10 col-sm-5" id="UserPoolId" placeholder="ap-southeast-1_xxxxxxxxx" />
			<span class="help-inline col-xs-12 col-sm-7">
				<label class="middle">
					<input class="ace" type="checkbox" id="id-disable-check" />
					<span class="lbl"> Disable it!</span>
				</label>
			</span>
		</div>
	</div>

	<div class="space-4"></div>

	<div class="form-group">
		<label class="col-sm-3 control-label no-padding-right" for="ClientId"> Client Id </label>

		<div class="col-sm-9">
			<input class="input-sm" type="text" id="ClientId" placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxx" />
			<div class="space-2"></div>

			<div class="help-block" id="input-size-slider"></div>
		</div>
	</div>

	<div class="clearfix form-actions">
		<div class="col-md-offset-3 col-md-9">
			<button class="btn btn-info" type="button">
				<i class="ace-icon fa fa-check bigger-110"></i>
				Submit
			</button>

			&nbsp; &nbsp; &nbsp;
			<button class="btn" type="reset">
				<i class="ace-icon fa fa-undo bigger-110"></i>
				Reset
			</button>
		</div>
	</div>
</form>
