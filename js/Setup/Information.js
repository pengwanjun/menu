var Information = {
	render: function() {
		var html = `
		<div id="Information">
			<div>
				<span>Interface</span>
				<span>Wireless</span>
			</div>
			<div>
				<span>Address Type</span>
				<span>AUTO</span>
			</div>
			<div>
				<span>IP Address</span>
				<span>Automatic</span>
			</div>
			<div>
				<span>Subnet Mask</span>
				<span>Automatic</span>
			</div>
			<div>
				<span>Default Gateway</span>
				<span>Automatic</span>
			</div>
			<div>
				<span>Primary DNS</span>
				<span>Automatic</span>
			</div>
			<div>
				<span>Secondary DNS</span>
				<span>Automatic</span>
			</div>
			<div>
				<span>Ethernet MAC</span>
				<span>00:0C:E7:06:00:00</span>
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