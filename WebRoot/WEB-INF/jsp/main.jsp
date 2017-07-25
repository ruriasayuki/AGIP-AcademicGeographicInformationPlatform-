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
                <script type="text/javascript" src="${pageContext.request.contextPath}/js/mapv.min.js"></script>
                <script type="text/javascript" src="${pageContext.request.contextPath}/js/yukimap.js"></script>
                <!--胡泽豪整合重构的地图展示模块-->
                <script type="text/javascript" src="${pageContext.request.contextPath}/js/layerpanel.js"></script>
                <!--主要由胡毅荣提供代码 属于图层添加模块-->
                <script type="text/javascript" src="${pageContext.request.contextPath}/js/layertree.js"></script>
                <!--主要由孟林昊提供代码 属于图层树模块 为地图展示子模块-->
                <script type="text/javascript" src="${pageContext.request.contextPath}/js/mydemo.js"></script>
                <link href="css/publicstyle.css" rel="stylesheet">
                <link href="css/whitestyle.css" rel="stylesheet">
                <link href="css/searchLayer.css" rel="stylesheet">
                <script>
            var mapdata = ${map};//获取后台返回的map数据
        </script>
</head>

<body>
    <c:set var="pagename" value="main" />
    <nav class="navbar navbar-default navbar-fixed-top">
        <div id="nav" class="container">
            <div class="collapse navbar-collapse topnavi" role="navigation" id="navbar0" style="font-size: 16px;">
<ul class="nav navbar-nav" id="nav">
    <li><a href="index.action">学术地图发布平台Beta</a> </li>
    <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
			               	 主题
			            <b class="caret"></b>
		            </a>
        <ul class="dropdown-menu" id="usermenu">
            <li>
                <a a href="javascript:void(0);" onclick="changetheme('gray')">gray</a>
</li>
<li>
    <a a href="javascript:void(0);" onclick="changetheme('metro')">metro</a>
</li>
<li>
    <a a href="javascript:void(0);" onclick="changetheme('blue')">blue</a>
</li>
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
			                Admin@GIS.ZJU
			            <b class="caret"></b>
		            </a>
                <ul class="dropdown-menu" id="usermenu">
                    <li><a href="file:///E:/kaihashitsu/web/AncientMap/WebRoot/searchMaps.html">查看地图</a></li>
                    <li><a href="${pageContext.request.contextPath}/map.html">上传图层</a></li>
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
<a href="#" onclick="showMapPanel()"class="easyui-linkbutton" plain="true" iconCls="icon-map"></a>
<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-select"></a>
<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-screenshot"></a>
<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-share"></a>
<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-ruler"></a>
<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-help"></a>
<a href="#" onclick="showSavePanel()" class="easyui-linkbutton" plain="true" iconCls="icon-save"></a>
<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-back"></a>
</div>
</div>
<div id="maplayerTree" data-options="region:'west',split:true" title="图层" style="width:200px;">
<div class="easyui-accordion" data-options="fit:true,border:false">
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
<div data-options="region:'center'">
    <div id="map" style="width:100%;height:100%"></div>
</div>
</div>
<footer>
    <br> @ZJUGIS 2014级
    <br> 2017.7.11
    <br>
    <br>
</footer>
<!-- 自定义tooltip -->
<div id="mytooltip" style="position:absolute;display:none;padding:5px;background:#EE99DD;top:50%;left:50%;opacity:0.5;border-radius:5px">test tooltip </div>
<script> 
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
                                                       document.onmousemove = mouseMove; 
</script>
<div id="mapPanel" class="easyui-window" title="打开地图" style="width:300px;height:80px;" align:'center' data-options="modal:true,resizable:false,closed:true">
<div>
    <form>
        <select id="selectMapName" name="type" class="easyui-combobox" style="width:200px;margin-left: 50px;">
<option>请选择地图 </option>
</select>
<!--  <input id="SelectBtn" class="btn btn-primary btn-mini " type="submit" value="确定" onclick="getMap()">
    -->
</form>
</div>
</div>

<div id="changeName" class="easyui-window" title="修改名称" style="width:300px;height:80px;" align:'center' data-options="modal:true,resizable:false,closed:true">
<div>
    新名称:<input id='nameForChange'></input>
    <input id="OKBtn" class="btn btn-primary btn-mini " type="submit" value="确定" onclick="changeName()">
</div>
</div>

