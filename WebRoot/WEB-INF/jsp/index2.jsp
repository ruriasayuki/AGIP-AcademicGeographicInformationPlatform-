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
    <link rel="stylesheet" href="plugin/bootstrap-3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" id="easyuiTheme" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/gray/easyui.css">
    <link rel="stylesheet" type="text/css" href="plugin/jquery-easyui-1.5.2/themes/icon.css">
    <script type="text/javascript" src="plugin/jquery-easyui-1.5.2/jquery.min.js"></script>
    <script type="text/javascript" src="plugin/bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="plugin/jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/md5.js"></script>
    <script type="text/javascript" src="js/userTreat.js"></script>
	<link href="css/index.css" rel="stylesheet">
	<link rel="stylesheet" href="css/scroll.css">
</head>
<body>
	<c:set var="pagename" value="index"/>
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
			                <li><a href="main.action">新建地图</a></li>
			                <li><a href="openSearchMapPage.action">查看地图</a></li>
			                <li><a href="openUpLayerPage.action">上传图层</a></li>
			                
			                <li><a href="user.action">用户服务</a></li>
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
    <div id="indexTop">
    <div id="topleft">
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
    <!-- 
    <a class="carousel-control left" href="#myCarousel" 
        data-slide="prev">
    </a>
    <a class="carousel-control right" href="#myCarousel" 
        data-slide="next">
    </a> 
    -->
</div>
</div>
<!-- topLeft End -->
<div id="topRight">
	<div>
		<div id="tri1" class="topRightDiv"><img class="picItem" src="img/13.jpg"></img></div>
		<div id="tri2" class="topRightDiv"><img class="picItem" src="img/13.jpg"></img></div>
		<div id="tri3" class="topRightDiv"><img class="picItem" src="img/13.jpg"></img></div>
	</div>
	<div>
		<div id="tri4" class="topRightDiv"><img class="picItem" src="img/13.jpg"></img></div>
		<div id="tri5" class="topRightDiv"><img class="picItem" src="img/13.jpg"></img></div>
		<div id="tri6" class="topRightDiv"><img class="picItem" src="img/13.jpg"></img></div>
	</div>
</div>
<!-- topRight End -->
</div>
<!-- IndexTop End -->
<div class="thematicMapList">
<div class="subMapListTitle">&emsp;文学</div>
<div id="thematic1" class="subMapList custom-scrollbar">
<div>
		<div id="tmi11" class="thematicDiv"><img class="picItem" src="img/12.jpg"></img></div>
		<div id="tmi12" class="thematicDiv"><img class="picItem" src="img/13.jpg"></img></div>
		<div id="tmi13" class="thematicDiv"><img class="picItem" src="img/05.jpg"></img></div>
		<div id="tmi14" class="thematicDiv"><img class="picItem" src="img/01.jpg"></img></div>
		<div id="tmi15" class="thematicDiv"><img class="picItem" src="img/14.jpg"></img></div>
		<div id="tmi16" class="thematicDiv"><img class="picItem" src="img/13.jpg"></img></div>
	</div>
</div>
<div class="subMapListTitle"><br>&emsp;历史</div>
<div id="thematic2" class="subMapList custom-scrollbar">
<div>
		<div id="tmi21" class="thematicDiv"><img class="picItem" src="img/13.jpg"></img></div>
		<div id="tmi22" class="thematicDiv"><img class="picItem" src="img/01.jpg"></img></div>
		<div id="tmi23" class="thematicDiv"><img class="picItem" src="img/13.jpg"></img></div>
		<div id="tmi24" class="thematicDiv"><img class="picItem" src="img/12.jpg"></img></div>
		<div id="tmi25" class="thematicDiv"><img class="picItem" src="img/13.jpg"></img></div>
		<div id="tmi26" class="thematicDiv"><img class="picItem" src="img/14.jpg"></img></div>
	</div>
</div>
<div class="subMapListTitle"><br>&emsp;经济</div>
<div id="thematic3" class="subMapList custom-scrollbar">
<div>
		<div id="tmi31" class="thematicDiv"><img class="picItem" src="img/01.jpg"></img></div>
		<div id="tmi32" class="thematicDiv"><img class="picItem" src="img/12.jpg"></img></div>
		<div id="tmi33" class="thematicDiv"><img class="picItem" src="img/13.jpg"></img></div>
		<div id="tmi34" class="thematicDiv"><img class="picItem" src="img/14.jpg"></img></div>
		<div id="tmi35" class="thematicDiv"><img class="picItem" src="img/05.jpg"></img></div>
		<div id="tmi36" class="thematicDiv"><img class="picItem" src="img/01.jpg"></img></div>
	</div>
</div>

</div>

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
<footer>
        <br>
         @ZJUGIS 2014级
        <br>
        2017.8.24
        <br>
        <br>
</footer>
</body>
</html>