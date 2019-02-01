window.onload = function() {

	window.gSocket.send(msg, function (data) {
		var obj = JSON.stringify(data.result);
		localStorage.setItem("gWzdAllDefine", obj)
	});

	//页面加载渲染数据
	// menuList.render();
	factoryMenu.render();

	document.onkeyup = function(e) {
		switch (gMenuPageName){
			case 'list':
				menuList.keyEvent(e);
			break;
			case 'showNum':
				showNum.keyEvent(e); 
			break;
			case 'showSelect':
				showSelect.keyEvent(e);
			break;
			case 'divXDeactivationOk':
				divXDeactivation.keyEventOK(e);
			break;
			case 'wirelessSettingScan':
				wirelessSettingScan.keyEvent(e);
			break;
			case 'wirelessScanKey':
				wirelessScanKey.keyEvent(e);
			break;
			case 'wirelessScanResult':
				wirelessScanResult.keyEvent(e);
			break;
			case 'wirelessSettingManual':
				wirelessSettingManual.keyEvent(e);
			break;
			case 'wirelessManualSecurity':
				wirelessManualSecurity.keyEvent(e);
			break;
			case 'wirelessSettingAuto':
				wirelessSettingAuto.keyEvent(e);
			break;
			case 'wirelessAutoPIN':
				wirelessAutoPIN.keyEvent(e);
			break;
			case 'wirelessAutoPBC':
				wirelessAutoPBC.keyEvent(e);
			break;
			case 'cableChannelScanStart':
				cableChannelScanStart.keyEvent(e);
			break;
			case 'OperaSateChannelEdit':
				OperaSateChannelEdit.keyEvent(e);
			break;
			case 'operaSatelliteDiSEqC':
				operaSatelliteDiSEqC.keyEvent(e);
			break;
			case 'operaSatelliteTransponder':
				operaSatelliteTransponder.keyEvent(e);
			break;
			case 'OperaSateChannelScanStart':
				OperaSateChannelScanStart.keyEvent(e);
			break;
			case 'searchSatellite':
				searchSatellite.keyEvent(e);
			break;
			case 'operaSateAntennaType':
				operaSateAntennaType.keyEvent(e);
			break;
			case 'operaSateChannelReScan':
				operaSateChannelReScan.keyEvent(e);
			break;
			case 'operaSatelliteList':
				operaSatelliteList.keyEvent(e);
			break;
			case "operaSatelliteEdit":
				operaSatelliteEdit.keyEvent(e);
			break;
			case "operaSatelliteDiSEqCMotor":
				operaSatelliteDiSEqCMotor.keyEvent(e);
			break;
			case 'operaSatelliteDiSEqCMovement':
				operaSatelliteDiSEqCMovement.keyEvent(e);
			break;
			case 'operaSateManualScanStart':
				operaSateManualScanStart.keyEvent(e);
			break;
			case "cableSingleRFScan":
				cableSingleRFScan.keyEvent(e);
			break;
			case "antennaAnalogManual":
				antennaAnalogManual.keyEvent(e);
			break;
			case "antennaSingleRF":
				antennaSingleRF.keyEvent(e);
			break;
			case "factoryMenu":
				factoryMenu.keyEvent(e);
			break;
			case "fctoryMenuList":
				fctoryMenuList.keyEvent(e);
			break;
			case "A2System":
				A2System.keyEvent(e);
			break;
			case "PALSyatem":
				PALSyatem.keyEvent(e);
			break;
			case "EUSystem":
				EUSystem.keyEvent(e);
			break;
			case "fctoryMenuRangeScan":
				fctoryMenuRangeScan.keyEvent(e);
			break;
			case "tunerDiagnostic":
				tunerDiagnostic.keyEvent(e);
			break;
			default:
				eval(gMenuPageName).keyEvent(e);
		}
	}

}