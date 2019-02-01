var msg = {
	"method": "mtk.webui.system.queryMacroIsEnable",
	"params": ["APP_TWN_SUPPORT", "APP_DTMB_SUPPORT", "APP_REGION_CHINA_ONLY", "APP_GUI_LANG_SIMPLE", "APP_NAV_EWS_PA_SUPPORT", "APP_SUPPORT_ACR_SAMBA", "APP_ATV_ONLY", "APP_DVBT_OCEANIA_SUPPORT", "APP_NAVEWS_PA_SUPPORT", "APP_DVBS_SUPPORT", "APP_DVBC_SUPPORT", "APP_DVBT_SUPPORT", "APP_DVBS_UI_ALPHA_SUPPORT", "APP_TWO_SAT_CHLIST", "APP_SCAN_UK_REGION_SUPPORT", "APP_DVBS_DISEQC_IMPROVE"],
}

//var setmsg = {
//	"jsonrpc": "2.0",
//	"method": "mtk.webview.wzd.set.lang",
//	"prams": "eng"
//}
//window.gSocket.send(msg,function(data){
//	console.log(data);
//});
var gWzdLanguageData = {
	gWzdLangMap: {
		"baq": "LANG_LANG1",
		"eus": "LANG_LANG1",
		"bul": "LANG_LANG2",
		"cat": "LANG_LANG3",
		"scr": "LANG_LANG4",
		"cze": "LANG_LANG5",
		"dan": "LANG_LANG6",
		"dut": "LANG_LANG7",
		"eng": "LANG_LANG8",
		"fin": "LANG_LANG9",
		"fre": "LANG_LANG10",
		"gla": "LANG_LANG11",
		"gdh": "LANG_LANG11",
		"gle": "LANG_LANG44",
		"glg": "LANG_LANG12",
		"ger": "LANG_LANG13",
		"gre": "LANG_LANG14",
		"hun": "LANG_LANG15",
		"ita": "LANG_LANG16",
		"nor": "LANG_LANG17",
		"pol": "LANG_LANG18",
		"por": "LANG_LANG19",
		"rum": "LANG_LANG20",
		"rus": "LANG_LANG21",
		"scc": "LANG_LANG22",
		"slo": "LANG_LANG23",
		"slv": "LANG_LANG24",
		"spa": "LANG_LANG25",
		"swe": "LANG_LANG26",
		"tur": "LANG_LANG27",
		"wel": "LANG_LANG28",
		"ice": "LANG_LANG29",
		"isl": "LANG_LANG29",
		"smi": "LANG_LANG30",
		"tha": "LANG_LANG31",
		"vie": "LANG_LANG32",
		"are": "LANG_LANG33",
		"zho": "LANG_LANG34",
		"chi": "LANG_LANG35",
		"per": "LANG_LANG36",
		"kor": "LANG_LANG37",
		"est": "LANG_LANG38",
		"mao": "LANG_LANG39",
		"cmn": "LANG_LANG40",
		"yue": "LANG_LANG41",
		"jpn": "LANG_LANG42",
		"hin": "LANG_LANG43",
		"nar": "LANG_LANG45",
		"qaa": "LANG_LANG_VO"
	},
	langData: null,
	value: [],
	langFlag: null,
	getData: function () {
		var langDefine = JSON.parse(localStorage.getItem("gWzdAllDefine"));
		if (langDefine.APP_TWN_SUPPORT == 1) {
			this.langData = ['eng', 'zho'];
		} else if (langDefine.APP_DTMB_SUPPORT == 1 || langDefine.APP_REGION_CHINA_ONLY == 1) {
			this.langData = ['eng', 'chi', 'zho'];
		} else if (langDefine.APP_GUI_LANG_SIMPLE == 1) {
			this.langData = ['eng', 'baq', 'cat', 'fre', 'glg', 'ger', 'ita', 'por', 'spa'];
		} else {
			this.langData = ['eng', 'baq', 'cat', 'scr', 'cze', 'dan', 'dut', 'fin', 'fre', 'gla', 'glg', 'ger', 'hun', 'ita', 'nor', 'pol', 'por', 'rum', 'scc', 'slo', 'slv', 'spa', 'swe', 'tur', 'wel', 'est', 'rus'];
		}
		for (var i = 0; i < this.langData.length; i++) {
			var temp = this.gWzdLangMap[this.langData[i]];
			this.value[i] = mtvuiUtil.getLangString(temp);
		}
		return this.value;
	},
	setLang: function (index) {
		var msg = {
			"method": "mtk.webui.config.setValue",
			"params": { "configId": "g_gui_lang__gui_language", "value": this.langData[index], "apply": "true" }
		};
		window.gSocket.send(msg, function (data) {

		});
		// window.gSocket.send(msg, data => callback(data));
		//gSocket.send();
	}
}

var gWzdCountryPageData = {
	gWzdcountryMap: {
		"AUT": "WZD_CTY_1", //Austria 
		"BEL": "WZD_CTY_2", //Belgium
		"CHE": "WZD_CTY_3", //Switzerland
		"CZE": "WZD_CTY_4", //Czech Republic
		"DEU": "WZD_CTY_5", //Germany
		"DNK": "WZD_CTY_6", //Denmark
		"ESP": "WZD_CTY_7", //Spain
		"FIN": "WZD_CTY_8", //Finland
		"FRA": "WZD_CTY_9", //France
		"GBR": "WZD_CTY_10", //United Kingdom
		"ITA": "WZD_CTY_11", //Italy
		"LUX": "WZD_CTY_12", //Luxembourg
		"NLD": "WZD_CTY_13", //Netherlands
		"NOR": "WZD_CTY_14", //Norway
		"SWE": "WZD_CTY_15", //Sweden
		"BGR": "WZD_CTY_16", //Bulgaria
		"HRV": "WZD_CTY_17", //Croatia
		"GRC": "WZD_CTY_18", //Greece
		"HUN": "WZD_CTY_19", //Hungary
		"IRL": "WZD_CTY_20", //Ireland
		"POL": "WZD_CTY_21", //Poland
		"PRT": "WZD_CTY_22", //Portugal
		"ROU": "WZD_CTY_23", //Romania
		"RUS": "WZD_CTY_24", //Russia
		"SRB": "WZD_CTY_25", //Serbia
		"SVK": "WZD_CTY_26", //Slovakia
		"SVN": "WZD_CTY_27", //Slovenia
		"TUR": "WZD_CTY_28", //Turkey
		"EST": "WZD_CTY_29", //Estonia
		"AUS": "WZD_CTY_30", //Australia
		"NZL": "WZD_CTY_31", //New Zealand
		"IDN": "WZD_CTY_32", //Indonesia
		"IND": "WZD_ANLG_ONLY_XAP_CTY_1", //India
		"PHL": "WZD_ANLG_ONLY_XAP_CTY_2", //philippines
		"XIS": "WZD_ANLG_ONLY_XAP_CTY_3", //CIS(commonwealth of independent states)
		"XAP": "WZD_ANLG_ONLY_XAP_CTY_4" //others//asia pacific
	},
	ctyData: null,
	curCty: null,
	value: [],
	curIndex: null,
	getData: function () {
		var ctyDefine = JSON.parse(localStorage.getItem("gWzdAllDefine"));
		if (ctyDefine.APP_ATV_ONLY == 1) {
			this.ctyData = ['IND', 'PHL', 'XIS', 'XAP'];
		} else {
			if (ctyDefine.APP_DVBT_OCEANIA_SUPPORT == 1) {
				if (ctyDefine.APP_NAVEWS_PA_SUPPORT == 1) {
					this.ctyData = ['AUT', 'NZL', 'IDN'];
				} else {
					this.ctyData = ['AUT', 'NZL'];
				}
			} else {
				this.ctyData = ['AUT', 'BEL', 'CHE', 'CZE', 'DEU', 'DNK', 'ESP', 'FIN', 'FRA', 'GBR', 'ITA', 'LUX', 'NLD', 'NOR', 'SWE', 'BGR', 'HRV', 'GRC', 'HUN', 'IRL', 'POL', 'PRT', 'ROU', 'RUS', 'SRB', 'SVK', 'SVN', 'TUR', 'EST', 'GBR'];
			}
		}
		for (var i = 0; i < this.ctyData.length; i++) {
			var temp = this.gWzdcountryMap[this.ctyData[i]];
			this.value[i] = mtvuiUtil.getLangString(temp);
		}
		return this.value;
	},
	setCty: function (index) {
		this.curIndex = index;
		var msg = {
			"method": "mtk.webui.wzd.setCountry",
			"params": this.ctyData[index],
		};
		return msg;
	},
	setCtyCallback: function (data) {
		if (data.error.code == 0) {
			this.curCty = this.ctyData[this.curIndex];
			return true;
		} else {
			return false;
		}
	}

}

var gWzdTunerModePageData = {
	curTuner: null,
	tunerData: null,
	value: [],
	curIndex: null,
	gWzdTunerModeMap: {
		"0": "WZD_TUNER_1",
		"1": "WZD_TUNER_2",
		"2": "WZD_TUNER_3",
	},
	getData: function () {
		var tunerDefine = JSON.parse(localStorage.getItem("gWzdAllDefine"));;
		if (tunerDefine.APP_DVBC_SUPPORT == 1 && tunerDefine.APP_DVBS_SUPPORT == 1) {
			this.tunerData = ['0', '1', '2'];
		} else if (tunerDefine.APP_DVBC_SUPPORT == 1) {
			this.tunerData = ['0', '1'];
		} else if (tunerDefine.APP_DVBS_SUPPORT == 1) {
			this.tunerData = ['0', '2'];
		}

		for (var i = 0; i < this.tunerData.length; i++) {
			var temp = this.gWzdTunerModeMap[this.tunerData[i]];
			this.value[i] = mtvuiUtil.getLangString(temp);
		}
		return this.value;
	},
	setTuner: function (index) {
		this.curIndex = index;
		var msg = {
			"method": "mtk.webui.config.setValue",
			"params": { "configId": "g_bs__bs_src", "value": this.tunerData[index], "apply": "true" }
		};
		return msg;
	},
	setTunerCallback: function (data) {
		if (data.error.code == 0) {
			this.curTuner = this.tunerData[this.curIndex];
			return true;
		} else {
			return false;
		}
	}
}

