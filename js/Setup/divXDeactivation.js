
var divXDeactivation = {
	render: function(value) {
		if(gMenuPageName == 'divXDeactivationOk') {
			var html = `
		<div id="divXRegistration">
			<div>You must register your device to play DivX® protected videos.</div>
			<div>Registration Code:</div>
			<div>Register at http://vod.divx.com</div>
			<div class="sure">OK</div>
		</div>
	`;
		} else {
			var html = `
		<div id="divXDeactivation">
			<div>Deregistration code:</div>
			<div>Deregister at http://vod.divx.com</div>
			<div>Continue width registration?</div>
			<div class="btn">
				<span class="item focus ok">OK</span>
				<span class="item cancel">Cancel</span>
			</div>
		</div>
	`;
		}
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		console.log(gMenuPageName);
		var curFocus = document.querySelector(".focus");
		var curList = document.querySelector(".btn").children;
		var curIndex = [].indexOf.call(curList, curFocus);
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(curIndex == 0) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curList.length - 1], 'focus');
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(curIndex == curList.length - 1) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[0], 'focus');
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(hasClass(curFocus, 'cancel')) {
				returnListPage();
			} else {
				gMenuPageName = 'divXDeactivationOk';
				this.render();
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	},
	keyEventOK: function(e) {
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
