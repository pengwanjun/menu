//Channel Skip
gMenuStage = 6;
let list = [];
let page = 0;
let channelList;

function channelSkip(value) {
	channelList=value;
	sliceArr(channelList.data, gMenuStage);
	channelSkinRender(0);
//	console.log(value);
}
//渲染数据
function channelSkinRender(fIndex) {
	let html = '<div id="channelSkip"><div class="channelSkip">';
	for(let i = 0; i < list[page].length; i++) {
		if(channelList.name=='gMenuTvChannelEdit') { //Channel Edit
			if(i == fIndex) {
				html += `<div class="listItem focus">
							<div>${list[page][i].name}</div>
							<div>${list[page][i].type}</div>
							<div>${list[page][i].value}</div>
						</div>`;
			} else {
				html += `<div class="listItem">
							<div>${list[page][i].name}</div>
							<div>${list[page][i].type}</div>
							<div>${list[page][i].value}</div>
						</div>`;
			}
		}else if(channelList.name=='gMenuTvAnalogChannel'){
			if(i == fIndex) {
				html += `<div class="listItem focus">
							<div>${list[page][i].name}</div>
							<div>${list[page][i].value}</div>
						</div>`;
			} else {
				html += `<div class="listItem">
							<div>${list[page][i].name}</div>
							<div>${list[page][i].value}</div>
						</div>`;
			}
		}else { //Channel Skip || Channel Sort
			if(list[page][i].sel) {
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div>${list[page][i].name}</div>
							<div>${list[page][i].type}</div>
							<div>${list[page][i].value}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div>${list[page][i].name}</div>
							<div>${list[page][i].type}</div>
							<div>${list[page][i].value}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
				}
			} else {
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div>${list[page][i].name}</div>
							<div>${list[page][i].type}</div>
							<div>${list[page][i].value}</div>
							<div class="sel">未选中</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div>${list[page][i].name}</div>
							<div>${list[page][i].type}</div>
							<div>${list[page][i].value}</div>
							<div class="sel">未选中</div>
						</div>`;
				}
			}
		}
	}
	document.querySelector('#container').innerHTML = html + '</div></div>';
}
//切割数组
function sliceArr(array, size) {
	for(let x = 0; x < Math.ceil(array.length / size); x++) {
		let start = x * size;
		let end = start + size;
		list.push(array.slice(start, end));
	}
}
//响应键盘
function channelSkipKeyEvent(e) {
	let curFocus = document.querySelector(".focus");
	let curList = curFocus.parentElement.children;
	let curIndex = [].indexOf.call(curList, curFocus);
	//下键
	if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
		if(curIndex == curList.length - 1) {
			if(page == list.length - 1) {
				page = 0;
				channelSkinRender(0);
			} else {
				page++;
				channelSkinRender(0);
			}
		} else {
			removeClass(curList[curIndex], 'focus');
			addClass(curList[curIndex + 1], 'focus');
		}
	}
	//上键
	if(e.keyCode == KeyEvent.DOM_VK_UP) {
		if(curIndex == 0) {
			if(page == 0) {
				page = list.length - 1;
				channelSkinRender(list[page].length - 1);
			} else {
				page--;
				channelSkinRender(list[page].length - 1);
			}
		} else {
			removeClass(curList[curIndex], 'focus');
			addClass(curList[curIndex - 1], 'focus');
		}
	}
	//右键
	if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
		if(curIndex == curList.length - 1) {
			if(page == list.length - 1) {
				page = 0;
				channelSkinRender(list[page].length - 1);
			} else {
				page++;
				channelSkinRender(list[page].length - 1);
			}
		} else {
			removeClass(curList[curIndex], 'focus');
			addClass(curList[curList.length - 1], 'focus');
		}
	}
	//左键
	if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
		if(curIndex == 0) {
			if(page == 0) {
				page = list.length - 1;
				channelSkinRender(0);
			} else {
				page--;
				channelSkinRender(0);
			}
		} else {
			removeClass(curList[curIndex], 'focus');
			addClass(curList[0], 'focus');
		}
	}
	//enter键
	if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
		console.log(channelList.name);
		if(channelList.name=='gMenuTvChannelEdit'){  //编辑具体内容
			gMenuPageName='channelEditDetail';
			channelEditDetail(list[page][curIndex]);
		}else if(channelList.name=='gMenuTvAnalogChannel'){  //Analog Channel Fine Tune 详情页面
			
		}else{
			
		}
	}
}