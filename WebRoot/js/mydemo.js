function changetheme(rec) {
	if (rec == 'gray') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/gray/easyui.css');
	} else if (rec == 'metro') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/metro/easyui.css');
	} else if (rec == 'blue') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/default/easyui.css');
	}
}
$(document).ready(function() {
    //在ready函数中根据地图容器的id创建一个地图实例
    var map = new BMap.Map("mapDiv1");
    //设置地图的初始化中心点
    //map.centerAndZoom("杭州", 6);
    map.centerAndZoom(new BMap.Point(118.454, 32.955), 6);
    //允许滚轮缩放
    map.enableScrollWheelZoom();
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl());
    //添加平移缩放控件
    map.addControl(new BMap.NavigationControl());

    //创建弧线上的三个点
    var beijingPosition=new BMap.Point(116.432045,39.910683),
        hangzhouPosition=new BMap.Point(120.129721,30.314429),
        taiwanPosition=new BMap.Point(121.491121,25.127053);
    //将点放入数组中
    var points = [beijingPosition,hangzhouPosition, taiwanPosition];

    var curve = new BMapLib.CurveLine(points, {strokeColor:"blue",
          strokeWeight:3, strokeOpacity:0.5}); //创建弧线对象
    map.addOverlay(curve); //添加到地图中

    //echart+baiduMap
    var myChart = echarts.init(document.getElementById("mapDiv2"));

    $.get('/AncientMap/data/hangzhou-tracks.json', function(data) {
        //获取线数据
        var lines = data.map(function(track) {
            return {
                coords: track.map(function(seg, idx) {
                    return seg.coord;
                })
            };
        });
        //设置绘制内容
        var option = {
            bmap: {//设置底图
                center: [120.13066322374, 30.240018034923],
                zoom: 14,
                roam: true,
                mapStyle: {
                    styleJson: [{
                        'featureType': 'water',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#d1d1d1'
                        }
                    }]
                }
            },
            series: [{
                type: 'map',
                map: 'china'
            },
            {//设置路线图
                type: 'lines',
                coordinateSystem: 'bmap',
                data: lines,
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
        //将绘制的内容和设置的属性放入echart实例中
		myChart.setOption(option);
		
        myChart.setOption(option);

        // 添加百度地图插件  增加地图基本功能
        var bmap = myChart.getModel().getComponent('bmap').getBMap();
        bmap.addControl(new BMap.MapTypeControl());
    });
});
