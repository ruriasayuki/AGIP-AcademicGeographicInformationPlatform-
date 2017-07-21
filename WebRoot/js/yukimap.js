function Yklayer(layerjson)
{
	function stateanaly(statedata){
		if(statedata==null) return true;
		else return statedata;
	}
	this.layerid = layerjson.id;
	this.layername = layerjson.layername;
	this.layeruserid = layerjson.userid;
	this.storelocation = layerjson.storelocation;
	this.accessibility = layerjson.accessibility;
	this.type = parseInt(layerjson.type);
	this.data = $.parseJSON(layerjson.datacontent);
	this.state = stateanaly(layerjson.state);
	this.style = layerjson.style;//各个小组自定义的layerjson格式
	this.zIndex = function zanaly(layerjson){
		if(layerjson.zIndex==null) return 0;
		else return layerjson.zIndex;
	};
	this.mapv=null;
	this.echarts=null;
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
	var templist=mymapmana.maplayerlist;
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
}

function echartsSetting(stylejson)
{
//基于某种手法来构造这些变量，并且勇于redraw	
}
var mybmap;//百度地图调用变量
var mymapmana;//地图管理变量
var myecharts;//echarts调用变量
var echartsoption;//echarts的option json
var myseries = new Array();//echartseries管理变量
var bmapoverlay;//bmap的覆盖物管理变量
var myinit;
function myinit()
{
	mymapmana=new Ykmap(mapdata);
	//各组的对数据（也就是layer的datacontent属性的解析也放这里
	display();
}

function redraw()
{
	myseries=[];
	for(var i=0;i<mymapmana.maplayerlist.length;i++)
		{
			var layerjson=mymapmana.maplayerlist[i]
			if(layerjson.mapv)
			{
				layerjson.mapv.destroy();
			}
			switch(layerjson.type)
			{
				case 0:
					drawL1(layerjson,i);
					break;
				case 1:
					drawL2(layerjson,i);
					break;
				case 2:
					drawL3(layerjson,i);
					break;
				case 3:
					drawL4(layerjson,i);
					break;
			}
		}
	redrawover();
}
function redrawover()
{
	echartsoption.series=myseries;
	myecharts.setOption(echartsoption);
	for(var i=0;i<mymapmana.maplayerlist.length;i++)
	{
		if(mymapmana.maplayerlist[i].mapv)
		{
			var tmp=mymapmana.maplayerlist[i].mapv;
			mymapmana.maplayerlist[i].mapv.destroy();
			mymapmana.maplayerlist[i].mapv = new mapv.baiduMapLayer(mybmap, tmp.dataSet, tmp.options);
		}
	}
}
function drawL1(layer,layerindex){//分层设色图 使用mapv绘制
	var gdata = layer.data;
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
                            $("#mytooltip").css("top",(mousePos.y-5)+"px");
                            $("#mytooltip").css("left",(mousePos.x+2)+"px");
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
        if(mymapmana.maplayerlist[layerindex].mapv) mymapmana.maplayerlist[layerindex].mapv.destroy();//似乎是被js解释器优化了之后switch的代码执行顺序有问题（方张 
        mymapmana.maplayerlist[layerindex].style = options;
        mymapmana.maplayerlist[layerindex].mapv = new mapv.baiduMapLayer(mybmap, dataSet, options);
        
        return true;
    });

}
function drawL2(layer,layerindex){//等级符号图
	var srcdata = layer.data;
	var localname = new Array();
	var value = new Array();
	var coords = new Array();
	var maxvalue = 0;
	var minsize = 5;
	var rate = 10;
	for(var i=0;i<srcdata.length;i++)
	{
		localname.push(srcdata[i]["地名"]);
		value.push(Number(srcdata[i]["数值"]));
		if(value[i]>maxvalue) maxvalue=value[i];
		coords.push([srcdata[i].X,srcdata[i].Y]);
	}
	var item={
        name: 'test',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: coords,
        symbol:'circle',
        symbolSize: 10,
        label: {
            normal: {
                
                position: 'right',
                show: false
            },
            emphasis: {
            	formatter: localname,
            	show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#ddb926'
            }
        }
    }
	mymapmana.maplayerlist[layerindex].echarts=item;
	myseries.push(item);
}
function drawL3(layer,layerindex){//点图
	
}
function drawL4(layer,layerindex){//轨迹图
	var item=
	{
	    name: 2,
	    type: 'lines',
	    coordinateSystem: 'bmap',
	    z: layer.zIndex, //TODO:层次控制
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
	mymapmana.maplayerlist[layerindex].echarts=item;
	myseries.push(item);
}
function display()
{
	myecharts = echarts.init(document.getElementById('map'));
	echartsoption = {
		    backgroundColor: '#404a59',
		    title: {
		        text: mymapmana.mapname,
		        subtext: '',
		        sublink: '',
		        left: 'center',
		        textStyle: {
		            color: '#fff'
		        }
		    },
		    tooltip : {
		        trigger: 'item'
		    },
		    bmap: { //百度地图样式，可以再调整过
		        center: [mymapmana.centerx, mymapmana.centery],
		        zoom: mymapmana.zoomlevel,
		        roam: true
		    },
		    series: []
		};
			myecharts.setOption(echartsoption);
		    mybmap = myecharts.getModel().getComponent('bmap').getBMap();
		    mybmap.enableScrollWheelZoom(true);
		redraw();
}
