var moveLineWidth;
var underButton = '<div class="button"><div class="buttonBack">Back</div><div class="buttonSelect">Select</div><div class="buttonNext">Next</div><div class="buttonExit">Exit</div></div>';
window.addEventListener("load", function (e) {
	window.gSocket.send(msg, function (data) {
		console.log(data.result);
		// console.log(data);
		var obj = JSON.stringify(data.result);
		console.log(obj);
		localStorage.setItem("gWzdAllDefine", obj)
		//		gWzdLocalStorage = JSON.parse(localStorage.getItem("gWzdAllDefine"));
		//		console.log(gWzdLocalStorage);
		gWzdSubpageManage.goToNext();
	});
	//	window.gSocket.send(gWzdDvbtChannelScanProcessPageData.msg, function(dvbtData) {
	//		console.log(dvbtData);
	//	});

	moveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
});

var gWzdWelcomePage = {
	showPage: function () {
		console.log('welcome page..................');
		var html = '';
		var myDiv = document.getElementById('promptInterface');
		html = '<div id="welcome" class="welcomePage"><div class="promptDetail">Welcome to use the Wizard for Initial Setup!!</div><div class="promptDetail">Please press [ENTER] to start the wizard.</div></div>';
		myDiv.innerHTML = html;
		document.getElementById('title').innerHTML = "Welcome";
		document.onkeydown = this.keyHandle.bind(this);
	},

	keyHandle: function (event) {
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		}
	},
}

var gWzdLanguagePage = {
	langList: [],
	showNum: 5,
	curFocusIndex: 0,
	getData: function () {
		this.langList = gWzdLanguageData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		var underButton = '<div class="button"><div class="buttonBack">Back</div><div class="buttonSelect">Select</div><div class="buttonNext">Next</div><div class="buttonExit">Exit</div></div>';
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="language" class="languagePage">';
		var html2 = '<div class="selectLanguage1 ">' + mtvuiUtil.getLangString('WZD_DESC_LANG') + '</div>';
		var html3 = '</div></div></div>';
		for (var i = 0; i < this.langList.length; i++) {
			if (i == 0) {
				html += '<div class="selectLanguage moveFocus">' + this.langList[i] + '</div>';
			} else {
				html += '<div class="selectLanguage">' + this.langList[i] + '</div>';
			}
		}
		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_TITLE_LANG');
		document.onkeydown = this.keyHandle.bind(this);
	},

	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.langList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.langList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.langList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		} else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			gWzdSubpageManage.goToPrev();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth - moveLineWidth + 'px';
		}
	},
}

var gWzdCountryPage = {
	ctyList: [],
	showNum: 5,
	curFocusIndex: 0,
	getData: function () {
		this.ctyList = gWzdCountryPageData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		// console.log(this.ctyList);
		var underButton = '<div class="button"><div class="buttonBack">Back</div><div class="buttonSelect">Select</div><div class="buttonNext">Next</div><div class="buttonExit">Exit</div></div>';
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="country" class="languagePage">';
		var html2 = '<div class="selectLanguage1 ">' + mtvuiUtil.getLangString('WZD_DESC_CTY') + '</div>';
		//		var html2 = '<div class="selectLanguage1 ">Please select your country:</div>';
		var html3 = '</div></div></div>';
		for (var i = 0; i < this.ctyList.length; i++) {
			if (i == 0) {
				html += '<div class="selectLanguage moveFocus">' + this.ctyList[i] + '</div>';
			} else {
				html += '<div class="selectLanguage">' + this.ctyList[i] + '</div>';
			}
		}
		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_TITLE_CTY');
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdCountryPageData.curCty = gWzdCountryPageData.ctyData[curIndex];
			window.gSocket.send(gWzdCountryPageData.setCty(curIndex), function (data) {
				console.log(data);
				var ret = gWzdCountryPageData.setCtyCallback(data);
				if (ret == true) {
					gWzdSubpageManage.goToNext();
				}
			});
			// console.log(gWzdCountryPageData.curCty);

			//			var curMoveLine = document.getElementById('moveLineId');
			//			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			//			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
			// console.log(this.curCty);
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.ctyList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.ctyList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.ctyList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}

				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		} else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			gWzdSubpageManage.goToPrev();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth - moveLineWidth + 'px';
		}
	},
}

var gWzdPostCodePage = {
	curPostCode: '',
	showPage: function () {
		var html = '';
		var myDiv = document.getElementById('promptInterface');
		html = '<div id="language" class="languagePage"><div class="selectLanguage1 ">Please Set Post Code Config:</div><div class="postCode">Post Code:</div><div id="postCodeInput" class="postCodeInput"></div></div>';
		myDiv.innerHTML = html;
		document.getElementById('title').innerHTML = "Post Code";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		console.log(event.keyCode);
		if (event.keyCode == KeyEvent.DOM_VK_0 || event.keyCode == KeyEvent.DOM_VK_1 ||
			event.keyCode == KeyEvent.DOM_VK_2 || event.keyCode == KeyEvent.DOM_VK_3 ||
			event.keyCode == KeyEvent.DOM_VK_4 || event.keyCode == KeyEvent.DOM_VK_5 ||
			event.keyCode == KeyEvent.DOM_VK_6 || event.keyCode == KeyEvent.DOM_VK_7 ||
			event.keyCode == KeyEvent.DOM_VK_8 || event.keyCode == KeyEvent.DOM_VK_9) {
			document.getElementById('postCodeInput').innerHTML += event.key;
			this.curPostCode += event.key;
		} else if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			console.log(this.curPostCode);
			gWzdPostCodePageData.setPostCode(this.curPostCode);
			gWzdSubpageManage.goToNext();
		}
	}
}

var gWzdSambaPage = {
	sambaList: [],
	showNum: 6,
	curFocusIndex: 0,
	getData: function () {
		this.sambaList = gWzdSambaData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="SambaPage" class="operatorPage">';
		var html2 = '<div class="selectLanguage1">To use Samba TV you must first accept and acknowledge Samba TVs End User License</div><div class="selectLanguage1">Agreement(EULA) and Privacy Policy.By enabling,you agree to these terms.</div>';
		var html3 = '</div></div></div>';

		for (var i = 0; i < this.sambaList.length; i++) {
			if (i == 0) {
				html += '<div class="selectSamba moveFocus">' + this.sambaList[i] + '</div>';
			} else {
				html += '<div class="selectSamba">' + this.sambaList[i] + '</div>';
			}
		}

		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = "Enable Samba Interactive TV";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			gWzdSambaData.setSamba(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.sambaList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.sambaList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			//			console.log(gWzdStage);
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.sambaList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.gWzdFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}

	}
}

