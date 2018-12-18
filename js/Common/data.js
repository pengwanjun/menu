//video下所有数据
var gMenuVideoMjc = [{
		name: 'Effect',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'Low', 'Middle', 'High']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_mjc_effect"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_mjc_effect",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Demo Partition',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['All', 'Right', 'Left']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_mjc_demo"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_mjc_demo",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Demo',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'mjcDemo'
		},
		opera: true
	}
];

var gMenuVideoCt = [{
		name: 'Color Temperature',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['User', 'Cool', 'Standard', 'Warm']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__clr_temp"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__clr_temp",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'R Gain',
		value: {
			valType: 'num',
			data: 0,
			min: -20,
			max: 20
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__clr_gain_r"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__clr_gain_r",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'G Gain',
		value: {
			valType: 'num',
			data: 0,
			min: -20,
			max: 20
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__clr_gain_g"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__clr_gain_g",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'B Gain',
		value: {
			valType: 'num',
			data: 0,
			min: -20,
			max: 20
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__clr_gain_b"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__clr_gain_b",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	}
];
var gMenuVideoAv = [{
		name: 'DNR',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'Low', 'Medium', 'strong', 'Auto', ] //0-4
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_nr"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_nr",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'MPEG NR',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'Low', 'Medium', 'strong'] //0-3
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_mpeg_nr"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_mpeg_nr",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//						console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Adaptive Luma Control',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'Low', 'Medium', 'strong']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_luma"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_luma",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//						console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Flesh Tone',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'Low', 'Middle', 'Strong']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_flash_tone"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_flash_tone",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//						console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Dl Film Mode',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'Auto']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_di_film_mode"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_di_film_mode",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//						console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Blue stretch',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'On']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_blue_stretch"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_blue_stretch",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//						console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Game Mode',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'On']
		},
		curVal: 0,
		opera: false,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_game_mode"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_game_mode",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//						console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'MJC',
		value: {
			valType: 'list',
			data: gMenuVideoMjc
		},
		opera: true
	},
	{
		name: 'Black Bar Detection',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'On']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_black_bar_detect"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_black_bar_detect",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//						console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Super Resolution',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'On']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_super_resolution"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_super_resolution",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//						console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	}
];
var gMenuVideo = [{
		name: 'Picture Mode',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['User', 'Cinema', 'Sport', 'Vivid', 'Hi-Bright']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__picture_mode"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__picture_mode",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data.result);
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Back Light',
		value: {
			valType: 'num',
			data: 50,
			min: 0,
			max: 100
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_disp__disp_back_light"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_disp__disp_back_light",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'Brightness',
		value: {
			valType: 'num',
			data: 50,
			min: 0,
			max: 100
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__brightness"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__brightness",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'Contrast',
		value: {
			valType: 'num',
			data: 80,
			min: 0,
			max: 100
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__contrast"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__contrast",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'Saturation',
		value: {
			valType: 'num',
			data: 0,
			min: 0,
			max: 100
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_sat"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_sat",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'HUE',
		value: {
			valType: 'num',
			data: -13,
			min: -50,
			max: 50
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_hue"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_hue",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'Sharpness',
		value: {
			valType: 'num',
			data: 0,
			min: 0,
			max: 20
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_shp"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_shp",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'Blue Light',
		value: {
			valType: 'num',
			data: 0,
			min: 0,
			max: 100
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_blue_light"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_blue_light",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'Dolby Vision Notification',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'On']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				//				return {
				//					"method": "mtk.webui.config.getMinMaxValue",
				//					"params": {
				//						"configId": "g_disp__disp_back_light"
				//					}
				//				};
			} else {
				//				return {
				//					"method": "mtk.webui.config.setValue",
				//					"params": {
				//						"configId": "g_disp__disp_back_light",
				//						"value": gMenuoIndex,
				//						"apply": true
				//					}
				//				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data.result);
			//			let arr=[];
			//			for(let i=data.result.min;i<=data.result.max;i++){
			//				arr.push(this.value.dataList[i]);
			//			}
			//			this.value.data=arr;
			//			this.curVal=data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			//			this.curVal=data.result.current;
		}
	},
	{
		name: 'Gamma',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Dark', 'Middle', 'Bright']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_disp__disp_gamma"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_disp__disp_gamma",
						"value": parseInt(gMenuoIndex) + 1,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min - 1; i <= data.result.max - 1; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current - 1;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current - 1;
		}
	},
	{
		name: 'HDR',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'Auto']
		},
		curVal: 1,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_video__vid_hdr"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_video__vid_hdr",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Color Temperature',
		value: {
			valType: 'list',
			data: gMenuVideoCt
		},
		opera: true
	},
	{
		name: 'Advanced Video',
		value: {
			valType: 'list',
			data: gMenuVideoAv
		},
		opera: true
	}
];

//audio下所有数据

var gMenuAudioDol = [{
		name: 'Dolby Audio Processing',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['On', 'Off']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__dolby_audio_processing"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__dolby_audio_processing",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Sound Mode',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'Auto', 'Movie', 'Game', 'News', 'Night', 'VolP']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__dolby_sound_mode"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__dolby_sound_mode",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Volume Leveler',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['On', 'Off']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__volume_leveler"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__volume_leveler",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Dialogue Enhancement',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'Low', 'Medium', 'High']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__dialogue_enhancer"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__dialogue_enhancer",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Speaker Virtualizer',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'On', 'Auto']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__speaker_virtualizer"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__speaker_virtualizer",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	}
];

