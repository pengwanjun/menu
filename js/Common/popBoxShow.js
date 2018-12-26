//渲染数据
var popBoxShow = {
	pageName: '',
	render: function(pName) {
		console.log(pName);
		this.pageName = pName;
		var html = `
		<div id="popBoxShow">
			<div class="popBoxShow">
				<div>Are you sure?</div>
				<div class="btn">
					<div class="sure">OK</div>
					<div class="cancel focus">Cancel</div>
				</div>
			</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".focus");
		var curList = document.querySelector(".btn").children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(curIndex != 0) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(curIndex != curList.length - 1) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(hasClass(curFocus, 'cancel')) {
				returnListPage();
			} else {
				if(this.pageName == 'gMenuCleanChannelList') { //Clean Channel List
					var msg = {
						"params": {
							"SvlId": 1,
							"cleanLol": true
						},
						"method": "mtk.webui.channelList.cleanChannellist"
					}
					window.gSocket.send(msg, function(data) {
						if(data.error.code == 0) {
							for(var i = 0; i < gMenuTvChannels.length; i++) {
								if(gMenuTvChannels[i].name == 'Channel Skip' || gMenuTvChannels[i].name == 'Channel Sort' ||
									gMenuTvChannels[i].name == 'Channel Edit' || gMenuTvChannels[i].name == 'Analog Channel Fine Tune' ||
									gMenuTvChannels[i].name == 'Clean Channel List') {
									gMenuTvChannels[i].opera = false;
								}
							}
							gMenuoIndex = 0;
							returnListPage();
						}
					});
				}
				if(this.pageName=='cleanAll'){  //Clean All
					
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

//增减
var showNum = {
	render: function() {
		var html = `
			<div id="showNum">
				<div>${gMenuChild.data[gMenuoIndex].name}</div>
				<div>
					<span>Min</span>
					<div class="progress" style="margin: 20px 30px;">
						<div style="left:${(gMenuChild.data[gMenuoIndex].value.data - gMenuChild.data[gMenuoIndex].value.min) / (gMenuChild.data[gMenuoIndex].value.max - gMenuChild.data[gMenuoIndex].value.min) * 100-4}px" class="front focus"></div>
					</div>
					<span>Max</span>
					<span style="margin-left: 40px;">${gMenuChild.data[gMenuoIndex].value.data}</span>
				</div>
				<div class="operate">
					<div class="left">Adjust</div>
					<div class="right">Back</div>
				</div>
			</div>
		`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(gMenuChild.data[gMenuoIndex].value.data < gMenuChild.data[gMenuoIndex].value.max) {
				window.gSocket.send(gMenuChild.data[gMenuoIndex].msg('set',++gMenuChild.data[gMenuoIndex].value.data), function(data) {
					if(data.error.code == 0) {
						gMenuChild.data[gMenuoIndex].getCallback(data);
					}
				});
				this.render();
			}
		}
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(gMenuChild.data[gMenuoIndex].value.data > gMenuChild.data[gMenuoIndex].value.min) {
				window.gSocket.send(gMenuChild.data[gMenuoIndex].msg('set',--gMenuChild.data[gMenuoIndex].value.data), function(data) {
					if(data.error.code == 0) {
						gMenuChild.data[gMenuoIndex].getCallback(data);
					}
				});
				this.render();
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

//选项选择
var showSelect = {
	render: function() {
		var html1 = `
			<div id="showNum">
				<div>${gMenuChild.data[gMenuoIndex].name}</div>
				<div class="selectBox">
				<div class="selectList">
		`;
		var html2 = `
				</div>
				</div>
				<div class="operate">
					<div class="left">Change</div>
					<div class="right">Back</div>
				</div>	
			</div>
			`;
		var html = ``;
		for(var i = 0; i < gMenuChild.data[gMenuoIndex].value.data.length; i++) {
			if(i == gMenuChild.data[gMenuoIndex].curVal) {
				html += `
					<div class="listItem focus">${gMenuChild.data[gMenuoIndex].value.data[i]}</div>		
				`;
			} else {
				html += `
					<div class="listItem">${gMenuChild.data[gMenuoIndex].value.data[i]}</div>		
				`;
			}
		}
		document.querySelector('#container').innerHTML = html1 + html + html2;
		this.changePage(gMenuChild.data[gMenuoIndex].curVal);
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".listItem.focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[0], 'focus');
				document.querySelector('.selectList').style.top = '0px';
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex + 1], 'focus');
				this.changePage(curIndex+1);
			}
		}
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curList.length-1], 'focus');
				this.changePage(curList.length-1);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
				this.changePage(curIndex-1);
			}
		}
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			window.gSocket.send(gMenuChild.data[gMenuoIndex].msg('set',curIndex),function(data){
				if(data.error.code==0){
					if(gMenuChild.data[gMenuoIndex].name=='Internet Connection'){
						if(gMenuChild.data[gMenuoIndex].value.data.length>1){
							gMenuChild.data[gMenuoIndex].setCallback(data,curIndex);
						}
					}else if(gMenuChild.data[gMenuoIndex].name=='Interface'){
						gMenuChild.data[gMenuoIndex].setCallback(data,curIndex);
					}else{
						gMenuChild.data[gMenuoIndex].setCallback(data);
					}
				}
			});
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	},
	changePage: function(index) {
//		var itemHeight = document.querySelector(".listItem.focus").offsetHeight;
		var floorIndex = Math.floor(index / 4);
		document.querySelector('.selectList').style.top = -(floorIndex * 4 * Number(40)) + 'px';
	}
}