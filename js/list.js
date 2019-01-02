//列表监听事件
function listKeyEvent(e) {
	var curFocus = document.querySelector(".listItem.focus");
	gMenuClassName = curFocus.parentElement.getAttribute('class');
	var curList = curFocus.parentElement.children;
	var curIndex = [].indexOf.call(curList, curFocus);

	//下键
	if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
		if(gMenuClassName == 'firstList') {
			gMenuoIndex = canOperaDown(gMenuParent, curIndex);
			removeClass(curList[curIndex], 'focus');
			addClass(curList[gMenuoIndex], 'focus');
			gMenuChild = gMenuParent.data[gMenuoIndex].value;
			gMenuCurrent=gMenuParent.data[gMenuoIndex].name;
			document.querySelector('#menuNav span').innerHTML='Menu-'+gMenuCurrent;
			gMenuRenderSecond();
		} else {
			gMenuoIndex = canOperaDown(gMenuChild, curIndex);
			removeClass(curList[curIndex], 'focus');
			addClass(curList[gMenuoIndex], 'focus');
			changePage();
		}
	}
	//上键
	if(e.keyCode == KeyEvent.DOM_VK_UP) {
		if(gMenuClassName == 'firstList') {
			gMenuoIndex = canOperaUp(gMenuParent, curIndex);
			removeClass(curList[curIndex], 'focus');
			addClass(curList[gMenuoIndex], 'focus');
			gMenuChild = gMenuParent.data[gMenuoIndex].value;
			gMenuCurrent=gMenuParent.data[gMenuoIndex].name;
			document.querySelector('#menuNav span').innerHTML='Menu-'+gMenuCurrent;
			gMenuRenderSecond();
		} else {
			gMenuoIndex = canOperaUp(gMenuChild, curIndex);
			removeClass(curList[curIndex], 'focus');
			addClass(curList[gMenuoIndex], 'focus');
			changePage();
		}
	}
	//右键 || enter键
	if(e.keyCode == KeyEvent.DOM_VK_RIGHT||e.keyCode == KeyEvent.DOM_VK_ENTER) {
		if(gMenuClassName == 'firstList') {
			var obj = {
				arr: gMenuParent,
				mark: curIndex
			}
			gMenuNavlist.push(obj);
			var nextList = curFocus.parentElement.nextElementSibling;
			gMenuoIndex = canOperaDown(gMenuChild, -1);
			gMenuClassName = 'secondList';
			removeClass(curList[curIndex], 'focus');
			addClass(nextList.children[gMenuoIndex], 'focus');
			changePage();
		} else {
			if(gMenuChild.data[curIndex].value.valType == 'num') {
				gMenuPageName = 'showNum';
				showNum.render();
			} else if(gMenuChild.data[curIndex].value.valType == 'sel') {
				gMenuPageName = 'showSelect';
				showSelect.render();
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
									gMenuoIndex = canOperaDown(gMenuChild, -1);
									gMenuRenderSecond();
									changePage();
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
								gMenuoIndex = canOperaDown(gMenuChild, -1);
								gMenuRenderSecond();
								changePage();
							}
						}
					});	
				}else{					
					gMenuChild = gMenuChild.data[curIndex].value;
					gMenuoIndex = canOperaDown(gMenuChild, -1);
					gMenuRenderSecond();
					changePage();
				}
			}
		}
	}
	//左键
	if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
		if(gMenuClassName == 'secondList') {
			if(gMenuNavlist.length == 1) {
				document.querySelector('.secondList').style.top = '0rem';
				var prevList = curFocus.parentElement.previousElementSibling;
				gMenuoIndex = gMenuNavlist[gMenuNavlist.length - 1].mark;
				removeClass(curList[curIndex], 'focus');
				addClass(prevList.children[gMenuoIndex], 'focus');
			} else {
				gMenuoIndex = gMenuNavlist[gMenuNavlist.length - 1].mark;
				gMenuChild = gMenuNavlist[gMenuNavlist.length - 1].arr;
				gMenuRenderSecond();
				changePage();
			}
			gMenuNavlist.pop();
		}
	}
	e.stopPropagation();
}

