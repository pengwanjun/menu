var changePassword = {
	render: function() {
		var html = `
			<div id="changePassword">
				<div class="listItem focus new">
					<div>New Password</div>
					<div class="input" data-pwd=""></div>
				</div>
				<div class="listItem confirm">
					<div>Confirm Password</div>
					<div class="input" data-pwd=""></div>
				</div>
			</div>
		`;
		document.querySelector('#showList').innerHTML = html;
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector('.focus');
		var pwd = curFocus.children[1].getAttribute('data-pwd');
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(hasClass(curFocus, 'new')) {
				if(pwd.length == 3) {
					pwd += e.key;
					curFocus.children[1].innerHTML += '*';
					curFocus.children[1].setAttribute('data-pwd', pwd);
					removeClass(document.querySelector('.new'), 'focus');
					addClass(document.querySelector('.confirm'), 'focus');
				} else {
					pwd += e.key;
					curFocus.children[1].innerHTML += '*';
					curFocus.children[1].setAttribute('data-pwd', pwd);
				}
			} else {
				if(pwd.length == 3) {
					pwd += e.key;
					curFocus.children[1].innerHTML += '*';
					curFocus.children[1].setAttribute('data-pwd', pwd);
					if(pwd != document.querySelector('.new').children[1].getAttribute('data-pwd')) {
						alert('两次密码不一致！');
						document.querySelector('.confirm').children[1].setAttribute('data-pwd', '');
						document.querySelector('.confirm').children[1].innerHTML = '';
						document.querySelector('.new').children[1].setAttribute('data-pwd', '');
						document.querySelector('.new').children[1].innerHTML = '';
						removeClass(document.querySelector('.confirm'), 'focus');
						addClass(document.querySelector('.new'), 'focus');
					} else {
						window.gSocket.send({
							"method": "mtk.webui.config.setValue",
							"params": {
								"configId": "g_password__password",
								"value": pwd,
								"apply": true
							}
						},data=>{
							returnListPage();
						});
					}
				} else {
					pwd += e.key;
					curFocus.children[1].innerHTML += '*';
					curFocus.children[1].setAttribute('data-pwd', pwd);
				}
			}

		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
};

//Input Block
var inputBlock = {
	list: [],
	page: 0,
	value: [],
	focusIndex: 0,
	render: function() {
		window.gSocket.send({
			"method": "mtk.webui.input.querySourceInfo"
		}, (data) => {
			this.value = data.result.List;
			this.list = sliceArr(this.value, 9);
			this.renderData(this.focusIndex);
		});
	},
	renderData: function(fIndex) {
		var html = '<div id="channelSkip"><div class="channelSkip">';
		for(var i = 0; i < this.list[this.page].length; i++) {
			if(this.list[this.page][i].block) {
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div class="number">${this.list[this.page][i].index}</div>
							<div class="acName">${this.list[this.page][i].name}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div class="number">${this.list[this.page][i].index}</div>
							<div class="acName">${this.list[this.page][i].name}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
				}
			} else {
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div class="number">${this.list[this.page][i].index}</div>
							<div class="acName">${this.list[this.page][i].name}</div>
							<div class="sel">未选中</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div class="number">${this.list[this.page][i].index}</div>
							<div class="acName">${this.list[this.page][i].name}</div>
							<div class="sel">未选中</div>
						</div>`;
				}
			}
		}
		document.querySelector('#showList').innerHTML = html + '</div></div>';
		document.querySelector('.menuOperate').innerHTML=`
			<div class="operaEnter">Set</div>
			<div class="operaSelect">Select</div>
			<div class="operaExit">Back</div>
		`;
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				if(this.page == this.list.length - 1) {
					this.page = 0;
				} else {
					this.page++;
				}
				this.listIndex = 0;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				if(this.page == 0) {
					this.page = this.list.length - 1;
				} else {
					this.page--;
				}
				this.listIndex = this.list[this.page].length - 1;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(curIndex == curList.length - 1) {
				if(this.page == this.list.length - 1) {
					this.page = 0;
				} else {
					this.page++;
				}
				this.listIndex = this.list[this.page].length - 1;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curList.length - 1], 'focus');
			}
		}
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(curIndex == 0) {
				if(this.page == 0) {
					this.page = this.list.length - 1;
				} else {
					this.page--;
				}
				this.listIndex = 0;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[0], 'focus');
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			var msg = {
				"method": "mtk.webui.input.blockSource",
				"params": {
					"sourceId": this.list[this.page][curIndex].index,
					"block": !this.list[this.page][curIndex].block
				}
			}
			window.gSocket.send(msg, (data) => {
				if(data.error.code == 0) {
					this.focusIndex = curIndex;
					this.render();
				}
			});
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

//Input Skip

var inputSkip = {
	list: [],
	page: 0,
	value: [],
	focusIndex: 0,
	render: function() {
		window.gSocket.send({
			"method": "mtk.webui.input.querySourceInfo"
		}, (data) => {
			this.value = data.result.List;
			for(var i = 0; i < this.value.length; i++) {
				if(this.value[i].index == data.result.curMainVal) {
					this.value.splice(i, 1);
				}
			}
			this.list = sliceArr(this.value, 9);
			this.renderData(this.focusIndex);
		});
	},
	renderData: function(fIndex) {
		var html = '<div id="channelSkip"><div class="channelSkip">';
		for(var i = 0; i < this.list[this.page].length; i++) {
			if(this.list[this.page][i].skip) {
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div class="number">${this.list[this.page][i].index}</div>
							<div class="acName">${this.list[this.page][i].name}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div class="number">${this.list[this.page][i].index}</div>
							<div class="acName">${this.list[this.page][i].name}</div>
							<div class="sel hasSel">选中</div>
						</div>`;
				}
			} else {
				if(i == fIndex) {
					html += `<div class="listItem focus">
							<div class="number">${this.list[this.page][i].index}</div>
							<div class="acName">${this.list[this.page][i].name}</div>
							<div class="sel">未选中</div>
						</div>`;
				} else {
					html += `<div class="listItem">
							<div class="number">${this.list[this.page][i].index}</div>
							<div class="acName">${this.list[this.page][i].name}</div>
							<div class="sel">未选中</div>
						</div>`;
				}
			}
		}
		document.querySelector('#showList').innerHTML = html + '</div></div>';
		document.querySelector('.menuOperate').innerHTML=`
			<div class="operaEnter">Set</div>
			<div class="operaSelect">Select</div>
			<div class="operaExit">Back</div>
		`;
	},
	keyEvent: function(e) {
		var curFocus = document.querySelector(".focus");
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		//下键
		if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
			if(curIndex == curList.length - 1) {
				if(this.page == this.list.length - 1) {
					this.page = 0;
				} else {
					this.page++;
				}
				this.listIndex = 0;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex + 1], 'focus');
			}
		}
		//上键
		if(e.keyCode == KeyEvent.DOM_VK_UP) {
			if(curIndex == 0) {
				if(this.page == 0) {
					this.page = this.list.length - 1;
				} else {
					this.page--;
				}
				this.listIndex = this.list[this.page].length - 1;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curIndex - 1], 'focus');
			}
		}
		//右键
		if(e.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if(curIndex == curList.length - 1) {
				if(this.page == this.list.length - 1) {
					this.page = 0;
				} else {
					this.page++;
				}
				this.listIndex = this.list[this.page].length - 1;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[curList.length - 1], 'focus');
			}
		}
		//左键
		if(e.keyCode == KeyEvent.DOM_VK_LEFT) {
			if(curIndex == 0) {
				if(this.page == 0) {
					this.page = this.list.length - 1;
				} else {
					this.page--;
				}
				this.listIndex = 0;
				this.renderData(this.listIndex);
			} else {
				removeClass(curList[curIndex], 'focus');
				addClass(curList[0], 'focus');
			}
		}
		//enter键
		if(e.keyCode == KeyEvent.DOM_VK_ENTER) {
			var msg = {
				"method": "mtk.webui.input.skipSource",
				"params": {
					"sourceId": this.list[this.page][curIndex].index,
					"skip": !this.list[this.page][curIndex].skip
				}
			}
			window.gSocket.send(msg, (data) => {
				if(data.error.code == 0) {
					this.focusIndex = curIndex;
					this.render();
				}
			});
		}
		//exit---返回键
		if(e.keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
			returnListPage();
		}
	}
}

