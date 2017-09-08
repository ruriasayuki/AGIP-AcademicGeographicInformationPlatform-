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

    <script src="plugin/bootstrap-table-1.11.1/bootstrap-table.js"></script>
    <link href="plugin/bootstrap-table-1.11.1/bootstrap-table.css" rel="stylesheet" />
    <script src="plugin/bootstrap-table-1.11.1/locale/bootstrap-table-zh-CN.js"></script>
	<script type="text/javascript" src="js/userTreat.js"></script>
    <script type="text/javascript" src="js/md5.js"></script>    
    <script type="text/javascript" src="js/searchMapPage.js"></script>            
</head>

<body>
<c:set var="pagename" value="searchMap" />
	<nav class="navbar navbar-default navbar-fixed-top">
		<div id="nav" class="container opacity50">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar0" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
			</div>
			<div class="collapse navbar-collapse topnavi" role="navigation"
				id="navbar0" style="font-size: 16px;">
				<ul class="nav navbar-nav" id="nav">
					<li><a href="index.action">学术地图发布平台Beta</a></li>
				</ul>
				<c:choose>
					<c:when test="${username eq null}">
						<ul class="nav navbar-nav navbar-right">
							<li class="dropdown"><a href="#" class="dropdown-toggle"
								data-toggle="dropdown"> 游客 <b class="caret"></b>
							</a>
								<ul class="dropdown-menu" id="usermenu">
									<li><a href="openSearchMapPage.action">查看地图</a></li>
									<li><a href="registerPanel.action">注册</a></li>
								</ul></li>
							<li><a id="loginwinbtn" href="#">登录</a></li>
							<li><a href="about.action">关于</a></li>
						</ul>
					</c:when>
					<c:otherwise>
						<ul class="nav navbar-nav navbar-right">
							<li class="dropdown"><a href="#" class="dropdown-toggle"
								data-toggle="dropdown"> ${username} <b class="caret"></b>
							</a>
								<ul class="dropdown-menu" id="usermenu">
									<li><a
										href="${pageContext.request.contextPath}/main.action">新建地图</a></li>
									<li><a href="openSearchMapPage.action">查看地图</a></li>
									<li><a
										href="${pageContext.request.contextPath}/openUpLayerPage.action">上传图层</a></li>

									<li><a href="ModifyPwd.action">修改密码</a></li>
								</ul></li>
							<li><a id="logoutbtn" href="#">注销</a></li>
							<li><a href="about.action">关于</a></li>
						</ul>
					</c:otherwise>
				</c:choose>

			</div>
		</div>
	</nav>
<div id="headInterval"></div>

    
    <div role="tabpanel" class="panel" id="MapMana">
<div class="panel panel-default">
            <div class="panel-heading">查询条件</div>
            <div class="panel-body">
                <form id="formSearch" class="form-horizontal">
                    <div class="form-group" style="margin-top:15px">
                        <label class="control-label col-sm-1" for="map_txt_mapname">地图名</label>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id="map_txt_mapname">
                        </div>
                
                        <div class="col-sm-2" style="text-align:left;">
                            <button type="button" style="margin-left:50px" id="map_btn_query" class="btn btn-primary">查询</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    
    <table class="table" id="tb_maps">
    </table>
    </div>
    
	<div class="modal fade" id="userwin" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">用户登录</h4>
				</div>
				<div class="modal-body" align="center">
					<div>

						<input type="text" class="form-control" placeholder="用户名"
							id="account"> <br /> <input type="password"
							class="form-control" placeholder="密&emsp;码" id="pwd"> <br />

						<input id="checkpwd" name="checkpwd" type="checkbox" />记住密码&emsp;&emsp;&emsp;&emsp;&emsp;
						<input id="checklogin" name="checklogin" type="checkbox" />自动登录 <br />
						<br /> <a href="./ForgetPassword.jsp">忘记密码？</a>&emsp;&emsp;&emsp;&emsp;&emsp;
						<a href="./registerPanel.action">立即注册</a> <br>
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
	GIS@ZJU
</footer>
</body>

</html>