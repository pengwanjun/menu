window.onload = function() {

	//页面加载渲染数据
	gMenuRenderFirst();
	gMenuRenderSecond();
// cableSingleRFScan.render();

	document.onkeyup = function(e) {
		if(gMenuPageName == 'list') {
			listKeyEvent(e);
		}else if(gMenuPageName == 'showNum'){
			showNum.keyEvent(e);
		}else if(gMenuPageName=='showSelect'){
			showSelect.keyEvent(e);
		} else if(gMenuPageName == 'divXDeactivationOk'){
			divXDeactivation.keyEventOK(e);
		} else if(gMenuPageName == 'wirelessSettingScan'){
			wirelessSettingScan.keyEvent(e);
		} else if(gMenuPageName == 'wirelessScanKey'){
			wirelessScanKey.keyEvent(e);
		} else if(gMenuPageName == 'wirelessScanResult'){
			wirelessScanResult.keyEvent(e);
		} else if(gMenuPageName == 'wirelessSettingManual'){
			wirelessSettingManual.keyEvent(e);
		} else if(gMenuPageName == 'wirelessManualSecurity'){
			wirelessManualSecurity.keyEvent(e);
		} else if(gMenuPageName == 'wirelessSettingAuto'){
			wirelessSettingAuto.keyEvent(e);
		} else if(gMenuPageName == 'wirelessAutoPIN'){
			wirelessAutoPIN.keyEvent(e);
		} else if(gMenuPageName == 'wirelessAutoPBC'){
			wirelessAutoPBC.keyEvent(e);
		} else if(gMenuPageName=='cableChannelScanStart'){
			cableChannelScanStart.keyEvent(e);
		} else{
			eval(gMenuPageName).keyEvent(e);
		}
	}

}