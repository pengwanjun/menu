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
		window.gSocket.send({
			"method": "mtk.webui.network.queryConnectionTest"
		}, function(data) {
			console.log(data);
			var html = `
							<div id="connectionTest">
								The network connection test is ${data.param.connection}!
							</div>
						`;
			document.querySelector('#container').innerHTML = html;
		});
		window.gSocket.addEventListener("mtk.webui.network.notify", (data) => {
			console.log(data);
		});
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var IPv6ConnectionTest = {
	render: function() {
		window.gSocket.send({
			"method": "mtk.webui.network.queryIPv6ConnectionTest"
		}, function(data) {
			console.log(data);
			var html = `
							<div id="connectionTest">
								The network connection test is ${data.param.connection}!
							</div>
						`;
			document.querySelector('#container').innerHTML = html;
		});
		window.gSocket.addEventListener("mtk.webui.network.notify", (data) => {
			console.log(data);
		});
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
					var type;
					if(data1.result.type == 'auto') {
						type = 'AUTO';
					} else {
						type = 'Manual';
					}
					var html = `
					<div id="Information">
						<div class="listItem">
							<span>Interface</span>
							<span>${gMenuSetupNetworkConf[1].value.data[gMenuSetupNetworkConf[1].curVal]}</span>
						</div>
						<div class="listItem">
							<span>Address Type</span>
							<span>${type}</span>
						</div>
						<div class="listItem">
							<span>IP Address</span>
							<span>${data.result.ip}</span>
						</div>
						<div class="listItem">
							<span>Subnet Mask</span>
							<span>${data.result.netmask}</span>
						</div>
						<div class="listItem">
							<span>Default Gateway</span>
							<span>${data.result.gateway}</span>
						</div>
						<div class="listItem">
							<span>Primary DNS</span>
							<span>${data.result['1stDNS']}</span>
						</div>
						<div class="listItem">
							<span>Secondary DNS</span>
							<span>${data.result['2ndDNS']}</span>
						</div>
						<div class="listItem">
							<span>Ethernet MAC</span>
							<span>${data.result.MACAddr}</span>
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
	addrType: '',
	render: function() {
		window.gSocket.send({
			"method": 'mtk.webui.network.queryAddressType'
		}, (data) => {
			if(data.error.code == 0) {
				this.addrType = data.result.type;
				this.renderHtml();
			}
		});
	},
	renderHtml: function() {
		if(this.addrType == "auto") {
			var html = `
						<div id="IPSetting" class="IPSetting">
							<div class="listItem focus">
								<div class="label">Address Type</div>
								<div class="content">
									<div>AUTO</div>
									<div>></div>
								</div>
							</div>
							<div class="listItem disabled">
								<div class="label">IP Address</div>
								<div class="content">
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
								</div>
							</div>
							<div class="listItem disabled">
								<div class="label">Subnet Mask</div>
								<div class="content">
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
								</div>
							</div>
							<div class="listItem disabled">
								<div class="label">Default Gateway</div>
								<div class="content">
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
								</div>
							</div>
							<div class="listItem disabled">
								<div class="label">Primary DNS</div>
								<div class="content">
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
								</div>
							</div>
							<div class="listItem disabled">
								<div class="label">Secondary DNS</div>
								<div class="content">
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
								</div>
							</div>
						</div>
					`;
		} else {
			var html = `
						<div id="IPSetting" class="IPSetting">
							<div class="listItem focus">
								<div class="label">Address Type</div>
								<div class="content">
									<div>Manual</div>
									<div>></div>
								</div>
							</div>
							<div class="listItem">
								<div class="label">IP Address</div>
								<div class="content">
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
								</div>
							</div>
							<div class="listItem">
								<div class="label">Subnet Mask</div>
								<div class="content">
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
								</div>
							</div>
							<div class="listItem">
								<div class="label">Default Gateway</div>
								<div class="content">
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
								</div>
							</div>
							<div class="listItem">
								<div class="label">Primary DNS</div>
								<div class="content">
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
								</div>
							</div>
							<div class="listItem">
								<div class="label">Secondary DNS</div>
								<div class="content">
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
									<div class="inputItem"><span>0</span>.</div>
								</div>
							</div>
						</div>
					`;
		}
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(hasClass(curFocus, 'listItem')) {
				if(this.addrType == 'manual') {
					if(curIndex == curList.length - 1) {
						addClass(curList[0], 'focus');
						removeClass(curFocus, 'focus');
					} else {
						addClass(curList[curIndex + 1], 'focus');
						removeClass(curFocus, 'focus');
					}
				}
			}
			if(hasClass(curFocus, 'inputItem')) {
				curFocus.firstElementChild.innerHTML = '';
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(hasClass(curFocus, 'listItem')) {
				if(this.addrType == 'manual') {
					if(curIndex == 0) {
						addClass(curList[curList.length - 1], 'focus');
						removeClass(curFocus, 'focus');
					} else {
						addClass(curList[curIndex - 1], 'focus');
						removeClass(curFocus, 'focus');
					}
				}
			}
			if(hasClass(curFocus, 'inputItem')) {
				curFocus.firstElementChild.innerHTML = '';
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(hasClass(curFocus, 'listItem')) {
				if(curIndex == 0) {
					if(this.addrType == 'auto') {
						this.addrType = 'manual';
						this.renderHtml();
					} else {
						this.addrType = 'auto';
						this.renderHtml();
					}
				} else {
					addClass(curFocus.lastElementChild.firstElementChild, 'focus');
					removeClass(curFocus, 'focus');
				}
			}
			if(hasClass(curFocus, 'inputItem')) {
				if(curIndex == curList.length - 1) {
					addClass(curList[0], 'focus');
					removeClass(curFocus, 'focus');
				} else {
					addClass(curList[curIndex + 1], 'focus');
					removeClass(curFocus, 'focus');
				}
			}
		}
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(hasClass(curFocus, 'listItem')) {
				if(curIndex == 0) {
					if(this.addrType == 'auto') {
						this.addrType = 'manual';
						this.renderHtml();
					} else {
						this.addrType = 'auto';
						this.renderHtml();
					}
				}
			}
			if(hasClass(curFocus, 'inputItem')) {
				if(curIndex == 0) {
					addClass(curList[curList.length - 1], 'focus');
					removeClass(curFocus, 'focus');
				} else {
					addClass(curList[curIndex - 1], 'focus');
					removeClass(curFocus, 'focus');
				}
			}
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(hasClass(curFocus, 'inputItem')) {
				if(curFocus.firstElementChild.innerHTML.length < 3) {
					curFocus.firstElementChild.innerHTML += e.key;
				} else {
					curFocus.firstElementChild.innerHTML = e.key;
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(hasClass(curFocus, 'listItem')) {
				if(this.addrType == 'manual') {
					var arr = [];
					for(var i = 1; i < curList.length; i++) {
						var curItem = curList[i].lastElementChild;
						var item = '';
						for(var j = 0; j < curItem.children.length; j++) {
							item += (curItem.children[j].firstElementChild.innerHTML) + '.';
						}
						arr.push(item.slice(0, item.length - 1));
					}
					var msg = {
						"method": "mtk.webui.network.setAddressType",
						"params": {
							"type": "manual",
							"ip": arr[0],
							"netmask": arr[1],
							"gateway": arr[2],
							"1stDNS": arr[3],
							"2ndDNS": arr[4]
						}
					}
					window.gSocket.send(msg, (data) => {
						if(data.error.code == 0) {
							returnListPage();
						}
					});
				} else {
					returnListPage();
				}
			}
			if(hasClass(curFocus, 'inputItem')) {
				addClass(curFocus.parentElement.parentElement, 'focus');
				removeClass(curFocus, 'focus');
			}
		}
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
					"method": 'mtk.webui.network.queryIPv6AddressType'
				}, function(data1) {
					//					console.log(data1);
					if(data1.error.code == 0) {
						var addrType, dnsType;
						if(data1.result.IPtype == 'auto') {
							addrType = "AUTO";
						} else {
							addrType = 'Manual';
						}
						if(data1.result.DNStype == 'auto') {
							dnsType = 'AUTO';
						} else {
							dnsType = 'Manual';
						}
						var html = `
									<div id="Information">
										<div class="listItem">
											<span>Interface</span>
											<span>${gMenuSetupNetworkConf[1].value.data[gMenuSetupNetworkConf[1].curVal]}</span>
										</div>
										<div class="listItem">
											<span>Address Type</span>
											<span>${addrType}</span>
										</div>
										<div class="listItem">
											<span>IP Address</span>
											<span>${data.result.ipv6}</span>
										</div>
										<div class="listItem">
											<span>Length of Prefix</span>
											<span>${data.result.lenOfPrefix}</span>
										</div>
										<div class="listItem">
											<span>Default Gateway</span>
											<span>${data.result.gateway}</span>
										</div>
										<div class="listItem">
											<span>DNS Type</span>
											<span>${dnsType}</span>
										</div>
										<div class="listItem">
											<span>Primary DNS</span>
											<span>${data.result['1stDNS']}</span>
										</div>
										<div class="listItem">
											<span>Secondary DNS</span>
											<span>${data.result['2ndDNS']}</span>
										</div>
										<div class="listItem">
											<span>Ethernet MAC</span>
											<span>${data.result['MACAddr']}</span>
										</div>
									</div>
								`;
						document.querySelector('#container').innerHTML = html;

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
	addrType: '',
	dnsType: '',
	focusIndex: 0,
	render: function() {
		window.gSocket.send({
			"method": 'mtk.webui.network.queryIPv6AddressType'
		}, (data) => {
//			console.log(data);
			if(data.error.code == 0) {
				this.addrType = data.result.IPtype;
				this.dnsType = data.result.DNStype;
				var html = `
							<div id="ipv6Config">
								<div id="addrType"></div>
								<div id="dnsType"></div>
							</div>
						`;
				document.querySelector('#container').innerHTML = html;
				this.renderHtmlAddr();
				this.renderHtmlDNS();
				removeClass(document.querySelector('#dnsType').firstElementChild, 'focus');
			}
		});
	},
	renderHtmlAddr: function() {
		if(this.addrType == "auto") {
			var html = `
						<div class="listItem addrType focus">
								<div class="label">Address Type</div>
								<div class="content">
									<div>AUTO</div>
									<div>></div>
								</div>
							</div>
							<div class="listItem disabled">
								<div class="label">IP Address</div>
								<div class="content">
									<div class="inputItem addrTypeInput"></div>
								</div>
							</div>
							<div class="listItem disabled">
								<div class="label">Length Of Prefix</div>
								<div class="content">
									<div class="inputItem addrTypeInput"></div>
								</div>
							</div>
							<div class="listItem disabled">
								<div class="label">Default Gateway</div>
								<div class="content">
									<div class="inputItem addrTypeInput"></div>
								</div>
							</div>
					`;
		} else {
			var html = `
						<div class="listItem addrType focus">
								<div class="label">Address Type</div>
								<div class="content">
									<div>Manual</div>
									<div>></div>
								</div>
							</div>
							<div class="listItem">
								<div class="label">IP Address</div>
								<div class="content">
									<div class="inputItem addrTypeInput"></div>
								</div>
							</div>
							<div class="listItem">
								<div class="label">Length Of Prefix</div>
								<div class="content">
									<div class="inputItem addrTypeInput"></div>
								</div>
							</div>
							<div class="listItem">
								<div class="label">Default Gateway</div>
								<div class="content">
									<div class="inputItem addrTypeInput"></div>
								</div>
							</div>
					`;
		}
		document.querySelector('#addrType').innerHTML = html;
	},
	renderHtmlDNS: function() {
		if(this.dnsType == 'auto') {
			var html = `
						<div class="listItem dnsType focus">
								<div class="label">DNS Type</div>
								<div class="content">
									<div>AUTO</div>
									<div>></div>
								</div>
							</div>
							<div class="listItem disabled">
								<div class="label">Primary DNS</div>
								<div class="content">
									<div class="inputItem dnsTypeInput"></div>
								</div>
							</div>
							<div class="listItem disabled">
								<div class="label">Secondary DNS</div>
								<div class="content">
									<div class="inputItem dnsTypeInput"></div>
								</div>
							</div>
					`;
		} else {
			var html = `
						<div class="listItem dnsType focus">
								<div class="label">DNS Type</div>
								<div class="content">
									<div>Manual</div>
									<div>></div>
								</div>
							</div>
							<div class="listItem">
								<div class="label">Primary DNS</div>
								<div class="content">
									<div class="inputItem dnsTypeInput"></div>
								</div>
							</div>
							<div class="listItem">
								<div class="label">Secondary DNS</div>
								<div class="content">
									<div class="inputItem dnsTypeInput"></div>
								</div>
							</div>
					`;
		}
		document.querySelector('#dnsType').innerHTML = html;
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".focus");
		var allList = curFocus.parentElement.children;
		var curList = [];
		if(hasClass(curFocus, 'listItem')) {
			for(var i = 0; i < allList.length; i++) {
				if(!(hasClass(allList[i], 'disabled'))) {
					curList.push(allList[i]);
				}
			}
		} else {
			curList = allList;
		}
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(hasClass(curFocus, 'listItem')) {
				if(curFocus.parentElement.getAttribute('id') == 'addrType') {
					if(curIndex == curList.length - 1) {
						addClass(document.querySelector('#dnsType').firstElementChild, 'focus');
						removeClass(curFocus, 'focus');
					} else {
						addClass(curList[curIndex + 1], 'focus');
						removeClass(curFocus, 'focus');
					}
				}
				if(curFocus.parentElement.getAttribute('id') == 'dnsType') {
					if(curIndex == curList.length - 1) {
						addClass(document.querySelector('#addrType').firstElementChild, 'focus');
						removeClass(curFocus, 'focus');
					} else {
						addClass(curList[curIndex + 1], 'focus');
						removeClass(curFocus, 'focus');
					}
				}
			}
			if(hasClass(curFocus, 'inputItem')) {
				curFocus.innerHTML = '';
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(hasClass(curFocus, 'listItem')) {
				if(curFocus.parentElement.getAttribute('id') == 'addrType') {
					if(curIndex == 0) {
						if(this.dnsType == 'auto') {
							addClass(document.querySelector('#dnsType').firstElementChild, 'focus');
							removeClass(curFocus, 'focus');
						} else {
							addClass(document.querySelector('#dnsType').lastElementChild, 'focus');
							removeClass(curFocus, 'focus');
						}
					} else {
						addClass(curList[curIndex - 1], 'focus');
						removeClass(curFocus, 'focus');
					}
				}
				if(curFocus.parentElement.getAttribute('id') == 'dnsType') {
					if(curIndex == 0) {
						if(this.addrType == 'auto') {
							addClass(document.querySelector('#addrType').firstElementChild, 'focus');
							removeClass(curFocus, 'focus');
						} else {
							addClass(document.querySelector('#addrType').lastElementChild, 'focus');
							removeClass(curFocus, 'focus');
						}
					} else {
						addClass(curList[curIndex - 1], 'focus');
						removeClass(curFocus, 'focus');
					}
				}
			}
			if(hasClass(curFocus, 'inputItem')) {
				curFocus.innerHTML = '';
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(e.keyCode == KeyEvent.DOM_VK_ENTER && (hasClass(curFocus, 'addrType') || hasClass(curFocus, 'dnsType'))) {
				return;
			} else {
				if(hasClass(curFocus, 'listItem')) {
					if(hasClass(curFocus, 'addrType')) {
						var fIndex = [].indexOf.call(allList, curFocus);
						if(this.addrType == 'auto') {
							this.addrType = 'manual';
						} else {
							this.addrType = 'auto';
						}
						this.focusIndex = fIndex;
						this.renderHtmlAddr();
					} else if(hasClass(curFocus, 'dnsType')) {
						var fIndex = [].indexOf.call(allList, curFocus);
						if(this.dnsType == 'auto') {
							this.dnsType = 'manual';
						} else {
							this.dnsType = 'auto';
						}
						this.focusIndex = fIndex;
						this.renderHtmlDNS();
					} else {
						addClass(curFocus.lastElementChild.firstElementChild, 'focus');
						removeClass(curFocus, 'focus');
					}
				}
			}
		}
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(hasClass(curFocus, 'listItem')) {
				if(hasClass(curFocus, 'addrType')) {
					var fIndex = [].indexOf.call(allList, curFocus);
					if(this.addrType == 'auto') {
						this.addrType = 'manual';
					} else {
						this.addrType = 'auto';
					}
					this.focusIndex = fIndex;
					this.renderHtmlAddr();
				}
				if(hasClass(curFocus, 'dnsType')) {
					var fIndex = [].indexOf.call(allList, curFocus);
					if(this.dnsType == 'auto') {
						this.dnsType = 'manual';
					} else {
						this.dnsType = 'auto';
					}
					this.focusIndex = fIndex;
					this.renderHtmlDNS();
				}
			}
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(hasClass(curFocus, 'inputItem')) {
				curFocus.innerHTML += e.key;
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			if(hasClass(curFocus, 'listItem')) {
				var addrTypeInput = document.getElementsByClassName('addrTypeInput');
				var arrd = [];
				for(var i = 0; i < addrTypeInput.length; i++) {
					arrd.push(addrTypeInput[i].innerHTML);
				}
				var dnsTypeInput = document.getElementsByClassName('dnsTypeInput');
				var dns = [];
				for(var i = 0; i < dnsTypeInput.length; i++) {
					dns.push(dnsTypeInput[i].innerHTML);
				}
				var msg = {
					"method": "mtk.webui.network.setIPv6AddressType",
					"params": {
						"IPtype": this.addrType,
						"DNStype": this.dnsType,
						"ipv6": arrd[0],
						"lenOfPrefix": arrd[1],
						"gateway": arrd[2],
						"1stDNS": dns[0],
						"2ndDNS": dns[1]
					}
				};
				window.gSocket.send(msg, (data) => {
					if(data.error.code == 0) {
						returnListPage();
					}
				});
			}
			if(hasClass(curFocus, 'inputItem')) {
				addClass(curFocus.parentElement.parentElement, 'focus');
				removeClass(curFocus, 'focus');
			}
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
		window.gSocket.send({
			"method": "mtk.webui.system.queryVersionInfo"
		}, (data) => {
			var html = `
				<div id="versionInfo">
					<div class="versionInfo">
						<div>Model Name:</div>
						<div>${data.result.modelName}</div>
					</div>
					<div class="versionInfo">
						<div>Version:</div>
						<div>${data.result.version}</div>
					</div>
					<div class="versionInfo">
						<div>Serial Number:</div>
						<div>${data.result.serialNumber}</div>
					</div>
					<div class="versionInfo">
						<div>Website:</div>
						<div>${data.result.website}</div>
					</div>
				</div>
			`;
			document.querySelector('#container').innerHTML = html;
		});
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
		var p1 = new Promise((resolve, reject) => {
			window.gSocket.send({
				"method": "mtk.webui.network.queryWirelessStatus"
			}, (data) => {
				console.log(data);
			});
		});
		var p2 = new Promise((resolve, reject) => {
			window.gSocket.send({
				"method": "mtk.webui.network.queryWirelessScan"
			}, (data) => {
				console.log(data);
			});
		});
		var p3 = new Promise((resolve, reject) => {
			window.gSocket.send({
				"method": "mtk.webui.network.queryWirelessAssociate",
				"param": {
					"ssid": "mtktmp",
					"password": "12345678"
				}
			}, (data) => {
				console.log(data);
			});
		});
		Promise.all([p1, p2, p3]).then(res => {
			console.log(res);
		}).catch(function(reason) {
			console.log(reason);
		});
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