var password = {
	render: function() {
		var html = `
		<div id="password">
			<div class="input" data-pwd=""></div>
		</div>
	`;
		document.querySelector('#container').innerHTML = html;
	},
	keyEvent: function(e) {
		var pwd = document.querySelector('.input').getAttribute('data-pwd');
		if(e.keyCode == KeyEvent.DOM_VK_0 || e.keyCode == KeyEvent.DOM_VK_1 || e.keyCode == KeyEvent.DOM_VK_2 ||
			e.keyCode == KeyEvent.DOM_VK_3 || e.keyCode == KeyEvent.DOM_VK_4 || e.keyCode == KeyEvent.DOM_VK_5 ||
			e.keyCode == KeyEvent.DOM_VK_6 || e.keyCode == KeyEvent.DOM_VK_7 || e.keyCode == KeyEvent.DOM_VK_8 ||
			e.keyCode == KeyEvent.DOM_VK_9) {
			if(pwd == '123' && e.keyCode == KeyEvent.DOM_VK_4) {
				Menu.data[4].value={
					valType:'list',
					data:gMenuParentalShow
				}
				gMenuChild=gMenuParent.data[4].value;
				gMenuoIndex=4;
				gMenuClassName='firstList';
				gMenuNavlist=[];
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