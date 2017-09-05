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
				<link rel="stylesheet" type="text/css" href="plugin/ol4/ol.css">
                <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/jquery-easyui-1.5.2/themes/icon.css">
                <script type="text/javascript" src="jquery-easyui-1.5.2/jquery.min.js"></script>
                <script type="text/javascript" src="bootstrap-3.3.7/js/bootstrap.min.js"></script>
                <script type="text/javascript" src="jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
                <script type="text/javascript" src="js/echarts.js"></script>
                
                <script type="text/javascript" src="js/md5.js"></script>
                <script type="text/javascript" src="js/userTreat.js"></script>
                <script type="text/javascript" src="js/styleChange.js"></script>
                <script type="text/javascript" src="plugin/ol4/ol-debug.js"></script>
                <script type="text/javascript" src="plugin/ol4/OpenLayer3Ext.js"></script>
                
                <script type="text/javascript" src="js/olv.js"></script>
                
                <!--可视化模块-->
                <script type="text/javascript" src="${pageContext.request.contextPath}/js/yukimap2.js"></script>

       
                <!--主要由孟林昊提供代码 属于图层树模块 为地图展示子模块-->
                <script type="text/javascript" src="${pageContext.request.contextPath}/js/layertree.js"></script>
                
                <!-- 梁旭坚组的带有自动补完功能的查询模块 -->
                <script type="text/javascript" src="${pageContext.request.contextPath}/js/AttrSearch.js"></script>

                <script type="text/javascript" src="${pageContext.request.contextPath}/js/main.js"></script>
                <link href="css/public.css" rel="stylesheet">
                <link href="css/whitestyle.css" rel="stylesheet">
                <link href="css/searchLayer.css" rel="stylesheet">
				<link href="css/autocomplete.css" rel="stylesheet">
				<link href="css/legend.css" rel="stylesheet">
                <script>
            var mapdata = ${map};//获取后台返回的map数据 这里也要修改……顺便可以一起改掉后台的逻辑
        </script>
</head>
<body>
	<c:set var="pagename" value="main"/>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div id="nav" class="container opacity50">
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
                    <li><a href="index.action">学术地图发布平台Beta</a> </li>
                </ul>
                <c:choose>
   <c:when test="${username eq null}">  
         <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
		            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
			              		  游客
			            <b class="caret"></b>
		            </a>
		                <ul class="dropdown-menu" id="usermenu">
			                <li><a href="openSearchMapPage.action">查看地图</a></li>
			                <li><a href="registerPanel.action">注册</a></li>
		                </ul>
	                </li>
                    <li><a id="loginwinbtn" href="#">登录</a></li>
                    <li><a href="about.action">关于</a></li>
                </ul>     
   </c:when>
   <c:otherwise> 
     <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
		            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
			                ${username}
			            <b class="caret"></b>
		            </a>
		                <ul class="dropdown-menu" id="usermenu">
			                <li><a href="${pageContext.request.contextPath}/main.action">新建地图</a></li>
			                <li><a href="openSearchMapPage.action">查看地图</a></li>
			                <li><a href="${pageContext.request.contextPath}/openUpLayerPage.action">上传图层</a></li>
			                
			                <li><a href="ModifyPwd.action">修改密码</a></li>
		                </ul>
	                </li>
                    <li><a id="logoutbtn" href="#">注销</a></li>
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
<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-screenshot"></a>
<a href="#" onclick="myshareFunc()" class="easyui-linkbutton" plain="true" iconCls="icon-share"></a>
<a href="#" onclick="mydisFunc()" class="easyui-linkbutton" plain="true" iconCls="icon-ruler"></a>
<!--TODO 打开帮助说明窗口  <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-help"></a>
-->
<a href="#" onclick="showSavePanel()" class="easyui-linkbutton" plain="true" iconCls="icon-save"></a>
<a href="#" onclick="showSearchPanel()" class="easyui-linkbutton" plain="true" iconCls="icon-search"></a>
</div>
</div>

<!-- 怪不得我没有动这个结构 有点意思的 上面是west面板的容器 下面作为风琴控件的标题被我换成了地图名……emmm 好好想想怎么改呗 要不干脆支持双地图支援算了-->
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
<!-- 分享工具栏 BEGIN-->
<div id="SharePanel" style="position:absolute;display:none;padding:5px;opacity:0.9;background:#EEEEEE;top:90px;left:90px;border-radius:5px">
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
<div id="mylegend" style="position:absolute;display:none;padding:5px;background:rgba(220,220,220,0.7);bottom:60px;right:1%;border-radius:5px">

</div>

<!-- 自定义tooltip -->
<div id="mytooltip" style="position:absolute;display:none;padding:5px;background:rgba(220,220,220,0.7);top:50%;left:50%;border-radius:5px">test tooltip </div>


<div id="mapPanel" style="position:absolute;display:none;padding:5px;opacity:0.9;background:#EEEEEE;top:90px;left:30px;border-radius:5px">
    <form>
        <select id="selectMapName" name="type" class="easyui-combobox" style="width:200px;margin-left: 50px;">
<option>请选择地图 </option>
</select>
<!--  <input id="SelectBtn" class="btn btn-primary btn-mini " type="submit" value="确定" onclick="getMap()">
    -->
</form>
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

<!--保存框-->
<div id="savePanel" class="easyui-window" title="提示框" style="width:200px;height:150px" data-options="modal:true,resizable:false,closed:true">

保存成功！

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

<!-- 小查询框 -->
<div id="searchBox" style="position:absolute;display:none;padding:5px;opacity:0.9;background:#EEEEEE;top:90px;left:180px;border-radius:5px">
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
<table id="QueryBoard" class="easyui-window" title="查询结果" style="width:500px;height:100px" data-options="closed:true">
<thead>
    <tr style="height:32px">
<th>图层名</th>
<th>名称</th>
<th>数据内容</th>
<th>几何类型</th>
</tr>
</thead>
<tbody>
    <tr>
        <td id="layerL0">NA</td>
        <td id="nameL0">NA</td>
        <td id="countL0">NA</td>
        <td id="typeL0">NA</td>
    </tr>
</tbody>
</table>
<!-- ============== 登录框  ============== -->
<div class="modal fade" id="userwin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">  
    <div class="modal-dialog modal-sm" role="document">  
        <div class="modal-content">  
            <div class="modal-header">  
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
                    <span aria-hidden="true">×</span>  
                </button>  
                <h4 class="modal-title" id="myModalLabel">用户登录</h4>  
            </div>  
            <div class="modal-body" align="center">   
                <div>
               
                	<input type="text" class="form-control" placeholder="用户名" id="account">
         		
            	<br/>
            	
            		<input type="password" class="form-control" placeholder="密&emsp;码" id="pwd">
            	
            	<br/>
            	
            	<input id="checkpwd" name="checkpwd" type="checkbox"/>记住密码&emsp;&emsp;&emsp;&emsp;&emsp;
            	<input id="checklogin" name="checklogin" type="checkbox"/>自动登录
            	<br/><br/>
            	<a href="./ForgetPassword.jsp">忘记密码？</a>&emsp;&emsp;&emsp;&emsp;&emsp;
        		<a href="./registerPanel.action">立即注册</a>
				<br>        
        		</div>
        	</div>
            <div class="modal-footer">  
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
                <button id="loginbtn" type="button" class="btn btn-primary">登录</button>  
            </div>  
        </div>  
    </div>  
</div> 
</body>

</html>