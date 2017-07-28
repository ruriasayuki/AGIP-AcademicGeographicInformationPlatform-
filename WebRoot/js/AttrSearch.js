function bgsearch() {
        match(autoComplete.select);  
	}
function match(info) {//查询所需要的信息匹配 并且返回结果选框


}

var autoComplete;
function getLayerStringDataArr(){
    var resultArr = new Array();
    for(var i=0;i<myMapMana.maplayerlist.length;i++){//获取地图的所有文字信息
       var layer = myMapMana.maplayerlist[i];
       resultArr.push({name:layer.layername,type:"图层"});
       switch (layer.type)
       {
           case 0:
           {
                var data = layer.style.dataSet._data;
                for(var j=0;j<data.length;j++)
                    {
                        resultArr.push({name:data[j].name,type:"地名"});
                    }
                break;
           }
           case 1:
           {
                var data = layer.style.series.data;
                for(var j=0;j<data.length;j++)
                {
                    resultArr.push({name:data[j].name,type:"地名"}); 
                }
                break;
           }
           case 2:
           {
                var data = layer.style.data;
                for(var j=0;j<data.length;j++)
                {
                    resultArr.push({name:data[j].name,type:"地名"});
                    resultArr.push({name:data[j].value[2],type:"数据"}); 
                }
                break;
           }
           case 3:
           {
               var data = layer.style.data;
                for(var j=0;j<data.length;j++)
                {
                    resultArr.push({name:data[j].ID,type:"路径名"});
                }
                break;
           }
       }
     }
    return resultArr;
}
Array.prototype.has=function(obj,equalFunc)
{
    var myEqual = function(a,b){if(a==b)return true;else return false;}
    if(has(equalFunc) )myEqual=equalFunc;
    for(var i=0;i<this.length;i++)
    {
        if(myEqual(this[i],obj)) return true;
    }
    return false;
}
function resultEqual(a,b)
{
    if(a.name==b.name && a.type==b.type) return true;
    else return false;
}
function createAutoComplete(){  
    var inputValue=getLayerStringDataArr();  
    if(!autoComplete){  
       autoComplete = new AutoComplete('p_apiName','auto',inputValue);//第一个参数是输入框id，第二个是下拉显示的id，第三个是获取的全部数据。  
    }  
}  
function AutoComplete(obj,autoObj,arr){  
    this.obj=document.getElementById(obj);        //输入框  
    this.autoObj=document.getElementById(autoObj);//DIV的根节点  
    this.value_arr=arr;        //不要包含重复值  
    this.index=-1;          //当前选中的DIV的索引  
    this.search_value="";   //保存当前搜索的字符 
    this.select=null;     
}  
AutoComplete.prototype={  
    setArr: function(newArr)
    {
        this.value_arr = newArr;
    },
    init: function(){  
        this.autoObj.style.left = this.obj.offsetLeft + "px";  
        this.autoObj.style.top  = this.obj.offsetTop + this.obj.offsetHeight + "px";  
        this.autoObj.style.width= this.obj.offsetWidth - 2 + "px";//减去边框的长度2px     
    },  
    //删除自动完成需要的所有DIV  
    deleteDIV: function(){  
        while(this.autoObj.hasChildNodes()){  
            this.autoObj.removeChild(this.autoObj.firstChild);  
        }  
        this.autoObj.className="auto_hidden";  
    },  
    //设置值  
    setValue: function(_this,result){ 
        return function(){ 
            _this.select = _this.value_arr[result];
            _this.obj.value=this.seq;  
            _this.autoObj.className="auto_hidden";  
        }         
    },  
    //模拟鼠标移动至DIV时，DIV高亮  
    autoOnmouseover: function(_this,_div_index){  
        return function(){  
            _this.index=_div_index;  
            var length = _this.autoObj.children.length;  
            for(var j=0;j<length;j++){  
                if(j!=_this.index ){         
                    _this.autoObj.childNodes[j].className='auto_onmouseout';  
                }else{  
                    _this.autoObj.childNodes[j].className='auto_onmouseover';  
                    //_this.obj.value=this.seq;  
                }  
            }              
        }  
    },  
    //更改classname  
    changeClassname: function(length){  
        for(var i=0;i<length;i++){  
            if(i!=this.index ){         
                this.autoObj.childNodes[i].className='auto_onmouseout';  
            }else{  
                this.autoObj.childNodes[i].className='auto_onmouseover';  
                this.obj.value=this.autoObj.childNodes[i].seq;  
            }  
        }  
    }  
    ,  
    //响应键盘  
    pressKey: function(event){  
        var length = this.autoObj.children.length;  
        //光标键"↓"  
        if(event.keyCode==40){  
            ++this.index;  
            if(this.index>length){  
                this.index=0;  
            }else if(this.index==length){  
                this.obj.value=this.search_value;  
            }  
            this.changeClassname(length);  
        }  
        //光标键"↑"  
        else if(event.keyCode==38){  
            this.index--;  
            if(this.index<-1){  
                this.index=length - 1;  
            }else if(this.index==-1){  
                this.obj.value=this.search_value;  
            }  
            this.changeClassname(length);  
        }  
        //回车键  
        else if(event.keyCode==13){  
            this.autoObj.className="auto_hidden";  
            this.index=-1;  
        }else{  
            this.index=-1;  
        }  
    },  
    //程序入口  
    start: function(event){  
        if(event.keyCode!=13&&event.keyCode!=38&&event.keyCode!=40){  
            this.init();  
            this.deleteDIV();  
            this.search_value=this.obj.value;  
            var valueArr=this.value_arr;  
            valueArr.sort(
                function(a,b)
                {
                    if(a.name>b.name) return 1;
                    else if(a.name<b.name) return -1;
                    else return 0;
                }
            );  
            if(this.obj.value.replace(/(^\s*)|(\s*$)/g,'')==""){ return; }//值为空，退出
            try{ var reg1 = new RegExp("^" + this.obj.value,"i");}  
            catch (e){ return; }
            try{ var reg2 = new RegExp("(" + this.obj.value + ")","i");}  
            catch (e){ return; }   
            var div_index=0;//记录创建的DIV的索引
            var tempArr = new Array();  
            var deleteIndex = new Array();
            var terminateFlag = true;
            var count=0;
            //这段需要函数化重构
            for(var i=0;i<valueArr.length;i++){  
                if(reg1.test(valueArr[i].name)){
                    if(tempArr.has(valueArr[i],resultEqual)) 
                        {
                            deleteIndex.push(i);
                            continue;
                        }
                    tempArr.push(valueArr[i]);
                    var div = document.createElement("div");  
                    div.className="auto_onmouseout";  
                    div.seq=valueArr[i].name;  
                    div.onclick=this.setValue(this,i);  
                    div.onmouseover=this.autoOnmouseover(this,div_index);  
                    div.innerHTML=valueArr[i].name.replace(reg2,"<strong>$1</strong>")+'&emsp;<span style="font-size:8px;font-style:italic">'+valueArr[i].type+'</span>';//搜索到的字符粗体显示  
                    this.autoObj.appendChild(div);  
                    this.autoObj.className="auto_show";  
                    div_index++;
                    count++;
                    if(count>20) {terminateFlag=false; break;}  
                } 
            }
            for(var i=0;i<deleteIndex.length;i++)
            {
                valueArr.splice(i,1);
            } 
            for(var i=0;i<valueArr.length;i++){  
                if(terminateFlag && !reg2.test(valueArr[i].name) && reg2.test(valueArr[i].name)){
                    tempArr.push(valueArr[i]);
                    var div = document.createElement("div");  
                    div.className="auto_onmouseout";  
                    div.seq=valueArr[i].name;  
                    div.onclick=this.setValue(this,i);  
                    div.onmouseover=this.autoOnmouseover(this,div_index);  
                    div.innerHTML=valueArr[i].name.replace(reg2,"<strong>$1</strong>")+'&emsp;<span style="font-size:8px;font-style:italic">'+valueArr[i].type+'</span>';//搜索到的字符粗体显示  
                    this.autoObj.appendChild(div);  
                    this.autoObj.className="auto_show";  
                    div_index++;
                    count++;
                    if(count>20) {terminateFlag=false; break;}  
                }
            }

        }  
        this.pressKey(event);  
    }  
}  