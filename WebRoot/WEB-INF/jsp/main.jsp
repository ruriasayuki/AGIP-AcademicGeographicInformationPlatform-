<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<title>Complex Layout - jQuery EasyUI Demo</title>
		 <script type="text/javascript" src="js/load.js"></script> 
		 
		<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap-3.3.7/css/bootstrap.min.css">
		<link rel="stylesheet" id="easyuiTheme" type="text/css" href="${pageContext.request.contextPath}/jquery-easyui-1.5.2/
	themes/gray/easyui.css">
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/jquery-easyui-1.5.2/themes/icon.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/jquery-easyui-1.5.2/jquery.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/bootstrap-3.3.7/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/echarts.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/bmap.js"></script>
		<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=grbYXcBhXlgv0QpFK3HHzVgLTInbTWjg"></script>
		<script type="text/javascript" src="http://api.map.baidu.com/library/CurveLine/1.5/src/CurveLine.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/mapv.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/yukimap.js"></script>	
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/layerpanel.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/mydemo.js"></script>
		<link href="css/publicstyle.css" rel="stylesheet">
		<link href="css/whitestyle.css" rel="stylesheet">
		<link href="css/searchLayer.css" rel="stylesheet">
		<script>
			var mapdata = ${map};
		</script>
	</head>

<body>
	<c:set var="pagename" value="main"/>
<nav class="navbar navbar-default navbar-fixed-top">
	<div id="nav" class="container">
		<div class="collapse navbar-collapse topnavi" role="navigation" id="navbar0" style="font-size: 16px;">
<ul class="nav navbar-nav" id="nav">
	<li><a href="index.action">Ancient Map</a> </li>
	<li class="dropdown">
		<a href="#" class="dropdown-toggle" data-toggle="dropdown">
			               	 主题
			            <b class="caret"></b>
		            </a>
		<ul class="dropdown-menu" id="usermenu">
			<li><a a href="javascript:void(0);" onclick="changetheme('gray')">gray</a></li>
			<li><a a href="javascript:void(0);" onclick="changetheme('metro')">metro</a></li>
			<li><a a href="javascript:void(0);" onclick="changetheme('blue')">blue</a></li>
		</ul>
	</li>
</ul>
<c:choose>
   <c:when test="${loginflag eq 0}">  
         <ul class="nav navbar-nav navbar-right">
         			<li class="dropdown">
		            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
			              		  游客
			            <b class="caret"></b>
		            </a>
		                <ul class="dropdown-menu" id="usermenu">
			                <li><a href="file:///E:/kaihashitsu/web/AncientMap/WebRoot/searchMaps.html">查看地图</a></li>
			                <li><a href="#">注册</a></li>
		                </ul>
	                </li>
                    <li><a href="login.action?page=${pagename}">登录</a></li>
                    <li><a href="about.action">关于</a></li>
                </ul>     
   </c:when>
   <c:otherwise> 
     <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
		            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
			                Asayuki
			            <b class="caret"></b>
		            </a>
		                <ul class="dropdown-menu" id="usermenu">
			                <li><a href="file:///E:/kaihashitsu/web/AncientMap/WebRoot/searchMaps.html">查看地图</a></li>
			                <li><a href="${pageContext.request.contextPath}/addLayerDemo.html">上传图层</a></li>
			                <li><a href="#">个人管理</a></li>
		                </ul>
	                </li>
                    <li><a href="logout.action?page=${pagename}">注销</a></li>
                    <li><a href="about.action">关于</a></li>
                </ul>
   </c:otherwise>
</c:choose>
</div>
</div>
</nav>
<div id="headInterval"></div>
<div class="easyui-layout" style="width:100%;height:90%">
<div data-options="region:'north',split:false" style="width:100%;height:40px;">
<div style="padding:5px;background:#fafafa;width:100%">
	<a href="#" onclick="showLayerPanel()" class="easyui-linkbutton" plain="true" iconCls="icon-add"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-reload"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-select"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-screenshot"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-share"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-ruler"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-help"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-save"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-back"></a>
</div>  
</div>
<div data-options="region:'west',split:true" title="Catalog" style="width:200px;">
<div class="easyui-accordion" data-options="fit:true,border:false">
	<div title="Layers" style="padding:10px;">
	<ul class="easyui-tree" data-options="selected:true,url:'${pageContext.request.contextPath}/data/tree_data.json',method:'get',animate:true,dnd:true"></ul>
</div>
</div>
</div>
<div data-options="region:'center'">
			<div id="map" style="width:100%;height:100%"></div>
</div>
</div>
    <footer>
        <br>
         @ZJUGIS 2014级
        <br>
        2017.7.11
        <br>
        <br>
    </footer>
<!-- 自定义tooltip -->
<div id="mytooltip" style="position:absolute;display:none;background:#FFFFFF;top:50%;left:50%">test tooltip </div>
<script> 
function mouseMove(ev) 
{ 
Ev= ev || window.event; 
mousePos = mouseCoords(ev); 
} 
function mouseCoords(ev) 
{ 
if(ev.pageX || ev.pageY){ 
return {x:ev.pageX, y:ev.pageY}; 
} 
return{ 
x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
y:ev.clientY + document.body.scrollTop - document.body.clientTop 
}; 
} 
document.onmousemove = mouseMove; 
</script> 
<!-- addLayerPanel -->
<div id="layerPanel" class="easyui-window" title="添加图层" style="width:800px;height:500px"
         data-options="modal:true,resizable:false,closed:true">
        <div class="easyui-layout" style="width: 100%;height: 100%;">
            <!--左半栏-->
            <div data-options="region:'west',border:false" style="width: 60%;">
                <!--搜索栏-->
                <div id="searchPanel" style="width: 98%;height: 30%;margin: 1%">
                    <form id="searchFrom" action="#" onsubmit="return false">
                        <input id="keyword" class="sinput" type="text" name="keyword" placeholder="关键字" onfocus="diappearText(this)" onblur="showText(this,'关键字')">
                        <input class="sinput" type="text" name="source" placeholder="来源" onfocus="diappearText(this)" onblur="showText(this,'来源')">&nbsp;&nbsp;&nbsp;
                        <select id="type" name="type" class="easyui-combobox" style="width:100px;margin-left: 50px;" from="searchFrom">
                            <option value="4">所有图层</option>
                            <option value="0">分层设色图</option>
                            <option value="1">等级符号图</option>
                            <option value="2">点图</option>
                            <option value="3">轨迹图</option>
                        </select>
                        <input id="searchBtn" class=btn type="submit" value="搜索" onclick="getData()">
                    </form>
                </div>
                <!--地图展示栏 先展示数据-->
                <div id="databorder" style="width: 98%;height: 60%;margin: 1%;overflow-y: scroll;border:1px solid gray">
                
                </div>
            </div>
            <!--右半栏-->
            <div data-options="region:'east',border:false" style="width: 40%;">
                <table id="tt" >
	<thead>
		<tr>
			<th field="layername" width="100">图层名</th>
			<th field="userid" width="50">上传者</th>
			<th field="type" width="50">图层类型</th>
		</tr>                          
	</thead>                           
	<tbody id="table">                            
		 <tr>                           
			<td>Data 1</td>            
			<td>Data 2</td>            
			<td>Data 3</td>    
		<tr>                    
	</tbody>                           
</table>
                <div style="width: 98%;margin: 2%">
                    	为您搜索到<span id="count">X</span>条记录！
                </div>
                <button id="addBtn" class="btn" onclick="addLayerToMap()">确定</button>
            </div>
        </div>
    </div>


</body>

</html>