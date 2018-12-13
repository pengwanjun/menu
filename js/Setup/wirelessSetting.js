var wirelessSetting = {
	render: function() {
		var html = `
		<div id="wirelessSetting">
			<div>Wireless Setting</div>
			<div>There is no wireless device connected to TV!</div>
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