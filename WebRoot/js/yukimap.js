//————————————————————————**yukimap.js**————————————————————————//
//包含echarts&mapv整合结构
//包含前端容器 YKmap 和YKlayer
//包含保存地图用的结构Icemap和Icelayer
//包含所有管理用全局变量
//入口function myinit()
//————————————————————————以上为说明————————————————————————//
//面状物的包围盒工具
function getBoundBox(pointArray)
{
	var maxX,minX,maxY,minY;
	maxX=minX=pointArray[0][0][0][0];
	maxY=minY=pointArray[0][0][0][1];
	for(var i=0;i<pointArray.length;i++)
		{
			var pointArrayL0=pointArray[i];
			for(var j=0;j<pointArrayL0.length;j++)
				{
					var pointArrayL1=pointArrayL0[j];
					for(var k=0;k<pointArrayL1.length;k++)
						{
							var tx = pointArrayL1[k][0];
							var ty = pointArrayL1[k][1];
							if(tx>maxX) maxX=tx;
							if(tx<minX) minX=tx;
							if(ty>maxY) maxY=ty;
							if(ty<minY) minY=ty;
						}
				}
		}
	return({maxX:maxX,minX:minX,maxY:maxY,minY:minY});
}
//点状物的缩放等级确定
function getAverageDistance(pointArray)
{
	var maxX,minX,maxY,minY;
	maxX=minX=pointArray[0].value[0];
	maxY=minY=pointArray[0].value[1];
	for(var i=0;i<pointArray.length;i++)
	{
		var tx = pointArray[i].value[0];
		var ty = pointArray[i].value[1];
		if(tx>maxX) maxX=tx;
		if(tx<minX) minX=tx;
		if(ty>maxY) maxY=ty;
		if(ty<minY) minY=ty;
	}
	var k = Math.sqrt(pointArray.length)-1;
	var dx = (maxX-minX)/k;
	var dy = (maxY-minY)/k;
	return {dx:dx,dy:dy};
}
//自制的判定用工具
function nothave(yklayer) {
	var templist = myMapMana.maplayerlist;
	for (var i = 0; i < templist.length; i++) {
		if (templist[i].layerid == yklayer.layerid) return false;
	}
	return true;
}
//前端数据结构定义
//前端图层结构
function Yklayer(layerjson) {
	function stateanaly(statedata) {
		if (statedata == null) return true;
		else return statedata;
	}
	function zanaly(zdata) {//等着重构的图层层叠管理,保证了一张地图创建的时候图层是从0开始的序列,新加载图层会排在后面
		if (zdata == null) {
			var zIndex = maxz;
			maxz = maxz + 1;
			return zIndex;
		}
		else {
			maxz = zdata;
			return zdata;
		}
	}
	function dataanaly(datajson) {//等着重构的图层层叠管理,保证了一张地图创建的时候图层是从0开始的序列,新加载图层会排在后面
		if (datajson == null) {
			return null;
		}
		else {
			return $.parseJSON(datajson);
		}
	}
	this.mlid = layerjson.mlid;//在maplayer表中的唯一标识符
	this.layerid = layerjson.id;//在layer表中的唯一标识符
	this.layername = layerjson.layername;//图层名
	this.layeruserid = layerjson.userid;//图层创建者的用户id
	this.storelocation = layerjson.storelocation;//图层额外数据的保存路径
	this.accessibility = layerjson.accessibility;//图层的公开设定
	this.appendsrc = layerjson.appendDataSrc;//图层的追加参考地理数据的路径（如geojson或者坐标匹配表）
	this.type = parseInt(layerjson.type);//图层类型
	this.data = dataanaly(layerjson.datacontent);//图层数据(因为style里都有备份数据)
	this.state = stateanaly(layerjson.state);//图层在当前地图的显隐状态
	this.style = dataanaly(layerjson.style);//根据不同的类型有着不同结构的样式表
	this.zIndex = zanaly(layerjson.zIndex);//图层叠放顺序(mapv图层单独管理 不受干扰)
	this.mapv = null;//管理mapv图层的引用
}
//由json解析图层列表的函数 被AddLayerToMap调用 和YKmap的构造函数调用
function layeranaly(data) {
		var layers = new Array();
		if (data == null) return layers;
		var i = 0;
		for (var i = 0; i < data.length; i++) {
			layers.push(new Yklayer(data[i]));
		}
		if (i == 0) layers.push(new Yklayer(data));
		return layers;
	}
