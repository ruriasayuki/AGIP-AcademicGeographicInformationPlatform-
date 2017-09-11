<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
            <!DOCTYPE html>
            <html>

            <head>
                <meta charset="UTF-8">
                <title>学术地图发布平台@GIS.ZJU</title>
                <script type="text/javascript" src="js/load.js"></script>
                <link rel="stylesheet" href="plugin/bootstrap-3.3.7/css/bootstrap.min.css">
                
				<!-- easyui的样式 逐步移除中 后续开发者注意 1.一点点将easyui往bootstrap迁移 2.开始设计自己的前端框架，并从bootstrap向其迁移 -->
				<link rel="stylesheet" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/bootstrap/tree.css">
				<link rel="stylesheet" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/bootstrap/menu.css">
				<link rel="stylesheet" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/bootstrap/textbox.css">
				<link rel="stylesheet" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/bootstrap/combo.css">
				<link rel="stylesheet" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/bootstrap/combobox.css">
				<link rel="stylesheet" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/bootstrap/panel.css">
				<link rel="stylesheet" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/bootstrap/window.css">
				<link rel="stylesheet" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/bootstrap/linkbutton.css">
                <link rel="stylesheet" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/bootstrap/tooltip.css">
                
                
                
                

				<link rel="stylesheet" type="text/css" href="plugin/ol4/ol.css">
                <link rel="stylesheet" type="text/css" href="jquery-easyui-1.5.2/themes/icon.css">
                <script type="text/javascript" src="plugin/jquery-3.2.1.min.js"></script>
                <script type="text/javascript" src="bootstrap-3.3.7/js/bootstrap.min.js"></script>
                <script type="text/javascript" src="plugin/jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
              
                
                <script type="text/javascript" src="js/echarts.js"></script>
                
                <script type="text/javascript" src="js/md5.js"></script>
                <script type="text/javascript" src="js/userTreat.js"></script>
                
                <script type="text/javascript" src="plugin/ol4/ol-debug.js"></script>
                <script type="text/javascript" src="plugin/ol4/OpenLayer3Ext.js"></script>
                
                <script type="text/javascript" src="js/olv.js"></script>
                <script type="text/javascript" src="plugin/html2canvas.js"></script>
                
                <!--可视化模块-->
                <script type="text/javascript" src="js/yukimap2.js"></script>

       
                <!--主要由孟林昊提供代码 属于图层树模块 为地图展示子模块-->
                <script type="text/javascript" src="js/layertree.js"></script>
                
                <!-- 梁旭坚组的带有自动补完功能的查询模块 -->
                <script type="text/javascript" src="js/AttrSearch.js"></script>

                <script type="text/javascript" src="js/main.js"></script>
                <link href="css/public.css" rel="stylesheet">
                <link href="css/whitestyle.css" rel="stylesheet">
                <link href="css/searchLayer.css" rel="stylesheet">
				<link href="css/autocomplete.css" rel="stylesheet">
				<link href="css/legend.css" rel="stylesheet">
                <link href="css/measure.css" rel="stylesheet">
                <link href="css/main.css" rel="stylesheet">

                <script type="text/javascript" src="js/measure.js"></script>
                <script type="text/javascript" src="js/dragging.js"></script>
                <script type="text/javascript" src="js/mapv.js"></script>				
                <script>
            var mapdata = ${map};//获取后台返回的map数据 这里也要修改……顺便可以一起改掉后台的逻辑
        </script>
</head>
<body>
<c:set var="pagename" value="main" />

<%@include file="header.jsp"%>


<div>
    <div id="map" style="width:100%;height:90%"></div>
</div>

<footer>
    <br> @ZJUGIS 2014级
    <br> 2017.7.11
    <br>
    <br>
</footer>
<!-- 工具栏 如果要做的更好看 需要移除easyui的linkbutton -->
<div id="toolPanel">

