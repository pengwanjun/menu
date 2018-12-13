//Channel Edit detail
var channelEditDetail = {
	prevValue:{},
	prevPage: '',
	prevPageIndex: '',
	render: function(value, page, index,curItem) {
		this.prevValue=value;
		this.prevPage=page;
		this.prevPageIndex = index;
		var html = `<div id="channelEditDetail">
				<div class="listItem">
					<div>Network Name:</div>
					<div>ABC Sydney</div>
				</div>
				<div class="opera listItem focus">
					<div>Channel Number:</div>
					<div>${curItem.name}</div>
				</div>
				<div class="opera listItem">
					<div>Channel Name:</div>
					<div>${curItem.value}</div>
				</div>
				<div class="disabled listItem">
					<div>Frequency</div>
					<div>730</div>
				</div>
				<div class="disabled listItem">
					<div>Color System</div>
					<div>Auto</div>
				</div>
				<div class="disabled listItem">
					<div>Sound System</div>
					<div>B/G</div>
				</div>
				<div class="opera listItem delete">
					<div>Delete</div>
					<div>>></div>
				</div>
			</div>`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		let curFocus = document.querySelector(".focus");
		let curList = curFocus.parentElement.children;
		let curIndex = [].indexOf.call(curList, curFocus);
		let nextIndex;
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				for(let i = 0; i < curList.length; i++) {
					if(hasClass(curList[i], 'opera')) {
						nextIndex = i;
						break;
					}
				}
			} else {
				for(let j = curIndex + 1; j < curList.length; j++) {
					if(hasClass(curList[j], 'opera')) {
						nextIndex = j;
						break;
					}
				}
				if(nextIndex === undefined) {
					for(let k = 0; k <= curIndex; k++) {
						if(hasClass(curList[k], 'opera')) {
							nextIndex = k;
							break;
						}
					}
				}
			}
			removeClass(curList[curIndex], 'focus');
			addClass(curList[nextIndex], 'focus');
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				for(let i = curList.length - 1; i >= 0; i--) {
					if(hasClass(curList[i], 'opera')) {
						nextIndex = i;
						break;
					}
				}
			} else {
				for(let j = curIndex - 1; j >= 0; j--) {
					if(hasClass(curList[j], 'opera')) {
						nextIndex = j;
						break;
					}
				}
				if(nextIndex === undefined) {
					for(let k = curList.length - 1; k >= curIndex; k--) {
						if(hasClass(curList[k], 'opera')) {
							nextIndex = k;
							break;
						}
					}
				}
			}
			removeClass(curList[curIndex], 'focus');
			addClass(curList[nextIndex], 'focus');
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {

		}
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {

		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(hasClass(curList[curIndex], 'delete')) {
				console.log(curList[curIndex]);
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			gMenuPageName = 'channelSkip';
			channelSkip.page=this.prevPage;
			channelSkip.cIndex=this.prevPageIndex;
			channelSkip.render(this.prevValue);
		}
	}
}
