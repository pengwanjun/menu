var camMenu = {
	render: function() {
		var html = `
		<div id="camMenu">
			<div class="listItem focus">No CI card presented.</div>
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