//前端地图容器结构
function Ykmap(mapjson) {
	//图层解析函数
	var mapstyle = $.parseJSON(mapjson.mapstyle);//解析百度地图配置json
	this.mapid = mapjson.id;//地图id
	this.mapuserid = mapjson.userid;
	this.mapaccess = mapjson.accessibility;
	this.mapname = mapjson.mapname;//地图名称
	this.centerx = mapstyle.centerx;//百度地图初始化经纬度
	this.centery = mapstyle.centery;
	this.zoomlevel = mapstyle.zoomlevel;//百度地图初始化缩放等级
	this.mapmode = mapstyle.mapmode;//百度地图初始化地图类型
	//TODO 增加百度地图的样式配置
	this.maplayerlist = layeranaly(mapjson.maplayer);//地图图层列表
}


function has(item) {
	if (item) return true;
	else return false;
}
//我觉得有必要把非主要控件的全局变量整合到一个全局变量里面
var maxz = 0;//预置的zindex控制
var mydis;//百度地图测距插件
var mybmap;//百度地图调用变量
var myMapMana;//地图管理变量
var myecharts;//echarts调用变量
var echartsoption;//echarts的option json
var myseries = new Array();//echartseries管理变量
var bmapoverlay;//bmap的覆盖物管理变量
var myinit;//初始化函数
var mySearchMarker;
//***//////////---程序入口---//////////***//
function myinit() {
	maxz = 0;
	myMapMana = new Ykmap(mapdata);
	initLayertree();
	display();
}

function redraw() {
	myseries = [];
	for (var i = 0; i < myMapMana.maplayerlist.length; i++) {
		var layerjson = myMapMana.maplayerlist[i]
		if (has(layerjson.mapv))//这里也需要重新整合
		{
			layerjson.mapv.unbindEvent();
		}
		if (layerjson.state) {
			switch (layerjson.type) {
				case 0:
					var bool = drawL1(layerjson, i);
					break;
				case 1:
					var levelscatter = drawL2(layerjson, i);
					myseries.push(levelscatter);
					break;
				case 2:
					var points = drawL3(layerjson, i);
					myseries.push(points);
					break;
				case 3:
					var trail = drawL4(layerjson, i);
					myseries.push(trail);
					break;
			}
		}
		else
			if (has(layerjson.mapv)) {
				layerjson.mapv.destroy();
			}
	}
	refresh();
}
function refresh() {
	var centerPoint = mybmap.getCenter();
	myMapMana.centerx = centerPoint.lng;
	myMapMana.centery = centerPoint.lat;
	myMapMana.zoomlevel = mybmap.getZoom();
	echartsoption.series = myseries;
	echartsoption.bmap.center = [myMapMana.centerx, myMapMana.centery];
	echartsoption.bmap.zoom= myMapMana.zoomlevel;
	myecharts.setOption(echartsoption);
	for (var i = 0; i < myMapMana.maplayerlist.length; i++) {
		if ((myMapMana.maplayerlist[i].state) && (has(myMapMana.maplayerlist[i].mapv))) {
			myMapMana.maplayerlist[i].mapv.bindEvent();
			myMapMana.maplayerlist[i].mapv.show();
		}
	}
	if(has(autoComplete)){
	autoComplete.setArr(getLayerStringDataArr());
	}
	redrawLegend();
}