var gMenuAudioAdvanced = [{
	name: 'Dolby Audio Processing',
	value: {
		valType: 'list',
		data: gMenuAudioDol
	},
	opera: true
}];

var gMenuAudio = [{
		name: 'Balance',
		value: {
			valType: 'num',
			data: -19,
			min: -50,
			max: 50
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__aud_balance"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__aud_balance",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'Bass',
		value: {
			valType: 'num',
			data: 20,
			min: 0,
			max: 100
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__aud_bass"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__aud_bass",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'Treble',
		value: {
			valType: 'num',
			data: 55,
			min: 0,
			max: 100
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__aud_treble"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__aud_treble",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'Sound Surround',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'On']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__aud_surround"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__aud_surround",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Equalizer',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'Rock', 'Pop', 'Live', 'Dance', 'Techno', 'Classic', 'Soft']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__aud_equalizer"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__aud_equalizer",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Speaker',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'On']
		},
		curVal: 1,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__aud_ad_speaker"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__aud_ad_speaker",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'SPDIF Type',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'PCM', 'Dolby Digital', 'Dolby Digital Plus']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__spdif"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__spdif",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'SPDIF Delay',
		value: {
			valType: 'num',
			data: 140,
			min: 0,
			max: 100
		},
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__spdif_delay"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__spdif_delay",
						"value": this.value.data,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.min = data.result.min;
			this.value.max = data.result.max;
			this.value.data = data.result.current;
		}
	},
	{
		name: 'Auto Volume Control',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Off', 'On']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getMinMaxValue",
					"params": {
						"configId": "g_audio__aud_ad_volume"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__aud_ad_volume",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			let arr = [];
			for(let i = data.result.min; i <= data.result.max; i++) {
				arr.push(this.value.dataList[i]);
			}
			this.value.data = arr;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Type',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Normal', 'Hearing Impaired', 'Visually Impaired']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getValue",
					"params": {
						"configId": "g_audio__aud_type"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__aud_type",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.data = this.value.dataList;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Visually Impaired',
		value: {
			valType: 'scan',
			data: []
		},
		opera: false

	},
	{
		name: 'Downmix Mode',
		value: {
			valType: 'sel',
			data: [],
			dataList: ['Surround', 'Stereo', 'Auto Stereo']
		},
		curVal: 0,
		opera: true,
		msg: function(key) {
			if(key == 'get') {
				return {
					"method": "mtk.webui.config.getValue",
					"params": {
						"configId": "g_audio__dolby_dmix"
					}
				};
			} else {
				return {
					"method": "mtk.webui.config.setValue",
					"params": {
						"configId": "g_audio__dolby_dmix",
						"value": gMenuoIndex,
						"apply": true
					}
				};
			}
		},
		getCallback: function(data) { //获取value值
			//			console.log(data);
			this.value.data = this.value.dataList;
			this.curVal = data.result.current;
		},
		setCallback: function(data) { //设置value值
			//			console.log(data.result);
			this.curVal = data.result.current;
		}
	},
	{
		name: 'Soundtracks',
		value: {
			valType: 'scan',
			data: []
		},
		opera: false
	},
	{
		name: 'Advanced',
		value: {
			valType: 'list',
			data: gMenuAudioAdvanced
		},
		opera: true
	}
];

