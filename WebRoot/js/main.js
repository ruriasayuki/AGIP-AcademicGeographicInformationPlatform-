//main.jsp的页面的初始化

//实验性功能，主题变更（emm 砍了吧）
function changetheme(rec) {
	if (rec == 'gray') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/gray/easyui.css');
	} else if (rec == 'metro') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/metro/easyui.css');
	} else if (rec == 'blue') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/default/easyui.css');
	}
}

//打开测距
function mydisFunc() {
	mydis.open();
}

//打开分享
function myshareFunc() {
	$('#mapPanel').css('display', 'none');
	closeSearchPanel();
	if ($('#SharePanel').css('display') == 'none')
		$('#SharePanel').css('display', 'inline');
	else
		$('#SharePanel').css('display', 'none');
}

//打开搜索窗
function showSearchPanel() {
	$('#SharePanel').css('display', 'none');
	$('#mapPanel').css('display', 'none');
	if ($('#searchBox').css('display') == 'none')
		$('#searchBox').css('display', 'inline');
	else
		closeSearchPanel();
}

//关闭搜索窗
function closeSearchPanel()
{
	$('#searchBox').css('display', 'none');
	if(has(mySearchMarker)) mySearchMarker.hide();
}

//打开地图框
function showMapPanel() {
	closeSearchPanel();
	$('#SharePanel').css('display', 'none');
	if ($('#mapPanel').css('display') == 'none') {
		var mapsName = new Array();
		var username;
		var userid;
		$.ajax({
			url: "./getActiveUser.action",
			async: false,
			type: "POST",
			dataType: "text",
			data: {
			},success: function (result) {
				username = $.parseJSON(result).username;
				userid = $.parseJSON(result).userid;
			}});
		$.ajax({
			url: "./getMapList.action",
			async: false,
			type: "POST",
			dataType: "text",
			data: {
				userid: userid
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

//获取地图
function getMap(varmapid) {
	//TODO 改成ajax的重定向
	//location.href = "http://localhost:8080/AncientMap/main.action?mapid=" + varmapid;
	//不如先直接在这里测试addMapToMap
	addMapToMap(varmapid);
}

//添加地图至地图
function addMapToMap(varmapid)
{
	var newlayerlist;
	var submaptree;
	$.ajax({
		url: "./getMapLayerList.action",
		async: false,
		type: "POST",
		dataType: "text",
		data: {
			mapid:varmapid
		},success: function (result) {
			newlayerlist = layeranaly($.parseJSON(result)); 
		}});
	$.ajax({
		url: "./getMapInfo.action",
		async: false,
		type: "POST",
		dataType: "text",
		data: {
			mapid:varmapid
		},success: function (result) {
			var submap = $.parseJSON(result);
			submaptree = $.parseJSON(submap.layertree);
		}});
	for(var i=0;i<newlayerlist.length;i++)
		{
			myMapMana.maplayerlist.push(newlayerlist[i]);
		}
	submaptree[0].type="submap";
	addsubtree(submaptree);
	redraw();
}

//打开保存框
function showSavePanel() {
	//TODO 1 重写保存框为bootstrap风格
	$('#savePanel').window('open');

	//改变触发save的方法
	savemap();
}

//打开查询结果框
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

//缩放地图至 （按照对象的情况确定缩放层级
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
    function showLayerPanel() {
        $("#layerPanel").window('open');
    }

	function mouseMove(ev) {
		Ev = ev || window.event;
		mousePos = mouseCoords(ev);
	}
	function mouseCoords(ev) {
    	if (ev.pageX || ev.pageY) {
            return { x: ev.pageX, y: ev.pageY };
        }
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        	y: ev.clientY + document.body.scrollTop - document.body.clientTop
    	};
	} 
	function initMouseFunc(){
		document.onmousemove = mouseMove; 
	}
	//原layerpanel.js	
    function diappearText(obj) {
        if(obj.value == ""){
            obj.removeAttribute('placeholder');
        }
    }

    function showText(obj,text) {
        if(obj.value == ""){
            obj.setAttribute("placeholder",text);
        }
	}
	
    var jsonData;
    var selected;
	function getLayerData() { //这里的逻辑需要修改
		$.ajax({
			url:"./searchLayers.action",
			async:true,
			type:"POST",
			dataType:"text",
			data:{
				keyword:$("#keyword").val(),
				type:$("#type").val()
			},
			success:function(result){
				if(result == null || result == ""){
					var table = $("#table");
					var nodes = table.children();
			        for(var i = 0 ;i < nodes.length;i++){
			            nodes.remove();
			        }
					$("#databorder").html("无查询结果");
					$("#table").append("<tr><td>无查询结果</td></tr>");
					$("#count").html("0");
				}else{
					addDataColum(result);			
				}				
			}
		})
	}
    
	//锟斤拷锟斤拷锟斤拷锟斤拷锟?
	function addDataColum(result){
		jsonData = JSON.parse(result);//锟斤拷锟斤拷锟斤拷转锟斤拷锟斤拷json
		var table = $("#table");
		//锟斤拷删锟斤拷锟斤拷锟斤拷锟接节碉拷
		var nodes = table.children();
        for(var i = 0 ;i < nodes.length;i++){
            nodes.remove();
        }
     
        	for(var i = 0 ; i<jsonData.length; i++){
    			var jsonEachData = jsonData[i];//锟斤拷取每一锟斤拷锟斤拷锟斤拷
    			var elementString ="<tr class='tr'>" ;
    			for(var field in jsonEachData){
    				if(field == "layername")
    					elementString += "<td class='layername'>" + jsonEachData[field] +"</td>";
    				if(field == "type"){
    					switch(jsonEachData[field]){
    						case 0:
    							elementString += "<td class='type'>" + "分层设色图" +"</td>";
    							break;
    						case 1:
    							elementString += "<td class='type'>" + "等级符号图" +"</td>";
    							break;
    						case 2:
    							elementString += "<td class='type'>" + "点图" +"</td>";
    							break;
    						case 3:
    							elementString += "<td class='type'>" + "轨迹图" +"</td>";
    							break;
    						default:
    							break;
    					}
    				}					
    				if(field == "userid")
    					elementString += "<td class='author'>" + jsonEachData[field] +"</td>";
    				
    				if(field == "datacontent"){
    					var obj = jsonEachData[field];
    					elementString += "<td style='display:none'>" +  JSON.stringify(obj) + "</td>";
    				}
    				if(field == "id"){
    					elementString += "<td class='layerid' style='display:none'>" +  jsonEachData[field] + "</td>";
    				}
    					
    			}
    			elementString += "</tr>";
    			table.append(elementString);
    		}
        
        
       
        $("#count").html($("#table tr").length);
      	//为table提供tr回调函数
		 $(".tr").click(function(){
            if($(this).hasClass("select")){
                $(this).removeClass("select");
                var contentDateBorder = "";             
                $("#table").find("tr").each(function () {
                	  if($(this).hasClass("select")){
                		  //contentDateBorder += $(this).children('td:eq(4)').text() +"<br/><br/>";
                	  }
           		});
                $("#databorder").html(contentDateBorder);
            }
            else{
            	$(this).addClass("select");
            	var contentDateBorder = "";             
                $("#table").find("tr").each(function () {
                	  if($(this).hasClass("select")){
                		  //contentDateBorder += $(this).children('td:eq(4)').text() +"<br/><br/>";
                	  }
           		});
                $("#databorder").html(contentDateBorder);
            }
        })
        //为table锟斤拷每一锟斤拷tr锟斤拷一锟斤拷mouseover/mouseout锟铰硷拷
         $(".tr").mouseover(function() {
        	 $(this).addClass("over");
        	 var contentDateBorder = "";             
             $("#table").find("tr").each(function () {
             	  if($(this).hasClass("select") || $(this).hasClass("over")){
             		  //contentDateBorder += $(this).children('td:eq(4)').text() +"<br/><br/>";
             	  }
        		});
             $("#databorder").html(contentDateBorder);
        })
        $(".tr").mouseout(function() { 
        	 $(this).removeClass("over");
        	 var contentDateBorder = "";             
             $("#table").find("tr").each(function () {
             	  if($(this).hasClass("select") || $(this).hasClass("over")){
             		  //contentDateBorder += $(this).children('td:eq(4)').text() +"<br/><br/>";
             	  }
        		});
             $("#databorder").html(contentDateBorder);
        })
	}

function addLayerToMap()
{
	var selectedset = new Array();
	$(".tr.select").each(function(){
		selectedset.push(parseInt(($(this).find(".layerid").html())));
	});
	var temp = new Array();
	for(var i=0; i<jsonData.length;i++)
	{
		for(var j=0; j<selectedset.length;j++)
			{
				if(jsonData[i].id == selectedset[j])
					{
						temp=temp.concat(layeranaly(jsonData[i]));
						break;
					}
			}
	}
	for(var i=0; i<temp.length;i++)
		{
			if(nothave(temp[i]))
			{
				temp[i].mlid=0;
				myMapMana.maplayerlist.push(temp[i]);
				addTreeNode(temp[i]);
			}
		}
    $("#layerPanel").window('close');
    redraw();
}
	
//页面初始化
$(document).ready(function () {
	initMouseFunc();//绑定tooltip的鼠标跟随事件
	getLayerData();//获取图层数据（这里要重写（这里的具体代码见layerpanel.js
	yukiInit();//初始化（这里的代码见yukimap）
	createAutoComplete();//建立查询数据组（这里的代码见AttrSearch
	
});