var gWzdDisableSambaPage = {
	showPage: function () {
		//gWzdChannelScanData.value = this.getScanData();
		gWzdFocusIndex = 0;
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="SambaPage" class="operatorPage">';
		var html2 = '<div class="selectLanguage1">Are You Sure To Disable Samba Interactive TV?</div>';
		var html3 = '</div></div></div>';

		for (var i = 0; i < gWzdDisableSambaData.value.length; i++) {
			if (i == 0) {
				html += '<div class="selectSamba moveFocus">' + gWzdDisableSambaData.value[i] + '</div>';
			} else {
				html += '<div class="selectSamba">' + gWzdDisableSambaData.value[i] + '</div>';
			}
		}

		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = "Confirm";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < gWzdDisableSambaData.value.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++gWzdFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (gWzdFocusIndex > 4) {
					gWzdFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == gWzdDisableSambaData.value.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				gWzdFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			//			console.log(gWzdStage);
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = gWzdDisableSambaData.value.length - 1;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = (-(curList.length - 2) * curheigh) + 'px';
				gWzdFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				gWzdFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (gWzdFocusIndex < 0) {
					gWzdFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}

	}
}

var gWzdTimeZonePage = {
	timeZoneList: [],
	showNum: 6,
	curFocusIndex: 0,
	getData: function () {
		this.timeZoneList = gWzdTimeZoneData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		var html = '<div class="timeZoneListFocus"><div id="timeZoneList" class="timeZoneList">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="timeZone" class="tomeZone">'; TIMEZONE_SEL_MSG
		var html2 = '<div class="tomeZoneTitle ">' + mtvuiUtil.getLangString('WZD_TIMEZONE_SEL_MSG') + '</div>';
		var html3 = '</div></div></div>';
		for (var i = 0; i < this.timeZoneList.length; i++) {
			if (i == 0) {
				html += '<div class="timeZoneSelect moveTimeZoneFocus">' + this.timeZoneList[i] + '</div>';
			} else {
				html += '<div class="timeZoneSelect">' + this.timeZoneList[i] + '</div>';
			}
		}
		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_TIMEZONE_TITLE');
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveTimeZoneFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('timeZoneList');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;

		//		gWzdStage = 6;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			//			console.log(gWzdSubpageManage.curPage)
			gWzdTimeZoneData.setTineZone(curIndex);
			gWzdSubpageManage.goToNext();
			//			var curMoveLine = document.getElementById('moveLineId');
			//			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			//			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.timeZoneList.length - 1) {
				curList[curIndex].classList.remove("moveTimeZoneFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveTimeZoneFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.timeZoneList.length - 1) {
				curList[curIndex].classList.remove("moveTimeZoneFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveTimeZoneFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveTimeZoneFocus");
				curIndex = this.timeZoneList.length - 1;
				curList[curIndex].classList.add("moveTimeZoneFocus");
				curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveTimeZoneFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveTimeZoneFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdParentPwdPage = {
	newTemp: '',
	confiromTemp: '',
	showPage: function () {
		var html = '';
		var myDiv = document.getElementById('promptInterface');
		html = '<div id="language" class="languagePage"><div class="selectLanguage1 ">' + mtvuiUtil.getLangString('WZD_PARENT_PWD_TITLE') + '</div>' +
			'<div id="newPwd" class="pwd pwdFocus"><div class="pwdLeft">' + mtvuiUtil.getLangString('WZD_PARENT_PWD_NEW') + '</div><div id="newPwdInput" class="pwdInput"></div></div>' +
			'<div id="confiromPwd" class="pwd"><div class="pwdLeft">' + mtvuiUtil.getLangString('WZD_PARENT_PWD_CONFIRM') + '</div><div id="confiromPwdInput" class="pwdInput"></div></div><div id="pwdCompared" class="pwdCompared"></div></div>';
		myDiv.innerHTML = html;
		document.getElementById('title').innerHTML = '';
		this.newTemp = '';
		this.confiromTemp = '';
		document.onkeydown = this.keyHandle.bind(this);
	},
	pwdCompared: function () {
		if (this.newTemp == '0000' && this.confiromTemp == '0000') {
			document.getElementById('pwdCompared').innerHTML = mtvuiUtil.getLangString('WZD_PARENT_PWD_ERR_NOT_VALID');//'Invalid password,please try again.'
			setTimeout(this.showPage.bind(this), 2000);
		} else if (this.newTemp == this.confiromTemp) {
			document.getElementById('confiromPwd').classList.remove("pwdFocus");
			document.getElementById('pwdCompared').innerHTML = mtvuiUtil.getLangString('WZD_PARENT_PWD_ERR_SUCCESS');//'Password set successfully!'
		} else {
			document.getElementById('pwdCompared').innerHTML = mtvuiUtil.getLangString('WZD_PARENT_PWD_ERR_NOT_MATCH');//'Password dose not match,please try again.'
			setTimeout(this.showPage.bind(this), 2000);
		}
	},
	keyHandle: function (event) {
		if (event.keyCode == KeyEvent.DOM_VK_0 || event.keyCode == KeyEvent.DOM_VK_1 ||
			event.keyCode == KeyEvent.DOM_VK_2 || event.keyCode == KeyEvent.DOM_VK_3 ||
			event.keyCode == KeyEvent.DOM_VK_4 || event.keyCode == KeyEvent.DOM_VK_5 ||
			event.keyCode == KeyEvent.DOM_VK_6 || event.keyCode == KeyEvent.DOM_VK_7 ||
			event.keyCode == KeyEvent.DOM_VK_8 || event.keyCode == KeyEvent.DOM_VK_9) {
			if (document.getElementById('newPwdInput').innerHTML.length < 4) {
				this.newTemp += event.key;
				console.log(this.newTemp);
				document.getElementById('newPwdInput').innerHTML += '*'; //event.key;
			} else if (document.getElementById('confiromPwdInput').innerHTML.length < 4) {
				this.confiromTemp += event.key;
				document.getElementById('newPwd').classList.remove("pwdFocus");
				document.getElementById('confiromPwd').classList.add("pwdFocus");
				document.getElementById('confiromPwdInput').innerHTML += '*';
			}
			if (this.newTemp.length == 4 && this.confiromTemp.length == 4) {
				this.pwdCompared();
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_ENTER) {
			if (document.getElementById('pwdCompared').innerHTML == 'Password set successfully!') {
				window.gSocket.send(gWzdParentPwdPageData.setPwd(this.newTemp), function (data) {
					console.log(data);
					var ret = gWzdParentPwdPageData.setPwdCallback(data);
					if (ret == true) {
						gWzdSubpageManage.goToNext();
					}
				});
				// gWzdSubpageManage.goToNext();
			}
		}
	}
}

var gWzdTunerModePage = {
	curTuner: null,
	tunerList: [],
	showNum: 5,
	curFocusIndex: 0,
	getData: function () {
		this.tunerList = gWzdTunerModePageData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="tunerMode" class="languagePage">';
		var html2 = '<div class="selectLanguage1 ">' + mtvuiUtil.getLangString('WZD_DESC_TUNER') + '</div>';
		var html3 = '</div></div></div>';
		for (var i = 0; i < this.tunerList.length; i++) {
			if (i == 0) {
				html += '<div class="selectLanguage moveFocus">' + this.tunerList[i] + '</div>';
			} else {
				html += '<div class="selectLanguage">' + this.tunerList[i] + '</div>';
			}
		}

		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_TUNER_MODE');//"Tuner Mode";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdTunerModePageData.setTuner(curIndex);
			window.gSocket.send(gWzdTunerModePageData.setTuner(curIndex), function (data) {
				console.log(data);
				var ret = gWzdTunerModePageData.setTunerCallback(data);
				if (ret == true) {
					gWzdSubpageManage.goToNext();
				}
			});
			// gWzdTunerModePageData.curTuner = gWzdTunerModePageData.tunerData[curIndex];
			// gWzdSubpageManage.goToNext();
			// this.curTuner = gWzdTunerModePageData.tunerData[curIndex];
			//			var curMoveLine = document.getElementById('moveLineId');
			//			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			//			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.tunerList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.tunerList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.tunerList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		} else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			gWzdSubpageManage.goToPrev();
		}
	}
}

var gWzdDvbtOperatorPage = {
	curOperatorList: [],
	showNum: 5,
	curFocusIndex: 0,
	getData: function () {
		this.curOperatorList = gWzdDvbtOperatorData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		console.log(this.curOperatorList);
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="dvbtOperator" class="languagePage">';
		var html2 = '<div class="selectLanguage1 ">' + mtvuiUtil.getLangString('WZD_DESC_CABLE_OPT') + '</div>';
		var html3 = '</div></div></div>';
		for (var i = 0; i < this.curOperatorList.length; i++) {
			if (i == 0) {
				html += '<div class="selectLanguage moveFocus">' + this.curOperatorList[i] + '</div>';
			} else {
				html += '<div class="selectLanguage">' + this.curOperatorList[i] + '</div>';
			}
		}

		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_TITEL_CABLE_OPT');//"Select Operator";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			gWzdDvbtOperatorData.setDvbtOperator(curIndex);
			gWzdSubpageManage.goToNext();
			//			var curMoveLine = document.getElementById('moveLineId');
			//			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			//			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.curOperatorList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.curOperatorList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.curOperatorList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	},
}

var gWzdDvbcOperatorPage = {
	curOperatorList: [],
	showNum: 5,
	curFocusIndex: 0,
	getData: function () {
		this.curOperatorList = gWzdDvbcOperatorData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="dvbtOperator" class="languagePage">';
		var html2 = '<div class="selectLanguage1 ">' + mtvuiUtil.getLangString('WZD_DESC_CABLE_OPT') + '</div>';
		var html3 = '</div></div></div>';
		for (var i = 0; i < this.curOperatorList.length; i++) {
			if (i == 0) {
				html += '<div class="selectLanguage moveFocus">' + this.curOperatorList[i] + '</div>';
			} else {
				html += '<div class="selectLanguage">' + this.curOperatorList[i] + '</div>';
			}
		}

		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_TITEL_CABLE_OPT');//"Select Operator";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			gWzdSubpageManage.goToNext();
			//			var curMoveLine = document.getElementById('moveLineId');
			//			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			//			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.curOperatorList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.curOperatorList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.curOperatorList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	},
}

var gWzdDvbcInfoPage = {//Dvb-c opt edit
	showPage: function () {
		var html = '<div class="selectSatBackFocus"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="dvbcInfo" class="setConfig">';
		var html2 = '<div class="selectLanguage1">Please Configure The Cable Info.</div>';
		var html3 = '</div></div></div>';

		html += '<div class="setConfigList moveFocus"><div id="configType1" class="configType1">Scan Mode</div><div id="scanMode" class="configType2">Advance</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">Frequency(KHz)</div><div id="freq" class="freqInput">36000</div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">Modulation</div><div id="modulation" class="configType2">Auto</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">Symbol Rate(Ksym/s)</div><div id="symbolRate" class="freqInput">AUTO</div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">Network ID</div><div id="netWorkId" class="freqInput">000000</div></div>';
		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = "";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			gWzdSubpageManage.goToNext();
			//			var curMoveLine = document.getElementById('moveLineId');
			//			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			//			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdSatelliteTypePage = {
	satelliteTypeList: [],
	showNum: 5,
	curFocusIndex: 0,
	getData: function () {
		this.satelliteTypeList = gWzdSatelliteTypePageData.getData();
	},
	showPage: function () {
		this.getData();
		console.log(this.satelliteTypeList);
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="satellitetype" class="languagePage">';
		// var html2 = '<div class="selectLanguage1 ">Please select your satellite type:</div>';
		var html2 = '<div class="selectLanguage1 ">' + mtvuiUtil.getLangString('WZD_DVBS_SATELLITE_TYPE_DESC') + '</div>';
		var html3 = '</div></div></div>';
		for (var i = 0; i < this.satelliteTypeList.length; i++) {
			if (i == 0) {
				html += '<div class="selectLanguage moveFocus">' + this.satelliteTypeList[i] + '</div>';
			} else {
				html += '<div class="selectLanguage">' + this.satelliteTypeList[i] + '</div>';
			}
		}

		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_DVBS_SATELLITE_TYPE_TITLE');
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function () {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			gWzdSubpageManage.goToNext();
			//			var curMoveLine = document.getElementById('moveLineId');
			//			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			//			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			console.log(this.curFocusIndex);
			if (curIndex < this.satelliteTypeList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.satelliteTypeList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.satelliteTypeList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}

				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		} else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			gWzdSubpageManage.goToPrev();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth - moveLineWidth + 'px';
		}
	}
}

var gWzdDvbsOperatorPage = {
	curOperatorList: [],
	showNum: 5,
	curFocusIndex: 0,
	getData: function () {
		this.curOperatorList = gWzdDvbsOperatorData.getData(gWzdCountryPageData.curCty);
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="dvbtOperator" class="languagePage">';
		// var html2 = '<div class="selectLanguage1 ">You Can Select Only One Operator From The Following List:</div>';
		var html2 = '<div class="selectLanguage1 ">' + mtvuiUtil.getLangString('WZD_DESC_CABLE_OPT') + '</div>';
		var html3 = '</div></div></div>';
		for (var i = 0; i < this.curOperatorList.length; i++) {
			if (i == 0) {
				html += '<div class="selectLanguage moveFocus">' + this.curOperatorList[i] + '</div>';
			} else {
				html += '<div class="selectLanguage">' + this.curOperatorList[i] + '</div>';
			}
		}

		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_TITEL_CABLE_OPT');//"Select Operator";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			window.gSocket.send(gWzdDvbsOperatorData.setOpt(curIndex), function (data) {
				console.log(data);
				var ret = gWzdDvbsOperatorData.setOptCallback(data);
				if (ret == true) {
					gWzdDvbsOperatorData.enterM7Scan(gWzdCountryPageData.curCty, curIndex);
					gWzdSubpageManage.goToNext();
				}
			});
			// gWzdSubpageManage.goToNext();
			//			var curMoveLine = document.getElementById('moveLineId');
			//			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			//			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.curOperatorList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.curOperatorList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.curOperatorList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	},
}

var gWzdDvbsM7ChannelScanProcessPage = {
	analog: '',
	digtal: '',
	progressData: '',
	//	getData: function() {
	//
	//	},
	notifyData: function (data) {
		// console.log("111111111111111111111111");
		this.analog = data.params.nfyReason;
		this.digtal = data.params.chNum;
		this.progressData = data.params.progress;
		var curProgressfillWidth = document.getElementsByClassName('processFill')[0].offsetWidth;
		var progressfillWidth = document.getElementById('processFill');
		progressfillWidth.style.width = this.progressData + '%';
		//		console.log(test);
		//		gWzdDvbtChannelScanProcessPage.showPage(this.analog,this.digtal);
		document.getElementById('analog').innerHTML = this.analog;
		document.getElementById('digtal').innerHTML = this.digtal;
		document.getElementById('processResult').innerHTML = this.progressData + '%';
	},
	notifyListener: function () {
		gWzdTunerModePageData.curTuner = 0;
		if (gWzdTunerModePageData.curTuner == 0) {
			window.gSocket.addEventListener("mtk.webui.channelscan.dvbt.notify", this.notifyData.bind(this));
		} else if (gWzdTunerModePageData.curTuner == 1) {
			window.gSocket.addEventListener("mtk.webui.channelscan.dvbc.notify", this.notifyData.bind(this));
		}
		window.gSocket.send(gWzdDvbtChannelScanProcessPageData.msg, function (data) {
			console.log(data);
		});
	},
	showPage: function () {
		// this.notifyListener();
		var html = '<div id="channelScanProcess" class="languagePage"><div class="selectLanguage1">The LNB Search May Take a While to Complete.</div><div class="selectLanguage">Status:Scanning.</div>';
		// var html1 = '<div class="selectLanguage">Analog Channels:<span id="analog"></span></div><div class="selectLanguage">Digtal Channels:<span id="digtal"></span></div>';
		var html2 = '<div id="processBar" class="processBar"><div id="processFill" class="processFill"></div><div id="processResult" class="processResult"></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		underButton = '<div class="button"><div class="buttonExit">Cancel</div></div>';
		myDiv.innerHTML = html + html2 + underButton;
		document.getElementById('title').innerHTML = "Channel Scan";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {

	}
}
var gWzdAntennaCfgPage = {
	curAnteInfoData: {},
	curFocusIndex: 0,
	showNum: 5,
	anteTypeIdex: 0,
	tunerIdex: 0,
	freqIndex: 0,
	getAnteInfoData: function (anteInfoData) {
		console.log(anteInfoData);
		gWzdAntennaCfgPage.curAnteInfoData = anteInfoData;
		// console.log(anteInfoData);

	},
	showPage: function () {
		this.curFocusIndex = 0;
		gWzdAntennaCfgData.getData(this.getAnteInfoData);
		// document.onkeydown = this.keyHandle.bind(this);
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var htmlTitle =
			`<div id="antennaType" class="setConfig">
				<div class="selectLanguage1">${mtvuiUtil.getLangString('WZD_DESC_ANTENNA_TYPE_SELECTION')}</div>`
		var html2 = `</div></div></div>`;
		html =
			`<div class="backFocus1"><div id="backFocus" class="backFocus">
				<div class="setConfigList moveFocus">
				<div id="configType1" class="configType1">${mtvuiUtil.getLangString('WZD_DVBS_ANTENNA_TYPE')}</div>
				<div id="configType2" class="configType2">${mtvuiUtil.getLangString('WZD_DVBS_ANTENNA_TYPE_UNIVERSAL')}</div>
				<div id="configType3" class="configType3"><></div>
			</div>`;

		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = htmlTitle + html + html2;
		document.getElementById('title').innerHTML = '';
		document.onkeydown = this.keyHandle.bind(this);

	},
	showNextPage: function () {
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var htmlTitle =
			`<div id="antennaType" class="setConfig">
				<div class="selectLanguage1">${mtvuiUtil.getLangString('WZD_DESC_ANTENNA_TYPE_SELECTION')}</div>`
		var html2 = `</div></div></div>`;
		switch (this.anteTypeIdex) {
			case 0:
				html =
					`<div class="backFocus1"><div id="backFocus" class="backFocus">
						<div class="setConfigList moveFocus">
						<div id="configType1" class="configType1">${mtvuiUtil.getLangString('WZD_DVBS_ANTENNA_TYPE')}</div>
						<div id="configType2" class="configType2">${this.curAnteInfoData.data[0].name}</div>
						<div id="configType3" class="configType3"><></div>
					</div>`;
				break;
			case 1:
				html =
					`<div class="backFocus1"><div id="backFocus" class="backFocus">
						<div class="setConfigList moveFocus">
						<div id="configType1" class="configType1">${mtvuiUtil.getLangString('WZD_DVBS_ANTENNA_TYPE')}</div>
						<div id="anteType" class="configType2">${this.curAnteInfoData.data[1].name}</div>
						<div id="configType3" class="configType3"><></div>
						</div>
						<div class="setConfigList">
						<div id="configType1" class="configType1">${mtvuiUtil.getLangString('WZD_DVBS_USER_BAND')}</div>
						<div id="tuner" class="configType2">${this.curAnteInfoData.data[1].userBand[0].name}</div>
						<div id="configType3" class="configType3"><></div>
						</div>
						<div class="setConfigList">
						<div id="configType1" class="configType1">${mtvuiUtil.getLangString('WZD_DVBS_BAND_FREQ')}</div>
						<div id="bandFreq" class="configType2">${this.curAnteInfoData.data[1].userBand[0].bandFreq[0]}</div>
						<div id="configType3" class="configType3"><></div>
						</div>`;
				break;
			case 2:
				html =
					`<div class="backFocus1"><div id="backFocus" class="backFocus">
						<div class="setConfigList moveFocus">
						<div id="configType1" class="configType1">${mtvuiUtil.getLangString('WZD_DVBS_ANTENNA_TYPE')}</div>
						<div id="anteType" class="configType2">${this.curAnteInfoData.data[2].name}</div>
						<div id="configType3" class="configType3"><></div>
						</div>
						<div class="setConfigList">
						<div id="configType1" class="configType1">${mtvuiUtil.getLangString('WZD_DVBS_USER_BAND')}</div>
						<div id="tuner" class="configType2">${this.curAnteInfoData.data[2].userBand[0].name}</div>
						<div id="configType3" class="configType3"><></div>
						</div>
						<div class="setConfigList">
						<div id="configType1" class="configType1">${mtvuiUtil.getLangString('WZD_DVBS_BAND_FREQ')}</div>
						<div id="bandFreq" class="configType2">${this.curAnteInfoData.data[2].userBand[0].bandFreq[0]}</div>
						<div id="configType3" class="configType3"><></div>
						</div>`;
				break;
		}
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = htmlTitle + html + html2;
		document.getElementById('title').innerHTML = '';
		// this.curAnteInfoData.curAntennaTypeIdex
	},
	keyHandle: function (evevt) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		var tunerDiv = document.getElementById('tuner');
		var bandFreqDiv = document.getElementById('bandFreq');
		if (event.keyCode == KeyEvent.DOM_VK_ENTER) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			// gWzdLanguageData.setLang(curIndex);
			// gWzdSubpageManage.goToNext();
			// var curMoveLine = document.getElementById('moveLineId');
			// var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			// curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (this.curAnteInfoData.curAntennaTypeIdex == 1 || this.curAnteInfoData.curAntennaTypeIdex == 2) {
				if (curIndex < curList.length - 1) {
					curList[curIndex].classList.remove("moveFocus");
					++this.curFocusIndex;
					++curIndex;
					curList[curIndex].classList.add("moveFocus");
					if (this.curFocusIndex > 4) {
						this.curFocusIndex--;
						curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
						curItem.style.top = curtop - curheigh + 'px';
					}

				} else if (curIndex == curList.length - 1) {
					curList[curIndex].classList.remove("moveFocus");
					curIndex = 0;
					this.curFocusIndex = 0;
					curList[curIndex].classList.add("moveFocus");
					curItem.style.top = 0 + 'px';
				}
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (this.curAnteInfoData.curAntennaTypeIdex == 1 || this.curAnteInfoData.curAntennaTypeIdex == 2) {
				if (curIndex == 0) {
					curList[curIndex].classList.remove("moveFocus");
					curIndex = curList.length - 1;
					curList[curIndex].classList.add("moveFocus");
					if (curIndex > this.showNum) {
						curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
					}
					this.curFocusIndex = 4;
				} else {
					curList[curIndex].classList.remove("moveFocus");
					--curIndex;
					this.curFocusIndex--;
					curList[curIndex].classList.add("moveFocus");
					if (this.curFocusIndex < 0) {
						this.curFocusIndex++;
						curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
					}
				}
			}
		} else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			if (curIndex == 0) {
				if (this.anteTypeIdex > 0) {
					console.log("1111111111111111111111111111111111")
					this.anteTypeIdex--;
				} else if (this.anteTypeIdex == 0) {
					console.log("22222222222222222222222222222222");
					this.anteTypeIdex = this.curAnteInfoData.data.length - 1;
				}
				this.showNextPage();
			}else if (curIndex == 1) {
				// tunerIdex:0,
				// freqIndex:0,
			
				this.freqIndex = 0;

				console.log(tunerDiv.innerHTML = this.curAnteInfoData.data[this.anteTypeIdex].userBand.length);
				if(this.tunerIdex == this.curAnteInfoData.data[this.anteTypeIdex].userBand.length){
					this.tunerIdex = 0;
				}else{
					this.tunerIdex++;
				}
				tunerDiv.innerHTML = this.curAnteInfoData.data[this.anteTypeIdex].userBand[this.tunerIdex].name;
				bandFreqDiv.innerHTML = this.curAnteInfoData.data[this.anteTypeIdex].userBand[this.tunerIdex].bandFreq[this.freqIndex];
			} else if (curIndex == 2) {
				// var bandFreqDiv = document.getElementById('bandFreq');
				if(this.freqIndex == this.curAnteInfoData.data[this.anteTypeIdex].userBand[this.tunerIdex].bandFreq.length - 1){
					this.freqIndex = 0;
				}else {
					this.freqIndex++;
				}
				bandFreqDiv.innerHTML = this.curAnteInfoData.data[this.anteTypeIdex].userBand[this.tunerIdex].bandFreq[this.freqIndex];
			}
			// gWzdSubpageManage.goToPrev();
			// var curMoveLine = document.getElementById('moveLineId');
			// var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			// curMoveLine.style.width = curMoveLineWidth - moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			console.log(this.curAnteInfoData.data.length);
			if (curIndex == 0) {
				if (this.anteTypeIdex < this.curAnteInfoData.data.length - 1) {
					this.anteTypeIdex++;
					this.tunerIdex = 0;
				} else if (this.anteTypeIdex == 2) {
					this.anteTypeIdex = 0;
				}

				this.showNextPage();
			} else if (curIndex == 1) {
				// tunerIdex:0,
				// freqIndex:0,
			
				this.freqIndex = 0;

				console.log(tunerDiv.innerHTML = this.curAnteInfoData.data[this.anteTypeIdex].userBand.length);
				if(this.tunerIdex == this.curAnteInfoData.data[this.anteTypeIdex].userBand.length){
					this.tunerIdex = 0;
				}else{
					this.tunerIdex++;
				}
				tunerDiv.innerHTML = this.curAnteInfoData.data[this.anteTypeIdex].userBand[this.tunerIdex].name;
				bandFreqDiv.innerHTML = this.curAnteInfoData.data[this.anteTypeIdex].userBand[this.tunerIdex].bandFreq[this.freqIndex];
			} else if (curIndex == 2) {
				// var bandFreqDiv = document.getElementById('bandFreq');
				if(this.freqIndex == this.curAnteInfoData.data[this.anteTypeIdex].userBand[this.tunerIdex].bandFreq.length - 1){
					this.freqIndex = 0;
				}else {
					this.freqIndex++;
				}
				bandFreqDiv.innerHTML = this.curAnteInfoData.data[this.anteTypeIdex].userBand[this.tunerIdex].bandFreq[this.freqIndex];
			}
		}
	}
}

var gWzdDvbsAntennaSetupPage = {
	curFocusIndex: 0,
	showNum: 6,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="satParameter" class="setSatParametersTitle">' +
			'<div class="selectLanguage1">Please Set The Satellies Parameters.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setSatParametersRow moveFocus"><div id="configType1" class="configType1">Satellie status</div><div id="configType2" class="configType2">On</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">LNB power</div><div id="configType2" class="configType2">On</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">LNB frequency</div><div id="configType2" class="configType2">Universal</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">DiSEqc set</div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Tone 22KHz</div><div id="configType2" class="configType2">AUTO</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Transponder</div><div id="configType2" class="configType2">02000</div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Quality</div><div id="signalBar" class="signalBar"><div id="qualityFill" class="qualityFill"></div><div id="qualityResult" class="processResult">50%</div></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Leverl</div><div id="signalBar" class="signalBar"><div id="leverlFill" class="leverFill"></div><div id="leverlResult" class="processResult">25%</div></div></div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html;//html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = "Antenna Setup";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 3;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - 3 - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

// not operator scan
var gWzdDvbsNotOptSetupPage = {//==gWzdDvbsAntennaSetupPage  Single Cable
	curFocusIndex: 0,
	showNum: 6,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="satParameter" class="setSatParametersTitle">' +
			'<div class="selectLanguage1">Please Set The Satellies Parameters.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setSatParametersRow moveFocus"><div id="configType1" class="configType1">Satellie status</div><div id="configType2" class="configType2">On</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Position</div><div id="configType2" class="configType2">A</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">LNB frequency</div><div id="configType2" class="configType2">Universal</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Transponder</div><div id="configType2" class="configType2">02000</div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Quality</div><div id="signalBar" class="signalBar"><div id="qualityFill" class="qualityFill"></div><div id="qualityResult" class="processResult">50%</div></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Leverl</div><div id="signalBar" class="signalBar"><div id="leverlFill" class="leverFill"></div><div id="leverlResult" class="processResult">25%</div></div></div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html + underButton;
		document.getElementById('title').innerHTML = "Antenna Setup";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 3;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - 3 - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdDvbsNotOptSetup2Page = {//==gWzdDvbsAntennaSetupPage  Universal
	curFocusIndex: 0,
	showNum: 6,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="satParameter" class="setSatParametersTitle">' +
			'<div class="selectLanguage1">Please Set The Satellies Parameters.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setSatParametersRow moveFocus"><div id="configType1" class="configType1">Satellie status</div><div id="configType2" class="configType2">On</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Position</div><div id="configType2" class="configType2">A</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">LNB frequency</div><div id="configType2" class="configType2">Universal</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Transponder</div><div id="configType2" class="configType2">11303H22000</div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Quality</div><div id="signalBar" class="signalBar"><div id="qualityFill" class="qualityFill"></div><div id="qualityResult" class="processResult">50%</div></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Leverl</div><div id="signalBar" class="signalBar"><div id="leverlFill" class="leverFill"></div><div id="leverlResult" class="processResult">25%</div></div></div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html + underButton;
		document.getElementById('title').innerHTML = "Antenna Setup";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 3;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - 3 - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdDvbsNotOptSetTranPage = {//==gWzdDvbsAntennaSetupPage  Set The Transponders
	curFocusIndex: 0,
	showNum: 6,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="satParameter" class="setSatParametersTitle">' +
			'<div class="selectLanguage1">Please Set The Transponders Parameters.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setSatParametersRow moveFocus"><div id="configType1" class="configType1">Frequency</div><div id="configType2" class="parameterInput">11303</div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Symbol Rate(Ksym/s)</div><div id="configType2" class="parameterInput">22000</div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Polarization</div><div id="configType2" class="configType2">Horizontal</div><div id="configType3" class="configType3"><></div></div>' +
			'</div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html + underButton;
		document.getElementById('title').innerHTML = "Antenna Setup";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdDvbsNotOptDiSEqCPage = {//==gWzdDvbsAntennaSetupPage  Set DiSEqC
	curFocusIndex: 0,
	showNum: 6,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="satParameter" class="setSatParametersTitle">' +
			'<div class="selectLanguage1">Please Set DiSEqCs Parameters.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setSatParametersRow moveFocus"><div id="configType1" class="configType1">DiSEqC 1.0 port</div><div id="configType2" class="configType2">Disable</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">DiSEqC 1.1 port</div><div id="configType2" class="configType2">Disable</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">DiSEqC motor</div><div id="configType2" class="configType2">Disanle</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Quality</div><div id="signalBar" class="signalBar"><div id="qualityFill" class="qualityFill"></div><div id="qualityResult" class="processResult">50%</div></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Leverl</div><div id="signalBar" class="signalBar"><div id="leverlFill" class="leverFill"></div><div id="leverlResult" class="processResult">25%</div></div></div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html + underButton;
		document.getElementById('title').innerHTML = "Antenna Setup";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 3;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - 3 - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdDvbsNotOptDiSEqC2Page = {//==gWzdDvbsAntennaSetupPage  Set DiSEqC1.2 motor
	curFocusIndex: 0,
	showNum: 7,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="satParameter" class="setSatParametersTitle">' +
			'<div class="selectLanguage1">Please Set DiSEqC1.2 Motors Parameters.</div>' +
			'<div class="setDiSEqParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setDiSEqParametersRow moveFocus"><div id="configType1" class="configType1">Movement control</div><div id="configType2" class="configType2">Nonstop</div></div>' +
			'<div class="setDiSEqParametersRow"><div id="configType1" class="configType1">Disable limits</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setDiSEqParametersRow"><div id="configType1" class="configType1">Limit east</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setDiSEqParametersRow"><div id="configType1" class="configType1">Limit west</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setDiSEqParametersRow"><div id="configType1" class="configType1">Store position</div><div id="configType2" class="configType2">1</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setDiSEqParametersRow"><div id="configType1" class="configType1">Goto position</div><div id="configType2" class="configType2">1</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setDiSEqParametersRow"><div id="configType1" class="configType1">Goto reference</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setDiSEqParametersRow"><div id="configType1" class="configType1">Signal Quality</div><div id="signalBar" class="signalBar"><div id="qualityFill" class="qualityFill"></div><div id="qualityResult" class="processResult">50%</div></div></div>' +
			'<div class="setDiSEqParametersRow"><div id="configType1" class="configType1">Signal Leverl</div><div id="signalBar" class="signalBar"><div id="leverlFill" class="leverFill"></div><div id="leverlResult" class="processResult">25%</div></div></div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html;// + underButton;
		document.getElementById('title').innerHTML = "Antenna Setup";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 6) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 3;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - 3 - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 6;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdDvbsNotOptDiSEqC3Page = {//Set DiSEqC1.2 movement controls  1 Nonstop
	curFocusIndex: 0,
	showNum: 6,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="satParameter" class="setSatParametersTitle">' +
			'<div class="selectLanguage1">Please Set The Satellies Parameters.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setSatParametersRow moveFocus"><div id="configType1" class="configType1">Movement control</div><div id="configType2" class="configType2">Nonstop</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow disanble"><div id="configType1" class="configType1">Step size</div><div id="configType2" class="parameterInput">1</div></div>' +
			'<div class="setSatParametersRow disanble"><div id="configType1" class="configType1">Timeout(s)</div><div id="configType2" class="parameterInput">1</div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Move east</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Move west</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Stop movement</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Quality</div><div id="signalBar" class="signalBar"><div id="qualityFill" class="qualityFill"></div><div id="qualityResult" class="processResult">50%</div></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Leverl</div><div id="signalBar" class="signalBar"><div id="leverlFill" class="leverFill"></div><div id="leverlResult" class="processResult">25%</div></div></div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html;//html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = "Antenna Setup";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 3;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - 3 - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdDvbsNotOptDiSEqC4Page = {//Set DiSEqC1.2 movement controls 2 Step
	curFocusIndex: 0,
	showNum: 6,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="satParameter" class="setSatParametersTitle">' +
			'<div class="selectLanguage1">Please Set The Satellies Parameters.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setSatParametersRow moveFocus"><div id="configType1" class="configType1">Movement control</div><div id="configType2" class="configType2">Step</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Step size</div><div id="configType2" class="parameterInput">1</div></div>' +
			'<div class="setSatParametersRow disanble"><div id="configType1" class="configType1">Timeout(s)</div><div id="configType2" class="parameterInput">1</div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Move east</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Move west</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Stop movement</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Quality</div><div id="signalBar" class="signalBar"><div id="qualityFill" class="qualityFill"></div><div id="qualityResult" class="processResult">50%</div></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Leverl</div><div id="signalBar" class="signalBar"><div id="leverlFill" class="leverFill"></div><div id="leverlResult" class="processResult">25%</div></div></div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html;//html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = "Antenna Setup";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 3;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - 3 - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdDvbsNotOptDiSEqC5Page = {//Set DiSEqC1.2 movement controls 3 Timeout
	curFocusIndex: 0,
	showNum: 6,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="satParameter" class="setSatParametersTitle">' +
			'<div class="selectLanguage1">Please Set The Satellies Parameters.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setSatParametersRow moveFocus"><div id="configType1" class="configType1">Movement control</div><div id="configType2" class="configType2">Timeout</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow disanble"><div id="configType1" class="configType1">Step size</div><div id="configType2" class="parameterInput">1</div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Timeout(s)</div><div id="configType2" class="parameterInput">1</div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Move east</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Move west</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersRow"><div id="configType1" class="configType1">Stop movement</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Quality</div><div id="signalBar" class="signalBar"><div id="qualityFill" class="qualityFill"></div><div id="qualityResult" class="processResult">50%</div></div></div>' +
			'<div class="setSatParametersSignal"><div id="configType1" class="configType1">Signal Leverl</div><div id="signalBar" class="signalBar"><div id="leverlFill" class="leverFill"></div><div id="leverlResult" class="processResult">25%</div></div></div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html;//html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = "Antenna Setup";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 3) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 3;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - 3 - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}
//not operator scan end

var gWzdDvbsSelectSatPage = {
	curSatList: [],
	showNum: 5,
	curFocusIndex: 0,
	getData: function () {
		this.curSatList = gWzdDvbsSelectSatPageData.getData();
	},
	showPage: function () {
		this.getData();
		console.log(this.curSatList);
		console.log(this.curSatList.length);
		this.curFocusIndex = 0;
		var html = '<div class="selectSatBackFocus"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="dvbsSelectSat" class="setConfig">';
		var html2 = '<div class="selectLanguage1 ">Please Select Satellites To Scan or Edit The Selected satellit.</div>';
		var html3 = '</div></div></div>';

		for (var i = 0; i < this.curSatList.length; i++) {
			if (i == 0) {
				console.log(this.curSatList[i][0] + this.curSatList[i][1] + this.curSatList[i][2] + this.curSatList[i][3]);
				html += '<div class="setConfigList moveFocus"><div class="selectSatColumn1">' + this.curSatList[i][0] + '</div><div class="selectSatColumn2">' + this.curSatList[i][1] + '</div><div class="selectSatColumn3">' + this.curSatList[i][2] + '</div><div class="selectSatColumn4">' + this.curSatList[i][3] + '</div></div>';
			} else {
				console.log("11111" + this.curSatList[i][0] + this.curSatList[i][1] + this.curSatList[i][2] + this.curSatList[i][3]);
				html += '<div class="setConfigList"><div class="selectSatColumn1">' + this.curSatList[i][0] + '</div><div class="selectSatColumn2">' + this.curSatList[i][1] + '</div><div class="selectSatColumn3">' + this.curSatList[i][2] + '</div><div class="selectSatColumn4">' + this.curSatList[i][3] + '</div></div>';
			}
		}
		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = "Select Satellite";
		document.onkeydown = this.keyHandle.bind(this);

	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			// gWzdLanguageData.setLang(curIndex);
			// gWzdSubpageManage.goToNext();
			// var curMoveLine = document.getElementById('moveLineId');
			// var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			// curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < this.curSatList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.curSatList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.curSatList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		} else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			// gWzdSubpageManage.goToPrev();
			// var curMoveLine = document.getElementById('moveLineId');
			// var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			// curMoveLine.style.width = curMoveLineWidth - moveLineWidth + 'px';
		}
	}
}

var gWzdDvbsAlphaCfgPage = {
	showPage: function () {
		var html = '<div id="targetReigon" class="setConfig"><div class="selectLanguage1">Please Configure The Scan Info.</div>' +
			'<div class="setConfigList disanble"><div id="configType1" class="configType1">Scan Mode</div><div id="configType2" class="configType2">Network</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setConfigList moveFocus"><div id="configType1" class="configType1">Channels</div><div id="configType2" class="configType2">Free</div><div id="configType3" class="configType3"><></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html;
		document.onkeydown = this.keyHandle.bind(this);
	},
	heyHandle: function (event) {

	}
}

//operator = TKGS cty=turkey
var gWzdDvbsTKGSScanInfoPage = {//TKGS1
	curFocusIndex: 0,
	showNum: 5,
	showPage: function () {

		this.curFocusIndex = 0;
		var html = '<div id="targetReigon" class="setConfig"><div class="selectLanguage1">Please Configure The Scan Info.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setConfigList disanble"><div id="configType1" class="configType1">Scan Mode</div><div id="configType2" class="configType2">Network</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setConfigList moveFocus"><div id="configType1" class="configType1">Channels</div><div id="configType2" class="configType2">Free</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">TKGS Locators List</div></div></div></div>'
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html;//+ underButton;
		document.getElementById('title').innerHTML = '';
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdDvbsTKGSSetLocatorPage = {//TKGS2
	curFocusIndex: 0,
	showNum: 5,
	showPage: function () {

		this.curFocusIndex = 0;
		var html = '<div id="setLocator" class="setConfig"><div class="selectLanguage1">Please Set The TKGS Locators.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setConfigList moveFocus"><div id="configType1" class="configType1">1</div><div id="configType2" class="configType2">12423V27500</div><div id="configType3" class="configType3">8181</div></div>' +
			'<div class="setConfigList"><div id="configType2" class="configType2">Add a new Locator</div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html;//+ underButton;
		document.getElementById('title').innerHTML = '';
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdDvbsTKGSAddLocatorPage = {//TKGS3
	curFocusIndex: 0,
	showNum: 5,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="addLocator" class="setConfig"><div class="selectLanguage1">Add a TKGS Locator.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setConfigList moveFocus"><div id="configType1" class="configType1">Frequency</div><div id="freq" class="freqInput">12423</div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">Symbol Rate(Ksym/s)</div><div id="symbolRate" class="freqInput">AUTO</div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">Polarization</div><div id="configType2" class="configType2">Vertical</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">PID</div><div id="netWorkId" class="freqInput">8181</div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">Cancel</div></div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html + underButton;
		document.getElementById('title').innerHTML = '';
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}

var gWzdDvbsTKGSUpdateLocatorPage = {//TKGS4
	curFocusIndex: 0,
	showNum: 5,
	showPage: function () {
		this.curFocusIndex = 0;
		var html = '<div id="addLocator" class="setConfig"><div class="selectLanguage1">Update The TKGS Locator.</div>' +
			'<div class="satParameterFocus"><div id="backFocus" class="backFocus">' +
			'<div class="setConfigList moveFocus"><div id="configType1" class="configType1">Frequency</div><div id="freq" class="freqInput">12423</div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">Symbol Rate(Ksym/s)</div><div id="symbolRate" class="freqInput">AUTO</div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">Polarization</div><div id="configType2" class="configType2">Vertical</div><div id="configType3" class="configType3"><></div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">PID</div><div id="netWorkId" class="freqInput">8181</div></div>' +
			'<div class="setConfigList"><div id="configType1" class="configType1">Delete the locator</div></div></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		myDiv.innerHTML = html + underButton;
		document.getElementById('title').innerHTML = '';
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		console.log(curList.length);
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdLanguageData.setLang(curIndex, function (data) {
			// 	console.log(data.error.code)
			// })
			gWzdLanguageData.setLang(curIndex);
			gWzdSubpageManage.goToNext();
			var curMoveLine = document.getElementById('moveLineId');
			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			// console.log(this.curFocusIndex);
			if (curIndex < curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 5) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex >= this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 5;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
	}
}
var gWzdDvbsTKGSSelectTablePage = {
	tableList: [],
	showNum: 6,
	curFocusIndex: 0,
	getData: function () {
		this.tableList = gWzdDvbsTKGSSelectTableData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="SambaPage" class="operatorPage">';
		var html2 = '<div class="selectLanguage1">Please select Channel List</div>';
		var html3 = '</div></div></div>';

		for (var i = 0; i < this.tableList.length; i++) {
			if (i == 0) {
				html += '<div class="selectSamba moveFocus">' + this.tableList[i] + '</div>';
			} else {
				html += '<div class="selectSamba">' + this.tableList[i] + '</div>';
			}
		}

		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = "Select Table";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdSambaData.setSamba(curIndex);
			gWzdSubpageManage.goToNext();
			// var curMoveLine = document.getElementById('moveLineId');
			// var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			// curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.tableList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.tableList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			//			console.log(gWzdStage);
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.tableList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.gWzdFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}

	}
}

var gWzdDvbsTKGSChannelScanProcessPage = {
	analog: '',
	digtal: '',
	progressData: '',
	//	getData: function() {
	//
	//	},
	notifyData: function (data) {
		console.log("111111111111111111111111");
		this.analog = data.params.nfyReason;
		this.digtal = data.params.chNum;
		this.progressData = data.params.progress;
		var curProgressfillWidth = document.getElementsByClassName('processFill')[0].offsetWidth;
		var progressfillWidth = document.getElementById('processFill');
		progressfillWidth.style.width = this.progressData + '%';
		//		console.log(test);
		//		gWzdDvbtChannelScanProcessPage.showPage(this.analog,this.digtal);
		document.getElementById('analog').innerHTML = this.analog;
		document.getElementById('digtal').innerHTML = this.digtal;
		document.getElementById('processResult').innerHTML = this.progressData + '%';
	},
	notifyListener: function () {
		gWzdTunerModePageData.curTuner = 0;
		if (gWzdTunerModePageData.curTuner == 0) {
			window.gSocket.addEventListener("mtk.webui.channelscan.dvbt.notify", this.notifyData.bind(this));
		} else if (gWzdTunerModePageData.curTuner == 1) {
			window.gSocket.addEventListener("mtk.webui.channelscan.dvbc.notify", this.notifyData.bind(this));
		}
		window.gSocket.send(gWzdDvbtChannelScanProcessPageData.msg, function (data) {
			console.log(data);
		});
	},
	showPage: function () {
		// this.notifyListener();
		var html = '<div id="channelScanProcess" class="languagePage"><div class="selectLanguage1">The Channel Scan May Take a While to Complete.</div><div class="selectLanguage">Status:Scan Complete</div>';
		var html1 = '<div class="selectLanguage">Digtal Channels:<span id="digtal"></span></div><div class="selectLanguage">Satellite:<span id="Satellite">Turksat 1/1</span></div><div class="selectLanguage">26.02.2015 Guncel Liste</div>';
		var html2 = '<div id="processBar" class="processBar"><div id="processFill" class="processFill"></div><div id="processResult" class="processResult"></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		underButton = '<div class="button"><div class="buttonExit">Cancel</div></div>';
		myDiv.innerHTML = html + html1 + html2 + underButton;
		document.getElementById('title').innerHTML = "Channel Scan";


		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {

	}
}
//TKGS end

//operator = Freeview Sat
var gWzdDvbsFreeviewRegionPage = {
	regionList: [],
	curFocusIndex: 0,
	showNum: 5,
	getData: function () {
		this.regionList = gWzdDvbsFreeviewRegionPageData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		var underButton = '<div class="button"><div class="buttonBack">Back</div><div class="buttonSelect">Select</div><div class="buttonNext">Next</div><div class="buttonExit">Exit</div></div>';
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="freeviewRegion" class="languagePage">';
		var html2 = '<div class="selectLanguage1 ">' + mtvuiUtil.getLangString('WZD_REGION_LIST_SEL_MSG') + '</div>';
		var html3 = '</div></div></div>';
		for (var i = 0; i < this.regionList.length; i++) {
			if (i == 0) {
				html += '<div class="selectLanguage moveFocus">' + this.regionList[i] + '</div>';
			} else {
				html += '<div class="selectLanguage">' + this.regionList[i] + '</div>';
			}
		}
		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_REGION_LIST_SEL_TITLE');
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			console.log("Enter.......................................");
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.regionList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.regionList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.regionList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		} else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			console.log("Left...................................");
		}
	}
}
//Freeview Sat end

//operator = Fransat BAT page
var gWzdDvbsFransatBatPage = {
	batList: [],
	curFocusIndex: 0,
	showNum: 5,
	getData: function () {
		this.batList = gWzdDvbsFransatBatPageData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		var underButton = '<div class="button"><div class="buttonBack">Back</div><div class="buttonSelect">Select</div><div class="buttonNext">Next</div><div class="buttonExit">Exit</div></div>';
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="freeviewRegion" class="languagePage">';
		var html2 = '<div class="selectLanguage1 ">' + mtvuiUtil.getLangString('WZD_DESC_BAT_SELECT') + '</div>';
		var html3 = '</div></div></div>';
		for (var i = 0; i < this.batList.length; i++) {
			if (i == 0) {
				html += '<div class="selectLanguage moveFocus">' + this.batList[i] + '</div>';
			} else {
				html += '<div class="selectLanguage">' + this.batList[i] + '</div>';
			}
		}
		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_TITLE_SELECT_TABLE');
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			console.log("Enter.......................................");
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.batList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.batList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.batList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		} else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			console.log("Left...................................");
		}
	}
}
//Fransat BAT select page end
var gWzdDvbsTricolorChannelScanProcessPage = {
	analog: '',
	digtal: '',
	progressData: '',
	//	getData: function() {
	//
	//	},
	notifyData: function (data) {
		console.log("111111111111111111111111");
		this.analog = data.params.nfyReason;
		this.digtal = data.params.chNum;
		this.progressData = data.params.progress;
		var curProgressfillWidth = document.getElementsByClassName('processFill')[0].offsetWidth;
		var progressfillWidth = document.getElementById('processFill');
		progressfillWidth.style.width = this.progressData + '%';
		//		console.log(test);
		//		gWzdDvbtChannelScanProcessPage.showPage(this.analog,this.digtal);
		document.getElementById('analog').innerHTML = this.analog;
		document.getElementById('digtal').innerHTML = this.digtal;
		document.getElementById('processResult').innerHTML = this.progressData + '%';
	},
	notifyListener: function () {
		gWzdTunerModePageData.curTuner = 0;
		if (gWzdTunerModePageData.curTuner == 0) {
			window.gSocket.addEventListener("mtk.webui.channelscan.dvbt.notify", this.notifyData.bind(this));
		} else if (gWzdTunerModePageData.curTuner == 1) {
			window.gSocket.addEventListener("mtk.webui.channelscan.dvbc.notify", this.notifyData.bind(this));
		}
		window.gSocket.send(gWzdDvbtChannelScanProcessPageData.msg, function (data) {
			console.log(data);
		});
	},
	showPage: function () {
		// this.notifyListener();
		var html = '<div id="channelScanProcess" class="languagePage"><div class="selectLanguage1">The Channel Scan May Take a While to Complete.</div><div class="selectLanguage">Status:Scan Complete</div>';
		var html1 = '<div class="selectLanguage">Digtal Channels:<span id="digtal"></span></div><div class="selectLanguage">Satellite:<span id="Satellite">Eutelsat 36.0°E 1/1</span></div>';
		var html2 = '<div id="processBar" class="processBar"><div id="processFill" class="processFill"></div><div id="processResult" class="processResult"></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		underButton = '<div class="button"><div class="buttonExit">Cancel</div></div>';
		myDiv.innerHTML = html + html1 + html2 + underButton;
		document.getElementById('title').innerHTML = "Channel Scan";


		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {

	}
}

var gWzdDvbsTricolorSelectTablePage = {
	tableList: [],
	showNum: 6,
	curFocusIndex: 0,
	getData: function () {
		this.tableList = gWzdDvbsTricolorSelectTableData.getData();
	},
	showPage: function () {
		this.getData();
		this.curFocusIndex = 0;
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="SambaPage" class="operatorPage">';
		var html2 = '<div class="selectLanguage1">Please select Channel List</div>';
		var html3 = '</div></div></div>';

		for (var i = 0; i < this.tableList.length; i++) {
			if (i == 0) {
				html += '<div class="selectSamba moveFocus">' + this.tableList[i] + '</div>';
			} else {
				html += '<div class="selectSamba">' + this.tableList[i] + '</div>';
			}
		}

		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = "Select Table";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			// gWzdSambaData.setSamba(curIndex);
			gWzdSubpageManage.goToNext();
			// var curMoveLine = document.getElementById('moveLineId');
			// var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			// curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.tableList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.tableList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			//			console.log(gWzdStage);
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.tableList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.gWzdFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}

	}
}
// var gWzdDvbs
// var WzdDvbsOperatorNextPage = {

// }

var gWzdChannelScanPage = {
	//define需要看下	
	//	getScanData: function() {
	//		var scanData;
	//		if(gWzdLocalStorage.APP_DVBC_SUPPORT == 1 && gWzdLocalStorage.APP_DVBS_SUPPORT == 1) {
	//			scanData = ['Scan', 'Skip Scan'];
	//		}
	//		return scanData;
	//	},
	scanList: [],
	showNum: 5,
	curFocusIndex: 0,
	getData: function () {
		this.scanList = gWzdChannelScanData.getData();
	},
	showPage: function () {
		//		gWzdChannelScanData.value = this.getScanData();
		this.getData();
		this.curFocusIndex = 0;
		var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="satellitetype" class="operatorPage">';
		var html2 = '<div class="selectLanguage1">First, please connect antenna.</div><div class="selectLanguage1">Start channel scan now ?</div><div class="selectLanguage1 ">If you skip this step, the channel scan could be performed in Menu.</div>';
		// var html2 = '<div class="selectLanguage1">'+mtvuiUtil.getLangString('WZD_DESC_SCAN')+'</div>';
		var html3 = '</div></div></div>';

		for (var i = 0; i < this.scanList.length; i++) {
			if (i == 0) {
				html += '<div class="selectLanguage moveFocus">' + this.scanList[i] + '</div>';
			} else {
				html += '<div class="selectLanguage">' + this.scanList[i] + '</div>';
			}
		}

		myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
		document.getElementById('title').innerHTML = mtvuiUtil.getLangString('WZD_TITLE_SCAN');//"Channel Scan";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			gWzdSubpageManage.goToNext();
			//			var curMoveLine = document.getElementById('moveLineId');
			//			var curMoveLineWidth = document.getElementsByClassName('moveLine')[0].offsetWidth;
			//			curMoveLine.style.width = curMoveLineWidth + moveLineWidth + 'px';
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.scanList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.scanList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.scanList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		} else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			gWzdSubpageManage.goToPrev();
		}
	}
}

var gWzdDvbtChannelScanProcessPage = {
	analog: '',
	digtal: '',
	progressData: '',
	//	getData: function() {
	//
	//	},
	notifyData: function (data) {
		// console.log("111111111111111111111111");
		this.analog = data.params.nfyReason;
		this.digtal = data.params.chNum;
		this.progressData = data.params.progress;
		var curProgressfillWidth = document.getElementsByClassName('processFill')[0].offsetWidth;
		var progressfillWidth = document.getElementById('processFill');
		// console.log(parseInt(this.progressData/2));
		progressfillWidth.style.width = parseInt(this.progressData / 2) + '%';
		//		console.log(test);
		//		gWzdDvbtChannelScanProcessPage.showPage(this.analog,this.digtal);
		document.getElementById('analog').innerHTML = this.analog;
		document.getElementById('digtal').innerHTML = this.digtal;
		document.getElementById('processResult').innerHTML = parseInt(this.progressData / 2) + '%';
		if (this.progressData == 100) {
			window.gSocket.send(gWzdDvbtGetUIOperationData.msg, function (data) {
				if (data.result.targetRegionPoloUp == 'true') {
					gWzdTargetReigonPage.showPage();
				} else if (data.result.lcnConflictPopUp == 'true') {
					gWzdLcnConflictPage.showPage();
				} else if (data.result.favouriteNetworkPopUp == 'true') {
					gWzdFavoriteNetworkPage.showPage();
				} else if (data.result.lcnv2PopUp == 'true') {
				}

			});
		}
	},
	notifyListener: function () {
		gWzdTunerModePageData.curTuner = 0;
		if (gWzdTunerModePageData.curTuner == 0) {
			window.gSocket.addEventListener("mtk.webui.channelscan.dvbt.notify", this.notifyData.bind(this));
		} else if (gWzdTunerModePageData.curTuner == 1) {
			window.gSocket.addEventListener("mtk.webui.channelscan.dvbc.notify", this.notifyData.bind(this));
		}
		window.gSocket.send(gWzdDvbtChannelScanProcessPageData.msg, function (data) {
			console.log(data);
		});
	},
	showPage: function () {
		this.notifyListener();
		var html = '<div id="channelScanProcess" class="languagePage"><div class="selectLanguage1">The Channel Scan May Take a While to Complete.</div><div class="selectLanguage">Status:Scanning...</div>';
		var html1 = '<div class="selectLanguage">Analog Channels:<span id="analog"></span></div><div class="selectLanguage">Digtal Channels:<span id="digtal"></span></div>';
		var html2 = '<div id="processBar" class="processBar"><div id="processFill" class="processFill"></div><div id="processResult" class="processResult"></div></div></div>';
		var myDiv = document.getElementById('promptInterface');
		underButton = '<div class="button"><div class="buttonExit">Cancel</div></div>';
		myDiv.innerHTML = html + html1 + html2 + underButton;
		document.getElementById('title').innerHTML = "Channel Scan";


		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			gWzdSubpageManage.goToPrev();
		}
	}
}

var gWzdTargetReigonPage = {
	regionindex1: 0,//用于左右切换
	regionindex2: 0,
	regionindex3: 0,
	region1Length: 0,//用于左右切换
	region2Length: 0,
	region3Length: 0,
	dataList: 0,
	curFocusIndex: 0,
	regionInternalIdx1: 0,//set时使用
	regionInternalIdx2: 0,
	regionInternalIdx3: 0,
	showPage: function () {
		gWzdSubpageManage.curPage = 'targetReigon';
		window.gSocket.send(gWzdTargetReigonPageData.getData(), function (data) {
			var ret = gWzdTargetReigonPageData.getDataCallback(data);
			if (ret.length != 0) {
				this.dataList = ret;
				this.region1Length = this.dataList.length;
				this.region2Length = this.dataList[gWzdTargetReigonPage.regionindex1].level.length;
				this.region3Length = this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].level.length;
			}
			var html = '<div class="targetReigonFocus"><div id="backFocus" class="backFocus">';

			var myDiv = document.getElementById('promptInterface');
			var html1 = '</div></div>';
			var html2 = '<div id="targetReigon" class="setConfig"><div class="selectLanguage1">Select Region</div>';

			html += '<div class="setConfigList moveFocus"><div id="configType1" class="configType1">Region1</div><div id="region1" class="configType2">' + this.dataList[0].name + '</div><div id="configType3" class="configType3"><></div></div>' +
				'<div class="setConfigList"><div id="configType1" class="configType1">Region2</div><div id="region2" class="configType2">' + this.dataList[0].level[0].name + '</div><div id="configType3" class="configType3"><></div></div>';
			if (this.dataList[0].level[0].level.length == 0) {
				html += '<div id="regionType" class="setConfigList disable"><div id="configType1" class="configType1">Region3</div><div id="region3" class="configType2">None Specified</div><div id="configType3" class="configType3"><></div></div>';
				this.regionInternalIdx3 = 0;
			} else {
				html += '<div id="regionType" class="setConfigList"><div id="configType1" class="configType1">Region3</div><div id="region3" class="configType2">' + this.dataList[0].level[0].level[0].name + '</div><div id="configType3" class="configType3"><></div></div>';
				this.regionInternalIdx3 = this.dataList[0].level[0].level[0].internalIdx;
			}
			this.regionInternalIdx1 = this.dataList[0].internalIdx;
			this.regionInternalIdx2 = this.dataList[0].level[0].internalIdx
			myDiv.innerHTML = html2 + html + html1;// + html2 + html + html3 + underButton;
			document.getElementById('title').innerHTML = "";
			document.onkeydown = gWzdTargetReigonPage.keyHandle.bind(this);
		});
	},
	keyHandle: function (event) {

		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		this.region1Length = this.dataList.length;
		this.region2Length = this.dataList[gWzdTargetReigonPage.regionindex1].level.length;
		this.region3Length = this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].level.length;
		if (event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			if (curIndex == 0) {
				if (gWzdTargetReigonPage.regionindex1 < this.region1Length - 1) {
					gWzdTargetReigonPage.regionindex1++;
				} else if (gWzdTargetReigonPage.regionindex1 == this.region1Length - 1) {
					gWzdTargetReigonPage.regionindex1 = 0;
				}
				gWzdTargetReigonPage.regionindex2 = 0;
			} else if (curIndex == 1) {
				if (gWzdTargetReigonPage.regionindex2 < this.region2Length - 1) {
					gWzdTargetReigonPage.regionindex2++;

				} else if (gWzdTargetReigonPage.regionindex2 == this.region2Length - 1) {
					gWzdTargetReigonPage.regionindex2 = 0;
				}

			} else if (curIndex == 2) {
				if (gWzdTargetReigonPage.regionindex3 < this.region3Length - 1) {
					gWzdTargetReigonPage.regionindex3++;
				} else if (gWzdTargetReigonPage.regionindex3 == this.region3Length - 1) {
					gWzdTargetReigonPage.regionindex3 = 0;
				}
			}
			document.getElementById('region1').innerHTML = this.dataList[gWzdTargetReigonPage.regionindex1].name;
			document.getElementById('region2').innerHTML = this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].name;
			if (this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].level.length == 0) {
				document.getElementById('region3').innerHTML = "None Specified";
				document.getElementById('regionType').classList.add("disable");
				this.regionInternalIdx3 = 0;
			} else {
				document.getElementById('regionType').classList.remove("disable");
				document.getElementById('region3').innerHTML = this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].level[gWzdTargetReigonPage.regionindex3].name;
				this.regionInternalIdx3 = this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].level[gWzdTargetReigonPage.regionindex3].internalIdx;
			}
			this.regionInternalIdx1 = this.dataList[gWzdTargetReigonPage.regionindex1].internalIdx;
			this.regionInternalIdx2 = this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].internalIdx;
		} else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			if (curIndex == 0) {
				if (gWzdTargetReigonPage.regionindex1 > 0) {
					gWzdTargetReigonPage.regionindex1--;
				} else if (gWzdTargetReigonPage.regionindex1 == 0) {
					gWzdTargetReigonPage.regionindex1 = this.region1Length - 1;
				}
				gWzdTargetReigonPage.regionindex2 = 0;
			} else if (curIndex == 1) {

				if (gWzdTargetReigonPage.regionindex2 > 0) {
					gWzdTargetReigonPage.regionindex2--;
				} else if (gWzdTargetReigonPage.regionindex2 == 0) {
					gWzdTargetReigonPage.regionindex2 = this.region2Length - 1;
				}

			} else if (curIndex == 2) {
				if (gWzdTargetReigonPage.regionindex3 > 0) {
					gWzdTargetReigonPage.regionindex3--;
				} else if (gWzdTargetReigonPage.regionindex3 == 0) {
					gWzdTargetReigonPage.regionindex3 = this.region3Length - 1;
				}
			}
			document.getElementById('region1').innerHTML = this.dataList[gWzdTargetReigonPage.regionindex1].name;
			document.getElementById('region2').innerHTML = this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].name;
			if (this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].level.length == 0) {
				document.getElementById('region3').innerHTML = "None Specified";
				document.getElementById('regionType').classList.add("disable");
				this.regionInternalIdx3 = 0;
			} else {
				document.getElementById('regionType').classList.remove("disable");
				document.getElementById('region3').innerHTML = this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].level[gWzdTargetReigonPage.regionindex3].name;
				this.regionInternalIdx3 = this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].level[gWzdTargetReigonPage.regionindex3].internalIdx;
			}
			this.regionInternalIdx1 = this.dataList[gWzdTargetReigonPage.regionindex1].internalIdx;
			this.regionInternalIdx2 = this.dataList[gWzdTargetReigonPage.regionindex1].level[gWzdTargetReigonPage.regionindex2].internalIdx;
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < curList.length - 1) {
				if (curList[curIndex + 1].classList.contains('disable') == false) {
					curList[curIndex].classList.remove("moveFocus");
					++this.curFocusIndex;
					++curIndex;
					curList[curIndex].classList.add("moveFocus");
				}
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				if (curList[2].classList.contains('disable') == false) {
					curList[curIndex].classList.remove("moveFocus");
					curIndex = curList.length - 1;
					curList[curIndex].classList.add("moveFocus");
					if (curIndex > this.showNum) {
						curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
					}
					this.curFocusIndex = 4;
				}
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.gWzdFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
				// this.regionindex1=0;
				// this.regionindex2=0;
				// this.regionindex3=0;
			}
		} else if (event.keyCode == KeyEvent.DOM_VK_ENTER) {
			window.gSocket.send(gWzdTargetReigonPageData.setData(this.regionInternalIdx1, this.regionInternalIdx2, this.regionInternalIdx3), function (data) {
				var ret = gWzdTargetReigonPageData.setDataCallback(data);
				if (ret == true) {
					gWzdSubpageManage.goToNext();
				}
			});
		}

	}

}

