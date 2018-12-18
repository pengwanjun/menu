var bissKey={
	render: function() {
		var html = `
		<div id="bissKey">
			<div class="listItem focus">Add BISS key.</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			addBissKey.render();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
