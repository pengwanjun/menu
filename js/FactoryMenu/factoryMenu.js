
var EUSystem={
    render:function(){
        var html=`
            <div id="EUSystem">
                <div class="scanList" style="position:relative;top:0rem;">
                    <div class="listItem focus scanSelect">
                        <div class="lf">FM Saturation Mute</div>
                        <div class="mid"></div>
                        <div class="rt">Off</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">EU Non-EU System</div>
                        <div class="mid"></div>
                        <div class="rt">Off</div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('#showList').innerHTML=html;
        gMenuPageName='EUSystem';
    },
    keyEvent:function(e){
        var curFocus=document.querySelector('#EUSystem .focus');
        var curList=curFocus.parentElement.children;
        var curIndex=[].indexOf.call(curList,curFocus);
        switch (e.keyCode){
            //上键
            case KeyEvent.DOM_VK_UP:
                if(curIndex==0){
                    addClass(curList[curList.length-1],'focus');
                    removeClass(curFocus,'focus');
                }else{
                    addClass(curList[curIndex-1],'focus');
                    removeClass(curFocus,'focus');
                }
            break;
            //下键
            case KeyEvent.DOM_VK_DOWN:
                if(curIndex==curList.length-1){
                    addClass(curList[0],'focus');
                    removeClass(curFocus,'focus');
                }else{
                    addClass(curList[curIndex+1],'focus');
                    removeClass(curFocus,'focus');
                }
            break;
            //右键弹出框选择
            case KeyEvent.DOM_VK_RIGHT:
            case KeyEvent.DOM_VK_ENTER:
                console.log('pop选择');
            break;
            //左键或返回键
            case KeyEvent.DOM_VK_LEFT:
            case KeyEvent.DOM_VK_BACK_SPACE:
                fctoryMenuList.render();
            break;
        }
    }
}

var PALSyatem={
    render:function(){
        var html=`
            <div id="PALSyatem">
                <div class="scanList" style="position: relative;top: 0rem;">
                    <div class="listItem focus scanSelect">
                        <div class="lf">Correct Threshold</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">Total Sync Loop</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">Error Threshold</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">Parity Error Threshold</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">Every Number Frames</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">High Deviation Mode</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">AM Carrier Mute Mode</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">AM Carrier Mute Threshold High</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">AM Carrier Mute Threshold Low</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">Carrier Shift Function</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">FM Carrier Mute Mode</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">FM Carrier Mute Threshold High</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">FM Carrier Mute Threshold Low</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">PAL Fine Tune Volume</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">AM Fine Tune Volume</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">NICAM Fine Tune Volume</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('#showList').innerHTML=html;
        gMenuPageName='PALSyatem';
    },
    keyEvent:function(e){
        var curFocus=document.querySelector('#PALSyatem .focus');
        var curList=curFocus.parentElement.children;
        var curIndex=[].indexOf.call(curList,curFocus);
        switch (e.keyCode){
            //上键
            case KeyEvent.DOM_VK_UP:
                if(curIndex==0){
                    addClass(curList[curList.length-1],'focus');
                    removeClass(curFocus,'focus');
                    this.changePage(curList.length-1);
                }else{
                    addClass(curList[curIndex-1],'focus');
                    removeClass(curFocus,'focus');
                    this.changePage(curIndex-1);
                }
            break;
            //下键
            case KeyEvent.DOM_VK_DOWN:
                if(curIndex==curList.length-1){
                    addClass(curList[0],'focus');
                    removeClass(curFocus,'focus');
                    this.changePage(0);
                }else{
                    addClass(curList[curIndex+1],'focus');
                    removeClass(curFocus,'focus');
                    this.changePage(curIndex+1);
                }
            break;
            //右键弹出框选择
            case KeyEvent.DOM_VK_RIGHT:
            case KeyEvent.DOM_VK_ENTER:
                console.log('pop选择');
            break;
            //左键或返回键
            case KeyEvent.DOM_VK_LEFT:
            case KeyEvent.DOM_VK_BACK_SPACE:
                fctoryMenuList.render();
            break;
        }
    },
	//列表分页效果
	changePage:function(index){
		var floorIndex = Math.floor(index / 9);
		document.querySelector('#PALSyatem .scanList').style.top = -(floorIndex * 9 * Number(3)) + 'rem';
	}
}