var gWzdLcnConflictPage = {//Cty:Italy.
	// groupFlag:0,
	dataList: {},
	curFocusIndex: 0,
	showNum: 5,
	curPage: 1,
	groupTotal: 0,
	curGroupIdx: 0,
	curLcn: 0,
	curChannelName: null,
	// getData: function () {
	// 	this.dataList = gWzdLcnConflictPageData.getData();
	// },
	showPage: function () {
		// gWzdLcnConflictPageData.getData()
		gWzdSubpageManage.curPage = 'lcnConflict';
		window.gSocket.send(gWzdLcnConflictPageData.getData(), function (data) {
			// console.log(data);
			var ret = gWzdLcnConflictPageData.getDataCallback(data);
			// console.log(ret);
			if (ret.length != 0) {
				this.dataList = ret;
				console.log(this.dataList);
				// console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
				// gWzdSubpageManage.goToNext();
			}
			else {
				// console.log("return error.........................");
			}
			// });
			// this.getData();
			this.curFocusIndex = 0;
			var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
			var myDiv = document.getElementById('promptInterface');
			var html1 = '<div id="favoriteNetwork" class="languagePage">';
			var html2 = ''
			var html3 = '</div></div></div>';
			//var groupTotal;
			this.groupTotal = this.dataList[this.dataList.length - 1].groupIdx;
			console.log(this.showNum);
			// temp = this.dataList
			ret.filter(r => r.groupIdx === gWzdLcnConflictPage.curPage).forEach((v, i) => {
				if (i == 0) {
					html += '<div class="selectLanguage moveFocus">' + v.channelName + '</div>';
				} else {
					html += '<div class="selectLanguage">' + v.channelName + '</div>';
				}
				// console.log(typeof v.groupIdx);
				// console.log(v.groupIdx);
				this.curGroupIdx = v.groupIdx;
				this.curLcn = v.LCN;
				html2 = '<div class="selectLanguage1">Conflict Group Index:<span id="groupIndex">' + v.groupIdx + '/' + this.groupTotal + '</span>Channel Number:<span id="number">' + v.LCN + '</span></div>';
			})
			// for (var i = 0; i < this.dataList.length; i++) {

			// }
			myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
			document.getElementById('title').innerHTML = "Language";
			document.onkeydown = gWzdLcnConflictPage.keyHandle.bind(this);
		});
	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		// console.log();
		if (event.keyCode == KeyEvent.DOM_VK_ENTER) {
			console.log(this.curGroupIdx);
			console.log(this.curLcn);
			this.curChannelName = curFocus.innerHTML;
			if (gWzdLcnConflictPage.curPage < this.groupTotal) {
				gWzdLcnConflictPage.curPage++;
				window.gSocket.send(gWzdLcnConflictPageData.setData(this.curGroupIdx, this.curLcn, this.curChannelName), function (data) {
					console.log(data);
					var ret = gWzdLcnConflictPageData.setDataCallback(data);
					if (ret == true) {
						gWzdLcnConflictPage.showPage();
					}
				});
			} else {
				window.gSocket.send(gWzdLcnConflictPageData.setData(this.curGroupIdx, this.curLcn, curIndex), function (data) {
					console.log(data);
					var ret = gWzdLcnConflictPageData.setDataCallback(data);
					if (ret == true) {
						gWzdSubpageManage.goToNext();
					}
				});

			}

			// window.gSocket.send(gWzdFavoriteNetworkPageData.setData(curIndex), function (data) {
			// 	var ret = gWzdFavoriteNetworkPageData.setDataCallback(data);
			// 	if (ret == true) {
			// 		
			// 	}
			// });
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == curList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = curList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}

	}
}