var password = {
	curPwd: '',
	render: function() {
		window.gSocket.send({
			"method": "mtk.webui.config.getValue",
			"params": {
				"configId": "g_password__password"
			}
		}, (data) => {
//			console.log(data);
			if(data.error.code == 0) {
				this.curPwd += data.result.current;
				var html = `
					<div id="password">
						<div class="input" data-pwd=""></div>
					</div>
				`;
				document.querySelector('#showList').innerHTML = html;
			}
		})
	},
	keyEvent: function(e) {
		var pwd = document.querySelector('.input').getAttribute('data-pwd');
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(pwd == this.curPwd.substring(0, this.curPwd.length - 1) && e.key == this.curPwd.substring(this.curPwd.length - 1, this.curPwd.length)) {
				Menu.data[4].value = {
					valType: 'list',
					data: gMenuParentalShow
				}
				gMenuChild = gMenuParent.data[4].value;
				gMenuoIndex = canOperaDown(gMenuChild, -1);
				gMenuClassName = 'showList';
				returnListPage();
			} else if(pwd.length == 3) {
				document.querySelector('.input').innerHTML = '';
				document.querySelector('.input').setAttribute('data-pwd', '');
				alert('密码错误，重新输入！');
			} else {
				pwd += e.key;
				document.querySelector('.input').innerHTML += '*';
				document.querySelector('.input').setAttribute('data-pwd', pwd);
			}
		}
	}
}