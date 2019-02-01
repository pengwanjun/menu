// import { resolve } from "path";
// import { rejects } from "assert";

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
		document.querySelector('#showList').innerHTML = html;
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
		document.querySelector('#showList').innerHTML = html;
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
		document.querySelector('#showList').innerHTML = html;
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
		document.querySelector('#showList').innerHTML = html;
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
			document.querySelector('#showList').innerHTML = html;
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
			document.querySelector('#showList').innerHTML = html;
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
					<div class="content">
						<div>You must register your device to play DivX® protected videos.</div>
						<div>Registration Code:</div>
						<div>Register at http://vod.divx.com</div>
					</div>
					<div class="btn">
						<div class="sure focus">OK</div>
					</div>
				</div>
			`;
		} else {
			var html = `
				<div id="divXRegistration">
					<div class="content">
						<div>Deregistration code:</div>
						<div>Deregister at http://vod.divx.com</div>
						<div>Continue width registration?</div>
					</div>
					<div class="btn">
						<div class="item focus ok">OK</div>
						<div class="item cancel">Cancel</div>
					</div>
				</div>
			`;
		}
		document.querySelector('#showList').innerHTML = html;
	},
	keyEvent: function(e) {
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
			reRenderList();
		}
	},
	keyEventOK: function(e) {
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			reRenderList();
		}
	}
}

var divXRegistration = {
	render: function() {
		var html = `
		<div id="divXRegistration">
			<div class="content">
				<div>You register your device to play DivX® protected videos.</div>
				<div>Register Code:7QBUBDC7GV</div>
				<div>Registration http://vod.divx.com</div>
			</div>
			<div class="btn">
				<div class="sure focus">OK</div>
			</div>
		</div>
	`;
		document.querySelector('#showList').innerHTML = html;
	},
	keyEvent: function(e) {
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			reRenderList();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			reRenderList();
		}
	}
}

var ESN = {
	render: function() {
		var html = `
		<div id="ESN">
			Not available.
		</div>
	`;
		document.querySelector('#showList').innerHTML = html;
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
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
					<div id="Information" class="scanList">
						<div class="listItem">
							<div class="lf">Interface</div>
							<div class="mid"></div>
							<div class="rt">${gMenuSetupNetworkConf[1].value.data[gMenuSetupNetworkConf[1].curVal]}</div>
						</div>
						<div class="listItem">
							<div class="lf">Address Type</div>
							<div class="mid"></div>
							<div class="rt">${type}</div>
						</div>
						<div class="listItem">
							<div class="lf">IP Address</div>
							<div class="mid"></div>
							<div class="rt">${data.result.ip}</div>
						</div>
						<div class="listItem">
							<div class="lf">Subnet Mask</div>
							<div class="mid"></div>
							<div class="rt">${data.result.netmask}</div>
						</div>
						<div class="listItem">
							<div class="lf">Default Gateway</div>
							<div class="mid"></div>
							<div class="rt">${data.result.gateway}</div>
						</div>
						<div class="listItem">
							<div class="lf">Primary DNS</div>
							<div class="mid"></div>
							<div class="rt">${data.result['1stDNS']}</div>
						</div>
						<div class="listItem">
							<div class="lf">Secondary DNS</div>
							<div class="mid"></div>
							<div class="rt">${data.result['2ndDNS']}</div>
						</div>
						<div class="listItem">
							<div class="lf">Ethernet MAC</div>
							<div class="mid"></div>
							<div class="rt">${data.result.MACAddr}</div>
						</div>
					</div>
				`;
					document.querySelector('#showList').innerHTML = html;
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
		document.querySelector('#showList').innerHTML = html;
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
									<div id="IPv6Information" class="scanList">
										<div class="listItem">
											<div class="lf">Interface</div>
											<div class="mid"></div>
											<div class="rt">${gMenuSetupNetworkConf[1].value.data[gMenuSetupNetworkConf[1].curVal]}</div>
										</div>
										<div class="listItem">
											<div class="lf">Address Type</div>
											<div class="mid"></div>
											<div class="rt">${addrType}</div>
										</div>
										<div class="listItem">
											<div class="lf">IP Address</div>
											<div class="mid"></div>
											<div class="rt">${data.result.ipv6}</div>
										</div>
										<div class="listItem">
											<div class="lf">Length of Prefix</div>
											<div class="mid"></div>
											<div class="rt">${data.result.lenOfPrefix}</div>
										</div>
										<div class="listItem">
											<div class="lf">Default Gateway</div>
											<div class="mid"></div>
											<div class="rt">${data.result.gateway}</div>
										</div>
										<div class="listItem">
											<div class="lf">DNS Type</div>
											<div class="mid"></div>
											<div class="rt">${dnsType}</div>
										</div>
										<div class="listItem">
											<div class="lf">Primary DNS</div>
											<div class="mid"></div>
											<div class="rt">${data.result['1stDNS']}</div>
										</div>
										<div class="listItem">
											<div class="lf">Secondary DNS</div>
											<div class="mid"></div>
											<div class="rt">${data.result['2ndDNS']}</div>
										</div>
										<div class="listItem">
											<div class="lf">Ethernet MAC</div>
											<div class="mid"></div>
											<div class="rt">${data.result['MACAddr']}</div>
										</div>
									</div>
								`;
						document.querySelector('#showList').innerHTML = html;

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
				document.querySelector('#showList').innerHTML = html;
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
		var configIds=[
			'g_menu__sys_info_ch_name',
			'g_menu__sys_info_pre_viterbi',
			'g_menu__sys_info_c_n',
			'g_menu__sys_info_uce',
			'g_menu__sys_info_ber',
			'g_menu__sys_info_5s',
			'g_menu__sys_info_agc',
			'g_menu__sys_info_pre_rs',
			'g_menu__sys_info_sym_rate',
			'g_menu__sys_info_modulation',
			'g_menu__sys_info_ch_freq',
			'g_menu__sys_info_prog',
			'g_menu__sys_info_service_id',
			'g_menu__sys_info_ts_id',
			'g_menu__sys_info_on_id',
			'g_menu__sys_info_network_id'
		];
		var allPromises=[];
		for(var i in configIds){
			allPromises.push(
				new Promise((resolve, reject) => {
					window.gSocket.send({
						"method": "mtk.webui.config.queryValue",
						"params": {
							"configId": [configIds[i]]
						}
					}, function(data) {
						resolve(data);
					})
				})
			);
		}
		allPromises.push(
			new Promise((resolve,rehect)=>{
				window.gSocket.send({
					"method":"mtk.webui.broadcast.querySignalInfo"
				}, function(data) {
					resolve(data);
				})
			})
		)
		Promise.all(allPromises).then(res=>{
			console.log(res);
			var list=[],signal={};
			for(var r in res){
				if(res[r].error.code==0){
					if(r==res.length-1){
						signal=res[r].result;
					}else{
						list.push(res[r].result[0].current);
					}
				}else{
					console.log(res);
				}
			}
			console.log(list);
			var html = `
				<div id="systemInformation">
					<div class="scanProgress">
						<div class="scanProgressItem">
							<div class="lf">Signal Quality</div>
							<div class="mid">
								<div class="progress">
									<div style="width: ${signal.quality/100*30}rem;" class="front"></div>
								</div>
							</div>
							<div class="rt">${(Math.round((signal.quality /100) * 10000) / 100.00)}%</div>
						</div>
						<div class="scanProgressItem">
							<div class="lf">Signal Level</div>
							<div class="mid">
								<div class="progress">
									<div style="width: ${signal.level/100*30}rem;" class="front"></div>
								</div>
							</div>
							<div class="rt">${(Math.round((signal.level /100) * 10000) / 100.00)}%</div>
						</div>
					</div>
					<div class="sysInfoList">
						<div class="sysInfoListItem">
							<div class="name">Channel:</div>
							<div class="value">${list[0]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">Frequency:</div>
							<div class="value">${list[10]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">Pre Viterbi:</div>
							<div class="value">${list[1]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">Prog:</div>
							<div class="value">${list[11]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">C/N:</div>
							<div class="value">${list[2]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">Service ID:</div>
							<div class="value">${list[12]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">UEC:</div>
							<div class="value">${list[3]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">TS ID:</div>
							<div class="value">${list[13]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">Post Viterbi:</div>
							<div class="value">${list[4]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">ON IDi:</div>
							<div class="value">${list[14]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">5S:</div>
							<div class="value">${list[5]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">Network ID:</div>
							<div class="value">${list[15]}</div>
						</div>
						<div class="sysInfoListItem">
							<div class="name">AGC:</div>
							<div class="value">${list[6]}</div>
						</div>
					</div>
				</div>
			`;
			document.querySelector('#showList').innerHTML = html;
			document.querySelector('.menuOperate').innerHTML=`
				<div class="operaExit">Back</div>
			`;
			gMenuPageName = 'systemInformation';
		}).catch(function(reason) {
			console.log(reason);
		});
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
				<div id="versionInfo" class="scanList">
					<div class="listItem">
						<div class="lf">Model Name:</div>
						<div class="mid">${data.result.modelName}</div>
						<div class="rt"></div>
					</div>
					<div class="listItem">
						<div class="lf">Version:</div>
						<div class="mid">${data.result.version}</div>
						<div class="rt"></div>
					</div>
					<div class="listItem">
						<div class="lf">Serial Number:</div>
						<div class="mid">${data.result.serialNumber}</div>
						<div class="rt"></div>
					</div>
					<div class="listItem">
						<div class="lf">Website:</div>
						<div class="mid">${data.result.website}</div>
						<div class="rt"></div>
					</div>
				</div>
			`;
			document.querySelector('#showList').innerHTML = html;
			document.querySelector('.menuOperate').innerHTML=`
				<div class="operaExit">Back</div>
			`;
			gMenuPageName = 'systemInformation';
		});
	},
	keyEvent: function(e) {
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}


var wirelessScanResult={
	obj:{},
	prevPage:'',
	render:function(prevPage,thisObj,pwd){
		this.obj=thisObj;
		this.prevPage=prevPage;
		if(pwd==''){			
			var html=`
				<div id="wirelessScan">
					<div class="scanTitle">Wireless Setting</div>
					<div class="scanContent">
						<div>Invalid WPA Key, Please check it.</div>
					</div>
					<div class="scanOperate">
						<div>Previous</div>
						<div>input</div>
						<div>Next</div>
						<div>Cancel</div>
					</div>
				</div>							
			`;	
		}else{
			var html=`
				<div id="wirelessScan">
					<div class="scanTitle">Wireless Setting</div>
					<div class="scanContent">
						<div>TV is connecting the AP</div>
						<div>Please wait...</div>
					</div>
					<div class="scanOperate">
						<div>Previous</div>
						<div>input</div>
						<div>Next</div>
						<div>Cancel</div>
					</div>
				</div>							
			`;	
			window.gSocket.send({
				"method": "mtk.webui.network.queryWirelessAssociate",
				"param": {
					"ssid": this.obj.ssid,
					"password": pwd
				}
			}, (data) => {
				console.log(data);
				if(data.param.ret=='success'){
					
				}else{					
					document.querySelector('.scanContent').innerHTML =`
						<div>No match Access Point is found. Please try again.</div>
					`;
				}
			});
		}
		document.querySelector('#container').innerHTML =html;
	},
	keyEvent:function(e){	
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(this.prevPage=='wirelessManualSecurity'){
				gMenuPageName='wirelessManualSecurity';
				wirelessManualSecurity.render(this.obj.ssid);
			}else{
				gMenuPageName='wirelessScanKey';
				wirelessScanKey.render(this.prevPage,this.obj);
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var wirelessScanKey={
	obj:{},
	prevPage:'',
	render:function(prevPage,obj){
		this.obj=obj;
		this.prevPage=prevPage;
		var html=`
			<div id="wirelessScan">
				<div class="scanTitle">Wireless Setting</div>
				<div class="scanContent">
					<div>Please input ${this.obj.security} key</div>
					<div class="inputkey"></div>
				</div>
				<div class="scanOperate">
					<div>Previous</div>
					<div>input</div>
					<div>Next</div>
					<div>Cancel</div>
				</div>
			</div>							
		`;	
		document.querySelector('#container').innerHTML =html;
	},
	keyEvent:function(e){	
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(this.prevPage=='wirelessSettingScan'){
				gMenuPageName='wirelessSettingScan';
				wirelessSettingScan.render();
			}else{
				gMenuPageName='wirelessSetting';
				wirelessSetting.render();
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			document.querySelector('.inputkey').innerHTML+=e.key;	
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			gMenuPageName='wirelessScanResult';
			wirelessScanResult.render(this.prevPage,this.obj,document.querySelector('.inputkey').innerHTML);			
		}
	}
}

var wirelessSettingScan ={
	render:function(){			
		document.querySelector('#container').innerHTML = `
			<div>TV is scanning APs</div>
			<div>Please wait...</div>
		`;
		window.gSocket.send({
			"method": "mtk.webui.network.queryWirelessScan"
		}, (data) => {
			if(gMenuPageName=='wirelessSettingScan'){
				console.log(data);
				var html1=`
					<div id="wirelessScan">
						<div class="scanTitle">Wireless Setting</div>
						<div class="scanContent">
							<div class="scanGuide">
								<div class="ssid">SSID</div>
								<div class="security">Security</div>
								<div class="signal">Signal</div>
							</div>
							<div class="listContent">
								<div class="scanList">
				`;
				var html2=``;
				for(var i=0;i<data.param.scanlist.length;i++){
					if(i==0){
						html2+=`	
							<div class="listItem focus">
								<div class="ssid">${data.param.scanlist[i].ssid}</div>
								<div class="security">${data.param.scanlist[i].security}</div>
								<div class="signal">${data.param.scanlist[i].signal}</div>
							</div>
						`;
					}else{					
						html2+=`	
							<div class="listItem">
								<div class="ssid">${data.param.scanlist[i].ssid}</div>
								<div class="security">${data.param.scanlist[i].security}</div>
								<div class="signal">${data.param.scanlist[i].signal}</div>
							</div>
						`;
					}
				}
				var html3=`				
								</div>
							</div>
						</div>
						<div class="scanOperate">
							<div>Previous</div>
							<div>Select</div>
							<div>Next</div>
							<div>Cancel</div>
						</div>
					</div>
				`;
				document.querySelector('#container').innerHTML =html1+html2+html3;
			}
		});
	},
	keyEvent:function(e){	
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {//左键
			gMenuPageName='wirelessSetting';
			wirelessSetting.render();
		}else if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {//exit---返回键
			returnListPage();
		}else{
			var curFocus = document.querySelector(".listItem.focus");
			var curList = document.querySelector("#wirelessScan").getElementsByClassName("listItem");
			var curIndex = [].indexOf.call(curList, curFocus);
			//下键
			if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
				if(curIndex != curList.length - 1) {
					addClass(curList[curIndex + 1], 'focus');
					removeClass(curFocus, 'focus');
					var floorIndex = Math.floor((curIndex + 1) / 9);
					document.querySelector('.scanList').style.top = -(floorIndex * 9 * Number(3)) + 'rem';
				}
			}
			//上键
			if(e.keyCode == KeyEvent.DOM_VK_UP) {
				if(curIndex != 0) {
					addClass(curList[curIndex - 1], 'focus');
					removeClass(curFocus, 'focus');
					var floorIndex = Math.floor((curIndex - 1) / 9);
					document.querySelector('.scanList').style.top = -(floorIndex * 9 * Number(3)) + 'rem';
				}
			}
			//enter键
			if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
				var obj={
					ssid:curFocus.querySelector('.ssid').innerHTML,
					security:curFocus.querySelector('.security').innerHTML
				}
				gMenuPageName='wirelessScanKey';
				wirelessScanKey.render('wirelessSettingScan',obj);
			}
		}
	}
}

var wirelessManualSSID={
	render:function(){
		var html=`
			<div id="wirelessScan">
				<div class="scanTitle">Wireless Setting</div>
				<div class="scanContent">
					<div>The valid length of SSID is 1~32 words.Please check the SSID.</div>
				</div>
				<div class="scanOperate">
					<div>Previous</div>
					<div>Set</div>
					<div>Next</div>
					<div>Cancel</div>
				</div>
			</div>							
		`;	
		document.querySelector('#container').innerHTML =html;
	},
	keyEvent:function(e){
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			gMenuPageName='wirelessSettingManual';
			wirelessSettingManual.render();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var wirelessManualSecurity={
	ssid:'',
	list:["NONE","WEP","WPA(AES)","WPA(TKIP)","WPA-PSK(AES)","WPA-PSK(TKIP)","WPA-PSK(AUTO)","WPA-EAP(AES)",
		"WPA-EAP(TKIP)","WPA-EAP(AUTO)","WPA2(AES)","WPA2(TKIP)","WPA2-PSK(AES)","WPA2-PSK(TKIP)","WPA2-PSK(AUTO)",
		"WPA2-EAP(AES)","WPA2-EAP(TKIP)","WPA2-EAP(AUTO)","WPA/WPA2-PSK(AES)","WPA/WPA2-PSK(TKIP)","WPA/WPA2-PSK(AUTO)"
	],
	render:function(ssid){
		this.ssid=ssid;
		var html1=`
			<div id="wirelessScan">
				<div class="scanTitle">Wireless Setting</div>
				<div class="scanContent">
					<div class="scanGuide">Please Select the Security Mode</div>
					<div class="listContent">
						<div class="scanList">
		`;
		var html2=``;
		for(var i=0;i<this.list.length;i++){
			if(i==0){
				html2+=`	
					<div class="listItem focus">${this.list[i]}</div>
				`;
			}else{					
				html2+=`	
					<div class="listItem">${this.list[i]}</div>
				`;
			}
		}
		var html3=`				
						</div>
					</div>
				</div>
				<div class="scanOperate">
					<div>Previous</div>
					<div>Select</div>
					<div>Next</div>
					<div>Cancel</div>
				</div>
			</div>
		`;
		document.querySelector('#container').innerHTML =html1+html2+html3;
	},
	keyEvent:function(e){	
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {//左键
			gMenuPageName='wirelessSettingManual';
			wirelessSettingManual.render();
		}else if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {//exit---返回键
			returnListPage();
		}else{
			var curFocus = document.querySelector(".listItem.focus");
			var curList = document.querySelector("#wirelessScan").getElementsByClassName("listItem");
			var curIndex = [].indexOf.call(curList, curFocus);
			//下键
			if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
				if(curIndex != curList.length - 1) {
					addClass(curList[curIndex + 1], 'focus');
					removeClass(curFocus, 'focus');
					var floorIndex = Math.floor((curIndex + 1) / 9);
					document.querySelector('.scanList').style.top = -(floorIndex * 9 * Number(3)) + 'rem';
				}
			}
			//上键
			if(e.keyCode == KeyEvent.DOM_VK_UP) {
				if(curIndex != 0) {
					addClass(curList[curIndex - 1], 'focus');
					removeClass(curFocus, 'focus');
					var floorIndex = Math.floor((curIndex - 1) / 9);
					document.querySelector('.scanList').style.top = -(floorIndex * 9 * Number(3)) + 'rem';
				}
			}
			//enter键
			if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
				if(curFocus.innerHTML=='NONE'){
					var thisObj={
						ssid:this.ssid,
						security:'NONE'
					}
					gMenuPageName='wirelessScanResult';
					wirelessScanResult.render('wirelessManualSecurity',thisObj,'');
				}else{
					var obj={
						ssid:this.ssid,
						security:curFocus.innerHTML
					}
					gMenuPageName='wirelessScanKey';
					wirelessScanKey.render('wirelessManualSecurity',obj);
				}
			}
		}
	}
}

var wirelessSettingManual={
	render:function(){
		var html=`
			<div id="wirelessScan">
				<div class="scanTitle">Wireless Setting</div>
				<div class="scanContent">
					<div>Please input SSID</div>
					<div class="inputkey"></div>
				</div>
				<div class="scanOperate">
					<div>Previous</div>
					<div>Set</div>
					<div>Next</div>
					<div>Cancel</div>
				</div>
			</div>							
		`;	
		document.querySelector('#container').innerHTML =html;
	},
	keyEvent:function(e){	
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			gMenuPageName='wirelessSetting';
			wirelessSetting.render();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			document.querySelector('.inputkey').innerHTML+=e.key;	
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			var length=document.querySelector('.inputkey').innerHTML.length;
			if(length<1 || length>32){
				gMenuPageName='wirelessManualSSID';
				wirelessManualSSID.render();
			}else{
				gMenuPageName='wirelessManualSecurity';
				wirelessManualSecurity.render(document.querySelector('.inputkey').innerHTML);	
			}		
		}
	}
}

var wirelessAutoPIN={
	render:function(){
		window.gSocket.send({
			"method":"mtk.webui.network.queryWirelessWPSPIN",
			"params":{"update":true}	
		},data=>{
			console.log(data);
			if(data.error.code==0){
				var html = `
					<div id="wirelessScan">
						<div class="scanTitle">Wireless Setting</div>
						<div class="scanContent">
							<div class="scanGuide">Please ensure the following PIN code is installed to the AP before you click the below 'Next' button.</div>
							<div class="listContent">
								<div class="scanList">
									<div class="listItem">PIN Code:[${data.result.PIN}]</div>
									<div class="listItem focus">Refresh PIN</div>
								</div>
							</div>
						</div>
						<div class="scanOperate">
							<div>Previous</div>
							<div>Next</div>
							<div>Cancel</div>
						</div>
					</div>
				`;
				document.querySelector('#container').innerHTML = html;
			}
		});
	},
	keyEvent:function(e){
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			gMenuPageName='wirelessSetting';
			wirelessSetting.render();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT){
			
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			this.render();
		}
	}
}

var wirelessAutoPBC={
	render:function(){
		var html = `
			<div id="wirelessScan">
				<div class="scanTitle">Wireless Setting</div>
				<div class="scanContent">
					<div class="scanGuide">Please press Push Button on the AP within 120 seconds after you click the below 'Next' button.</div>
				</div>
				<div class="scanOperate">
					<div>Previous</div>
					<div>Next</div>
					<div>Cancel</div>
				</div>
			</div>
		`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent:function(e){
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			gMenuPageName='wirelessSetting';
			wirelessSetting.render();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			
		}
	}
}

var wirelessSettingAuto={
	render:function(){
		var html = `
			<div id="wirelessScan">
				<div class="scanTitle">Wireless Setting</div>
				<div class="scanContent">
					<div class="scanGuide">
						<div>WPS(Wi-Fi Protected Setup)</div>
						<div>-PIN(Protected Identification Number)</div>
						<div>-PBC(Push Bottom Configuration)</div>
					</div>
					<div class="listContent">
						<div class="scanList">
							<div class="listItem focus">PIN</div>
							<div class="listItem">PBC</div>
						</div>
					</div>
				</div>
				<div class="scanOperate">
					<div>Previous</div>
					<div>Select</div>
					<div>Next</div>
					<div>Cancel</div>
				</div>
			</div>
		`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent:function(e){
		var curFocus = document.querySelector(".listItem.focus");
		var curList = document.querySelector("#wirelessScan").getElementsByClassName("listItem");
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex != curList.length - 1) {
				addClass(curList[curIndex + 1], 'focus');
				removeClass(curFocus, 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex != 0) {
				addClass(curList[curIndex - 1], 'focus');
				removeClass(curFocus, 'focus');
			}
		}
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			gMenuPageName='wirelessSetting';
			wirelessSetting.render();
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(curFocus.innerHTML=='PIN'){
				gMenuPageName='wirelessAutoPIN';
				wirelessAutoPIN.render();
			}
			if(curFocus.innerHTML=='PBC'){
				gMenuPageName='wirelessAutoPBC';
				wirelessAutoPBC.render();
			}
		}
	}
}

var wirelessSetting = {
	render: function() {
		var html = `
			<div id="wirelessSetting">
				<div>Wireless Setting</div>
				<div style="margin-top:1rem;">
					<div class="listItem focus">Scan</div>
					<div class="listItem">Manual</div>
					<div class="listItem">Auto</div>
				</div>
			</div>
		`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".listItem.focus");
		var curList = document.querySelector("#wirelessSetting").getElementsByClassName("listItem");
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				addClass(curList[0], 'focus');
				removeClass(curFocus, 'focus');
			} else {
				addClass(curList[curIndex + 1], 'focus');
				removeClass(curFocus, 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				addClass(curList[curList.length-1], 'focus');
				removeClass(curFocus, 'focus');
			} else {
				addClass(curList[curIndex - 1], 'focus');
				removeClass(curFocus, 'focus');
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(curFocus.innerHTML=='Scan'){
				gMenuPageName='wirelessSettingScan';
				wirelessSettingScan.render();
			}
			if(curFocus.innerHTML=='Manual'){
				gMenuPageName='wirelessSettingManual';
				wirelessSettingManual.render();
			}
			if(curFocus.innerHTML=='Auto'){
				gMenuPageName='wirelessSettingAuto';
				wirelessSettingAuto.render();
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

//timeSetupTime
var timeSetupTime= {
	autoSync: 'On',
	autoSyncDate:'2019/01/12',
	autoSyncTime:'23:58:58',
	onTimer: 'Off',
	offTimer:'Off',
	focusIndex: 0,
	timer:'',
	render: function() {
//		window.gSocket.send({
//			"method": 'mtk.webui.network.queryIPv6AddressType'
//		}, (data) => {
////			console.log(data);
//			if(data.error.code == 0) {
//				this.addrType = data.result.IPtype;
//				this.dnsType = data.result.DNStype;
//				var html = `
//							<div id="ipv6Config">
//								<div id="addrType"></div>
//								<div id="dnsType"></div>
//							</div>
//						`;
//				document.querySelector('#showList').innerHTML = html;
//				this.renderHtmlAutoSync();
//				this.renderHtmlOnTimer();
//				removeClass(document.querySelector('#dnsType').firstElementChild, 'focus');
//			}
//		});
		var html = `
			<div id="timeSetupTime">
				<div id="timeSetup" class="autoSync scanList"></div>
				<div id="timeSetup" class="onTimer scanList"></div>
				<div id="timeSetup" class="onChannel scanList">
					<div class="listItem disabled">
						<div class="lf">Power on Channel</div>
						<div class="mid"></div>
						<div class="rt"><span></span></div>
					</div>
				</div>
				<div id="timeSetup" class="offTimer scanList"></div>
			</div>
		`;
		document.querySelector('#showList').innerHTML = html;
		this.renderHtmlAutoSync();
		this.renderHtmlOnTimer();
		this.renderHtmlOffTimer();
//		this.getTime();
	},
	interval:function(){
		var theDate=new Date((Date.parse(this.autoSyncDate+' '+this.autoSyncTime)/1000+1)*1000);
		var _hour = String(theDate.getHours());		
		var _minute = theDate.getMinutes();		
		var _second = theDate.getSeconds();		
		var _year = theDate.getFullYear()		
		var _month = theDate.getMonth();		
		var _date = theDate.getDate();		
		if(_hour<10){_hour="0"+_hour;}		
		if(_minute<10){_minute="0"+_minute; }		
		if(_second<10){_second="0"+_second;}		
		_month = _month + 1;		
		if(_month < 10){_month = "0" + _month;}		
		if(_date<10){_date="0"+_date  }
//		return _year + "/" + _month + "/" + _date+' '+_hour + ":" + _minute + ":" + _second;
		console.log(document.getElementsByClassName('autoSyncTime'));
		console.log(_hour.split(''));
//		document.querySelector('#timeSetup.autoSync .autoSyncDate').innerHTML=_year + "/" + _month + "/" + _date;
//		document.querySelector('#timeSetup.autoSync .autoSyncTime').innerHTML=_hour + ":" + _minute + ":" + _second;
//		this.getTime();
	},
	getTime:function () {
		this.interval();
//		setInterval(()=>{
//			this.interval();
//		},1000);
	},
	renderHtmlAutoSync: function() {
		if(this.autoSync == "On") {
			var html1=`
				<div class="listItem setupSelect">
					<div class="lf">Auto Synchronization</div>
					<div class="mid">${this.autoSync}</div>
					<div class="rt"><span></span></div>
				</div>
				<div class="listItem disabled setupInput">
					<div class="lf">Date</div>
					<div class="mid">
			`;
			var html2=``;
			var date=this.autoSyncDate.split(' ');
			for(var i=0;i<date.length;i++){
				if(date[i]=='/'){					
					html2+=`${date[i]}`;
				}else{
					html2+=`<div class="inputItem autoSyncDate">${date[i]}</div>`;
				}
			}
			var html3=`
					</div>
					<div class="rt"></div>
				</div>
				<div class="listItem disabled setupInput">
					<div class="lf">Time</div>
					<div class="mid">
			`;
			var html4=``;
			var time=this.autoSyncTime.split('');
			for(var j=0;j<time.length;j++){
				if(time[j]==':'){					
					html4+=`${time[j]}`;
				}else{
					html4+=`<div class="inputItem autoSyncTime">${time[j]}</div>`;
				}
			};
			var html5=`
					</div>
					<div class="rt"></div>
				</div>
			`;
		} else {
			var html1=`
				<div class="listItem focus setupSelect">
					<div class="lf">Auto Synchronization</div>
					<div class="mid">${this.autoSync}</div>
					<div class="rt"><span></span></div>
				</div>
				<div class="listItem setupInput">
					<div class="lf">Date</div>
					<div class="mid">
			`;
			var html2=``;
			var date=this.autoSyncDate.split('');
			for(var i=0;i<date.length;i++){
				if(date[i]=='/'){					
					html2+=`${date[i]}`;
				}else{
					html2+=`<div class="inputItem autoSyncDate">${date[i]}</div>`;
				}
			}
			var html3=`
					</div>
					<div class="rt"></div>
				</div>
				<div class="listItem setupInput">
					<div class="lf">Time</div>
					<div class="mid">
			`;
			var html4=``;
			var time=this.autoSyncTime.split('');
			for(var j=0;j<time.length;j++){
				if(time[j]==':'){					
					html4+=`${time[j]}`;
				}else{
					html4+=`<div class="inputItem autoSyncTime">${time[j]}</div>`;
				}
			};
			var html5=`
					</div>
					<div class="rt"></div>
				</div>
			`;
		}
		document.querySelector('.autoSync').innerHTML = html1+html2+html3+html4+html5;
		if(this.focusIndex==0){
			addClass(document.querySelector('#timeSetupTime').getElementsByClassName('listItem')[0],'focus');
		}
	},
	renderHtmlOnTimer: function() {
		if(this.onTimer == 'Off') {
			var html = `
						<div class="listItem setupSelect">
							<div class="lf">Power On Timer</div>
							<div class="mid">${this.onTimer}</div>
							<div class="rt"><span></span></div>
						</div>
						<div class="listItem disabled setupInput">
							<div class="lf">Timer</div>
							<div class="mid">
								<div class="inputItem">0</div>
								<div class="inputItem">0</div> :
								<div class="inputItem">0</div>
								<div class="inputItem">0</div> :
								<div class="inputItem">0</div>
								<div class="inputItem">0</div>
							</div>
							<div class="rt"></div>
						</div>
					`;
		} else {
			var html = `
						<div class="listItem setupSelect">
							<div class="lf">Power On Timer</div>
							<div class="mid">${this.onTimer}</div>
							<div class="rt"><span></span></div>
						</div>
						<div class="listItem setupInput">
							<div class="lf">Timer</div>
							<div class="mid">
								<div class="inputItem">0</div>
								<div class="inputItem">0</div> :
								<div class="inputItem">0</div>
								<div class="inputItem">0</div> :
								<div class="inputItem">0</div>
								<div class="inputItem">0</div>
							</div>
							<div class="rt"></div>
						</div>
					`;
		}
		document.querySelector('.onTimer').innerHTML = html;
		if(this.focusIndex==3){
			addClass(document.querySelector('#timeSetupTime').getElementsByClassName('listItem')[3],'focus');
		}
	},
	renderHtmlOffTimer: function() {
		if(this.offTimer == 'Off') {
			var html = `
						<div class="listItem setupSelect">
							<div class="lf">Power Off Timer</div>
							<div class="mid">${this.offTimer}</div>
							<div class="rt"><span></span></div>
						</div>
						<div class="listItem disabled setupInput">
							<div class="lf">Timer</div>
							<div class="mid">
								<div class="inputItem">0</div>
								<div class="inputItem">0</div> :
								<div class="inputItem">0</div>
								<div class="inputItem">0</div> :
								<div class="inputItem">0</div>
								<div class="inputItem">0</div>
							</div>
							<div class="rt"></div>
						</div>
					`;
		} else {
			var html = `
						<div class="listItem setupSelect">
							<div class="lf">Power Off Timer</div>
							<div class="mid">${this.offTimer}</div>
							<div class="rt"><span></span></div>
						</div>
						<div class="listItem setupInput">
							<div class="lf">Timer</div>
							<div class="mid">
								<div class="inputItem">0</div>
								<div class="inputItem">0</div> :
								<div class="inputItem">0</div>
								<div class="inputItem">0</div> :
								<div class="inputItem">0</div>
								<div class="inputItem">0</div>
							</div>
							<div class="rt"></div>
						</div>
					`;
		}
		document.querySelector('.offTimer').innerHTML = html;
		if(this.focusIndex==6){
			addClass(document.querySelector('#timeSetupTime').getElementsByClassName('listItem')[6],'focus');
		}
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".listItem.focus");
		var allList = document.querySelector("#timeSetupTime").getElementsByClassName("listItem");
		var curList = [];
		for(var i = 0; i < allList.length; i++) {
			if(!(hasClass(allList[i], 'disabled'))) {
				curList.push(allList[i]);
			}
		}
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			var inputItems=document.querySelector("#timeSetupTime").getElementsByClassName("inputItem");
			for(var j=0;j<inputItems.length;j++){
				removeClass(inputItems[j],'inputFocus');
			}
			if(curIndex == curList.length - 1) {
				if(hasClass(curList[0],'setupInput')){
					addClass(curList[0].querySelector('.inputItem'),'inputFocus');
				}
				addClass(curList[0], 'focus');
				removeClass(curFocus, 'focus');
			} else {
				if(hasClass(curList[curIndex + 1],'setupInput')){
					addClass(curList[curIndex + 1].querySelector('.inputItem'),'inputFocus');
				}
				addClass(curList[curIndex + 1], 'focus');
				removeClass(curFocus, 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			var inputItems=document.querySelector("#timeSetupTime").getElementsByClassName("inputItem");
			for(var j=0;j<inputItems.length;j++){
				removeClass(inputItems[j],'inputFocus');
			}
			if(curIndex == 0) {
				if(hasClass(curList[curList.length-1],'setupInput')){
					addClass(curList[curList.length-1].querySelector('.inputItem'),'inputFocus');
				}
				addClass(curList[curList.length-1], 'focus');
				removeClass(curFocus, 'focus');
			} else {
				if(hasClass(curList[curIndex - 1],'setupInput')){
					addClass(curList[curIndex - 1].querySelector('.inputItem'),'inputFocus');
				}
				addClass(curList[curIndex - 1], 'focus');
				removeClass(curFocus, 'focus');
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER || e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(hasClass(curFocus, 'setupSelect')) {
				if(hasClass(curFocus.parentElement,'autoSync')){
					var arr=['On', 'Off'];
					var index=[].indexOf.call(arr,this.autoSync);
					var obj={
						name:'timeSetupTime',
						popName:'Auto Synchronization',
						value: {
							data: arr
						},
						curVal: index
					};
				}
				if(hasClass(curFocus.parentElement,'onTimer')){		
					var arr=['Off', 'On', 'Once'];
					var index=[].indexOf.call(arr,this.onTimer);
					var obj={
						name:'timeSetupTime',
						popName:'Power On Timer',
						value: {
							data: arr
						},
						curVal:index
					};
				}
				if(hasClass(curFocus.parentElement,'offTimer')){
					var arr=['Off', 'On', 'Once'];
					var index=[].indexOf.call(arr,this.offTimer);
					var obj={
						name:'timeSetupTime',
						popName:'Power Off Timer',
						value: {
							data: arr
						},
						curVal:index
					};
				}
				this.focusIndex=[].indexOf.call(allList, curFocus);
				showSelect.render(obj);
			}
			if(e.keyCode == KeyEvent.DOM_VK_RIGHT&&hasClass(curFocus, 'setupInput')){
				var inputList=curFocus.getElementsByClassName('inputItem');
				var inputFocus;
				var inputIndex;
				for(var l=0;l<inputList.length;l++){
					if(hasClass(inputList[l],'inputFocus')){
						inputFocus=inputList[l];
						inputIndex=l;
					}
				}
				if(inputIndex!=inputList.length-1){
					addClass(inputList[inputIndex+1],'inputFocus');
					removeClass(inputFocus,'inputFocus');
				}
			}
		}
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT){
			if(hasClass(curFocus, 'setupInput')){
				var inputList=curFocus.getElementsByClassName('inputItem');
				var inputFocus;
				var inputIndex;
				for(var l=0;l<inputList.length;l++){
					if(hasClass(inputList[l],'inputFocus')){
						inputFocus=inputList[l];
						inputIndex=l;
					}
				}
				if(inputIndex!=0){
					addClass(inputList[inputIndex-1],'inputFocus');
					removeClass(inputFocus,'inputFocus');
				}
			}
		}
		//数字键
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(hasClass(curFocus, 'setupInput')) {
				var inputList=curFocus.getElementsByClassName('inputItem');
				var inputFocus;
				var inputIndex;
				for(var l=0;l<inputList.length;l++){
					if(hasClass(inputList[l],'inputFocus')){
						inputFocus=inputList[l];
						inputIndex=l;
					}
				}
				inputList[inputIndex].innerHTML=e.key;
				if(inputIndex!=inputList.length-1){
					addClass(inputList[inputIndex+1],'inputFocus');
					removeClass(inputFocus,'inputFocus');
				}
			}
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}
