window.onload = function() {

	//页面加载渲染数据
	gMenuRenderFirst();
	gMenuRenderSecond();

	document.onkeyup = function(e) {
		if(gMenuPageName == 'list') {
			listKeyEvent(e);
		} else if(gMenuPageName == 'divXDeactivationOk'){
			divXDeactivation.keyEventOK(e);
		}else{
			eval(gMenuPageName).keyEvent(e);
		}
//		else if(gMenuPageName == 'channelScan') {
//			channelScanKeyEvent(e);
//		} else if(gMenuPageName == 'updateScan') {
//			updateScanKeyEvent(e);
//		} else if(gMenuPageName == 'analogManualScan') {
//			analogManualScanKeyEvent(e);
//		} else if(gMenuPageName == 'singleRFScan') {
//			singleRFScanKeyEvent(e);
//		} else if(gMenuPageName == 'channelSkip') {
//			channelSkipKeyEvent(e);
//		} else if(gMenuPageName == 'channelEditDetail') {
//			channelEditDetailKeyEvent(e);
//		} else if(gMenuPageName == 'popBoxShow') {
//			popBoxShowKeyEvent(e);
//		}else if(gMenuPageName=='divXRegistration'){
//			divXRegistrationKeyEvent(e);
//		}else if(gMenuPageName=='divXDeactivation'){
//			divXDeactivationKeyEvent(e);
//		}else if(gMenuPageName == 'divXDeactivationOk'){
//			divXDeactivationKeyEventOK(e);
//		}
	}

}