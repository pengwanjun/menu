var IPSetting = {
	render: function() {
		var html = `
		<div id="IPSetting">
			
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