var bmap, //百度地图实例
      myChart, //echart实例
     preZoomLevel;//缩放开始时的缩放级别;

var styleJson = [{//地图样式配置
    "featureType": "land",
    "elementType": "geometry",
    "stylers": {
        "color": "#323c48"
    }
}, {
    "featureType": "building",
    "elementType": "geometry",
    "stylers": {
        "color": "#2b2b2b"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry",
    "stylers": {
        "lightness": -77,
        "saturation": -94
    }
}, {
    "featureType": "green",
    "elementType": "geometry",
    "stylers": {
        "color": "#1b1b1b"
    }
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": {
        "color": "#404a59"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry.stroke",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "railway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": {
        "visibility": "on",
        "color": "#313131"
    }
}, {
    'featureType': 'label',
    'elementType': 'labels.text.fill',
    'stylers': {
        "color": "#cccccc",
        "weight": "0.1",
        "lightness": -15,
        "saturation": -4
    }
}, {
    "featureType": "manmade",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "local",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "boundary",
    "elementType": "labels.text.stroke",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "highway",
    "elementType": "all",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "boundary",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#8b8787",
        "visibility": "on"
    }
}];

var province_level = [
    ["浙江省", 119.957202, 29.159494, 347],
    ["江西省", 115.676082, 27.757258, 290],
    ["山东省", 118.527663, 36.09929, 176],
    ["山西省", 112.515496, 37.866566, 166],
    ["河北省", 115.661434, 38.61384, 140],
    ["江苏省", 119.368489, 33.013797, 131],
    ["河南省", 113.486804, 34.157184, 123],
    ["安徽省", 117.216005, 31.859252, 95],
    ["福建省", 117.984943, 26.050118, 60],
    ["四川省", 102.89916, 30.367481, 56],
    ["湖南省", 111.720664, 27.695864, 50],
    ["陕西省", 109.503789, 35.860026, 40],
    ["湖北省", 112.410562, 31.209316, 28],
    ["广东省", 113.394818, 23.408004, 17],
    ["北京省", 116.395645, 39.929986, 14],
    ["上海市", 121.487899, 31.249162, 12],
    ["甘肃省", 102.457625, 38.103267, 10],
    ["新疆维吾尔自治区", 85.614899, 42.127001, 7],
    ["云南省", 101.592952, 24.864213, 7],
    ["辽宁省", 122.753592, 41.6216, 6],
    ["内蒙古自治区", 114.415868, 43.468238, 6],
    ["广西壮族自治区", 108.924274, 23.552255, 4],
    ["西藏自治区", 89.137982, 31.367315, 3],
    ["吉林省", 126.262876, 43.678846, 2],
    ["海南省", 109.733755, 19.180501, 1],
    ["天津市", 117.210813, 39.14393, 1],
    ["台湾省", 121.973871, 24.086957, 0]
];
$(document).ready(function (e) {
function next(){
	var chart = echarts.init(document.getElementById('main'));
	var province_level_c = province_level.map(function(item) {
	    return {
	        name: item[0],
	        value: [
	            item[1],
	            item[2],
	            item[3]
	        ]
	    };
	});
	var allSeries = [{ //绘制散点图 省
	    name: 'province_qyw',
	    type: 'scatter',
	    coordinateSystem: 'bmap',
	    // symbolSize: function(val) {
	    //     return val[2] / 10;
	    // },
	    tooltip: { //应用提示框组件
	        trigger: 'item',
	        show: true,
	        formatter: function(params) {
	            return params.name + ' : ' + params.value[2] + "人";
	        }
	    },
	    data: province_level_c,
	    // itemStyle: {
	    //     normal: {
	    //         color: 'purple'
	    //     }
	    // }
	}, {
		name:'testQing',
		type:'map',
		map:'china',
		roam:true
	}];
	var option = {
	        title: { //设置图表标题
	            text: '全元文作者分布图', //主标题
	            subtext: '', //副标题
	            left: 'center',
	            top: 'top',
	            textStyle: {
	                color: '#fff'
	            }
	        },
	        tooltip: { //应用提示框组件
	            trigger: 'item',
	            formatter: function(params) {
	                return params.name + ' : ' + params.value[2] + "人";
	            }
	        },
	        visualMap: { //应用视觉映射组件
	            min: 0,
	            max: 350,
	            calculable: true, //是否显示拖拽用的手柄
	            //splitNumber: 6,
	            left: 5,
	            bottom: 60,
	            inRange: {
	                color: ['#50a3ba', '#eac736', '#d94e5d']
	            },
	            textStyle: {
	                color: '#fff'
	            }
	        },
	        bmap: { //引入百度地图
	        	  center: [105.871518, 38.386845],
	        	  zoom: 5,
	        	  roam: true,
	        	  mapStyle: { //设置地图样式
	        		  styleJson: styleJson
	        	  }
	        },
	        series: allSeries
	    };
	chart.setOption(option)
}
$.get('data/Qing_prov_t.json', function (chinaJson) {
    echarts.registerMap('china', chinaJson);
    next()
});

	
});