var gWzdFavoriteNetworkPage = {//Cty:Norway
	dataList: [],
	curFocusIndex: 0,
	showNum: 5,
	showPage: function () {
		this.curFocusIndex = 0;
		gWzdSubpageManage.curPage = 'favoriteNetwork';
		window.gSocket.send(gWzdFavoriteNetworkPageData.getData(), function (data) {
			console.log(data);
			var ret = gWzdFavoriteNetworkPageData.getDataCallback(data);
			if (ret.length != 0) {
				this.dataList = ret;
				console.log(this.dataList);
				// console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
				// gWzdSubpageManage.goToNext();
			}
			else {
				// console.log("return error.........................");
			}
			var html = '<div class="backFocus1"><div id="backFocus" class="backFocus">';
			var myDiv = document.getElementById('promptInterface');
			var html1 = '<div id="favoriteNetwork" class="languagePage">';
			var html2 = '<div class="selectLanguage1">Please Select Your Favorite Network:</div>';
			var html3 = '</div></div></div>';

			for (var i = 0; i < this.dataList.length; i++) {
				if (i == 0) {
					html += '<div class="selectLanguage moveFocus">' + this.dataList[i] + '</div>';
				} else {
					html += '<div class="selectLanguage">' + this.dataList[i] + '</div>';
				}
			}

			myDiv.innerHTML = html1 + html2 + html + html3 + underButton;
			document.getElementById('title').innerHTML = "Network";
			document.onkeydown = gWzdFavoriteNetworkPage.keyHandle.bind(this);

		});

	},
	keyHandle: function (event) {
		var curFocus = document.getElementsByClassName('moveFocus')[0];
		var curList = curFocus.parentElement.children;
		var curIndex = [].indexOf.call(curList, curFocus);
		var curItem = document.getElementById('backFocus');
		var curtop = window.getComputedStyle(curItem).top;
		var curheigh = curFocus.offsetHeight;
		if (event.keyCode == KeyEvent.DOM_VK_ENTER || event.keyCode == KeyEvent.DOM_VK_RIGHT) {
			window.gSocket.send(gWzdFavoriteNetworkPageData.setData(curIndex), function (data) {
				var ret = gWzdFavoriteNetworkPageData.setDataCallback(data);
				if (ret == true) {
					gWzdSubpageManage.goToNext();
				}
			});
		} else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
			if (curIndex < this.dataList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				++this.curFocusIndex;
				++curIndex;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex > 4) {
					this.curFocusIndex--;
					curtop = Number(curtop.substring(0, curtop.length - 2)); //字符串截取与转换
					curItem.style.top = curtop - curheigh + 'px';
				}

			} else if (curIndex == this.dataList.length - 1) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = 0;
				this.curFocusIndex = 0;
				curList[curIndex].classList.add("moveFocus");
				curItem.style.top = 0 + 'px';
			}

		} else if (event.keyCode == KeyEvent.DOM_VK_UP) {
			if (curIndex == 0) {
				curList[curIndex].classList.remove("moveFocus");
				curIndex = this.dataList.length - 1;
				curList[curIndex].classList.add("moveFocus");
				if (curIndex > this.showNum) {
					curItem.style.top = (-(curList.length - this.showNum) * curheigh) + 'px';
				}
				this.curFocusIndex = 4;
			} else {
				curList[curIndex].classList.remove("moveFocus");
				--curIndex;
				this.curFocusIndex--;
				curList[curIndex].classList.add("moveFocus");
				if (this.curFocusIndex < 0) {
					this.curFocusIndex++;
					curItem.style.top = Number(curtop.substring(0, curItem.style.top.length - 2)) + curheigh + 'px';
				}
			}
		}
		// else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
		// 	gWzdSubpageManage.goToPrev();
		// }
	}
}

