//Analog Manual Scan
var analogManualScan = {
	render: function(value) {
		var html = `<div class="analogManualScan">
						<div>Search for analog channels</div>
						<div>
							<div class="listItem focus">Start Frequency (MHz) : <span class="input">42.00</span></div>
							<div class="listItem">Scan Up >></div>
							<div class="listItem">Scan Down >></div>
						</div>
					</div>`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				removeClass(curList[curList.length - 1], 'focus');
				addClass(curList[0], 'focus');
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				removeClass(curList[0], 'focus');
				addClass(curList[curList.length - 1], 'focus');
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			//开始扫台
			if(curIndex == 1) {
				console.log('Scan Up');
			}
			if(curIndex == 2) {
				console.log('Scan Down');
			}
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(curIndex == 0) {
				var inputVal = document.querySelector('.input').innerHTML.split('.')[0];
				if(inputVal.length < 3) {
					inputVal += e.key;
				} else {
					inputVal = e.key;
				}
				document.querySelector('.input').innerHTML = inputVal + '.00';
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