//渲染数据--第一列
function gMenuRenderFirst() {
	var html1 = '';
	for(var i = 0; i < gMenuParent.data.length; i++) {
		if(gMenuClassName == 'firstList' && i == gMenuoIndex) {
			html1 += '<div class="listItem focus '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '</div>';
		} else {
			if(gMenuParent.data[i].opera) {
				html1 += '<div class="listItem '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '</div>';
			} else {
				html1 += '<div class="listItem disabled '+gMenuParent.data[i].name+'">' + gMenuParent.data[i].name + '</div>';
			}
		}
	}
	document.querySelector('.firstList').innerHTML = html1;
	document.querySelector('.firstList .listItem').style.height='3rem';
}
//渲染数据--第二列
function gMenuRenderSecond() {
	var arrPromise = [];
	var responses=[];
	for(var c = 0; c < gMenuChild.data.length; c++) {
		if(gMenuChild.data[c].value.valType == 'sel' || gMenuChild.data[c].value.valType == 'num') {
			arrPromise.push(new Promise((resolve, reject) => {
				responses.push(gMenuChild.data[c]);
				window.gSocket.send(gMenuChild.data[c].msg('get',''), function(data) {
					resolve(data);
				})
			}))
		}
	}
	Promise.all(arrPromise).then(res => {
		for(var r = 0; r < responses.length; r++) {
			if(responses[r].value.valType == 'sel' || responses[r].value.valType == 'num') {
				responses[r].getCallback(res[r]);
			}
		}
		renderList();
	}).catch(function(reason) {
		console.log(reason);
	});
}

function renderList() {
	var html2=``;
	for(var i = 0; i < gMenuChild.data.length; i++) {
		if(gMenuChild.data[i].value.valType == 'sel') {
			if(gMenuChild.data[i].opera) {
				if(gMenuClassName == 'secondList' && i == gMenuoIndex) {
					html2 += `
						<div class="listItem focus">
							<div class='left'>
								${gMenuChild.data[i].name}
							</div>
							<div class="right">
								<div class="selName">${gMenuChild.data[i].value.dataList[gMenuChild.data[i].curVal]}</div>
								<span>></span>
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
								<div class="selName">${gMenuChild.data[i].value.dataList[gMenuChild.data[i].curVal]}</div>
								<span>></span>
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
							<div class="selName">${gMenuChild.data[i].value.dataList[gMenuChild.data[i].curVal]}</div>
							<span>></span>
						</div>
					</div>
				`;
			}
		} else if(gMenuChild.data[i].value.valType == 'num') {
			if(gMenuChild.data[i].opera) {
				if(gMenuClassName == 'secondList' && i == gMenuoIndex) {
					html2 += `
						<div class="listItem focus">
							<div class='left' data-max='${gMenuChild.data[i].value.max}' data-min='${gMenuChild.data[i].value.min}'>
								${gMenuChild.data[i].name}
							</div>
							<div class="right">
								<div class="progress">
									<div style="left:${(gMenuChild.data[i].value.data - gMenuChild.data[i].value.min) / (gMenuChild.data[i].value.max - gMenuChild.data[i].value.min) * 20-0.3}rem" class="front"></div>
								</div>
								<span>${gMenuChild.data[i].value.data}</span>
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
								<span>${gMenuChild.data[i].value.data}</span>
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
							<span>${gMenuChild.data[i].value.data}</span>
						</div>
					</div>
				`;
			}
		} else {
			if(gMenuChild.data[i].opera) {
				if(gMenuClassName == 'secondList' && i == gMenuoIndex) {
					html2 += `
						<div class="listItem focus">
							<div class='left'>
								${gMenuChild.data[i].name}
							</div>
							<div class="right">
								<span>></span>
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
								<span>></span>
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
							<span>></span>
						</div>
					</div>
				`;
			}
		}
	}
	document.querySelector('.secondList').innerHTML = html2;
	document.querySelector('.secondList .listItem').style.height='3rem';
}

//列表分页效果
function changePage() {
//	var itemHeight = document.querySelector(".listItem.focus").style.height;
//	itemHeight=itemHeight.substring(0,1);
	var floorIndex = Math.floor(gMenuoIndex / 9);
	document.querySelector('.secondList').style.top = -(floorIndex * 9 * Number(3)) + 'rem';
}


function getCurVal(value, min, max) {
	//	console.log((value - min) / (max - min) * 100);
	return(value - min) / (max - min) * 100;
}

//返回列表中第一个可以操作的下标-----上键
function canOperaUp(data, index) {
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
}

//返回列表中第一个可以操作的下标-----下键
function canOperaDown(data, index) {
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
}