function drawL1(layer, layerindex) {//分层设色图 使用mapv绘制
	var dataSet;

	//缺省设定
	var splitList;
	var maxC, minC;
	var splitNum = 10;
	var splitType = "linear";
	var highlight = "#edacbe";
	if (has(myMapMana.maplayerlist[layerindex].mapv)) {
		myMapMana.maplayerlist[layerindex].mapv.update({
			options:{
				zIndex:myMapMana.maplayerlist[layerindex].zIndex
			}
		});
		return true;}//暂时用这个提高效率
	if (has(myMapMana.maplayerlist[layerindex].style)) {
		dataSet = new mapv.DataSet(myMapMana.maplayerlist[layerindex].style.dataSet._data);
		//gradient = myMapMana.maplayerlist[layerindex].style.options.gradient || gradient;
		maxC = myMapMana.maplayerlist[layerindex].style.options.max;
		minC = myMapMana.maplayerlist[layerindex].style.options.min;
		splitNum = myMapMana.maplayerlist[layerindex].style.options.splitNum;
		splitList = myMapMana.maplayerlist[layerindex].style.options.splitList;
		highlight =  myMapMana.maplayerlist[layerindex].style.options.highlight;
		splitType = myMapMana.maplayerlist[layerindex].style.options.splitType;
	}
	else {
		var gdata = layer.data;
		$.ajaxSettings.async = false;
		$.getJSON(layer.appendsrc, function (geojson) {//demo的geojson还是写死的

			dataSet = mapv.geojson.getDataSet(geojson);
			maxC = Number(gdata[0].value);
			minC = Number(gdata[0].value);
			var data = dataSet.get({
				filter: function (item) {//数据字段和geojson的name匹配 这里特殊化了一下 因为清代省份图用了两个字段 分别表示拼音和中文的省份名
					for (var i = 0; i < gdata.length; i++) {
						if (gdata[i].name == item.name) {
							item.count = Number(gdata[i].value);
							item.bound = getBoundBox(item.geometry.coordinates);
							if (item.count > maxC) {
								maxC = item.count;
							}
							if (item.count < minC) {
								minC = item.count;
							}
							return true;
						}
					}

					return false;
				}
			});
			maxC = maxC;
			minC = minC;
			splitList = yukiColorMapper(minC, maxC, '#ffddee', '#aa4466', splitNum, splitType);
			dataSet = new mapv.DataSet(data);
		});
		$.ajaxSettings.async = true;
	}
	//下面开始设置
	{
		var options = {
			draw: 'choropleth',
			max: maxC,
			min: minC,
			zIndex:myMapMana.maplayerlist[layerindex].zIndex,
			highlight,highlight,
			splitNum: splitNum,
			splitType: splitType,
			splitList: splitList,
			shadowColor: 'rgba(0, 0, 0, 0.5)', // 投影颜色
			shadowBlur: 10,  // 投影模糊级数
			methods: {
				click: function (item) {
					if (tooltipPub.flag == 0) {
					$('#QueryBoard').window('open');
					$('#QueryBoard').window('expand');
					$('#layerL0').text(layer.layername);
					$('#nameL0').text(item.name);
					$('#countL0').text(item.count);
					$('#typeL0').text('面');
					}
				},
				mousemove: function (item) {
					item = item || {};
					var flag = 0;
					var data = dataSet.get();
					for (var i = 0; i < data.length; i++) {
						var a,b;
						if(has(item.id)) {a=item.id;b=data[i].id;}
						else if(has(item.gid)) {a=item.gid;b=data[i].gid;}
						
						if (has(a)&&a==b) {//这里也是 geojson里面是gid 总之item的下面的东西的类型都要注意和geojson里面得对应字段的匹配问题
							data[i].fillStyle = layer.style.options.highlight;
							flag = 1;
							if (tooltipPub.flag == 0) {
								$("#mytooltip").html(layer.layername+':'+item.name+':'+item.count);
								$("#mytooltip").css("top", (mousePos.y - 40) + "px");
								$("#mytooltip").css("left", (mousePos.x + 10) + "px");
								$("#mytooltip").css("display", "inline");
							}
						} else {
							data[i].fillStyle = null;
						}
					}
					if (flag == 0) { $("#mytooltip").css("display", "none") };
					dataSet.set(data);
				}
			},
			globalAlpha: 0.9,
			draw: 'choropleth'
		}
		//完成设定 进行绘图
		myMapMana.maplayerlist[layerindex].style = { "options": options, "dataSet": dataSet };
		myMapMana.maplayerlist[layerindex].mapv = new mapv.baiduMapLayer(mybmap, dataSet, options);
		myMapMana.maplayerlist[layerindex].mapv.destroy();
	}
	return true;
}
function drawL2(layer, layerindex) {//等级符号图 （打算后面全用mapv重构
	if (has(myMapMana.maplayerlist[layerindex].style)) {
		//同步zIndex值之后重绘
		//对已有style做修改后没反应就在此重设
		//回调函数必须在此重设...这里就有个问题 如何在字符串和回调函数之间转换
		myMapMana.maplayerlist[layerindex].style.series.symbolSize
			= function (val, param) {
				var temp = myMapMana.maplayerlist[layerindex].style.append;
				//需要用类似模板的函数重构，就是把计算函数作为参数传入的那种...
				if (temp.mapperType == "linear")
					return (val[2] - temp.min) / (temp.max - temp.min) * (temp.maxSize - temp.minSize) + temp.minSize;
				else if (temp.mapperType == "log") {
					//确保取对数之前不出现负数
					var offset = 1;
					if (temp.min < 0) offset = -temp.min + 1;
					return (Math.log(val[2] + offset) - Math.log(temp.min + offset)) / (Math.log(temp.max + offset) - Math.log(temp.min + offset)) * (temp.maxSize - temp.minSize) + temp.minSize;
				}
				else if (temp.mapperType == "square") {
					var offset = 0;
					if (temp.min < 0) offset = -temp.min;
					return ((val[2] + offset) + (temp.min + offset)) * ((val[2] + offset) - (temp.min + offset)) / ((temp.max + offset) - (temp.min + offset)) / ((temp.max + offset) + (temp.min + offset)) * (temp.maxSize - temp.minSize) + temp.minSize;
				}
				else return val[2];
			}
		myMapMana.maplayerlist[layerindex].style.series.itemStyle.normal.color
			= function (param) {
				var temp = myMapMana.maplayerlist[layerindex].style.append;
				var maxrgb = HexToColorArray(temp.maxColor);
				var minrgb = HexToColorArray(temp.minColor);
				var dvalue;
				if (temp.mapperType == "log") {
					//确保取对数之前不出现负数
					var offset = 1;
					if (temp.min < 0) offset = -temp.min + 1;
					dvalue = (Math.log(param.value[2] + offset) - Math.log(temp.min + offset)) / (Math.log(temp.max + offset) - Math.log(temp.min + offset));
				}
				else if (temp.mapperType == "square") {
					var offset = 0;
					if (temp.min < 0) offset = -temp.min;
					dvalue = (param.value[2] - temp.min) * (param.value[2] + temp.min) / (temp.max - temp.min) / (temp.max + temp.min)
				}
				else
				{ dvalue = (param.value[2] - temp.min) / (temp.max - temp.min); }
				var dr = parseInt(dvalue * (maxrgb.r - minrgb.r));
				var dg = parseInt(dvalue * (maxrgb.g - minrgb.g));
				var db = parseInt(dvalue * (maxrgb.b - minrgb.b));
				var dycolor = {
					r: minrgb.r + dr,
					g: minrgb.g + dg,
					b: minrgb.b + db
				};
				return ColorArrayToHex(dycolor);
			}
		myMapMana.maplayerlist[layerindex].style.series.z = myMapMana.maplayerlist[layerindex].zIndex;
		return myMapMana.maplayerlist[layerindex].style.series;
	}
	var data = layer.data;
	var maxvalue = Number(data[0].value);
	var minvalue = Number(data[0].value);
	var maxsize = 20;
	var minsize = 5;
	var maxcolor = "#5784ef";
	var mincolor = "#aad3ff";
	var mappertype = "linear";
	var res = [];
	for (var i = 0; i < data.length; i++) {
		res.push({
			name: data[i].name,
			value: [Number(data[i].X), Number(data[i].Y), Number(data[i].value)]
		});
		if (res[i].value[2] > maxvalue) maxvalue = res[i].value[2];
		if (res[i].value[2] < minvalue) minvalue = res[i].value[2];
	}
	var item = {
		name: layer.layername,
		type: 'scatter',
		coordinateSystem: 'bmap',
		data: res,
		z: layer.zIndex,
		symbol: 'circle',
		symbolSize: function (val, param) {
			return (val[2] - minvalue) / (maxvalue - minvalue) * (maxsize - minsize) + minsize;
		},
		label: {
			normal: {
				formatter: '{b}',
				position: 'right',
				show: false
			},
			emphasis: {
				textStyle: {
					fontStyle: 'normal',
					fontWeight: 'bold	',
					fontFamily: 'sans-serif',
					fontSize: 15,
				},
				show: true
			}
		},
		itemStyle: {
			normal: {
				color: function (param) {
					var maxrgb = HexToColorArray(maxcolor);
					var minrgb = HexToColorArray(mincolor);
					var dvalue = (param.value[2] - minvalue) / (maxvalue - minvalue);
					var dr = parseInt(dvalue * (maxrgb.r - minrgb.r));
					var dg = parseInt(dvalue * (maxrgb.g - minrgb.g));
					var db = parseInt(dvalue * (maxrgb.b - minrgb.b));
					var dycolor = {
						r: minrgb.r + dr,
						g: minrgb.g + dg,
						b: minrgb.b + db
					};
					return ColorArrayToHex(dycolor);
				}
			},
			emphasis: {
				color: '#333399'
			}
		}
	}
	var avgDis = getAverageDistance(res);
	myMapMana.maplayerlist[layerindex].style = {
		series: item, append: {
			max: maxvalue,
			min: minvalue,
			maxSize: maxsize,
			minSize: minsize,
			maxColor: maxcolor,
			minColor: mincolor,
			mapperType: mappertype,
			avgDis: avgDis
		}
	};
	return item;
}
function drawL3(layer, layerindex) {//点图 （打算后面全用mapv重构
	if (has(myMapMana.maplayerlist[layerindex].style)) {
		//同步zIndex值之后重绘
		//对已有style做修改后没反应就在此重设
		//回调函数必须在此重设
		myMapMana.maplayerlist[layerindex].style.series.z = myMapMana.maplayerlist[layerindex].zIndex;
		return myMapMana.maplayerlist[layerindex].style.series;
	}
	var data = layer.data;
	var res = [];
	for (var i = 0; i < data.length; i++) {
		res.push({
			name: data[i].name,
			value: [Number(data[i].X), Number(data[i].Y), data[i].value]
		});
	}
	var item = {
		name: layer.layername,
		type: 'scatter',
		coordinateSystem: 'bmap',
		data: res,
		z: layer.zIndex,
		symbol: 'circle',
		symbolSize: 5,
		label: {
			normal: {
				formatter: '{b}',
				position: 'right',
				show: false
			},
			emphasis: {
				formatter: '{b}',
				textStyle: {
					fontStyle: 'normal',
					fontWeight: 'bold	',
					fontFamily: 'sans-serif',
					fontSize: 15,
				},
				show: true
			}
		},
		itemStyle: {
			normal: {
				color: '#5376EE'
			},
			emphasis: {
				color: '#333399'
			}
		}
	}
	var avgDis = getAverageDistance(res);
	myMapMana.maplayerlist[layerindex].style = 
	{series: item, append: {
		avgDis: avgDis
	}
};
	return item;
}
function drawL4(layer, layerindex) {//轨迹图 （打算后面全用mapv重构
	if (has(myMapMana.maplayerlist[layerindex].style)) {
		//同步zIndex值之后重绘
		//对已有style做修改后没反应就在此重设
		//回调函数必须在此重设
		myMapMana.maplayerlist[layerindex].style.z = myMapMana.maplayerlist[layerindex].zIndex;
		return myMapMana.maplayerlist[layerindex].style;
	}
	var item =
		{
			name: layer.layername,
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
				color: '#eee955'
			},
			lineStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#eee955' }, { offset: 1, color: '#f6082d' }], false),   //轨迹线颜色
					width: 1.5,
					opacity: 1,
					curveness: 0  //轨迹线弯曲度
				}
			},
			data: layer.data
		}
	myMapMana.maplayerlist[layerindex].style = item;
	return item;
}
function redrawLegend()
{
	var legendContent="<strong>图例<strong></br>";
	for(var i=0;i<myMapMana.maplayerlist.length;i++)
	{
		var layer = myMapMana.maplayerlist[i];
		if(!layer.state) continue;
		var layerType = layer.type;
		switch(layerType)
		{
		case 0:
			legendContent+=layer.layername+'</br>';
			var styleInfo = layer.style.options;
			var colorlen = styleInfo.splitList.length;
			var maxcolor = styleInfo.splitList[colorlen-1].value;
			var mincolor = styleInfo.splitList[0].value;
			var maxval = styleInfo.max;
			var minval = styleInfo.min;
			legendContent+='<div class="block"></div><div class="rectangle" style="background-color:'+maxcolor+'"></div>';
			legendContent+='&emsp;'+maxval+'</br>';
			legendContent+='<div class="block"></div><div class="rectangle" style="background-color:'+mincolor+'"></div>';
			legendContent+='&emsp;'+minval+'</br>';
			break;
		case 1:
			legendContent+=layer.layername+'</br>';
			var styleInfo = layer.style.append;
			var maxcolor = styleInfo.maxColor;
			var mincolor = styleInfo.minColor;
			var maxval = styleInfo.max;
			var minval = styleInfo.min;
			legendContent+='<div class="block"></div><div class="circle" style="background-color:'+maxcolor+'"></div>';
			legendContent+='&emsp;'+maxval+'</br>';
			legendContent+='<div class="block"></div><div class="circle" style="background-color:'+mincolor+'"></div>';
			legendContent+='&emsp;'+minval+'</br>';
			break;
		case 2:
			var pointcolor = layer.style.series.itemStyle.normal.color;
			legendContent+='<div class="circle" style="background-color:'+pointcolor+'"></div>';
			legendContent+='&emsp;'+layer.layername+'</br>';
			break;
		case 3:
			var colors = layer.style.lineStyle.normal.color.colorStops;
			var begincolor = colors[0].color;
			var endcolor = colors[1].color;
			legendContent+='<div class="line" style="background: linear-gradient(to right, '+begincolor+' , '+endcolor+')"></div>';
			legendContent+='&emsp;'+layer.layername+'</br>';
			break;
		}
	}
	$('#mylegend').html(legendContent);
	$('#mylegend').css("display","inline");
}


