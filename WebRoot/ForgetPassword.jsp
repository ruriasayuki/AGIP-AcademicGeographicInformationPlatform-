<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>忘记密码</title>

<link rel="stylesheet" id="easyuiTheme" type="text/css" href="./plugin/jquery-easyui-1.5.2/themes/gray/easyui.css">
<link rel="stylesheet" type="text/css" href="./plugin/jquery-easyui-1.5.2/themes/icon.css">
<link rel="stylesheet" type="text/css" href="./css/ForgetPassword.css">
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/jquery.min.js"></script>
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
<script type="text/javascript" src="./plugin/jquery-easyui-1.5.2/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="./js/md5.js"></script>
<script type="text/javascript" src="./js/ForgetPassword.js"></script>
</head>
<body>
	<div id="head"><br/>
	<span style="font-weight: bold; font-size: xx-large;">学术地图发布平台</span><span style="font-size: x-large;">|忘记密码</span>
	</div>

    <div id="page-inner">
        <div class="row">
            <ul id="myTab">
                  <li id="step1Li" class="active blue">                      
                      <a>1.填写用户名</a>                      
                  </li>
                  <li id="step2Li"  class="gray">
                      <img id="step2Img" src="./img/blue_gray.png"/>
                      <a>2.输入验证码</a>
                  </li>      
                  <li id="step3Li"  class="gray">
                      <img id="step3Img" src="./img/gray_gray.png"/>
                      <a>3.输入新密码</a>
                  </li>          
            </ul>
        </div>
        <div id="myTabContent">
			<div id="step1">
				<label class="mylabel">用户名</label>
    			<input id="username" name="username" class="easyui-textbox" data-options="iconCls:'icon-man', required:true, missingMessage:'用户名不可为空', width:200,height:30" /><br/><br/><br/>
            	<input id="sendemail" class="easyui-linkbutton" value="发送验证码" style="height:30px;width:90px" />
            </div>
            <div id="step2" style="display:none">
            	<label class="mylabel">验证码</label>
				<input id="checkcode" name="checkcode" class="easyui-textbox" data-options="required:true, width:200,height:30" /><br/><br/><br/>
            	<input id="next" class="easyui-linkbutton" value="下一步" style="height:30px;width:90px" />
            </div>
            <div id="step3" style="display:none">
            	<label class="mylabel">新密码</label>
    			<input id="password" name="password" class="easyui-passwordbox" data-options="required:true,validType:'length[6,20]', width:200,height:30"/><span id="pinfo" class="info"></span><br/><br/>
    			<label class="mylabel">确认密码</label>
    			<input id="passwordagain" name="passwordagain" class="easyui-passwordbox" data-options="required:true, width:200,height:30"/><span id="painfo" class="info"></span><br/><br/><br/>
    			<input id="okbtn" class="easyui-linkbutton" value="确认" style="height:30px;width:90px" />
            </div>
		</div>
<div id="bganimate" >
<canvas id="canvas" style="width:100%;height:100%">
</canvas>
</div>
<script type="text/javascript" src="./js/glbg.js"></script>
</body>
</html>