var divXRegistration = {
	render: function() {
		var html = `
		<div id="divXRegistration">
			<div>You register your device to play DivX® protected videos.</div>
			<div>Register Code:7QBUBDC7GV</div>
			<div>Registration http://vod.divx.com</div>
			<div class="sure">OK</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			document.querySelector('#container').innerHTML = `
				<div id="list">
					<div class="firstList">
					</div>
					<div class="secondList">
					</div>
				</div>
			`;
			gMenuRenderFirst();
			gMenuRenderSecond();
			addClass(document.querySelector('.' + gMenuClassName + '').children[gMenuoIndex], 'focus');
			changePage(gMenuoIndex, gMenuClassName);
			gMenuPageName = 'list';
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
