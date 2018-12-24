var addBissKey = {
	render: function() {
		var html = `
		<div id="addBissKey">
			<div class="listItem focus">
				<div>Frequency</div>
				<div>输入框</div>
			</div>
			<div class="listItem">
				<div>Symbol Rate(Ksym/s)</div>
				<div>输入框</div>
			</div>
			<div class="listItem">
				<div>Polarization</div>
				<div>选项</div>
			</div>
			<div class="listItem">
				<div>Service ID</div>
				<div>输入框</div>
			</div>
			<div class="listItem">
				<div>CW key</div>
				<div>输入框</div>
			</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			returnListPage();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var bissKey = {
	render: function() {
		var html = `
		<div id="bissKey">
			<div class="listItem focus">Add BISS key.</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			addBissKey.render();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var bluetoothSetting = {
	render: function() {
		var html = `
		<div id="bluetoothSetting">
			<div>Bluetooth Setting</div>
			<div>
				<div class="listItem focus">Scan</div>
				<div class="listItem">Devices</div>
				<div class="listItem">KeyCode:</div>
			</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex != 0) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex != curList.length - 1) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var camMenu = {
	render: function() {
		var html = `
		<div id="camMenu">
			<div class="listItem focus">No CI card presented.</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var connectionTest = {
	render: function() {
		var html = `
		<div id="connectionTest">
			
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var divXDeactivation = {
	render: function(value) {
		if(gMenuPageName == 'divXDeactivationOk') {
			var html = `
		<div id="divXRegistration">
			<div>You must register your device to play DivX® protected videos.</div>
			<div>Registration Code:</div>
			<div>Register at http://vod.divx.com</div>
			<div class="sure">OK</div>
		</div>
	`;
		} else {
			var html = `
		<div id="divXDeactivation">
			<div>Deregistration code:</div>
			<div>Deregister at http://vod.divx.com</div>
			<div>Continue width registration?</div>
			<div class="btn">
				<span class="item focus ok">OK</span>
				<span class="item cancel">Cancel</span>
			</div>
		</div>
	`;
		}
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		console.log(gMenuPageName);
		var curFocus = document.querySelector(".focus");
		var curList = document.querySelector(".btn").children;
		var curIndex = [].indexOf.call(curList, curFocus);
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(curIndex == 0) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curList.length - 1], 'focus');
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(curIndex == curList.length - 1) {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[0], 'focus');
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			if(hasClass(curFocus, 'cancel')) {
				returnListPage();
			} else {
				gMenuPageName = 'divXDeactivationOk';
				this.render();
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	},
	keyEventOK: function(e) {
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var divXRegistration = {
	render: function() {
		var html = `
		<div id="divXRegistration">
			<div>You register your device to play DivX® protected videos.</div>
			<div>Register Code:7QBUBDC7GV</div>
			<div>Registration http://vod.divx.com</div>
			<div class="sure">OK</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			document.querySelector('#container').innerHTML = `
				<div id="list">
					<div class="firstList">
					</div>
					<div class="secondList">
					</div>
				</div>
			`;
			gMenuRenderFirst();
			gMenuRenderSecond();
			addClass(document.querySelector('.' + gMenuClassName + '').children[gMenuoIndex], 'focus');
			changePage(gMenuoIndex, gMenuClassName);
			gMenuPageName = 'list';
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var ESN = {
	render: function() {
		var html = `
		<div id="ESN">
			
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {

	}
}

var Information = {
	render: function() {
		window.gSocket.send({
			"method": "mtk.webui.network.queryInternetInformation"
		}, function(data) {
			//			console.log(data);
			if(data.error.code == 0) {
				window.gSocket.send({
					"method": 'mtk.webui.network.queryAddressType'
				}, function(data1) {
					//					console.log(data1);
					var html = `
					<div id="Information">
						<div>
							<span>Interface</span>
							<span>${gMenuSetupNetworkConf[1].value.data[gMenuSetupNetworkConf[1].curVal]}</span>
						</div>
						<div>
							<span>Address Type</span>
							<span>${data1.result.type.toUpperCase()}</span>
						</div>
						<div>
							<span>IP Address</span>
							<span>${data.result.ip}</span>
						</div>
						<div>
							<span>Subnet Mask</span>
							<span>${data.result.netmask}</span>
						</div>
						<div>
							<span>Default Gateway</span>
							<span>${data.result.gateway}</span>
						</div>
						<div>
							<span>Primary DNS</span>
							<span>${data.result['1stDNS']}</span>
						</div>
						<div>
							<span>Secondary DNS</span>
							<span>${data.result['2ndDNS']}</span>
						</div>
						<div>
							<span>Ethernet MAC</span>
							<span>${data.result.ip}</span>
						</div>
					</div>
				`;
					document.querySelector('#container').innerHTML = html;
				});
			}
		});
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var IPSetting = {
	render: function() {
		window.gSocket.send({
			"method": 'mtk.webui.network.queryAddressType'
		}, function(data) {
			console.log(data);
			var html = ``;
			document.querySelector('#container').innerHTML = html;
		});
	}
}

var IPv6Information = {
	render: function() {
		window.gSocket.send({
			"method": "mtk.webui.network.queryIPv6Information"
		}, function(data) {
			//						console.log(data);
			if(data.error.code == 0) {
				window.gSocket.send({
					"method": 'mtk.webui.network.queryAddressType'
				}, function(data1) {
					//					console.log(data1);
					if(data.error.code == 0) {
						window.gSocket.send({
							"method": 'mtk.webui.network.queryIPv6DNSType'
						}, function(data2) {
							if(data.error.code == 0) {
								//								console.log(data2);
								var html = `
									<div id="Information">
										<div>
											<span>Interface</span>
											<span>${gMenuSetupNetworkConf[1].value.data[gMenuSetupNetworkConf[1].curVal]}</span>
										</div>
										<div>
											<span>Address Type</span>
											<span>${data1.result.type.toUpperCase()}</span>
										</div>
										<div>
											<span>IP Address</span>
											<span>${data.result.ipv6}</span>
										</div>
										<div>
											<span>Length of Prefix</span>
											<span>${data.result.lenOfPrefix}</span>
										</div>
										<div>
											<span>Default Gateway</span>
											<span>${data.result.gateway}</span>
										</div>
										<div>
											<span>DNS Type</span>
											<span>${data2.result.type.toUpperCase()}</span>
										</div>
										<div>
											<span>Primary DNS</span>
											<span>${data.result['1stDNS']}</span>
										</div>
										<div>
											<span>Secondary DNS</span>
											<span>${data.result['2ndDNS']}</span>
										</div>
									</div>
								`;
								document.querySelector('#container').innerHTML = html;
							}
						})
					}
				});
			}
		});
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var IPv6ConfigurationIP = {
	render: function() {
		window.gSocket.send({
			"method": 'mtk.webui.network.queryAddressType'
		}, function(data1) {
			//					console.log(data1);
			if(data.error.code == 0) {
				window.gSocket.send({
					"method": 'mtk.webui.network.queryIPv6DNSType'
				}, function(data2) {
					if(data.error.code == 0) {
						//								console.log(data2);
						var html = ``;
						document.querySelector('#container').innerHTML = html;
					}
				})
			}
		});
	}
}

var systemInformation = {
	render: function() {
		var html = `
		<div id="systemInformation">
			systemInformation
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var systemInformation = {
	render: function() {
		var html = `
		<div id="systemInformation">
			systemInformation
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var versionInfo = {
	render: function() {
		var html = `
		<div id="versionInfo">
			<div class="versionInfo">
				<div>Model Name:</div>
				<div>eu_linux</div>
			</div>
			<div class="versionInfo">
				<div>Version:</div>
				<div></div>
			</div>
			<div class="versionInfo">
				<div>Serial Number:</div>
				<div></div>
			</div>
			<div class="versionInfo">
				<div>Website:</div>
				<div></div>
			</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var WFD = {
	render: function() {
		var html = `
		<div id="WFD">
			
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {

	}
}

var WIFI_DIRECT = {
	render: function() {
		var html = `
		<div id="WIFI_DIRECT">
			
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {

	}
}

var wirelessSetting = {
	render: function() {
		var html = `
		<div id="wirelessSetting">
			<div>Wireless Setting</div>
			<div>There is no wireless device connected to TV!</div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}