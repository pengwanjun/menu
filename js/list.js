
var menuList={
	render:function(){
		this.gMenuRenderFirst();
		this.gMenuRenderSecond();
	},
	//渲染数据--第一列
	gMenuRenderFirst:function(){
		var html1 = '';
		for(var i = 0; i < gMenuParent.data.length; i++) {
			if(gMenuClassName == 'menuList') {
				if(i == gMenuoIndex){
					html1 += '<div class="listItem focus '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '<span></span></div>';	
				}else{
					if(gMenuParent.data[i].opera){
						html1 += '<div class="listItem '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '<span></span></div>';
					}else{
						html1 += '<div class="listItem disabled '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '</div>';
					}				
				}
			} else {
				if(i==gMenuParent.curVal){
					html1 += '<div class="listItem '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '<span class="itemIcon"></span></div>';
				}else{
					html1 += '<div class="listItem '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '</div>';
				}
			}
		}
		document.querySelector('.menuList').innerHTML = html1;
		document.querySelector('.menuList .listItem').style.height='3rem';
	},
	//渲染数据--第二列
	gMenuRenderSecond:function(){
		var arrPromise = [];
		var responses=[];
		for(var c = 0; c < gMenuChild.data.length; c++) {
			if(gMenuChild.data[c].value.valType == 'sel' || gMenuChild.data[c].value.valType == 'num') {
				if(gMenuChild.data[c].msg){
					arrPromise.push(new Promise((resolve, reject) => {
						responses.push(gMenuChild.data[c]);
						window.gSocket.send(gMenuChild.data[c].msg('get',''), function(data) {
							resolve(data);
						})
					}))
				}
			}
		}
		Promise.all(arrPromise).then(res => {
			for(var r = 0; r < responses.length; r++) {
				if(res[r].error.code==0){
					responses[r].getCallback(res[r]);
				}else{
					console.log(responses[r].name+' : '+JSON.stringify(res[r]));
				}
			}
			this.renderList();
		}).catch(function(reason) {
			console.log(reason);
		});
	},
	renderList:function(){
		//	console.log(gMenuChild);
		var html2=`<div class="showList"><div class="showListContainer">`;
		for(var i = 0; i < gMenuChild.data.length; i++) {
			if(gMenuChild.data[i].value.valType == 'sel') {
				if(gMenuChild.data[i].opera) {
					if(gMenuClassName == 'showList' && i == gMenuoIndex) {
						html2 += `
							<div class="listItem focus">
								<div class='left'>
									${gMenuChild.data[i].name}
								</div>
								<div class="right">
									<div class="selName">${gMenuChild.data[i].value.data[gMenuChild.data[i].curVal]}</div>					
									<span class="itemFocusIcon"></span>
								</div>
							</div>
						`;
					} else {
						html2 += `
							<div class="listItem">
								<div class='left'>
									${gMenuChild.data[i].name}
								</div>
								<div class="right">
									<div class="selName">${gMenuChild.data[i].value.data[gMenuChild.data[i].curVal]}</div>
									<span class="itemFocusIcon"></span>
								</div>
							</div>
						`;
					}
				} else {
					html2 += `
						<div class="listItem disabled">
							<div class='left'>
								${gMenuChild.data[i].name}
							</div>
							<div class="right">
								<div class="selName">${gMenuChild.data[i].value.data[gMenuChild.data[i].curVal]}</div>
								<span class="itemFocusIcon"></span>
							</div>
						</div>
					`;
				}
			} else if(gMenuChild.data[i].value.valType == 'num') {
				if(gMenuChild.data[i].opera) {
					if(gMenuClassName == 'showList' && i == gMenuoIndex) {
						html2 += `
							<div class="listItem focus">
								<div class='left' data-max='${gMenuChild.data[i].value.max}' data-min='${gMenuChild.data[i].value.min}'>
									${gMenuChild.data[i].name}
								</div>
								<div class="right">
									<div class="progress">
										<div style="left:${(gMenuChild.data[i].value.data - gMenuChild.data[i].value.min) / (gMenuChild.data[i].value.max - gMenuChild.data[i].value.min) * 20-0.3}rem" class="front"></div>
									</div>
									<span class="itemNumShow">${gMenuChild.data[i].value.data}</span>
								</div>
							</div>
						`;
					} else {
						html2 += `
							<div class="listItem">
								<div class='left' data-max='${gMenuChild.data[i].value.max}' data-min='${gMenuChild.data[i].value.min}'>
									${gMenuChild.data[i].name}
								</div>
								<div class="right">
									<div class="progress">
										<div style="left:${((gMenuChild.data[i].value.data - gMenuChild.data[i].value.min) / (gMenuChild.data[i].value.max - gMenuChild.data[i].value.min) * 20)-0.3}rem" class="front"></div>
									</div>
									<span class="itemNumShow">${gMenuChild.data[i].value.data}</span>
								</div>
							</div>
						`;
					}
				} else {
					html2 += `
						<div class="listItem">
							<div class='left' data-max='${gMenuChild.data[i].value.max}' data-min='${gMenuChild.data[i].value.min}'>
								${gMenuChild.data[i].name}
							</div>
							<div class="right">
								<span class="itemNumShow">${gMenuChild.data[i].value.data}</span>
							</div>
						</div>
					`;
				}
			}else {
				if(gMenuChild.data[i].opera) {
					if(gMenuClassName == 'showList' && i == gMenuoIndex) {
						html2 += `
							<div class="listItem focus">
								<div class='left'>
									${gMenuChild.data[i].name}
								</div>
								<div class="right">
									<span class="itemFocusIcon"></span>
								</div>
							</div>
						`;
					} else {
						html2 += `
							<div class="listItem">
								<div class='left'>
									${gMenuChild.data[i].name}
								</div>
								<div class="right">
									<span class="itemFocusIcon"></span>
								</div>
							</div>
						`;
					}
				} else {
					html2 += `
						<div class="listItem disabled">
							<div class='left'>
								${gMenuChild.data[i].name}
							</div>
							<div class="right">
								<span class="itemFocusIcon"></span>
							</div>
						</div>
					`;
				}
			}
		}
		document.querySelector('#showList').innerHTML = html2+`</div></div>`;
		document.querySelector('.showListContainer .listItem').style.height='3rem';
		this.changePage();
	},
	//列表分页效果
	changePage:function(){
		//	var itemHeight = document.querySelector(".listItem.focus").style.height;
	//	itemHeight=itemHeight.substring(0,1);
		var floorIndex = Math.floor(gMenuoIndex / 9);
		document.querySelector('.showListContainer').style.top = -(floorIndex * 9 * Number(3)) + 'rem';
	},
	getCurVal:function(value, min, max){
		//	console.log((value - min) / (max - min) * 100);
		return(value - min) / (max - min) * 100;
	},
	//返回列表中第一个可以操作的下标-----上键
	canOperaUp:function(data, index){
		var prevIndex;
		if(index == 0) {
			for(var i = data.data.length - 1; i >= 0; i--) {
				if(data.data[i].opera) {
					prevIndex = i;
					break;
				}
			}
		} else {
			for(var j = index - 1; j >= 0; j--) {
				if(data.data[j].opera) {
					prevIndex = j;
					break;
				}
			}
			if(typeof(prevIndex) == 'undefined') {
				for(var k = data.data.length - 1; k >= index; k--) {
					if(data.data[k].opera) {
						prevIndex = k;
						break;
					}
				}
			}
		}
		return prevIndex;
	},
	//返回列表中第一个可以操作的下标-----下键
	canOperaDown:function(data, index){
		var nextIndex;
		if(index == data.data.length - 1) {
			for(var i = 0; i < data.data.length; i++) {
				if(data.data[i].opera) {
					nextIndex = i;
					break;
				}
			}
		} else {
			for(var j = index + 1; j < data.data.length; j++) {
				if(data.data[j].opera) {
					nextIndex = j;
					break;
				}
			}
			if(typeof(nextIndex) == 'undefined') {
				for(var k = 0; k <= index; k++) {
					if(data.data[k].opera) {
						nextIndex = k;
						break;
					}
				}
			}
		}
		return nextIndex;
	},
	keyEvent:function(e){
		//上下左右移动
		var curFocus = document.querySelector(".listItem.focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//数字键--判断是否进入factoryMenu
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(gMenuParent.data[curIndex].name=='Video'&&gMenuClassName=='menuList'){
				gMenuEnterFactoryMenu+=e.key;
				// console.log(gMenuEnterFactoryMenu);
				if((/([0])\1{3}/).test(gMenuEnterFactoryMenu)){
					gMenuEnterFactoryMenu=''; //将进入factoryMenu的密码置为空
					gMenuParent.curVal=curIndex;
					removeClass(curFocus, 'focus');
					gMenuClassName='showList';
					this.gMenuRenderFirst();
					gMenuFctoryMenu.render();
				}
			}
		}else{
			gMenuEnterFactoryMenu=''; //将进入factoryMenu的密码置为空
			//下键
			if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
				if(gMenuClassName == 'menuList') {
					gMenuoIndex = this.canOperaDown(gMenuParent, curIndex);
					gMenuChild = gMenuParent.data[gMenuoIndex].value;
					gMenuCurrent=gMenuParent.data[gMenuoIndex].name;
					document.querySelector('#menuNav span').innerHTML='Menu-'+gMenuCurrent;
					this.gMenuRenderFirst();
					if(gMenuChild.valType=='scan'){
						eval(gMenuChild.renderFuc).render();
					}else{
						this.gMenuRenderSecond();
					}
					
				} else {
					gMenuoIndex = this.canOperaDown(gMenuChild, curIndex);
					removeClass(curList[curIndex], 'focus');
					addClass(curList[gMenuoIndex], 'focus');
					this.changePage();
				}
			}
			//上键
			if(e.keyCode == KeyEvent.DOM_VK_UP) {
				if(gMenuClassName == 'menuList') {
					gMenuoIndex = this.canOperaUp(gMenuParent, curIndex);
					gMenuChild = gMenuParent.data[gMenuoIndex].value;
					gMenuCurrent=gMenuParent.data[gMenuoIndex].name;
					document.querySelector('#menuNav span').innerHTML='Menu-'+gMenuCurrent;
					this.gMenuRenderFirst();
					if(gMenuChild.valType=='scan'){
						eval(gMenuChild.renderFuc).render();
					}else{
						this.gMenuRenderSecond();
					}
				} else {
					gMenuoIndex = this.canOperaUp(gMenuChild, curIndex);
					removeClass(curList[curIndex], 'focus');
					addClass(curList[gMenuoIndex], 'focus');
					this.changePage();
				}
			}
			//右键 || enter键
			if(e.keyCode == KeyEvent.DOM_VK_RIGHT||e.keyCode == KeyEvent.DOM_VK_ENTER) {
				if(gMenuClassName == 'menuList') {
					if(gMenuChild.valType=='scan'){
						gMenuPageName='password';
						gMenuClassName = 'showList';
						gMenuParent.curVal=curIndex;
						this.gMenuRenderFirst();
						addClass(document.querySelector('#password .listItem'),'focus');
						removeClass(curList[curIndex], 'focus');
					}else{
						gMenuParent.curVal=curIndex;
						var nextList = document.querySelector('.showListContainer').children;
						gMenuoIndex = this.canOperaDown(gMenuChild, -1);
						gMenuClassName = 'showList';
						removeClass(curList[curIndex], 'focus');
						addClass(nextList[gMenuoIndex], 'focus');
						this.gMenuRenderFirst();
						this.changePage();
					}
				} else {
					if(gMenuChild.data[curIndex].value.valType == 'num') {
						showNum.render();
					} else if(gMenuChild.data[curIndex].value.valType == 'sel') {
						showSelect.render(gMenuChild.data[gMenuoIndex]);
					} else if(gMenuChild.data[curIndex].value.valType == 'scan') {
						gMenuPageName=gMenuChild.data[curIndex].value.renderFuc;
						if(gMenuPageName=='channelSkip'){
							channelSkip.page=0;
							channelSkip.focusIndex=0;
							channelSkip.render(gMenuChild.data[curIndex].value.data.name);
						}else if(gMenuPageName=='popBoxShow'){
							popBoxShow.render(gMenuChild.data[curIndex].value.data.name);
						}else{
							eval(gMenuChild.data[curIndex].value.renderFuc).render();
						}
					} else {
						var obj = {
							arr: gMenuChild,
							mark: curIndex
						}
						gMenuNavlist.push(obj);
						if(gMenuChild.data[curIndex].name=='Configuration'){
							window.gSocket.send(gMenuSetupNetworkConf[0].msg('get',''),function(data1){
								if(data1.error.code == 0) {
									if(data1.result.enable) {
										window.gSocket.send(gMenuSetupNetworkConf[1].msg('get',''),function(data2){
											if(data2.error.code == 0){
												if(data2.result.type == 'etherent'){
													for(var i = 0; i < gMenuSetupNetworkConf.length; i++) {
														if(gMenuSetupNetworkConf[i].name == 'Wake On Wlan' ||
															gMenuSetupNetworkConf[i].name == 'Wireless Setting') {
															gMenuSetupNetworkConf[i].opera = false;
														}else{
															gMenuSetupNetworkConf[i].opera = true;
														}
													}
													gMenuSetupNetworkConf[0].value.dataList = ['Off','On'];
												}else{
													for(var i = 0; i < gMenuSetupNetworkConf.length; i++) {
														if(gMenuSetupNetworkConf[i].name == 'Wake On Lan') {
															gMenuSetupNetworkConf[i].opera = false;
														}else{
															gMenuSetupNetworkConf[i].opera = true;
														}
													}
													gMenuSetupNetworkConf[0].value.dataList = ['On'];
												}
											}
											gMenuChild = gMenuChild.data[curIndex].value;
											gMenuoIndex = this.canOperaDown(gMenuChild, -1);
											this.gMenuRenderSecond();
										})
									}else{
										for(var i = 0; i < gMenuSetupNetworkConf.length; i++) {
											if(gMenuSetupNetworkConf[i].name == 'Internet Connection') {
												gMenuSetupNetworkConf[i].opera = true;
											}else{
												gMenuSetupNetworkConf[i].opera = false;
											}
										}
										gMenuChild = gMenuChild.data[curIndex].value;
										gMenuoIndex = this.canOperaDown(gMenuChild, -1);
										this.gMenuRenderSecond();
									}
								}
							});	
						}else{					
							gMenuChild = gMenuChild.data[curIndex].value;
							gMenuoIndex = this.canOperaDown(gMenuChild, -1);
							this.gMenuRenderSecond();
						}
					}
				}
			}
			//左键
			if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
				if(gMenuClassName == 'showList') {
					if(gMenuNavlist.length == 0) {
						gMenuClassName='menuList';
						gMenuoIndex=gMenuParent.curVal;
						document.querySelector('.showListContainer').style.top = '0rem';
						removeClass(curList[curIndex], 'focus');
						this.gMenuRenderFirst();
					} else {
						gMenuoIndex = gMenuNavlist[gMenuNavlist.length - 1].mark;
						gMenuChild = gMenuNavlist[gMenuNavlist.length - 1].arr;
						this.gMenuRenderSecond();
					}
					gMenuNavlist.pop();
				}
			}
		}
	}
}