var gWzdDvbtOperatorData = {
	valueString: [],
	value: [],
	//	state:null,
	enterOperator: function () {
		if (gWzdCountryPage.curCountry == 'ITA') {
			return true;
		} else {
			return false;
		}
	},
	getData: function () {
		// gWzdCountryPageData.curCty = 'ITA';
		if (gWzdCountryPageData.curCty == 'ITA') {
			this.valueString = ['WZD_DVBT_OPERATOR_OTHERS', 'WZD_DVBT_OPERATOR_MEDIASET'];
			//			this.value =  ['Automatic Channel Ordering', 'Mediaset Premium Ordering'];
		}
		for (var i = 0; i < this.valueString.length; i++) {
			this.value[i] = mtvuiUtil.getLangString(this.valueString[i]);
		}
		return this.value;
	},
	setDvbtOperator: function (index) {

		var msg = {
			"method": "mtk.webui.config.setValue",
			"params": { "configId": "g_bs__bs_terrestrial_brdcster", "value": this.value[index], "apply": "true" }
		};

		window.gSocket.send(msg, function (data) {
		});
	},

}

var gWzdDvbcOperatorData = {
	value: [],
	curOpt: null,
	enterOperator: function (cty) {
		if (cty == 'NLD' || cty == 'SWE' || cty == 'DNK' || cty == 'DEU' ||
			cty == 'FRA' || cty == 'FIN' || cty == 'NOR' || cty == 'BEL' ||
			cty == 'ROU' || cty == 'HUN' || cty == 'CHE' || cty == 'AUT' ||
			cty == 'IRL' || cty == 'POL') {
			return true;
		} else {
			return false;
		}
	},
	operatorMlmMap: {
		"OPT_UPC": "WZD_CABLE_OPT_UPC",
		"OPT_ZIGGO": "WZD_CABLE_OPT_ZIGGO",
		"OPT_STOFA": "WZD_CABLE_OPT_STOFA",
		"OPT_YOUSEE": "WZD_CABLE_OPT_YOUSEE",
		"OPT_CANAL_DIGITAL": "WZD_CABLE_OPT_CANAL_DIGITAL",
		"OPT_GLENTEN": "WZD_CABLE_OPT_GLENTEN",
		"OPT_UNITYMEDIA": "WZD_CABLE_OPT_UNITYMEDIA",
		"OPT_TELE_COLUMBUS": "WZD_CABLE_OPT_TELE_COLUMBUS",
		"OPT_NUMERICABLE": "WZD_CABLE_OPT_NUMERICABLE",
		"OPT_TELENET": "WZD_CABLE_OPT_TELENET",
		"OPT_VOO": "WZD_CABLE_OPT_VOO",
		"OPT_RCS_RDS": "wzd_CABLE_OPT_RCS_RDS",
		"OPT_OTH": "WZD_CABLE_OPT_OTH",
	},
	operatorList: {
		"NLD": ['OPT_UPC', 'OPT_ZIGGO', 'OPT_OTH'],
		"SWE": ['OPT_COMHEM', 'OPT_CANAL_DIGITAL', 'OPT_OTH'],
		"DNK": ['OPT_STOFA', 'OPT_YOUSEE', 'OPT_CANAL_DIGITAL', 'OPT_GLENTEN', 'OPT_OTH'],
		"DEU": ['OPT_UNITYMEDIA', 'OPT_TELE_COLUMBUS', 'OPT_OTH'],
		"FRA": ['OPT_NUMERICABLE', 'OPT_OTH'],
		"FIN": ['OPT_CANAL_DIGITAL', 'OPT_OTH'],
		"NOR": ['OPT_CANAL_DIGITAL'],
		"BEL": ['OPT_TELENET', 'OPT_VOO', 'OPT_OTH'],
		"ROU": ['OPT_UPC', 'OPT_RCS_RDS', 'OPT_OTH'],
		"HUN": ['OPT_UPC', 'OPT_RCS_RDS', 'OPT_OTH'],
		"CHE": ['OPT_UPC', 'OPT_OTH'],
		"AUT": ['OPT_UPC', 'OPT_OTH'],
		"IRL": ['OPT_UPC', 'OPT_OTH'],
		"POL": ['OPT_UPC', 'OPT_OTH'],
	},
	getData: function (cty) {
		var curOptList = this.operatorList[cty];
		for (var i = 0; i < curOptList.length; i++) {

			this.value[i] = mtvuiUtil.getLangString(this.operatorMlmMap[curOptList[i]]);
		}
		return this.value;
	},
	setDvbcOperator: function (index) {
		this.curOpt = this.value[index];
		var msg = {
			"method": "mtk.webui.config.setValue",
			"params": { "configId": "g_bs__bs_cable_brdcster", "value": this.value[index], "apply": true },
		};
		return msg;
	},
	setDvbcOptCallback: function (data) {
		if (data.error.code == 0) {
			return true;
		} else {
			return false;
		}
	},

}

