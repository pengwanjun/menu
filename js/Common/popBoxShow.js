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
						<div class="title">
							<div>Wi-Fi Direct</div>
							<div>Are you sure to exit?</div>
							<div>Please Confirm</div>
						</div>
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
						<div class="title">Are you sure?</div>
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
							var curChannelData=gMenuTv[gMenuTv.length-1].value.data;
							for(var i = 0; i < curChannelData.length; i++) {
								if(curChannelData[i].name == 'Channel Skip' || curChannelData[i].name == 'Channel Sort' ||
									curChannelData[i].name == 'Channel Edit' || curChannelData[i].name == 'Analog Channel Fine Tune' ||
									curChannelData[i].name == 'Clean Channel List') {
									curChannelData[i].opera = false;
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
					window.gSocket.send({
						"method":"mtk.webui.system.reset",
						"params":{"type":"resetDefault"}
					},data=>{
						if(data.error.code==0){
							console.log('成功');
						}else{
							console.log('失败');
						}
					});
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
				<div class="progress">
					<div class="progressBar">
						<div style="left:${(gMenuChild.data[gMenuoIndex].value.data - gMenuChild.data[gMenuoIndex].value.min) / (gMenuChild.data[gMenuoIndex].value.max - gMenuChild.data[gMenuoIndex].value.min) * 30-0.3}rem" class="front focus"></div>
					</div>
					<div class="progressNum">${Math.round(((gMenuChild.data[gMenuoIndex].value.data - gMenuChild.data[gMenuoIndex].value.min) /(gMenuChild.data[gMenuoIndex].value.max - gMenuChild.data[gMenuoIndex].value.min)) * 10000) / 100.00}%</div>
				</div>
				<div class="operate">
					<div class="left">Adjust</div>
					<div class="right">Back</div>
				</div>
			</div>
		`;
		document.querySelector('#popBoxSelect').style.display='block';
		document.querySelector('#popBoxSelect').innerHTML = html;
		gMenuPageName = 'showNum';
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
			gMenuRenderSecond();
			gMenuPageName='list';
			document.querySelector('#popBoxSelect').style.display='none';
		}
	}
}

//选项选择
var showSelect = {
	curObj:{},
	render: function(obj) {
		// console.log(obj);
		gMenuPageName='showSelect';
		this.curObj=obj;
		var html1 = `
			<div id="showNum">
				<div class="title">
					${this.curObj.popName}
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
		document.querySelector('#popBoxSelect').style.display='block';
		document.querySelector('#popBoxSelect').innerHTML = html1 + html + html2;
		this.changePage(this.curObj.curVal);
	},
	keyEvent: function(e) {
		var curFocus = popBoxSelect.querySelector("#showNum .listItem.focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[0], 'focus');
				popBoxSelect.querySelector('.selectList').style.top = '0px';
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex + 1], 'focus');
				this.changePage(curIndex+1);
			}
		}
		//上键
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
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			switch (this.curObj.name){
				case 'timeSetupTime':
					if(this.curObj.popName=='Auto Synchronization'){
						timeSetupTime.autoSync=this.curObj.value.data[curIndex];
					}
					if(this.curObj.popName=='Power On Timer'){
						timeSetupTime.onTimer=this.curObj.value.data[curIndex];
					}
					if(this.curObj.popName=='Power Off Timer'){
						timeSetupTime.offTimer=this.curObj.value.data[curIndex];
					}
				break;
				case 'antennaSingleRF':
					antennaSingleRF.listIndex=curIndex;
					antennaSingleRF.setFrequency();
				break;
				case 'cableSingleRFScan':
					cableSingleRFScan.modulation=this.curObj.value.data[curIndex];
				break;
				case 'cableChannelScanStart':
					cableChannelScanStart.curIndex=curIndex;
				break;
				case 'targetRegionPoloUp':
					if(this.curObj.popName=='Region1'){
						targetRegionPoloUp.index1=curIndex;
						targetRegionPoloUp.index2=0;
						targetRegionPoloUp.index3=0;
					}
					if(this.curObj.popName=='Region2'){
						targetRegionPoloUp.index2=curIndex;
						targetRegionPoloUp.index3=0;
					}
					if(this.curObj.popName=='Region3'){
						targetRegionPoloUp.index3=curIndex;
					}
				break;
				case "operaSateChannelScanStart":
					if(this.curObj.popName=='Scan Mode'){
						operaSateChannelScanStart.scanMode=curFocus.innerHTML;
					}
					if(this.curObj.popName=='Channels'){
						operaSateChannelScanStart.channels=curFocus.innerHTML;
					}
				break;
				case 'operaSateAntennaType':
					if(this.curObj.popName=='Tuner'){
						operaSateAntennaType.curTuner=curIndex;
						operaSateAntennaType.curBandFrequency=0;
						operaSateAntennaType.focusIndex=0;
					}
					if(this.curObj.popName=='Band frequency'){
						operaSateAntennaType.curBandFrequency=curIndex;
						operaSateAntennaType.BandFrequencyDefine=curFocus.innerHTML;
						operaSateAntennaType.focusIndex=1;
					}
					if(this.curObj.popName=='SubTuner'){
						operaSateAntennaType.curSubTuner=curIndex;
						operaSateAntennaType.focusIndex=2;
					}
					if(this.curObj.popName=='SubBand frequency'){
						operaSateAntennaType.curSubBandFrequency=curIndex;
						operaSateAntennaType.SubBandFrequencyDefine=curFocus.innerHTML;
						operaSateAntennaType.focusIndex=3;
					}
				break;
				case 'operaSatelliteEdit':
					if(this.curObj.popName=='Satellite status'){
						operaSatelliteEdit.value.satStatus.curIndex=curIndex;
					}
					if(this.curObj.popName=='LNB power'){
						operaSatelliteEdit.value.lnbPower.curIndex=curIndex;
					}
					if(this.curObj.popName=='LNB frequency'){
						operaSatelliteEdit.value.lnbFreq.curIndex=curIndex;
					}
					if(this.curObj.popName=='Tone 22KHz'){
						operaSatelliteEdit.value.Tone22k.curIndex=curIndex;
					}
				break;
				case "operaSatelliteDiSEqC":
					if(this.curObj.popName=='DiSEqC 1.0 port'){
						operaSatelliteDiSEqC.disEqcSet.set10port.curIndex=curIndex;
					}
					if(this.curObj.popName=='DiSEqC 1.1 port'){
						operaSatelliteDiSEqC.disEqcSet.set11port.curIndex=curIndex;
					}
					if(this.curObj.popName=='DiSEqC motor'){
						operaSatelliteDiSEqC.disEqcSet.setMotor.curIndex=curIndex;
					}
				break;
				case "operaSatelliteTransponder":
					operaSatelliteTransponder.transponder.pol.curIndex=curIndex;
				break;
				case 'operaSatelliteDiSEqCMotor':
					if(this.curObj.popName=='Store position'){
						operaSatelliteDiSEqCMotor.value.StorePosition.curIndex=curIndex;
					}
					if(this.curObj.popName=='Goto position'){
						operaSatelliteDiSEqCMotor.value.GotoPosition.curIndex=curIndex;
					}	
				break;
				case 'operaSatelliteDiSEqCMovement':
					operaSatelliteDiSEqCMovement.moveMent.curIndex=curIndex;
				break;
				default:
					window.gSocket.send(this.curObj.msg('set',curIndex),function(data){
						// console.log(data);
						if(data.error.code==0){
							this.curObj.setCallback(curIndex);
						}
					}.bind(this));
			}
			this.returnPage();	
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			this.returnPage();
		}
	},
	returnPage:function(){
		switch(this.curObj.name){
			case 'timeSetupTime':
				gMenuPageName='timeSetupTime';
				if(this.curObj.popName=='Auto Synchronization'){
					timeSetupTime.renderHtmlAutoSync();
				}
				if(this.curObj.popName='Power On Timer'){
					timeSetupTime.renderHtmlOnTimer();
				}
				if(this.curObj.popName=='Power Off Timer'){
					timeSetupTime.renderHtmlOffTimer();
				}
			break;
			case 'antennaSingleRF':
				antennaSingleRF.getLevel();	
			break;
			case 'cableSingleRFScan':
				cableSingleRFScan.renderData();
			break;
			case 'targetRegionPoloUp':
				targetRegionPoloUp.renderData();
			break;
			case "operaSateChannelScanStart":
				operaSateChannelScanStart.renderData();
			break;
			case 'cableChannelScanStart':
				cableChannelScanStart.renderData();
			break;
			case 'operaSatelliteEdit':
				operaSatelliteEdit.renderData();
			break;
			case 'operaSateAntennaType':
				operaSateAntennaType.renderData();
			break;
			case "operaSatelliteDiSEqC":
				operaSatelliteDiSEqC.renderData();
			break;
			case "operaSatelliteTransponder":
				operaSatelliteTransponder.renderData();
			break;
			case 'operaSatelliteDiSEqCMotor':
				operaSatelliteDiSEqCMotor.renderData();
			break;
			case 'operaSatelliteDiSEqCMovement':
				operaSatelliteDiSEqCMovement.renderData();
			break;
			default:
				gMenuRenderSecond();
				gMenuPageName='list';
		}
		document.querySelector('#popBoxSelect').style.display='none';
	},
	changePage: function(index) {
//		var itemHeight = document.querySelector(".listItem.focus").offsetHeight;
		var floorIndex = Math.floor(index / 4);
		document.querySelector('#popBoxSelect .selectList').style.top = -(floorIndex * 4 * Number(3)) + 'rem';
	}
}