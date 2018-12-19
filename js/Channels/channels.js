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

//Channel Edit detail
var channelEditDetail = {
	prevValue: {},
	prevPage: '',
	prevPageIndex: '',
	render: function(value, page, index, curItem) {
		this.prevValue = value;
		this.prevPage = page;
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
			channelSkip.page = this.prevPage;
			channelSkip.focusIndex = this.prevPageIndex;
			channelSkip.render(this.prevValue);
		}
	}
}

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

//Channel Skip

var channelSkip = {
	pageName:'',
	list: [],
	page: 0,
	value: [],
	focusIndex: 0,
	channelSkipBit: 8,
	channelBlockBit: 256,
	render: function(name) {
		this.pageName = name;
		window.gSocket.send({
			"method": "mtk.webui.channelList.queryChannelList"
		}, function(data) {
			this.value = data.result.List;
			this.list = sliceArr(this.value, 9);
			this.renderData(this.focusIndex);
		}.bind(this));
	},
	renderData: function(fIndex) {
		let html = '<div id="channelSkip"><div class="channelSkip">';
		for(let i = 0; i < this.list[this.page].length; i++) {
			if(this.pageName == 'gMenuTvChannelSkip') { //ChannelSkip
				if(this.checkChannelSkip(parseInt(this.list[this.page][i].nwMask))) {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div>${this.list[this.page][i].majorNum}</div>
							<div>${this.list[this.page][i].brdcstType}</div>
							<div>${this.list[this.page][i].acName}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div>${this.list[this.page][i].majorNum}</div>
							<div>${this.list[this.page][i].brdcstType}</div>
							<div>${this.list[this.page][i].acName}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					}
				} else {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div>${this.list[this.page][i].majorNum}</div>
							<div>${this.list[this.page][i].brdcstType}</div>
							<div>${this.list[this.page][i].acName}</div>
							<div class="sel">未选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div>${this.list[this.page][i].majorNum}</div>
							<div>${this.list[this.page][i].brdcstType}</div>
							<div>${this.list[this.page][i].acName}</div>
							<div class="sel">未选中</div>
						</div>`;
					}
				}
			} else if(this.pageName == 'gMenuTvChannelSort') { //ChannelSort
				if(this.list[this.page][i].sel) {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div>${this.list[this.page][i].majorNum}</div>
							<div>${this.list[this.page][i].brdcstType}</div>
							<div>${this.list[this.page][i].acName}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div>${this.list[this.page][i].majorNum}</div>
							<div>${this.list[this.page][i].brdcstType}</div>
							<div>${this.list[this.page][i].acName}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					}
				} else {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div>${this.list[this.page][i].majorNum}</div>
							<div>${this.list[this.page][i].brdcstType}</div>
							<div>${this.list[this.page][i].acName}</div>
							<div class="sel">未选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div>${this.list[this.page][i].majorNum}</div>
							<div>${this.list[this.page][i].brdcstType}</div>
							<div>${this.list[this.page][i].acName}</div>
							<div class="sel">未选中</div>
						</div>`;
					}
				}
			} else if(this.pageName == 'gMenuTvChannelEdit') { //ChannelEdit
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div>${this.list[this.page][i].majorNum}</div>
							<div>${this.list[this.page][i].brdcstType}</div>
							<div>${this.list[this.page][i].acName}</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div>${this.list[this.page][i].majorNum}</div>
							<div>${this.list[this.page][i].brdcstType}</div>
							<div>${this.list[this.page][i].acName}</div>
						</div>`;
				}
			} else if(this.pageName == 'gMenuTvAnalogChannel') { //analogChannelFineTune
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
			} else { //gMenuParentalChannelBlock
				if(this.checkChannelBlock(parseInt(this.list[this.page][i].nwMask))) {
					if(i == fIndex) {
						html += `<div class="listItem focus">
										<div>${this.list[this.page][i].majorNum}</div>
										<div>${this.list[this.page][i].brdcstType}</div>
										<div>${this.list[this.page][i].acName}</div>
										<div class="sel hasSel">选中</div>
									</div>`;
					} else {
						html += `<div class="listItem">
										<div>${this.list[this.page][i].majorNum}</div>
										<div>${this.list[this.page][i].brdcstType}</div>
										<div>${this.list[this.page][i].acName}</div>
										<div class="sel hasSel">选中</div>
									</div>`;
					}
				} else {
					if(i == fIndex) {
						html += `<div class="listItem focus">
										<div>${this.list[this.page][i].majorNum}</div>
										<div>${this.list[this.page][i].brdcstType}</div>
										<div>${this.list[this.page][i].acName}</div>
										<div class="sel">未选中</div>
									</div>`;
					} else {
						html += `<div class="listItem">
										<div>${this.list[this.page][i].majorNum}</div>
										<div>${this.list[this.page][i].brdcstType}</div>
										<div>${this.list[this.page][i].acName}</div>
										<div class="sel">未选中</div>
									</div>`;
					}
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
				this.focusIndex = 0;
				this.renderData(this.focusIndex);
			} else {
				this.focusIndex++;
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
				this.focusIndex = this.list[this.page].length - 1;
				this.renderData(this.focusIndex);
			} else {
				this.focusIndex--;
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
				this.focusIndex = this.list[this.page].length - 1;
				this.renderData(this.focusIndex);
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
				this.focusIndex = 0;
				this.renderData(this.focusIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[0], 'focus');
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(this.pageName == 'gMenuTvChannelSkip'||this.pageName == 'gMenuTvChannelBlock'){
				var curData = this.list[this.page][curIndex];
				if(this.pageName == 'gMenuTvChannelSkip') {
					if(this.checkChannelSkip(curData.nwMask)) {
						curData.nwMask = this.setChannelUnSkip(curData.nwMask);
					} else {
						curData.nwMask = this.setChannelSkip(curData.nwMask);
					}
				} else {
					if(this.checkChannelBlock(curData.nwMask)) {
						curData.nwMask = this.setChannelUnBlock(curData.nwMask);
					} else {
						curData.nwMask = this.setChannelBlock(curData.nwMask);
					}
				}
				var msg = {
					"params": {
						"operator": "UPDATA",
						"List": [{
							"svlRecId": curData.svlRecId,
							"nwMask": curData.nwMask
						}]
					},
					"method": "mtk.webui.channelList.setSvlTslRec"
				}
				window.gSocket.send(msg, function(data) {
					if(data.error.code == 0) {
						this.focusIndex = curIndex;
						this.render(this.pageName);
					}
				}.bind(this));
			}
			if(this.pageName == 'gMenuTvChannelSort') {

			} 
			if(this.pageName == 'gMenuTvChannelEdit') {
				gMenuPageName = 'channelEditDetail';
				channelEditDetail.render(this.value, this.page, this.focusIndex, this.list[this.page][this.focusIndex]);
			} 
			if(this.pageName == 'gMenuTvAnalogChannel') { //Analog Channel Fine Tune

			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			this.page = 0;
			returnListPage(curIndex);
		}
	},
	checkChannelBlock: function(nwMask) {
		if((nwMask & this.channelBlockBit) == this.channelBlockBit) {
			return true;
		}
		return false;
	},
	setChannelBlock: function(nwMask) {
		return nwMask | this.channelBlockBit;
	},
	setChannelUnBlock: function(nwMask) {
		return nwMask & (~this.channelBlockBit);
	},
	checkChannelSkip: function(nwMask) {
		if((nwMask & this.channelSkipBit) == this.channelSkipBit) {
			return true;
		}
		return false;
	},
	setChannelSkip: function(nwMask) {
		return nwMask | this.channelSkipBit;
	},
	setChannelUnSkip: function(nwMask) {
		return nwMask & (~this.channelSkipBit);
	}
}

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

//Update Scan
var updateScan = {
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