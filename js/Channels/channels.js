
//**************Cable********************
var cableSingleRFScan={
	modulation: 'Auto',
	frequency:212212,
	symbolRate:0000,
	render:function(){
		var html = `
			<div id="cableSingleRFScan">
				<div class="scanProgress">
					<div class="scanProgressItem">Scan single RF Channels.(Digital Only)</div>
					<div class="scanProgressItem">
						<div class="progress">
							<div style="left:0rem" class="front"></div>
						</div>
						<div>0%</div>
					</div>
				</div>
				<div class="scanList">
					<div class="listItem focus listItemNum listItemFrequency">
						<div class="lf">Frequency(KHz)</div>
						<div class="mid">
							<div class="inputNum">${this.frequency}</div>
						</div>
						<div class="rt"></div>
					</div>
					<div class="listItem listItemModu">
						<div class="lf">Modulation</div>
						<div class="mid">${this.modulation}</div>
						<div class="rt"><span></span></div>
					</div>
					<div class="listItem listItemNum listItemSymbol">
						<div class="lf">Symbol Rate(Ksym/s)</div>
						<div class="mid">
							<div class="inputNum">${this.symbolRate}</div>
						</div>
						<div class="rt"></div>
					</div>
					<div class="listItemDisabled">
						<div class="lf">Signal Level</div>
						<div class="mid progress">
							<div style="left:0rem" class="front"></div>
						</div>
						<div class="rt">0%</div>
					</div>
					<div class="listItemDisabled">
						<div class="lf">Signal Quality</div>
						<div class="mid progress">
							<div style="left:0rem" class="front"></div>
						</div>
						<div class="rt">0%</div>
					</div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML = html;
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#cableSingleRFScan .listItem.focus");
		var curList = document.querySelector("#cableSingleRFScan .scanList").getElementsByClassName('listItem');
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
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT){
			if(hasClass(curFocus,'listItemModu')){
				var arr=['Auto','16QAM','32QAM','64QAM','128QAM','256QAM'];
				var obj={
					name:'cableSingleRFScan',
					value:{
						data:arr
					},
					curVal:[].indexOf.call(arr,this.modulation),
					frequency:document.querySelector("#cableSingleRFScan .listItem.listItemFrequency .inputNum").innerHTML,
					symbolRate:document.querySelector("#cableSingleRFScan .listItem.listItemSymbol .inputNum").innerHTML
				}
				gMenuPageName='showSelect';
				showSelect.render(obj);
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			//扫台
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(hasClass(curFocus,'listItemNum')){
				if(curFocus.querySelector('.inputNum').innerHTML.length<6){
					curFocus.querySelector('.inputNum').innerHTML+=e.key;
				}else{
					curFocus.querySelector('.inputNum').innerHTML=e.key;
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
var cableChannelScanStart={
	scanMode:'Advance',
	render:function(type){
		if(type=='UPC'){			
			var html = `
				<div id="cableChannelScanStart">
					<div>
						<div class="scanProgress">
							<div style="margin: 1rem 0;">Scan All Channels.</div>
						</div>
						<div>
							<div class="progress" style="margin-bottom: 1rem;">
								<div style="left:0rem" class="front"></div>
							</div>
							<span><span class="dtvProgress">0</span>%</span>
						</div>
					</div>
					<div style="margin: 2rem 0;">
						<div>
							<div class="scanModeItem">
								<div class="lf">Scan Mode</div>
								<div class="mid">Advance</div>
								<div class="rt"><span></span></div>
							</div>
						</div>
						<div class="listItem focus cableInput">
							<div class="lf">Frequency(KHz)</div>
							<div class="mid"></div>
							<div class="rt"></div>
						</div>
						<div class="listItem cableInput">
							<div class="lf">Network ID</div>
							<div class="mid"></div>
							<div class="rt"></div>
						</div>
						<div class="listItem cableScan">
							<div class="lf">Scan</div>
							<div class="mid"></div>
							<div class="rt"><span></span></div>
						</div>
					</div>
				</div>
			`;
			document.querySelector('#showList').innerHTML = html;
		}else{
			var html1 = `
				<div id="cableChannelScanStart">
					<div>
						<div class="scanProgress">
							<div style="margin: 1rem 0;">Scan All Channels.</div>
						</div>
						<div>
							<div class="progress" style="margin-bottom: 1rem;">
								<div style="left:0rem" class="front"></div>
							</div>
							<span><span class="dtvProgress">0</span>%</span>
						</div>
					</div>
					<div style="margin: 2rem 0;">
						<div>
							<div class="listItem focus">
								<div class="lf">Scan Mode</div>
								<div class="mid">${this.scanMode}</div>
								<div class="rt"><span></span></div>
							</div>
						</div>
				`;
				if(this.scanMode=='Advance'){
					var html2=`
								<div class="listItem cableInput">
									<div class="lf">Frequency(KHz)</div>
									<div class="mid">345345</div>
									<div class="rt"></div>
								</div>
								<div class="listItem cableInput">
									<div class="lf">Network ID</div>
									<div class="mid">000000</div>
									<div class="rt"></div>
								</div>
								<div class="listItem cableScan">
									<div class="lf">Scan</div>
									<div class="mid"></div>
									<div class="rt"><span></span></div>
								</div>
							</div>
						</div>
					`;
				}else if(this.scanMode=='Full'){
					var html2=`
								<div class="listItem cableScan">
									<div class="lf">Scan</div>
									<div class="mid"></div>
									<div class="rt"><span></span></div>
								</div>
							</div>
						</div>
					`;
				}else{
					var html2=`
								<div class="listItem cableInput">
									<div class="lf">Network ID</div>
									<div class="mid">000000</div>
									<div class="rt"></div>
								</div>
								<div class="listItem cableScan">
									<div class="lf">Scan</div>
									<div class="mid"></div>
									<div class="rt"><span></span></div>
								</div>
							</div>
						</div>
					`;
				}
			
			document.querySelector('#showList').innerHTML = html1+html2;
		}
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#cableChannelScanStart .focus");
		var curList = document.querySelector("#cableChannelScanStart").getElementsByClassName('listItem');
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
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(hasClass(curFocus,'cableScan')){
				//开始扫台
				document.querySelector('#cableChannelScanStart .scanProgress').innerHTML=`
					<div style="margin: 1rem 0;">Status: Scanning...</div>
					<div style="margin: 1rem 0;">Analog Channels: 0</div>
					<div style="margin: 1rem 0;">Digital Channels: <span class="dtvChannel">0</span></div>
				`;
			}
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(hasClass(curFocus,'cableInput')){
				if(curFocus.querySelector('.mid').innerHTML.length<6){
					curFocus.querySelector('.mid').innerHTML+=e.key;
				}else{
					curFocus.querySelector('.mid').innerHTML=e.key;
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
var cableChannelScan={
	render:function(){
		var html=`
			<div id="cableChannelScan">
				<div class='listItem focus'>UPC</div>
				<div class='listItem'>Others</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML=html;
	},
	keyEvent:function(e){
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
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			gMenuPageName='cableChannelScanStart';
			cableChannelScanStart.render(curFocus.innerHTML);
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}


//**************Antenna*******************
//Analog Manual Scan
var antennaAnalogManual = {
	render: function(value) {
		var html = `<div class="analogManualScan">
						<div>Search for analog channels</div>
						<div>
							<div class="listItem focus">Start Frequency (MHz) : <div class="input">42.00</div></div>
							<div class="listItem">Scan Up >></div>
							<div class="listItem">Scan Down >></div>
						</div>
					</div>`;
		document.querySelector('#showList').innerHTML = html;
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
//Channel Scan
var antennaChannelScan = {
	render: function() {
		var html = `
			<div id="showNum">
				<div class="title">Channel Scan</div>
				<div style="margin: 1rem 0;">Status: Scanning...</div>
				<div style="margin: 1rem 0;">Analog Channels: 0</div>
				<div style="margin: 1rem 0;">Digital Channels: <span class="dtvChannel">0</span></div>
				<div>
					<div class="progress" style="margin-bottom: 1rem;">
						<div style="left:0rem" class="front"></div>
					</div>
					<span><span class="dtvProgress">0</span>%</span>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML = html;
		window.gSocket.send({
			"method": "mtk.webui.channelscan.dvbt.startScan",
			"params":{
				"scanType":'dtvScan'
			}
		},(data)=>{
//			console.log(data);
		});
		window.gSocket.addEventListener("mtk.webui.channelscan.dvbt.notify", (data) => {
			document.querySelector('.dtvChannel').innerHTML=data.params.progress;
			document.querySelector('.dtvProgress').innerHTML = (Math.round((data.params.progress /100) * 10000) / 100.00)/2;
			document.querySelector('.front').style.left= data.params.progress/ 100 * 15-0.3+'rem';
			if(data.params.progress==100){
				window.gSocket.send({
					"method": "mtk.webui.channelscan.dvbt.getUIOperation"
				},data=>{
					console.log(data);
				});
			}
		});
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
//Update Scan
var antennaUpdateScan = {
	render: function() {
		var html = `
			<div id="showNum">
				<div class="title">Update Scan</div>
				<div style="margin: 1rem 0;">Status: Scanning...</div>
				<div style="margin: 1rem 0;">Analog Channels: 0</div>
				<div style="margin: 1rem 0;">Digital Channels: <span class="dtvChannel">0</span></div>
				<div>
					<div class="progress" style="margin-bottom: 1rem;">
						<div style="left:0rem" class="front"></div>
					</div>
					<span><span class="dtvProgress">0</span>%</span>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
//Single RF Scan
var antennaSingleRF = {
	list:[],
	render: function(value) {
		console.log(value);
		window.gSocket.send({
			"method": "mtk.webui.channelscan.dvbt.getAllRf"
		},data=>{
			console.log(data);
			this.list=data.result.List;
//			window.gSocket.send({
//				
//			},data1=>{
//				
//			});
			var html = `<div class="analogManualScan">
							<div>Antenna</div>
							<div>
								<div>Scan single RF channel. (Digital Only)</div>
								<div style="margin: 2rem 0;">
									<div class="progress" style="margin-bottom: 1rem;">
										<div style="left:0rem" class="front"></div>
									</div>
									<span><span class="dtvProgress">0</span>%</span>
								</div>
							</div>
							<div>
								<div class="listItem focus">RF Channel: ${data.result.List[0].rfIndex}<span class=""></span></div>
								<div class="listItem">进度条: 0%</div>
								<div class="listItem">进度条: 100%</div>
							</div>
						</div>`;
			document.querySelector('#showList').innerHTML = html;
		});
	},
	keyEvent: function(e) {
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			var obj={
				name:'singleRFScan',
				value:{
					data:[]
				},
				curVal:0
			}
			for(var l=0;l<this.list.length;l++){
				obj.value.data.push(this.list[l].rfIndex);
			}
			gMenuPageName='showSelect';
			showSelect.render(obj);
		}
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}



//AnalogChannelDetail
var AnalogChannelDetail = {
	prevPage: '',
	prevPageIndex: '',
	prevValue: {},
	render: function(page, index, curItem) {
		this.prevPage = page;
		this.prevPageIndex = index;
		this.prevValue = curItem;
		var html = `<div id="AnalogChannelDetail">
						
					</div>`;
		document.querySelector('#showList').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			gMenuPageName = 'channelSkip';
			channelSkip.render('gMenuTvAnalogChannel');
		}
	}
}
//Channel Edit detail
var channelEditDetail = {
	prevValue: {},
	render: function(curItem) {
		this.prevValue = curItem;
		console.log(this.prevValue);
		var html = `<div id="channelEditDetail">
				<div class="listItem">
					<div>Network Name:</div>
					<div>${curItem.nwName}</div>
				</div>
				<div class="opera listItem majorNum focus">
					<div>Channel Number:</div>
					<div class="majorNum_input">${curItem.majorNum}</div>
				</div>
				<div class="opera listItem acName">
					<div>Channel Name:</div>
					<div class="acName_input">${curItem.acName}</div>
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
		document.querySelector('#showList').innerHTML = html;
	},
	keyEvent: function(e) {
		let curFocus = document.querySelector(".focus");
		let curList = curFocus.parentElement.children;
		let curIndex = [].indexOf.call(curList, curFocus);
		let nextIndex;
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(hasClass(curFocus, 'majorNum')) {
				var html = document.querySelector('.majorNum_input').innerHTML;
				if(html.length < 4) {
					html += e.key;
				} else {
					html = e.key;
				}
				document.querySelector('.majorNum_input').innerHTML = html;
			}
		}
		//字母键
		if(e.keyCode == KeyEvent.DOM_VK_A || e.keyCode == KeyEvent.DOM_VK_B || e.keyCode == KeyEvent.DOM_VK_C ||
			e.keyCode == KeyEvent.DOM_VK_D || e.keyCode == KeyEvent.DOM_VK_E || e.keyCode == KeyEvent.DOM_VK_F ||
			e.keyCode == KeyEvent.DOM_VK_G || e.keyCode == KeyEvent.DOM_VK_H || e.keyCode == KeyEvent.DOM_VK_I ||
			e.keyCode == KeyEvent.DOM_VK_J || e.keyCode == KeyEvent.DOM_VK_K || e.keyCode == KeyEvent.DOM_VK_L ||
			e.keyCode == KeyEvent.DOM_VK_M || e.keyCode == KeyEvent.DOM_VK_N || e.keyCode == KeyEvent.DOM_VK_O ||
			e.keyCode == KeyEvent.DOM_VK_P || e.keyCode == KeyEvent.DOM_VK_Q || e.keyCode == KeyEvent.DOM_VK_R ||
			e.keyCode == KeyEvent.DOM_VK_S || e.keyCode == KeyEvent.DOM_VK_T || e.keyCode == KeyEvent.DOM_VK_U ||
			e.keyCode == KeyEvent.DOM_VK_V || e.keyCode == KeyEvent.DOM_VK_W || e.keyCode == KeyEvent.DOM_VK_X ||
			e.keyCode == KeyEvent.DOM_VK_Y || e.keyCode == KeyEvent.DOM_VK_Z) {
			if(hasClass(curFocus, 'acName')) {
				var html = document.querySelector('.acName_input').innerHTML;
				if(html.length < 16) {
					html += e.key.toUpperCase();
				} else {
					html = e.key.toUpperCase();
				}
				document.querySelector('.acName_input').innerHTML = html;
			}
		}
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
			if(hasClass(curFocus, 'delete')) {
				this.channelDelete();
			}
		}
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(hasClass(curFocus, 'acName')) {
				document.querySelector('.acName_input').innerHTML = '';
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(hasClass(curFocus, 'delete')) {
				this.channelDelete();
			}
			if(hasClass(curFocus, 'acName') || hasClass(curFocus, 'majorNum')) {
				console.log(this.prevValue);
				var msg = {
					"params": {
						"operator": "UPDATA",
						"List": [{
							"SvlId": 1,
							"svlRecId": this.prevValue.svlRecId,
							"acName": document.querySelector('.acName_input').innerHTML,
							"majorNum": document.querySelector('.majorNum_input').innerHTML
						}]
					},
					"method": "mtk.webui.channelList.setSvlTslRec"
				}
				window.gSocket.send(msg, function(data) {
					if(data.error.code == 0) {
						gMenuPageName = 'channelSkip';
						channelSkip.render('gMenuTvChannelEdit');
					}
				});
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			gMenuPageName = 'channelSkip';
			channelSkip.render('gMenuTvChannelEdit');
		}
	},
	channelDelete: function() {
		var msg = {
			"params": {
				"operator": "DELETE",
				"List": [{
					"SvlId": 1,
					"svlRecId": this.prevValue.svlRecId
				}]
			},
			"method": "mtk.webui.channelList.setSvlTslRec"
		}
		window.gSocket.send(msg, function(data) {
			if(data.error.code == 0) {
				channelSkip.page = 0;
				channelSkip.focusIndex = 0;
				gMenuPageName = 'channelSkip';
				channelSkip.render('gMenuTvChannelEdit');
			}
		});
	}
}
//Channel Skip
var channelSkip = {
	pageName: '',
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
		}, (data)=> {
			if(this.pageName == 'gMenuTvChannelSort') {
				for(var i = 0; i < data.result.List.length; i++) {
					data.result.List[i].hasSel = 'false';
				}
			}
			this.value = data.result.List;
			this.list = sliceArr(this.value, 9);
			this.renderData(this.focusIndex);
		});
	},
	renderData: function(fIndex) {
		let html = '<div id="channelSkip"><div class="channelSkip">';
		for(let i = 0; i < this.list[this.page].length; i++) {
			if(this.pageName == 'gMenuTvChannelSkip') { //ChannelSkip
				if(this.checkChannelSkip(parseInt(this.list[this.page][i].nwMask))) {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">
								<div>${this.list[this.page][i].brdcstType}</div>
								<div>${this.list[this.page][i].acName}</div>
							</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">
								<div>${this.list[this.page][i].brdcstType}</div>
								<div>${this.list[this.page][i].acName}</div>
							</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					}
				} else {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">
								<div>${this.list[this.page][i].brdcstType}</div>
								<div>${this.list[this.page][i].acName}</div>
							</div>
							<div class="sel">未选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">
								<div>${this.list[this.page][i].brdcstType}</div>
								<div>${this.list[this.page][i].acName}</div>
							</div>
							<div class="sel">未选中</div>
						</div>`;
					}
				}
			} else if(this.pageName == 'gMenuTvChannelSort') { //ChannelSort
				if(this.list[this.page][i].hasSel == 'true') {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">
								<div>${this.list[this.page][i].brdcstType}</div>
								<div>${this.list[this.page][i].acName}</div>
							</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">
								<div>${this.list[this.page][i].brdcstType}</div>
								<div>${this.list[this.page][i].acName}</div>
							</div>
							<div class="sel hasSel">选中</div>
						</div>`;
					}
				} else {
					if(i == fIndex) {
						html += `<div class="listItem focus">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">
								<div>${this.list[this.page][i].brdcstType}</div>
								<div>${this.list[this.page][i].acName}</div>
							</div>
							<div class="sel">未选中</div>
						</div>`;
					} else {
						html += `<div class="listItem">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">
								<div>${this.list[this.page][i].brdcstType}</div>
								<div>${this.list[this.page][i].acName}</div>
							</div>
							<div class="sel">未选中</div>
						</div>`;
					}
				}

			} else if(this.pageName == 'gMenuTvChannelEdit') { //ChannelEdit
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">
								<div>${this.list[this.page][i].brdcstType}</div>
								<div>${this.list[this.page][i].acName}</div>
							</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">
								<div>${this.list[this.page][i].brdcstType}</div>
								<div>${this.list[this.page][i].acName}</div>
							</div>
						</div>`;
				}
			} else if(this.pageName == 'gMenuTvAnalogChannel') { //analogChannelFineTune
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">${this.list[this.page][i].brdcstType}</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div class="number">${this.list[this.page][i].majorNum}</div>
							<div class="acName">${this.list[this.page][i].brdcstType}</div>
						</div>`;
				}
			} else { //gMenuParentalChannelBlock
				if(this.checkChannelBlock(parseInt(this.list[this.page][i].nwMask))) {
					if(i == fIndex) {
						html += `<div class="listItem focus">
										<div class="number">${this.list[this.page][i].majorNum}</div>
										<div class="acName">
											<div>${this.list[this.page][i].brdcstType}</div>
											<div>${this.list[this.page][i].acName}</div>
										</div>
										<div class="sel hasSel">选中</div>
									</div>`;
					} else {
						html += `<div class="listItem">
										<div class="number">${this.list[this.page][i].majorNum}</div>
										<div class="acName">
											<div>${this.list[this.page][i].brdcstType}</div>
											<div>${this.list[this.page][i].acName}</div>
										</div>
										<div class="sel hasSel">选中</div>
									</div>`;
					}
				} else {
					if(i == fIndex) {
						html += `<div class="listItem focus">
										<div class="number">${this.list[this.page][i].majorNum}</div>
										<div class="acName">
											<div>${this.list[this.page][i].brdcstType}</div>
											<div>${this.list[this.page][i].acName}</div>
										</div>
										<div class="sel">未选中</div>
									</div>`;
					} else {
						html += `<div class="listItem">
										<div class="number">${this.list[this.page][i].majorNum}</div>
										<div class="acName">
											<div>${this.list[this.page][i].brdcstType}</div>
											<div>${this.list[this.page][i].acName}</div>
										</div>
										<div class="sel">未选中</div>
									</div>`;
					}
				}
			}
		}
		document.querySelector('#showList').innerHTML = html + '</div></div>';
		document.querySelector('.menuOperate').innerHTML=`
			<div class="operaEnter">Set</div>
			<div class="operaSelect">Select</div>
			<div class="operaExit">Back</div>
		`;
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
			if(this.pageName == 'gMenuTvChannelSkip' || this.pageName == 'gMenuParentalChannelBlock') {
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
				window.gSocket.send(msg, (data)=> {
					console.log(data);
					if(data.error.code == 0) {
						this.focusIndex = curIndex;
						this.render(this.pageName);
					}
				});
			}
			if(this.pageName == 'gMenuTvChannelSort') {
				var hasSel = this.sortHasSel();
				if(hasSel == -1) {
					var valueIndex = [].indexOf.call(this.value, this.list[this.page][curIndex]);
					this.value[valueIndex].hasSel = 'true';
					this.renderData(curIndex);
				} else {
					var valueIndex = [].indexOf.call(this.value, this.list[this.page][curIndex]);
					if(hasSel == valueIndex) {
						this.value[valueIndex].hasSel = 'false';
						this.renderData(curIndex);
					} else {
						var msg = {
							"params": {
								"SvlId": 1,
								"ChNum1": this.value[hasSel].channelId,
								"ChNum2": this.list[this.page][curIndex].channelId
							},
							"method": "mtk.webui.channelList.swapChannels"
						};
						window.gSocket.send(msg, (data)=> {
							if(data.error.code == 0) {
								this.render(this.pageName);
							}
						});
					}
				}
			}
			if(this.pageName == 'gMenuTvChannelEdit') {
				gMenuPageName = 'channelEditDetail';
				channelEditDetail.render(this.list[this.page][curIndex]);
			}
			if(this.pageName == 'gMenuTvAnalogChannel') { //Analog Channel Fine Tune
				gMenuPageName = 'AnalogChannelDetail';
				AnalogChannelDetail.render(this.page, curIndex, this.list[this.page][curIndex]);
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
	},
	sortHasSel: function() {
		var hasSelIndex;
		for(var i = 0; i < this.value.length; i++) {
			if(this.value[i].hasSel == 'true') {
				hasSelIndex = i;
				break;
			} else {
				hasSelIndex = -1;
			}
		}
		return hasSelIndex;
	}
}


