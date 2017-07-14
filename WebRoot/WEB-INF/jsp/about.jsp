<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <meta charset="UTF-8">
     <script type="text/javascript" src="js/load.js"></script> 
    <link rel="stylesheet" href="bootstrap-3.3.7/css/bootstrap.min.css">
    <script type="text/javascript" src="jquery-easyui-1.5.2/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/unslider.min.js"></script>
    <script type="text/javascript" src="js/indexdemo.js"></script>
    <link href="css/publicstyle.css" rel="stylesheet">
    <link href="css/navbar.css" rel="stylesheet">
</head>
<body>
	<c:set var="pagename" value="about"/>
    <nav class="navbar navbar-inverse navbar-fixed-top">
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
                    <li><a href="index.action">Ancient Map</a> </li>
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
		<div style="position:absolute;width:100%;top:50px;color:#EEEEEE">
    		 关于这个项目的一些说明。
    	 	<br>
    	 	这个项目为浙江大学地理信息科学专业暑期短学期实习作品，且应当会继续提供维护。
    	 	<br>
    	 	主要功能是上传图层数据，结合底图对图层数据进行可视化展示，以便于进行地理相关的分析。
    	 	<br>
    		暂时这个about也只不过是个测试页面，届时会重新写过的。以上
    	 </div>
    
</body>
</html>