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
			if(gMenuChild.valType == 'num' || gMenuChild.valType == 'sel') {
				//获取数据
				window.gSocket.send(gMenuParent.data[gMenuoIndex].msg('get'), function(data) {
					gMenuParent.data[gMenuoIndex].getCallback(data);
					gMenuRenderSecond();
				});
			} else {
				gMenuRenderSecond();
			}
			changePage(gMenuoIndex, gMenuClassName);
		} else {
			if(gMenuChild.valType == 'scan') {
				gMenuoIndex = canOperaDown(gMenuChild, curIndex);
				removeClass(curList[curIndex], 'focus');
				addClass(curList[gMenuoIndex], 'focus');
				changePage(gMenuoIndex, gMenuClassName);
			} else {
				if(curIndex == curList.length - 1) {
					gMenuoIndex = 0;
					removeClass(curList[curIndex], 'focus');
					addClass(curList[gMenuoIndex], 'focus');
					changePage(gMenuoIndex, gMenuClassName);
				} else {
					gMenuoIndex = curIndex + 1;
					removeClass(curList[curIndex], 'focus');
					addClass(curList[gMenuoIndex], 'focus');
					changePage(gMenuoIndex, gMenuClassName);
				}
			}
		}
	}
	//上键
	if(e.keyCode == KeyEvent.DOM_VK_UP) {
		if(gMenuClassName == 'firstList') {
			gMenuoIndex = canOperaUp(gMenuParent, curIndex);
			removeClass(curList[curIndex], 'focus');
			addClass(curList[gMenuoIndex], 'focus');
			gMenuChild = gMenuParent.data[gMenuoIndex].value;
			if(gMenuChild.valType == 'num' || gMenuChild.valType == 'sel') {
				//获取数据
				window.gSocket.send(gMenuParent.data[gMenuoIndex].msg('get'), function(data) {
					gMenuParent.data[gMenuoIndex].getCallback(data);
					gMenuRenderSecond();
				});
			} else {
				gMenuRenderSecond();
			}
			changePage(gMenuoIndex, gMenuClassName);
		} else {
			if(gMenuChild.valType == 'scan') {
				gMenuoIndex = canOperaUp(gMenuChild, curIndex);
				removeClass(curList[curIndex], 'focus');
				addClass(curList[gMenuoIndex], 'focus');
				changePage(gMenuoIndex, gMenuClassName);
			} else {
				if(curIndex == 0) {
					gMenuoIndex = curList.length - 1;
					removeClass(curList[curIndex], 'focus');
					addClass(curList[gMenuoIndex], 'focus');
					changePage(gMenuoIndex, gMenuClassName);
				} else {
					gMenuoIndex = curIndex - 1;
					removeClass(curList[curIndex], 'focus');
					addClass(curList[gMenuoIndex], 'focus');
					changePage(gMenuoIndex, gMenuClassName);
				}
			}
		}
	}
	//右键
	if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
		if(gMenuClassName == 'firstList') {
			enterAndRight(curIndex, curFocus, curList);
		} else {
			if(gMenuChild.valType == 'num') {
				//第二列---右键---数值增大
				if(gMenuChild.data < gMenuChild.max) {
					gMenuChild.data++;
					window.gSocket.send(gMenuParent.data[gMenuoIndex].msg('set'), function(data) {
						if(data.error.code == 0) {
							gMenuParent.data[gMenuoIndex].getCallback(data);
							gMenuRenderSecond();
							addClass(curList[curIndex], 'focus');
						} else {
							gMenuChild.data--;
						}
					});
				}
			} else if(gMenuChild.valType == 'scan') {
				let scanValue = gMenuChild.data[curIndex].value;
				gMenuPageName = scanValue.renderFuc;
				if(Object.prototype.toString.call(scanValue.data) === '[object Array]'){
					eval(scanValue.renderFuc).render(scanValue);
				}else{
					eval(scanValue.renderFuc).render(scanValue.data.name);
				}
			}
		}
	}
	//左键
	if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
		document.querySelector('.secondList').style.top = '0px';
		if(gMenuClassName == 'firstList') {
			if(gMenuNavlist.length != 0) {
				gMenuChild = gMenuParent;
				gMenuoIndex = gMenuNavlist[gMenuNavlist.length - 1].mark;
				gMenuParent = gMenuNavlist[gMenuNavlist.length - 1].arr;
				changePage(gMenuoIndex, gMenuClassName);
				gMenuRenderFirst();
				gMenuRenderSecond();
				gMenuNavlist.pop();
			}
		} else {
			if(gMenuChild.valType == 'num') {
				//第二列---左键---数值减小
				if(gMenuChild.data > gMenuChild.min) {
					gMenuChild.data--;
					window.gSocket.send(gMenuParent.data[gMenuoIndex].msg('set'), function(data) {
						if(data.error.code == 0) {
							gMenuParent.data[gMenuoIndex].getCallback(data);
							gMenuRenderSecond();
							addClass(curList[curIndex], 'focus');
						} else {
							gMenuChild.data++;
						}
					});
				}
			} else {
				gMenuoIndex = gMenuNavlist[gMenuNavlist.length - 1].mark;
				gMenuClassName = 'firstList';
				gMenuParent = gMenuNavlist[gMenuNavlist.length - 1].arr;
				gMenuRenderFirst();
				gMenuRenderSecond();
				gMenuNavlist.pop();
			}
		}
	}
	//enter键
	if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
		//第一列
		if(gMenuClassName == 'firstList') {
			enterAndRight(curIndex, curFocus, curList);
		}
		//第二列
		if(gMenuClassName == 'secondList') {
			//valType===sel
			if(gMenuChild.valType == 'sel') {
				let mark = gMenuNavlist[gMenuNavlist.length - 1].mark;
				let thisData = gMenuNavlist[gMenuNavlist.length - 1].arr.data[mark];
				window.gSocket.send(gMenuNavlist[gMenuNavlist.length - 1].arr.data[mark].msg('set'), function(data) {
					if(data.error.code == 0) {
						thisData.setCallback(data);
					}
				});
			}
			//valType===scan
			if(gMenuChild.valType == 'scan') {
				let scanValue = gMenuChild.data[curIndex].value;
				gMenuPageName = scanValue.renderFuc;
				if(Object.prototype.toString.call(scanValue.data) === '[object Array]'){
					eval(scanValue.renderFuc).render(scanValue);
				}else{
					eval(scanValue.renderFuc).render(scanValue.data.name);
				}
			}
		}
	}
	e.stopPropagation();
}