// //列表监听事件
// function listKeyEvent(e) {
// 	if(e.keyCode == KeyEvent.DOM_VK_DOWN || e.keyCode == KeyEvent.DOM_VK_LEFT
// 	||e.keyCode == KeyEvent.DOM_VK_UP || e.keyCode == KeyEvent.DOM_VK_RIGHT 
// 	||e.keyCode == KeyEvent.DOM_VK_ENTER){
// 		var curFocus = document.querySelector(".listItem.focus");
// 		var curList = curFocus.parentElement.children;
// 		var curIndex = [].indexOf.call(curList, curFocus);
// 		//下键
// 		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
// 			if(gMenuClassName == 'menuList') {
// 				gMenuoIndex = canOperaDown(gMenuParent, curIndex);
// 				gMenuChild = gMenuParent.data[gMenuoIndex].value;
// 				gMenuCurrent=gMenuParent.data[gMenuoIndex].name;
// 				document.querySelector('#menuNav span').innerHTML='Menu-'+gMenuCurrent;
// 				gMenuRenderFirst();
// 				if(gMenuChild.valType=='scan'){
// 					eval(gMenuChild.renderFuc).render();
// 				}else{
// 					gMenuRenderSecond();
// 				}
				
// 			} else {
// 				gMenuoIndex = canOperaDown(gMenuChild, curIndex);
// 				removeClass(curList[curIndex], 'focus');
// 				addClass(curList[gMenuoIndex], 'focus');
// 				changePage();
// 			}
// 		}
// 		//上键
// 		if(e.keyCode == KeyEvent.DOM_VK_UP) {
// 			if(gMenuClassName == 'menuList') {
// 				gMenuoIndex = canOperaUp(gMenuParent, curIndex);
// 				gMenuChild = gMenuParent.data[gMenuoIndex].value;
// 				gMenuCurrent=gMenuParent.data[gMenuoIndex].name;
// 				document.querySelector('#menuNav span').innerHTML='Menu-'+gMenuCurrent;
// 				gMenuRenderFirst();
// 				if(gMenuChild.valType=='scan'){
// 					eval(gMenuChild.renderFuc).render();
// 				}else{
// 					gMenuRenderSecond();
// 				}
// 			} else {
// 				gMenuoIndex = canOperaUp(gMenuChild, curIndex);
// 				removeClass(curList[curIndex], 'focus');
// 				addClass(curList[gMenuoIndex], 'focus');
// 				changePage();
// 			}
// 		}
// 		//右键 || enter键
// 		if(e.keyCode == KeyEvent.DOM_VK_RIGHT||e.keyCode == KeyEvent.DOM_VK_ENTER) {
// 			if(gMenuClassName == 'menuList') {
// 				if(gMenuChild.valType=='scan'){
// 					gMenuPageName='password';
// 					gMenuClassName = 'showList';
// 					gMenuParent.curVal=curIndex;
// 					gMenuRenderFirst();
// 					addClass(document.querySelector('#password .listItem'),'focus');
// 					removeClass(curList[curIndex], 'focus');
// 				}else{
// 					gMenuParent.curVal=curIndex;
// 					var nextList = document.querySelector('.showListContainer').children;
// 					gMenuoIndex = canOperaDown(gMenuChild, -1);
// 					gMenuClassName = 'showList';
// 					removeClass(curList[curIndex], 'focus');
// 					addClass(nextList[gMenuoIndex], 'focus');
// 					gMenuRenderFirst();
// 					changePage();
// 				}
// 			} else {
// 				if(gMenuChild.data[curIndex].value.valType == 'num') {
// 					showNum.render();
// 				} else if(gMenuChild.data[curIndex].value.valType == 'sel') {
// 					showSelect.render(gMenuChild.data[gMenuoIndex]);
// 				} else if(gMenuChild.data[curIndex].value.valType == 'scan') {
// 					gMenuPageName=gMenuChild.data[curIndex].value.renderFuc;
// 					if(gMenuPageName=='channelSkip'){
// 						channelSkip.page=0;
// 						channelSkip.focusIndex=0;
// 						channelSkip.render(gMenuChild.data[curIndex].value.data.name);
// 					}else if(gMenuPageName=='popBoxShow'){
// 						popBoxShow.render(gMenuChild.data[curIndex].value.data.name);
// 					}else{
// 						eval(gMenuChild.data[curIndex].value.renderFuc).render();
// 					}
// 				} else {
// 					var obj = {
// 						arr: gMenuChild,
// 						mark: curIndex
// 					}
// 					gMenuNavlist.push(obj);
// 					if(gMenuChild.data[curIndex].name=='Configuration'){
// 						window.gSocket.send(gMenuSetupNetworkConf[0].msg('get',''),function(data1){
// 							if(data1.error.code == 0) {
// 								if(data1.result.enable) {
// 									window.gSocket.send(gMenuSetupNetworkConf[1].msg('get',''),function(data2){
// 										if(data2.error.code == 0){
// 											if(data2.result.type == 'etherent'){
// 												for(var i = 0; i < gMenuSetupNetworkConf.length; i++) {
// 													if(gMenuSetupNetworkConf[i].name == 'Wake On Wlan' ||
// 														gMenuSetupNetworkConf[i].name == 'Wireless Setting') {
// 														gMenuSetupNetworkConf[i].opera = false;
// 													}else{
// 														gMenuSetupNetworkConf[i].opera = true;
// 													}
// 												}
// 												gMenuSetupNetworkConf[0].value.dataList = ['Off','On'];
// 											}else{
// 												for(var i = 0; i < gMenuSetupNetworkConf.length; i++) {
// 													if(gMenuSetupNetworkConf[i].name == 'Wake On Lan') {
// 														gMenuSetupNetworkConf[i].opera = false;
// 													}else{
// 														gMenuSetupNetworkConf[i].opera = true;
// 													}
// 												}
// 												gMenuSetupNetworkConf[0].value.dataList = ['On'];
// 											}
// 										}
// 										gMenuChild = gMenuChild.data[curIndex].value;
// 										gMenuoIndex = canOperaDown(gMenuChild, -1);
// 										gMenuRenderSecond();
// 									})
// 								}else{
// 									for(var i = 0; i < gMenuSetupNetworkConf.length; i++) {
// 										if(gMenuSetupNetworkConf[i].name == 'Internet Connection') {
// 											gMenuSetupNetworkConf[i].opera = true;
// 										}else{
// 											gMenuSetupNetworkConf[i].opera = false;
// 										}
// 									}
// 									gMenuChild = gMenuChild.data[curIndex].value;
// 									gMenuoIndex = canOperaDown(gMenuChild, -1);
// 									gMenuRenderSecond();
// 								}
// 							}
// 						});	
// 					}else{					
// 						gMenuChild = gMenuChild.data[curIndex].value;
// 						gMenuoIndex = canOperaDown(gMenuChild, -1);
// 						gMenuRenderSecond();
// 					}
// 				}
// 			}
// 		}
// 		//左键
// 		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
// 			if(gMenuClassName == 'showList') {
// 				if(gMenuNavlist.length == 0) {
// 					gMenuClassName='menuList';
// 					gMenuoIndex=gMenuParent.curVal;
// 					document.querySelector('.showListContainer').style.top = '0rem';
// 					removeClass(curList[curIndex], 'focus');
// 					gMenuRenderFirst();
// 				} else {
// 					gMenuoIndex = gMenuNavlist[gMenuNavlist.length - 1].mark;
// 					gMenuChild = gMenuNavlist[gMenuNavlist.length - 1].arr;
// 					gMenuRenderSecond();
// 				}
// 				gMenuNavlist.pop();
// 			}
// 		}
// 		//数字键
// 		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
// 			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
// 			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
// 			e.keyCode == KeyEvent.DOM_VK_9) {
// 				console.log(gMenuParent);
// 			}
// 	}
// 	e.stopPropagation();
// }

