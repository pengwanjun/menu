// 引入WebSocket模块
var ws = require('nodejs-websocket')
var PORT = 3000;
var testData = {};
 testData['org.mtk.webview.video.query.picmode'] = {"method":"org.mtk.webview.video.query.picmode","result":{"List":{"0":"User","1":"Cinema","2":"Sport","3":"Vivid","4":"Hi-Bright"},"val":"0","disable":"true","hide":"false"},"error":{"code":"0","message":"OK"},"id":3};

var inputListObj = {
	"method": "mtk.webui.input.querySourceInfo",
	"result": {
		"List":[
				{"name":"TV","index":"0","block":"true","skip":"true","cowork":[0,1,4],"exclusion":[7, 6,3 ]},
	            {"name":"Composite","index":"1","block":"true" , "skip":"true", "cowork":[0,1,4], "exclusion":[7, 6,3 ]},
	            {"name":"Component","index":"2","block":"true" , "skip":"true", "cowork":[0,1,4], "exclusion":[7, 6,3 ]},
	            {"name":"HDMI1","index":"3","block":"true" , "skip":"true", "cowork":[0,1,4], "exclusion":[7, 6,3 ]},
	            {"name":"HDMI2","index":"4","block":"true" , "skip":"true", "cowork":[0,1,4], "exclusion":[7, 6,3 ]},
	            {"name":"HDMI3","index":"5","block":"true" , "skip":"true", "cowork":[0,1,4], "exclusion":[7, 6,3 ]},
	            {"name":"HDMI4","index":"6","block":"true" , "skip":"true", "cowork":[0,1,4], "exclusion":[7, 6,3 ]}
	           ],
	    "curMainVal":"0", 
	    "curSubVal":"0", 
	},
	"error":{"code":"0", "message":"OK"}
};
testData['mtk.webui.input.querySourceInfo']= inputListObj;

testData['mtk.webui.input.skipSource']= {
	"method": "mtk.webui.input.skipSource",
	"error":{"code":"0", "message":"OK"}
};
testData['mtk.webui.input.blockSource']= {
	"method": "mtk.webui.input.blockSource",
	"error":{"code":"0", "message":"OK"}
};

