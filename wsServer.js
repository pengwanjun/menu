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
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
	                  "nwMask":"2", 
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
					"svlRecId": "0",
	                  "channelId":"1",
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
	            }
		]
	},
	"error":{"code":"0", "message":"OK"}
};
testData['mtk.webui.channelList.queryChannelList']= channelList;



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
	"g_audio__aud_ad_volume":{"configId":'g_audio__aud_ad_volume',"min":0, "max":1,"current":1},
	"g_rating__rating_age":{"configId":'g_rating__rating_age',"min":0, "max":16,"current":1},
};


// on就是addListener，添加一个监听事件调用回调函数
// Scream server example:"hi"->"HI!!!",服务器把字母大写
var server = ws.createServer(function(conn){
//  console.log('New connection')
    conn.on("text",function(str){
//      console.log("Received"+str)
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
                    	console.log(testData[data.method]);
	                    if(response){
	                    	console.log(response);
	                        response.id = data.id;
	                        conn.sendText(JSON.stringify(response));
	                       return;
	                    }
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
