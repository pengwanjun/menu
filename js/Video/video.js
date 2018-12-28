
var mjcDemo = {
	render: function() {
		var html = `
		<div id="mjcDemo">
			<div>MJC Demo</div>
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

var visuallyImpairedAudio={
	render: function() {
		var html = `
		<div id="visuallyImpaired">
			<div>Eng</div>
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

var soundtracks={
	render:function(){
		
	},
	keyEvent:function(){
		
	}
}