var channelList={
	"method": "mtk.webui.channelList.queryChannelList",
	"result": {
		"List":[{"majorNum":'9',
					"svlRecId": "0",
	                  "channelId":"0",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'12',
					"svlRecId": "1",
	                  "channelId":"1",
	                  "nwMask":"256", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1b",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
				{"majorNum":'13',
					"svlRecId": "2",
	                  "channelId":"2",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'14',
					"svlRecId": "3",
	                  "channelId":"3",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'16',
					"svlRecId": "4",
	                  "channelId":"4",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'18',
					"svlRecId": "5",
	                  "channelId":"5",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'24',
					"svlRecId": "6",
	                  "channelId":"6",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'35',
					"svlRecId": "7",
	                  "channelId":"7",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'37',
					"svlRecId": "8",
	                  "channelId":"8",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'48',
					"svlRecId": "9",
	                  "channelId":"9",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'55',
					"svlRecId": "10",
	                  "channelId":"10",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'101',
					"svlRecId": "11",
	                  "channelId":"11",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'112',
					"svlRecId": "12",
	                  "channelId":"12",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'137',
					"svlRecId": "13",
	                  "channelId":"13",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'145',
					"svlRecId": "14",
	                  "channelId":"14",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'166',
					"svlRecId": "15",
	                  "channelId":"15",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'167',
					"svlRecId": "16",
	                  "channelId":"16",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'168',
					"svlRecId": "17",
	                  "channelId":"17",
	                  "nwMask":"2", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            },
	            {"majorNum":'169',
					"svlRecId": "18",
	                  "channelId":"18",
	                  "nwMask":"256", 
	                  "OptionMask":"3",
	                  "Option2Mask":"",
	                  "progId":"",
	                  "tslRecId":"",
	                  "nwlRecId":"",
	                  "satlRecId":"",
	                  "brdcstType":"Digital",
	                  "servType":"",
	                  "acName":"BBC RD AD test1a",
	                  "favoriteId":"",
	                  "bcstMedium":"2",
	                  "nwId":"3",
	                  "onId":"",
	                  "tsId":"",
	                  "freq":"",
	                  "eMod":"",
	                  "actualFreq":"",
	                  "nwName":""
	            }
		]
	},
	"error":{"code":"0", "message":"OK"}
};
testData['mtk.webui.channelList.queryChannelList']= channelList;
testData['mtk.webui.channelList.setSvlTslRec']= {
	"method": "mtk.webui.channelList.setSvlTslRec",
	"error":{"code":"0", "message":"OK"}
}
testData['mtk.webui.channelList.swapChannels']={
	"method": "mtk.webui.channelList.swapChannels",
	"error":{"code":"0", "message":"OK"}
}
testData['mtk.webui.channelList.cleanChannellist']={
	"method":"mtk.webui.channelList.cleanChannellist",
	"error":{"code":"0", "message":"OK"}
}
var internetConnection={"enable":"true"};
testData['mtk.webui.network.queryInternetConnection']={
	"method":"mtk.webui.network.queryInternetConnection",
	"result":internetConnection,
	"error":{"code":"0", "message":"OK"}
}
testData['mtk.webui.network.setInternetConnection']={
	"method":"mtk.webui.network.setInternetConnection",
	"error":{"code":"0", "message":"OK"}
}
var interFace={"type":"etherent"};//"wireless"
testData['mtk.webui.network.queryInternetInterface']={
	"method":"mtk.webui.network.queryInternetInterface",
	"result":interFace,
	"error":{"code":"0", "message":"OK"}
}
testData['mtk.webui.network.setInternetInterface']={
	"method":"mtk.webui.network.setInternetInterface",
	"error":{"code":"0", "message":"OK"}
}
var ipInformation={"ip":"192.168.1.100",
	          "netmask":"255.255.255.0",
	          "gateway":"192.168.1.1",
	          "1stDNS":"192.168.1.1",
	          "2ndDNS":"192.168.1.1"
	          }
testData['mtk.webui.network.queryInternetInformation']={
	"method":"mtk.webui.network.queryInternetInformation",
	"result":ipInformation,
	"error":{"code":"0", "message":"OK"}
}
var addrType={"type":"auto"};
testData['mtk.webui.network.queryAddressType']={
	"method":"mtk.webui.network.queryAddressType",
	"result":addrType,
	"error":{"code":"0", "message":"OK"}
}
testData['mtk.webui.network.setAddressType']={
	"method":"mtk.webui.network.setAddressType",
	"error":{"code":"0", "message":"OK"}
}
var ipv6Information={"ipv6":"fe80::23ef",
	"lenOfPrefix":64,
	"gateway":"fe80::23ef",
	"1stDNS":"fe80::23ef",
	"2ndDNS":""
	};
testData['mtk.webui.network.queryIPv6Information']={
	"method":"mtk.webui.network.queryIPv6Information",
	"result":ipv6Information,
	"error":{"code":"0", "message":"OK"}
}
var ipv6AddrType={"type":"auto"};
testData['mtk.webui.network.queryIPv6AddressType']={
	"method":"mtk.webui.network.queryIPv6AddressType",
	"result":ipv6AddrType,
	"error":{"code":"0", "message":"OK"}
}
testData['mtk.webui.network.setIPv6AddressType']={
	"method":"mtk.webui.network.setIPv6AddressType",
	"error":{"code":"0", "message":"OK"}
}
var ipv6DNSType={"type":"auto"};
testData['mtk.webui.network.queryIPv6DNSType']={
	"method":"mtk.webui.network.queryIPv6DNSType",
	"result":ipv6DNSType,
	"error":{"code":"0", "message":"OK"}
}
testData["mtk.webui.network.setIPv6DNSType"]={
	"method":"mtk.webui.network.setIPv6DNSType",
	"error":{"code":"0", "message":"OK"}
}
testData['mtk.webui.network.queryConnectionTest']={
	"method":"mtk.webui.network.queryConnectionTest",
	"error":{"code":"0", "message":"OK"}
}
testData['mtk.webui.network.queryIPv6ConnectionTest']={
	"method":"mtk.webui.network.queryIPv6ConnectionTest",
	"error":{"code":"0", "message":"OK"}
}



var configObj = {
	"g_disp__disp_back_light":{"configId":'g_disp__disp_back_light',"min":0, "max":100, "current":90},
	"g_video__brightness":{"configId":'g_video__brightness',"min":0, "max":100, "current":46},
	"g_video__contrast":{"configId":'g_video__contrast',"min":0, "max":100, "current":66},
	"g_video__vid_hue":{"configId":'g_video__vid_hue',"min":-50, "max":50, "current":-23},
	"g_audio__spdif_delay":{"configId":'g_audio__spdif_delay',"min":0, "max":250, "current":155},
	"g_video__clr_gain_r":{"configId":'g_video__clr_gain_r',"min":-20, "max":20, "current":1},
	"g_video__clr_gain_g":{"configId":'g_video__clr_gain_r',"min":-20, "max":20, "current":8},
	"g_video__clr_gain_b":{"configId":'g_video__clr_gain_b',"min":-20, "max":20, "current":11},
	"g_video__picture_mode":{"configId":'g_video__picture_mode',"min":0, "max":4, "current":1},
	"g_disp__disp_gamma":{"configId":'g_video__picture_mode',"min":1, "max":3, "current":1},
	"g_video__vid_nr":{"configId":'g_video__vid_nr',"min":0, "max":4, "current":0},
	"g_video__vid_mpeg_nr":{"configId":'g_video__vid_mpeg_nr',"min":0, "max":3, "current":0},
	"g_video__vid_luma":{"configId":'g_video__vid_luma',"min":0, "max":3, "current":0},
	"g_video__vid_flash_tone":{"configId":'g_video__vid_flash_tone',"min":0, "max":3, "current":0},
	"g_video__vid_di_film_mode":{"configId":'g_video__vid_di_film_mode',"min":0, "max":1, "current":0},
	"g_video__vid_blue_stretch":{"configId":'g_video__vid_blue_stretch',"min":0, "max":1, "current":0},
	"g_video__vid_game_mode":{"configId":'g_video__vid_game_mode',"min":0, "max":1, "current":0},
	"g_video__vid_mjc_effect":{"configId":'g_video__vid_mjc_effect',"min":0, "max":3, "current":0},
	"g_video__vid_mjc_demo":{"configId":'g_video__vid_mjc_demo',"min":0, "max":2, "current":1},
	"g_video__vid_blue_light":{"configId":'g_video__vid_blue_light',"min":0, "max":100, "current":99},
	"g_video__clr_temp":{"configId":'g_video__clr_temp',"min":0, "max":3, "current":0},
	"g_video__vid_super_resolution":{"configId":'g_video__vid_super_resolution',"min":0, "max":1, "current":0},
	"g_video__vid_black_bar_detect":{"configId":'g_video__vid_black_bar_detect',"min":0, "max":1, "current":0},
	"g_video__vid_hdr":{"configId":'g_video__vid_hdr',"min":0, "max":1, "current":1},
	"g_video__vid_sat":{"configId":'g_video__vid_sat',"min":0, "max":100, "current":1},
	"g_video__vid_shp":{"configId":'g_video__vid_shp',"min":0, "max":20, "current":11},
	"g_audio__aud_ad_speaker":{"configId":'g_audio__aud_ad_speaker',"min":0, "max":1, "current":1},
	"g_audio__spdif":{"configId":'g_audio__spdif',"min":0, "max":3, "current":1},
	"g_audio__aud_type":{"configId":'g_audio__aud_type',"current":0},
	"g_audio__dolby_audio_processing":{"configId":'g_audio__dolby_audio_processing',"min":0, "max":1, "current":0},
	"g_audio__dolby_sound_mode":{"configId":'g_audio__dolby_sound_mode',"min":0, "max":6, "current":0},
	"g_audio__volume_leveler":{"configId":'g_audio__volume_leveler',"min":0, "max":1, "current":0},
	"g_audio__dialogue_enhancer":{"configId":'g_audio__dialogue_enhancer',"min":0, "max":3, "current":0},
	"g_audio__speaker_virtualizer":{"configId":'g_audio__speaker_virtualizer',"min":0, "max":2, "current":0},
	"g_audio__dolby_dmix":{"configId":'g_audio__dolby_dmix',"current":0},
	"g_audio__aud_balance":{"configId":'g_audio__aud_balance',"min":-50, "max":50,"current":-11},
	"g_audio__aud_bass":{"configId":'g_audio__aud_bass',"min":0, "max":100,"current":11},
	"g_audio__aud_treble":{"configId":'g_audio__aud_treble',"min":0, "max":100,"current":51},
	"g_audio__aud_surround":{"configId":'g_audio__aud_surround',"min":0, "max":1,"current":1},
	"g_audio__aud_equalizer":{"configId":'g_audio__aud_equalizer',"min":0, "max":7,"current":1},
	"g_rating__rating_age":{"configId":'g_rating__rating_age',"min":0, "max":16,"current":1},
	"g_video__dovi_user_swicth":{"configId":'g_video__dovi_user_swicth',"min":0, "max":1,"current":1},
	"g_audio__aud_ad_fade_pan":{"configId":'g_audio__aud_ad_fade_pan',"min":0, "max":1,"current":1},
	"g_audio__aud_ad_hdphone":{"configId":'g_audio__aud_ad_hdphone',"min":0, "max":1,"current":1},
	"g_audio__aud_out_port":{"configId":'g_audio__aud_out_port',"min":0, "max":1,"current":1},
	"g_audio__agc":{"configId":'g_audio__agc',"min":0, "max":1,"current":1},
	"g_audio__aud_ad_volume":{"configId":'g_audio__aud_ad_volume',"min":0, "max":100,"current":41},
	"g_video__vid_blue_mute":{"configId":'g_video__vid_blue_mute',"min":0, "max":1,"current":0},
	"g_menu__fast_boot":{"configId":'g_menu__fast_boot',"min":0, "max":1,"current":1},
	"g_misc__mheg_inter_ch":{"configId":'g_misc__mheg_inter_ch',"min":0, "max":1,"current":0},
	"g_misc__mheg_pin_protection":{"configId":'g_misc__mheg_pin_protection',"min":0, "max":1,"current":1},
	"g_menu__hbbtv":{"configId":'g_menu__hbbtv',"min":0, "max":1,"current":1},
	"g_menu_only__hdmi_edid_index":{"configId":'g_menu_only__hdmi_edid_index',"min":0, "max":1,"current":1},
	"g_subtitle__subtitle_enable":{"configId":'g_subtitle__subtitle_enable',"min":0, "max":1,"current":1},
	"g_subtitle__subtitle_attr":{"configId":'g_subtitle__subtitle_attr',"min":0, "max":1,"current":1},
	"g_ttx_lang__ttx_decode_lang":{"configId":'g_ttx_lang__ttx_decode_lang',"min":0, "max":9,"current":1},
	"g_ttx_lang__ttx_presentation_level":{"configId":'g_ttx_lang__ttx_presentation_level',"min":0, "max":1,"current":0},
	"g_record__rec_tshift_mode":{"configId":'g_record__rec_tshift_mode',"min":0, "max":1,"current":1},
	"g_menu__auto_ch_update":{"configId":'g_menu__auto_ch_update',"min":0, "max":1,"current":0},
	"g_menu__ch_update_msg":{"configId":'g_menu__ch_update_msg',"min":0, "max":1,"current":0},
	"g_menu__hbbtv_donot_track":{"configId":'g_menu__hbbtv_donot_track',"min":0, "max":2,"current":0},
	"g_menu__hbbtv_cookies":{"configId":'g_menu__hbbtv_cookies',"min":0, "max":2,"current":0},
	"g_menu__hbbtv_persistent_storage":{"configId":'g_menu__hbbtv_persistent_storage',"min":0, "max":1,"current":0},
	"g_menu__hbbtv_blk_tracking_sites":{"configId":'g_menu__hbbtv_blk_tracking_sites',"min":0, "max":1,"current":0},
	"g_menu__hbbtv_device_id":{"configId":'g_menu__hbbtv_device_id',"min":0, "max":1,"current":0},
};


// on就是addListener，添加一个监听事件调用回调函数
// Scream server example:"hi"->"HI!!!",服务器把字母大写
var server = ws.createServer(function(conn){
//  console.log('New connection')
    conn.on("text",function(str){
        console.log("Received"+str)
        // conn.sendText(str.toUpperCase()+"!!!") //大写收到的数据
        try{
            var data = JSON.parse(str);
            if(data.hasOwnProperty("method")){
                switch(data.method){
                    case "getLang":
//                  console.log("getLang");
                    data.Lang = "ENG";
                    conn.sendText(JSON.stringify(data));
                    return;
                    case "mtk.webui.config.getMinMaxValue":
                        data.result= configObj[data.params.configId];
												data.error = {"code" : "0", "message" : "OK"};
//												console.log(JSON.stringify(data));
												conn.sendText(JSON.stringify(data));

                    break;
                    case "mtk.webui.config.setValue":
                        configObj[data.params.configId].current = data.params.value;
                        data.result= configObj[data.params.configId];
                        delete data.params;
												data.error = {"code" : "0", "message" : "OK"};
//												console.log(JSON.stringify(data));
												conn.sendText(JSON.stringify(data));

                    break;
                    case "mtk.webui.config.getValue":
                        data.result= configObj[data.params.configId];
												data.error = {"code" : "0", "message" : "OK"};
//												console.log(JSON.stringify(data));
												conn.sendText(JSON.stringify(data));

                    break;
                    case "mtk.webui.input.skipSource":
                    	for(var i=0;i<inputListObj.result.List.length;i++){
                    		if(inputListObj.result.List[i].index==data.params.sourceId){
                    			inputListObj.result.List[i].skip=data.params.skip;
                    		}
                    	}
//												console.log(JSON.stringify(data));
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));

                    break;
                    case "mtk.webui.input.blockSource":
                    	for(var i=0;i<inputListObj.result.List.length;i++){
                    		if(inputListObj.result.List[i].index==data.params.sourceId){
                    			inputListObj.result.List[i].block=data.params.block;
                    		}
                    	}
//												console.log(JSON.stringify(data));
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));

                    break;
                    case "mtk.webui.channelList.queryChannelList":
                    	var response = testData[data.method];
	                    if(response){
	                        response.id = data.id;
	                        conn.sendText(JSON.stringify(response));
	                       return;
	                    }
                    break;
                    case "mtk.webui.channelList.setSvlTslRec":
                    	if(data.params.operator=='UPDATA'){
                    		for(var i=0;i<channelList.result.List.length;i++){
                    			if(data.params.List[0].hasOwnProperty('nwMask') && channelList.result.List[i].svlRecId==data.params.List[0].svlRecId){
                    				channelList.result.List[i].nwMask=data.params.List[0].nwMask;
	                    		}
	                    		if(data.params.List[0].hasOwnProperty('acName') && channelList.result.List[i].svlRecId==data.params.List[0].svlRecId){
		                  			channelList.result.List[i].acName=data.params.List[0].acName;
		                  			channelList.result.List[i].majorNum=data.params.List[0].majorNum;
	                    		}
                    		}
                    	}else{
                    		var thisIndex;
                    		for(var i=0;i<channelList.result.List.length;i++){
	                    		if(channelList.result.List[i].svlRecId==data.params.List[0].svlRecId){
	                    			thisIndex=i;
	                    		}
                    		}
                    		channelList.result.List.splice(thisIndex, 1);
                    	}
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.channelList.swapChannels":
                    	var list1,list1Index,list2,list2Index,temp;
                    	for(var i=0;i<channelList.result.List.length;i++){
                    		if(channelList.result.List[i].channelId==data.params.ChNum1){
                    			list1=channelList.result.List[i];
                    			list1Index=i;
                    		}
                    		if(channelList.result.List[i].channelId==data.params.ChNum2){
                    			list2=channelList.result.List[i];
                    			list2Index=i;
                    		}
                    	}
                    	temp=list1;
                    	list1=list2;
                    	list2=temp;
                    	channelList.result.List[list1Index]=list1;
                    	channelList.result.List[list2Index]=list2;
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.channelList.cleanChannellist":
                    	channelList.result.List=[];
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.queryInternetConnection":
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.setInternetConnection":
                    	internetConnection.enable=data.params.enable;
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.queryInternetInterface":
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.setInternetInterface":
                    	interFace.type=data.params.type;
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.queryInternetInformation":
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.queryAddressType":
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.setAddressType":
                    	addrType.type=data.params.type;
                    	ipInformation.ip=data.params.ip;
                    	ipInformation.netmask=data.params.netmask;
                    	ipInformation.gateway=data.params.gateway;
                    	ipInformation["1stDNS"]=data.params["1stDNS"];
                    	ipInformation["2ndDNS"]=data.params["2ndDNS"];
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.queryIPv6Information":
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.queryIPv6AddressType":
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.setIPv6AddressType":                   
                    	ipv6AddrType.type=data.params.type;
                    	ipv6Information.ipv6=data.params.ipv6;
                    	ipv6Information.lenOfPrefix=data.params.lenOfPrefix;
                    	ipv6Information.gateway=data.params.gateway;
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.queryIPv6DNSType":
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.setIPv6DNSType":
                    	ipv6DNSType.type=data.params.type;
                    	ipv6Information['1stDNS']=data.params['1stDNS'];
                    	ipv6Information['2ndDNS']=data.params['2ndDNS'];
                            					testData[data.method].id = data.id;   
												conn.sendText(JSON.stringify(testData[data.method]));
                    break;
                    case "mtk.webui.network.queryConnectionTest":
                    	var returnData={
                    		"method":"mtk.webui.network.notify",
                    		"param":{
                    			"notifyType":"connectionTest",
                    			"connection":"fail"
                    		}
                    	}
                    	returnData.id = data.id;   
                    	conn.sendText(JSON.stringify(returnData));
                    break;
                    case "mtk.webui.network.queryIPv6ConnectionTest":
                    	var returnData={
                    		"method":"mtk.webui.network.notify",
                    		"param":{
                    			"notifyType":"IPv6connectionTest",
                    			"connection":"fail"
                    		}
                    	}
                    	returnData.id = data.id;   
                    	conn.sendText(JSON.stringify(returnData));
                    break;
                    
                    default:
                    var response = testData[data.method];
                    console.log(testData[data.method]);
                    if(response){
                    	console.log(response);
                        response.id = data.id;
                        conn.sendText(JSON.stringify(response));
                       return;
                    }
                    break;
                }
            }
        }catch(e){
            console.log("error:"+e);
            var response = {"error":"need send json str"};
            conn.sendText(JSON.stringify(response));
            }
        
   
//      conn.sendText(str)  //收到直接发回去
    })
    conn.on("close",function(code,reason){
        console.log("connection closed")
    })
    conn.on("error",function(err){
        console.log("handle err")
        console.log(err)
    })
}).listen(PORT)
 
console.log('websocket server listening on port ' + PORT)
