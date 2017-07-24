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
    <script type="text/javascript" src="bootstrap-3.3.7/js/bootstrap.min.js"></script>
      
    <script type="text/javascript" src="js/unslider.min.js"></script>
    <script type="text/javascript" src="js/indexdemo.js"></script>
    <link href="css/publicstyle.css" rel="stylesheet">
    <link href="css/blackstyle.css" rel="stylesheet">
    <link href="css/navbar.css" rel="stylesheet">
        <style>
    	body::-webkit-scrollbar {
			    display: none;
		}
    </style>
</head>
<body>
		<c:set var="pagename" value="index"/>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div id="nav" class="container opacity50">
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
			                <li><a href="#" onclick="testload()">查看地图</a></li>
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
    <div id="myCarousel" class="carousel slide">
    <!-- 轮播（Carousel）指标 -->
    <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
        <li data-target="#myCarousel" data-slide-to="3"></li>
        <li data-target="#myCarousel" data-slide-to="4"></li>
    </ol>   
    <!-- 轮播（Carousel）项目 -->
    <div class="carousel-inner">
        <div class="item active">
            <img src="img/01.jpg" alt="First slide">
        </div>
        <div class="item">
            <img src="img/12.jpg" alt="Second slide">
        </div>
        <div class="item">
            <img src="img/13.jpg" alt="Third slide">
        </div>
        <div class="item">
            <img src="img/14.jpg" alt="Fourth slide">
        </div>
        <div class="item">
            <img src="img/05.jpg" alt="Fifth slide">
        </div>
    </div>
    <!-- 轮播（Carousel）导航 -->
    <a class="carousel-control left" href="#myCarousel" 
        data-slide="prev">
    </a>
    <a class="carousel-control right" href="#myCarousel" 
        data-slide="next">
    </a>
</div>
    <footer>
        <br>
         @ZJUGIS 2014级
        <br>
        2017.7.11
        <br>
        <br>
    </footer>
</body>
</html>