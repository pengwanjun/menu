window.onload = function() {

	//	var child=gMenuTvChannelSkip;
	//	channelSkip(child);
	//	gMenuPageName='channelSkip';

	//页面加载渲染数据
	var parent = Menu;
	var child = Menu[0].value;
	var className = 'firstList';
	var oIndex = 0;
	renderFirst();
	renderSecond();

	var stage = 7;
	var itemHeight = document.querySelector(".listItem.focus").offsetHeight;
	document.querySelector('#list').style.height = Number(itemHeight) * stage + 'px';

	var navList = [];

	document.onkeyup = function(e) {
		if(gMenuPageName == 'list') {
			var curFocus = document.querySelector(".listItem.focus");
			className = curFocus.parentElement.getAttribute('class');
			var curList = curFocus.parentElement.children;
			var curIndex = [].indexOf.call(curList, curFocus);

			//下键
			if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
				if(className == 'firstList') {
					oIndex = canOperaDown(parent, curIndex);
					removeClass(curList[curIndex], 'focus');
					addClass(curList[oIndex], 'focus');
					child = parent[oIndex].value;
					//获取数据
					//				window.gSocket.send(parent[oIndex].msg('get'), function(data) {
					//					parent[oIndex].getCallback(data);
					//					renderSecond();
					//				});
					renderSecond();
					changePage(oIndex, className);
				} else {
					var pListType = navList[navList.length - 1].arr[navList[navList.length - 1].mark];
					if(pListType.valType == 'scan') {
						var scanList = pListType.value;
						oIndex = canOperaDown(scanList, curIndex);
						removeClass(curList[curIndex], 'focus');
						addClass(curList[oIndex], 'focus');
						changePage(oIndex, className);
					} else {
						if(curIndex == curList.length - 1) {
							oIndex = 0;
							removeClass(curList[curIndex], 'focus');
							addClass(curList[oIndex], 'focus');
							changePage(oIndex, className);
						} else {
							oIndex = curIndex + 1;
							removeClass(curList[curIndex], 'focus');
							addClass(curList[oIndex], 'focus');
							changePage(oIndex, className);
						}
					}
				}
			}
			//上键
			if(e.keyCode == KeyEvent.DOM_VK_UP) {
				if(className == 'firstList') {
					oIndex = canOperaUp(parent, curIndex);
					removeClass(curList[curIndex], 'focus');
					addClass(curList[oIndex], 'focus');
					child = parent[oIndex].value;
					//获取数据
					//				window.gSocket.send(parent[oIndex].msg('get'), function(data) {
					//					parent[oIndex].getCallback(data);
					//					renderSecond();
					//				});
					renderSecond();
					changePage(oIndex, className);
				} else {
					var pListType = navList[navList.length - 1].arr[navList[navList.length - 1].mark];
					if(pListType.valType == 'scan') {
						var scanList = pListType.value;
						oIndex = canOperaUp(scanList, curIndex);
						removeClass(curList[curIndex], 'focus');
						addClass(curList[oIndex], 'focus');
						changePage(oIndex, className);
					} else {
						if(curIndex == 0) {
							oIndex = curList.length - 1;
							removeClass(curList[curIndex], 'focus');
							addClass(curList[oIndex], 'focus');
							changePage(oIndex, className);
						} else {
							oIndex = curIndex - 1;
							removeClass(curList[curIndex], 'focus');
							addClass(curList[oIndex], 'focus');
							changePage(oIndex, className);
						}
					}
				}
			}
			//右键
			if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
				if(className == 'firstList') {
					var obj = {
						arr: parent,
						mark: curIndex
					}
					navList.push(obj);
					if(parent[curIndex].valType == 'list') {
						parent = child;
						oIndex = canOperaDown(parent, -1);
						changePage(oIndex, className);
						child = parent[oIndex].value;
						//					window.gSocket.send(parent[oIndex].msg('get'), function(data) {
						//						parent[oIndex].getCallback(data);
						//						renderFirst();
						//						renderSecond();
						//					});
						renderFirst();
						renderSecond();
					} else if(parent[curIndex].valType == 'sel') {
						for(var i = 0; i < child.length; i++) {
							if(parent[curIndex].curVal == child[i]) {
								oIndex = i;
								break;
							}
						}
						var nextList = curFocus.parentElement.nextElementSibling.children;
						removeClass(curList[curIndex], 'focus');
						addClass(nextList[oIndex], 'focus');
					} else {
						var nextList = curFocus.parentElement.nextElementSibling.children;
						removeClass(curList[curIndex], 'focus');
						addClass(nextList[0], 'focus');
					}
				} else if(typeof child == 'number') {
					//第二列---右键---数值增大
					console.log(parent[curIndex]);
					//				window.gSocket.send(parent[curIndex].msg('set'), function(data) {
					//					parent[oIndex].getCallback(data);
					//				});
				}
			}
			//左键
			if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
				if(className == 'firstList') {
					if(navList.length != 0) {
						oIndex = navList[navList.length - 1].mark;
						parent = navList[navList.length - 1].arr;
						child = parent[oIndex].value;
						changePage(oIndex, className);
						renderFirst();
						renderSecond();
						navList.pop();
					}
				} else {
					if(typeof child == 'number') {
						//第二列---左键---数值减小
						console.log('减小');
						//					window.gSocket.send(parent[curIndex].msg('set'), function(data) {
						//						parent[oIndex].getCallback(data);
						//					});
					} else {
						oIndex = navList[navList.length - 1].mark;
						className = 'firstList';
						parent = navList[navList.length - 1].arr;
						renderFirst();
						renderSecond();
						navList.pop();
					}
				}
			}
			//enter键
			if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
				//第二列
				if(className == 'secondList' && Array.isArray(child)) {
					//valType===sel
					if(typeof child[0] == 'string') {
						oIndex = navList[navList.length - 1].mark;
						window.gSocket.send(parent[oIndex].msg('set'), function(data) {
							parent[oIndex].setCallback(data);
						});
					}
					//valType===scan
					if(typeof child[0] == 'object') {
						gMenuPageName = child[curIndex].renderFuc;
						eval(child[curIndex].renderFuc)(child[curIndex].value);
					}
				}
			}
			e.stopPropagation();
		} else if(gMenuPageName == 'channelScan') {
			channelScanKeyEvent(e);
		} else if(gMenuPageName == 'updateScan') {
			updateScanKeyEvent(e);
		} else if(gMenuPageName == 'analogManualScan') {
			analogManualScanKeyEvent(e);
		} else if(gMenuPageName == 'singleRFScan') {
			singleRFScanKeyEvent(e);
		} else if(gMenuPageName == 'channelSkip') {
			channelSkipKeyEvent(e);
		} else if(gMenuPageName == 'channelEditDetail') {
			channelEditDetailKeyEvent(e);
		} else if(gMenuPageName == 'cleanChannelList') {
			cleanChannelListKeyEvent(e);
		}
	}

	//列表分页效果
	function changePage(index, classname) {
		var floorIndex = Math.floor(index / stage);
		document.querySelector('.' + classname + '').style.top = -(floorIndex * stage * Number(itemHeight)) + 'px';
	}

	//渲染数据--第一列
	function renderFirst() {
		var firstList = document.querySelector('.firstList');
		var html1 = '';
		for(var i = 0; i < parent.length; i++) {
			if(className == 'firstList' && i == oIndex) {
				html1 += '<div class="listItem focus">' + parent[i].name + '<span>>></span></div>';
			} else {
				if(parent[i].opera) {
					html1 += '<div class="listItem">' + parent[i].name + '<span>>></span></div>';
				} else {
					html1 += '<div class="listItem disabled">' + parent[i].name + '<span>>></span></div>';
				}
			}
		}
		firstList.innerHTML = html1;
	}
	//渲染数据--第二列
	function renderSecond() {
		var secondList = document.querySelector('.secondList');
		var html2 = '';
		var type = parent[oIndex].valType;
		if(type == 'list' || type == 'scan') {
			for(var j = 0; j < child.length; j++) {
				if(child[j].opera) {
					html2 += '<div class="listItem">' + child[j].name + '<span>>></span></div>';
				} else {
					html2 += '<div class="listItem disabled">' + child[j].name + '<span>>></span></div>';
				}
			}
		} else if(type == 'sel') {
			for(var j = 0; j < child.length; j++) {
				html2 += '<div class="listItem"><span>请选择：</span>' + child[j] + '</div>';
			}
		} else { //type == 'str' || type == 'num'
			html2 += '<div class="listItem"><span>' + type + '值为：</span>' + child + '</div>';
		}
		secondList.innerHTML = html2;
	}

	//返回列表中第一个可以操作的下标-----上键
	function canOperaUp(data, index) {
		var prevIndex;
		if(index == 0) {
			for(var i = data.length - 1; i >= 0; i--) {
				if(data[i].opera) {
					prevIndex = i;
					break;
				}
			}
		} else {
			for(var j = index - 1; j >= 0; j--) {
				if(data[j].opera) {
					prevIndex = j;
					break;
				}
			}
			if(typeof(prevIndex) == 'undefined') {
				for(var k = data.length - 1; k >= index; k--) {
					if(data[k].opera) {
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
		if(index == data.length - 1) {
			for(var i = 0; i < data.length; i++) {
				if(data[i].opera) {
					nextIndex = i;
					break;
				}
			}
		} else {
			for(var j = index + 1; j < data.length; j++) {
				if(data[j].opera) {
					nextIndex = j;
					break;
				}
			}
			if(typeof(nextIndex) == 'undefined') {
				for(var k = 0; k <= index; k++) {
					if(data[k].opera) {
						nextIndex = k;
						break;
					}
				}
			}
		}
		return nextIndex;
	}

}