//渲染数据
var popBoxShow = {
	pageName: '',
	render: function(pName) {
		this.pageName = pName;
		var html = `
		<div id="popBoxShow">
			<div class="popBoxShow">
				<div>Are you sure?</div>
				<div class="btn">
					<div class="sure">OK</div>
					<div class="cancel focus">Cancel</div>
				</div>
			</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
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
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(hasClass(curFocus, 'cancel')) {
				returnListPage();
			} else {
				console.log(this.pageName);
				if(this.pageName == 'gMenuCleanChannelList') { //Clean Channel List
					var msg = {
						"params": {
							"SvlId": 1,
							"cleanLol": true
						},
						"method": "mtk.webui.channelList.cleanChannellist"
					}
					window.gSocket.send(msg, function(data) {
						if(data.error.code == 0) {
							for(var i=0;i<gMenuTvChannels.length;i++){
								if(gMenuTvChannels[i].name=='Channel Skip' || gMenuTvChannels[i].name=='Channel Sort'
								|| gMenuTvChannels[i].name=='Channel Edit' || gMenuTvChannels[i].name=='Analog Channel Fine Tune'
								|| gMenuTvChannels[i].name=='Clean Channel List'){
									gMenuTvChannels[i].opera=false;
								}
							}
							gMenuoIndex=0;
							returnListPage();
						}
					});
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}