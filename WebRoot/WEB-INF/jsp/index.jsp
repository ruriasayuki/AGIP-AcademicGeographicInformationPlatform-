<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>首页</title>
    <meta charset="UTF-8">
    <script type="text/javascript" src="js/load.js"></script>  
    <link rel="stylesheet" href="bootstrap-3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" id="easyuiTheme" type="text/css" href="jquery-easyui-1.5.2/themes/gray/easyui.css">
    <link rel="stylesheet" type="text/css" href="jquery-easyui-1.5.2/themes/icon.css">
    <script type="text/javascript" src="jquery-easyui-1.5.2/jquery.min.js"></script>
    <script type="text/javascript" src="bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="js/unslider.min.js"></script>
    <script type="text/javascript" src="js/indexdemo.js"></script>
    <script type="text/javascript" src="js/md5.js"></script>
    <script type="text/javascript" src="js/userTreat.js"></script>
    <link href="css/publicstyle.css" rel="stylesheet">
	<link href="css/blackstyle.css" rel="stylesheet">
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
			                <li><a href="${pageContext.request.contextPath}/searchMaps2.html">查看地图</a></li>
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
			                <li><a href="${pageContext.request.contextPath}/searchMaps2.html">查看地图</a></li>
			                <li><a href="${pageContext.request.contextPath}/map.html">上传图层</a></li>
			                
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
<div id="userwin" class="easyui-window" title="用户登录" style="width:420px; height:300px;border:solid 1px #AAAAAA;" data-options="iconCls:'icon-save', modal:true, maximizable:false">
    	<div style="padding:15px 30px;margin:2px;border:solid 1px #AAAAAA">
            <label style="display:inline-block;width:50px">帐号</label><input id="account" class="easyui-textbox" style="width:280px" data-options="iconCls:'icon-man', required:true, prompt:'enter your name'"/><br/><br/>
            <label style="display:inline-block;width:50px">密码</label><input id="pwd" class="easyui-passwordbox" style="width:280px"  data-options="required:true, prompt:'enter your password'"/><br/><br/>
            <input id="checkpwd" name="checkpwd" type="checkbox"/>记住密码<br/><br/>
            <input id="checklogin" name="checklogin" type="checkbox"/>自动登录<br/>
        </div>
        <div style="padding-left: 230px;margin-top: 10px">
            <input id="loginbtn" class="easyui-linkbutton" value="登录" style="width:70px; height: 20px" />
            <input id="cancelbtn" class="easyui-linkbutton" value="取消" style="width:70px; height:20px" />
        </div>
        <div style="position:relative">
        	<a href="./ForgetPassword.jsp" style="position:absolute;left:40px;top:18px">忘记密码？</a>
        </div>
        <div style="position:relative">
        	<a href="./registerPanel.action" style="position:absolute;left:320px;top:18px">立即注册</a>
        </div>
    </div>
</body>
</html>