var gWzdDvbsOperatorData = {
	value: [],
	curIndex: null,
	m7ScanList: ["DEUTSCHLAND", "AUSTRIASAT", "CANNALDIGITAAL", "TV_VLAANDEREN_HD", "TELESAT_BELGIUM", "SYKLINK_CZ", "SYKLINK_SK"],
	enterOperator: function (cty) {
		if (cty == 'DEU' || cty == 'AUT' || cty == 'NLD' || cty == 'BEL' ||
			cty == 'CZE' || cty == 'SVK' || cty == 'DNK' || cty == 'FIN' ||
			cty == 'NOR' || cty == 'SWE' || cty == 'POL' || cty == 'TUR' ||
			cty == 'FRA' || cty == 'RUS' || cty == 'ITA' || cty == 'HUN' ||
			cty == 'SVN' || cty == 'CHE' || cty == 'NZL' || cty == 'ROU') {
			return true;
		} else {
			return false;
		}
	},
	operatorMlmMap: {
		"ASTRA_HD_PLUS": "MENU_DVBS_OPERATOR_ASTRA_HD_PLUS",//Astra HD+
		"SKY_DEUTSCHLANG": "MENU_DVBS_OPERATOR_SKY_DEUTSCHLAND",//Sky Deutschland
		"ORS": "MENU_DVBS_OPERATOR_ORS",//ORS
		"AUSTRIASAT": "MENU_DVBS_OPERATOR_AUSTRIASAT",//HD Austria
		"CANNALDIGITAAL": "MENU_DVBS_OPERATOR_CANNALDIGITAAL_HD",//Cannal Digitaal
		"TV_VLAANDEREN_HD": "MENU_DVBS_OPERATOR_TV_VLAANDEREN_HD",//TV VLAANDEREN
		"TV_VLAANDEREN_SD": "MENU_DVBS_OPERATOR_TV_VLAANDEREN_SD",//TV VLAANDEREN SD
		"TELESAT_BELGIUM": "MENU_DVBS_OPERATOR_TELESAT_BELGIUM",//TELESAT
		"TELESAT_LUXEMBOURG": "MENU_DVBS_OPERATOR_TELESAT_LUXEMBOURG",//TELESAT-Luxembourg
		"SYKLINK_CZ": "MENU_DVBS_OPERATOR_SEZNAM_KANALU_PRO_CESKO",//Skylink Czech
		"SYKLINK_SK": "MENU_DVBS_OPERATOR_SEZNAM_KANALU_PRO_SLOVENSKO",//Skylink Slovak
		"CANNAL_DIGITAL": "MENU_DVBS_OPERATOR_CANNAL_DIGITAL",//Cannal Digital
		"NNK": "MENU_DVBS_OPERATOR_N_NA_KARTE",//n na karte
		"DIGITURK_EUTELSAT": "MENU_DVBS_OPERATOR_DIGITURK_EUTELSAT",//Digiturk Eutelsat
		"DIGITURK_TURKSAT": "MENU_DVBS_OPERATOR_DIGITURK_TURKSAT",//Digiturk Turksat
		"FRANSAT": "MENU_DVBS_OPERATOR_FRANSAT",//FRANSAT
		"CYFROWY_POLSAT": "MENU_DVBS_OPERATOR_CYFROWY_POLSAT",//CYFROWY POLSAT
		"SMART_HD_PLUS": "MENU_DVBS_OPERATOR_SMART_HDPLUS",//Smart HD+
		"D_SMART": "MENU_DVBS_OPERATOR_DSMART",//D-Smart
		"NTV_PLUS": "MENU_DVBS_OPERATOR_NTVPLUS",//NTV-PLUS
		"NC_PLUS": "MENU_DVBS_OPERATOR_NC_PLUS",//NC+/CYFRA+
		"TIVU_SAT": "MENU_DVBS_OPERATOR_TIVUSAT",//Tivusat
		"HELLO": "MENU_DVBS_OPERATOR_HELLO",//AustriaSat Magyarország
		"TKGS": "MENU_DVBS_OPERATOR_TKGS",//TKGS
		"FREEVIEW_SAT": "MENU_DVBS_OPERATOR_FREEVIEW_SAT",//Freeview Sat
		"ASTRA_INTERNATIONAL_LCN": "MENU_DVBS_OPERATOR_ASTRA_INTERNATIONAL_LCN",//Astra International LCN
		"DEUTSCHLAND": "MENU_DVBS_OPERATOR_FAST_SCAN_DEUTSCHLAND",//Diveo
		"TIVIBU": "MENU_DVBS_OPERATOR_TIVIBU",//Tivibu
		"DIGI_TV": "MENU_DVBS_OPERATOR_RCS_RDS",//DIGI
		"WHITE_LABEL_PLATFORM_LCN": "MENU_DVBS_OPERATOR_WHITE_LABEL_PLATFORM_LCN",//White Label Platform LCN
		"SIMPLITV": "MENU_DVBS_OPERATOR_SIMPLITV",//SimpliTV
		"DIGI_TV_CZE": "MENU_DVBS_OPERATOR_DIGI_CZ",//DIGI CZ
		"DIGI_TV_SVK": "MENU_DVBS_OPERATOR_DIGI_SK",//DIGI SK
		"TRICOLOR": "MENU_DVBS_OPERATOR_TRICOLOR",//Tricolor
		"TELEKARTA": "MENU_DVBS_OPERATOR_TELEKARTA",//Telekarta
		"OTHERS": "MENU_DVBS_OPERATOR_OTHERS",//Others
	},
	operatorList: {
		"DEU": ['ASTRA_HD_PLUS', 'SKY_DEUTSCHLANG', 'ASTRA_INTERNATIONAL_LCN', 'DEUTSCHLAND', 'WHITE_LABEL_PLATFORM_LCN'],//Germany //[Astra HD+,Sky Deutschland,Astra International LCN,Diveo,White Label Platform LCN]
		"AUT": ['ORS', 'SKY_DEUTSCHLANG', 'AUSTRIASAT', 'SIMPLITV', 'ASTRA_INTERNATIONAL_LCN', 'WHITE_LABEL_PLATFORM_LCN'],//Austria //[ORS,Sky Deutschland,HD Austria,SimpliTV,Astra International LCN,White Label Platform LCN]
		"NLD": ['CANNALDIGITAAL'],//[Cannal Digitaal] //Netherlands
		"BEL": ['TV_VLAANDEREN_HD', 'TELESAT_BELGIUM'],//[TV VLAANDEREN,TELESAT] //Belgium
		"CZE": ['SYKLINK_CZ', 'SYKLINK_SK', 'ASTRA_INTERNATIONAL_LCN', 'DIGI_TV_CZE', 'DIGI_TV_SVK'],//Czech Republic //["Skylink Czech,Skylink Slovak,Astra International LCN,DIGI CZ,DIGI SK]
		"SVK": ['SYKLINK_CZ', 'SYKLINK_SK', 'ASTRA_INTERNATIONAL_LCN', 'DIGI_TV_CZE', 'DIGI_TV_SVK'],//Slovakia //["Skylink Czech,Skylink Slovak,Astra International LCN,DIGI CZ,DIGI SK]
		"DNK": ['CANNAL_DIGITAL'],//[Cannal Digital] //Denmark
		"FIN": ['CANNAL_DIGITAL'],//[Cannal Digital] //Finland
		"NOR": ['CANNAL_DIGITAL'],//[Cannal Digital] //Norway
		"SWE": ['CANNAL_DIGITAL'],//[Cannal Digital] //Sweden
		"POL": ['NNK', 'NC_PLUS', 'CYFROWY_POLSAT', 'SMART_HD_PLUS'],//[n na karte,NC+/CYFRA+,CYFROWY POLSAT,Smart HD+] //Poland
		"TUR": ['DIGITURK_EUTELSAT', 'DIGITURK_TURKSAT', 'D_SMART', 'TKGS', 'TIVIBU'],//Turkey //[Digiturk Eutelsat,Digiturk Turksat,D-Smart,TKGS,Tivibu]
		"FRA": ['FRANSAT'],//[FRANSAT] //France
		"RUS": ['NTV_PLUS', 'TRICOLOR', 'TELEKARTA'],//[NTV-PLUS,Tricolor,Telekarta] //Russia
		"ITA": ['TIVU_SAT'],//[Tivusat] //Italy
		"HUN": ['ASTRA_INTERNATIONAL_LCN', 'DIGI_TV'],//[Astra International LCN,DIGI] //Hungary
		"SVN": ['ASTRA_INTERNATIONAL_LCN'],//[Astra International LCN] //Slovenia
		"CHE": ['ASTRA_INTERNATIONAL_LCN'],//[Astra International LCN] //Switzerland
		"NZL": ['FREEVIEW_SAT'],//[Freeview Sat] //New Zealand
		"ROU": ['DIGI_TV']//[DIGI] //Romania
	},
	enterM7Scan: function (cty, index) {
		var curOpt = this.operatorList[cty][index];
		for (var i = 0; i < this.m7ScanList.length; i++) {
			if (curOpt == this.m7ScanList[i]) {
				return true;
			}
		}
		return false;

	},
	getData: function (cty) {
		var curOptList = this.operatorList[cty];
		for (var i = 0; i < curOptList.length; i++) {

			this.value[i] = mtvuiUtil.getLangString(this.operatorMlmMap[curOptList[i]]);
		}
		return this.value;
	},
	setOpt: function (index) {
		this.curIndex = index;
		console.log(this.value);
		var msg = {
			"method": "mtk.webui.channelscan.dvbs.setDvbsOperator",
			"params": this.value[index],
		};
		return msg;
	},
	setOptCallback: function (data) {
		if (data.error.code == 0) {
			return true;
		} else {
			return false;
		}
	}

}

var gWzdAntennaCfgData = {
	userBand1: { "name": "User band1", "bandFreq": ['1210', '1284', '1400', 'User define'] },
	userBand2: { "name": "User band2", "bandFreq": ['1400', '1420', '1516', 'User define'] },
	userBand3: { "name": "User band3", "bandFreq": ['1516', '1632', '1680', 'User define'] },
	userBand4: { "name": "User band4", "bandFreq": ['1632', '1748', '2040', 'User define'] },
	userBand5: { "name": "User band5", "bandFreq": ['1748', 'User define'] },
	userBand6: { "name": "User band6", "bandFreq": ['1864', 'User define'] },
	userBand7: { "name": "User band7", "bandFreq": ['1980', 'User define'] },
	userBand8: { "name": "User band8", "bandFreq": ['2096', 'User define'] },
	userBand9: { "name": "User band9", "bandFreq": ['User define'] },
	userBand10: { "name": "User band10", "bandFreq": ['User define'] },
	userBand11: { "name": "User band11", "bandFreq": ['User define'] },
	userBand12: { "name": "User band12", "bandFreq": ['User define'] },
	userBand13: { "name": "User band13", "bandFreq": ['User define'] },
	userBand14: { "name": "User band14", "bandFreq": ['User define'] },
	userBand15: { "name": "User band15", "bandFreq": ['User define'] },
	userBand16: { "name": "User band16", "bandFreq": ['User define'] },
	userBand17: { "name": "User band17", "bandFreq": ['User define'] },
	userBand18: { "name": "User band18", "bandFreq": ['User define'] },
	userBand19: { "name": "User band19", "bandFreq": ['User define'] },
	userBand20: { "name": "User band20", "bandFreq": ['User define'] },
	userBand21: { "name": "User band21", "bandFreq": ['User define'] },
	userBand22: { "name": "User band22", "bandFreq": ['User define'] },
	userBand23: { "name": "User band23", "bandFreq": ['User define'] },
	userBand24: { "name": "User band24", "bandFreq": ['User define'] },
	userBand25: { "name": "User band25", "bandFreq": ['User define'] },
	userBand26: { "name": "User band26", "bandFreq": ['User define'] },
	userBand27: { "name": "User band27", "bandFreq": ['User define'] },
	userBand28: { "name": "User band28", "bandFreq": ['User define'] },
	userBand29: { "name": "User band29", "bandFreq": ['User define'] },
	userBand30: { "name": "User band30", "bandFreq": ['User define'] },
	userBand31: { "name": "User band31", "bandFreq": ['User define'] },
	userBand32: { "name": "User band32", "bandFreq": ['User define'] },
	Universal: { "name": "Universal" },
	SingleCable: {
		"name": "SingleCable",
		"userBand": []
	},
	JessSingleCable: {
		"name": "Jess SingleCable",
		"userBand": []
	},
	getData: function (infoData) {
		// {antennaType:0, userBand:0, freq:0, data:[Universal, SingleCable, JessSingleCable]}.
		var msg = {
			"method": "mtk.webui.channelscan.dvbs.queryAntennaTypeInfo"
		};
		var retData = {};

		window.gSocket.send(msg, function (data) {
			var antennaTypeIdex = data.result.AntennaType;
			var tunerIdex = data.result.Tuner;
			var curFreq = data.result.BandFrequency;
			var userBand1 = [];
			var userBand2 = [];
			var i = 1;
			for (var g in gWzdAntennaCfgData) {
				if (g.indexOf('userBand') !== -1) {
					if (i <= 8 && `userBand${i}` === g) {
						userBand1.push(gWzdAntennaCfgData[g]);
					}
					userBand2.push(gWzdAntennaCfgData[g]);
					i++;
				}
			}
			gWzdAntennaCfgData.SingleCable.userBand = userBand1;
			gWzdAntennaCfgData.JessSingleCable.userBand = userBand2;
			if (antennaTypeIdex == 1) {
				for (var i = 0; i < gWzdAntennaCfgData.SingleCable.userBand[tunerIdex].bandFreq.length; i++) {
					if (curFreq == gWzdAntennaCfgData.SingleCable.userBand[tunerIdex].bandFreq[i]) {
						retData.curFreqIdex = i;
						break;
					} else {
						retData.curFreqIdex = gWzdAntennaCfgData.SingleCable.userBand[tunerIdex].bandFreq.length - 1;
					}
				}

			} else if (antennaTypeIdex == 2) {
				for (var i = 0; i < gWzdAntennaCfgData.JessSingleCable.userBand[tunerIdex].bandFreq.length; i++) {
					if (curFreq == gWzdAntennaCfgData.JessSingleCable.userBand[tunerIdex].bandFreq[i]) {
						retData.curFreqIdex = i;
						break;
					} else {
						retData.curFreqIdex = gWzdAntennaCfgData.JessSingleCable.userBand[tunerIdex].bandFreq.length - 1;
					}
				}
			}
			retData.curAntennaTypeIdex = antennaTypeIdex;
			retData.curUserBandIdex = tunerIdex;
			retData.data = [gWzdAntennaCfgData.Universal, gWzdAntennaCfgData.SingleCable, gWzdAntennaCfgData.JessSingleCable];
			infoData(retData);
		});
	},
	setData: function (param, fuc) {
		// console.log(this.getData(d));
		window.gSocket.send({
			"method": "mtk.webui.channelscan.dvbs.setAntennaTypeInfo",
			"params": param
		}, data => {
			// console.log(data);
			fuc(data);
		});
	}

}