var tooltipPub = {
	flag: 0,
	nowIndex:0
}
function display() {
	myecharts = echarts.init(document.getElementById('map'));
	echartsoption = {
		backgroundColor: '#404a59',
		title: {
			text: myMapMana.mapname,
			subtext: '',
			sublink: '',
			left: 'center',
			textStyle: {
				color: '#000'
			}
		},
		tooltip: {
			trigger: 'none'
		},
		bmap: { //百度地图样式，可以再调整过
			center: [myMapMana.centerx, myMapMana.centery],
			zoom: myMapMana.zoomlevel,
			roam: true,
			mapStyle: {
				styleJson: [
					{
						"featureType": "all",
						"elementType": "geometry",
						"stylers": {
							"hue": "#007fff",
							"saturation": 89
						}
					},
					{
						"featureType": "water",
						"elementType": "all",
						"stylers": {
							"color": "#ffffff"
						}
					},
					{
						"featureType": "boundary",
						"elementType": "all",
						"stylers": {
							"color": "#ffffff"
						}
					},
					{
						"featureType": "highway",
						"elementType": "all",
						"stylers": {
							"color": "#00ffff",
							"lightness": 84
						}
					},
					{
						"featureType": "railway",
						"elementType": "geometry",
						"stylers": {
							"color": "#00ffff",
							"lightness": 84
						}
					},
					{
						"featureType": "road",
						"elementType": "labels.icon",
						"stylers": {
							"visibility": "off"
						}
					}
				]
			}
		},
		//		    visualMap:{type: 'continuous',
		//	            min: 0,
		//	            max: 40,
		//	            bottom: 50,
		//	            calculable: true,
		//	            inRange: {
		//	                color: ['#50a3ba', '#eac736', '#d94e5d'],
		//	                symbolSize: [1, 30]
		//	            },
		//	            textStyle: {
		//	                color: '#44e'
		//	            }},
		series: []
	};
	myecharts.setOption(echartsoption);
	mybmap = myecharts.getModel().getComponent('bmap').getBMap();
	mybmap.enableScrollWheelZoom(true);
	var bmapScale = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT });// 左上角，添加比例尺
	var navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT });
	var mapType = new BMap.MapTypeControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP] });
	mydis = new BMapLib.DistanceTool(mybmap);
	mybmap.addControl(bmapScale);
	mybmap.addControl(navigation);
	mybmap.addControl(mapType);
	

	
	if (myMapMana.mapmode == 1) mybmap.setMapType(BMAP_SATELLITE_MAP);
	myecharts.on('mouseover', function (params) {
		tooltipPub.flag = 1;
		var tooltipHtml="";
		switch(params.seriesType){
			case "lines":
				tooltipHtml = params.seriesName+':'+params.data.ID;
				break;
			case "scatter":
				tooltipHtml = params.seriesName+':'+params.name+','+params.data.value[2];
		}
		$("#mytooltip").html(tooltipHtml);
		$("#mytooltip").css("top", (mousePos.y - 40) + "px");
		$("#mytooltip").css("left", (mousePos.x + 10) + "px");
		$("#mytooltip").css("display", "inline");
	});
	myecharts.on('mouseout', function (params) {
		tooltipPub.flag = 0;
		$("#mytooltip").css("display", "none");
	});
	myecharts.on('click', function (params) {
		$('#QueryBoard').window('open');
		$('#QueryBoard').window('expand');
		$('#layerL0').text(params.seriesName);
		if (params.seriesType == "lines") {
			$('#nameL0').text(params.data.ID);
			$('#countL0').text('source:' + params.data.coords[0] + ',end:' + params.data.coords[1]);
			$('#typeL0').text('线');
		}
		else {
			$('#nameL0').text(params.name);
			$('#countL0').text(params.value[2]);
			$('#typeL0').text('点');
		}
	});
	redraw();
}
//保存数据的结构 
function Icelayer(YKlayer) {
	this.mlid = YKlayer.mlid;
	this.layerid = YKlayer.layerid;
	this.state = YKlayer.state;
	//TODO 拆分style为具体设定
	this.style = JSON.stringify(YKlayer.style);
	this.zIndex = YKlayer.zIndex;
}
function Icemap(YKmap) {
	var mapstyle = {
		centerx: YKmap.centerx,
		centery: YKmap.centery,
		zoomlevel: YKmap.zoomlevel,
		mapmode: YKmap.mapmode
	}
	this.id = YKmap.mapid;
	this.userid = YKmap.mapuserid;
	this.mapname = YKmap.mapname;
	this.accessibility = YKmap.mapaccess;
	this.mapstyle = JSON.stringify(mapstyle);
}

