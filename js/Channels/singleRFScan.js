//Single RF Scan
var singleRFScan = {
	render: function(value) {
		var html = `<div class="analogManualScan">
						<div>
							<div>Scan single RF channel. (Digital Only)</div>
							<div>进度条: 58%</div>
							<div>Antenna</div>
						</div>
						<div>
							<div class="listItem focus">RF Channel: 55</div>
							<div class="listItem">进度条: 0%</div>
							<div class="listItem">进度条: 100%</div>
						</div>
					</div>`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {

		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
