window.mtvuiUtil = {
    "base_url":"",
    "getBaseURL": function () {
        if (!this.base_url) {
            var res = window.location.href.match(/.*\/webui\//);
            this.base_url = (res.length > 0) ? res[0] : "";
        }
        return this.base_url;
    },
    handleErr:function (msg,url,l){
        try{
            getTvJspService().utility.print_log(0, 'error:'+msg+";"+url+":"+l);
        }catch(e){

        }
        return false;
    },
    "replaceConsole": function () {
        var funs = ["error", "warr", "info", "log"];
        // try to save the original function
        for (i in funs) {
            if (!console["o" + funs[i]]) {
                console["o" + funs[i]] = console[funs[i]];
                console[funs[i]] = (function(fn){
                    return function() {
                        var callstack = Error().stack.split("\n");
                        var prefix = "";
                        if (callstack.length >= 4)
                            prefix += callstack[3].replace(/.*\((.*)\).*/,'$1');

                            var s = prefix + " ";
                            try {
                                for (i in arguments)
                                	if(typeof arguments[i] == 'object')
                                    	s += JSON.stringify(arguments[i]) + ",";
                                    else
                                    	s += arguments[i] + ",";
                            } catch(e) {
                                s += "(error happen)";
                            }
                        /*mtvuiUtil.log_inner.apply(mtvuiUtil.log_inner, arguments);
                        var level = 1;
                        switch(fn){
                        	case "info":
                        	level = 0;
                        	break;
                        	case "log":
                        	level = 1;
                        	break;
                        	case "warr":
                        	level = 2;
                        	break;
                        	case "error":
                        	level = 3;
                        	break;
                        }
                        try{
                            getTvJspService().utility.print_log(level, s);
                        }catch(e){

                        }*/
                        console["o" + fn].apply(console, [s]);
                        //console["o" + fn].apply(console, arguments);
                    }
                })(funs[i]);
            }
        }
    },
    getPageInfoByKey: function(keycode) {
        for(var item of this.pageList){
            if(item.hotKey.indexOf(keycode) >= 0){
                return item;
            }
        }
        return null;
    },
    getCurrentPageInfo: function () {
        if (!this.currentpageInfo ) {
            var page_url = window.location.href;
            this.currentpageInfo = mtvuiUtil.sys_page_list[0];
            // get the longest matched url
            for (var pg in mtvuiUtil.sys_page_list) {
                if (page_url.indexOf(mtvuiUtil.sys_page_list[pg].url) == 0
                    && mtvuiUtil.sys_page_list[pg].url.length > this.currentpageInfo.url.length)
                    this.currentpageInfo = mtvuiUtil.sys_page_list[pg];
            }
        }
        return this.currentpageInfo;
    },
    sendPageID: function (doAction) {

    },
    isFramed: function () {
        return window.top.location != window.self.location;
    },
    getParentPageID: function () {
        return getParameterByName("parentPageID");
    },
    storeFocus: function () {
        this._focusObj = $(":focus");
    },
    restoreFocus: function () {
        if (this._focusObj)
            this._focusObj.focus();
    },
    procSysKey: function  (key, callback) {

    },
    reinstallTv:function(){

    },
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// "hotKey": for hot key,
// "id":      the identical,
// "pageID":  PageID send to webui_comp
// "url": page link
mtvuiUtil.pageList = [
    {"hotKey":[KeyEvent.DOM_VK_GHOST, KeyEvent.DOM_VK_NUMPAD0],
     "id": "sys_nav",
     "pageID": "WEB_UI_PAGE_NAVIGATOR",
     "url": mtvuiUtil.getBaseURL() + "nav/index.html"},
];

mtvuiUtil.launchWebPage = function (id) {

    return true;
};

// load the sctipt when not exist, otherwise do nothing
var mtvuiLoadScript = function (oldurl, url, callback) {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        if(scripts[i].src){
            if (scripts[i].src == oldurl || scripts[i].getAttribute("src") == oldurl) {
                // exist
                document.head.removeChild(scripts[i]);
            } else if(scripts[i].src == url || scripts[i].getAttribute("src") == url) {
                if (callback) {
                    callback();
                }
                return;
            }            
        }
    }
    // not exist
    var script = document.createElement('script');
    script.src = url;
    if (callback) {
        script.onload = callback;
        document.head.appendChild(script);
    } else {
        document.head.appendChild(script);
    }
};

/*
*{key,[element]}
*/
mtvuiUtil.I18NElementMap = [];
mtvuiUtil.curLang = "";
mtvuiUtil.getLangCallback = function(data){
    mtvuiLoadScript(mtvuiUtil.curLang ? "../i18n/"+mtvuiUtil.curLang+".js":undefined, "../i18n/"+data.Lang+".js", mtvuiUtil.langChang.bind(mtvuiUtil));
    mtvuiUtil.curLang = data.Lang;
}
mtvuiUtil.langChang = function() {
    for(var item of this.I18NElementMap){
        var dataLang = item.getAttribute('data-lang');
        if(dataLang){
            item.innerHTML = this.getLangString(dataLang);
        }
    }
    var spanList = Array.prototype.slice.call(document.querySelectorAll('span[data-lang]'));
    for(var item of spanList) {
        item.innerHTML = this.getLangString(item.getAttribute('data-lang'));
    }
}
mtvuiUtil.getLangString = function(mlmKey){
    if(window.mtvuiLangDict)
    {
        return window.mtvuiLangDict[mlmKey]
    }
    return null;
}
mtvuiUtil.createI18NElement = function(mlmKey){
    var spanDom = document.createElement("span");
    spanDom.innerHTML = this.getLangString(mlmKey);
    spanDom.setAttribute("data-lang", mlmKey);
    this.I18NElementMap.push(spanDom);
    return spanDom;
}

var MtvWebsocket = function(wsUrlStr){
//  console.log("wsUrlStr = " +wsUrlStr);
    var __host = wsUrlStr;
    var __id = 1;
    var __ws = null;
    var __bConnected = "close";
    var __callbackMap = {};
    var cacheMsg = [];
    var getId = function(){
        if(__id >= 0xffffffff){
            __id = 1;
        } else {
            __id++;
        }
        return __id;
    };
    var sendData = function(msg, callback){
//      console.log(msg);
        __ws.send(JSON.stringify(msg));
        if(callback instanceof Function){
            __callbackMap[msg.id] = callback;
        }
    };
    var recv = function(data){
//      console.log(data);
        if (typeof data == 'string') {
            try{
                data = JSON.parse(data);
                if(Array.isArray(data)){
                    
                } else {
                    if(data.hasOwnProperty("id")){
                        //TODO:receive reponse
                        if(__callbackMap[data.id]){
                            __callbackMap[data.id](data);
                        }
                    } else {
                        //TODO:notify data flow
                        console.log("data.method = "+data.method);
                        var funList = MtvWebsocket.prototype.listenerList[data.method];
                        funList.forEach(function (element, index, array) {
                            element.apply(null, data);
                        });
                    }
                }
            }catch(e){
                console.log('error：'+e+'!!!');
            }
        }
        
    };
    
    var onopen = (function(supper){
        return function(){
                __bConnected = "opened";
                var getLangStr = {method:"getLang"};
                supper.send(getLangStr, mtvuiUtil.getLangCallback);
                var cacheItem; 
                while(cacheItem = cacheMsg.pop()){
                   sendData(cacheItem.msg, cacheItem.callback); 
                }
            }
    })(this);
    
    var onclose = (function(supper){
        return function(){
                __bConnected = "close";
            }
    })(this);
    
    var onmessage = (function(supper){
        return function(e){
                recv(e.data);
            }
    })(this);
    
    var startWs = function(){
//      console.log("__host = " +__host);
        __bConnected = "opening";
        __ws = new WebSocket(__host);
        __ws.onopen = onopen;
        __ws.onclose = onclose;
        __ws.onmessage = onmessage;
    };
    
    this.send = function(msg, callback){
//      console.log("__bConnected = " +__bConnected);
        if(!msg || typeof(msg) != "object"){
            return -1;
        }
        if(msg.hasOwnProperty('id')){
            return -2;
        }
        if(__bConnected != "opened"){
            if(__bConnected == "close"){
                startWs();
            }
            msg.id = getId();
            cacheMsg.push({"msg":msg, "callback":callback});
        } else {
            // add id,and return to caller
            msg.id = getId();
            sendData(msg, callback);
        }
        return msg.id;
    };
    startWs.apply(this);
};

MtvWebsocket.prototype.Event = {
    AcfgNotify:"regAcfgNotify",
};
MtvWebsocket.prototype.listenerList = {};
MtvWebsocket.prototype.addEventListener = function(name, notifyFunc){
    if(notifyFunc instanceof Function){
        if (!MtvWebsocket.prototype.listenerList.hasOwnProperty(name)) {
            MtvWebsocket.prototype.listenerList[name] = [notifyFunc];
            //send reg data
        } else {
            var idx = MtvWebsocket.prototype.listenerList[name].indexOf(notifyFunc);
            if (idx < 0){
                MtvWebsocket.prototype.listenerList[name].push(notifyFunc);
            }
        }
    }
};

var mtvui_debug_enable = false;
var mtvui_debug_log = function (s) {
    if (mtvui_debug_enable)
        console.log(s);
};



(function () {
    if (mtvuiUtil.isFramed()) {
        var pageInfo = mtvuiUtil.getCurrentPageInfo();
        if (pageInfo.id == "sys_index") {
            mtvuiUtil.exitMenu();
        }
        else {
            mtvuiUtil.sendPageID();
        }
    }
    else {
        mtvuiUtil.sendPageID();
       //register listener for usb Detect,add for mmp
        try {
            if ("Win32" != navigator.platform){
                 //mtvuiUtil.replaceConsole();
            }
            onerror=mtvuiUtil.handleErr;
        }catch(err) {console.log(err);}
    }
    window.gSocket = new MtvWebsocket("ws://172.26.149.165:3000/");
})();
