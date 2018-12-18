var versionInfo={
	render: function() {
		var html = `
		<div id="versionInfo">
			<div class="versionInfo">
				<div>Model Name:</div>
				<div>eu_linux</div>
			</div>
			<div class="versionInfo">
				<div>Version:</div>
				<div></div>
			</div>
			<div class="versionInfo">
				<div>Serial Number:</div>
				<div></div>
			</div>
			<div class="versionInfo">
				<div>Website:</div>
				<div></div>
			</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