var gWzdDvbsTKGSSelectTableData = {
	value: ["HD", "SD"],
	getData: function () {
		return this.value;
	}
}

var gWzdDvbsTricolorSelectTableData = {
	value: ["Mockвa +6 4.", "Mockвa +8 4."],
	getData: function () {
		return this.value;
	}
}

var gWzdDvbsFreeviewRegionPageData = {
	valueString: ['WZD_NZ_REGION_AUCKLAND', 'WZD_NZ_REGION_WAIKATO', 'WZD_NZ_REGION_CENTRAL', 'WZD_NZ_REGION_WELLINGTON', 'WZD_NZ_REGION_CHRISTCHURCH', 'WZD_NZ_REGION_DUNEDIN', 'WZD_NZ_REGION_ALL_FTA'],
	value: [],
	getData: function () {
		for (var i = 0; i < this.valueString.length; i++) {
			this.value[i] = mtvuiUtil.getLangString(this.valueString[i]);
		}
		return this.value;
	},
	setData: function (index) {

	}
}

var gWzdDvbsFransatBatPageData = {
	value: [],
	getData: function () {
		this.value = ['BAT1', 'BAT2'];
		return this.value;
	},
	setData: function () {

	}
}

// var gWzdDvbsSelectSatPageData = {
// 	value: [["1", "******", "Disable+Uncommit 1+Disable", "On"], ["2", "******", "Disable+Uncommit 1+Disable", "Off"], ["3", "******", "Disable+Uncommit 1+Disable", "Off"],
// 	["4", "******", "Disable+Uncommit 1+Disable", "Off"], ["5", "******", "Disable+Uncommit 1+Disable", "Off"], ["6", "******", "Disable+Uncommit 1+Disable", "Off"],
// 	["7", "******", "Disable+Uncommit 1+Disable", "Off"], ["8", "******", "Disable+Uncommit 1+Disable", "Off"], ["9", "******", "Disable+Uncommit 1+Disable", "Off"],
// 	["10", "******", "Disable+Uncommit 1+Disable", "Off"], ["11", "******", "Disable+Uncommit 1+Disable", "Off"], ["12", "******", "Disable+Uncommit 1+Disable", "Off"],
// 	["13", "******", "Disable+Uncommit 1+Disable", " Off"], ["14", "******", "Disable+Uncommit 1+Disable", "Off"], ["15", "******", "Disable+Uncommit 1+Disable", "Off"],
// 	["16", "******", "Disable+Uncommit 1+Disable", "Off"]],

// 	getData: function () {
// 		return this.value;
// 	}
// }

var gWzdSelectSatelliteList = {
	getData: function (method, type, fuc) {
		var keys = [];
		if (type == 0) {
			if (JSON.parse(localStorage.getItem("gWzdAllDefine")).APP_DVBS_DISEQC_IMPROVE == '1') {
				keys = ['SatelliteRecordID', 'Index', 'SatelliteName', 'Diseqc12Status', 'Diseqc11Status', 'Diseqc10Status', 'SatelliteStatus'];
			} else {
				keys = ['SatelliteRecordID', 'Index', 'SatelliteName', 'Diseqc10Status', 'SatelliteStatus'];
			}
		} else {
			keys = ['SatelliteRecordID', 'Index', 'SatelliteName', 'Position', 'SatelliteStatus'];
		}
		window.gSocket.send({
			"method": "mtk.webui.channelscan.dvbs.getSatelliteInfoList",
			"params": {
				"ScanMethod": method,
				"Keys": keys
			}
		}, data => {
			var arr = data.result.Satellites;
			for (var i in arr) {
				if (typeof arr[i].Diseqc12Status != 'undefined') {
					if (arr[i].Diseqc12Status == 5) {
						arr[i].Diseqc12Status = 'Motor';
					} else {
						arr[i].Diseqc12Status = 'Disable';
					}
				}
				if (typeof arr[i].Diseqc11Status != 'undefined') {
					if (arr[i].Diseqc11Status == 255) {
						arr[i].Diseqc11Status = 'Disable';
					} else {
						arr[i].Diseqc11Status = 'Uncommit ' + i;
					}
				}
				if (typeof arr[i].Diseqc10Status != 'undefined') {
					var Diseqc10 = ['A', 'B', 'C', 'D'];
					if (arr[i].Diseqc10Status == 255) {
						arr[i].Diseqc10Status = 'Disable';
					} else {
						arr[i].Diseqc10Status = Diseqc10[arr[i].Diseqc10Status];
					}
				}
				if (typeof arr[i].Position != 'undefined') {
					var position = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
					arr[i].Position = position[(arr[i].Position - 1)];
				}
				if (typeof arr[i].SatelliteStatus != 'undefined') {
					arr[i].SatelliteStatus = arr[i].SatelliteStatus & (1 << 13) ? 'On' : 'Off';
				}
			}
			data.result.Satellites = arr;
			fuc(data);
		});
	},
}
var gWzdPostCodePageData = {

	setPostCode: function (string) {
		//gSocket.send();
		var msg = {
			"method": "mtk.webui.config.setValue",
			"params": { "configId": "g_eas__lct_ct", "value": string, "apply": "true" }
		}
		window.gSocket.send(msg, function (data) {
		});
	}
}

var gWzdSambaData = {
	valueString: ['WZD_SAMBA_ENABLE', 'WZD_SAMBA_DISABLE'],
	value: [],
	getData: function () {
		for (var i = 0; i < this.valueString.length; i++) {
			this.value[i] = mtvuiUtil.getLangString(this.valueString[i]);
		}
		return this.value;
	},
	setSamba: function (index) {
		var msg = {
			"method": "mtk.webui.config.setValue",
			"params": { "configId": "g_misc__samba", "value": this.value[index], "apply": "true" }
		}
		window.gSocket.send(msg, function (data) {
		});
	}
}

var gWzdSatelliteTypePageData = {
	valueString: ['WZD_DVBS_PREFERRED_SATELLITE', 'WZD_DVBS_GENERAL_SATELLITE'],
	value: [],
	getData: function () {
		for (var i = 0; i < this.valueString.length; i++) {
			this.value[i] = mtvuiUtil.getLangString(this.valueString[i]);
		}
		return this.value;
	},
	setSatelliteType: function () {

	},
}

// var gWzdDvbsAntennaSetupData = {
// 	returnData: {
// 		satStatus: {
// 			"curIndex": 0,
// 			"data": ['On', 'Off']
// 		},
// 		lnbPower: {
// 			"curIndex": 0,
// 			"data": ['On', 'Off']
// 		},
// 		lnbPosition: {
// 			"curIndex": 0,
// 			"data": []
// 		},
// 		lnbFreq: {
// 			curIndex: 0,
// 			data: [
// 				{
// 					"value": 'Universal',
// 					"tone22k": false
// 				},
// 				{
// 					"value": '9750,10700',
// 					"tone22k": false
// 				},
// 				{
// 					"value": '9750,10750',
// 					"tone22k": false
// 				},
// 				{
// 					"value": '5150',
// 					"tone22k": true
// 				},
// 				{
// 					"value": '5750',
// 					"tone22k": true
// 				},
// 				{
// 					"value": '9750',
// 					"tone22k": true
// 				},
// 				{
// 					"value": '10600',
// 					"tone22k": true
// 				},
// 				{
// 					"value": '10750',
// 					"tone22k": true
// 				},
// 				{
// 					"value": '11250',
// 					"tone22k": true
// 				},
// 				{
// 					"value": '11300',
// 					"tone22k": true
// 				},
// 				{
// 					"value": '11475',
// 					"tone22k": true
// 				},
// 			]
// 		},
// 		disEqcSet: {
// 			"set10port": {
// 				"curIndex": 0,
// 				"data": ['Disabled', 'Diseqc A', 'Diseqc B', 'Diseqc C', 'Diseqc D']
// 			},
// 			"set11port": {
// 				"curIndex": 0,
// 				"data": ['Disabled', 'Uncommit 1', 'Uncommit 2', 'Uncommit 3', 'Uncommit 4',
// 					'Uncommit 5', 'Uncommit 6', 'Uncommit 7', 'Uncommit 8', 'Uncommit 9',
// 					'Uncommit 10', 'Uncommit 11', 'Uncommit 12', 'Uncommit 13', 'Uncommit 14',
// 					'Uncommit 15', 'Uncommit 16']
// 			},
// 			"setMotor": {
// 				"curIndex": 0,
// 				"data": ['Disabled', 'DiSEqC 1.2']
// 			},