var A2System={
    render:function(){
        var html=`
            <div id="A2System">
                <div class="scanList" style="position:relative;top:0rem;">
                    <div class="listItem focus scanSelect">
                        <div class="lf">Numbers of Check</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">Numbers of Double</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">Mono Weight</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">Stereo Weight</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">Dual Weight</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">High Deviation Mode</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">Carrier Shift Function</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">FM Carrier Mute Mode</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                    <div class="listItem scanSelect">
                        <div class="lf">FM Carrier Mute Threshold High</div>
                        <div class="mid"></div>
                        <div class="rt">10</div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('#showList').innerHTML=html;
        gMenuPageName='A2System';
    },
    keyEvent:function(e){
        var curFocus=document.querySelector('#A2System .focus');
        var curList=curFocus.parentElement.children;
        var curIndex=[].indexOf.call(curList,curFocus);
        switch (e.keyCode){
            //上键
            case KeyEvent.DOM_VK_UP:
                if(curIndex==0){
                    addClass(curList[curList.length-1],'focus');
                    removeClass(curFocus,'focus');
                    this.changePage(curList.length-1);
                }else{
                    addClass(curList[curIndex-1],'focus');
                    removeClass(curFocus,'focus');
                    this.changePage(curIndex-1);
                }
            break;
            //下键
            case KeyEvent.DOM_VK_DOWN:
                if(curIndex==curList.length-1){
                    addClass(curList[0],'focus');
                    removeClass(curFocus,'focus');
                    this.changePage(0);
                }else{
                    addClass(curList[curIndex+1],'focus');
                    removeClass(curFocus,'focus');
                    this.changePage(curIndex+1);
                }
            break;
            //右键弹出框选择
            case KeyEvent.DOM_VK_RIGHT:
            case KeyEvent.DOM_VK_ENTER:
                console.log('pop选择');
            break;
            //左键或返回键
            case KeyEvent.DOM_VK_LEFT:
            case KeyEvent.DOM_VK_BACK_SPACE:
                fctoryMenuList.render();
            break;
        }
    },
	//列表分页效果
	changePage:function(index){
		var floorIndex = Math.floor(index / 9);
		document.querySelector('#A2System .scanList').style.top = -(floorIndex * 9 * Number(3)) + 'rem';
	}
}

var fctoryMenuRangeScan={
    focusIndex:0,
    render:function(){
        var html=`
            <div id="fctoryMenuRangeScan">
                <div class="scanProgress">
                    <div class="scanProgressItem">
                        <div class="lf"></div>
                        <div class="mid">Scan with a range of channels.</div>
                        <div class="rt"></div>
                    </div>
                    <div class="scanProgressItem">
                        <div class="lf"></div>
                        <div class="mid">
                            <div class="progress">
                                <div style="width:0rem;" class="front"></div>
                            </div>
                        </div>
                        <div class="rt">0%</div>
                    </div>
                </div>
                <div class="scanList">
                    <div class="listItem">
                        <div class="lf">From Index</div>
                        <div class="mid">5</div>
                        <div class="rt"><span></span></div>
                    </div>
                    <div class="listItem">
                        <div class="lf">To Index</div>
                        <div class="mid">10</div>
                        <div class="rt"><span></span></div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('#showList').innerHTML=html;
        addClass(document.querySelector('#fctoryMenuRangeScan').getElementsByClassName('listItem')[this.focusIndex],'focus');
        gMenuPageName='fctoryMenuRangeScan';
    },
    keyEvent:function(e){
        var curFocus=document.querySelector('#fctoryMenuRangeScan .focus');
        var curList=curFocus.parentElement.children;
        var curIndex=[].indexOf.call(curList,curFocus);
        switch (e.keyCode){
            //上键
            case KeyEvent.DOM_VK_UP:
                if(curIndex==0){
                    addClass(curList[curList.length-1],'focus');
                    removeClass(curFocus,'focus');
                }else{
                    addClass(curList[curIndex-1],'focus');
                    removeClass(curFocus,'focus');
                }
            break;
            //下键
            case KeyEvent.DOM_VK_DOWN:
                if(curIndex==curList.length-1){
                    addClass(curList[0],'focus');
                    removeClass(curFocus,'focus');
                }else{
                    addClass(curList[curIndex+1],'focus');
                    removeClass(curFocus,'focus');
                }
            break;
            //右键弹出框选择
            case KeyEvent.DOM_VK_RIGHT:
                console.log('pop选择');
            break;
            case KeyEvent.DOM_VK_ENTER:
                console.log('scan');
            break;
            //左键或返回键
            case KeyEvent.DOM_VK_LEFT:
            case KeyEvent.DOM_VK_BACK_SPACE:
                fctoryMenuList.render();
            break;
        }
    }
}

