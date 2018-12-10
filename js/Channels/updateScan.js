//Update Scan
function updateScan(value) {
	var html = '';
	for(var k in value) {
		html += '<div class="channelScan">' + k + '：' + value[k] + '</div>';
	}
	document.querySelector('#container').innerHTML = html;
}
//响应键盘
function channelScanKeyEvent(e){
	console.log(e);
}