// 		},
// 		Tone22k: {
// 			"curIndex": 0,
// 			"data": ['Off', 'On', 'Auto']
// 		},
// 		transponder: {
// 			"frequency": '',
// 			"SymbolRate": '',
// 			"pol": {
// 				"curIndex": 0,
// 				"data": ['Horizontal', 'Vertical', 'Left circle', 'Right circle']
// 			}
// 		},
// 	},
// 	freq: [//LNB_UNKNOW:0，LNB_SINGLE_FREQ:1，LNB_DUAL_FREQ:2
// 		{
// 			"LnbType": 2,
// 			"LowFrequency": "9750",
// 			"HighFrequency": "10600",
// 			"SwitchFrequency": "11700"
// 		},
// 		{
// 			"LnbType": 2,
// 			"LowFrequency": "9750",
// 			"HighFrequency": "10700",
// 			"SwitchFrequency": "11700"
// 		},
// 		{
// 			"LnbType": 2,
// 			"LowFrequency": "9750",
// 			"HighFrequency": "10750",
// 			"SwitchFrequency": "11700"
// 		},
// 		{
// 			"LnbType": 2,
// 			"LowFrequency": "5150",
// 			"HighFrequency": "0",
// 			"SwitchFrequency": "0"
// 		},
// 		{
// 			"LnbType": 1,
// 			"LowFrequency": "5750",
// 			"HighFrequency": "0",
// 			"SwitchFrequency": "0"
// 		},
// 		{
// 			"LnbType": 1,
// 			"LowFrequency": "9750",
// 			"HighFrequency": "0",
// 			"SwitchFrequency": "0"
// 		},
// 		{
// 			"LnbType": 1,
// 			"LowFrequency": "10600",
// 			"HighFrequency": "0",
// 			"SwitchFrequency": "0"
// 		},
// 		{
// 			"LnbType": 1,
// 			"LowFrequency": "10750",
// 			"HighFrequency": "0",
// 			"SwitchFrequency": "0"
// 		},
// 		{
// 			"LnbType": 1,
// 			"LowFrequency": "11250",
// 			"HighFrequency": "0",
// 			"SwitchFrequency": "0"
// 		},
// 		{
// 			"LnbType": 1,
// 			"LowFrequency": "11300",
// 			"HighFrequency": "0",
// 			"SwitchFrequency": "0"
// 		},
// 		{
// 			"LnbType": 1,
// 			"LowFrequency": "11475",
// 			"HighFrequency": "0",
// 			"SwitchFrequency": "0"
// 		},

// 	],
// 	getData: function (type, SatID, func) {
// 		var keys = [];
// 		var msg = {};
// 		if (type == 0) {
// 			keys = ['SatelliteStatus', 'LnbPower', 'LnbFrequency', 'Tone22KHz', 'Frequency', 'SymbolRate', 'Polarization', 'Diseqc10Port', 'Diseqc11Port', 'DiseqcMotor'];
// 		} else {
// 			keys = ['SatelliteStatus', 'LnbPosition', 'LnbFrequency', 'Frequency', 'SymbolRate', 'Polarization'];
// 		}
// 		msg = {
// 			"method": "mtk.webui.channelscan.dvbs.querySatelliteRecord",
// 			"params": {
// 				"SatelliteRecordID": SatID,
// 				"Keys": keys
// 			}

// 		};
// 		window.gSocket.send(msg, function (data) {
// 			var dataArr = data.result;
// 			console.log(data.error);
// 			if (typeof dataArr.SatelliteStatus != 'undefined') {
// 				gWzdDvbsAntennaSetupData.returnData.satStatus.curIndex = dataArr.SatelliteStatus & (1 << 13) ? 0 : 1;
// 			}
// 			if (typeof dataArr.LnbPower != 'undefined') {
// 				if (dataArr.LnbPower == 1) {
// 					gWzdDvbsAntennaSetupData.returnData.lnbPower.curIndex = 1;
// 				} else if (dataArr.LnbPower == 3) {
// 					gWzdDvbsAntennaSetupData.returnData.lnbPower.curIndex = 0;
// 				}
// 			}
// 			if (typeof dataArr.LnbFrequency != 'undefined') {
// 				for (var i in gWzdDvbsAntennaSetupData.freq) {
// 					if (dataArr.LnbFrequency.LnbType == gWzdDvbsAntennaSetupData.freq[i].LnbType &&
// 						dataArr.LnbFrequency.HighFrequency == gWzdDvbsAntennaSetupData.freq[i].HighFrequency &&
// 						dataArr.LnbFrequency.LowFrequency == gWzdDvbsAntennaSetupData.freq[i].LowFrequency) {
// 						gWzdDvbsAntennaSetupData.returnData.lnbFreq.curIndex = i;
// 					}
// 				}
// 			}
// 			if (typeof dataArr.Tone22KHz != 'undefined') {
// 				gWzdDvbsAntennaSetupData.returnData.Tone22k.curIndex = dataArr.Tone22KHz;
// 			}
// 			if (typeof dataArr.Diseqc10Port != 'undefined') {
// 				var temp;
// 				if (dataArr.Diseqc10Port == 255) {
// 					temp = 'Disabled';
// 				} else if (dataArr.Diseqc10Port == 0) {
// 					temp = 'Diseqc A';
// 				} else if (dataArr.Diseqc10Port == 1) {
// 					temp = 'Diseqc B';
// 				} else if (dataArr.Diseqc10Port == 2) {
// 					temp = 'Diseqc C';
// 				} else if (dataArr.Diseqc10Port == 3) {
// 					temp = 'Diseqc D';
// 				}
// 				for (var i in gWzdDvbsAntennaSetupData.returnData.disEqcSet.set10port.data) {
// 					if (temp == gWzdDvbsAntennaSetupData.returnData.disEqcSet.set10port.data[i]) {
// 						gWzdDvbsAntennaSetupData.returnData.disEqcSet.set10port.curIndex = i;
// 					}
// 				}

// 			}
// 			if (typeof dataArr.Diseqc11Port != 'undefined') {
// 				var tmp;
// 				if (dataArr.Diseqc11Port == 255) {
// 					tmp = 'Disabled';
// 				} else if (dataArr.Diseqc11Port == 0 || dataArr.Diseqc11Port == 1 || dataArr.Diseqc11Port == 2 || dataArr.Diseqc11Port == 3 ||
// 					dataArr.Diseqc11Port == 4 || dataArr.Diseqc11Port == 5 || dataArr.Diseqc11Port == 6 || dataArr.Diseqc11Port == 7 ||
// 					dataArr.Diseqc11Port == 8 || dataArr.Diseqc11Port == 9 || dataArr.Diseqc11Port == 10 || dataArr.Diseqc11Port == 11 ||
// 					dataArr.Diseqc11Port == 12 || dataArr.Diseqc11Port == 13 || dataArr.Diseqc11Port == 14 || dataArr.Diseqc11Port == 15) {
// 					tmp = `Uncommit ${dataArr.Diseqc11Port + 1}`;
// 				}
// 				for (var i in gWzdDvbsAntennaSetupData.returnData.disEqcSet.set11port.data) {
// 					if (tmp == gWzdDvbsAntennaSetupData.returnData.disEqcSet.set11port.data[i]) {
// 						gWzdDvbsAntennaSetupData.returnData.disEqcSet.set11port.curIndex = i;
// 					}
// 				}
// 			}
// 			if (typeof dataArr.DiseqcMotor != 'undefined') {
// 				var tp;
// 				if (dataArr.DiseqcMotor == 0) {
// 					tp = 'Disabled';
// 				} else if (dataArr.DiseqcMotor == 5) {
// 					tp = 'DiSEqC 1.2';
// 				}
// 				for (var i in gWzdDvbsAntennaSetupData.returnData.disEqcSet.setMotor.data) {
// 					if (tp == gWzdDvbsAntennaSetupData.returnData.disEqcSet.setMotor.data[i]) {
// 						gWzdDvbsAntennaSetupData.returnData.disEqcSet.setMotor.curIndex = i;
// 					}
// 				}
// 			}
// 			if (typeof dataArr.Polarization != 'undefined') {
// 				gWzdDvbsAntennaSetupData.returnData.transponder.frequency = dataArr.Frequency;
// 				gWzdDvbsAntennaSetupData.returnData.transponder.SymbolRate = dataArr.SymbolRate;
// 				gWzdDvbsAntennaSetupData.returnData.transponder.pol.curIndex = dataArr.Polarization - 1;
// 			}
// 			if (typeof dataArr.LnbPosition != 'undefined') {
// 				gWzdDvbsAntennaSetupData.returnData.lnbPosition.curIndex = dataArr.LnbPosition - 1;
// 				if (type == 1) {
// 					gWzdDvbsAntennaSetupData.returnData.lnbPosition.data = ['A', 'B'];
// 				} else if(type == 2){
// 					gWzdDvbsAntennaSetupData.returnData.lnbPosition.data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
// 				}
// 			}
// 			// gWzdDvbsAntennaSetupData.returnData = data.error;
// 			// console.log(gWzdDvbsAntennaSetupData.returnData);
// 			func(gWzdDvbsAntennaSetupData.returnData);
// 		});
// 	},
// }