//tv下所有数据
var gMenuTvChannelSkip = {
	name: 'gMenuTvChannelSkip',
	data: [{
			name: '0',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: true
		},
		{
			name: '1',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: true
		},
		{
			name: '2',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: true
		},
		{
			name: '3',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '4',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '5',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '6',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '7',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '8',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '9',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '10',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '11',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '12',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '13',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '14',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		}
	]
};
var gMenuTvChannelSort = {
	name: 'gMenuTvChannelSort',
	data: [{
			name: '0',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: true
		},
		{
			name: '1',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: true
		},
		{
			name: '2',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: true
		},
		{
			name: '3',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '4',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '5',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '6',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '7',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '8',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '9',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '10',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '11',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '12',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '13',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '14',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '15',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '16',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		}
	]
};

var gMenuTvChannelEdit = {
	name: 'gMenuTvChannelEdit',
	data: [{
			name: '0',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '1',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '2',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '3',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '4',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '5',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '6',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '7',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '8',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '9',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '10',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '11',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '12',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '13',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '14',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '15',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '16',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '17',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '18',
			type: 'Digital',
			value: 'BBC ONE N West'
		},
		{
			name: '19',
			type: 'Digital',
			value: 'BBC ONE N West'
		}
	]
};
var gMenuTvAnalogChannel = {
	name: 'gMenuTvAnalogChannel',
	data: [{
			name: '901',
			value: '95.25MHz'
		},
		{
			name: '902',
			value: '291.44MHz'
		}
	]
};
var gMenuTvChannels = [{
		name: 'Channel Scan',
		value: {
			valType: 'scan',
			data: {
				'Status': 'Scanning',
				'Analog Channels': '0',
				'Digital Channels': '61',
				'Progress Bar': '69%'
			},
			renderFuc: 'channelScan'
		},
		opera: true
	},
	{
		name: 'Update Scan',
		value: {
			valType: 'scan',
			data: {
				'Status': 'Scanning',
				'Analog Channels': '0',
				'Digital Channels': '61',
				'Progress Bar': '50%'
			},
			renderFuc: 'updateScan'
		},
		opera: true
	},
	{
		name: 'Analog Manual Scan',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'analogManualScan'
		},
		opera: true
	},
	{
		name: 'Single RF Scan',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'singleRFScan'
		},
		opera: true
	},
	{
		name: 'Favorite Network select',
		value: {
			valType: 'scan',
			data: []
		},
		opera: false
	},
	{
		name: 'Channel Skip',
		value: {
			valType: 'scan',
			data: gMenuTvChannelSkip,
			renderFuc: 'channelSkip'
		},
		opera: true
	},
	{
		name: 'Channel Sort',
		value: {
			valType: 'scan',
			data: gMenuTvChannelSort,
			renderFuc: 'channelSkip'
		},
		opera: true
	},
	{
		name: 'Channel Edit',
		value: {
			valType: 'scan',
			data: gMenuTvChannelEdit,
			renderFuc: 'channelSkip'
		},
		opera: true
	},
	{
		name: 'Analog Channel Fine Tune',
		value: {
			valType: 'scan',
			data: gMenuTvAnalogChannel,
			renderFuc: 'channelSkip'
		},
		opera: true
	},
	{
		name: 'Clean Channel List',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'popBoxShow'
		},
		opera: true
	}
];

var gMenuTv = [{
		name: 'Tuner Mode',
		value: {
			valType: 'sel',
			data: ['Antenna', 'Cable', 'Satellite']
		},
		curVal: 'Antenna',
		opera: true
	},
	{
		name: 'Audio Channel',
		value: {
			valType: 'sel',
			data: ['Stereo', 'Dual1', 'Dual2', 'Mono']
		},
		curVal: 'Stereo',
		opera: true
	},
	{
		name: 'Channels',
		value: {
			valType: 'scan',
			data: gMenuTvChannels
		},
		opera: true
	}
];

