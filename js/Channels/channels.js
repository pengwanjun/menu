
// ***********Satellite*************
var operaSateManualScanStart={
	"scan":'false',
	render:function(){
		var html=`
			<div id="operaSateManualScanStart">
				<div class="discrip scanProgress">
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">Scan All Channels.</div>
						<div class="rt"></div>
					</div>
				</div>
				<div class="progress scanProgress">
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							<div class="progress">
								<div style="width:1rem" class="front"></div>
							</div>
						</div>
						<div class="rt">0%</div>
					</div>
				</div>
			</div>
		`;
		document.querySelector("#showList").innerHTML=html;
		gMenuPageName='operaSateManualScanStart';
		setTimeout(function(){
			this.scan='true';
			this.scanNotify();
		}.bind(this),500);
	},
	scanNotify:function(){
		var html=`
			<div class="scanProgressItem">
				<div class="lf"></div>
				<div class="mid">Status: Scanning...</div>
				<div class="rt"></div>
			</div>
			<div class="scanProgressItem">
				<div class="lf"></div>
				<div class="mid">Digital Channels: 0</div>
				<div class="rt"></div>
			</div>
			<div class="scanProgressItem">
				<div class="lf"></div>
				<div class="mid">Satellite name: Astra 1</div>
				<div class="rt"></div>
			</div>
			<div class="scanProgressItem">
				<div class="lf"></div>
				<div class="mid">Satellites: 1/1</div>
				<div class="rt"></div>
			</div>
		`;
		document.querySelector("#operaSateManualScanStart .discrip").innerHTML=html;
		//扫台---无api
		// window.gSocket.send({},data=>{
		// });
		//notify----扫台完成之后跳转页面
	},
	keyEvent:function(e){
		if(e.keyCode == KeyEvent.DOM_VK_ENTER){
			if(this.scan=='false'){
				this.scan='true';
				this.scanNotify();
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(this.scan=='true'){
				this.scan='false';
				var status=document.querySelector("#operaSateManualScanStart .discrip").getElementsByClassName('scanProgressItem')[0];
				status.querySelector('.mid').innerHTML='Status: Cancel';
			}else{
				reRenderList();
			}
		}
	}
}
var operaSateChannelScanStart={
	enterOperator:'false',
	scanMode:'Network',
	channels:'All',
	focusIndex:0,
	render:function(){
		this.focusIndex=0;
		this.renderData();
	},
	renderData:function(){
		var html=`
			<div id="OperaSateChannelScanStart">
				<div class="scanProgress">
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">Scan single RF Channels.(Digital Only)</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							<div class="progress">
								<div style="width:1rem" class="front"></div>
							</div>
						</div>
						<div class="rt">0%</div>
					</div>
				</div>
				<div class="scanList">
					<div class="listItem sel">
						<div class="lf">Scan Mode</div>
						<div class="mid">${this.scanMode}</div>
						<div class="rt"><span></span></div>
					</div>
					<div class="listItem sel">
						<div class="lf">Channels</div>
						<div class="mid">${this.channels}</div>
						<div class="rt"><span></span></div>
					</div>
					<div class="listItem scan">
						<div class="lf">Scan</div>
						<div class="mid"></div>
						<div class="rt"><span></span></div>
					</div>
				</div>
			</div>
		`;
		document.querySelector("#showList").innerHTML=html;
		gMenuPageName='operaSateChannelScanStart';
		var items=document.querySelector("#OperaSateChannelScanStart").getElementsByClassName('listItem');
		if(this.enterOperator=='true'){
			addClass(items[0],'disabled');
			this.focusIndex=1;
		}
		addClass(items[this.focusIndex],'focus');
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#OperaSateChannelScanStart .focus");
		var allList= curFocus.parentElement.children;
		var curList=[];
		for(var a=0;a<allList.length;a++){
			if(!hasClass(allList[a],'disabled')){
				curList.push(allList[a]);
			}
		}
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				removeClass(curFocus, 'focus');
				addClass(curList[0], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				removeClass(curFocus, 'focus');
				addClass(curList[curList.length - 1], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT || e.keyCode == KeyEvent.DOM_VK_ENTER){
			//跳出弹框选择
			if(hasClass(curFocus,'sel')){
				var obj={};
				if(curFocus.querySelector('.lf').innerHTML=='Scan Mode'){
					var arr=['Network','Full'];
					obj={
						name:'operaSateChannelScanStart',
						popName:'Scan Mode',
						pageName:'operaSateChannelScanStart',
						value:{
							data:arr
						},
						curVal:[].indexOf.call(arr,this.scanMode)
					} 
				}
				if(curFocus.querySelector('.lf').innerHTML=='Channels'){
					var arr=['All','Free'];
					obj={
						name:'operaSateChannelScanStart',
						popName:'Channels',
						value:{
							data:arr
						},
						curVal:[].indexOf.call(arr,this.channels)
					}
				}
				this.focusIndex=[].indexOf.call(allList,curFocus);
				showSelect.render(obj);
			}
			if(hasClass(curFocus,'scan')){
				window.gSocket.send({
					"method": "mtk.webui.channelscan.dvbs.startScan",
					"params":{
						"scanType":value1,
						"engCfgFlag":value2
					}
				},data=>{
					console.log(data);
				});
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			reRenderList();
		}
	}
}
var searchSatellite={
	scan:'false',
	render:function(){
		var html=`
			<div id="searchSatellite">
				<div class="discrip scanProgress">
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">Scan All Channels.</div>
						<div class="rt"></div>
					</div>
				</div>
				<div class="progress scanProgress">
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							<div class="progress">
								<div style="width:1rem" class="front"></div>
							</div>
						</div>
						<div class="rt">0%</div>
					</div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML=html;
		gMenuPageName='searchSatellite';
		setTimeout(function(){
			this.scan='true';
			this.scanNotify();
		}.bind(this),500);
	},
	scanNotify:function(){
		var html=`
			<div class="scanProgressItem">
				<div class="lf"></div>
				<div class="mid">The LNB search may take a while to complete.</div>
				<div class="rt"></div>
			</div>
			<div class="scanProgressItem">
				<div class="lf"></div>
				<div class="mid">Status: Scanning...</div>
				<div class="rt"></div>
			</div>
		`;
		document.querySelector("#searchSatellite .discrip").innerHTML=html;
		//搜索卫星---无api
		// window.gSocket.send({},data=>{
		// });
		//notify----搜索完成之后跳转页面
	},
	keyEvent:function(e){
		if(e.keyCode == KeyEvent.DOM_VK_ENTER){
			if(this.scan=='false'){
				this.scan='true';
				this.scanNotify();
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(this.scan=='true'){
				this.scan='false';
				var status=document.querySelector("#searchSatellite .discrip").getElementsByClassName('scanProgressItem')[0];
				status.querySelector('.mid').innerHTML='Status: Scan Cancel';
			}else{
				reRenderList();
			}
		}
	}
}
var operaSatelliteTransponder={
	prevObj:{},
	transponder:{},
	focusIndex:0,
	render:function(prevobj,curobj){
		this.prevObj=prevobj;
		this.transponder=curobj;
		this.focusIndex=0;
		this.renderData();
	},
	renderData:function(){
		// console.log(this.transponder);
		var html=`
			<div id="operaSatelliteTransponder">
				<div class="scanList">
					<div class="listItem scanInput">
						<div class="lf">Frequency</div>
						<div class="mid">
							<div class="inputNum">${this.transponder.frequency}</div>
						</div>
						<div class="rt"></div>
					</div>
					<div class="listItem scanInput">
						<div class="lf">Symbol Rate (Ksym/s)</div>
						<div class="mid">
							<div class="inputNum">${this.transponder.SymbolRate}</div>
						</div>
						<div class="rt"></div>
					</div>
					<div class="listItem scanSelect">
						<div class="lf">Polarization</div>
						<div class="mid">${this.transponder.pol.data[this.transponder.pol.curIndex]}</div>
						<div class="rt"><span></span></div>
					</div>
				</div>
			</div>
			`;
		document.querySelector('#showList').innerHTML=html;
		addClass(document.querySelector('#operaSatelliteTransponder').getElementsByClassName('listItem')[this.focusIndex],'focus');
		gMenuPageName='operaSatelliteTransponder';
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#operaSatelliteTransponder .focus");
		var curList= curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				removeClass(curFocus, 'focus');
				addClass(curList[0], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				removeClass(curFocus, 'focus');
				addClass(curList[curList.length - 1], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT || e.keyCode == KeyEvent.DOM_VK_ENTER){
			//跳出弹框选择
			if(hasClass(curFocus,'scanSelect')){
				var obj={
					name:'operaSatelliteTransponder',
					popName:'Polarization',
					popName:'',
					value:{
						data:this.transponder.pol.data
					},
					curVal:this.transponder.pol.curIndex
				}
				this.focusIndex=curIndex;
				showSelect.render(obj);
			}
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(hasClass(curFocus,'scanInput')) {
				if(curFocus.querySelector('.inputNum').innerHTML.length<5){
					curFocus.querySelector('.inputNum').innerHTML+=e.key;
				}else{
					curFocus.querySelector('.inputNum').innerHTML=e.key;
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			//直接返回
			var value={
				"transponder":this.transponder
			}
			gWzdDvbsAntennaSetupData.setData(this.prevObj.item.SatelliteRecordID,value,this.setCallback);
		}
	},
	setCallback:function(data){
		// console.log(data);
		if(data.error.code==0){
			operaSatelliteEdit.render(operaSatelliteTransponder.prevObj);
		}else{
			console.log('Transponder set error: '+data);
		}
	}
}
var operaSatelliteDiSEqCMovement={
	prevObj:{},
	disEqcSet:{},
	signal:{},
	focusIndex:0,
	moveMent:{
		curIndex:0,
		data:['Nonstop','Step','Timeout']
	},
	stepSize:1,
	timeout:1,
	render:function(prevObj,disEqcSet,signal){
		this.prevObj=prevObj;
		this.disEqcSet=disEqcSet;
		this.signal=signal;
		var html=`
			<div id="operaSatelliteEdit">
				<div class="scanList selBox">
				</div>
				<div class="scanList" style="position: absolute;bottom: 0;left: 0;">
					<div class="listItem scanProgress">
						<div class="lf">Signal Quality</div>
						<div class="mid">
							<div class="progress">
								<div class="front" style="width: ${this.signal.quality/100*30}rem;"></div>
							</div>
						</div>
						<div class="rt">${(Math.round((this.signal.quality /100) * 10000) / 100.00)}%</div>
					</div>
					<div class="listItem scanProgress">
						<div class="lf">Signal Level</div>
						<div class="mid">
							<div class="progress">
								<div class="front" style="width: ${this.signal.level/100*30}rem;"></div>
							</div>
						</div>
						<div class="rt">${(Math.round((this.signal.level /100) * 10000) / 100.00)}%</div>
					</div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML=html;
		this.renderData();
	},
	renderData:function(){
		var html1=`
			<div class="listItem scanSelect">
				<div class="lf">Movement control</div>
				<div class="mid">${this.moveMent.data[this.moveMent.curIndex]}</div>
				<div class="rt"><span></span></div>
			</div>
			`;
			var html2=``;
			if(this.moveMent.data[this.moveMent.curIndex]=='Step'){
				html2=`
					<div class="listItem scanInput">
						<div class="lf">Step size</div>
						<div class="mid">
							<div class="inputNum stepNum">${this.stepSize}</div>
						</div>
						<div class="rt"><span></span></div>
					</div>
				`;
			}else{
				html2=`
					<div class="listItem disabled">
						<div class="lf">Step size</div>
						<div class="mid">
							<div class="inputNum stepNum">${this.stepSize}</div>
						</div>
						<div class="rt"><span></span></div>
					</div>
				`;
			}
			var html3=``;
			if(this.moveMent.data[this.moveMent.curIndex]=='Timeout'){
				html3=`
					<div class="listItem scanInput">
						<div class="lf">Timeout(s)</div>
						<div class="mid">
							<div class="inputNum timeoutNum">${this.timeout}</div>
						</div>
						<div class="rt"><span></span></div>
					</div>
				`;
			}else{
				html3=`
					<div class="listItem disabled">
						<div class="lf">Timeout(s)</div>
						<div class="mid">
							<div class="inputNum timeoutNum">${this.timeout}</div>
						</div>
						<div class="rt"><span></span></div>
					</div>
				`;
			}
			var html4=`
			<div class="listItem">
				<div class="lf">Move east</div>
				<div class="mid"></div>
				<div class="rt"><span></span></div>
			</div>
			<div class="listItem">
				<div class="lf">Move west</div>
				<div class="mid"></div>
				<div class="rt"><span></span></div>
			</div>
			<div class="listItem">
				<div class="lf">Stop movement</div>
				<div class="mid"></div>
				<div class="rt"><span></span></div>
			</div>
		`;
		document.querySelector('#operaSatelliteEdit .selBox').innerHTML=html1+html2+html3+html4;
		addClass(document.querySelector('#operaSatelliteEdit .selBox').getElementsByClassName('listItem')[this.focusIndex],'focus');
		gMenuPageName='operaSatelliteDiSEqCMovement';
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#operaSatelliteEdit .focus");
		var allList= curFocus.parentElement.children;
		var curList=[];
		for(var i=0;i<allList.length;i++){
			if(!hasClass(allList[i],'disabled')){
				curList.push(allList[i]);
			}
		}
		var curIndex = [].indexOf.call(curList, curFocus);
		if(curFocus.querySelector('.lf').innerHTML=='Step size'){
			if(curFocus.querySelector('.inputNum').innerHTML<1){
				curFocus.querySelector('.inputNum').innerHTML=1;
			}
			if(curFocus.querySelector('.inputNum').innerHTML>127){
				curFocus.querySelector('.inputNum').innerHTML=127;
			}
		}
		if(curFocus.querySelector('.lf').innerHTML=='Timeout(s)'){
			if(curFocus.querySelector('.inputNum').innerHTML<1){
				curFocus.querySelector('.inputNum').innerHTML=1;
			}
			if(curFocus.querySelector('.inputNum').innerHTML>126){
				curFocus.querySelector('.inputNum').innerHTML=126;
			}
		}
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				removeClass(curFocus, 'focus');
				addClass(curList[0], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				removeClass(curFocus, 'focus');
				addClass(curList[curList.length - 1], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT || e.keyCode == KeyEvent.DOM_VK_ENTER){
			// console.log(curHtml);
			if(hasClass(curFocus,'scanSelect')){
				var obj={
					name:'operaSatelliteDiSEqCMovement',
					popName:'Movement control',
					value:{
						"data":this.moveMent.data
					},
					curVal:this.moveMent.curIndex
				}
				this.focusIndex=[].indexOf.call(allList,curFocus);
				this.stepSize=document.querySelector('#operaSatelliteEdit .stepNum').innerHTML;
				this.timeout=document.querySelector('#operaSatelliteEdit .timeoutNum').innerHTML;
				showSelect.render(obj);
			}
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(hasClass(curFocus,'scanInput')) {
				if(curFocus.querySelector('.inputNum').innerHTML.length<3){
					curFocus.querySelector('.inputNum').innerHTML+=e.key;
				}else{
					curFocus.querySelector('.inputNum').innerHTML=e.key;
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			//设置并返回
			operaSatelliteDiSEqCMotor.render(this.prevObj,this.disEqcSet,this.signal);
		}
	}
}
var operaSatelliteDiSEqCMotor={
	prevObj:{},
	disEqcSet:{},
	signal:{},
	focusIndex:0,
	value:{},
	render:function(prevObj,disEqcSet,signal){
		this.prevObj=prevObj;
		this.disEqcSet=disEqcSet;
		this.signal=signal;
		var html=`
			<div id="operaSatelliteEdit">
				<div class="scanList selBox">
				</div>
				<div class="scanList" style="position: absolute;bottom: 0;left: 0;">
					<div class="listItem scanProgress">
						<div class="lf">Signal Quality</div>
						<div class="mid">
							<div class="progress">
								<div class="front" style="width: ${this.signal.quality/100*30}rem;"></div>
							</div>
						</div>
						<div class="rt">${(Math.round((this.signal.quality /100) * 10000) / 100.00)}%</div>
					</div>
					<div class="listItem scanProgress">
						<div class="lf">Signal Level</div>
						<div class="mid">
							<div class="progress">
								<div class="front" style="width: ${this.signal.level/100*30}rem;"></div>
							</div>
						</div>
						<div class="rt">${(Math.round((this.signal.level /100) * 10000) / 100.00)}%</div>
					</div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML=html;
		gWzdDvbsAntennaSetupData.getMotor(prevObj.item.SatelliteRecordID,this.renderCallBack);
	},
	renderCallBack:function(data){
		// console.log(data);
		operaSatelliteDiSEqCMotor.value=data;
		operaSatelliteDiSEqCMotor.renderData();
	},
	renderData:function(){
		var html=`
			<div class="listItem scanNext">
				<div class="lf">Movement control</div>
				<div class="mid"></div>
				<div class="rt"><span></span></div>
			</div>
			<div class="listItem">
				<div class="lf">Disable limits</div>
				<div class="mid"></div>
				<div class="rt"><span></span></div>
			</div>
			<div class="listItem">
				<div class="lf">Limit east</div>
				<div class="mid"></div>
				<div class="rt"><span></span></div>
			</div>
			<div class="listItem">
				<div class="lf">Limit west</div>
				<div class="mid"></div>
				<div class="rt"><span></span></div>
			</div>
			<div class="listItem scanSelect">
				<div class="lf">Store position</div>
				<div class="mid">${this.value.StorePosition.data[this.value.StorePosition.curIndex]}</div>
				<div class="rt"><span></span></div>
			</div>
			<div class="listItem scanSelect">
				<div class="lf">Goto position</div>
				<div class="mid">${this.value.GotoPosition.data[this.value.GotoPosition.curIndex]}</div>
				<div class="rt"><span></span></div>
			</div>
			<div class="listItem">
				<div class="lf">Goto reference</div>
				<div class="mid"></div>
				<div class="rt"><span></span></div>
			</div>
		`;
		document.querySelector('#operaSatelliteEdit .selBox').innerHTML=html;
		addClass(document.querySelector('#operaSatelliteEdit .selBox').getElementsByClassName('listItem')[this.focusIndex],'focus');
		gMenuPageName='operaSatelliteDiSEqCMotor';
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#operaSatelliteEdit .focus");
		var curList= curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				removeClass(curFocus, 'focus');
				addClass(curList[0], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				removeClass(curFocus, 'focus');
				addClass(curList[curList.length - 1], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT || e.keyCode == KeyEvent.DOM_VK_ENTER){
			var curHtml=curFocus.querySelector('.lf').innerHTML;
			if(hasClass(curFocus,'scanSelect')){
				var obj={};
				if(curHtml=='Store position'){
					obj={
						name:'operaSatelliteDiSEqCMotor',
						popName:'Store position',
						"value":{
							"data":this.value.StorePosition.data
						},
						"curVal":this.value.StorePosition.curIndex
					}
				}
				if(curHtml=='Goto position'){
					obj={
						name:'operaSatelliteDiSEqCMotor',
						popName:'Goto position',
						"value":{
							"data":this.value.GotoPosition.data
						},
						"curVal":this.value.GotoPosition.curIndex
					}
				}
				this.focusIndex=curIndex;
				showSelect.render(obj);
			}
			//下一级scan页面
			if(hasClass(curFocus,'scanNext')){
				this.focusIndex=curIndex;
				operaSatelliteDiSEqCMovement.render(this.prevObj,this.disEqcSet,this.signal);
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			//设置并返回
			gWzdDvbsAntennaSetupData.setData(this.prevObj.item.SatelliteRecordID,this.value,this.setCallback);
		}
	},
	setCallback:function(data){
		console.log(data);
		if(data.error.code==0){
			operaSatelliteDiSEqC.render(operaSatelliteDiSEqCMotor.prevObj,operaSatelliteDiSEqCMotor.disEqcSet,operaSatelliteDiSEqCMotor.signal);
		}else{
			console.log('DiSEqCMotor set error: '+data);
		}
	}
}
var operaSatelliteDiSEqC={
	prevObj:{},
	disEqcSet:{},
	signal:{},
	focusIndex:0,
	render:function(prevobj,curobj,signal){
		this.prevObj=prevobj;
		this.disEqcSet=curobj;
		this.signal=signal;
		this.renderData();
	},
	renderData:function(){
		// console.log(this.disEqcSet);
		var html1=`
		<div id="operaSatelliteDiSEqC">
			<div class="selBox">
				<div class="scanList">
					<div class="listItem">
						<div class="lf">DiSEqC 1.0 port</div>
						<div class="mid">${this.disEqcSet.set10port.data[this.disEqcSet.set10port.curIndex]}</div>
						<div class="rt"><span></span></div>
					</div>
					<div class="listItem">
						<div class="lf">DiSEqC 1.1 port</div>
						<div class="mid">${this.disEqcSet.set11port.data[this.disEqcSet.set11port.curIndex]}</div>
						<div class="rt"><span></span></div>
					</div>
					<div class="listItem">
						<div class="lf">DiSEqC motor</div>
						<div class="mid">${this.disEqcSet.setMotor.data[this.disEqcSet.setMotor.curIndex]}</div>
						<div class="rt"><span></span></div>
					</div>
				</div>
			</div>
			`;
			var html2=`
			<div class="signal">
				<div class="scanList">
					<div class="listItem scanProgress">
						<div class="lf">Signal Quality</div>
						<div class="mid">
							<div class="progress">
								<div class="front" style="width: ${this.signal.quality/100*30}rem;"></div>
							</div>
						</div>
						<div class="rt">${(Math.round((this.signal.quality /100) * 10000) / 100.00)}%</div>
					</div>
					<div class="listItem scanProgress">
						<div class="lf">Signal Level</div>
						<div class="mid">
							<div class="progress">
								<div class="front" style="width: ${this.signal.level/100*30}rem;"></div>
							</div>
						</div>
						<div class="rt">${(Math.round((this.signal.level /100) * 10000) / 100.00)}%</div>
					</div>
				</div>
			</div>
		</div>
		`;
		document.querySelector('#showList').innerHTML=html1+html2;
		addClass(document.querySelector('#operaSatelliteDiSEqC .selBox').getElementsByClassName('listItem')[this.focusIndex],'focus');
		gMenuPageName='operaSatelliteDiSEqC';
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#operaSatelliteDiSEqC .focus");
		var curList= curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				removeClass(curFocus, 'focus');
				addClass(curList[0], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				removeClass(curFocus, 'focus');
				addClass(curList[curList.length - 1], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT || e.keyCode == KeyEvent.DOM_VK_ENTER){
			var curHtml=curFocus.querySelector('.lf').innerHTML;
			if(e.keyCode == KeyEvent.DOM_VK_ENTER && curHtml=='DiSEqC motor' 
			&& this.disEqcSet.setMotor.curIndex==this.disEqcSet.setMotor.data.length-1){
			operaSatelliteDiSEqCMotor.render(this.prevObj,this.disEqcSet,this.signal);
			}else{
				var obj={};
				if(curHtml=='DiSEqC 1.0 port'){
					obj={
						name:'operaSatelliteDiSEqC',
						popName:'DiSEqC 1.0 port',
						value:{
							data:this.disEqcSet.set10port.data
						},
						curVal:this.disEqcSet.set10port.curIndex
					}
				}
				if(curHtml=='DiSEqC 1.1 port'){
					obj={
						name:'operaSatelliteDiSEqC',
						popName:'DiSEqC 1.1 port',
						value:{
							data:this.disEqcSet.set11port.data
						},
						curVal:this.disEqcSet.set11port.curIndex
					}
				}
				if(curHtml=='DiSEqC motor'){
					obj={
						name:'operaSatelliteDiSEqC',
						popName:'DiSEqC motor',
						value:{
							data:this.disEqcSet.setMotor.data
						},
						curVal:this.disEqcSet.setMotor.curIndex
					}
				}
				this.focusIndex=curIndex;
				showSelect.render(obj);
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			//设置并返回
			var value={
				"disEqcSet":this.disEqcSet
			}
			gWzdDvbsAntennaSetupData.setData(this.prevObj.item.SatelliteRecordID,value,this.setCallback);
		}
	},
	setCallback:function(data){
		// console.log(data);
		if(data.error.code==0){
			operaSatelliteEdit.render(operaSatelliteDiSEqC.prevObj);
		}else{
			console.log('disEqcSet setError: '+data);
		}
	}
}
var operaSatelliteEdit={
	prevObj:{},
	value:{},
	signal:{},
	focusIndex:0,
	render:function(curObj){
		this.prevObj=curObj;
		var html=`
			<div id="operaSatelliteEdit">
				<div class="editInfo">
				</div>
				<div class="signal">
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML=html;
		gWzdDvbsAntennaSetupData.getData(this.prevObj.antennaType,this.prevObj.item.SatelliteRecordID,this.renderCallBack);
	},
	renderCallBack:function(data){
		// console.log(data);
		operaSatelliteEdit.value=data;
		window.gSocket.send({
			"method":"mtk.webui.broadcast.querySignalInfo"
		}, function(data) {
			// console.log(data);
			if(data.error.code==0){
				operaSatelliteEdit.signal=data.result;
				operaSatelliteEdit.renderData();
			}else{
				console.log('signal query error');
			}
		});
	},
	renderData:function(){
		// console.log(this.value);
		var html=``;
		if(this.prevObj.scanMethod==3){
			var html1=`
				<div class="scanList">
					<div class="listItem scanSelect disabled">
						<div class="lf">Satellite status</div>
						<div class="mid">${this.value.satStatus.data[this.value.satStatus.curIndex]}</div>
						<div class="rt"><span></span></div>
					</div>
					<div class="listItem disabled">
						<div class="lf">Satellite name</div>
						<div class="mid">${this.prevObj.item.SatelliteName}</div>
						<div class="rt"></div>
					</div>
					`;
					var html2=``;
					if(this.prevObj.antennaType==0){
						html2=`
							<div class="listItem scanSelect disabled">
								<div class="lf">LNB power</div>
								<div class="mid">${this.value.lnbPower.data[this.value.lnbPower.curIndex]}</div>
								<div class="rt"><span></span></div>
							</div>
						`;
					}else{
						html2=`
							<div class="listItem scanSelect disabled">
								<div class="lf">Position</div>
								<div class="mid">${this.value.lnbPosition.data[this.value.lnbPosition.curIndex]}</div>
								<div class="rt"><span></span></div>
							</div>
						`;
					}
					var html3=`
					<div class="listItem scanSelect disabled">
						<div class="lf">LNB frequency</div>
						<div class="mid">${this.value.lnbFreq.data[this.value.lnbFreq.curIndex].value}</div>
						<div class="rt"><span></span></div>
					</div>
					`;
					var html4=``;
					if(this.prevObj.antennaType==0){
						html4=`
							<div class="listItem scanNext disabled">
								<div class="lf">DiSEqC set</div>
								<div class="mid"></div>
								<div class="rt"><span></span></div>
							</div>
							<div class="listItem disabled scanSelect">
								<div class="lf">Tone 22KHz</div>
								<div class="mid">${this.value.Tone22k.data[this.value.Tone22k.curIndex]}</div>
								<div class="rt"><span></span></div>
							</div>
						`;
					}
					var html5=`
					<div class="listItem scanNext focus">
						<div class="lf">Transponder</div>
						<div class="mid">${this.value.transponder.frequency}${this.value.transponder.pol.data[this.value.transponder.pol.curIndex].slice(0,1)}${this.value.transponder.SymbolRate}</div>
						<div class="rt"><span></span></div>
					</div>
				</div>
				`;
		}else{
			var html1=`
				<div class="scanList">
					<div class="listItem scanSelect">
						<div class="lf">Satellite status</div>
						<div class="mid">${this.value.satStatus.data[this.value.satStatus.curIndex]}</div>
						<div class="rt"><span></span></div>
					</div>
					<div class="listItem disabled">
						<div class="lf">Satellite name</div>
						<div class="mid">${this.prevObj.item.SatelliteName}</div>
						<div class="rt"></div>
					</div>
					`;
			if(this.value.satStatus.data[this.value.satStatus.curIndex]=='On'){
					var html2=``;
					if(this.prevObj.antennaType==0){
						html2=`
							<div class="listItem scanSelect">
								<div class="lf">LNB power</div>
								<div class="mid">${this.value.lnbPower.data[this.value.lnbPower.curIndex]}</div>
								<div class="rt"><span></span></div>
							</div>
						`;
					}else{
						html2=`
							<div class="listItem scanSelect">
								<div class="lf">Position</div>
								<div class="mid">${this.value.lnbPosition.data[this.value.lnbPosition.curIndex]}</div>
								<div class="rt"><span></span></div>
							</div>
						`;
					}
					var html3=`
					<div class="listItem scanSelect">
						<div class="lf">LNB frequency</div>
						<div class="mid">${this.value.lnbFreq.data[this.value.lnbFreq.curIndex].value}</div>
						<div class="rt"><span></span></div>
					</div>
					`;
					var html4=``;
					if(this.prevObj.antennaType==0){
						if(this.value.lnbFreq.data[this.value.lnbFreq.curIndex].tone22k){
							html4=`
								<div class="listItem scanNext">
									<div class="lf">DiSEqC set</div>
									<div class="mid"></div>
									<div class="rt"><span></span></div>
								</div>
								<div class="listItem scanSelect">
									<div class="lf">Tone 22KHz</div>
									<div class="mid">${this.value.Tone22k.data[this.value.Tone22k.curIndex]}</div>
									<div class="rt"><span></span></div>
								</div>
							`;
						}else{							
							html4=`
								<div class="listItem scanNext">
									<div class="lf">DiSEqC set</div>
									<div class="mid"></div>
									<div class="rt"><span></span></div>
								</div>
								<div class="listItem disabled scanSelect">
									<div class="lf">Tone 22KHz</div>
									<div class="mid">${this.value.Tone22k.data[this.value.Tone22k.curIndex]}</div>
									<div class="rt"><span></span></div>
								</div>
							`;
						}
					}
					var html5=`
					<div class="listItem scanNext">
						<div class="lf">Transponder</div>
						<div class="mid">${this.value.transponder.frequency}${this.value.transponder.pol.data[this.value.transponder.pol.curIndex].slice(0,1)}${this.value.transponder.SymbolRate}</div>
						<div class="rt"><span></span></div>
					</div>
				</div>
				`;
			}else{
					var html2=``;
					if(this.prevObj.antennaType==0){
						html2=`
							<div class="listItem scanSelect disabled">
								<div class="lf">LNB power</div>
								<div class="mid">${this.value.lnbPower.data[this.value.lnbPower.curIndex]}</div>
								<div class="rt"><span></span></div>
							</div>
						`;
					}else{
						html2=`
							<div class="listItem scanSelect disabled">
								<div class="lf">Position</div>
								<div class="mid">${this.value.LnbPosition}</div>
								<div class="rt"><span></span></div>
							</div>
						`;
					}
					var html3=`
					<div class="listItem scanSelect disabled">
						<div class="lf">LNB frequency</div>
						<div class="mid">${this.value.lnbFreq.data[this.value.lnbFreq.curIndex].value}</div>
						<div class="rt"><span></span></div>
					</div>
					`;
					var html4=``;
					if(this.prevObj.antennaType==0){
						html4=`
							<div class="listItem scanNext disabled">
								<div class="lf">DiSEqC set</div>
								<div class="mid"></div>
								<div class="rt"><span></span></div>
							</div>
							<div class="listItem disabled scanSelect">
								<div class="lf">Tone 22KHz</div>
								<div class="mid">${this.value.Tone22k.data[this.value.Tone22k.curIndex]}</div>
								<div class="rt"><span></span></div>
							</div>
						`;
					}
					var html5=`
					<div class="listItem scanNext disabled">
						<div class="lf">Transponder</div>
						<div class="mid">${this.value.transponder.frequency}${this.value.transponder.pol.data[this.value.transponder.pol.curIndex].slice(0,1)}${this.value.transponder.SymbolRate}</div>
						<div class="rt"><span></span></div>
					</div>
				</div>
				`;
			}
		}
		html=html1+html2+html3+html4+html5;
		document.querySelector('#operaSatelliteEdit .editInfo').innerHTML=html;
		var listitems=document.querySelector('#operaSatelliteEdit .editInfo').getElementsByClassName('listItem');
		if(this.prevObj.scanMethod==3){
			addClass(listitems[listitems.length-1],'focus');
		}else{
			addClass(listitems[this.focusIndex],'focus');
		}
		
		// console.log(this.signal);
		var html6=`
			<div class="scanList" style="position:absolute;bottom: 0;">
				<div class="listItem scanProgress">
					<div class="lf">Signal Quality</div>
					<div class="mid">
						<div class="progress">
							<div class="front" style="width: ${this.signal.quality/100*30}rem;"></div>
						</div>
					</div>
					<div class="rt">${(Math.round((this.signal.quality /100) * 10000) / 100.00)}%</div>
				</div>
				<div class="listItem scanProgress">
					<div class="lf">Signal Level</div>
					<div class="mid">
						<div class="progress">
							<div class="front" style="width: ${this.signal.level/100*30}rem;"></div>
						</div>
					</div>
					<div class="rt">${(Math.round((this.signal.level /100) * 10000) / 100.00)}%</div>
				</div>
			</div>
		`;
		document.querySelector('#operaSatelliteEdit .signal').innerHTML=html6;
		gMenuPageName='operaSatelliteEdit';
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#operaSatelliteEdit .focus");
		var allList= curFocus.parentElement.children;
		var curList=[];
		for(var i=0;i<allList.length;i++){
			if(!hasClass(allList[i],'disabled')){
				curList.push(allList[i]);
			}
		}
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				removeClass(curFocus, 'focus');
				addClass(curList[0], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				removeClass(curFocus, 'focus');
				addClass(curList[curList.length - 1], 'focus');
			} else {
				removeClass(curFocus, 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//enter键  ||  右键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			this.focusIndex=[].indexOf.call(allList,curFocus);
			var curHtml=curFocus.querySelector('.lf').innerHTML;
			// console.log(curHtml);
			if(hasClass(curFocus,'scanSelect')){
				var obj={};
				if(curHtml=='Satellite status'){
					obj={
						name:'operaSatelliteEdit',
						popName:'Satellite status',
						"value":{
							"data":this.value.satStatus.data
						},
						"curVal":this.value.satStatus.curIndex
					}
				}
				if(curHtml=='LNB power'){
					obj={
						name:'operaSatelliteEdit',
						popName:'LNB power',
						"value":{
							"data":this.value.lnbPower.data
						},
						"curVal":this.value.lnbPower.curIndex
					}
				}
				if(curHtml=='LNB frequency'){
					var arr=[];
					for(var i in this.value.lnbFreq.data){
						arr.push(this.value.lnbFreq.data[i].value);
					}
					obj={
						name:'operaSatelliteEdit',
						popName:'LNB frequency',
						"value":{
							"data":arr
						},
						"curVal":this.value.lnbFreq.curIndex
					}
				}
				if(curHtml=='Tone 22KHz'){
					obj={
						name:'operaSatelliteEdit',
						popName:'Tone 22KHz',
						"value":{
							"data":this.value.Tone22k.data
						},
						"curVal":this.value.Tone22k.curIndex
					}
				}
				showSelect.render(obj);
			}
			//下一级scan页面
			if(hasClass(curFocus,'scanNext')){
				if(curHtml=='DiSEqC set'){
					operaSatelliteDiSEqC.render(this.prevObj,this.value.disEqcSet,this.signal);
				}
				if(curHtml=='Transponder'){
					operaSatelliteTransponder.render(this.prevObj,this.value.transponder);
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			//设置并返回上一级页面
			gWzdDvbsAntennaSetupData.setData(this.prevObj.item.SatelliteRecordID,this.value,this.setCallback);
		}
	},
	setCallback:function(data){
		// console.log(data);
		if(data.error.code==0){
			operaSatelliteList.page=operaSatelliteEdit.prevObj.page;
			operaSatelliteList.focusIndex=operaSatelliteEdit.prevObj.index;
			operaSatelliteList.render(operaSatelliteEdit.prevObj.scanMethod,operaSatelliteEdit.prevObj.antennaType);
		}
	}
}
var operaSatelliteList={
	scanMethod:0,
	antennaType:0,
	result: {},
	list:[],
	page: 0,
	focusIndex: 0,
	scanMethod:'',
	render:function(scanMethod,antennaType){
		this.scanMethod=scanMethod;
		this.antennaType=antennaType;
		gWzdSelectSatelliteList.getData(this.scanMethod,this.antennaType,this.renderCallBack);
	},
	renderCallBack:function(data){
		if(data.error.code==0){
			operaSatelliteList.result=data.result.Satellites;
			operaSatelliteList.list = sliceArr(operaSatelliteList.result, 9);
			operaSatelliteList.renderData();
		}
	},
	renderData:function(){
		var html = '<div id="operaSatelliteList" class="channelSkip">';
		for(var i = 0; i < this.list[this.page].length; i++) {
			var html1 = `
					<div class="listItem">
						<div class="number">${this.list[this.page][i].Index}</div>
						<div class="acName">
							<div>${this.list[this.page][i].SatelliteName}</div>
						`;
						var html2=``;
						if(this.antennaType==0){
							if(JSON.parse(localStorage.getItem("gWzdAllDefine")).APP_DVBS_DISEQC_IMPROVE=='1'){
								html2=`<div>${this.list[this.page][i].Diseqc12Status}+${this.list[this.page][i].Diseqc11Status}+${this.list[this.page][i].Diseqc10Status}</div>`;
							}else{
								html2=`<div>${this.list[this.page][i].Diseqc10Status}</div>`;
							}
						}else{
							html2=`<div>${this.list[this.page][i].Position}</div>`;
						}
						var html3=`	
						</div>
						<div class="sel">${this.list[this.page][i].SatelliteStatus}</div>
					</div>
					`;
			html+=html1+html2+html3;
		}
		document.querySelector('#showList').innerHTML = html + '</div>';
		addClass(document.querySelector('#operaSatelliteList').getElementsByClassName('listItem')[this.focusIndex],'focus');
		document.querySelector('.menuOperate').innerHTML=`
			<div class="operaEnter">Set</div>
			<div class="operaSelect">Select</div>
			<div class="operaNext">Next</div>
			<div class="operaExit">Back</div>
		`;
		gMenuPageName='operaSatelliteList';
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#operaSatelliteList .focus");
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
				this.focusIndex = 0;
				this.renderData();
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
				this.focusIndex = this.list[this.page].length - 1;
				this.renderData();
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			//扫台页面
			if(curFocus.querySelector('.sel').innerHTML=='On'){
				if(this.scanMethod==3){
					operaSateManualScanStart.render();
				}else{
					operaSateChannelScanStart.render();
				}
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
				this.renderData();
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[0], 'focus');
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			//编辑页面
			var obj={
				scanMethod:this.scanMethod,
				antennaType:this.antennaType,
				item:this.list[this.page][curIndex],
				page:this.page,
				index:curIndex
			}
			operaSatelliteEdit.render(obj);
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			reRenderList();
		}
	}
}
var operaSateAntennaType={
	userBandList:[],
	focusIndex:0,
	curAntennaType:1,
	curTuner:0,
	curBandFrequency:0,
	BandFrequencyDefine:'User define',
	AntennaType:[],
	Tuner:[],
	BandFrequency:[],
	// curSubTuner:0,
	// curSubBandFrequency:0,
	// SubBandFrequencyDefine:'User define',
	// SubTuner:['User band 1','User band 2','User band 3','User band 4','User band 5'
	// ,'User band 6','User band 7','User band 8'],
	// SubBandFrequency:['1210','3333','5656','1213','6787','User define'],
	render:function(){
		gWzdAntennaCfgData.getData(this.getdata);
	},
	getdata:function(data){
		operaSateAntennaType.curAntennaType=data.curAntennaTypeIdex;
		operaSateAntennaType.curTuner=data.curUserBandIdex;
		operaSateAntennaType.curBandFrequency=data.curFreqIdex;
		var AntennaTypeList=[];
		for(var i in data.data){
			AntennaTypeList.push(data.data[i].name);
		}
		operaSateAntennaType.AntennaType=AntennaTypeList;
		if(operaSateAntennaType.curAntennaType==0){
			operaSatelliteList.render(0,operaSateAntennaType.curAntennaType);
		}else{
			operaSateAntennaType.userBandList=data.data[data.curAntennaTypeIdex].userBand;
			operaSateAntennaType.renderData();
		}
	},
	renderData:function(){
		var tunerList=[];
		for(var j in this.userBandList){
			tunerList.push(this.userBandList[j].name);
		}
		this.Tuner=tunerList;
		this.BandFrequency=this.userBandList[this.curTuner].bandFreq;

		// 有SubTuner和SubBandFrequency
		// var html1=`
		// 	<div id="operaSateAntennaType">
		// 		<div class="scanList">
		// 			<div class="listItem disabled">
		// 				<div class="lf">Antenna Type</div>
		// 				<div class="mid">${this.AntennaType[this.curAntennaType]}</div>
		// 				<div class="rt"><span></span></div>
		// 			</div>
		// 		</div>
		// 		<div class="scanList selectList">
		// 			<div class="listItem">
		// 				<div class="lf">Tuner</div>
		// 				<div class="mid">${this.Tuner[this.curTuner]}</div>
		// 				<div class="rt"><span></span></div>
		// 			</div>
		// 			<div class="listItem BandFrequency">
		// 				<div class="lf">Band frequency</div>
		// 				`;
		// 				var html2=`<div class="mid">${this.BandFrequency[this.curBandFrequency]}</div>`;
		// 				var html3=`
		// 				<div class="rt"><span></span></div>
		// 			</div>
		// 			<div class="listItem">
		// 				<div class="lf">SubTuner</div>
		// 				<div class="mid">${this.SubTuner[this.curSubTuner]}</div>
		// 				<div class="rt"><span></span></div>
		// 			</div>
		// 			<div class="listItem SubBandFrequency">
		// 				<div class="lf">SubBand frequency</div>
		// 				`;
		// 				var html4=`<div class="mid">${this.SubBandFrequency[this.curSubBandFrequency]}</div>`;
		// 				var html5=`
		// 				<div class="rt"><span></span></div>
		// 			</div>
		// 		</div>
		// 	</div>
		// `;
		// document.querySelector('#showList').innerHTML=html1+html2+html3+html4+html5;
		
		
		//无SubTuner和SubBandFrequency
		var html1=`
			<div id="operaSateAntennaType">
				<div class="scanList">
					<div class="listItem disabled">
						<div class="lf">Antenna Type</div>
						<div class="mid">${this.AntennaType[this.curAntennaType]}</div>
						<div class="rt"><span></span></div>
					</div>
				</div>
				<div class="scanList selectList">
					<div class="listItem">
						<div class="lf">Tuner</div>
						<div class="mid">${this.Tuner[this.curTuner]}</div>
						<div class="rt"><span></span></div>
					</div>
					<div class="listItem BandFrequency">
						<div class="lf">Band frequency</div>
						`;
						var html2=``;
						if(this.curBandFrequency==this.BandFrequency.length-1){
							html2=`<div class="mid">${this.BandFrequencyDefine}</div>`
						}else{
							html2=`<div class="mid">${this.BandFrequency[this.curBandFrequency]}</div>`
						}
						var html3=`
						<div class="rt"><span></span></div>
					</div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML=html1+html2+html3;
		gMenuPageName='operaSateAntennaType';
		addClass(document.querySelector('#operaSateAntennaType .selectList').getElementsByClassName('listItem')[this.focusIndex],'focus');
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#operaSateAntennaType .focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				// if(hasClass(curFocus,'SubBandFrequency')&&this.curSubBandFrequency==this.SubBandFrequency.length-1){
				// 	if(this.SubBandFrequencyDefine<950){
				// 		this.SubBandFrequencyDefine=950;
				// 	}
				// 	if(this.SubBandFrequencyDefine>2150){
				// 		this.SubBandFrequencyDefine=2150;
				// 	}
				// 	curFocus.querySelector('.mid').innerHTML=`${this.SubBandFrequencyDefine}`;
				// }
				removeClass(curList[curList.length - 1], 'focus');
				addClass(curList[0], 'focus');
			} else {
				if(hasClass(curFocus,'BandFrequency')&&this.curBandFrequency==this.BandFrequency.length-1){
					if(this.BandFrequencyDefine<950){
						this.BandFrequencyDefine=950;
					}
					if(this.BandFrequencyDefine>2150){
						this.BandFrequencyDefine=2150;
					}
					curFocus.querySelector('.mid').innerHTML=`${this.BandFrequencyDefine}`;
				}
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
				// if(hasClass(curFocus,'SubBandFrequency')&&this.curSubBandFrequency==this.SubBandFrequency.length-1){
				// 	if(this.SubBandFrequencyDefine<950){
				// 		this.SubBandFrequencyDefine=950;
				// 	}
				// 	if(this.SubBandFrequencyDefine>2150){
				// 		this.SubBandFrequencyDefine=2150;
				// 	}
				// 	curFocus.querySelector('.mid').innerHTML=`${this.SubBandFrequencyDefine}`;
				// }
				if(hasClass(curFocus,'BandFrequency')&&this.curBandFrequency==this.BandFrequency.length-1){
					if(this.BandFrequencyDefine<950){
						this.BandFrequencyDefine=950;
					}
					if(this.BandFrequencyDefine>2150){
						this.BandFrequencyDefine=2150;
					}
					curFocus.querySelector('.mid').innerHTML=`${this.BandFrequencyDefine}`;
				}
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT){
			switch (curIndex){
				case 0:
					var obj={
						name:'operaSateAntennaType',
						popName:'Tuner',
						value:{
							data:this.Tuner
						},
						curVal:this.curTuner
					}
					showSelect.render(obj);
				break;
				case 1:
					if(curFocus.querySelector('.inputNum')){
					}else{
						var obj={
							name:'operaSateAntennaType',
							popName:'Band frequency',
							value:{
								data:this.BandFrequency
							},
							curVal:this.curBandFrequency
						}
						showSelect.render(obj);
					}	
				break;
				// case 2:
				// 	var obj={
						// name:'operaSateAntennaType',
						// popName:'SubTuner',
				// 		value:{
				// 			data:this.SubTuner
				// 		},
				// 		curVal:this.curSubTuner
				// 	}
				// 	showSelect.render(obj);
				// break;
				// case 3:
				// 	if(curFocus.querySelector('.inputNum')){
				// 	}else{
				// 		var obj={
						// name:'operaSateAntennaType',
						// popName:'SubBand frequency',
				// 			value:{
				// 				data:this.SubBandFrequency
				// 			},
				// 			curVal:this.curSubBandFrequency
				// 		}
				// 		showSelect.render(obj);
				// 	}			
				// break;
			}
		}
		//enter
		if(e.keyCode == KeyEvent.DOM_VK_ENTER){
			if(hasClass(curFocus,'BandFrequency')&&this.curBandFrequency==this.BandFrequency.length-1){
				if(this.BandFrequencyDefine=='User define'){
					this.BandFrequencyDefine=0;
				}
				curFocus.querySelector('.mid').innerHTML=`<div class="inputNum">${this.BandFrequencyDefine}</div>`;
			}
			// else if(hasClass(curFocus,'SubBandFrequency')&&this.curSubBandFrequency==this.SubBandFrequency.length-1){
			// 	if(this.SubBandFrequencyDefine=='User define'){
			// 		this.SubBandFrequencyDefine=0;
			// 	}
			// 	curFocus.querySelector('.mid').innerHTML=`<div class="inputNum">${this.SubBandFrequencyDefine}</div>`;
			// }
			else{
				var obj={
					"AntennaType":this.curAntennaType,
					"Tuner":this.curTuner,
					"SubTuner":0,
					"SubBandFrequency":1920,
			   	};
				if(this.BandFrequency[this.curBandFrequency]=='User define'){
					if(this.BandFrequencyDefine=='User define'){
						obj.BandFrequency=0;
					}else{
						obj.BandFrequency=this.BandFrequencyDefine;
					}
				}else{
					obj.BandFrequency=this.BandFrequency[this.curBandFrequency];
				}
			  	gWzdAntennaCfgData.setData(obj,this.setdata);
			}
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(hasClass(curFocus,'BandFrequency')){
				if(this.curBandFrequency==this.BandFrequency.length-1){
					if(this.BandFrequencyDefine.length<4){
						this.BandFrequencyDefine+=e.key;
					}else{
						this.BandFrequencyDefine=e.key;
					}	
					curFocus.querySelector('.inputNum').innerHTML=this.BandFrequencyDefine;
				}
			}
			// if(hasClass(curFocus,'SubBandFrequency')){
			// 	if(this.curSubBandFrequency==this.SubBandFrequency.length-1){
			// 		if(this.SubBandFrequencyDefine.length<4){
			// 			this.SubBandFrequencyDefine+=e.key;
			// 		}else{
			// 			this.SubBandFrequencyDefine=e.key;
			// 		}	
			// 		curFocus.querySelector('.inputNum').innerHTML=this.SubBandFrequencyDefine;
			// 	}
			// }
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			reRenderList();
		}
	},
	setdata:function(data){
		// console.log(data);
		if(data.error.code==0){
			operaSatelliteList.render(0,operaSateAntennaType.curAntennaType);
		}
	}
}
var operaSateChannelReScan={
	value:[],
	curCty:'',
	render:function(){
		window.gSocket.send({
			"method": "mtk.webui.config.queryValue",
			"params": {
				"configId": ["g_country__country"]
			}
		},data=>{
			this.curCty=data.result[0].current;
			if(gWzdDvbsOperatorData.enterOperator(this.curCty)){
				operaSateChannelScanStart.enterOperator='true';//enterOperator为true,进入选择operator，scan的时候scanMode不可以选择，否则可选择
				this.value=gWzdDvbsOperatorData.getData(this.curCty);
				this.renderData();
			}else{
				operaSateAntennaType.render();
			}
		});
	},
	renderData:function(){
		var html1=`<div id="cableChannelScan">`;
		var html2=``;
		for(var i=0;i<this.value.length;i++){
			if(i==0){
				html2+=`<div class='listItem focus'>${this.value[i]}</div>`
			}else{
				html2+=`<div class='listItem'>${this.value[i]}</div>`
			}
		}
		document.querySelector('#showList').innerHTML=html1+html2+`</div>`;
		gMenuPageName='operaSateChannelReScan';
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#cableChannelScan .focus");
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
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			window.gSocket.send({
				"method": "mtk.webui.channelscan.dvbs.setDvbsOperator",
				"params":this.value[curIndex]
			},data=>{
				// console.log(data);
				if(data.error.code==0){
					if(gWzdDvbsOperatorData.enterM7Scan(this.curCty,curIndex)){
						//搜索卫星页面
						searchSatellite.render();
					}else{
						operaSateAntennaType.render();
					}
				}
			});
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			reRenderList();
		}
	}
}
var operaSateChannelAddScan={
	render:function(){
		gWzdAntennaCfgData.getData(this.getdata);
	},
	getdata:function(data){
		// console.log(data);
		operaSatelliteList.render(1,data.curAntennaTypeIdex);
	}
}
var operaSateChannelUpdateScan={
	render:function(){
		gWzdAntennaCfgData.getData(this.getdata);
	},
	getdata:function(data){
		// console.log(data);
		operaSatelliteList.render(2,data.curAntennaTypeIdex);
	}
}
var operaSateChannelManualTuningScan={
	render:function(){
		gWzdAntennaCfgData.getData(this.getdata);
	},
	getdata:function(data){
		// console.log(data);
		operaSatelliteList.render(3,data.curAntennaTypeIdex);
	}
}


//**************Cable*****************
var cableSingleRFScan={
	modulation:'',
	frequency:'',
	symbolRate:'',
	signal:{},
	digitalScan:'false',
	render:function(){
		window.gSocket.send({
			"method": "mtk.webui.config.queryValue",
			"params": {
				"configId": ["g_country__country"]
			}
		},data=>{
			if(data.error.code==0){
				this.curCty=data.result[0].current;
				var result=gWzdDvbcInfoPageData.getData(this.curCty,null);
				this.frequency=result.freq[0];
				gWzdDvbcInfoPageData.getSymRateData(this.getSymbol.bind(this));
				// this.getSymbol();
			}else{
				console.log('getCountry error: '+data);
			}
		});
	},
	getSymbol:function(data){
		// console.log(data);
		this.modulation=data.modulation;
		this.symbolRate=data.symRate;
		window.gSocket.send({
			"method":"mtk.webui.broadcast.querySignalInfo"
		}, data1=> {
			// console.log(data1);
			if(data1.error.code==0){
				this.signal=data1.result;
				this.renderData();
			}else{
				console.log('signal query error');
			}
		});
	},
	renderData:function(){
		var html = `
			<div id="cableSingleRFScan">
				<div class="scanProgress">
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">Scan single RF Channels.(Digital Only)</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							<div class="progress">
								<div style="width:0rem" class="front"></div>
							</div>
						</div>
						<div class="rt">0%</div>
					</div>
				</div>
				<div class="scanList scanTerms">
					<div class="listItem focus freq listItemNum">
						<div class="lf">Frequency(KHz)</div>
						<div class="mid">
							<div class="inputNum">${this.frequency}</div>
						</div>
						<div class="rt"></div>
					</div>
					<div class="listItem modula">
						<div class="lf">Modulation</div>
						<div class="mid">${this.modulation}</div>
						<div class="rt"><span></span></div>
					</div>
					<div class="listItem symbol listItemNum">
						<div class="lf">Symbol Rate(Ksym/s)</div>
						<div class="mid">
							<div class="inputNum">${this.symbolRate}</div>
						</div>
						<div class="rt"></div>
					</div>
				</div>
				<div class="scanList">
					<div class="listItem">
						<div class="lf">Signal Level</div>
						<div class="mid progress">
							<div style="left:${this.signal.level/100*22}rem" class="front"></div>
						</div>
						<div class="rt">${Math.round((this.signal.level /100) * 10000) / 100.00}%</div>
					</div>
					<div class="listItem">
						<div class="lf">Signal Quality</div>
						<div class="mid progress">
							<div style="left:${this.signal.quality/100*22}rem" class="front"></div>
						</div>
						<div class="rt">${Math.round((this.signal.quality /100) * 10000) / 100.00}%</div>
					</div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML = html;
		gMenuPageName='cableSingleRFScan';
	},
	keyEvent:function(e){
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(this.digitalScan=='true'){
				cableSingleRFScan.digitalScan='false';
				window.gSocket.removeEventListener("mtk.webui.channelscan.dvbc.notify", this.notify);
			}else{
				reRenderList();
			}
		}else{
			var curFocus = document.querySelector("#cableSingleRFScan .listItem.focus");
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
			if(e.keyCode == KeyEvent.DOM_VK_RIGHT){
				if(hasClass(curFocus,'modula')){
					this.moduSelect();
				}
			}
			//enter键
			if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
				if(hasClass(curFocus,'modula')){
					this.moduSelect();
				}
				//扫台
				if(hasClass(curFocus,'listItemNum')){
					this.digitalScan='true';
					removeClass(curFocus,'focus');
					this.frequency=document.querySelector("#cableSingleRFScan .freq .inputNum").innerHTML;
					this.symbolRate=document.querySelector("#cableSingleRFScan .symbol .inputNum").innerHTML;
					var msg={
						"method": "mtk.webui.channelscan.dvbc.startScan",
						"params":{
							"countryId":this.curCty,
							"cfgFlag":null,
							"defSetting":false,
							"scanType":2,
							"nitMode":0,
							"startFreq":this.frequency,
							"endFreq":this.frequency,
							"modulation":this.modulation,
							"symRate":this.symbolRate
						}
					}
					window.gSocket.send(msg,data=>{
						console.log(data);
					});
					window.gSocket.addEventListener("mtk.webui.channelscan.dvbc.notify", this.notify);
				}
			}
			//数字键
			if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
				e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
				e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
				e.keyCode == KeyEvent.DOM_VK_9) {
				if(hasClass(curFocus,'listItemNum')){
					var maxLeng;
					if(hasClass(curFocus,'freq')){
						maxLeng=6;
					}
					if(hasClass(curFocus,'symbol')){
						maxLeng=4;
					}
					if(curFocus.querySelector('.inputNum').innerHTML.length<maxLeng){
						curFocus.querySelector('.inputNum').innerHTML+=e.key;
					}else{
						curFocus.querySelector('.inputNum').innerHTML=e.key;
					}
				}
			}
		}
	},
	notify:function(data){
		var html=`
			<div class="scanProgressItem">
				<div class="lf"></div>
				<div class="mid">Status: Scanning...</div>
				<div class="rt"></div>
			</div>
			<div class="scanProgressItem">
				<div class="lf"></div>
				<div class="mid">Digital Channels: ${data.params.chNum}</div>
				<div class="rt"></div>
			</div>
			<div class="scanProgressItem">
				<div class="lf"></div>
				<div class="mid">
					<div class="progress">
						<div style="width:${data.params.progress/100*30}rem" class="front"></div>
					</div>
				</div>
				<div class="rt">${Math.round((data.params.progress /100) * 10000) / 100.00}%</div>
			</div>
		`;
		document.querySelector('#cableSingleRFScan .scanProgress').innerHTML=html;
		if(data.params.progress==100){
			addClass(document.querySelector('#cableSingleRFScan .scanTerms .listItem'),'focus');
			cableSingleRFScan.digitalScan='false';
			window.gSocket.removeEventListener("mtk.webui.channelscan.dvbc.notify", cableChannelScanStart.notify);
			document.querySelector('#cableSingleRFScan .scanProgressItem').innerHTML=`
				<div class="scanProgressItem">
					<div class="lf"></div>
					<div class="mid">Status: Scan Complete</div>
					<div class="rt"></div>
				</div>
			`;
		}
	},
	moduSelect:function(){
		var arr=['Auto','16QAM','32QAM','64QAM','128QAM','256QAM'];
		var obj={
			name:'cableSingleRFScan',
			popName:'Modulation',
			value:{
				data:arr
			},
			curVal:[].indexOf.call(arr,this.modulation)
		}
		this.frequency=document.querySelector("#cableSingleRFScan .freq .inputNum").innerHTML;
		this.symbolRate=document.querySelector("#cableSingleRFScan .symbol .inputNum").innerHTML;
		showSelect.render(obj);
	}
}
var cableChannelScanStart={
	curCty:'',
	curObj:{},
	curIndex:0,
	focusIndex:0,
	digitalScan:'false',
	analogScan:'false',
	render:function(cty,oper){
		this.curCty=cty;
		this.curObj=gWzdDvbcInfoPageData.getData(cty,oper);
		this.renderData();
	},
	renderData:function(){
		var html1 = `
			<div id="cableChannelScanStart">
				<div class="scanProgress">
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">Scan All Channels.</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							<div class="progress">
								<div style="width:0rem" class="front"></div>
							</div>
						</div>
						<div class="rt">0%</div>
					</div>
				</div>
				<div class="scanList">
				`;
				var html2=``;
				if(this.curObj.scanMode.length==1){
					this.focusIndex=1;
					html2=`
						<div class="listItem disabled cableSelect scanMode">
							<div class="lf">Scan Mode</div>
							<div class="mid">${this.curObj.scanMode[this.curIndex]}</div>
							<div class="rt"><span></span></div>
						</div>
					`;
				}else{
					html2=`
						<div class="listItem cableSelect scanMode">
							<div class="lf">Scan Mode</div>
							<div class="mid">${this.curObj.scanMode[this.curIndex]}</div>
							<div class="rt"><span></span></div>
						</div>
					`;
				}
				var html3=``;
				if(this.curObj.freq.length==0){
					html3=`
						<div class="listItem cableInput frequency">
							<div class="lf">Frequency(KHz)</div>
							<div class="mid">
								<div class="inputNum"></div>
							</div>
							<div class="rt"></div>
						</div>
					`;
				}else{
					if(this.curObj.freq[this.curIndex]!='disable'){
						html3=`
							<div class="listItem cableInput frequency">
								<div class="lf">Frequency(KHz)</div>
								<div class="mid">
									<div class="inputNum">${this.curObj.freq[this.curIndex]}</div>
								</div>
								<div class="rt"></div>
							</div>
						`;
					}
				}
				var html4=``;
				if(this.curObj.netWorkId==0){
					html4=`
						<div class="listItem cableInput networkID">
							<div class="lf">Network ID</div>
							<div class="mid">
								<div class="inputNum"></div>
							</div>
							<div class="rt"></div>
						</div>
					`;
				}else{
					if(this.curObj.netWorkId[this.curIndex]!='disable'){
						html4=`
							<div class="listItem cableInput networkID">
								<div class="lf">Network ID</div>
								<div class="mid">
									<div class="inputNum">${this.curObj.netWorkId[this.curIndex]}</div>
								</div>
								<div class="rt"></div>
							</div>
						`;
					}
				}
				var html5=`
					<div class="listItem cableScan">
						<div class="lf">Scan</div>
						<div class="mid"></div>
						<div class="rt"><span></span></div>
					</div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML = html1+html2+html3+html4+html5;
		addClass(document.querySelector('#cableChannelScanStart').getElementsByClassName('listItem')[this.focusIndex],'focus');
		gMenuPageName='cableChannelScanStart';
	},
	keyEvent:function(e){	
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(this.digitalScan=='false'&&this.analogScan=='false'){
				reRenderList();
			}else {
				if(this.digitalScan=='true'){
					window.gSocket.send({
						"method": "mtk.webui.channelscan.dvbc.cancelScan"
					},data=>{
						// console.log(data);
						if(data.error.code==0){
							window.gSocket.removeEventListener("mtk.webui.channelscan.dvbc.notify", this.notify);
							this.digitalScan='false';
							var cur=document.querySelector("#cableChannelScanStart").getElementsByClassName('listItem');
							addClass(cur[this.focusIndex],'focus');
						}else{
							console.log('cableScanCancel error: '+data);
						}
					});
				}
				if(this.analogScan=='true'){
					window.gSocket.send({
						"method": "mtk.webui.channelScan.palSecam.cancelScan"
					},data=>{
						// console.log(data);
						if(data.error.code==0){
							this.analogScan='false';
							window.gSocket.removeEventListener("mtk.webui.channelScan.scanNotify", this.notifyAnalog);				
							var cur=document.querySelector("#cableChannelScanStart").getElementsByClassName('listItem');
							addClass(cur[this.focusIndex],'focus');
						}else{
							console.log('cableAnalogScanCancel error: '+data);
						}
					});
				}
			}
		}else{
			if(this.digitalScan=='false'&&this.analogScan=='false'){
				var curFocus = document.querySelector("#cableChannelScanStart .focus");
				var allList = curFocus.parentElement.children;
				var curList=[];
				for(var i=0;i<allList.length;i++){
					if(!hasClass(allList[i],'disabled')){
						curList.push(allList[i]);
					}
				}
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
					if(hasClass(curFocus,'cableScan')){
						document.querySelector('#cableChannelScanStart .scanProgress').innerHTML=`
							<div class="scanProgressItem">
								<div class="lf"></div>
								<div class="mid">Status: Scanning...</div>
								<div class="rt"></div>
							</div>
							<div class="scanProgressItem analogChannel">
								<div class="lf"></div>
								<div class="mid">Analog Channels: 0</div>
								<div class="rt"></div>
							</div>
							<div class="scanProgressItem digitalChannel">
								<div class="lf"></div>
								<div class="mid">Digital Channels: 0</div>
								<div class="rt"></div>
							</div>
							<div class="scanProgressItem progressShow">
								<div class="lf"></div>
								<div class="mid">
									<div class="progress">
										<div style="width:0rem" class="front"></div>
									</div>
								</div>
								<div class="rt">0%</div>
							</div>
						`;
						//开始扫台
						this.focusIndex=[].indexOf.call(allList,curFocus);
						removeClass(curFocus,'focus');
						this.digitalScan='true';
						var msg={
							"method": "mtk.webui.channelscan.dvbc.startScan",
							"params":{
								"countryId":this.curCty,
								"cfgFlag":null,
								"defSetting":false,
								"scanType":'',
								"nitMode":'',
								"startFreq":'',
								"endFreq":'',
								"nwId":''
							}
						}
						for(var c=0;c<curList.length;c++){
							if(hasClass(curList[c],'scanMode')){
								var mode=curList[c].querySelector('.mid').innerHTML;
								if(mode=='Advance'){
									msg.params.scanType=2;
									msg.params.nitMode=0;
								}
								if(mode=='Quick'){
									msg.params.scanType=1;
									msg.params.nitMode=2;
								}
								if(mode=='Full'){
									msg.params.scanType=1;
									msg.params.nitMode=0;
								}
							}
							if(hasClass(curList[c],'frequency')){
								msg.params.startFreq=curList[c].querySelector('.inputNum').innerHTML;
								msg.params.endFreq=curList[c].querySelector('.inputNum').innerHTML;
							}
							if(hasClass(curList[c],'networkID')){
								msg.params.nwId=curList[c].querySelector('.inputNum').innerHTML;
							}
						}
						window.gSocket.send(msg,data=>{
							console.log(data);
						});
						window.gSocket.addEventListener("mtk.webui.channelscan.dvbc.notify", this.notify);
					}
					if(hasClass(curFocus,'cableSelect')){
						var obj={
							name:'cableChannelScanStart',
							popName:'Scan Mode',
							value:{
								data:this.curObj.scanMode
							},
							curVal:this.curIndex
						}
						showSelect.render(obj);
					}
				}
				//数字键
				if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
					e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
					e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
					e.keyCode == KeyEvent.DOM_VK_9) {
					if(hasClass(curFocus,'cableInput')){
						if(curFocus.querySelector('.inputNum').innerHTML.length<6&&curFocus.querySelector('.inputNum').innerHTML!='AUTO'){
							curFocus.querySelector('.inputNum').innerHTML+=e.key;
						}else{
							curFocus.querySelector('.inputNum').innerHTML=e.key;
						}
					}
				}
			}
		}
	},
	notify:function(data){
		// console.log(data);
		document.querySelector('#cableChannelScanStart .digitalChannel .mid').innerHTML='Digital Channels: '+data.params.chNum;
		document.querySelector('#cableChannelScanStart .progressShow .front').style.width=data.params.progress/100*30/2+'rem';
		if(data.params.progress%2==0){
			document.querySelector('#cableChannelScanStart .progressShow .rt').innerHTML=Math.round((data.params.progress /100) * 10000) / 100.00/2+'%';
		}
		if(data.params.progress==100){
			cableChannelScanStart.digitalScan='false';
			window.gSocket.removeEventListener("mtk.webui.channelscan.dvbc.notify", cableChannelScanStart.notify);
			cableChannelScanStart.analogScan='true';
			cableChannelScanStart.analog();
		}
	},
	analog:function(){
		window.gSocket.send({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
			"method": "mtk.webui.channelScan.palSecam.getFreqRange"
		},data=>{
			// console.log(data);
			if(data.error.code==0){
				var msg={
					"method": "mtk.webui.channelScan.palSecam.startScan",
					"params":{
						"scanType":2,
						"startFreq":data.result.lowerFreq,
						"endFreq":data.result.upperFreq
					}
				}
				window.gSocket.send(msg,data1=>{
				});
				window.gSocket.addEventListener("mtk.webui.channelScan.scanNotify", this.notifyAnalog);
			}else{
				console.log('analogScan error: '+data2);
			}
		});	
	},
	notifyAnalog:function(data){
		// console.log(data);
		document.querySelector('#cableChannelScanStart .analogChannel .mid').innerHTML='Analog Channels: '+data.params.chNum;
		document.querySelector('#cableChannelScanStart .progressShow .front').style.width=(15+data.params.progress/100*30/2)+'rem';
		if(data.params.progress%2==0){
			document.querySelector('#cableChannelScanStart .progressShow .rt').innerHTML=50+Math.round((data.params.progress /100.00/2) * 10000) / 100.00+'%';
		}
		if(data.params.progress==100){
			cableChannelScanStart.analogScan='false';
			window.gSocket.removeEventListener("mtk.webui.channelScan.scanNotify", cableChannelScanStart.notifyAnalog);
		}
	}
}
var cableChannelScan={
	curCty:'',
	value:[],
	render:function(){
		window.gSocket.send({
			"method": "mtk.webui.config.queryValue",
			"params": {
				"configId": ["g_country__country"]
			}
		},data=>{
			this.curCty=data.result[0].current;
			if(gWzdDvbcOperatorData.enterOperator(this.curCty)){
				this.value=gWzdDvbcOperatorData.getData(this.curCty);
				this.renderData();
			}else{
				cableChannelScanStart.render();
			}
		});
	},
	renderData:function(){
		var html1=`
			<div id="cableChannelScan">
				`;
				var html2=``;
				for(var i in this.value){
					if(i==0){
						html2+=`<div class='listItem focus'>${this.value[i]}</div>`;
					}else{
						html2+=`<div class='listItem'>${this.value[i]}</div>`;
					}
				}
				var html3=`
			</div>
		`;
		document.querySelector('#showList').innerHTML=html1+html2+html3;
		gMenuPageName='cableChannelScan';
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#cableChannelScan .focus");
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
			window.gSocket.send({
				"method": "mtk.webui.config.setValue",
				"params":  {
					"configId" :"g_bs__bs_cable_brdcster", 
					"value" : curFocus.innerHTML, 
					"apply" : true
				},
			},data=>{
				if(data.error.code==0){
					cableChannelScanStart.render(this.curCty,curFocus.innerHTML);
				}
			});
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			reRenderList();
		}
	}
}


//**************Antenna*******************
//Channel Scan
var favouriteNetworkPopUp={
	render:function(){
		window.gSocket.send({
			"method":"mtk.webui.channelscan.dvbt.getUIOpFavNwk"
		},data=>{
			var html1=`
				<div id="favouriteNetworkPopUp">
					<div class="scanList">
						<div class="listItem">Please select your favorite network:</div>
					</div>
					<div class="scanList">
					`;
					var html2=``;
					for(var i=0;i<data.result.List.length;i++){
						if(i==0){
							html2+=`<div class="listItem focus" data-index="${data.result.List[i].index}">${data.result.List[i].networkName}</div>`
						}else{
							html2+=`<div class="listItem" data-index="${data.result.List[i].index}">${data.result.List[i].networkName}</div>`
						}
					}
			document.querySelector('#showList').innerHTML = html1+html2+`</div></div>`;
			gMenuPageName='favouriteNetworkPopUp';
		});		
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector("#favouriteNetworkPopUp .focus");
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
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT || e.keyCode == KeyEvent.DOM_VK_ENTER) {
			window.gSocket.send({
				"method":"mtk.webui.channelscan.dvbt.uiOpSetFavNwk",
				"params":{
					"index":curFocus.getAttribute('data-index'),
					"networkName":curFocus.innerHTML
				}
			},data=>{
				// console.log(data);
				if(data.error.code==0){
					reRenderList();
				}
			});
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			antennaChannelScan.render();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			reRenderList();
		}
	}
}
var lcnConflictPopUp={
	list:[],
	arr:[],
	page:0,
	render:function(){
		window.gSocket.send({
			"method":"mtk.webui.channelscan.dvbt.getUIOpLcnConflictGroup"
		},data=>{
			// console.log(data);
			this.list=data.result.List.sort((a,b)=>{
				return a.groupIdx-b.groupIdx;
			});			
			var map = {};
			for(var i = 0; i < this.list.length; i++){
				var ai = this.list[i];
				if(!map[ai.groupIdx]){
					this.arr.push({
						groupIdx: ai.groupIdx,
						LCN:ai.LCN,
						data: [ai]
					});
					map[ai.groupIdx] = ai;
				}else{
					for(var j = 0; j < this.arr.length; j++){
						var dj = this.arr[j];
						if(dj.groupIdx == ai.groupIdx){
							dj.data.push(ai);
							break;
						}
					}
				}
			}
			this.renderData();
		});		
	},
	renderData:function(){
		// console.log(this.arr[this.page]);
		var html1=`
			<div id="lcnConflictPopUp">
				<div class="scanProgress">
					<div class="scanProgressItem">Status:Scan Complete</div>
					<div class="scanProgressItem">Analog Channels: 2</div>
					<div class="scanProgressItem">Digital Channels: 54</div>
					<div class="scanProgressItem">
						<div class="progress">
							<div style="left:${22-0.3}rem" class="front"></div>
						</div>
						<div><span class="dtvProgress">100</span>%</div>
					</div>
				</div>
				<div class="scanList">
					<div class="listItem">Conflict group index: <span>${this.arr[this.page].groupIdx}/6</span></div>
					<div class="listItem">Conflict channel number: <span>${this.arr[this.page].LCN}</span></div>
				</div>
				<div class="scanList">
		`;
		var html2=``;
		for(var i=0;i<this.arr[this.page].data.length;i++){
			if(i==0){
				html2+=`<div class="listItem focus">${this.arr[this.page].data[i].channelName}</div>`
			}else{
				html2+=`<div class="listItem">${this.arr[this.page].data[i].channelName}</div>`
			}
		}
		var html3=`
				<div class="listItem default">Use default setting for all</div>
			</div>
		</div>
		`;
		document.querySelector('#showList').innerHTML = html1+html2+html3;
		gMenuPageName='lcnConflictPopUp';
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector("#lcnConflictPopUp .focus");
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
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(hasClass(curFocus,'default')){
				reRenderList();
			}else{
				if(this.page==this.arr.length-1){
					reRenderList();
				}else{
					window.gSocket.send({
						"method":"mtk.webui.channelscan.dvbt.setUIOpLcnConflictGroup",
						"params":{
							"groupIdx":this.arr[this.page].groupIdx,
							"LCN":this.arr[this.page].LCN,
							"channelName":curFocus.innerHTML
						}
					},data=>{
						// console.log(data);
						if(data.error.code==0){
							this.page++;
							this.renderData();
						}
					});
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			reRenderList();
		}
	}
}
var targetRegionPoloUp={
	list:[],
	data:[],
	index1:0,
	index2:0,
	index3:0,
	render:function(){
		window.gSocket.send({
			"method":"mtk.webui.channelscan.dvbt.getUIOpTargetRegion"
		},data=>{
			// console.log(data);
			this.list=data.result.List;
			var region1=[],region2=[],region3=[];
			for(var i = 0; i < this.list.length; i++){
				if(this.list[i].level==1){
					region1.push(this.list[i]);
				}
				if(this.list[i].level==2){
					region2.push(this.list[i]);
				}
				if(this.list[i].level==3){
					region3.push(this.list[i]);
				}
			}
			var objArry = [];
			for (var i = 0; i < region1.length; i++) {
				var obj = {};
				obj.internalIdx = region1[i].internalIdx;
				obj.name = region1[i].name;
				obj.level = [];
				for (var j = 0; j < region2.length; j++) {
					if (region1[i].primary == region2[j].primary) {
						var obj2 = {};
						obj2.internalIdx = region2[j].internalIdx;
						obj2.name = region2[j].name;
						obj2.level = [];
						for (var k = 0; k < region3.length; k++) {
							if (region1[i].primary == region3[k].primary && region2[j].secondary == region3[k].secondary) {
								var obj3 = {};
								obj3.internalIdx = region3[k].internalIdx;
								obj3.name = region3[k].name;
								obj2.level.push(obj3);
							}

						}
						obj.level.push(obj2);
					}
				}
				objArry.push(obj);
			}
			this.data=objArry;
			this.renderData();
		});
	},
	renderData:function(){
		var html1=`
			<div id="targetRegionPoloUp">
				<div class="scanList">
					<div class="listItem">Select region</div>
				</div>
				<div class="scanList">
					<div class="listItem focus">
						<div class="lf">Region1</div>
						<div class="mid">${this.data[this.index1].name}</div>
						<div class="rt"><span></span></div>
					</div>
					<div class="listItem">
						<div class="lf">Region2</div>
						<div class="mid">${this.data[this.index1].level[this.index2].name}</div>
						<div class="rt"><span></span></div>
					</div>
					`;
					if(this.data[this.index1].level[this.index2].level.length==0){
						var html2=`
							<div class="listItem disabled">
								<div class="lf">Region3</div>
								<div class="mid">None Specified</div>
								<div class="rt"><span></span></div>
							</div>
						`;
					}else{
						var html2=`
							<div class="listItem">
								<div class="lf">Region3</div>
								<div class="mid">${this.data[this.index1].level[this.index2].level[this.index3].name}</div>
								<div class="rt"><span></span></div>
							</div>
						`;
					}
					
		document.querySelector('#showList').innerHTML=html1+html2+`</div></div>`;
		gMenuPageName='targetRegionPoloUp';
	},
	keyEvent:function(e){
		var curFocus = document.querySelector("#targetRegionPoloUp .focus");
		var allList = curFocus.parentElement.children;
		var curList=[];
		for(var s=0;s<allList.length;s++){
			if(!hasClass(allList[s],'disabled')){
				curList.push(allList[s]);
			}
		}
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
		//enter键 或 右键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT){
			if(curFocus.querySelector('.lf').innerHTML=='Region1'){
				// console.log(this.data);
				var obj={
					name:'targetRegionPoloUp',
					popName:'Region1',
					value:{
						data:[]
					},
					curVal: this.index1
				};
				for(var i=0;i<this.data.length;i++){
					obj.value.data.push(this.data[i].name);
				}
				showSelect.render(obj);
			}
			if(curFocus.querySelector('.lf').innerHTML=='Region2'){
				// console.log(this.data[this.index1].level);
				var obj={
					name:'targetRegionPoloUp',
					popName:'Region2',
					value:{
						data:[]
					},
					curVal: this.index2
				};
				for(var i=0;i<this.data[this.index1].level.length;i++){
					obj.value.data.push(this.data[this.index1].level[i].name);
				}
				showSelect.render(obj);
			}
			if(curFocus.querySelector('.lf').innerHTML=='Region3'){
				// console.log(this.data[this.index1].level[this.index2].level);
				var arr=this.data[this.index1].level[this.index2].level;
				var obj={
					name:'targetRegionPoloUp',
					popName:'Region3',
					value:{
						data:[]
					},
					curVal: this.index3
				};
				for(var i=0;i<arr.length;i++){
					obj.value.data.push(arr[i].name);
				}
				showSelect.render(obj);
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			var dataIndex;
			if(this.data[this.index1].level[this.index2].level!=0){
				//level3有值
				dataIndex=this.data[this.index1].level[this.index2].level[this.index3].internalIdx;
			}else if(this.data[this.index1].level!=0){
				//level2有值
				dataIndex=this.data[this.index1].level[this.index2].internalIdx;
			}else{
				//level1有值
				dataIndex=this.data[this.index1].internalIdx;
			}
			for(var i=0;i<this.list.length;i++){
				if(dataIndex==this.list[i].internalIdx){
					//set
					window.gSocket.send({
						"method":"mtk.webui.channelscan.dvbt.setUIOpTargetRegion",
						"params":this.list[i]
					},(data)=>{
						console.log(data);
						reRenderList();
					});
				}
			}
		}
	}
}
//channel scan
var antennaChannelScan = {
	digitalScan:'false',
	analogScan:'false',
	render: function() {
		var html = `
			<div id="antennaChannelScan">
				<div class="scanProgress">
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">Channel Scan</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">Status: Scanning...</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							Analog Channels: <span class="analogChannel">0</span>
						</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							Digital Channels: <span class="digitalChannel">0</span>
						</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							<div class="progress">
								<div style="width:0rem" class="front"></div>
							</div>
						</div>
						<div class="rt"><span class="dtvProgress">0</span>%</div>
					</div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML = html;
		gMenuPageName='antennaChannelScan';
		this.digitalScan='true';
		window.gSocket.send({
			"method": "mtk.webui.channelscan.dvbt.startScan",
			"params":{
				"scanType":1
			}
		},(data)=>{
//			console.log(data);
		});
		window.gSocket.addEventListener("mtk.webui.channelscan.dvbt.notify", this.notify);
	},
	notify:function(data){
		document.querySelector('.digitalChannel').innerHTML=data.params.progress;
		if((Math.round((data.params.progress /100) * 10000) / 100.00)%2==0){
			document.querySelector('.dtvProgress').innerHTML = (Math.round((data.params.progress /100) * 10000) / 100.00)/2;
		}
		document.querySelector('.front').style.width= data.params.progress/ 100 * 15+'rem';
		if(data.params.progress==100){
			antennaChannelScan.digitalScan='false';
			window.gSocket.removeEventListener("mtk.webui.channelscan.dvbc.notify", antennaChannelScan.notify);
			antennaChannelScan.analogScan='true';
			antennaChannelScan.analog();
		}
	},
	analog:function(){
		window.gSocket.send({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
			"method": "mtk.webui.channelScan.palSecam.getFreqRange"
		},data=>{
			// console.log(data);
			if(data.error.code==0){
				var msg={
					"method": "mtk.webui.channelScan.palSecam.startScan",
					"params":{
						"scanType":2,
						"startFreq":data.result.lowerFreq,
						"endFreq":data.result.upperFreq
					}
				}
				window.gSocket.send(msg,data1=>{
				});
				window.gSocket.addEventListener("mtk.webui.channelScan.scanNotify", this.notifyAnalog);
			}else{
				console.log('getFreqRange error: '+data);
			}
		});	
	},
	notifyAnalog:function(data){
		document.querySelector('.analogChannel').innerHTML=data.params.progress;
		if(data.params.progress%2==0){
			document.querySelector('.dtvProgress').innerHTML = 50+(Math.round((data.params.progress /100) * 10000) / 100.00)/2;
		}
		document.querySelector('.front').style.width= (15+data.params.progress/ 100 * 15)+'rem';
		if(data.params.progress==100){
			antennaChannelScan.analogScan='false';
			window.gSocket.removeEventListener("mtk.webui.channelScan.scanNotify", antennaChannelScan.notifyAnalog);
			window.gSocket.send({
				"method": "mtk.webui.channelscan.dvbt.getUIOperation"
			},data1=>{
				// console.log(data);
				if(data1.result.favouriteNetworkPopUp=='true'){
					favouriteNetworkPopUp.render();
				}
				if(data1.result.lcnConflictPopUp=='true'){
					lcnConflictPopUp.render();
				}
				if(data1.result.targetRegionPoloUp=='true'){
					targetRegionPoloUp.render();
				}
			});
		}
	},
	keyEvent: function(e) {
		//enter
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(this.digitalScan=='false'&&this.analogScan=='false'){
				this.render();
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(this.digitalScan=='false'&&this.analogScan=='false'){
				reRenderList();
			}else{
				if(this.digitalScan=='true'){
					window.gSocket.send({
						"method": "mtk.webui.channelscan.dvbt.cancelScan"
					},data=>{
						// console.log(data);
						if(data.error.code==0){
							window.gSocket.removeEventListener("mtk.webui.channelscan.dvbt.notify",this.notify);
							this.digitalScan='false';
						}else{
							console.log('cableScanCancel error: '+data);
						}
					});
				}
				if(this.analogScan=='true'){
					window.gSocket.send({
						"method": "mtk.webui.channelScan.palSecam.cancelScan"
					},data=>{
						// console.log(data);
						if(data.error.code==0){
							this.analogScan='false';
							window.gSocket.removeEventListener("mtk.webui.channelScan.scanNotify", this.notifyAnalog);				
						}else{
							console.log('cableAnalogScanCancel error: '+data);
						}
					});
				}
			}
		}
	}
}
//Update Scan
var antennaUpdateScan = {
	digitalScan:'false',
	analogScan:'false',
	render: function() {
		var html = `
			<div id="antennaChannelScan">
				<div class="scanProgress">
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">Channel Scan</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">Status: Scanning...</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							Analog Channels: <span class="analogChannel">0</span>
						</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							Digital Channels: <span class="digitalChannel">0</span>
						</div>
						<div class="rt"></div>
					</div>
					<div class="scanProgressItem">
						<div class="lf"></div>
						<div class="mid">
							<div class="progress">
								<div style="width:0rem" class="front"></div>
							</div>
						</div>
						<div class="rt"><span class="dtvProgress">0</span>%</div>
					</div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML = html;
		gMenuPageName='antennaUpdateScan';
		this.digitalScan='true';
		window.gSocket.send({
			"method": "mtk.webui.channelscan.dvbt.startScan",
			"params":{
				"scanType":3
			}
		},(data)=>{
//			console.log(data);
		});
		window.gSocket.addEventListener("mtk.webui.channelscan.dvbt.notify",this.notify);
	},
	notify:function(data){
		document.querySelector('.digitalChannel').innerHTML=data.params.progress;
		if((Math.round((data.params.progress /100) * 10000) / 100.00)%2==0){
			document.querySelector('.dtvProgress').innerHTML = (Math.round((data.params.progress /100) * 10000) / 100.00)/2;
		}
		document.querySelector('.front').style.width= data.params.progress/ 100 * 15+'rem';
		if(data.params.progress==100){
			antennaUpdateScan.digitalScan='false';
			window.gSocket.removeEventListener("mtk.webui.channelscan.dvbc.notify", antennaUpdateScan.notify);
			antennaUpdateScan.analogScan='true';
			antennaUpdateScan.analog();
		}
	},
	analog:function(){
		window.gSocket.send({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
			"method": "mtk.webui.channelScan.palSecam.getFreqRange"
		},data=>{
			// console.log(data);
			if(data.error.code==0){
				var msg={
					"method": "mtk.webui.channelScan.palSecam.startScan",
					"params":{
						"scanType":2,
						"startFreq":data.result.lowerFreq,
						"endFreq":data.result.upperFreq
					}
				}
				window.gSocket.send(msg,data1=>{
				});
				window.gSocket.addEventListener("mtk.webui.channelScan.scanNotify", this.notifyAnalog);
			}else{
				console.log('getFreqRange error: '+data);
			}
		});	
	},
	notifyAnalog:function(data){
		document.querySelector('.analogChannel').innerHTML=data.params.progress;
		if(data.params.progress%2==0){
			document.querySelector('.dtvProgress').innerHTML = 50+(Math.round((data.params.progress /100) * 10000) / 100.00)/2;
		}
		document.querySelector('.front').style.width= (15+data.params.progress/ 100 * 15)+'rem';
		if(data.params.progress==100){
			antennaUpdateScan.analogScan='false';
			window.gSocket.removeEventListener("mtk.webui.channelScan.scanNotify", antennaUpdateScan.notifyAnalog);
			window.gSocket.send({
				"method": "mtk.webui.channelscan.dvbt.getUIOperation"
			},data1=>{
				// console.log(data);
				if(data1.result.favouriteNetworkPopUp=='true'){
					favouriteNetworkPopUp.render();
				}
				if(data1.result.lcnConflictPopUp=='true'){
					lcnConflictPopUp.render();
				}
				if(data1.result.targetRegionPoloUp=='true'){
					targetRegionPoloUp.render();
				}
			});
		}
	},
	keyEvent: function(e) {
		//enter
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(this.digitalScan=='false'&&this.analogScan=='false'){
				this.render();
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(this.digitalScan=='false'&&this.analogScan=='false'){
				reRenderList();
			}else{
				if(this.digitalScan=='true'){
					window.gSocket.send({
						"method": "mtk.webui.channelscan.dvbt.cancelScan"
					},data=>{
						// console.log(data);
						if(data.error.code==0){
							window.gSocket.removeEventListener("mtk.webui.channelscan.dvbt.notify",this.notify);
							this.digitalScan='false';
						}else{
							console.log('cableScanCancel error: '+data);
						}
					});
				}
				if(this.analogScan=='true'){
					window.gSocket.send({
						"method": "mtk.webui.channelScan.palSecam.cancelScan"
					},data=>{
						// console.log(data);
						if(data.error.code==0){
							this.analogScan='false';
							window.gSocket.removeEventListener("mtk.webui.channelScan.scanNotify", this.notifyAnalog);				
						}else{
							console.log('cableAnalogScanCancel error: '+data);
						}
					});
				}
			}
		}
	}
}
//Analog Manual Scan
var antennaAnalogManual = {
	lowerFrequency:'',
	upperFrequency:'',
	curFrequency:'',
	analogScan:'false',
	render: function() {
		window.gSocket.send({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
			"method": "mtk.webui.channelScan.palSecam.getFreqRange"
		},data=>{
			// console.log(data);
			if(data.error.code==0){
				this.lowerFrequency=data.result.lowerFreq;
				this.curFrequency=data.result.lowerFreq;
				this.upperFrequency=data.result.upperFreq;
				this.renderData();
			}else{
				console.log('getFreqRange error: '+data);
			}
		});
	},
	renderData:function(){	
		var html = `<div id="analogManualScan">
						<div class="scanProgress">
							<div class="scanProgressItem">
								<div class="lf"></div>
								<div class="mid">Search for analog channels</div>
								<div class="rt"></div>
							</div>
						</div>
						<div class="scanList">
							<div class="listItem focus">
								<div class="lf">Start Frequency (MHz)</div>
								<div class="mid">
									<div class="inputNum">${String(this.curFrequency).split('.')[0]}.00</div>
								</div>
								<div class="rt"></div>
							</div>
							<div class="listItem listScan">
								<div class="lf">Scan Up</div>
								<div class="mid"></div>
								<div class="rt"><span></span></div>
							</div>
							<div class="listItem listScan">
								<div class="lf">Scan Down</div>
								<div class="mid"></div>
								<div class="rt"><span></span></div>
							</div>
						</div>
					</div>`;
		document.querySelector('#showList').innerHTML = html;
		gMenuPageName='antennaAnalogManual';
	},
	keyEvent: function(e) {	
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(this.analogScan=='true'){
				window.gSocket.send({
					"method": "mtk.webui.channelScan.palSecam.cancelScan"
				},data=>{
					// console.log(data);
					if(data.error.code==0){
						this.analogScan='false';
						window.gSocket.removeEventListener("mtk.webui.channelScan.scanNotify", this.notifyAnalog);				
						this.renderData();
					}else{
						console.log('cableAnalogScanCancel error: '+data);
					}
				});
			}else{
				reRenderList();
			}
		}else{
			if(this.analogScan=='false'){
				var curFocus = document.querySelector("#analogManualScan .focus");
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
				if(e.keyCode == KeyEvent.DOM_VK_RIGHT || e.keyCode == KeyEvent.DOM_VK_ENTER) {
					//开始扫台
					if(hasClass(curFocus,'listScan')){
						this.curFrequency=document.querySelector('#analogManualScan .inputNum').innerHTML.split('.')[0];
						document.querySelector('.scanProgress').innerHTML=`
							<div class="scanProgressItem">
								<div class="lf"></div>
								<div class="mid">Status: Scanning...</div>
								<div class="rt"></div>
							</div>
							<div class="scanProgressItem">
								<div class="lf"></div>
								<div class="mid">Frequency: ${this.curFrequency} MHz</div>
								<div class="rt"></div>
							</div>
						`;
						removeClass(curFocus,'focus');
						this.analogScan='true';
						var msg={
							"method": "mtk.webui.channelScan.palSecam.startScan",
							"params":{
								"scanType":2,
								"startFreq":'',
								"endFreq":''
							}
						}
						if(curIndex == 1) {
							msg.params.startFreq=this.curFrequency;
							msg.params.endFreq=this.upperFrequency;
						}
						if(curIndex == 2) {
							msg.params.startFreq=this.lowerFrequency;
							msg.params.endFreq=this.curFrequency;
						}
						window.gSocket.send(msg,data=>{
						});
						window.gSocket.addEventListener("mtk.webui.channelScan.scanNotify", this.notifyAnalog);
					}
				}
				//数字键
				if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
					e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
					e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
					e.keyCode == KeyEvent.DOM_VK_9) {
					if(curIndex == 0) {
						var inputVal = document.querySelector('#analogManualScan .inputNum').innerHTML.split('.')[0];
						if(inputVal.length < 3) {
							inputVal += e.key;
						} else {
							inputVal = e.key;
						}
						document.querySelector('#analogManualScan .inputNum').innerHTML = inputVal + '.00';
					}
				}
			}
		}
	},
	notifyAnalog:function(data){
		if(data.params.progress==100){
			antennaAnalogManual.analogScan='false';
			window.gSocket.removeEventListener("mtk.webui.channelScan.scanNotify", antennaAnalogManual.notifyAnalog);
		}
	},
}
//Single RF Scan
var antennaSingleRF = {
	list:[],
	listIndex:0,
	scanning:'false',
	signal:{},
	render: function() {
		window.gSocket.send({
			"method": "mtk.webui.channelscan.dvbt.getAllRf"
		},data=>{
			// console.log(data);
			this.list=data.result.List;
			this.getLevel();
		});
	},
	getLevel:function(){
		// console.log('getLevel');
		//获取Signal Level和Signal Quality
		window.gSocket.send({
			"method":"mtk.webui.broadcast.querySignalInfo"
		}, data=> {
			// console.log(data);
			if(data.error.code==0){
				this.signal=data.result;
				var html = `
					<div id="antennaSingleRF">
						<div class="scanProgress">
							<div class="scanProgressItem">
								<div class="lf"></div>
								<div class="mid">Scan single RF Channels.(Digital Only)</div>
								<div class="rt"></div>
							</div>
							<div class="scanProgressItem">
								<div class="lf"></div>
								<div class="mid">
									<div class="progress">
										<div style="width:0rem" class="front"></div>
									</div>
								</div>
								<div class="rt"><span class="dtvProgress">0</span>%</div>
							</div>
						</div>
						<div class="scanList">
							<div class="listItem focus">
								<div class="lf">RF Channel</div> 
								<div class="mid">${this.list[this.listIndex].rfIndex}</div>
								<div class="rt"><span></span></div>
							</div>
							<div class="listItem">
								<div class="lf">Signal Level</div> 
								<div class="mid progress">
									<div style="left:${this.signal.level/100*22-0.3}rem" class="front"></div>
								</div>
								<div class="rt">${(Math.round((this.signal.level /100) * 10000) / 100.00)}%</div>
							</div>
							<div class="listItem">
								<div class="lf">Signal Quality</div> 
								<div class="mid progress">
									<div style="left:${this.signal.quality/100*22-0.3}rem" class="front"></div>
								</div>
								<div class="rt">${(Math.round((this.signal.quality /100) * 10000) / 100.00)}%</div>
							</div>
						</div>
					</div>
				`;
				document.querySelector('#showList').innerHTML = html;
				gMenuPageName='antennaSingleRF';
			}
		})
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(this.scanning=='true'){
				window.gSocket.send({
					"method": "mtk.webui.channelscan.dvbt.cancelScan"
				},data=>{
					// console.log(data);
					if(data.error.code==0){
						window.gSocket.removeEventListener("mtk.webui.channelscan.dvbt.notify",this.notify);
						this.scanning='false';
						addClass(document.querySelector('#antennaSingleRF .listItem'),'focus');
					}else{
						console.log('cableScanCancel error: '+data);
					}
				});	
			}else{
				reRenderList();
			}
		}else{
			if(this.scanning=='false'){
				var curFocus=document.querySelector('#antennaSingleRF .focus');
				//右键
				if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
					var obj={
						name:'antennaSingleRF',
						popName:'RF Channel',
						value:{
							data:[]
						},
						curVal:this.listIndex
					}
					for(var l=0;l<this.list.length;l++){
						obj.value.data.push(this.list[l].rfIndex);
					}
					showSelect.render(obj);
				}
				if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
					//开始扫台
					document.querySelector('.scanProgress').innerHTML=`
						<div class="scanProgressItem">
							<div class="lf"></div>
							<div class="mid">Status: Scanning...</div>
							<div class="rt"></div>
						</div>
						<div class="scanProgressItem">
							<div class="lf"></div>
							<div class="mid">
								Digital Channels: <div class="channels">0</div>
							</div>
							<div class="rt"></div>
						</div>
						<div class="scanProgressItem">
							<div class="lf"></div>
							<div class="mid">
								<div class="progress">
									<div style="width:0rem" class="front"></div>
								</div>
							</div>
							<div class="rt"><span class="dtvProgress">0</span>%</div>
						</div>
					`;
					this.scanning='true';
					removeClass(curFocus,'focus');
					window.gSocket.send({
						"method": "mtk.webui.channelscan.dvbt.startScan",
						"params":{
							"scanType":4,
							"rf":this.list[this.listIndex].rfIndex,
							"freq":this.list[this.listIndex].rfFrequence
						}
					},(data)=>{
						console.log(data);
					});
					window.gSocket.addEventListener("mtk.webui.channelscan.dvbt.notify", this.notify);
				}
			}
		}
	},
	notify:function(data){
		document.querySelector('.scanProgressItem .channels').innerHTML = data.params.chNum;
		document.querySelector('.scanProgressItem .dtvProgress').innerHTML = (Math.round((data.params.progress /100) * 10000) / 100.00);
		document.querySelector('.scanProgressItem .front').style.width= data.params.progress/ 100 * 30+'rem';
		if(data.params.progress==100){
			window.gSocket.removeEventListener("mtk.webui.channelscan.dvbt.notify",antennaSingleRF.notify);
			antennaSingleRF.scanning='false';
			addClass(document.querySelector('#antennaSingleRF .listItem'),'focus');
			document.querySelector('.scanProgress .scanProgressItem').innerHTML=`
				<div class="lf"></div>
				<div class="mid">Status: Complete</div>
				<div class="rt"></div>
			`;
		}
	},
	setFrequency:function(){
		// console.log(this.list[this.listIndex]);
		window.gSocket.send({
			"method":"mtk.webui.broadcast.changeFrequence",
			"params":{
				"frequence":this.list[this.listIndex].rfFrequence
			}
		}, data=> {
			// console.log(data);
			if(data.error.code==0){
				this.getLevel();
			}
		})
	}
}


//**************Channel List*******************
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
		gMenuPageName = 'AnalogChannelDetail';
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
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
		var html = `
			<div id="channelEditDetail" class="scanList">
				<div class="listItem">
					<div class="lf">Network Name:</div>
					<div class="mid">${curItem.nwName}</div>
					<div class="rt"></div>
				</div>
				<div class="opera listItem majorNum focus">
					<div class="lf">Channel Number:</div>
					<div class="mid">
						<div class="inputNum majorNum_input">${curItem.majorNum}</div>
					</div>
					<div class="rt"></div>
				</div>
				<div class="opera listItem acName">
					<div class="lf">Channel Name:</div>
					<div class="mid">
						<div class="inputNum acName_input">${curItem.acName}</div>
					</div>
					<div class="rt"></div>
				</div>
				<div class="disabled listItem">
					<div class="lf">Frequency</div>
					<div class="mid">
						<div class="inputNum">730</div>
					</div>
					<div class="rt"></div>
				</div>
				<div class="disabled listItem">
					<div class="lf">Color System</div>
					<div class="mid">Auto</div>
					<div class="rt"><span></span></div>
				</div>
				<div class="disabled listItem">
					<div class="lf">Sound System</div>
					<div class="mid">B/G</div>
					<div class="rt"><span></span></div>
				</div>
				<div class="opera listItem delete">
					<div class="lf">Delete</div>
					<div class="mid"></div>
					<div class="rt"><span></span></div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML = html;
		gMenuPageName = 'channelEditDetail';
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
						channelSkip.render('gMenuTvChannelEdit');
					}
				});
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
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
		gMenuPageName = 'channelSkip';
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
				channelEditDetail.render(this.list[this.page][curIndex]);
			}
			if(this.pageName == 'gMenuTvAnalogChannel') { //Analog Channel Fine Tune
				AnalogChannelDetail.render(this.page, curIndex, this.list[this.page][curIndex]);
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			this.page = 0;
			reRenderList(curIndex);
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


