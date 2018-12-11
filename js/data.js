//video下所有数据
var gMenuVideoMjc = [{
		name: 'Effect',
		value: ['Middle', 'High', 'Off', 'Low'],
		curVal: 'Middle',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Demo Partition',
		value: ['All', 'Right', 'Left'],
		curVal: 'All',
		valType: 'sel',
		opera: false
	},
	{
		name: 'Demo',
		value: [],
		valType: 'scan',
		opera: false
	}
];

var gMenuVideoCt = [{
		name: 'Color Temperature',
		value: ['User', 'Cool', 'Standard', 'Warm'],
		curVal: 'User',
		valType: 'sel',
		opera: true
	},
	{
		name: 'R Gain',
		value: 0,
		valType: 'num',
		opera: true
	},
	{
		name: 'G Gain',
		value: 0,
		valType: 'num',
		opera: true
	},
	{
		name: 'B Gain',
		value: 0,
		valType: 'num',
		opera: true
	}
];
var gMenuVideoAv = [{
		name: 'DNR',
		value: ['Medium', 'strong', 'Auto', 'Off', 'Low'],
		curVal: 'Medium',
		valType: 'sel',
		opera: true
	},
	{
		name: 'MPEG NR',
		value: ['Medium', 'strong', 'Off', 'Low'],
		curVal: 'Medium',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Adaptive Luma Control',
		value: ['Medium', 'strong', 'Off', 'Low'],
		curVal: 'Medium',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Flesh Tone',
		value: ['Medium', 'High', 'Off', 'Low'],
		curVal: 'Medium',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Dl Film Mode',
		value: ['Auto', 'Off'],
		curVal: 'Auto',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Blue stretch',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Game Mode',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: false
	},
	{
		name: 'MJC',
		value: gMenuVideoMjc,
		valType: 'list',
		opera: true
	},
	{
		name: 'Black Bar Detection',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Super Resolution',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	}
];
var gMenuVideo = [{
		name: 'Picture Mode',
		value: ['User', 'Cinema', 'Sport', 'Vivid', 'Hi-Bright'],
		//		value: [],
		curVal: 'User',
		valType: 'sel',
		opera: true,
		msg: function(key) { //请求参数
			if(key == 'get') {
				var msg = {
					"method": "org.mtk.webview.video.query.picmode"
				}
			} else {
				var msg = {
					"method": "org.mtk.webview.video.set.picmode"
				}
			}
			return msg;
		},
		getCallback: function(data) { //获取value值
			//			console.log(data.result);
			for(k in data.result.List) {
				if(k == data.result.val) {
					this.curVal = data.result.List[k];
				}
				this.value.push(data.result.List[k]);
			}
		},
		setCallback: function(data) { //设置curVal值
			console.log(data);
		}
	},
	{
		name: 'Back Light',
		value: 50,
		valType: 'num',
		opera: true
	},
	{
		name: 'Brightness',
		value: 50,
		valType: 'num',
		opera: true,
		msg: function() {
			if(key == 'get') {
				var msg = {
					"method": "org.mtk.webview.video.query.brightness"
				}
			} else {
				var msg = {
					"method": "org.mtk.webview.video.set.brightness"
				}
			}
			return msg;
		},
		getCallback: function(data) {
			console.log(data);
		},
		setCallback: function(data) {
			console.log(data);
		}
	},
	{
		name: 'Contrast',
		value: 80,
		valType: 'num',
		opera: true
	},
	{
		name: 'Saturation',
		value: 60,
		valType: 'num',
		opera: true
	},
	{
		name: 'HUE',
		value: 0,
		valType: 'num',
		opera: true
	},
	{
		name: 'Sharpness',
		value: 12,
		valType: 'num',
		opera: true
	},
	{
		name: 'Blue Light',
		value: 0,
		valType: 'num',
		opera: true
	},
	{
		name: 'Dolby Vision Notification',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Gamma',
		value: ['Middle', 'Bright', 'Dark'],
		curVal: 'Middle',
		valType: 'sel',
		opera: true
	},
	{
		name: 'HDR',
		value: ['Auto', 'Off'],
		curVal: 'Auto',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Color Temperature',
		value: gMenuVideoCt,
		valType: 'list',
		opera: true
	},
	{
		name: 'Advanced Video',
		value: gMenuVideoAv,
		valType: 'list',
		opera: true
	}
];

//audio下所有数据

var gMenuAudioDol = [{
		name: 'Dolby Audio Processing',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Sound Mode',
		value: ['Off', 'Auto', 'Movie', 'Game', 'News', 'Night', 'VolP'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Volume Leveler',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: false
	},
	{
		name: 'Dialogue Enhancement',
		value: ['Off', 'Low', 'Medium', 'High'],
		curVal: 'Off',
		valType: 'sel',
		opera: false
	},
	{
		name: 'Speaker Virtualizer',
		value: ['Off', 'On', 'Auto'],
		curVal: 'Off',
		valType: 'sel',
		opera: false
	}
];

var gMenuAudioAdvanced = [{
	name: 'Dolby Audio Processing',
	value: gMenuAudioDol,
	valType: 'list',
	opera: true
}];

var gMenuAudio = [{
		name: 'Speaker',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	},
	{
		name: 'SPDIF Type',
		value: ['PCM', 'Dolby Digital', 'Dolby Digital Plus', 'Off'],
		curVal: 'PCM',
		valType: 'sel',
		opera: true
	},
	{
		name: 'SPDIF Delay',
		value: 140,
		valType: 'num',
		opera: true
	},
	{
		name: 'Type',
		value: ['Normal', 'Hearing Impaired', 'Visually Impaired'],
		curVal: 'Normal',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Visually Impaired',
		value: [],
		opera: false

	},
	{
		name: 'Downmix Mode',
		value: ['Surround', 'Stereo', 'Auto Stereo'],
		curVal: 'Surround',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Soundtracks',
		value: [],
		opera: false
	},
	{
		name: 'Advanced',
		value: gMenuAudioAdvanced,
		valType: 'list',
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
		},
		{
			name: '17',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '18',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '19',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '20',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		}
	]
};
var gMenuTvChannelSort = {
	name:'gMenuTvChannelSort',
	data:[{
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
		},
		{
			name: '17',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '18',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '19',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		},
		{
			name: '20',
			type: 'Digital',
			value: 'BBC ONE N West',
			sel: false
		}
	]
};

var gMenuTvChannelEdit={
	name: 'gMenuTvChannelEdit',
	data: [{
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
var gMenuTvAnalogChannel={
	name:'gMenuTvAnalogChannel',
	data:[
		{
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
			'Status': 'Scanning',
			'Analog Channels': '0',
			'Digital Channels': '61',
			'Progress Bar': '69%'
		},
		valType: 'scan',
		opera: true,
		renderFuc: 'channelScan'
	},
	{
		name: 'Update Scan',
		value: {
			'Status': 'Scanning',
			'Analog Channels': '0',
			'Digital Channels': '61',
			'Progress Bar': '50%'
		},
		valType: 'scan',
		opera: true,
		renderFuc: 'updateScan'
	},
	{
		name: 'Analog Manual Scan',
		value: [],
		valType: 'scan',
		opera: true,
		renderFuc: 'analogManualScan'
	},
	{
		name: 'Single RF Scan',
		value: [],
		valType: 'scan',
		opera: true,
		renderFuc: 'singleRFScan'
	},
	{
		name: 'Favorite Network select',
		value: [],
		valType: 'scan',
		opera: false
	},
	{
		name: 'Channel Skip',
		value: gMenuTvChannelSkip,
		valType: 'scan',
		opera: true,
		renderFuc: 'channelSkip'
	},
	{
		name: 'Channel Sort',
		value: gMenuTvChannelSort,
		valType: 'scan',
		opera: true,
		renderFuc: 'channelSkip'
	},
	{
		name: 'Channel Edit',
		value: gMenuTvChannelEdit,
		valType: 'scan',
		opera: true,
		renderFuc: 'channelSkip'
	},
	{
		name: 'Analog Channel Fine Tune',
		value: gMenuTvAnalogChannel,
		valType: 'scan',
		opera: true,
		renderFuc: 'channelSkip'
	},
	{
		name: 'Clean Channel List',
		value: [],
		valType: 'scan',
		opera: true,
		renderFuc: 'cleanChannelList'
	}
];

var gMenuTv = [{
		name: 'Tuner Mode',
		value: ['Antenna', 'Cable', 'Satellite'],
		curVal: 'Antenna',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Audio Channel',
		value: ['Stereo', 'Dual1', 'Dual2', 'Mono'],
		curVal: 'Stereo',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Channels',
		value: gMenuTvChannels,
		valType: 'scan',
		opera: true
	}
];

//setup下所有数据
var gMenuSetupTSTime = [{
		name: 'Auto Synchronization',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Date',
		value: '2000/01/01',
		valType: 'num',
		opera: false
	},
	{
		name: 'Time',
		value: new Date().toLocaleTimeString(),
		valType: 'num',
		opera: false
	},
	{
		name: 'Power On Timer',
		value: ['Off', 'On', 'Once'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Timer',
		value: '00:00:00',
		valType: 'num',
		opera: false
	},
	{
		name: 'Power on Channel',
		value: [],
		valType: 'list',
		opera: false
	},
	{
		name: 'Power Off Timer',
		value: ['Off', 'On', 'Once'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Timer',
		value: '00:00:00',
		valType: 'num',
		opera: false
	}
];

var gMenuSetupHbbTV = [{
		name: 'HbbTV Support',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Do Not Track',
		value: ['Default', 'Off', 'On'],
		curVal: 'Default',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Cookie Settings',
		value: ['Default', 'Block All', 'Blcok 3rd Cookie'],
		curVal: 'Default',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Persistent Storage',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Blcok Tracking Sites',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Device ID',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Reset Device ID',
		value: [],
		valType: 'num',
		opera: false
	}
];
var gMenuSetupTS = [{
		name: 'Time Zone',
		value: ['As Broadcaster', 'GMT+0:00', 'GMT+1:00', 'GMT+2:00', 'GMT+3:00', 'GMT+3:30', 'GMT+4:00',
			'GMT+4:30', 'GMT+5:00', 'GMT+5:30', 'GMT+5:45', 'GMT+6:00', 'GMT+6:30', 'GMT+7:00', 'GMT+8:00',
			'GMT+9:00', 'GMT+9:30', 'GMT+10:00', 'GMT+11:00', 'GMT+12:00', 'GMT+12:45', 'GMT+13:00',
			'GMT-12:00', 'GMT-11:00', 'GMT-10:00', 'GMT-9:00', 'GMT-8:00', 'GMT-7:00', 'GMT-6:00',
			'GMT-5:00', 'GMT-4:00', 'GMT-3:30', 'GMT-3:00', 'GMT-2:00', 'GMT-1:00'
		],
		curVal: 'As Broadcaster',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Time',
		value: gMenuSetupTSTime,
		valType: 'list',
		opera: true
	},
	{
		name: 'Sleep Timer',
		value: ['Off', '10 Minutes', '20 Minutes', '30 Minutes', '40 Minutes', '50 Minutes', '60 Minutes', '90 Minutes', '120 Minutes'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Auto Sleep',
		value: ['Off', '4 Hours', '6 Hours', '8 Hours'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	}
];
var gMenuSetupHDMI = [{
	name: 'Singal Format',
	value: ['4K@60Hz 4:2:0', '4K@60Hz 4:4:4/4:2:0'],
	curVal: '4K@60Hz 4:2:0',
	valType: 'sel',
	opera: true
}];
var gMenuSetupSubtitle = [{
		name: 'Analog Subtitle',
		value: ['On', 'Mute', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Digital Subtitle Lang.',
		value: ['English'],
		curVal: 'English',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Digital Subtitle Lang. 2nd',
		value: ['English'],
		curVal: 'English',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Subtitle Type',
		value: ['Normal', 'Hearing Impaired'],
		curVal: 'Normal',
		valType: 'sel',
		opera: true
	}
];
var gMenuSetupTeletext = [{
		name: 'Digital Teletext Language',
		value: ['English'],
		curVal: 'English',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Decoding Page Language',
		value: ['WEST EUR'],
		curVal: 'WEST EUR',
		valType: 'sel',
		opera: true
	},
	{
		name: 'TTX Presentation Level',
		value: ['Level 2.5', 'Level 1.5'],
		curVal: 'Level 2.5',
		valType: 'sel',
		opera: true
	}
];
var gMenuSetupCICM = [{
	name: 'No CI card presented',
	value: '',
	valType: 'num',
	opera: true
}];
var gMenuSetupCI = [{
		name: 'Cam Menu',
		value: gMenuSetupCICM,
		valType: 'list',
		opera: true
	},
	{
		name: 'RF Channel',
		value: ['Default'],
		curVal: 'Default',
		valType: 'sel',
		opera: true
	}
];
var gMenuSetupNetworkConf = [{
		name: 'Internet Connection',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Interface',
		value: ['Ethernet', 'Wireless', 'Ethernet'],
		curVal: 'Ethernet',
		valType: 'sel',
		opera: false
	},
	{
		name: 'Wake On Lan',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: false
	},
	{
		name: 'Wake On Wlan',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: false
	},
	{
		name: 'Wireless Setting',
		value: [],
		valType: 'list',
		opera: false
	},
	{
		name: 'Information',
		value: [],
		valType: 'scan',
		opera: false
	},
	{
		name: 'IP Setting',
		value: [],
		valType: 'scan',
		opera: false
	},
	{
		name: 'Connection Test',
		value: [],
		valType: 'scan',
		opera: false
	},
	{
		name: 'IP Prefer',
		value: ['IPv6', 'IPv4'],
		curVal: 'IPv6',
		valType: 'sel',
		opera: false
	},
	{
		name: 'IPv6 Information',
		value: [],
		valType: 'scan',
		opera: false
	},
	{
		name: 'IPv6 Configuration IP',
		value: [],
		valType: 'scan',
		opera: false
	},
	{
		name: 'IPv6 Connection Test',
		value: [],
		valType: 'scan',
		opera: false
	}
];
var gMenuSetupNetworkNetflix = [{
		name: 'Deactivate',
		value: [],
		valType: 'scan',
		opera: false
	},
	{
		name: 'ESN',
		value: [],
		valType: 'scan',
		opera: false
	}
];
var gMenuSetupNetworkApp = [{
		name: 'DLNA',
		value: ['Off'],
		curVal: 'Off',
		valType: 'sel',
		opera: false
	},
	{
		name: 'DMR',
		value: ['Off'],
		curVal: 'Off',
		valType: 'sel',
		opera: false
	},
	{
		name: 'Netflix',
		value: gMenuSetupNetworkNetflix,
		valType: 'list',
		opera: true
	}
];
var gMenuSetupNetwork = [{
		name: 'Configuration',
		value: gMenuSetupNetworkConf,
		curVal: 'Default',
		valType: 'sel',
		opera: true
	},
	{
		name: 'WFD',
		value: [],
		valType: 'scan',
		opera: true
	},
	{
		name: 'WIFI_DIRECT',
		value: [],
		valType: 'scan',
		opera: true
	},
	{
		name: 'Applications',
		value: gMenuSetupNetworkApp,
		valType: 'scan',
		opera: true
	}
];
var gMenuSetupBluetooth = [{
		name: 'Switch',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Bluetooth Setting',
		value: [],
		valType: 'scan',
		opera: true
	}
];
var gMenuSetupOAD = [{
		name: 'Manual OAD Download',
		value: [],
		valType: 'scan',
		opera: true
	},
	{
		name: 'Auto Download',
		value: ['YES', 'NO'],
		curVal: 'YES',
		valType: 'sel',
		opera: true
	}
];
var gMenuSetupRecord = [{
		name: 'Device Info',
		value: [],
		valType: 'scan',
		opera: true
	},
	{
		name: 'Schedule List',
		value: [],
		valType: 'scan',
		opera: true
	},
	{
		name: 'Time Shifting Mode',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	}
];
var gMenuSetupUpdate = [{
		name: 'Auto Channel Update',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Channel Update Message',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	}
];
var gMenuSetup = [{
		name: 'OSD Language',
		value: ['English', 'Vasco', 'Catalan', 'Hrvatski'],
		curVal: 'English',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Blue Mute',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Hot Boot',
		value: ['On', 'Off'],
		curVal: 'On',
		valType: 'sel',
		opera: true
	},
	{
		name: 'Interaction Channel',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'MHEG PIN Protection',
		value: ['Off', 'On'],
		curVal: 'Off',
		valType: 'sel',
		opera: true
	},
	{
		name: 'HbbTV Settings',
		value: gMenuSetupHbbTV,
		valType: 'list',
		opera: true
	},
	{
		name: 'Time Setup',
		value: gMenuSetupTS,
		valType: 'list',
		opera: true
	},
	{
		name: 'HDMI2.0 Setting',
		value: gMenuSetupHDMI,
		valType: 'list',
		opera: true
	},
	{
		name: 'DivX(R) Registration',
		value: 'gMenuSetupDivXR',
		valType: 'scan',
		opera: true
	},
	{
		name: 'DivX(R) Deactivation',
		value: 'gMenuSetupDivXD',
		valType: 'scan',
		opera: true
	},
	{
		name: 'Subtitle',
		value: gMenuSetupSubtitle,
		valType: 'list',
		opera: true
	},
	{
		name: 'Teletext',
		value: gMenuSetupTeletext,
		valType: 'list',
		opera: true
	},
	{
		name: 'Common Interface',
		value: gMenuSetupCI,
		valType: 'list',
		opera: true
	},
	{
		name: 'Network',
		value: gMenuSetupNetwork,
		valType: 'list',
		opera: true
	},
	{
		name: 'Bluetooth',
		value: gMenuSetupBluetooth,
		valType: 'list',
		opera: true
	},
	{
		name: 'OAD',
		value: gMenuSetupOAD,
		valType: 'list',
		opera: true
	},
	{
		name: 'Version Info',
		value: [],
		valType: 'scan',
		opera: true
	},
	{
		name: 'License Info',
		value: [],
		valType: 'scan',
		opera: true
	},
	{
		name: 'Record Setting',
		value: gMenuSetupRecord,
		valType: 'list',
		opera: true
	},
	{
		name: 'Channel Update',
		value: gMenuSetupUpdate,
		valType: 'list',
		opera: true
	},
	{
		name: 'System Information',
		value: [],
		valType: 'scan',
		opera: true
	},
	{
		name: 'Reset Default',
		value: [],
		valType: 'scan',
		opera: true
	}
];

//parental下所有数据
var gMenuParental = [{
	name: 'Password',
	value: 'password',
	valType: 'str'
}];

//主目录menu
var Menu = [{
		name: 'Video',
		value: gMenuVideo,
		valType: 'list',
		opera: true
	},
	{
		name: 'Audio',
		value: gMenuAudio,
		valType: 'list',
		opera: true
	},
	{
		name: 'TV',
		value: gMenuTv,
		valType: 'list',
		opera: true
	},
	{
		name: 'Setup',
		value: gMenuSetup,
		valType: 'list',
		opera: true
	},
	{
		name: 'Parental',
		value: gMenuParental,
		valType: 'list',
		opera: true
	}
];
var gMenuPageName='list';

