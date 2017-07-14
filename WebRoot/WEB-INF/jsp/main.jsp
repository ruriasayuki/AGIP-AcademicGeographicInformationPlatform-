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
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/mydemo.js"></script>
		<link href="css/pubglicstyle.css" rel="stylesheet">
	</head>

<body>
	<c:set var="pagename" value="main"/>
<nav class="navbar navbar-default navbar-fixed-top">
	<div id="nav" class="container">
		<div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar0" aria-expanded="false">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
          </div>
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
			                <li><a href="#">查看地图</a></li>
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
			                <li><a href="#">查看地图</a></li>
			                <li><a href="#">上传图层</a></li>
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


<div data-options="region:'west',split:true" title="Layers" style="width:200px;">
<div class="easyui-accordion" data-options="fit:true,border:false">
	<div title="Title1" style="padding:10px;">
	<ul class="easyui-tree" data-options="url:'${pageContext.request.contextPath}/data/tree_data.json',method:'get',animate:true,dnd:true"></ul>
</div>
<div title="Title2" data-options="selected:true" style="padding:10px;"> content2
</div>
<div title="Title3" style="padding:10px"> content3
</div>
</div>
</div>
<div data-options="region:'center',title:'Maps',iconCls:'icon-map'">
<div style="padding:5px;background:#fafafa;width:100%;border:1px solid #ccc">
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-add"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-reload"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-select"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-screenshot"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-share"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-ruler"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-help"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-save"></a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-back"></a>
</div>
	<div class="easyui-tabs" data-options="fit:true,border:false,plain:true">
		<div title="BaiduMap2">
			<!--加入地图容器-->
			<div id="mapDiv2" style="width:100%;height:100%"></div>
</div>

<div title="BaiduMap1">
	<!--加入地图容器-->
	<div id="mapDiv1" style="width:100%;height:100%"></div>
</div>


<div title="DataGrid" style="padding:5px">
<table class="easyui-datagrid" data-options="url:'${pageContext.request.contextPath}/data/datagrid_data.json',method:'get',singleSelect:true,fit:true,fitColumns:true">
	<thead>
		<tr>
			<th data-options="field:'itemid'" width="80">Item ID</th>
			<th data-options="field:'productid'" width="100">Product ID</th>
			<th data-options="field:'listprice',align:'right'" width="80">List Price</th>
			<th data-options="field:'unitcost',align:'right'" width="80">Unit Cost</th>
			<th data-options="field:'attr1'" width="150">Attribute</th>
			<th data-options="field:'status',align:'center'" width="50">Status</th>
		</tr>
	</thead>
</table>
</div>
</div>
</div>
<div data-options="region:'south',split:true" style="height:50px;"></div>
</div>

</body>

</html>