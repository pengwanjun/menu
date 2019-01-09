//渲染数据
var popBoxShow = {
	pageName: '',
	render: function(pName) {
		console.log(pName);
		this.pageName = pName;
		if(this.pageName=='WFD'){
			var html = `
				<div id="popBoxShow">
					<div class="popBoxShow">
						<div>Wi-Fi Direct</div>
						<div>Are you sure to exit?</div>
						<div>Please Confirm</div>
						<div class="btn">
							<div class="sure">Yes</div>
							<div class="cancel focus">Cancel</div>
						</div>
					</div>
				</div>
			`;
		}else{
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
		}
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
				if(this.pageName=='WFD'){
					gMenuPageName='NetworkWFD';
					NetworkWFD.render();
				}else{				
					returnListPage();
				}
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
				if(this.pageName=='WFD'){
					returnListPage();
				}
				if(this.pageName=='cleanAll'){  //Clean All
					var msg = {
						"method": "mtk.webui.system.resetParentalInfo"
					}
					window.gSocket.send(msg, function(data) {
						if(data.error.code == 0) {
							console.log(data);
						}
					});
				}
				if(this.pageName=='resetDeviceID'){
					
				}
				if(this.pageName=='resetDefault'){
					
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(this.pageName=='WFD'){
			}else{
				returnListPage();
			}
		}
	}
}

//增减
var showNum = {
	render: function() {
		var html = `
			<div id="showNum">
				<div class="title">
					${gMenuChild.data[gMenuoIndex].name}
					<span>HDMI2</span>
				</div>
				<div>
					<div class="progress" style="margin: 3.5rem 0;">
						<div style="left:${(gMenuChild.data[gMenuoIndex].value.data - gMenuChild.data[gMenuoIndex].value.min) / (gMenuChild.data[gMenuoIndex].value.max - gMenuChild.data[gMenuoIndex].value.min) * 30-0.3}rem" class="front focus"></div>
					</div>
					<span style="margin-left: 1rem;">${Math.round(((gMenuChild.data[gMenuoIndex].value.data - gMenuChild.data[gMenuoIndex].value.min) /(gMenuChild.data[gMenuoIndex].value.max - gMenuChild.data[gMenuoIndex].value.min)) * 10000) / 100.00}%</span>
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
				var curVal=gMenuChild.data[gMenuoIndex].value.data;
				window.gSocket.send(gMenuChild.data[gMenuoIndex].msg('set',++curVal), (data)=> {
//					console.log(data);
					if(data.error.code == 0) {
						++gMenuChild.data[gMenuoIndex].value.data;
						this.render();
					}
				});
			}
		}
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(gMenuChild.data[gMenuoIndex].value.data > gMenuChild.data[gMenuoIndex].value.min) {
				var curVal=gMenuChild.data[gMenuoIndex].value.data;
				window.gSocket.send(gMenuChild.data[gMenuoIndex].msg('set',--curVal), (data)=> {
					if(data.error.code == 0) {
						--gMenuChild.data[gMenuoIndex].value.data;
						this.render();
					}
				});
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
	curObj:{},
	render: function(obj) {
//		console.log(obj);
		this.curObj=obj;
		var html1 = `
			<div id="showNum">
				<div class="title">
					${this.curObj.name}
					<span>HDMI2</span>
				</div>
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
		for(var i = 0; i < this.curObj.value.data.length; i++) {
			if(i == this.curObj.curVal) {
				html += `
					<div class="listItem focus">${this.curObj.value.data[i]}</div>		
				`;
			} else {
				html += `
					<div class="listItem">${this.curObj.value.data[i]}</div>		
				`;
			}
		}
		document.querySelector('#popBoxShow').style.display='block';
		document.querySelector('#popBoxShow').innerHTML = html1 + html + html2;
		this.changePage(this.curObj.curVal);
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector("#showNum .listItem.focus");
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
			if(this.curObj.name=='Auto Synchronization'){
				timeSetupTime.autoSync=this.curObj.value.data[curIndex];
			}else if(this.curObj.name=='Power On Timer'){
				timeSetupTime.onTimer=this.curObj.value.data[curIndex];
			}else if(this.curObj.name=='Power Off Timer'){
				timeSetupTime.offTimer=this.curObj.value.data[curIndex];
			}else if(this.curObj.name=='singleRFScan'){
//					window.gSocket.send({},data=>{});
			}else if(this.curObj.name=='cableSingleRFScan'){
				cableSingleRFScan.modulation=this.curObj.value.data[curIndex];
				cableSingleRFScan.frequency=this.curObj.frequency;
				cableSingleRFScan.symbolRate=this.curObj.symbolRate;
			}else{
				window.gSocket.send(this.curObj.msg('set',curIndex),function(data){
					// console.log(data);
					if(data.error.code==0){
						this.curObj.setCallback(curIndex);
					}
				}.bind(this));
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			document.querySelector('#popBoxShow').style.display='none';
			if(!this.curObj.msg){
				gMenuPageName=this.curObj.name;
				eval(this.curObj.name).render();
			}else{
				gMenuRenderSecond();
				gMenuPageName='list';
			}
		}
	},
	changePage: function(index) {
//		var itemHeight = document.querySelector(".listItem.focus").offsetHeight;
		var floorIndex = Math.floor(index / 4);
		document.querySelector('.selectList').style.top = -(floorIndex * 4 * Number(3)) + 'rem';
	}
}