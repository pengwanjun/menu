//Channel Skip

var channelSkip = {
	list: [],
	page: 0,
	value: [],
	cIndex: 0,
	render: function(value) {
		this.value = value;
		this.list = sliceArr(this.value.data.data, 9);
		this.renderData(this.cIndex);
	},
	renderData: function(fIndex) {
		let html = '<div id="channelSkip"><div class="channelSkip">';
		for(let i = 0; i < this.list[this.page].length; i++) {
			if(this.value.data.name == 'gMenuTvChannelSkip') { //ChannelSkip
				if(this.list[this.page][i].sel) {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].type}</div>
							<div>${this.list[this.page][i].value}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].type}</div>
							<div>${this.list[this.page][i].value}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					}
				} else {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].type}</div>
							<div>${this.list[this.page][i].value}</div>
							<div class="sel">未选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].type}</div>
							<div>${this.list[this.page][i].value}</div>
							<div class="sel">未选中</div>
						</div>`;
					}
				}
			} else if(this.value.data.name == 'gMenuTvChannelSort') { //ChannelSort
				if(this.list[this.page][i].sel) {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].type}</div>
							<div>${this.list[this.page][i].value}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].type}</div>
							<div>${this.list[this.page][i].value}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					}
				} else {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].type}</div>
							<div>${this.list[this.page][i].value}</div>
							<div class="sel">未选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].type}</div>
							<div>${this.list[this.page][i].value}</div>
							<div class="sel">未选中</div>
						</div>`;
					}
				}
			} else if(this.value.data.name == 'gMenuTvChannelEdit') { //ChannelEdit
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].type}</div>
							<div>${this.list[this.page][i].value}</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].type}</div>
							<div>${this.list[this.page][i].value}</div>
						</div>`;
				}
			} else { //analogChannelFineTune
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].value}</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div>${this.list[this.page][i].name}</div>
							<div>${this.list[this.page][i].value}</div>
						</div>`;
				}
			}
		}
		document.querySelector('#container').innerHTML = html + '</div></div>';
	},
	keyEvent: function(e) {
		let curFocus = document.querySelector(".focus");
		let curList = curFocus.parentElement.children;
		let curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				if(this.page == this.list.length - 1) {
					this.page = 0;
				} else {
					this.page++;
				}
				this.cIndex = 0;
				this.renderData(this.cIndex);
			} else {
				this.cIndex++;
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
				this.cIndex = this.list[this.page].length - 1;
				this.renderData(this.cIndex);
			} else {
				this.cIndex--;
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
				this.cIndex = this.list[this.page].length - 1;
				this.renderData(this.cIndex);
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
				this.cIndex = 0;
				this.renderData(this.cIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[0], 'focus');
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(this.value.data.name == 'gMenuTvChannelSkip') {

			} else if(this.value.data.name == 'gMenuTvChannelSort') {

			} else if(this.value.data.name == 'gMenuTvChannelEdit') {
				gMenuPageName = 'channelEditDetail';
				channelEditDetail.render(this.value, this.page, this.cIndex, this.list[this.page][this.cIndex]);
			} else { //Analog Channel Fine Tune

			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			this.page = 0;
			returnListPage(curIndex);
		}
	}
}