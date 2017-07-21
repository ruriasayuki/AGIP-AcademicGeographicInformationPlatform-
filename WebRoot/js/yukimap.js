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
	this.type = layerjson.type;
	this.data = layerjson.datacontent;
	this.state = stateanaly(layerjson.state);
	this.style = layerjson.style;//各个小组自定义的layerjson格式
	this.zIndex = function zanaly(layerjson){
		if(layerjson.zIndex==null) return 0;
		else return layerjson.zIndex;
	};
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
			if(templist[i].id==yklayer.layerid) return false;
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
var echartoption;//echart的option json
var myseries;//echartseries管理变量
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
	for(var i=0;i<mymapmana.maplayerlist.length;i++)
		{
			var layerjson=mymapmana.maplayerlist[i]
			switch(layerjson.type)
			{
				case 0:
					drawL1(layerjson);
					break;
				case 1:
					drawL2(layerjson);
					break;
				case 2:
					drawL3(layerjson);
					break;
				case 3:
					drawL4(layerjson);
					break;
			}
		}
}
function drawL1(layer){//分层设色图 使用mapv绘制
	var gdata = $.parseJSON(layer.data);
    $.getJSON('./data/new_qing_prov.json', function(geojson) {//demo的geojson还是写死的

        var dataSet = mapv.geojson.getDataSet(geojson);

        var data = dataSet.get({
            filter: function (item) {//数据字段和geojson的name匹配 这里特殊化了一下 因为清代省份图用了两个字段 分别表示拼音和中文的省份名
                for(var i=0;i<gdata.length;i++)
                	{
                		if(gdata[i]["地名"]==item.name)
                			item.count = Number(gdata[i]["数值"]);
                		return true;
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

        var mapvLayer = new mapv.baiduMapLayer(mybmap, dataSet, options);

    });

}
function drwaL2(data){//等级符号图
	
}
function drawL3(data){//点图
	
}
function drawL4(data){//轨迹图
	
}
function display()
{
	myChart = echarts.init(document.getElementById('map'));
	echartoption = {
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
		    series: [{//echarts无法空白初始化
            	type: 'lines',
            	coordinateSystem: 'bmap',
            	data: [],
            	polyline: true,
            	lineStyle: {
                	normal: {
                    	color: 'purple',
                    	opacity: 0.6,
                    	width: 1
                	}
            	}
        		}]
		};
		    myChart.setOption(echartoption);
		    mybmap = myChart.getModel().getComponent('bmap').getBMap();
		    mybmap.enableScrollWheelZoom(true);
		redraw();
}