<!-- addLayerPanel -->
<div id="layerPanel" class="easyui-window" title="添加图层" style="width:800px;height:500px" data-options="modal:true,resizable:false,closed:true">
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
<div id="mm" class="easyui-menu" style="width:120px;">
<div onclick="changstyle()" data-options="iconCls:'icon-edit'">更改样式</div>
<div onclick="removeLayer()" data-options="iconCls:'icon-no'">移除</div>
</div>
<div id="savePanel" class="easyui-window" title="提示框" style="width:200px;height:150px" data-options="modal:true,resizable:false,closed:true">
<div id="saveStep1">保存中...</div>
<!-- TODO a two step window of saving 
	 <div id="saveStep2" style="display:none">
		保存完毕
		<br>
		</div>
	-->
</div>

<!-- 样式选择弹窗 -->
<div id="win" class="easyui-window" title="编辑样式" style="width:300px;height:280px;text-align:center" closed="true" data-options="iconCls:'icon-edit',modal:true" minimizable="false" maximizable="false">
<div style="width:275px;height:200px;border:2px solid #ccc;margin:0 auto;margin-top:3px;">
<div id="stylediv" style="text-align:left;margin-left:30px;"></div>
</div>
<div style="position:absolute;top:240px;left:150px">
<a id="ok" class="easyui-linkbutton" data-options="iconCls:'icon-save'" style="width:60px" onclick="savestyle()">保存</a>
<a id="cancel" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" style="width:60px" onclick="closewin()">关闭</a>
</div>
</div>
<table id="QueryBoardline" class="easyui-window" title="查询结果" style="width:500px;height:100px" data-options="closed:true">
<thead>
    <tr style="height:32px">
<th>FID</th>
<th>起始坐标</th>
<th>结束坐标</th>
</tr>
</thead>
<tbody>
    <tr>
        <td id="gid">NA</td>
        <td id="coords_strat">NA</td>
        <td id="coords_end">NA</td>
    </tr>
</tbody>
</table>
<!-- ============== 点选查询弹窗（分层） ============== -->
<table id="QueryBoard" class="easyui-window" title="查询结果" style="width:500px;height:100px" data-options="closed:true">
<thead>
    <tr style="height:32px">
<th>GID</th>
<th>地区名</th>
<th>拼音</th>
<th>被映射的值</th>
<th>扩展链接</th>
</tr>
</thead>
<tbody>
    <tr>
        <td id="gidL0">NA</td>
        <td id="nameL0">NA</td>
        <td id="name_pyL0">NA</td>
        <td id="countL0">NA</td>
        <td id="link0">NA</td>
    </tr>
</tbody>
</table>

<table id="TestPanel" class="easyui-window" title="查询结果" style="width:500px;height:100px" data-options="closed:true">
<thead>
    <tr style="height:32px">
<th>ID</th>
<th>作者</th>
<th>具体地区</th>
<th>扩展链接</th>
</tr>
</thead>
<tbody>
    <tr>
        <td id="idL">1</td>
        <td id="nameL">董嗣杲</td>
        <td id="locationL">浙江钱塘</td>
        <td id="linkL"><a href="https://baike.baidu.com/item/董嗣杲" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">2</td>
                    <td id = "nameL">白珽</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/白珽" target="_blank">链接<a></td>
                <tr>
                    <td id = "idL">3</td>
                    <td id = "nameL">张仲寿</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/张仲寿" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">4</td>
                    <td id = "nameL">仇远</td>
                   <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/仇远" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">5</td>
                    <td id = "nameL">张楧</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/张楧" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">6</td>
                    <td id = "nameL">白贲</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/白贲" target="_blank">链接<a></td>                </tr>
                <tr>
                    <td id = "idL">7</td>
                    <td id = "nameL">吴亮</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/吴亮" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">8</td>
                    <td id = "nameL">沈德章</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/沈德章" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">9</td>
                    <td id = "nameL">陈坚</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/陈坚" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">10</td>
                    <td id = "nameL">刘大彬</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/刘大彬" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">11</td>
                    <td id = "nameL">叶林</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/叶林" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">12</td>
                    <td id = "nameL">杨彝</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/杨彝" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">13</td>
                    <td id = "nameL">杨彝</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/杨彝" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">14</td>
                    <td id = "nameL">叶森</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/叶森" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">15</td>
                    <td id = "nameL">俞和</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/俞和" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">16</td>
                    <td id = "nameL">应才</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/应才" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">17</td>
                    <td id = "nameL">宋杞</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/宋杞" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">18</td>
                    <td id = "nameL">李晔</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/李晔" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">19</td>
                    <td id = "nameL">刘中</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/刘中" target="_blank">链接<a></td>
                </tr>
                <tr>
                    <td id = "idL">20</td>
                    <td id = "nameL">张舜咨</td>
                    <td id = "locationL">浙江钱塘</td>
                    <td id = "linkL"><a href="https://baike.baidu.com/item/张舜咨" target="_blank">链接<a></td>
                </tr>
            </tbody>
        </table>
        
</body>

</html>