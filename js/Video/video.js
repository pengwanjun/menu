

var visuallyImpairedAudio={
	render: function() {
		var html = `
		<div id="visuallyImpaired">
			<div>Eng</div>
		</div>
	`;
		document.querySelector('#showList').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			reRenderList();
		}
	}
}

