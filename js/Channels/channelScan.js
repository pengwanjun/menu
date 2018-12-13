//Channel Scan
var channelScan = {
	render: function(value) {
		var html = '';
		for(var k in value.data) {
			html += '<div class="channelScan">' + k + '：' + value.data[k] + '</div>';
		}
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
