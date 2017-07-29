<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>修改密码</title>
<link rel="stylesheet" id="easyuiTheme" type="text/css" href="./plugin/jquery-easyui-1.5.2/themes/gray/easyui.css">
<link rel="stylesheet" type="text/css" href="./plugin/jquery-easyui-1.5.2/themes/icon.css">
<link rel="stylesheet" type="text/css" href="./css/ModifyPwd.css">
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/jquery.min.js"></script>
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="./js/md5.js"></script>
<script type="text/javascript" src="./js/ModifyPwd.js"></script>
</head>
<body>
<div id="head"><br/>
<span style="font-weight: bold; font-size: xx-large;">Ancient Map</span><span style="font-size: x-large;">|修改密码</span>
</div>
<div id="modifyDiv">
    <label class="mylabel">原密码</label>
    <input id="pwdOld" name="pwdOld" class="easyui-passwordbox" data-options="required:true,validType:'length[0,20]'"  style="width:200px;height:30px" /><span id="oldinfo"></span><br/><br/>
    <label class="mylabel">新密码</label>
    <input id="pwdNew" name="pwdNew" class="easyui-passwordbox" data-options="required:true,validType:'length[0,20]'"  style="width:200px;height:30px" /><span id="newinfo"></span><br/><br/>
    <label class="mylabel">确认密码</label>
    <input id="pwdNewAgain" name="pwdNewAgain" class="easyui-passwordbox" required="required" validType="equals['#password']" style="width:200px;height:30px" /><span id="painfo"></span><br/><br/>
    <input id="modifyOk" class="easyui-linkbutton" value="确认" data-options="height:30,width:60"/>
</div>
</body>
</html>