// //渲染数据--第一列
// function gMenuRenderFirst() {
// 	var html1 = '';
// 	for(var i = 0; i < gMenuParent.data.length; i++) {
// 		if(gMenuClassName == 'menuList') {
// 			if(i == gMenuoIndex){
// 				html1 += '<div class="listItem focus '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '<span></span></div>';	
// 			}else{
// 				if(gMenuParent.data[i].opera){
// 					html1 += '<div class="listItem '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '<span></span></div>';
// 				}else{
// 					html1 += '<div class="listItem disabled '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '</div>';
// 				}				
// 			}
// 		} else {
// 			if(i==gMenuParent.curVal){
// 				html1 += '<div class="listItem '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '<span class="itemIcon"></span></div>';
// 			}else{
// 				html1 += '<div class="listItem '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '</div>';
// 			}
// 		}
// 	}
// 	document.querySelector('.menuList').innerHTML = html1;
// 	document.querySelector('.menuList .listItem').style.height='3rem';
// }
// //渲染数据--第二列
// function gMenuRenderSecond() {
// 	var arrPromise = [];
// 	var responses=[];
// 	for(var c = 0; c < gMenuChild.data.length; c++) {
// 		if(gMenuChild.data[c].value.valType == 'sel' || gMenuChild.data[c].value.valType == 'num') {
// 			if(gMenuChild.data[c].msg){
// 				arrPromise.push(new Promise((resolve, reject) => {
// 					responses.push(gMenuChild.data[c]);
// 					window.gSocket.send(gMenuChild.data[c].msg('get',''), function(data) {
// 						resolve(data);
// 					})
// 				}))
// 			}
// 		}
// 	}
// 	Promise.all(arrPromise).then(res => {
// 		for(var r = 0; r < responses.length; r++) {
// 			if(res[r].error.code==0){
// 				responses[r].getCallback(res[r]);
// 			}else{
// 				console.log(responses[r].name+' : '+JSON.stringify(res[r]));
// 			}
// 		}
// 		renderList();
// 	}).catch(function(reason) {
// 		console.log(reason);
// 	});
// }