function savemap() {
	var userid;
	$.ajax({
		url: "./getActiveUser.action",
		async: false,
		type: "POST",
		dataType: "text",
		data: {
		},success: function (result) {
			userid = $.parseJSON(result).userid;
		}});
	if(userid==0) {alert("请先登录或注册再保存地图");return;}
	if(userid!=myMapMana.mapuserid) 
		{
		myMapMana.mapid=0;
		myMapMana.mapuserid=userid;
		for(var i=0;i<myMapMana.maplayerlist.length;i++)
			{
			myMapMana.maplayerlist[i].mlid=0;
			}
		}
	var centerPoint = mybmap.getCenter();
	myMapMana.centerx = centerPoint.lng;
	myMapMana.centery = centerPoint.lat;
	var mapmodeString = mybmap.getMapType().getName();
	myMapMana.zoomlevel = mybmap.getZoom();
	if (mapmodeString == "地图")
		myMapMana.mapmode = 0;
	else
		myMapMana.mapmode = 1;
	var mapForSave = new Icemap(myMapMana);
	var layerForSave = new Array();
	layerForSave = [];
	for (var i = 0; i < myMapMana.maplayerlist.length; i++) {
		var temp = new Icelayer(myMapMana.maplayerlist[i]);
		layerForSave.push(temp);
	}
	$.ajax({
		url: "./savemap.action",
		async: false,
		type: "POST",
		dataType: "text",
		data: {
			map: JSON.stringify(mapForSave),
			maplayer: JSON.stringify(layerForSave)
		},
		success: function (result) {

			console.log(result)
		}
	})

}