//setup下所有数据
var gMenuSetupTSTime = [{
		name: 'Auto Synchronization',
		value: {
			valType: 'sel',
			data: ['On', 'Off']
		},
		curVal: 'On',
		opera: true
	},
	{
		name: 'Date',
		value: {
			valType: 'num',
			data: '2000/01/01'
		},
		opera: false
	},
	{
		name: 'Time',
		value: {
			valType: 'num',
			data: new Date().toLocaleTimeString()
		},
		opera: false
	},
	{
		name: 'Power On Timer',
		value: {
			valType: 'sel',
			data: ['Off', 'On', 'Once']
		},
		curVal: 'Off',
		opera: true
	},
	{
		name: 'Timer',
		value: {
			valType: 'num',
			data: '00:00:00'
		},
		opera: false
	},
	{
		name: 'Power on Channel',
		value: {
			valType: 'list',
			data: []
		},
		opera: false
	},
	{
		name: 'Power Off Timer',
		value: {
			valType: 'sel',
			data: ['Off', 'On', 'Once']
		},
		curVal: 'Off',
		opera: true
	},
	{
		name: 'Timer',
		value: {
			valType: 'num',
			data: '00:00:00'
		},
		opera: false
	}
];

var gMenuSetupHbbTV = [{
		name: 'HbbTV Support',
		value: {
			valType: 'sel',
			data: ['On', 'Off']
		},
		curVal: 'On',
		opera: true
	},
	{
		name: 'Do Not Track',
		value: {
			valType: 'sel',
			data: ['Default', 'Off', 'On']
		},
		curVal: 'Default',
		opera: true
	},
	{
		name: 'Cookie Settings',
		value: {
			valType: 'sel',
			data: ['Default', 'Block All', 'Blcok 3rd Cookie']
		},
		curVal: 'Default',
		opera: true
	},
	{
		name: 'Persistent Storage',
		value: {
			valType: 'sel',
			data: ['On', 'Off']
		},
		curVal: 'On',
		opera: true
	},
	{
		name: 'Blcok Tracking Sites',
		value: {
			valType: 'sel',
			data: ['Off', 'On']
		},
		curVal: 'Off',
		opera: true
	},
	{
		name: 'Device ID',
		value: {
			valType: 'sel',
			data: ['On', 'Off']
		},
		curVal: 'On',
		opera: true
	},
	{
		name: 'Reset Device ID',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'popBoxShow'
		},
		opera: true
	}
];
var gMenuSetupTS = [{
		name: 'Time Zone',
		value: {
			valType: 'sel',
			data: ['As Broadcaster', 'GMT+0:00', 'GMT+1:00', 'GMT+2:00', 'GMT+3:00', 'GMT+3:30', 'GMT+4:00',
				'GMT+4:30', 'GMT+5:00', 'GMT+5:30', 'GMT+5:45', 'GMT+6:00', 'GMT+6:30', 'GMT+7:00', 'GMT+8:00',
				'GMT+9:00', 'GMT+9:30', 'GMT+10:00', 'GMT+11:00', 'GMT+12:00', 'GMT+12:45', 'GMT+13:00',
				'GMT-12:00', 'GMT-11:00', 'GMT-10:00', 'GMT-9:00', 'GMT-8:00', 'GMT-7:00', 'GMT-6:00',
				'GMT-5:00', 'GMT-4:00', 'GMT-3:30', 'GMT-3:00', 'GMT-2:00', 'GMT-1:00'
			]
		},
		curVal: 'As Broadcaster',
		opera: true
	},
	{
		name: 'Time',
		value: {
			valType: 'list',
			data: gMenuSetupTSTime
		},
		opera: true
	},
	{
		name: 'Sleep Timer',
		value: {
			valType: 'sel',
			data: ['Off', '10 Minutes', '20 Minutes', '30 Minutes', '40 Minutes', '50 Minutes', '60 Minutes', '90 Minutes', '120 Minutes']
		},
		curVal: 'Off',
		opera: true
	},
	{
		name: 'Auto Sleep',
		value: {
			valType: 'sel',
			data: ['Off', '4 Hours', '6 Hours', '8 Hours']
		},
		curVal: 'Off',
		opera: true
	}
];
var gMenuSetupHDMI = [{
	name: 'Singal Format',
	value: {
		valType: 'sel',
		data: ['4K@60Hz 4:2:0', '4K@60Hz 4:4:4/4:2:0']
	},
	curVal: '4K@60Hz 4:2:0',
	opera: true
}];
var gMenuSetupSubtitle = [{
		name: 'Analog Subtitle',
		value: {
			valType: 'sel',
			data: ['On', 'Mute', 'Off']
		},
		curVal: 'On',
		opera: true
	},
	{
		name: 'Digital Subtitle Lang.',
		value: {
			valType: 'sel',
			data: ['English']
		},
		curVal: 'English',
		opera: true
	},
	{
		name: 'Digital Subtitle Lang. 2nd',
		value: {
			valType: 'sel',
			data: ['English']
		},
		curVal: 'English',
		opera: true
	},
	{
		name: 'Subtitle Type',
		value: {
			valType: 'sel',
			data: ['Normal', 'Hearing Impaired']
		},
		curVal: 'Normal',
		opera: true
	}
];
var gMenuSetupTeletext = [{
		name: 'Digital Teletext Language',
		value: {
			valType: 'sel',
			data: ['English']
		},
		curVal: 'English',
		opera: true
	},
	{
		name: 'Decoding Page Language',
		value: {
			valType: 'sel',
			data: ['WEST EUR']
		},
		curVal: 'WEST EUR',
		opera: true
	},
	{
		name: 'TTX Presentation Level',
		value: {
			valType: 'sel',
			data: ['Level 2.5', 'Level 1.5']
		},
		curVal: 'Level 2.5',
		opera: true
	}
];
var gMenuSetupCI = [{
		name: 'Cam Menu',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'camMenu'
		},
		opera: true
	},
	{
		name: 'RF Channel',
		value: {
			valType: 'sel',
			data: ['Default', 'AMMI', 'Broadcast']
		},
		curVal: 'Default',
		opera: true
	}
];
var gMenuSetupNetworkConf = [{
		name: 'Internet Connection',
		value: {
			valType: 'sel',
			data: ['Off', 'On']
		},
		curVal: 'Off',
		opera: true
	},
	{
		name: 'Interface',
		value: {
			valType: 'sel',
			data: ['Ethernet', 'Wireless']
		},
		curVal: 'Ethernet',
		opera: true
	},
	{
		name: 'Wake On Lan',
		value: {
			valType: 'sel',
			data: ['Off', 'On']
		},
		curVal: 'Off',
		opera: false
	},
	{
		name: 'Wake On Wlan',
		value: {
			valType: 'sel',
			data: ['Off', 'On']
		},
		curVal: 'Off',
		opera: true
	},
	{
		name: 'Wireless Setting',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'wirelessSetting'
		},
		opera: true
	},
	{
		name: 'Information',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'Information'
		},
		opera: true
	},
	{
		name: 'IP Setting',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'IPSetting'
		},
		opera: true
	},
	{
		name: 'Connection Test',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'connectionTest'
		},
		opera: true
	},
	{
		name: 'IP Prefer',
		value: {
			valType: 'sel',
			data: ['IPv6', 'IPv4']
		},
		curVal: 'IPv6',
		opera: true
	},
	{
		name: 'IPv6 Information',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'IPv6Information'
		},
		opera: true
	},
	{
		name: 'IPv6 Configuration IP',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'IPv6ConfigurationIP'
		},
		opera: true
	},
	{
		name: 'IPv6 Connection Test',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'IPv6ConnectionTest'
		},
		opera: true
	}
];
var gMenuSetupNetworkNetflix = [{
		name: 'Deactivate',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'Deactivate'
		},
		opera: false
	},
	{
		name: 'ESN',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'ESN'
		},
		opera: true
	}
];
var gMenuSetupNetworkApp = [{
		name: 'DLNA',
		value: {
			valType: 'sel',
			data: ['On', 'Off']
		},
		curVal: 'On',
		opera: true
	},
	{
		name: 'DMR',
		value: {
			valType: 'sel',
			data: ['On', 'Off']
		},
		curVal: 'On',
		opera: true
	},
	{
		name: 'Netflix',
		value: {
			valType: 'list',
			data: gMenuSetupNetworkNetflix
		},
		opera: true
	}
];
var gMenuSetupNetwork = [{
		name: 'Configuration',
		value: {
			valType: 'list',
			data: gMenuSetupNetworkConf
		},
		curVal: 'Default',
		opera: true
	},
	{
		name: 'WFD',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'WFD'
		},
		opera: true
	},
	{
		name: 'WIFI_DIRECT',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'WIFI_DIRECT'
		},
		opera: true
	},
	{
		name: 'Applications',
		value: {
			valType: 'list',
			data: gMenuSetupNetworkApp
		},
		opera: true
	}
];
var gMenuSetupBluetooth = [{
		name: 'Switch',
		value: {
			valType: 'sel',
			data: ['On', 'Off']
		},
		curVal: 'On',
		opera: true
	},
	{
		name: 'Bluetooth Setting',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'bluetoothSetting'
		},
		opera: true
	}
];
var gMenuSetupOAD = [{
		name: 'Manual OAD Download',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'manualOADDownload'
		},
		opera: true
	},
	{
		name: 'Auto Download',
		value: {
			valType: 'sel',
			data: ['YES', 'NO']
		},
		curVal: 'YES',
		opera: true
	}
];
var gMenuSetupRecord = [{
		name: 'Device Info',
		value: {
			valType: 'scan',
			data: []
		},
		opera: true
	},
	{
		name: 'Schedule List',
		value: {
			valType: 'scan',
			data: []
		},
		opera: true
	},
	{
		name: 'Time Shifting Mode',
		value: {
			valType: 'sel',
			data: ['Off', 'On']
		},
		curVal: 'Off',
		opera: true
	}
];
var gMenuSetupUpdate = [{
		name: 'Auto Channel Update',
		value: {
			valType: 'sel',
			data: ['On', 'Off']
		},
		curVal: 'On',
		opera: true
	},
	{
		name: 'Channel Update Message',
		value: {
			valType: 'sel',
			data: ['On', 'Off']
		},
		curVal: 'On',
		opera: true
	}
];
var gMenuSetup = [{
		name: 'OSD Language',
		value: {
			valType: 'sel',
			data: ['English', 'Vasco', 'Catalan', 'Hrvatski']
		},
		curVal: 'English',
		opera: true
	},
	{
		name: 'Blue Mute',
		value: {
			valType: 'sel',
			data: ['Off', 'On']
		},
		curVal: 'Off',
		opera: true
	},
	{
		name: 'Hot Boot',
		value: {
			valType: 'sel',
			data: ['On', 'Off']
		},
		curVal: 'On',
		opera: true
	},
	{
		name: 'Interaction Channel',
		value: {
			valType: 'sel',
			data: ['Off', 'On']
		},
		curVal: 'Off',
		opera: true
	},
	{
		name: 'MHEG PIN Protection',
		value: {
			valType: 'sel',
			data: ['Off', 'On']
		},
		curVal: 'Off',
		opera: true
	},
	{
		name: 'HbbTV Settings',
		value: {
			valType: 'list',
			data: gMenuSetupHbbTV
		},
		opera: true
	},
	{
		name: 'Time Setup',
		value: {
			valType: 'list',
			data: gMenuSetupTS
		},
		opera: true
	},
	{
		name: 'HDMI2.0 Setting',
		value: {
			valType: 'list',
			data: gMenuSetupHDMI
		},
		opera: true
	},
	{
		name: 'DivX(R) Registration',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'divXRegistration'
		},
		opera: true
	},
	{
		name: 'DivX(R) Deactivation',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'divXDeactivation'
		},
		opera: true
	},
	{
		name: 'Subtitle',
		value: {
			valType: 'list',
			data: gMenuSetupSubtitle
		},
		opera: true
	},
	{
		name: 'Teletext',
		value: {
			valType: 'list',
			data: gMenuSetupTeletext
		},
		opera: true
	},
	{
		name: 'Common Interface',
		value: {
			valType: 'list',
			data: gMenuSetupCI
		},
		opera: true
	},
	{
		name: 'Network',
		value: {
			valType: 'list',
			data: gMenuSetupNetwork
		},
		opera: true
	},
	{
		name: 'Bluetooth',
		value: {
			valType: 'list',
			data: gMenuSetupBluetooth
		},
		opera: true
	},
	{
		name: 'OAD',
		value: {
			valType: 'list',
			data: gMenuSetupOAD
		},
		opera: true
	},
	{
		name: 'BISS key',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'bissKey'
		},
		opera: true
	},
	{
		name: 'Version Info',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'versionInfo'
		},
		opera: true
	},
	{
		name: 'License Info',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'licenseInfo'
		},
		opera: true
	},
	{
		name: 'Record Setting',
		value: {
			valType: 'list',
			data: gMenuSetupRecord
		},
		opera: true
	},
	{
		name: 'Channel Update',
		value: {
			valType: 'list',
			data: gMenuSetupUpdate
		},
		opera: true
	},
	{
		name: 'System Information',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'systemInformation'
		},
		opera: true
	},
	{
		name: 'Reset Default',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'resetDefault'
		},
		opera: true
	}
];