var gWzdDvbsAntennaSetupData = {
	disEqcSet: {
		"set10port": {
			"curIndex": 0,
			"data": ['Disabled', 'Diseqc A', 'Diseqc B', 'Diseqc C', 'Diseqc D']
		},
		"set11port": {
			"curIndex": 0,
			"data": ['Disabled', 'Uncommit 1', 'Uncommit 2', 'Uncommit 3', 'Uncommit 4',
				'Uncommit 5', 'Uncommit 6', 'Uncommit 7', 'Uncommit 8', 'Uncommit 9',
				'Uncommit 10', 'Uncommit 11', 'Uncommit 12', 'Uncommit 13', 'Uncommit 14',
				'Uncommit 15', 'Uncommit 16']
		},
		"setMotor": {
			"curIndex": 0,
			"data": ['Disabled', 'DiSEqC 1.2']
		}
	},
	freq: [//LNB_UNKNOW:0，LNB_SINGLE_FREQ:1，LNB_DUAL_FREQ:2
		{
			"LnbType": 2,
			"LowFrequency": "9750",
			"HighFrequency": "10600",
			"SwitchFrequency": "11700"
		},
		{
			"LnbType": 2,
			"LowFrequency": "9750",
			"HighFrequency": "10700",
			"SwitchFrequency": "11700"
		},
		{
			"LnbType": 2,
			"LowFrequency": "9750",
			"HighFrequency": "10750",
			"SwitchFrequency": "11700"
		},
		{
			"LnbType": 2,
			"LowFrequency": "5150",
			"HighFrequency": "0",
			"SwitchFrequency": "0"
		},
		{
			"LnbType": 1,
			"LowFrequency": "5750",
			"HighFrequency": "0",
			"SwitchFrequency": "0"
		},
		{
			"LnbType": 1,
			"LowFrequency": "9750",
			"HighFrequency": "0",
			"SwitchFrequency": "0"
		},
		{
			"LnbType": 1,
			"LowFrequency": "10600",
			"HighFrequency": "0",
			"SwitchFrequency": "0"
		},
		{
			"LnbType": 1,
			"LowFrequency": "10750",
			"HighFrequency": "0",
			"SwitchFrequency": "0"
		},
		{
			"LnbType": 1,
			"LowFrequency": "11250",
			"HighFrequency": "0",
			"SwitchFrequency": "0"
		},
		{
			"LnbType": 1,
			"LowFrequency": "11300",
			"HighFrequency": "0",
			"SwitchFrequency": "0"
		},
		{
			"LnbType": 1,
			"LowFrequency": "11475",
			"HighFrequency": "0",
			"SwitchFrequency": "0"
		},

	],
	getData: function (type, SatID, func) {
		var keys = [];
		var msg = {};
		if (type == 0) {
			keys = ['SatelliteStatus', 'LnbPower', 'LnbFrequency', 'Tone22KHz', 'Frequency', 'SymbolRate', 'Polarization', 'Diseqc10Port', 'Diseqc11Port', 'DiseqcMotor'];
		} else {
			keys = ['SatelliteStatus', 'LnbPosition', 'LnbFrequency', 'Frequency', 'SymbolRate', 'Polarization'];
		}
		msg = {
			"method": "mtk.webui.channelscan.dvbs.querySatelliteRecord",
			"params": {
				"SatelliteRecordID": SatID,
				"Keys": keys
			}
		};
		window.gSocket.send(msg, function (data) {
			var dataArr = data.result;
			var returnData = {};
			if (typeof dataArr.SatelliteStatus != 'undefined') {
				var satStatus = {
					"curIndex": dataArr.SatelliteStatus & (1 << 13) ? 0 : 1,
					"data": ['On', 'Off']
				};
				returnData.satStatus = satStatus;
			}
			if (typeof dataArr.LnbPower != 'undefined') {
				var lnbPower = {
					"curIndex": 0,
					"data": ['On', 'Off']
				};
				if (dataArr.LnbPower == 1) {
					lnbPower.curIndex = 1;
				} else if (dataArr.LnbPower == 3) {
					lnbPower.curIndex = 0;
				}
				returnData.lnbPower = lnbPower
			}
			if (typeof dataArr.LnbFrequency != 'undefined') {
				var lnbFreq = {
					"curIndex": 0,
					"data": [
						{
							"value": 'Universal',
							"tone22k": false
						},
						{
							"value": '9750,10700',
							"tone22k": false
						},
						{
							"value": '9750,10750',
							"tone22k": false
						},
						{
							"value": '5150',
							"tone22k": true
						},
						{
							"value": '5750',
							"tone22k": true
						},
						{
							"value": '9750',
							"tone22k": true
						},
						{
							"value": '10600',
							"tone22k": true
						},
						{
							"value": '10750',
							"tone22k": true
						},
						{
							"value": '11250',
							"tone22k": true
						},
						{
							"value": '11300',
							"tone22k": true
						},
						{
							"value": '11475',
							"tone22k": true
						},
					]
				};
				for (var i in gWzdDvbsAntennaSetupData.freq) {
					if (dataArr.LnbFrequency.LnbType == gWzdDvbsAntennaSetupData.freq[i].LnbType &&
						dataArr.LnbFrequency.HighFrequency == gWzdDvbsAntennaSetupData.freq[i].HighFrequency &&
						dataArr.LnbFrequency.LowFrequency == gWzdDvbsAntennaSetupData.freq[i].LowFrequency) {
						lnbFreq.curIndex = i;
					}
				}
				returnData.lnbFreq = lnbFreq;
			}
			if (typeof dataArr.Tone22KHz != 'undefined') {
				var Tone22k = {
					"curIndex": dataArr.Tone22KHz,
					"data": ['Off', 'On', 'Auto']
				};
				returnData.Tone22k = Tone22k;
			}
			if (typeof dataArr.Diseqc10Port != 'undefined') {
				returnData.disEqcSet = gWzdDvbsAntennaSetupData.disEqcSet;
				var temp;
				if (dataArr.Diseqc10Port == 255) {
					temp = 'Disabled';
				} else if (dataArr.Diseqc10Port == 0) {
					temp = 'Diseqc A';
				} else if (dataArr.Diseqc10Port == 1) {
					temp = 'Diseqc B';
				} else if (dataArr.Diseqc10Port == 2) {
					temp = 'Diseqc C';
				} else if (dataArr.Diseqc10Port == 3) {
					temp = 'Diseqc D';
				}
				for (var i in gWzdDvbsAntennaSetupData.disEqcSet.set10port.data) {
					if (temp == gWzdDvbsAntennaSetupData.disEqcSet.set10port.data[i]) {
						gWzdDvbsAntennaSetupData.disEqcSet.set10port.curIndex = i;
					}
				}
				returnData.disEqcSet.set10port = gWzdDvbsAntennaSetupData.disEqcSet.set10port;
			}
			if (typeof dataArr.Diseqc11Port != 'undefined') {
				returnData.disEqcSet = gWzdDvbsAntennaSetupData.disEqcSet;
				var tmp;
				if (dataArr.Diseqc11Port == 255) {
					tmp = 'Disabled';
				} else if (dataArr.Diseqc11Port == 0 || dataArr.Diseqc11Port == 1 || dataArr.Diseqc11Port == 2 || dataArr.Diseqc11Port == 3 ||
					dataArr.Diseqc11Port == 4 || dataArr.Diseqc11Port == 5 || dataArr.Diseqc11Port == 6 || dataArr.Diseqc11Port == 7 ||
					dataArr.Diseqc11Port == 8 || dataArr.Diseqc11Port == 9 || dataArr.Diseqc11Port == 10 || dataArr.Diseqc11Port == 11 ||
					dataArr.Diseqc11Port == 12 || dataArr.Diseqc11Port == 13 || dataArr.Diseqc11Port == 14 || dataArr.Diseqc11Port == 15) {
					tmp = `Uncommit ${dataArr.Diseqc11Port + 1}`;
				}
				for (var i in gWzdDvbsAntennaSetupData.disEqcSet.set11port.data) {
					if (tmp == gWzdDvbsAntennaSetupData.disEqcSet.set11port.data[i]) {
						gWzdDvbsAntennaSetupData.disEqcSet.set11port.curIndex = i;
					}
				}
				returnData.disEqcSet.set11port = gWzdDvbsAntennaSetupData.disEqcSet.set11port;
			}
			if (typeof dataArr.DiseqcMotor != 'undefined') {
				returnData.disEqcSet = gWzdDvbsAntennaSetupData.disEqcSet;
				var tp;
				if (dataArr.DiseqcMotor == 0) {
					tp = 'Disabled';
				} else if (dataArr.DiseqcMotor == 5) {
					tp = 'DiSEqC 1.2';
				}
				for (var i in gWzdDvbsAntennaSetupData.disEqcSet.setMotor.data) {
					if (tp == gWzdDvbsAntennaSetupData.disEqcSet.setMotor.data[i]) {
						gWzdDvbsAntennaSetupData.disEqcSet.setMotor.curIndex = i;
					}
				}
				returnData.disEqcSet.setMotor = gWzdDvbsAntennaSetupData.disEqcSet.setMotor;
			}
			if (typeof dataArr.Polarization != 'undefined') {
				var transponder = {
					"frequency": dataArr.Frequency,
					"SymbolRate": dataArr.SymbolRate,
					"pol": {
						"curIndex": dataArr.Polarization - 1,
						"data": ['Horizontal', 'Vertical', 'Left circle', 'Right circle']
					}
				};
				returnData.transponder = transponder;
			}
			if (typeof dataArr.LnbPosition != 'undefined') {
				var lnbPosition = {
					"curIndex": dataArr.LnbPosition - 1,
					"data": []
				};
				if (type == 1) {
					lnbPosition.data = ['A', 'B'];
				} else if (type == 2) {
					lnbPosition.data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
				}
				returnData.lnbPosition = lnbPosition;
			}
			// console.log(returnData);
			func(returnData);
		});
	},
	setData: function (id, obj) {
		var value = obj;
		console.log(value);

		// window.gSocket.send({
		// 	"method": "mtk.webui.channelscan.dvbs.setSatelliteRecord",
		// 	"params":{
		// 		"SatelliteRecordID":id,
		// 		"Keys":value
		// 	}
		// },data=>{

		// });
	},
	getMotor: function (id, func) {
		var returndata = {
			"StorePosition": {
				curIndex: 0,
				data: []
			},
			"GotoPosition": {
				curIndex: 0,
				data: []
			}
		};
		var msg = {
			"method": "mtk.webui.channelscan.dvbs.querySatelliteRecord",
			"params": {
				"SatelliteRecordID": id,
				"Keys": ['StorePosition', 'GotoPosition']
			}
		};
		window.gSocket.send(msg, function (data) {
			var dataArr = data.result;
			if (JSON.parse(localStorage.getItem("gWzdAllDefine")).APP_DVBS_DISEQC_IMPROVE == '1') {
				var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
				returndata.StorePosition.data = arr;
				returndata.GotoPosition.data = arr;
			} else {
				var arr = [1, 2, 3, 4];
				returndata.StorePosition.data = arr;
				returndata.GotoPosition.data = arr;
			}
			if (dataArr.GotoPosition == 0 || dataArr.GotoPosition == 1 || dataArr.GotoPosition == 17) {
				returndata.StorePosition.curIndex = 0;
				returndata.GotoPosition.curIndex = 0;
			} else {
				returndata.StorePosition.curIndex = dataArr.StorePosition - 1;
				returndata.GotoPosition.curIndex = dataArr.GotoPosition - 1;
			}
			console.log(returndata);
			// console.log(returnData);
			func(returndata);
		});
	},
}

var gWzdDvbsNotOptDiSEqC3Data = {
	value: ['Nonstop', 'Step', 'Timeout'],
	getData: function () {
		return this.value;
	},
}
var gWzdDisableSambaData = {
	name: 'samba',
	value: ['Yes', 'No'],
}

