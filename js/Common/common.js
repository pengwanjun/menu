//判断dom元素是否有某个class值
function hasClass(ele, cls) {
	return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
//为指定的dom元素添加样式
function addClass(ele, cls) {
	if(!hasClass(ele, cls)) ele.className += " " + cls;
}
//删除指定dom元素的样式
function removeClass(ele, cls) {
	if(hasClass(ele, cls)) {
		var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
		ele.className = ele.className.replace(reg, " ");
	}
}
//如果存在(不存在)，就删除(添加)一个样式
function toggleClass(ele, cls) {
	if(hasClass(ele, cls)) {
		removeClass(ele, cls);
	} else {
		addClass(ele, cls);
	}
}

//切割数组
function sliceArr(array, size) {
	let arr=[];
	for(let x = 0; x < Math.ceil(array.length / size); x++) {
		let start = x * size;
		let end = start + size;
		arr.push(array.slice(start, end));
	}
	return arr;
}


//返回到list页面
function returnListPage() {
	document.querySelector('#container').innerHTML = `
				<div id="menuNav">
					<span>Menu-Video</span>
				</div>
				<div id="listContainer">
					<div class="menuList">
					</div>
					<div id="showList">
						<div class="showList">
							<div class="showListContainer"></div>
						</div>
					</div>
				</div>
				<div id="menuOperate">
					<div class="menuOperate">
						<div>Enter</div>
						<div>Select</div>
						<div>Exit</div>
					</div>
				</div>
			`;
	gMenuPageName = 'list';
	menuList.render();
}
function reRenderList(){
	document.querySelector('#showList').innerHTML=`<div class="showList"></div>`;
	gMenuPageName = 'list';
	menuList.gMenuRenderSecond();
}
