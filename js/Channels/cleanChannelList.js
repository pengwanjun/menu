//渲染数据
function cleanChannelList(value) {
	var html = `
		<div id="cleanChannelList">
			<div class="cleanChannelList">
				<div>Are you sure?</div>
				<div class="btn">
					<div class="sure">OK</div>
					<div class="cancel focus">Cancel</div>
				</div>
			</div>
		</div>
	`;
	document.querySelector('#container').innerHTML = html;
}

//响应键盘
function cleanChannelListKeyEvent(e) {
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
	if(e.keyCode == KeyEvent.DOM_VK_ENTER){
		if(hasClass(curFocus,'cancel')){
			gMenuClassName='secondList';
			gMenuoIndex=gMenuNavlist[gMenuNavlist.length-1].mark;
			gMenuChild=gMenuNavlist[gMenuNavlist.length-1].arr;
			renderSecond();
			gMenuNavlist.pop();
		}else{
			console.log(2222);
		}
	}
}