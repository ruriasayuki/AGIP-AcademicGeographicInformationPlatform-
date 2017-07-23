function Yklayer(layerjson)
{
	function stateanaly(statedata){
		if(statedata==null) return true;
		else return statedata;
	}
	function zanaly(zdata){//等着重构的图层层叠管理,保证了一张地图创建的时候图层是从0开始的序列,新加载图层会排在后面
		if(zdata==null) 
			{
				var zIndex = myMapMana.maxz;
				myMapMana.maxz=myMapMana.maxz+1;
				return zIndex;
			}
			else {
			myMapMana.maxz=zdata;
			return zdata;
		}
	}
	this.layerid = layerjson.id;
	this.layername = layerjson.layername;
	this.layeruserid = layerjson.userid;
	this.storelocation = layerjson.storelocation;
	this.accessibility = layerjson.accessibility;
	this.type = parseInt(layerjson.type);
	this.data = $.parseJSON(layerjson.datacontent);
	this.state = stateanaly(layerjson.state);
	this.style = layerjson.style;//直接存放echart的series或者mapv的item 
	this.zIndex = zanaly(layerjson.zIndex);
	this.mapv=null;//管理mapv图层
	//this.echarts=null;
}
function layeranaly(data)
{
	var layers=new Array();
	if(data==null) return layers;
	var i=0;
	for(var i=0;i<data.length;i++)
		{
			layers.push(new Yklayer(data[i]));
		}
	if(i==0) layers.push(new Yklayer(data));
	return layers;
}
function nothave(yklayer)
{
	var templist=myMapMana.maplayerlist;
	for(var i=0;i<templist.length;i++)
		{
			if(templist[i].layerid==yklayer.layerid) return false;
		}
	return true;
}
function Ykmap(mapjson)
{
	this.mapid = mapjson.id;
	this.mapname = mapjson.mapname;
	this.centerx = mapjson.centerx;
	this.centery = mapjson.centery;
	this.zoomlevel = mapjson.zoomlevel;
	this.maplayerlist = layeranaly(mapjson.maplayer);
	this.maxz = 0;
}

function echartsSetting(stylejson)
{
//基于某种手法来构造这些变量，并且用于redraw	
}
function has(item)
{
	if(item) return true;
	else return false;
}
var mybmap;//百度地图调用变量
var myMapMana;//地图管理变量
var myecharts;//echarts调用变量
var echartsoption;//echarts的option json
var myseries = new Array();//echartseries管理变量
var bmapoverlay;//bmap的覆盖物管理变量
var myinit;//初始化函数
//***//////////---程序入口---//////////***//
function myinit()
{
	myMapMana=new Ykmap(mapdata);
	initLayertree();
	display();
}

function redraw()
{
	myseries=[];
	for(var i=0;i<myMapMana.maplayerlist.length;i++)
		{
			var layerjson=myMapMana.maplayerlist[i]
			if(has(layerjson.mapv))//这里也需要重新整合
			{
				myMapMana.maplayerlist[i].mapv.destroy();
			}
			if(layerjson.state)
			{
			switch(layerjson.type)
			{
				case 0:
					var bool = drawL1(layerjson,i);
					break;
				case 1:
					var levelscatter = drawL2(layerjson,i);
					myseries.push(levelscatter);
					break;
				case 2:
					var points = drawL3(layerjson,i);
					myseries.push(points);
					break;
				case 3:
					var trail = drawL4(layerjson,i);
					myseries.push(trail);
					break;
			}
			}
		}
	refresh();
}
function refresh()
{
	echartsoption.series=myseries;
	myecharts.setOption(echartsoption);
	for(var i=0;i<myMapMana.maplayerlist.length;i++)
	{
		if((myMapMana.maplayerlist[i].state)&&(has(myMapMana.maplayerlist[i].mapv)))
		{
			myMapMana.maplayerlist[i].mapv.bindEvent();
			myMapMana.maplayerlist[i].mapv.show();
		}
	}
}

