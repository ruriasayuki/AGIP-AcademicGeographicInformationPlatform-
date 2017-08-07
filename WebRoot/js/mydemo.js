function changetheme(rec) {
	if (rec == 'gray') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/gray/easyui.css');
	} else if (rec == 'metro') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/metro/easyui.css');
	} else if (rec == 'blue') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/default/easyui.css');
	}
}

function mydisFunc() {
	mydis.open();
}
function myshareFunc() {
	$('#mapPanel').css('display', 'none');
	closeSearchPanel();
	if ($('#SharePanel').css('display') == 'none')
		$('#SharePanel').css('display', 'inline');
	else
		$('#SharePanel').css('display', 'none');
}
function showSearchPanel() {
	$('#SharePanel').css('display', 'none');
	$('#mapPanel').css('display', 'none');
	if ($('#searchBox').css('display') == 'none')
		$('#searchBox').css('display', 'inline');
	else
		closeSearchPanel();
}
function closeSearchPanel()
{
	$('#searchBox').css('display', 'none');
	if(has(mySearchMarker)) mySearchMarker.hide();
}
function showMapPanel() {
	closeSearchPanel();
	$('#SharePanel').css('display', 'none');
	if ($('#mapPanel').css('display') == 'none') {
		var mapsName = new Array();
		$.ajax({
			url: "./getMapList.action",
			async: false,
			type: "POST",
			dataType: "text",
			data: {
				userid: 1
			},
			success: function (result) {
				var resultobj = $.parseJSON(result);
				for (var i = 0; i < resultobj.length; i++) {
					var temp = {
						id: resultobj[i].id,
						name: resultobj[i].mapname
					}
					mapsName.push(temp);
				}
			}
		})
		$('#selectMapName').combobox({

			valueField: 'id',
			textField: 'name',
			data: mapsName,
			onSelect: function (param) {
				getMap(param.id);
			}
		});
		$('#mapPanel').css('display', 'inline');
	}
	else
		$('#mapPanel').css('display', 'none');
}

function getMap(varmapid) {
	//TODO 改成ajax的重定向
	location.href = "http://localhost:8080/AncientMap/main.action?mapid=" + varmapid;
}
function showSavePanel() {
	$('#savePanel').window('open');
	savemap();
	$('#savePanel').window('close');
}

function showResultPanel(resultSet) {
	var gridDataSet="";
	for (var i = 0; i < resultSet.length; i++) {
		 gridDataSet=gridDataSet+'<tr class="tr" id="'+i+'">'+
				'<td>'+resultSet[i].layername+'</td>'+
				'<td>'+resultSet[i].name+'</td>'+
				'<td>'+resultSet[i].count+'</td>'+
				'<td>'+resultSet[i].type+'</td>'+
				'</tr>'
	}
	$('#resultSet').html(gridDataSet);
	$(".tr").click(function(){
			$('#resultPanel').window('close');
			zoomMapTo(resultSet[$(this).attr('id')]);//TODO 地图缩放
        });
        //为table锟斤拷每一锟斤拷tr锟斤拷一锟斤拷mouseover/mouseout锟铰硷拷
         $(".tr").mouseover(function() {
        	 $(this).addClass("over");
        	 var contentDateBorder = "";             
             $("#resultSet").find("tr").each(function () {
             	  if($(this).hasClass("select") || $(this).hasClass("over")){
             	  }
        		});
        })
        $(".tr").mouseout(function() { 
        	 $(this).removeClass("over");
        	 var contentDateBorder = "";             
             $("#resultSet").find("tr").each(function () {
             	  if($(this).hasClass("select") || $(this).hasClass("over")){
             	  }
        		});
        });
	$('#resultPanel').window('open');
}

function zoomMapTo(obj)
{
	if(!has(mySearchMarker))
	{mySearchMarker = new BMap.Marker(new BMap.Point(120,90));
	mySearchMarker.setOffset(new BMap.Size(0,-2));
	mybmap.addOverlay(mySearchMarker);}
	var layer = myMapMana.maplayerlist[obj.index.layer];
	var index = obj.index.feature;
	switch(layer.type)
	{
	case 0:
		var data = layer.style.dataSet._data;
		var BB = data[index].bound;
		var point1 = new BMap.Point(BB.minX,BB.minY);
		var point2 = new BMap.Point(BB.maxX,BB.maxY);
		mybmap.setViewport([point1,point2]);
		mySearchMarker.setPosition(new BMap.Point((BB.minX+BB.maxX)/2,(BB.minY+BB.maxY)/2));
		mySearchMarker.show();
		break;
	case 1:
		var data = layer.style.series.data;
		var tx=data[index].value[0];
		var ty=data[index].value[1];
		var dx=layer.style.append.avgDis.dx;
		var dy=layer.style.append.avgDis.dy;
		var point1= new BMap.Point(tx-dx,ty-dy);
		var point2= new BMap.Point(tx+dx,ty+dy);
		mybmap.setViewport([point1,point2]);
		mySearchMarker.setPosition(new BMap.Point(tx,ty));
		mySearchMarker.show();
		break;
	case 2:
		var data = layer.style.series.data;
		var tx=data[index].value[0];
		var ty=data[index].value[1];
		var dx=layer.style.append.avgDis.dx;
		var dy=layer.style.append.avgDis.dy;
		var point1= new BMap.Point(tx-dx,ty-dy);
		var point2= new BMap.Point(tx+dx,ty+dy);
		mybmap.setViewport([point1,point2]);
		mySearchMarker.setPosition(new BMap.Point(tx,ty));
		mySearchMarker.show();
		break;
	case 3:
		var data = layer.style.data;
		var coords = new Array();
		for(var i=0;i<2;i++)
		{
			var coord = data[index].coords[i];
			coords.push(new BMap.Point(coord[0],coord[1]));
		}
		mybmap.setViewport(coords);
		var tx = (data[index].coords[0][0]+data[index].coords[1][0])/2;
		var ty = (data[index].coords[1][0]+data[index].coords[1][1])/2;
		mySearchMarker.setPosition(new BMap.Point(tx,ty));
		mySearchMarker.show();
		break;
	}
}

$(document).ready(function () {
	getData();
	myinit();
	createAutoComplete();
});