<a href="#" onclick="showLayerPanel()" title="添加图层" class="easyui-linkbutton easyui-tooltip" data-options="position:'top'" plain="true" iconCls="icon-add"></a>
<a href="#" onclick="showMapPanel()" title="添加图层组" class="easyui-linkbutton easyui-tooltip" data-options="position:'top'" plain="true" iconCls="icon-map"></a>
<a href="#" onclick="screenShot()" title="截图(请使用其他截图手段截图如：QQ、截图键等)" class="easyui-linkbutton easyui-tooltip" data-options="position:'top'" plain="true" iconCls="icon-screenshot"></a>
<a href="#" onclick="myshareFunc()" title="分享链接(请确保他人的浏览权限)" class="easyui-linkbutton easyui-tooltip" data-options="position:'top'" plain="true" iconCls="icon-share"></a>
<a href="#" onclick="mydisFunc()" title="测距" class="easyui-linkbutton easyui-tooltip" data-options="position:'top'" plain="true" iconCls="icon-ruler"></a>
<!--TODO 打开帮助说明窗口  <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-help"></a>
-->
<a href="#" onclick="showSavePanel()" title="保存地图" class="easyui-linkbutton easyui-tooltip" data-options="position:'top'" plain="true" iconCls="icon-save"></a>
<a href="#" onclick="showSearchPanel()" title="地图内搜索" class="easyui-linkbutton easyui-tooltip" data-options="position:'top'" plain="true" iconCls="icon-search"></a>

</div>
<!-- 图层树 -->
<div id="maplayerTree" class="easyui-window"  title="图层" style="width:200px;"
data-options="minimizable:false,
maximizable:false,
closable:false,
modal:false,
border:false,
top:150,
left:5,
cls:'maplayerTree',
headerCls:'headerCls',
bodyCls:'bodyCls',
shadow:false">
<div>
    <div title="图层" style="padding:10px;">
<ul id="layerTree" class="easyui-tree" onlyLeafCheck="true" dnd="true">
<li id="layerFather">
    <span>图层</span>
    <ul>
    </ul>
</li>
</ul>
</div>
</div>
</div>
<!-- 分享工具栏 BEGIN-->
<div id="sharePanel" >
<!-- JiaThis Button BEGIN -->
<div class="jiathis_style_32x32">
	<a class="jiathis_button_qzone"></a>
	<a class="jiathis_button_tsina"></a>
	<a class="jiathis_button_tqq"></a>
	<a class="jiathis_button_weixin"></a>
	<a class="jiathis_button_renren"></a>
</div>
<script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
<!-- JiaThis Button END -->
</div>
<!-- 分享工具栏 END -->
<!-- 自定义图例 -->
<div id="mylegend" class="dragable dragablerb" >

</div>

<!-- 自定义tooltip -->
<div id="mytooltip">test tooltip </div>



<div id="mapPanel">

        <select id="selectMapName" name="type" class="easyui-combobox" style="width:200px;margin-left: 50px;">
<option>请选择地图 </option>
</select>

</div>

<!--TODO 都说了准备一下bootstrap化页面啊喂-->

<div id="changeName" class="easyui-window" title="编辑地图属性" style="width:280px;height:130px;" align:'center' data-options="modal:true,resizable:false,closed:true">
<div>
    <span>地图名称:</span><input id='nameForChange'></input>
    <input id="OKBtn" class="btn btn-primary btn-mini " type="submit" value="确定" onclick="changeName()">
    </br>
    <span>地图权限:</span>
    <input type="radio"  name="accessType" value="1" >公开&nbsp;&nbsp;
    <input type="radio"  name="accessType" value="0" >私有&nbsp;&nbsp;
    </br>
    <span>地图类型:</span><input id="maptype" name="maptype">
</div>
</div>

<!-- addLayerPanel -->
<div id="layerPanel" class="easyui-window" title="添加图层" style="width:800px;height:500px" data-options="modal:true,resizable:false,closed:true">
<div class="easyui-layout" style="width: 100%;height: 100%;">
<!--左半栏-->
<div style="width: 100%;">
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