function drawL1(layer,layerindex){//分层设色图 使用mapv绘制
	if(has(myMapMana.maplayerlist[layerindex].style)) return true;//暂时用这个提高效率
	var gdata = layer.data;
	$.ajaxSettings.async = false;
    $.getJSON('./data/new_qing_prov.json', function(geojson) {//demo的geojson还是写死的

        var dataSet = mapv.geojson.getDataSet(geojson);

        var data = dataSet.get({
            filter: function (item) {//数据字段和geojson的name匹配 这里特殊化了一下 因为清代省份图用了两个字段 分别表示拼音和中文的省份名
                for(var i=0;i<gdata.length;i++)
                	{
                		if(gdata[i]["地名"]==item.name)
                			{
                				item.count = Number(gdata[i]["数值"]);
                				return true;
                			}
                	}
                
                return false;
            }
        });

        dataSet = new mapv.DataSet(data);

        var options = {
            splitList: [
                {
                    start: 0,
                    end: 10,
                    value: '#f1eef6'
                },{
                    start: 10,
                    end: 20,
                    value: '#d5bad9'
                },{
                    start: 20,
                    end: 30,
                    value: '#cc97c7'
                },{
                    start: 30,
                    end: 40,
                    value: '#e469af'
                },{
                    start: 40,
                    end: 50,
                    value: '#ee3387'
                },{
                    start: 50,
                    end: 60,
                    value: '#d61e53'
                },{
                    start: 60,
                    value: '#960b3d'
                }
            ],
            shadowColor: 'rgba(0, 0, 0, 1)', // 投影颜色
            shadowBlur: 10,  // 投影模糊级数
            methods: {
                click: function (item) {
                    alert(item.name);
                },
				mousemove: function (item) {
                    item = item || {};
                    var flag=0;
                    var data = dataSet.get();
                    for (var i = 0; i < data.length; i++) {
                        if (item.gid == data[i].gid) {//这里也是 geojson里面是gid 总之item的下面的东西的类型都要注意和geojson里面得对应字段的匹配问题
                            data[i].fillStyle = 'yellow';
                            flag=1;
                            $("#mytooltip").html(item.name);
                            $("#mytooltip").css("top",(mousePos.y-40)+"px");
                            $("#mytooltip").css("left",(mousePos.x+10)+"px");
                            $("#mytooltip").css("display","inline");
                            
                        } else {
                            data[i].fillStyle = null;
                        }
                    }
                    if(flag==0){$("#mytooltip").css("display","none")};
                    dataSet.set(data);
                }
            },
            globalAlpha: 0.9,
            draw: 'choropleth'
        }
        	//这里逻辑有点乱，随时准备在写调整样式的代码的阶段重构,应当分离图层的初始化和样式调整,现阶段代码效率太低。
        myMapMana.maplayerlist[layerindex].style = {"options":options,"dataSet":dataSet};
        myMapMana.maplayerlist[layerindex].mapv = new mapv.baiduMapLayer(mybmap, dataSet, options);
        myMapMana.maplayerlist[layerindex].mapv.destroy();
    });
    $.ajaxSettings.async = true;
    return true;
}
function drawL2(layer,layerindex){//等级符号图 （打算后面全用mapv重构
	var data = layer.data;
	var maxvalue = Number(data[0]["数值"]);
	var minvalue = Number(data[0]["数值"]);
	var maxsize = 20;
	var minsize = 100;
	var res = [];
	    for (var i = 0; i < data.length; i++) {
	            res.push({
	                name: data[i]["地名"],
	                value: [Number(data[i].X),Number(data[i].Y),Number(data[i]["数值"])]
	            });
	         if(res[i].value[2]>maxvalue) maxvalue = res[i].value[2];
	         if(res[i].value[2]<minvalue) minvalue = res[i].value[2];
	    }
	var param = [maxvalue,minvalue,maxsize,minsize];
	var item={
        name: 'test',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: res,
        z:layer.zIndex,
        symbol:'circle',
        symbolSize: function (val) {
            return val[2]/10+10;
        },
        label: {
        	normal: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#662255'
            }
        }
    }
	myMapMana.maplayerlist[layerindex].echarts=item;
	return item;
}
function drawL3(layer,layerindex){//点图 （打算后面全用mapv重构
	var data = layer.data;
	var res = [];
	    for (var i = 0; i < data.length; i++) {
	            res.push({
	                name: data[i]["地名"],
	                value: [Number(data[i].X),Number(data[i].Y),Number(data[i]["数值"])]
	            });
	    }
	var item={
        name: 'test',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: res,
        z:layer.zIndex,
        symbol:'circle',
        symbolSize: 10,
        label: {
            normal: {
                formatter: '{b}',
            	position: 'right',
                show: true
            },
            emphasis: {
            	formatter: '{b}',
            	show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#662255'
            }
        }
    }
	myMapMana.maplayerlist[layerindex].echarts=item;
	return item;
}
function drawL4(layer,layerindex){//轨迹图 （打算后面全用mapv重构
	var item=
	{
	    name: 2,
	    type: 'lines',
	    coordinateSystem: 'bmap',
	    z: layer.zIndex, 
	    large: true,
	    effect: {
	            show: false,
	            constantSpeed: 10,
	            symbol: 'pin',//ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
	            symbolSize: 6,
	            trailLength: 0,
	            color:'#eee955'
	     },
	     lineStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#eee955'},{offset: 1, color: '#f6082d'}], false),   //轨迹线颜色
	                width:1.5,
	                opacity: 1,
	                curveness: 0  //轨迹线弯曲度
	            }
	      },
	      data: layer.data
	    }
	myMapMana.maplayerlist[layerindex].echarts=item;
	return item;
}
function display()
{
	myecharts = echarts.init(document.getElementById('map'));
	echartsoption = {
		    backgroundColor: '#404a59',
		    title: {
		        text: myMapMana.mapname,
		        subtext: '',
		        sublink: '',
		        left: 'center',
		        textStyle: {
		            color: '#fff'
		        }
		    },
		    tooltip : {
		        trigger: 'none'
		    },
		    bmap: { //百度地图样式，可以再调整过
		        center: [myMapMana.centerx, myMapMana.centery],
		        zoom: myMapMana.zoomlevel,
		        roam: true,
		        mapStyle: {
		            styleJson:[{"featureType": "all","elementType": "geometry","stylers": {"hue": "#007fff","saturation": 89}},
		                {"featureType": "water","elementType": "all","stylers": {"color": "#ffffff"}}]
		        }
		    },
		    series: []
		};
			myecharts.setOption(echartsoption);
		    mybmap = myecharts.getModel().getComponent('bmap').getBMap();
		    mybmap.enableScrollWheelZoom(true);
		redraw();
}

function savemap()
{
	//TO DO 构建一个ajax请求 将map对象发送给后台... 后台需要可以重构数据库 存放所有信息
}