// function renderList() {
// //	console.log(gMenuChild);
// 	var html2=`<div class="showList"><div class="showListContainer">`;
// 	for(var i = 0; i < gMenuChild.data.length; i++) {
// 		if(gMenuChild.data[i].value.valType == 'sel') {
// 			if(gMenuChild.data[i].opera) {
// 				if(gMenuClassName == 'showList' && i == gMenuoIndex) {
// 					html2 += `
// 						<div class="listItem focus">
// 							<div class='left'>
// 								${gMenuChild.data[i].name}
// 							</div>
// 							<div class="right">
// 								<div class="selName">${gMenuChild.data[i].value.data[gMenuChild.data[i].curVal]}</div>					
// 								<span class="itemFocusIcon"></span>
// 							</div>
// 						</div>
// 					`;
// 				} else {
// 					html2 += `
// 						<div class="listItem">
// 							<div class='left'>
// 								${gMenuChild.data[i].name}
// 							</div>
// 							<div class="right">
// 								<div class="selName">${gMenuChild.data[i].value.data[gMenuChild.data[i].curVal]}</div>
// 								<span class="itemFocusIcon"></span>
// 							</div>
// 						</div>
// 					`;
// 				}
// 			} else {
// 				html2 += `
// 					<div class="listItem disabled">
// 						<div class='left'>
// 							${gMenuChild.data[i].name}
// 						</div>
// 						<div class="right">
// 							<div class="selName">${gMenuChild.data[i].value.data[gMenuChild.data[i].curVal]}</div>
// 							<span class="itemFocusIcon"></span>
// 						</div>
// 					</div>
// 				`;
// 			}
// 		} else if(gMenuChild.data[i].value.valType == 'num') {
// 			if(gMenuChild.data[i].opera) {
// 				if(gMenuClassName == 'showList' && i == gMenuoIndex) {
// 					html2 += `
// 						<div class="listItem focus">
// 							<div class='left' data-max='${gMenuChild.data[i].value.max}' data-min='${gMenuChild.data[i].value.min}'>
// 								${gMenuChild.data[i].name}
// 							</div>
// 							<div class="right">
// 								<div class="progress">
// 									<div style="left:${(gMenuChild.data[i].value.data - gMenuChild.data[i].value.min) / (gMenuChild.data[i].value.max - gMenuChild.data[i].value.min) * 20-0.3}rem" class="front"></div>
// 								</div>
// 								<span class="itemNumShow">${gMenuChild.data[i].value.data}</span>
// 							</div>
// 						</div>
// 					`;
// 				} else {
// 					html2 += `
// 						<div class="listItem">
// 							<div class='left' data-max='${gMenuChild.data[i].value.max}' data-min='${gMenuChild.data[i].value.min}'>
// 								${gMenuChild.data[i].name}
// 							</div>
// 							<div class="right">
// 								<div class="progress">
// 									<div style="left:${((gMenuChild.data[i].value.data - gMenuChild.data[i].value.min) / (gMenuChild.data[i].value.max - gMenuChild.data[i].value.min) * 20)-0.3}rem" class="front"></div>
// 								</div>
// 								<span class="itemNumShow">${gMenuChild.data[i].value.data}</span>
// 							</div>
// 						</div>
// 					`;
// 				}
// 			} else {
// 				html2 += `
// 					<div class="listItem">
// 						<div class='left' data-max='${gMenuChild.data[i].value.max}' data-min='${gMenuChild.data[i].value.min}'>
// 							${gMenuChild.data[i].name}
// 						</div>
// 						<div class="right">
// 							<span class="itemNumShow">${gMenuChild.data[i].value.data}</span>
// 						</div>
// 					</div>
// 				`;
// 			}
// 		}else {
// 			if(gMenuChild.data[i].opera) {
// 				if(gMenuClassName == 'showList' && i == gMenuoIndex) {
// 					html2 += `
// 						<div class="listItem focus">
// 							<div class='left'>
// 								${gMenuChild.data[i].name}
// 							</div>
// 							<div class="right">
// 								<span class="itemFocusIcon"></span>
// 							</div>
// 						</div>
// 					`;
// 				} else {
// 					html2 += `
// 						<div class="listItem">
// 							<div class='left'>
// 								${gMenuChild.data[i].name}
// 							</div>
// 							<div class="right">
// 								<span class="itemFocusIcon"></span>
// 							</div>
// 						</div>
// 					`;
// 				}
// 			} else {
// 				html2 += `
// 					<div class="listItem disabled">
// 						<div class='left'>
// 							${gMenuChild.data[i].name}
// 						</div>
// 						<div class="right">
// 							<span class="itemFocusIcon"></span>
// 						</div>
// 					</div>
// 				`;
// 			}
// 		}
// 	}
// 	document.querySelector('#showList').innerHTML = html2+`</div></div>`;
// 	document.querySelector('.showListContainer .listItem').style.height='3rem';
// 	changePage();
// }

