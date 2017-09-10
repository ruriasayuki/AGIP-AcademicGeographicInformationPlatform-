<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>注册账号</title>
<link rel="stylesheet" id="easyuiTheme" type="text/css" href="./plugin/jquery-easyui-1.5.2/themes/gray/easyui.css">
<link rel="stylesheet" type="text/css" href="./plugin/jquery-easyui-1.5.2/themes/icon.css">
<link rel="stylesheet" type="text/css" href="./css/Register.css">
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/jquery.min.js"></script>
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="./js/md5.js"></script>

<script type="text/javascript" src="./js/Register.js"></script>
 
</head>
<body>

<div id="head"><br/>
<span style="font-weight: bold; font-size: xx-large;">学术地图发布平台</span><span style="font-size: x-large;">|立即注册</span>
</div>
<div id="myform">
    <form id="registerform" action="./register.action" method="post">
    <label class="mylabel">用户名&emsp;</label>
    <input id="username" name="username" class="easyui-textbox" data-options="required:true,missingMessage:'用户名不可为空'" style="width:200px;height:30px" /><span id="uinfo" class="info"></span><br/><br/>
    <label class="mylabel">密&emsp;码&emsp;</label>
    <input id="password" name="password" class="easyui-passwordbox" data-options="required:true,validType:'length[6,20]'"  style="width:200px;height:30px" /><span id="pinfo" class="info"></span><br/><br/>
    <label class="mylabel">确认密码</label>
    <input id="passwordagain" name="passwordagain" class="easyui-passwordbox"  required="required" style="width:200px;height:30px" /><span id="painfo" class="info"></span><br/><br/>
    <label class="mylabel">真实姓名</label>
    <input id="realname" name="realname" class="easyui-textbox" data-options="required:true,missingMessage:'真实姓名不可为空'" style="width:200px;height:30px" /><span id="rninfo" class="info"></span><br/><br/>
    <label class="mylabel">所在单位</label>
    <input id="comp" name="comp" class="easyui-textbox" data-options="required:true,missingMessage:'所在单位不可为空'" style="width:200px;height:30px" /><span id="cpinfo" class="info"></span><br/><br/>
    <label class="mylabel">证件类型</label>
    <input id="credifitype" name="credifitype" style="width:200px;height:30px" /><span id="uinfo" class="info"></span><br/><br/>
    <label class="mylabel">证件号码</label>
    <input id="cretificate" name="cretificate" class="easyui-textbox" data-options="required:true,missingMessage:'证件号码不可为空'" style="width:200px;height:30px" /><span id="creinfo" class="info"></span><br/><br/>
    
    <label class="mylabel">邮&emsp;箱&emsp;</label>
    <input id="email" name="email" class="easyui-textbox" data-options="required:true"  style="width:200px;height:30px" /><span id="einfo" class="info"></span><br/><br/> 
    <input id="sendcode2email" readonly="readonly" class="easyui-linkbutton" value="邮箱验证码" style="height:30px;width:90px" />
    <input id="email_code" name="email_code_name" class="easyui-textbox" data-options="required:true" style="width:200px;height:30px" /><span id="ecinfo" class="info"></span><br/><br/>
   <input id="agree" name="agree" type="checkbox"/><label>我已阅读并同意相关<a href="./agreement.html" target="_blank">服务条款</a>和<a href="./privacy.html" target="_blank">隐私政策</a></label><br/>
    <div id="mustagree">
    	<img src="img/warning.png"><label>请接受服务条款和隐私协议</label>
    </div><br/>
    <input id="registerbtn" readonly="readonly"  class="easyui-linkbutton" value="注册" data-options="height:30,width:295"/><br><br>
    <input id="cancelbtn" readonly="readonly"  class="easyui-linkbutton" value="取消" data-options="height:30,width:295"/>
    </form>
</div>
<div id="bganimate" >
<canvas id="canvas" style="width:100%;height:100%;">
</canvas>
</div>
<script type="text/javascript" src="./js/glbg.js"></script>
</body>
</html>