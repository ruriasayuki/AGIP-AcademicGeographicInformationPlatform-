<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>tabs面板</title>
    <link rel="stylesheet" id="easyuiTheme" type="text/css" href="./jquery-easyui-1.5.2/themes/gray/easyui.css">
    <link rel="stylesheet" type="text/css" href="./jquery-easyui-1.5.2/themes/icon.css">
    <script type="text/javascript" src="./jquery-easyui-1.5.2/jquery.min.js"></script>
    <script type="text/javascript" src="./jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="./jquery-easyui-1.5.2/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=dhguD46rSbjK63LzamwTUdbfPZr4d4u0"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/library/CurveLine/1.5/src/CurveLine.js"></script>
    <script type="text/javascript" src="./js/echarts.js"></script>
    <script type="text/javascript" src="./js/bmap.js"></script>
    <style>
        html,body{
            height:100%;
            margin: 0;
            color: #c6e9ee;
        }
        .menuBtn{
            margin-top: 3px;
            margin-left: 5px;
        }
       
        .input{
            width: 100px;
            border-radius: 2px;
            text-indent: 2px;
            border: 1px solid #d6d6d6;
            height: 18px;
            outline: none;
            margin-left: 10px;
        }
        #searchBtn{
            border-radius: 4px;
            height: 25px;
            width: 80px;
            border: none;
            background-color: #6576bf;
            color: white;
            margin-left: 10px;
        }
        #searchBtn:hover{
            cursor: pointer;
            background-color: #4860bf;
        }
        table{
            border: 1px solid #d6d6d6;
            width: 100%;
            border-collapse:collapse;
            table-layout: fixed;
        }
        table td{
            border-top: 1px solid #cacaca;
            border-bottom: 1px solid #cacaca;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text-indent: 2px;
        }
        #titleTable{
            margin: 2%;
            margin-top: 5px;
            margin-bottom: 0px;
            width: 96%;
       }
        #dataTable{
            height: 250px;
            border: 1px solid #cacaca;
            width: 96%;
            margin: 2%;
            margin-top: 1px;
            box-shadow: 0px 0px 3px gray;
            overflow-y: scroll;
        }
        .layername{
            width: 50%;
        }
        .type{
            width: 25%;
        }
        .author{
            width: 25%;
        }
        .over{
            color:white;
            background-color: rgb(24, 70, 156);
        }
        .select{
        	color:white;
            background-color: rgb(23, 70, 156);
        }
    </style>
    <script>
    //初始化加载数据
    	$(function(){
    		getData();
    	})
    </script>
</head>
<body>
    <div class="easyui-layout" style="width: 100%;height: 12%;">
        <div region="north" border="false" style="height: 100%;border-bottom: 1px solid #c1c1c1;">
            <img src="img/map_logo.jpg" style="height: 90%;margin-left: 2%;margin-top: 3px;">
        </div>
    </div>
    <div class="easyui-layout" style="width: 100%;height: 88%">
        <div region="north" border="false" style="height: 30px;">
            <a href="#" class="easyui-linkbutton menuBtn" data-options="height:23" onclick="showLayerPanel()">添加图层</a>
            <a href="#" class="easyui-linkbutton menuBtn" data-options="height:23">保存</a>
            <a href="#" class="easyui-linkbutton menuBtn" data-options="height:23">按钮1</a>
            <a href="#" class="easyui-linkbutton menuBtn" data-options="height:23">按钮2</a>
            <a href="#" class="easyui-linkbutton menuBtn" data-options="height:23">按钮3</a>
            <a href="#" class="easyui-linkbutton menuBtn" data-options="height:23">按钮4</a>
            <a href="#" class="easyui-linkbutton menuBtn" data-options="height:23">按钮5</a>
        </div>
        <div data-options="region:'west',title:'图层管理',split:true" style="width: 200px">
        <ul id="tt" class="easyui-tree" data-options="animate:true,dnd:true,lines:true" checkbox="true" >
            <li>
                <span >图层</span>
                <ul>
                    <li><span>图层1</span></li>
                    <li><span>图层2</span></li>
                    <li><span>图层3</span></li>
                </ul>
            </li>
            <li>
                <span >底图</span>
                <ul>
                    <li><span>底图1</span></li>
                    <li><span>底图2</span></li>
                    <li><span>底图3</span></li>
                </ul>
            </li>
        </ul>
    </div>
        <div data-options="region:'center',title:'地图绘制',split:true">
        </div>
    </div>

    <!--添加图层面板-->
    <div id="layerPanel" class="easyui-window" title="添加图层" style="width:800px;height:500px"
         data-options="modal:true,resizable:false,closed:true">
        <div class="easyui-layout" style="width: 100%;height: 100%;">
            <!--左半栏-->
            <div data-options="region:'west',border:false" style="width: 60%;">
                <!--搜索栏-->
                <div id="searchPanel" style="width: 98%;height: 30%;margin: 1%">
                    <form id="searchFrom" action="#" onsubmit="return false">
                        <input id="keyword" class="input" type="text" name="keyword" placeholder="关键字" onfocus="diappearText(this)" onblur="showText(this,'关键字')">
                        <input class="input" type="text" name="source" placeholder="来源" onfocus="diappearText(this)" onblur="showText(this,'来源')">&nbsp;&nbsp;&nbsp;
                        <select id="type" name="type" class="easyui-combobox" style="width:100px;margin-left: 50px;" from="searchFrom">
                            <option value="4">所有图层</option>
                            <option value="0">分层设色图</option>
                            <option value="1">等级符号图</option>
                            <option value="2">点图</option>
                            <option value="3">轨迹图</option>
                        </select>
                        <input id="searchBtn" type="submit" value="搜索" onclick="getData()">
                    </form>
                </div>
                <!--地图展示栏 先展示数据-->
                <div id="databorder" style="width: 98%;height: 60%;margin: 1%;overflow-y: scroll;border:1px solid gray">
                
                </div>
            </div>
            <!--右半栏-->
            <div data-options="region:'east',border:false" style="width: 40%;">
                <div id="titleTable">
                    <span style="margin-left: 10px;">图层名</span>
                    <span style="margin-left: 30%">上传者</span>
                    <span style="margin-left: 10%">图层类型</span>
                </div>
                <div id="dataTable">
                    <table id="table">
                        <tr>
                            <td class="layername">元代作家1111111111111111111111</td>
                            <td class="type">分层设色图</td>
                            <td class="author">fds23</td>
                        </tr>
                        <tr>
                            <td class="layername">元代作家1111111111111111111111</td>
                            <td class="type">分层设色图</td>
                            <td class="author">fds23</td>
                        </tr>
                        <tr>
                            <td class="layername">元代作家1111111111111111111111</td>
                            <td class="type">分层设色图</td>
                            <td class="author">fds23</td>
                        </tr>
                        <tr>
                            <td class="layername">元代作家1111111111111111111111</td>
                            <td class="type">分层设色图</td>
                            <td class="author">fds23</td>
                        </tr>
                        <tr>
                            <td class="layername">元代作家1111111111111111111111</td>
                            <td class="type">分层设色图</td>
                            <td class="author">fds23</td>
                        </tr>
                        <tr>
                            <td class="layername">元代作家1111111111111111111111</td>
                            <td class="type">分层设色图</td>
                            <td class="author">fds23</td>
                        </tr>
                    </table>
                </div>
                <div style="width: 98%;margin: 2%">
                    	为您搜索到<span id="count">X</span>条记录！
                </div>
            </div>
        </div>
    </div>