var gWzdTimeZoneData = {
	valueString: ['WZD_TIMEZONE_USZ1', 'WZD_TIMEZONE_MSK', 'WZD_TIMEZONE_SAMT', 'WZD_TIMEZONE_YEKT', 'WZD_TIMEZONE_OMST', 'WZD_TIMEZONE_KRAT', 'WZD_TIMEZONE_IRKT', 'WZD_TIMEZONE_YAKT', 'WZD_TIMEZONE_VLAT', 'WZD_TIMEZONE_MAGT', 'WZD_TIMEZONE_PETT'],
	value: [],
	getData: function () {
		for (var i = 0; i < this.valueString.length; i++) {
			this.value[i] = mtvuiUtil.getLangString(this.valueString[i]);
		}
		return this.value;
	},
	setTineZone: function (index) {
		var msg = {
			"method": "mtk.webui.config.setValue",
			"params": { "configId": "g_time__time_zone", "value": this.value[index], "apply": "true" }
		};
		window.gSocket.send(msg, function (data) {
			console.log(data);
		});
	}
}

var gWzdParentPwdPageData = {
	setPwd: function (pwdStr) {
		// this.curIndex = index;
		var msg = {
			"method": "mtk.webui.config.setValue",
			"params": { "configId": "g_password__password", "value": pwdStr, "apply": "true" }
		};
		return msg;
	},
	setPwdCallback: function (data) {
		if (data.error.code == 0) {
			// this.curTuner = this.tunerData[this.curIndex];
			return true;
		} else {
			return false;
		}
	}
}

var gWzdChannelScanData = {
	valueString: ['WZD_SCAN_1', 'WZD_SCAN_2'],
	value: [],
	// value: [],
	getData: function () {
		for (var i = 0; i < this.valueString.length; i++) {
			this.value[i] = mtvuiUtil.getLangString(this.valueString[i]);
		}
		this.value = ['Scan', 'Skip Scan'];
		return this.value;
	},
}

var gWzdDvbtChannelScanProcessPageData = {
	//	analog: '',
	//	digtal: '',
	//	progressData: '',
	msg: {
		"method": "mtk.webui.channelscan.dvbt.startScan",
		"params": { "scanType": 1 },
	},
	//	window.gSocket.send(msg, function(data) {
	//		console.log(data);
	//	}),
}

var gWzdDvbtGetUIOperationData = {
	msg: {
		"method": "mtk.webui.channelscan.dvbt.getUIOperation",
	},
}

var gWzdDvbcChannelScanProcessPageData = {
	analog: null,
	digtal: null,
	progressData: null,
	msg: {
		"method": "mtk.webui.channelScan.dvbc.startScan",
		"params": {
			// "countryId": 'AUT',
			"scanType": 1,
			"nitMode": 0,
			// "nwId": null,
			// "startFreq": value,
			// "endFreq": value,
			// "cfgFlag": value,
			// "modulation": value,
			// "symRate": value,
			// "defSetting": false
		}
	},
}

var gWzdCancelScanData = {
	msg: {
		"method": "mtk.webui.channelScan.dvbc.cancelScan",
	},
}

var gWzdFavoriteNetworkPageData = {
	value: [],//["Oslo og Akershus", "Buskerud,Tele,Vestfold"],
	getData: function () {
		var msg = {
			"method": "mtk.webui.channelscan.dvbt.getUIOpFavNwk",
		};
		return msg;
	},
	getDataCallback: function (data) {
		if (data.error.code == 0) {
			this.value = data.result.List[0].networkName;
			return this.value;
		} else {
			this.value = null;
			return this.value;
		}
	},
	setData: function (index) {
		var msg = {
			"method": "mtk.webui.channelscan.dvbt.uiOpSetFavNwk",
			"params": { "index": index, "networkName": this.value[index] }
		};
		return msg;
	},
	setDataCallback: function (data) {
		if (data.error.code == 0) {
			// this.value = data.result.List[0].networkName;
			return true;
		} else {
			// this.value = null;
			return false;
		}
	}
}

var gWzdLcnConflictPageData = {
	value: {},
	getData: function () {
		var msg = {
			"method": "mtk.webui.channelscan.dvbt.getUIOpLcnConflictGroup",
		};
		return msg;
	},
	getDataCallback: function (data) {
		this.value = data.result.List;
		return this.value;
		// console.log(data);
		// var temp = 0;
		// var temp1 = 0;
		// var temp2 = 0;
		// console.log(data.result.List.length);
		// for (var i = 0; i < data.result.List.length; i++) {
		// 	if (data.result.List[i].groupIdx == 1) {
		// 		this.value.groupIdx[0] = data.result.List[i].groupIdx;
		// 		this.value.channelName[i] = data.result.List[i].channelName;
		// 		this.value.LCN[0] = data.result.List[i].LCN;
		// 		temp++;
		// 	} else if (data.result.List[i].groupIdx == 2) {
		// 		this.value.groupIdx[1] = data.result.List[i].groupIdx;
		// 		this.value.channelName[i] = data.result.List[i].channelName;
		// 		this.value.LCN[1] = data.result.List[i].LCN;
		// 		temp1++;
		// 	} else if (data.result.List[i].groupIdx == 3) {
		// 		this.value.groupIdx[2] = data.result.List[i].groupIdx;
		// 		this.value.channelName[i] = data.result.List[i].channelName;
		// 		this.value.LCN[2] = data.result.List[i].LCN;
		// 		temp2++;
		// 	}
		// }
		// console.log(this.value);
		// console.log("temp=" + temp);
		// console.log("temp1=" + temp1);
		// console.log("temp2=" + temp);
		// // if(data.result.List[9].groupIdx = 1)

		// // if (data.result.List[0].channelName.length != 0) {
		// // 	this.value = data.result.List[0].channelName;
		// // 	return this.value;
		// // } else {
		// // 	this.value = null;
		// return this.value;
		// }
	},
	setData: function (curGropIdx, curLcn, curChannelName) {
		// console.log(this.value[index] );
		// var tmp = 0;
		// for(var i; i<this.value;i++){
		// 	if(this.value[i].groupIdx == curGropIdx && this.value[i].LCN == curLcn){
		// 		tmp = i;
		// 	}
		// }
		// console.log(this.value[tmp].channelName);
		var msg = {
			"method": "mtk.webui.channelscan.dvbt.setUIOpLcnConflictGroup",
			"params": { "groupIdx": curGropIdx, "LCN": curLcn, "channelName": curChannelName }
		};
		return msg;
	},
	setDataCallback: function (data) {
		if (data.error.code == 0) {
			// this.value = data.result.List[0].networkName;
			return true;
		} else {
			// this.value = null;
			return false;
		}
	}
	// getData: function () {
	// 	console.log("11111111111111111111111");
	// 	var msg = {
	// 		"method": "mtk.webui.channelscan.dvbt.getUIOpLcnConflictGroup",
	// 	};
	// 	window.gSocket.send(msg, function (data) {
	// 		console.log(data.result.List.channelName);
	// 		this.value = data.result.List.channelName;
	// 		console.log(this.value);
	// 		return this.value;
	// 	});

	// },
	// setUIOpLcnConflictGroup: function (index) {
	// 	var msg = {
	// 		"method": "mtk.webui.channelscan.dvbt.setUIOpLcnConflictGroup",
	// 		"params": {
	// 			"groupIdx": value,
	// 			"LCN": value,
	// 			"channelName": string,
	// 		}

	// 	};
	// 	window.gSocket.send(msg, function (data) {
	// 		console.log(data);

	// 	});
	// }


}

var gWzdTargetReigonPageData = {
	value: {},
	level1Data: [],//Region1 data
	level2Data: [],//Region2 data
	level3Data: [],//Region3 data
	getData: function () {
		var msg = {
			"method": "mtk.webui.channelscan.dvbt.getUIOpTargetRegion",
		};
		return msg;
	},
	getDataCallback: function (data) {
		var temp = data.result.List;
		var level1 = [];
		var level2 = [];
		var level3 = [];

		for (var i = 0; i < temp.length; i++) {
			if (temp[i].level == 1) {
				level1.push(temp[i]);
			} else if (temp[i].level == 2) {
				level2.push(temp[i]);
			} else if (temp[i].level == 3) {
				level3.push(temp[i]);
			}
		}
		this.level1Data = level1;
		this.level2Data = level2;
		this.level3Data = level3;

		var objArry = [];
		for (var i = 0; i < level1.length; i++) {
			var obj = {};
			obj.internalIdx = level1[i].internalIdx;
			obj.name = level1[i].name;
			obj.level = [];
			for (var j = 0; j < level2.length; j++) {
				if (level1[i].primary == level2[j].primary) {
					var obj2 = {};
					obj2.internalIdx = level2[j].internalIdx;
					obj2.name = level2[j].name;
					obj2.level = [];
					for (var k = 0; k < level3.length; k++) {
						if (level1[i].primary == level3[k].primary && level2[j].secondary == level3[k].secondary) {
							var obj3 = {};
							obj3.internalIdx = level3[k].internalIdx;
							obj3.name = level3[k].name;
							obj2.level.push(obj3);
						}

					}
					obj.level.push(obj2);
				}

			}

			objArry.push(obj);
		}
		this.value = objArry;
		return this.value;
	},
	setData: function (regionInternalIdx1, regionInternalIdx2, regionInternalIdx3) {
		var msg = {
			"method": "mtk.webui.channelscan.dvbt.setUIOpTargetRegion",
			"params": {
				"internalIdx": "value",
				"level": "value",
				"primary": "value",
				"secondary": "value",
				"tertiary": "value",
				"name": "string"
			}
		};
		if (regionInternalIdx3 == 0) {
			if (regionInternalIdx2 == 0) {
				for (var i = 0; i < this.level1Data.length; i++) {
					if (this.level1Data[i].internalIdx == regionInternalIdx1) {
						msg.params.internalIdx = regionInternalIdx1;
						msg.params.level = this.level1Data[i].level;
						msg.params.primary = this.level1Data[i].primary;
						msg.params.secondary = this.level1Data[i].secondary;
						msg.params.tertiary = this.level1Data[i].tertiary;
						msg.params.name = this.level1Data[i].name;
					}
				}
			} else {
				for (var i = 0; i < this.level2Data.length; i++) {
					if (this.level2Data[i].internalIdx == regionInternalIdx2) {
						msg.params.internalIdx = regionInternalIdx2;
						msg.params.level = this.level2Data[i].level;
						msg.params.primary = this.level2Data[i].primary;
						msg.params.secondary = this.level2Data[i].secondary;
						msg.params.tertiary = this.level2Data[i].tertiary;
						msg.params.name = this.level2Data[i].name;
					}
				}
			}
		} else {
			for (var i = 0; i < this.level3Data.length; i++) {
				if (this.level3Data[i].internalIdx == regionInternalIdx3) {
					msg.params.internalIdx = regionInternalIdx3;
					msg.params.level = this.level3Data[i].level;
					msg.params.primary = this.level3Data[i].primary;
					msg.params.secondary = this.level3Data[i].secondary;
					msg.params.tertiary = this.level3Data[i].tertiary;
					msg.params.name = this.level3Data[i].name;
				}
			}
		}
		return msg;
	},
	setDataCallback: function (data) {
		if (data.error.code == 0) {
			return true;
		} else {
			return false;
		}
	}
}

