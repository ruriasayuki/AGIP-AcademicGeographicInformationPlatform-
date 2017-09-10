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
<!-- 加载头  -->
<%@include file="header.jsp"%>



    
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
<footer>
	GIS@ZJU
</footer>

<%@include file="loginModal.jsp" %>
</body>

</html>