</body>
<script>


    function showLayerPanel() {
        $("#layerPanel").window('open');
    }

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
	function getData() {
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
					//先删除所有子节点
					var nodes = table.children();
			        for(var i = 0 ;i < nodes.length;i++){
			            nodes.remove();
			        }
					$("#databorder").html("未查询到结果");
					$("#table").append("<tr><td>未查询到结果</td></tr>");
					$("#count").html("0");
				}else{
					addDataColum(result);			
				}				
			}
		})
	}
    
	//添加数据栏
	function addDataColum(result){
		var jsonData = JSON.parse(result);//将数据转化成json
		var table = $("#table");
		//先删除所有子节点
		var nodes = table.children();
        for(var i = 0 ;i < nodes.length;i++){
            nodes.remove();
        }
     
        if(jsonData.length >1 ){//当有多条记录时
        	for(var i = 0 ; i<jsonData.length; i++){
    			var jsonEachData = jsonData[i];//获取每一条数据
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
    				
    				if(field == "dataContent"){
    					var obj = jsonEachData[field];
    					elementString += "<td style='display:none'>" +  JSON.stringify(obj) + "</td>";
    				}
    					
    			}
    			elementString += "</tr>";
    			table.append(elementString);
    		}
        }
        else{//只有一条记录时
        	var elementString ="<tr class='tr'>" ;
			for(var field in jsonData){
				if(field == "layername")
					elementString += "<td class='layername'>" + jsonData[field] +"</td>";
				if(field == "type"){
					switch(jsonData[field]){
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
					elementString += "<td class='author'>" + jsonData[field] +"</td>";
				
				if(field == "dataContent"){
					var obj = jsonData[field];
					elementString += "<td style='display:none'>" +  JSON.stringify(obj) + "</td>";
				}
					
			}
			elementString += "</tr>";
			table.append(elementString);			
        }
        
        //更新数字
        $("#count").html($("#table tr").length);
      	//为table下每一个tr绑定一个onclick事件
		 $(".tr").click(function(){
            if($(this).hasClass("select")){
                $(this).removeClass("select");
                var contentDateBorder = "";             
                $("#table").find("tr").each(function () {
                	  if($(this).hasClass("select")){
                		  contentDateBorder += $(this).children('td:eq(3)').text() +"<br/><br/>";
                	  }
           		});
                $("#databorder").html(contentDateBorder);
            }
            else{
            	$(this).addClass("select");
            	var contentDateBorder = "";             
                $("#table").find("tr").each(function () {
                	  if($(this).hasClass("select")){
                		  contentDateBorder += $(this).children('td:eq(3)').text() +"<br/><br/>";
                	  }
           		});
                $("#databorder").html(contentDateBorder);
            }
        })
        //为table下每一个tr绑定一对mouseover/mouseout事件
         $(".tr").mouseover(function() {
        	 $(this).addClass("over");
        	 var contentDateBorder = "";             
             $("#table").find("tr").each(function () {
             	  if($(this).hasClass("select") || $(this).hasClass("over")){
             		  contentDateBorder += $(this).children('td:eq(3)').text() +"<br/><br/>";
             	  }
        		});
             $("#databorder").html(contentDateBorder);
        })
        $(".tr").mouseout(function() { 
        	 $(this).removeClass("over");
        	 var contentDateBorder = "";             
             $("#table").find("tr").each(function () {
             	  if($(this).hasClass("select") || $(this).hasClass("over")){
             		  contentDateBorder += $(this).children('td:eq(3)').text() +"<br/><br/>";
             	  }
        		});
             $("#databorder").html(contentDateBorder);
        })
	}
	
</script>
</html>