//第一列  enter键选中或者right键进入  第二列
function enterAndRight(curIndex, curFocus, curList) {
	var obj = {
		arr: gMenuParent,
		mark: curIndex
	}
	gMenuNavlist.push(obj);
	if(gMenuChild.valType == 'list') {
		gMenuParent = gMenuChild;
		gMenuoIndex = canOperaDown(gMenuParent, -1);
		gMenuChild = gMenuParent.data[gMenuoIndex].value;
		if(gMenuParent.data[gMenuoIndex].value.valType == 'num' ||
			gMenuParent.data[gMenuoIndex].value.valType == 'sel') {
			window.gSocket.send(gMenuParent.data[gMenuoIndex].msg('get'), function(data) {
				if(data.error.code == 0) {
					gMenuParent.data[gMenuoIndex].getCallback(data);
					gMenuRenderFirst();
					gMenuRenderSecond();
				}
			});
		}
		gMenuRenderFirst();
		gMenuRenderSecond();
		changePage(gMenuoIndex, gMenuClassName);
	} else if(gMenuChild.valType == 'sel') {
		for(var i = 0; i < gMenuChild.data.length; i++) {
			if(gMenuParent.data[curIndex].curVal == i) {
				gMenuoIndex = i;
				break;
			}
		}
		var nextList = curFocus.parentElement.nextElementSibling.children;
		removeClass(curList[curIndex], 'focus');
		addClass(nextList[gMenuoIndex], 'focus');
		gMenuClassName = 'secondList';
		changePage(gMenuoIndex, gMenuClassName);
	} else if(gMenuChild.valType == 'scan') {
		if(Object.prototype.toString.call(gMenuChild.data) === '[object Array]') {
			if(gMenuChild.data.length == 0) {
				gMenuNavlist.pop();
				gMenuPageName = gMenuChild.renderFuc;
				eval(gMenuChild.renderFuc).render();
			} else {
				gMenuoIndex = canOperaDown(gMenuChild, -1);
				var nextList = curFocus.parentElement.nextElementSibling.children;
				removeClass(curList[curIndex], 'focus');
				addClass(nextList[gMenuoIndex], 'focus');
			}
		} else {
			gMenuNavlist.pop();
			gMenuPageName = gMenuChild.renderFuc;
			eval(gMenuChild.renderFuc).render(gMenuChild.data.name);
		}

	} else {
		var nextList = curFocus.parentElement.nextElementSibling.children;
		removeClass(curList[curIndex], 'focus');
		addClass(nextList[0], 'focus');
	}
}

//列表分页效果
function changePage(index, gMenuClassName) {
	var itemHeight = document.querySelector(".listItem.focus").offsetHeight;
	var floorIndex = Math.floor(index / 9);
	document.querySelector('.' + gMenuClassName + '').style.top = -(floorIndex * 9 * Number(itemHeight)) + 'px';
}

//渲染数据--第一列
function gMenuRenderFirst() {
	var html1 = '';
	for(var i = 0; i < gMenuParent.data.length; i++) {
		if(gMenuClassName == 'firstList' && i == gMenuoIndex) {
			html1 += '<div class="listItem focus">' + gMenuParent.data[i].name + '<span>>></span></div>';
		} else {
			if(gMenuParent.data[i].opera) {
				html1 += '<div class="listItem">' + gMenuParent.data[i].name + '<span>>></span></div>';
			} else {
				html1 += '<div class="listItem disabled">' + gMenuParent.data[i].name + '<span>>></span></div>';
			}
		}
	}
	document.querySelector('.firstList').innerHTML = html1;
}
//渲染数据--第二列
function gMenuRenderSecond() {
	var html2 = '';
	var type = gMenuChild.valType;
	if(type == 'list' || type == 'scan') {
		for(var j = 0; j < gMenuChild.data.length; j++) {
			if(gMenuChild.data[j].opera) {
				html2 += '<div class="listItem">' + gMenuChild.data[j].name + '<span>>></span></div>';
			} else {
				html2 += '<div class="listItem disabled">' + gMenuChild.data[j].name + '<span>>></span></div>';
			}
		}
	} else if(type == 'sel') {
		for(var j = 0; j < gMenuChild.data.length; j++) {
			html2 += '<div class="listItem"><span>请选择：</span>' + gMenuChild.data[j] + '</div>';
		}
	} else { //type == 'str' || type == 'num'
		html2 += '<div class="listItem"><span>' + type + '值为：</span>' + gMenuChild.data + '</div>';
	}
	document.querySelector('.secondList').innerHTML = html2;
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