$(document).ready(function() {
    //echart+baiduMap
	
	$.getJSON("Qing_prov_t.json",function(data){
		baiduPointArray=[];
		var features = data.features;
		var GeoNum = 0;
		for(var i=0;i<features.length;i++){
		var Pointsl1=features[i].geometry.coordinates;
		for(var k=0;k<Pointsl1.length;k++){
		var	Pointsl2=Pointsl1[k];
		for(var m=0;m<Pointsl2.length;m++){
		var GeoPoints=Pointsl2[m];
		var textPoints=GeoPoints.toString();
		var pointCoords=textPoints.split(",");
		baiduPointArray[GeoNum]=[];
		for(var j=0; j<pointCoords.length; j=j+2){
					baiduPointArray[GeoNum].push(new BMap.Point(pointCoords[j],pointCoords[j+1]));//放入点数组
					}
				GeoNum++;
		}
		}
		}
	abc();
	});
})
function abc(){
	
myChart = echarts.init(document.getElementById("mapDiv1"));	





function renderItem(params, api) {
	var result1=[];
	    var coords = [
        [116.7,39.53],
        [103.73,36.03],
        [112.91,27.87],
        [120.65,28.01],
        [119.57,39.95]
    ];
	for(m=0;m<baiduPointArray.length;m++){
		result1[m]=[];

		
		for(n=0;n<baiduPointArray[m].length;n++){

			result1[m].push(api.coord([(baiduPointArray[m][n].lng).toFixed(2),(baiduPointArray[m][n].lat).toFixed(2)]));
			
		}

	}
	var result=[];
	var color = api.visual('color');
	for(k=0;k<result1.length;k++){				
		result.push({
		type: 'polygon',
		shape: {
			points: echarts.graphic.clipPointsByRect(result1[k], {
				x: params.coordSys.x,
				y: params.coordSys.y,
				width: params.coordSys.width,
				height: params.coordSys.height
			})
		},
		style: api.style({
			fill: color,
			stroke: echarts.color.lift(color)
			})
		})
	}
    

    return {
		type: 'group',
        children:result
    };
}

option = {
    backgroundColor: '#404a59',
    title: {
        text: '全国主要城市空气质量',
        subtext: 'data from PM25.in',
        sublink: 'http://www.pm25.in',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item'
    },
    bmap: {
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: true,
        mapStyle: {
            styleJson: [
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": {
                            "color": "#044161"
                        }
                    },
                    {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#064f85"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#005b96",
                            "lightness": 1
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#00508b"
                        }
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "green",
                        "elementType": "all",
                        "stylers": {
                            "color": "#056197",
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "subway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "manmade",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "local",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#029fd4"
                        }
                    },
                    {
                        "featureType": "building",
                        "elementType": "all",
                        "stylers": {
                            "color": "#1a5787"
                        }
                    },
                    {
                        "featureType": "label",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    }
            ]
        }
    },
    series : [
        {
            type: 'custom',
            coordinateSystem: 'bmap',
            renderItem: renderItem,
			smooth:true, 
            itemStyle: {
                normal: {
                    opacity: 0.5
                }
            },
            animation: false,
            silent: true,
            data: [0],
            z: -10
        }
    ]
};
myChart.setOption(option);
}