</div>


<!--右半栏-->
<div style="width: 100%;">
<table id="tt">
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
<div style="width: 98%;margin: 2%"> 为您搜索到
<span id="count">X</span>条记录！
</div>
<button id="addBtn" class="btn" onclick="addLayerToMap()">确定</button>
</div>
</div>
</div>

<div id="layerMenu" class="easyui-menu" style="width:120px;">
<div onclick="changstyle()" data-options="iconCls:'icon-edit'">图层样式</div>
<div onclick="removeLayer()" data-options="iconCls:'icon-no'">移除</div>
</div>
<div id="submapMenu" class="easyui-menu" style="width:120px;">
<div onclick="changstyle()" data-options="iconCls:'icon-edit'">重命名</div>
<div onclick="removeLayer()" data-options="iconCls:'icon-no'">移除</div>
</div>
<div id="mapMenu" class="easyui-menu" style="width:120px;">
<div onclick="openChangeName()" data-options="iconCls:'icon-edit'">地图设定</div>
<div onclick="clearMap()" data-options="iconCls:'icon-no'">清除图层</div>
</div>

<!--保存框-->
<div id="savePanel" class="easyui-window" title="提示框" style="width:200px;height:150px" data-options="modal:true,resizable:false,closed:true">

保存成功！

</div>

<!-- 样式选择弹窗 -->
<div id="styleWin" class="easyui-window" title="编辑样式" style="width:300px;height:280px;text-align:center" closed="true" data-options="iconCls:'icon-edit',modal:true" minimizable="false" maximizable="false">
<div style="width:275px;height:200px;border:2px solid #ccc;margin:0 auto;margin-top:3px;">
<div id="stylediv" style="text-align:left;margin-left:30px;"></div>
</div>
<div style="position:absolute;top:240px;left:150px">
<a id="ok" class="easyui-linkbutton" data-options="iconCls:'icon-save'" style="width:60px" onclick="savestyle()">保存</a>
<a id="cancel" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" style="width:60px" onclick="closeStyleWin()">关闭</a>
</div>
</div>

<!-- 小查询框 -->
<div id="searchBox" >
<input id="p_apiName" name="apiName" type="text" autocomplete="off" style="width:200px;height:20px;" onkeyup="autoComplete.start(event)">  
<a id="search" href="#" class="easyui-linkbutton"  onclick="bgsearch()">搜索</a>
<div class="auto_hidden" style="height: auto;position:absolute; background-color: #F0F0F0;font-size: 10pt;" id="auto"></div>

</div>

<!-- ============== 属性查询结果返回框  ============== -->
<div id="resultPanel" class="easyui-window" title="查询结果" style="width:600px;height:400px" data-options="closed:true">
<table id="resultTable">
    <thead>
		<tr>
			<th data-options="field:'layername'">图层名称</th>
			<th data-options="field:'name'">名称</th>
			<th data-options="field:'datacontent'">数据内容</th>
			<th data-options="field:'type'">几何类型</th>
		</tr>
    </thead>
    <tbody id='resultSet'>
	</tbody>
</table>
</div>

<!-- ============== 插入地图对话框  ============== -->
<div id="insertMapPanel" class="easyui-window" title="打开/插入地图" style="width:600px;height:400px" data-options="closed:true">
<button id="openMapBtn" class="btn" onclick="addLayerToMap()">打开地图</button>
<button id="insertMapBtn" class="btn" onclick="addLayerToMap()">插入地图</button>
</div>

<!-- ============== 点选查询结果返回框  ============== -->
<div id="QueryBoard" class="easyui-window" style="width:450px" title="查询结果" data-options="closed:true">
<div id="res">
</div>
</div>



<!-- ============== 登录框  ============== -->
<%@include file="loginModal.jsp" %>
</body>

</html>