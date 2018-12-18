//Input Block

var inputBlock = {
	list: [],
	page: 0,
	value: [],
	focusIndex:0,
	render: function() {
		window.gSocket.send({
			"method": "mtk.webui.input.querySourceInfo"
		}, function(data) {
			this.value = data.result.List;
			this.list = sliceArr(this.value, 9);
			this.renderData(this.focusIndex);
		}.bind(inputBlock));
	},
	renderData: function(fIndex) {
		var html = '<div id="channelSkip"><div class="channelSkip">';
		for(var i = 0; i < this.list[this.page].length; i++) {
			if(this.list[this.page][i].block) {
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div>${this.list[this.page][i].index}</div>
							<div>${this.list[this.page][i].name}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div>${this.list[this.page][i].index}</div>
							<div>${this.list[this.page][i].name}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
				}
			} else {
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div>${this.list[this.page][i].index}</div>
							<div>${this.list[this.page][i].name}</div>
							<div class="sel">未选中</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div>${this.list[this.page][i].index}</div>
							<div>${this.list[this.page][i].name}</div>
							<div class="sel">未选中</div>
						</div>`;
				}
			}
		}
		document.querySelector('#container').innerHTML = html + '</div></div>';
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				if(this.page == this.list.length - 1) {
					this.page = 0;
				} else {
					this.page++;
				}
				this.listIndex = 0;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				if(this.page == 0) {
					this.page = this.list.length - 1;
				} else {
					this.page--;
				}
				this.listIndex = this.list[this.page].length - 1;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(curIndex == curList.length - 1) {
				if(this.page == this.list.length - 1) {
					this.page = 0;
				} else {
					this.page++;
				}
				this.listIndex = this.list[this.page].length - 1;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curList.length - 1], 'focus');
			}
		}
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(curIndex == 0) {
				if(this.page == 0) {
					this.page = this.list.length - 1;
				} else {
					this.page--;
				}
				this.listIndex = 0;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[0], 'focus');
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			var msg = {
				"method": "mtk.webui.input.blockSource",
				"params": {
					"sourceId": this.list[this.page][curIndex].index,
					"block": !this.list[this.page][curIndex].block
				}
			}
			window.gSocket.send(msg, function(data) {
				if(data.error.code==0){
					this.focusIndex=curIndex;
					this.render();
				}
			}.bind(inputBlock));
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}