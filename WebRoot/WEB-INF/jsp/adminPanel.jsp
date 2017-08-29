<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>审核管理</title>
	<link rel="stylesheet" href="plugin/bootstrap-3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/public.css">
	<script type="text/javascript" src="plugin/jquery-3.2.1.min.js"></script>           
    <script type="text/javascript" src="plugin/bootstrap-3.3.7/js/bootstrap.min.js"></script>            
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
                
     <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
		            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
			                管理员
			            <b class="caret"></b>
		            </a>
		                <ul class="dropdown-menu" id="usermenu">
			                <li><a href="openSearchMapPage.action">查看地图</a></li>
			                <li><a href="ModifyPwd.action">修改密码</a></li>
		                </ul>
	                </li>
                    <li><a href="about.action">关于</a></li>
                </ul>

            </div>
        </div>
    </nav>
<div id="headInterval"></div>
<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#UserMana" aria-controls="UserMana" role="tab" data-toggle="tab">用户管理</a></li>
  <li role="presentation"><a href="#MapMana" aria-controls="MapMana" role="tab" data-toggle="tab">地图管理</a></li>
  <li role="presentation"><a href="#EditInfo" aria-controls="EditInfo" role="tab" data-toggle="tab">管理员信息修改</a></li>
</ul>
<div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="UserMana">
    用户列表的查阅和账户的停用处罚
    </div>
    <div role="tabpanel" class="tab-pane" id="MapMana">
 地图列表的查阅和地图的审核 禁止公开 等
    </div>
    <div role="tabpanel" class="tab-pane" id="EditInfo">
管理员自己的个人信息修改
    </div>
    
  </div>

其中信息浏览界面的均是新开窗口<br>
需要新写一个用户信息的小弹窗 用模态框即可<br>

<footer>
	GIS@ZJU
</footer>
</body>

</html>