var gWzdCompletePage = {
	showPage: function () {
		var myDiv = document.getElementById('promptInterface');
		var html1 = '<div id="welcome" class="welcomePage">'
		var html2 = '<div class="promptDetail">Congratulations !!</div><div class="promptDetail">Completed Initial Setup.</div><div class="promptDetail">Please press [ENTER] to exit the wizard.</div>';
		// var html2 = '<div class="promptDetail">'+mtvuiUtil.getLangString('WZD_DESC_CMPL')+'</div>';
		var html3 = '</div>';
		var completeButton = '<div class="button"><div class="buttonSize">Back</div></div>';
		myDiv.innerHTML = html1 + html2 + html3 + completeButton;
		document.getElementById('title').innerHTML = "Complete";
		document.onkeydown = this.keyHandle.bind(this);
	},
	keyHandle: function (event) {
		if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
			gWzdSubpageManage.goToPrev();
		}
	},
}

var gWzdSubpageManage = {
	curPage: null,
	pageList: [],
	pageMap: {
		welcome: gWzdWelcomePage,
		language: gWzdLanguagePage,
		country: gWzdCountryPage,
		tunerMode: gWzdTunerModePage,
		satelliteType: gWzdSatelliteTypePage,
		channelScan: gWzdChannelScanPage,
		parentPwd: gWzdParentPwdPage,
		postCode: gWzdPostCodePage,
		timeZone: gWzdTimeZonePage,
		samba: gWzdSambaPage,
		disableSamba: gWzdDisableSambaPage,
		complete: gWzdCompletePage,

		dvbtOperator: gWzdDvbtOperatorPage,
		dcbtChannelScanProcess: gWzdDvbtChannelScanProcessPage,
		targetReigon: gWzdTargetReigonPage,
		favoriteNetwork: gWzdFavoriteNetworkPage,
		lcnConflict: gWzdLcnConflictPage,

		dvbcOperator: gWzdDvbcOperatorPage,
		dvbcInfo: gWzdDvbcInfoPage,

		dvbsOperator: gWzdDvbsOperatorPage,
		dvbsTKGSScanInfo: gWzdDvbsTKGSScanInfoPage,
		dvbsTKGSSetLocator: gWzdDvbsTKGSSetLocatorPage,
		dvbsTKGSAddLocator: gWzdDvbsTKGSAddLocatorPage,
		dvbsTKGSUpdateLocator: gWzdDvbsTKGSUpdateLocatorPage,
		dvbsTKGSSelectScan: gWzdDvbsTKGSSelectTablePage,
		dvbsTKGSScan: gWzdDvbsTKGSChannelScanProcessPage,
		dvbsTricolorScan: gWzdDvbsTricolorChannelScanProcessPage,
		dvbsTricolorSelectTable: gWzdDvbsTricolorSelectTablePage,
		dvbsM7Scan: gWzdDvbsM7ChannelScanProcessPage,
		dvbsFreeviewRegion: gWzdDvbsFreeviewRegionPage,
		dvbsFransatBat: gWzdDvbsFransatBatPage,
		dvbsSetup: gWzdDvbsAntennaSetupPage,
		dvbsAlphaCfg: gWzdDvbsAlphaCfgPage,
		dvbsSelectSat: gWzdDvbsSelectSatPage,
		dvbsNotOptSetup: gWzdDvbsNotOptSetupPage,
		dvbsNotOptSetup2: gWzdDvbsNotOptSetup2Page,
		dvbsNotOptSetTran: gWzdDvbsNotOptSetTranPage,
		dvbsNotOptSetDiSEqC: gWzdDvbsNotOptDiSEqCPage,
		dvbsNotOptSetDiSEqC2: gWzdDvbsNotOptDiSEqC2Page,
		dvbsNotOptSetDiSEqC3: gWzdDvbsNotOptDiSEqC3Page,
		dvbsNotOptSetDiSEqC4: gWzdDvbsNotOptDiSEqC4Page,
		dvbsNotOptSetDiSEqC5: gWzdDvbsNotOptDiSEqC5Page,
		antennaCfg: gWzdAntennaCfgPage,

	},
	goToNext: function () {
		var allDefine = JSON.parse(localStorage.getItem("gWzdAllDefine"));
		if (this.curPage == null) {
			// this.curPage = 'dcbtChannelScanProcess';
			this.curPage = 'welcome';
			this.pageList[0] = 'welcome';
		} else if (this.curPage == 'welcome') {
			this.curPage = 'language';
			this.pageList[this.pageList.length] = 'language';
			//			this.curPage = 'parentPwd';
		} else if (this.curPage == 'language') {
			if (allDefine.APP_REGION_CHINA_ONLY == 1) {
				if (allDefine.APP_DVBC_SUPPORT == 1 || allDefine.APP_DVBS_SUPPORT == 1) {
					this.curPage = 'tunerMode';
					this.pageList[this.pageList.length] = 'tunerMode';
				} else {
					this.curPage = 'channelScan';
					this.pageList[this.pageList.length] = 'channelScan';
				}
			} else {
				if (allDefine.APP_TWN_SUPPORT == 0) {
					this.curPage = 'country';
					this.pageList[this.pageList.length] = 'country';
				} else {
					this.curPage = 'channelScan';
					this.pageList[this.pageList.length] = 'channelScan';
				}
			}
		} else if (this.curPage == 'country') {
			//			this.curPage = 'tunerMode';
			//			gWzdCountryPage.curCountry = 'Russia';
			//			console.log(gWzdCountryPage.curCty);
			console.log(gWzdCountryPageData.curCty);
			if (allDefine.APP_SUPPORT_ACR_SAMBA == 1) {
				this.curPage = 'samba';
				this.pageList[this.pageList.length] = 'samba';
			} else {
				if (gWzdCountryPageData.curCty == 'FRA' || gWzdCountryPageData.curCty == 'ITA' ||
					gWzdCountryPageData.curCty == 'BEL') {
					this.curPage = 'parentPwd';
					this.pageList[this.pageList.length] = 'parentPwd';
				} else if (allDefine.APP_NAV_EWS_PA_SUPPORT == 1 && gWzdCountryPageData.curCty == 'IDN') {
					this.curPage = 'postCode';
					this.pageList[this.pageList.length] = 'postCode';
				} else if (gWzdCountryPageData.curCty == 'RUS') {
					this.curPage = 'timeZone';
					this.pageList[this.pageList.length] = 'timeZone';
				} else {
					if (allDefine.APP_DVBC_SUPPORT == 1 || allDefine.APP_DVBS_SUPPORT == 1) {
						this.curPage = 'tunerMode';
						this.pageList[this.pageList.length] = 'tunerMode';
					} else {
						this.curPage = 'channelScan';
						this.pageList[this.pageList.length] = 'channelScan';
					}
				}
			}
		} else if (this.curPage == 'samba') {
			// gWzdCountryPage.curCountry = 'Indonesia';
			var b_samba_sel_disable = 1; //需做判断 1==disable，0==able
			if (allDefine.APP_SUPPORT_ACR_SAMBA == 1 && b_samba_sel_disable == 1) {
				this.curPage = 'disableSamba';
				this.pageList[this.pageList.length] = 'disableSamba';
			} else {
				if (gWzdCountryPageData.curCty == 'FRA' || gWzdCountryPageData.curCty == 'ITA' ||
					gWzdCountryPageData.curCty == 'BEL') {
					this.curPage = 'parentPassword';
					this.pageList[this.pageList.length] = 'parentPassword';
				} else if (allDefine.APP_NAV_EWS_PA_SUPPORT == 1 && gWzdCountryPageData.curCty == 'IDN') {
					this.curPage = 'postCode';
					this.pageList[this.pageList.length] = 'postCode';
				} else if (gWzdCountryPageData.curCty == 'RUS') {
					this.curPage = 'timeZone';
					this.pageList[this.pageList.length] = 'timeZone';
				} else {
					if (allDefine.APP_DVBC_SUPPORT == 1 || allDefine.APP_DVBS_SUPPORT == 1) {
						this.curPage = 'tunerMode';
						this.pageList[this.pageList.length] = 'tunerMode';
					} else {
						this.curPage = 'channelScan';
						this.pageList[this.pageList.length] = 'channelScan';
					}
				}
			}
		} else if (this.curPage == 'disableSamba') {
			var b_samba_confirm_to_disable = 0; //需做判断
			if (allDefine.APP_SUPPORT_ACR_SAMBA == 1 && b_samba_confirm_to_disable == 1) {
				if (gWzdCountryPageData.curCty == 'FRA' || gWzdCountryPageData.curCty == 'ITA' ||
					gWzdCountryPageData.curCty == 'BEL') {
					this.curPage = 'parentPassword';
					this.pageList[this.pageList.length] = 'parentPassword';
				} else if (allDefine.APP_NAV_EWS_PA_SUPPORT == 1 && gWzdCountryPageData.curCty == 'IDN') {
					this.curPage = 'postCode';
					this.pageList[this.pageList.length] = 'postCode';
				} else if (gWzdCountryPageData.curCty == 'RUS') {
					this.curPage = 'timeZone';
					this.pageList[this.pageList.length] = 'timeZone';
				} else {
					if (allDefine.APP_DVBC_SUPPORT == 1 || allDefine.APP_DVBS_SUPPORT == 1) {
						this.curPage = 'tunerMode';
						this.pageList[this.pageList.length] = 'tunerMode';
					} else {
						this.curPage = 'channelScan';
						this.pageList[this.pageList.length] = 'channelScan';
					}
				}
			} else {
				this.curPage = 'samba';
				this.pageList[this.pageList.length] = 'samba';
			}
		} else if (this.curPage == 'postCode' || this.curPage == 'timeZone' || this.curPage == 'parentPwd') {
			if (allDefine.APP_DVBC_SUPPORT == 1 || allDefine.APP_DVBS_SUPPORT == 1) {
				this.curPage = 'tunerMode';
				this.pageList[this.pageList.length] = 'tunerMode';
			} else {
				this.curPage = 'channelScan';
				this.pageList[this.pageList.length] = 'channelScan';
			}
		} else if (this.curPage == 'tunerMode') {
			var state = gWzdDvbcOperatorData.enterOperator();
			var state_t = gWzdDvbtOperatorData.enterOperator();
			console.log(state_t);
			console.log(allDefine.APP_DVBT_SUPPORT);
			console.log(gWzdTunerModePageData.curTuner);
			//			gWzdCountryPage.curCountry = 'Italy';
			if (allDefine.APP_DVBT_SUPPORT == 1 && state_t == true && gWzdTunerModePageData.curTuner == 0) {
				this.curPage = 'dvbtOperator';
				this.pageList[this.pageList.length] = 'dvbtOperator';
			} else if (allDefine.APP_DVBC_SUPPORT == 1 && state == true && gWzdTunerModePageData.curTuner == 1) {
				this.curPage = 'dvbcOperator';
				this.pageList[this.pageList.length] = 'dvbcOperator';
			} else if (allDefine.APP_DVBC_SUPPORT == 1 && gWzdTunerModePageData.curTuner == 2) {
				// this.curPage = 'dvbsOperator';
				this.curPage = 'satelliteType';
			} else {
				this.curPage = 'channelScan';
			}

		} else if (this.curPage == 'satelliteType') {
			this.curPage = 'dvbsOperator';
		} else if (this.curPage == 'dvbtOperator' || this.curPage == 'dvbcOperator') {
			this.curPage = 'channelScan';
		} else if (this.curPage == 'dvbsOperator') {
			this.curPage = 'antennaCfg';
		}
		// else if (this.curPage == 'satelliteType') {
		// this.curPage = 'channelScan';
		// } 
		else if (this.curPage == 'channelScan') {
			this.curPage = 'dcbtChannelScanProcess';
		} else if (this.curPage == 'lcnConflict' || this.curPage == 'favoriteNetwork' ||
			this.curPage == 'targetReigon') {
			this.curPage = 'complete';
		}
		//		console.log(this.curPage);
		this.pageMap[this.curPage].showPage();
	},
	goToPrev: function () {
		if (this.curPage == 'complete' || this.curPage == 'dcbtChannelScanProcess') {
			this.curPage = 'channelScan';
		} else if (this.curPage == 'channelScan') {
			this.curPage = 'satelliteType';
		} else if (this.curPage == 'satelliteType') {
			this.curPage = 'tunerMode';
		} else if (this.curPage == 'tunerMode') {
			this.curPage = 'country';
		} else if (this.curPage == 'country') {
			this.curPage = 'language';
		} else if (this.curPage == 'language') {
			this.curPage = 'welcome';
		} else if (this.curPage == 'welcome') {
			this.curPage = null;
		}

		this.pageMap[this.curPage].showPage();
	},
}