var addBissKey={
	render: function() {
		var html = `
		<div id="addBissKey">
			<div class="listItem focus">
				<div>Frequency</div>
				<div>输入框</div>
			</div>
			<div class="listItem">
				<div>Symbol Rate(Ksym/s)</div>
				<div>输入框</div>
			</div>
			<div class="listItem">
				<div>Polarization</div>
				<div>选项</div>
			</div>
			<div class="listItem">
				<div>Service ID</div>
				<div>输入框</div>
			</div>
			<div class="listItem">
				<div>CW key</div>
				<div>输入框</div>
			</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			returnListPage();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}