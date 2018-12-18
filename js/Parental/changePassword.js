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
		document.querySelector('#container').innerHTML = html;
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
						document.querySelector('.confirm').children[1].innerHTML='';
						document.querySelector('.new').children[1].setAttribute('data-pwd', '');
						document.querySelector('.new').children[1].innerHTML='';
						removeClass(document.querySelector('.confirm'), 'focus');
						addClass(document.querySelector('.new'), 'focus');
					}else{
						returnListPage();
					}
				}else{
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