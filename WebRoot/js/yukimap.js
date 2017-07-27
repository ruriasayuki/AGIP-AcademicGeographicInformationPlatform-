//读取数据的结构
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
	this.mlid = layerjson.mlid;
	this.layerid = layerjson.id;
	this.layername = layerjson.layername;
	this.layeruserid = layerjson.userid;
	this.storelocation = layerjson.storelocation;
	this.accessibility = layerjson.accessibility;
	this.appendsrc = layerjson.appendDataSrc;
	this.type = parseInt(layerjson.type);
	this.data = dataanaly(layerjson.datacontent);
	this.state = stateanaly(layerjson.state);
	this.style = dataanaly(layerjson.style);//直接存放echart的series或者mapv的item 
	this.zIndex = zanaly(layerjson.zIndex);
	this.mapv = null;//管理mapv图层
	//this.echarts=null;
}
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
function nothave(yklayer) {
	var templist = myMapMana.maplayerlist;
	for (var i = 0; i < templist.length; i++) {
		if (templist[i].layerid == yklayer.layerid) return false;
	}
	return true;
}
function Ykmap(mapjson) {
	var mapstyle = $.parseJSON(mapjson.mapstyle);
	this.mapid = mapjson.id;
	this.mapname = mapjson.mapname;
	this.centerx = mapstyle.centerx;
	this.centery = mapstyle.centery;
	this.zoomlevel = mapstyle.zoomlevel;
	this.mapmode = mapstyle.mapmode;
	//TODO 增加百度地图的样式配置
	this.maplayerlist = layeranaly(mapjson.maplayer);
}

function echartsSetting(stylejson) {
	//基于某种手法来构造这些变量，并且用于redraw	
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
	//测试参数修改
	//echartsoption.title.text="changed";
	echartsoption.series = myseries;
	myecharts.setOption(echartsoption);
	for (var i = 0; i < myMapMana.maplayerlist.length; i++) {
		if ((myMapMana.maplayerlist[i].state) && (has(myMapMana.maplayerlist[i].mapv))) {
			myMapMana.maplayerlist[i].mapv.bindEvent();
			myMapMana.maplayerlist[i].mapv.show();
		}
	}
}

function drawL1(layer, layerindex) {//分层设色图 使用mapv绘制
	var dataSet;
	/*var gradient = {//应该是和echarts的命名空间污染。。。
			'0': '#ffffff',
	        '1.0': '#ff0000'
    };
    */
	//缺省
	var splitList;
	var maxC, minC;
	var splitNum = 10;
	var splitType = "linear";
	if (has(myMapMana.maplayerlist[layerindex].mapv)) return true;//暂时用这个提高效率
	if (has(myMapMana.maplayerlist[layerindex].style)) {
		dataSet = new mapv.DataSet(myMapMana.maplayerlist[layerindex].style.dataSet._data);
		//gradient = myMapMana.maplayerlist[layerindex].style.options.gradient || gradient;
		maxC = myMapMana.maplayerlist[layerindex].style.options.max;
		minC = myMapMana.maplayerlist[layerindex].style.options.min;
		splitNum = myMapMana.maplayerlist[layerindex].style.options.splitNum;
		splitList = myMapMana.maplayerlist[layerindex].style.options.splitList;
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
			draw: 'intensity',
			max: maxC,
			min: minC,
			splitNum: splitNum,
			splitType: splitType,
			//gradient:gradient,
			splitList: splitList,
			shadowColor: 'rgba(0, 0, 0, 0.5)', // 投影颜色
			shadowBlur: 10,  // 投影模糊级数
			methods: {
				click: function (item) {
					$('#QueryBoard').window('open');
					$('#QueryBoard').window('expand');
					$('#gidL0').text(item.gid);
					$('#nameL0').text(item.name);
					$('#name_pyL0').text(item.name_py);
					$('#countL0').text(item.count);
					if (item.name == '浙江' || item.name == '浙江省')
						$('#link0').html("<a onclick='openTestPanel()'>更多信息</a>");
					else
						$('#link0').text("none");
				},
				mousemove: function (item) {
					item = item || {};
					var flag = 0;
					var data = dataSet.get();
					for (var i = 0; i < data.length; i++) {
						if (item.gid == data[i].gid) {//这里也是 geojson里面是gid 总之item的下面的东西的类型都要注意和geojson里面得对应字段的匹配问题
							data[i].fillStyle = 'yellow';
							flag = 1;
							if(tooltipPub.flag==0)
							{
								$("#mytooltip").html(item.name);
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
					return ((val[2] + offset) + (temp.min + offset))*((val[2] + offset) - (temp.min + offset)) / ((temp.max + offset) - (temp.min + offset))/((temp.max + offset) + (temp.min + offset)) * (temp.maxSize - temp.minSize) + temp.minSize;
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
				else if(temp.mapperType == "square")
				{
					var offset = 0;
					if(temp.min<0) offset = -temp.min;
					dvalue = (param.value[2] - temp.min)*(param.value[2] + temp.min) / (temp.max - temp.min)/(temp.max + temp.min)
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
	myMapMana.maplayerlist[layerindex].style = {
		series: item, append: {
			max: maxvalue,
			min: minvalue,
			maxSize: maxsize,
			minSize: minsize,
			maxColor: maxcolor,
			minColor: mincolor,
			mapperType: mappertype
		}
	};
	return item;
}
function drawL3(layer, layerindex) {//点图 （打算后面全用mapv重构
	if (has(myMapMana.maplayerlist[layerindex].style)) {
		//同步zIndex值之后重绘
		//对已有style做修改后没反应就在此重设
		//回调函数必须在此重设
		myMapMana.maplayerlist[layerindex].style.z = myMapMana.maplayerlist[layerindex].zIndex;
		return myMapMana.maplayerlist[layerindex].style;
	}
	var data = layer.data;
	var res = [];
	for (var i = 0; i < data.length; i++) {
		res.push({
			name: data[i].name,
			value: [Number(data[i].X), Number(data[i].Y), Number(data[i].value)]
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
	myMapMana.maplayerlist[layerindex].style = item;
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
var tooltipPub = {
	flag:0
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
	if(myMapMana.mapmode==1) mybmap.setMapType(BMAP_SATELLITE_MAP);
	myecharts.on('mouseover', function (params) {
		tooltipPub.flag=1;
		console.log(params);
		$("#mytooltip").html(params.name);
		$("#mytooltip").css("top", (mousePos.y - 40) + "px");
		$("#mytooltip").css("left", (mousePos.x + 10) + "px");
		$("#mytooltip").css("display", "inline");
	});
	myecharts.on('mouseout', function (params) {
		tooltipPub.flag=0;
		$("#mytooltip").css("display", "none");
	});
	myecharts.on('click', function (params) {
		
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
		centerx : YKmap.centerx,
		centery : YKmap.centery,
		zoomlevel : YKmap.zoomlevel,
		mapmode : YKmap.mapmode
	}
	this.id = YKmap.mapid;
	this.mapname = YKmap.mapname;
	this.mapstyle = JSON.stringify(mapstyle);
}

function savemap() {
	var centerPoint = mybmap.getCenter();
	myMapMana.centerx = centerPoint.lng;
	myMapMana.centery = centerPoint.lat;
	var mapmodeString = mybmap.getMapType().getName();
	myMapMana.zoomlevel = mybmap.getZoom();
	if(mapmodeString == "地图")
		myMapMana.mapmode = 0;
	else
		myMapMana.mapmode =1;
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