// //列表分页效果
// function changePage() {
// //	var itemHeight = document.querySelector(".listItem.focus").style.height;
// //	itemHeight=itemHeight.substring(0,1);
// 	var floorIndex = Math.floor(gMenuoIndex / 9);
// 	document.querySelector('.showListContainer').style.top = -(floorIndex * 9 * Number(3)) + 'rem';
// }


// function getCurVal(value, min, max) {
// 	//	console.log((value - min) / (max - min) * 100);
// 	return(value - min) / (max - min) * 100;
// }

// //返回列表中第一个可以操作的下标-----上键
// function canOperaUp(data, index) {
// 	var prevIndex;
// 	if(index == 0) {
// 		for(var i = data.data.length - 1; i >= 0; i--) {
// 			if(data.data[i].opera) {
// 				prevIndex = i;
// 				break;
// 			}
// 		}
// 	} else {
// 		for(var j = index - 1; j >= 0; j--) {
// 			if(data.data[j].opera) {
// 				prevIndex = j;
// 				break;
// 			}
// 		}
// 		if(typeof(prevIndex) == 'undefined') {
// 			for(var k = data.data.length - 1; k >= index; k--) {
// 				if(data.data[k].opera) {
// 					prevIndex = k;
// 					break;
// 				}
// 			}
// 		}
// 	}
// 	return prevIndex;
// }

// //返回列表中第一个可以操作的下标-----下键
// function canOperaDown(data, index) {
// 	var nextIndex;
// 	if(index == data.data.length - 1) {
// 		for(var i = 0; i < data.data.length; i++) {
// 			if(data.data[i].opera) {
// 				nextIndex = i;
// 				break;
// 			}
// 		}
// 	} else {
// 		for(var j = index + 1; j < data.data.length; j++) {
// 			if(data.data[j].opera) {
// 				nextIndex = j;
// 				break;
// 			}
// 		}
// 		if(typeof(nextIndex) == 'undefined') {
// 			for(var k = 0; k <= index; k++) {
// 				if(data.data[k].opera) {
// 					nextIndex = k;
// 					break;
// 				}
// 			}
// 		}
// 	}
// 	return nextIndex;
// }