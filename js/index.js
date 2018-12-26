window.onload = function() {

	//页面加载渲染数据
	gMenuRenderFirst();
	gMenuRenderSecond();

	document.onkeyup = function(e) {
		if(gMenuPageName == 'list') {
			listKeyEvent(e);
		}else if(gMenuPageName == 'showNum'){
			showNum.keyEvent(e);
		}else if(gMenuPageName=='showSelect'){
			showSelect.keyEvent(e);
		} else if(gMenuPageName == 'divXDeactivationOk'){
			divXDeactivation.keyEventOK(e);
		}else{
			eval(gMenuPageName).keyEvent(e);
		}
	}

}