var tunerDiagnostic={
    render:function(){
        var html=`
            <div id="tunerDiagnostic">
                <div class="scanList">
                    <div class="listItem focus">
                        <div class="lf">Version:</div>
                        <div class="mid">MTK_ATD</div>
                        <div class="rt"></div>
                    </div>
                    <div class="listItem">
                        <div class="lf">RF Freq (KHz):</div>
                        <div class="mid">5555</div>
                        <div class="rt"></div>
                    </div>
                    <div class="listItem">
                        <div class="lf">Lock State:</div>
                        <div class="mid">1</div>
                        <div class="rt"></div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('#showList').innerHTML=html;
        gMenuPageName='tunerDiagnostic';
    },
    keyEvent:function(e){
        var curFocus=document.querySelector('#tunerDiagnostic .focus');
        var curList=curFocus.parentElement.children;
        var curIndex=[].indexOf.call(curList,curFocus);
        switch (e.keyCode){
            //上键
            case KeyEvent.DOM_VK_UP:
                if(curIndex==0){
                    addClass(curList[curList.length-1],'focus');
                    removeClass(curFocus,'focus');
                }else{
                    addClass(curList[curIndex-1],'focus');
                    removeClass(curFocus,'focus');
                }
            break;
            //下键
            case KeyEvent.DOM_VK_DOWN:
                if(curIndex==curList.length-1){
                    addClass(curList[0],'focus');
                    removeClass(curFocus,'focus');
                }else{
                    addClass(curList[curIndex+1],'focus');
                    removeClass(curFocus,'focus');
                }
            break;
            //返回键
            case KeyEvent.DOM_VK_BACK_SPACE:
                fctoryMenuList.render();
            break;
        }
    }
}

//factory menu列表页
var fctoryMenuList={
    list:{},
    navList:[],
    render:function(){
        // console.log(this.list);
        if(!this.list.data[this.list.index].opera){
            this.list.index=menuList.canOperaDown(this.list,0);
        }
        var html1=`
            <div id="fctoryMenuList">
                <div class="scanList">
        `;
        var html2=``;
        for(var i in this.list.data){
            if(this.list.data[i].opera){
                if(i==this.list.index){
                    if(this.list.data[i].value.valType=='list' || this.list.data[i].value.valType=='scan'){
                        html2+=`
                            <div class="listItem focus">
                                <div class="lf">${this.list.data[i].name}</div>
                                <div class="mid"></div>
                                <div class="rt"><span></span></div>
                            </div>
                        `;
                    }
                    if(this.list.data[i].value.valType=='num'){
                        html2+=`
                            <div class="listItem focus">
                                <div class="lf">${this.list.data[i].name}</div>
                                <div class="mid">
                                    <div class="progress">
                                        <div style="left:${(this.list.data[i].value.data - this.list.data[i].value.min) / (this.list.data[i].value.max - this.list.data[i].value.min) * 20}rem" class="front"></div>
                                    </div>
                                </div>
                                <div class="rt"><span></span></div>
                            </div>
                        `;
                    }
                    if(this.list.data[i].value.valType=='select'){
                        html2+=`
                            <div class="listItem focus">
                                <div class="lf">${this.list.data[i].name}</div>
                                <div class="mid">${this.list.data[i].value.data[this.list.data[i].curVal]}</div>
                                <div class="rt"><span></span></div>
                            </div>
                        `;
                    }
                }else{
                    if(this.list.data[i].value.valType=='list' || this.list.data[i].value.valType=='scan'){
                        html2+=`
                            <div class="listItem">
                                <div class="lf">${this.list.data[i].name}</div>
                                <div class="mid"></div>
                                <div class="rt"><span></span></div>
                            </div>
                        `;
                    }
                    if(this.list.data[i].value.valType=='num'){
                        html2+=`
                            <div class="listItem">
                                <div class="lf">${this.list.data[i].name}</div>
                                <div class="mid">
                                    <div class="progress">
                                        <div style="left:${(this.list.data[i].value.data - this.list.data[i].value.min) / (this.list.data[i].value.max - this.list.data[i].value.min) * 20}rem" class="front"></div>
                                    </div>
                                </div>
                                <div class="rt"><span></span></div>
                            </div>
                        `;
                    }
                    if(this.list.data[i].value.valType=='select'){
                        html2+=`
                            <div class="listItem">
                                <div class="lf">${this.list.data[i].name}</div>
                                <div class="mid">${this.list.data[i].value.data[this.list.data[i].curVal]}</div>
                                <div class="rt"><span></span></div>
                            </div>
                        `;
                    }
                }
            }else{
                if(this.list.data[i].value.valType=='list' || this.list.data[i].value.valType=='scan'){
                    html2+=`
                        <div class="listItem disabled">
                            <div class="lf">${this.list.data[i].name}</div>
                            <div class="mid"></div>
                            <div class="rt"><span></span></div>
                        </div>
                    `;
                }
                if(this.list.data[i].value.valType=='num'){
                    html2+=`
                        <div class="listItem disabled">
                            <div class="lf">${this.list.data[i].name}</div>
                            <div class="mid">
                                <div class="progress">
                                    <div style="left:${(this.list.data[i].value.data - this.list.data[i].value.min) / (this.list.data[i].value.max - this.list.data[i].value.min) * 20}rem" class="front"></div>
                                </div>
                            </div>
                            <div class="rt"><span></span></div>
                        </div>
                    `;
                }
                if(this.list.data[i].value.valType=='select'){
                    html2+=`
                        <div class="listItem disabled">
                            <div class="lf">${this.list.data[i].name}</div>
                            <div class="mid">${this.list.data[i].value.data[this.list.data[i].curVal]}</div>
                            <div class="rt"><span></span></div>
                        </div>
                    `;
                }
            }
        }
        var html3= `
            </div>
        </div>
        `;
        document.querySelector('#showList').innerHTML=html1+html2+html3;
        this.changePage(this.list.index);
        gMenuPageName='fctoryMenuList';
    },
    keyEvent:function(e){
        var curFocus = document.querySelector("#fctoryMenuList .listItem.focus");
        var curList = curFocus.parentElement.children;
        var curIndex = [].indexOf.call(curList, curFocus);
        //下键
        if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
            var oIndex = menuList.canOperaDown(this.list, curIndex);
            this.changePage(oIndex);
            removeClass(curList[curIndex], 'focus');
            addClass(curList[oIndex], 'focus');
        }
        //上键
        if(e.keyCode == KeyEvent.DOM_VK_UP) {
            var oIndex = menuList.canOperaUp(this.list, curIndex);
            this.changePage(oIndex);
            removeClass(curList[curIndex], 'focus');
            addClass(curList[oIndex], 'focus');
        }
        //右键
        if(e.keyCode == KeyEvent.DOM_VK_RIGHT || e.keyCode == KeyEvent.DOM_VK_ENTER) {
            switch (this.list.data[curIndex].value.valType){
                case 'list':
                    this.list.index=curIndex;
                    this.navList.push(this.list);
                    this.list=this.list.data[this.list.index].value;
                    this.render();
                break;
                case "num":
                    console.log('num');
                break;
                case "select":
                    console.log('select');
                break;
                case "scan":
                    this.list.index=curIndex;
                    eval(this.list.data[curIndex].value.renderFuc).render();
                break;
            }         
        }
        //左键
        if(e.keyCode == KeyEvent.DOM_VK_LEFT || e.keyCode == KeyEvent.DOM_VK_BACK_SPACE){
            this.list.index=menuList.canOperaDown(this.list,this.list.data.length-1);
            if(this.navList.length==0){
                factoryMenu.render();
            }else{
                this.list=this.navList[this.navList.length-1];
                this.navList.pop();
                this.render();
            }
        } 
    },
    //列表分页效果
	changePage:function(index){
		var floorIndex = Math.floor(index / 9);
		document.querySelector('#fctoryMenuList .scanList').style.top = -(floorIndex * 9 * Number(3)) + 'rem';
	},
}
//factory menu首页
var factoryMenu={
    render:function(){
        var html1=`
            <div id="fctoryMenu">
                <div class="scanList">
                `;
                var html2=``;
                for(var i in gMenuFactoryMenu.data){
                    if(i==gMenuFactoryMenu.index){
                        html2+=`
                            <div class="listItem focus">
                                <div class="lf">${gMenuFactoryMenu.data[i].name}</div>
                                <div class="mid"></div>
                                <div class="rt"><span></span></div>
                            </div>
                        `;
                    }else{
                        html2+=`
                            <div class="listItem">
                                <div class="lf">${gMenuFactoryMenu.data[i].name}</div>
                                <div class="mid"></div>
                                <div class="rt"><span></span></div>
                            </div>
                        `;
                    }
                }
                var html3=`
                </div>
            </div>
        `;
        document.querySelector('#showList').innerHTML=html1+html2+html3;
        gMenuPageName='factoryMenu';
    },
    keyEvent:function(e){
        var curFocus = document.querySelector("#fctoryMenu .listItem.focus");
        var curList = curFocus.parentElement.children;
        var curIndex = [].indexOf.call(curList, curFocus);
        //下键
        if(e.keyCode == KeyEvent.DOM_VK_DOWN) {
            if(curIndex == curList.length - 1) {
                removeClass(curList[curList.length - 1], 'focus');
                addClass(curList[0], 'focus');
            } else {
                removeClass(curList[curIndex], 'focus');
                addClass(curList[curIndex + 1], 'focus');
            }
        }
        //上键
        if(e.keyCode == KeyEvent.DOM_VK_UP) {
            if(curIndex == 0) {
                removeClass(curList[0], 'focus');
                addClass(curList[curList.length - 1], 'focus');
            } else {
                removeClass(curList[curIndex], 'focus');
                addClass(curList[curIndex - 1], 'focus');
            }
        }
        //右键
        if(e.keyCode == KeyEvent.DOM_VK_RIGHT || e.keyCode == KeyEvent.DOM_VK_ENTER){
            gMenuFactoryMenu.index=curIndex;
            fctoryMenuList.list=gMenuFactoryMenu.data[gMenuFactoryMenu.index].value;
            fctoryMenuList.render();
        }
        //exit退出
        if(e.keyCode==KeyEvent.DOM_VK_BACK_SPACE || e.keyCode==KeyEvent.DOM_VK_LEFT){
            //返回到menu页面
            gMenuClassName='menuList';
            gMenuoIndex=gMenuParent.curVal;
            menuList.gMenuRenderFirst();
            menuList.gMenuRenderSecond();
            gMenuPageName='list';
        }
    }
}


