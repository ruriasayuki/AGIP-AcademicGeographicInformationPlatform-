<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<title>search</title>
<script type="text/javascript" src="./plugin/jquery-3.2.1.min.js"></script>
<link rel="stylesheet" href="./plugin/bootstrap-3.3.7/css/bootstrap.min.css">
<script src="./plugin/bootstrap-3.3.7/js/bootstrap.min.js"></script>
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/searchMapPage.js"></script>
<script type="text/javascript" src="js/md5.js"></script>
<script type="text/javascript" src="js/userTreat.js"></script>
<link rel="stylesheet" href="css/searchMapPage.css">
</head>

<body>
	<!-- å·¨å¹ -->
	<div class="jumbotron search-header">	
			<c:set var="pagename" value="searchMap"/>
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

		<div class="container">
			<div class="row" >
  				<div class="col-xs-12" >
  					<h1>搜索地图</h1>
    				<div class="input-group col-md-6 col-md-offset-3">
    					<input id="searchInput" type="text" class="form-control" placeholder="Search for...">
      					<!-- æç´¢æé® -->
      					<span class="input-group-btn">
        					<button class="btn btn-default" type="button" onclick="search()">
        						<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
							</button>
      					</span>    					
    				</div>
  				</div>
  			</div>
  		</div>
	</div>

<!-- æç´¢ç»æå±ç¤ºåº -->
<div class="search-results">
	<div class="container-fluid">
		<!-- æ é¢ç» -->
		<div class="list-group" style="display:block;" >			
			<div class="list-group-item">
				<div class="row">
					<div class="col-md-3">
						<h4>mapname</h4>						
					</div>
					<!--  <div class="col-md-9 hidden-xs">
						<h6>username</h6>
					</div>
					-->
					<div class="col-md-3 col-md-offset-3 col-xs-12">
						<h4>userid</h4>
					</div>
				</div>			
			</div>	
			
			
		<!-- æç´¢ç»æ -->
		<div id="resultList" class="list-group" style="display:block;" >
			<!--  <button type="button" class="list-group-item">
				<div class="row">
					<div class="col-md-3">
						<h4><strong>mapname</strong></h4>						
					</div>
					<div class="col-md-9 hidden-xs">
						<p>description</p>
					</div>
					<div class="col-md-9  col-md-offset-3 col-xs-12">
						<p>username</p>
					</div>
				</div>			
			</button>
			
			<button type="button" class="list-group-item">
				<div class="row">
					<div class="col-md-3">
						<h4><strong>mapname</strong></h4>						
					</div>
					<div class="col-md-3">
						<h5>username</h5>
					</div>
				</div>			
			</button>-->
		</div><!-- /.list-group -->
		<nav aria-label="...">
  			<ul class="pager">
    			<li><a onclick="prevPage()">Prev</a></li>    
    			<li><a onclick="nextPage()">Next</a></li>
    			<li><p id="pager"></p></li>
  			</ul> 			
		</nav>

	</div>
</div>
</div>
<footer>
	<p>ZJU GIS</p>
</footer>
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