//parental下所有数据
var gMenuParentalProgramBlock = [{
	name: 'Age Rating',
	value: {
		valType: 'sel',
		data: [],
		dataList: ['None', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
	},
	curVal: 0,
	opera: true,
	msg: function(key) {
		if(key == 'get') {
			return {
				"method": "mtk.webui.config.getMinMaxValue",
				"params": {
					"configId": "g_rating__rating_age"
				}
			};
		} else {
			return {
				"method": "mtk.webui.config.setValue",
				"params": {
					"configId": "g_rating__rating_age",
					"value": gMenuoIndex,
					"apply": true
				}
			};
		}
	},
	getCallback: function(data) { //获取value值
//		console.log(data.result);
		let arr = [];
		for(let i = data.result.min; i <= data.result.max; i++) {
			arr.push(this.value.dataList[i]);
		}
		this.value.data = arr;
		this.curVal = data.result.current;
	},
	setCallback: function(data) { //设置value值
		//			console.log(data.result);
		this.curVal = data.result.current;
	}
}];
var gMenuParentalShow = [{
		name: 'Channel Block',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'channelBlock'
		},
		opera: true
	},
	{
		name: 'Program Block',
		value: {
			valType: 'list',
			data: gMenuParentalProgramBlock
		},
		opera: true
	},
	{
		name: 'Input Skip',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'inputSkip'
		},
		opera: true
	},
	{
		name: 'Input Block',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'inputBlock'
		},
		opera: true
	},
	{
		name: 'Change Password',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'changePassword'
		},
		opera: true
	},
	{
		name: 'Clean All',
		value: {
			valType: 'scan',
			data: [],
			renderFuc: 'popBoxShow'
		},
		opera: true
	}
];
var gMenuParental = [{
	name: 'Password',
	value: {
		valType: 'scan',
		data: [],
		renderFuc: 'password'
	},
	opera: true
}];

//主目录menu
var Menu = {
	valType: 'list',
	data: [{
			name: 'Video',
			value: {
				valType: 'list',
				data: gMenuVideo
			},
			opera: true
		},
		{
			name: 'Audio',
			value: {
				valType: 'list',
				data: gMenuAudio
			},
			opera: true
		},
		{
			name: 'TV',
			value: {
				valType: 'list',
				data: gMenuTv
			},
			opera: true
		},
		{
			name: 'Setup',
			value: {
				valType: 'list',
				data: gMenuSetup
			},
			opera: true
		},
		{
			name: 'Parental',
			value: {
				valType: 'list',
				data: gMenuParentalShow
			},
			opera: true
		},
//		{
//			name: 'Parental',
//			value: {
//				valType: 'scan',
//				data: gMenuParental
//			},
//			opera: true
//		}
	]
};
var gMenuoIndex = 0;
var gMenuClassName = 'firstList';
var gMenuPageName = 'list';
var gMenuParent = Menu;
var gMenuChild = Menu.data[0].value;
var gMenuNavlist = [];