var gWzdDvbcInfoPageData = {
	value: null,
	curSymRate: null,
	curModulation: null,
	"SWE": {
		"Comhem": {
			"scanMode": ['Advance'],
			"freq": ['362000'],
			"netWorkId": ['41001']
		},
		"Canal Digital": {
			"scanMode": ['Advance', 'Full'],
			"freq": ['362000', 'disable'],
			"netWorkId": ['AUTO', 'disable']
		},
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['362000', 'disable', 'disable'],
			"netWorkId": ['41001', 'AUTO', 'disable']
		}
	},
	"DNK": {
		"Stofa": {
			"scanMode": ['Advance'],
			"freq": ['346000'],
			"netWorkId": ['AUTO']
		},
		"Yousee": {
			"scanMode": ['Advance'],
			"freq": ['143000'],
			"netWorkId": ['999']
		},
		"Canal Digital": {
			"scanMode": ['Advance', 'Full'],
			"freq": ['306000', 'disable'],
			"netWorkId": ['AUTO', 'disable']
		},
		"Glenten": {
			"scanMode": ['Full', 'Quick'],
			"freq": ['disable', '226000'],
			"netWorkId": ['disable', '1']
		},
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['143000', 'disable', 'disable'],
			"netWorkId": ['999', 'AUTO', 'disable']
		}
	},
	"NLD": {
		"UPC": {
			"scanMode": 'Advance',
			"freq": [],
			"netWorkId": []
		},
		"Ziggo": {
			"scanMode": 'Advance',
			"freq": ['474000'],
			"netWorkId": ['5555']
		},
		"Others": {
			"scanMode": ['Advance'],
			"freq": ['372000'],
			"netWorkId": ['5555']
		}
	},
	"CHE": {
		"UPC": {
			"scanMode": ['Advance'],
			"freq": [],
			"netWorkId": []
		},
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['306000', 'disable', 'disable'],
			"netWorkId": ['999', 'AUTO', 'disable']
		}
	},
	"AUT": {
		"UPC": {
			"scanMode": ['Advance'],
			"freq": [],
			"netWorkId": []
		},
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['306000', 'disable', 'disable'],
			"netWorkId": ['999', 'AUTO', 'disable']
		}
	},
	"HUN": {
		"UPC": {
			"scanMode": ['Advance'],
			"freq": [],
			"netWorkId": []
		},
		"DIGI": {
			"scanMode": ['Quick'],
			"freq": ['322000'],
			"netWorkId": ['AUTO']
		},
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['306000', 'disable', 'disable'],
			"netWorkId": ['999', 'AUTO', 'disable']
		}
	},
	"POL": {
		"UPC": {
			"scanMode": ['Advance'],
			"freq": [],
			"netWorkId": []
		},
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['306000', 'disable', 'disable'],
			"netWorkId": ['999', 'AUTO', 'disable']
		}
	},
	"ROU": {
		"UPC": {
			"scanMode": ['Advance'],
			"freq": [],
			"netWorkId": []
		},
		"DIGI": {
			"scanMode": ['Quick'],
			"freq": ['322000'],
			"netWorkId": ['AUTO']
		},
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['306000', 'disable', 'disable'],
			"netWorkId": ['999', 'AUTO', 'disable']
		}
	},
	"IRL": {
		"UPC": {
			"scanMode": ['Advance'],
			"freq": [],
			"netWorkId": []
		},
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['306000', 'disable', 'disable'],
			"netWorkId": ['999', 'AUTO', 'disable']
		}
	},
	"FIN": {
		"Canal Digital": {
			"scanMode": ['Advance', 'Full'],
			"freq": ['114000', 'disable'],
			"netWorkId": ['AUTO', 'disable']
		},
		"Others": {
			"scanMode": ['Quick', 'Full'],
			"freq": ['disable', 'disable'],
			"netWorkId": ['AUTO', 'disable']
		}
	},
	"NOR": {
		"Canal Digital": {
			"scanMode": ['Advance', 'Full'],
			"freq": ['306000', 'disable'],
			"netWorkId": ['AUTO', 'disable']
		}
	},
	"DEU": {
		"UnityMedia": {
			"scanMode": ['Quick'],
			"freq": ['disable'],
			"netWorkId": ['AUTO']
		},
		"Telecolumbus": {
			"scanMode": ['FULL', 'Quick'],
			"freq": ['disable', '330000'],
			"netWorkId": ['disable', 'AUTO']
		},
		"Others": {
			"scanMode": ['Quick', 'Full'],
			"freq": ['disable', 'disable'],
			"netWorkId": ['AUTO', 'disable']
		}
	},
	"FRA": {
		"Numericable": {
			"scanMode": 'Advance',
			"freq": [],
			"netWorkId": []
		},
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['306000', 'disable', 'disable'],
			"netWorkId": ['999', 'AUTO', 'disable']
		}
	},
	"BEL": {
		"Telenet": {
			"scanMode": ['Advance'],
			"freq": ['322000'],
			"netWorkId": ['22']
		},
		"VOO": {
			"scanMode": ['Advance'],
			"freq": ['330000'],
			"netWorkId": ['0000']
		},
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['306000', 'disable', 'disable'],
			"netWorkId": ['999', 'AUTO', 'disable']
		}
	},
	"OtherCty": {
		"Others": {
			"scanMode": ['Advance', 'Quick', 'Full'],
			"freq": ['306000', 'disable', 'disable'],
			"netWorkId": ['999', 'AUTO', 'disable']
		}
	},
	tunerModulation: [
		'UNKNOWN',// { "MOD_UNKNOWN": 'UNKNOWN' },
		'8PSK',// { "MOD_PSK_8": '8PSK' },
		'8VSB',// { "MOD_VSB_8": '8VSB' },
		'16VSB',// { "MOD_VSB_16": '16VSB' },
		'16QAM',// { "MOD_QAM_16": '16QAM' },
		'32QAM',// { "MOD_QAM_32": '32QAM' },
		'64QAM',// { "MOD_QAM_64": '64QAM' },
		'80QAM',// { "MOD_QAM_80": '80QAM' },
		'96QAM',// { "MOD_QAM_96": '96QAM' },
		'112QAM',// { "MOD_QAM_112": '112QAM' },
		'128QAM',// { "MOD_QAM_128": '128QAM' },
		'160QAM',// { "MOD_QAM_160": '160QAM' },
		'192QAM',// { "MOD_QAM_192": '192QAM' },
		'224QAM',// { "MOD_QAM_224": '224QAM' },
		'256QAM',// { "MOD_QAM_256": '256QAM' },
		'320QAM',// { "MOD_QAM_320": '320QAM' },
		'384QAM',// { "MOD_QAM_384": '384QAM' },
		'448QAM',// { "MOD_QAM_448": '448QAM' },
		'512QAM',// { "MOD_QAM_512": '512QAM' },
		'640QAM',// { "MOD_QAM_640": '640QAM' },
		'768QAM',// { "MOD_QAM_768": '768QAM' },
		'896QAM',// { "MOD_QAM_896": '896QAM' },
		'1024QAM',// { "MOD_QAM_1024": '1024QAM' },
		'QPSK',// { "MOD_QPSK": 'QPSK' },
		'OQPSK',// { "MOD_OQPSK": 'OQPSK' },
		'BPSK',// { "MOD_BPSK": 'BPSK' },
		'VSB_AM',// { "MOD_VSB_AM": 'VSB_AM' },
		'4NRQAM',// { "MOD_QAM_4_NR": '4NRQAM' },
		'FM_RADIO'// { "MOD_FM_RADIO": 'FM_RADIO' }
	],
	getData: function (cty, optData) {
		if (optData == null) {
			this.value = this.OtherCty.Others;
		} else {
			this.value = this[cty][optData];
		}
		return this.value;
	},
	getSymRateData: function (func) {
		var returnData = {};
		var msg = {
			"method": "mtk.webui.channelScan.dvbc.queryScanParametes",
		};

		window.gSocket.send(msg, function (data) {
			// console.log(data);
			if (data.result.modulation < 0 || data.result.modulation > gWzdDvbcInfoPageData.tunerModulation.length - 1) {
				returnData.modulation = 'AUTO';
			} else {
				returnData.modulation = gWzdDvbcInfoPageData.tunerModulation[data.result.modulation];
			}
			if (typeof data.result.symRate != 'undefined') {
				returnData.symRate = data.result.symRate / 1000;
			} else {
				returnData.symRate = 'AUTO';
			}

			// this.value.curSymRate = data.result.symRate;
			// this.value.modulation = data.result.modulation;
			func(returnData);
		});
	},
	getSymRateCallback: function (data) {
		// console.log(data);
		if (data.result.code == 0) {

			// console.log(this.value);
			return data;
		} else {
			return false;
		}

	}


}