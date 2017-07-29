function closeLogWindow() {
    $("#account").textbox('setValue', "");
    $("#pwd").textbox('setValue', "");
    $("#userwin").window('close');
}

function showMessage() {
    if ($.trim($("#account").textbox('getValue')) == "" || $.trim($("#pwd").textbox('getValue')) == "") {
        $.messager.alert("错误", "必须输入账号密码！");
    } else {
        $.messager.alert("确认", "账号：" + $("#account").textbox('getValue') + ",密码：" + $("#pwd").textbox('getValue'));
    }
}

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
	return ""
}

function clearCookie(name) {    
    setCookie(name, "", -1);    
}

function do_autologin(){
	var cookie_username = getCookie("username");
    var cookie_password = getCookie("password");
    var cookie_bremember = getCookie("bremember");
    var cookie_bautologin = getCookie("bautologin");
    alert(cookie_bautologin);
	if(cookie_bautologin!="t"){
		//alert(22222);
		return;
	}
	//alert(111111);
	$.ajax({
		url:"./login.action",
		async:true,
		type:"POST",
		dataType:"text",
		data:{
    		username:cookie_username,
    		password:hex_md5(cookie_password),
    	},
		//contentType:"application/json",
		success: function(result){
			if(result=="success"){
				$('#userwin').window('close');
				window.location.reload();
			}
			else if(result=="fail"){
				$.messager.alert('提示',"用户名或密码错误！");
			}
		}
	})
}



$(document).ready(function() {
    $("#userwin").window('close');
    $("#cancelbtn").bind('click', closeLogWindow);
    
    $("#loginwinbtn").click(function() {
        $("#userwin").window('open');
      //获取cookie，如果有，则填充textbox
        var cookie_username = getCookie("username");
        var cookie_password = getCookie("password");
        var cookie_bremember = getCookie("bremember");
        var cookie_bautologin = getCookie("bautologin");
        var cookie_bautologin=getCookie("bautologin");
		//alert(cookie_bautologin);
/*        alert(cookie_username);
        alert(cookie_password);*/
        //if(cookie_username!=""&&cookie_password!=""){
        if(cookie_bremember=="t"){
        	$("#account").textbox('setValue',cookie_username);
        	$("#pwd").textbox('setValue',cookie_password);
        	$("#pwd").passwordbox('hidePassword');
        	$("#checkpwd").attr("checked",true);     
        }
        else{
        	//"f"或者""
        	$("#account").textbox('setValue',"");
        	$("#pwd").textbox('setValue',"");
        	$("#pwd").passwordbox('hidePassword');
        	$("#checkpwd").attr("checked",false);
        }
        
        if(cookie_bautologin=="t"){
        	$("#checklogin").attr("checked",true);
        }
        else{
        	//"f"或者""
        	$("#checklogin").attr("checked",false);//妈卖批这东西不能加引号！！！！！！！
        	//alert(1111);
        }
        
    });

//    $('#loginbtn').bind('click', showMessage);
/*    var setData={
    		username:$('#account').textbox('getValue'),
    		password:$('#pwd').textbox('getValue')
    	};*/
    $("#loginbtn").bind('click',function(){    	
    	var	rememberMe = $("#checkpwd").is(':checked');    
    	var	bautologin = $("#checklogin").is(':checked');
    	var expiredays = 7; 
    	//alert(hex_md5($('#pwd').textbox('getValue')));
    	$.ajax({
    		url:"./login.action",
    		async:true,
    		type:"POST",
    		dataType:"text",
    		data:{
        		username:$('#account').textbox('getValue').trim(),	
        		password:hex_md5($('#pwd').textbox('getValue').trim()),
        	},
    		//contentType:"application/json",
    		success: function(result){
    			if(result=="success"){
    				
    				//如果登录成功且勾选了记住我，则设置cookie
    				if(rememberMe){    					
    					
    					setCookie("bremember","t",expiredays);
    					if(bautologin){
    						setCookie("username",$('#account').textbox('getValue'),expiredays);
        					setCookie("password",$('#pwd').textbox('getValue'),expiredays);
        					
    						setCookie("bautologin","t",expiredays);
        				}
        				else{
        					setCookie("username",$('#account').textbox('getValue'),expiredays);
        					setCookie("password",$('#pwd').textbox('getValue'),expiredays);
        					
        					setCookie("bautologin","f",expiredays);
        				}
    				}
    				else{
    					
    					setCookie("bremember","f",expiredays);
    					if(bautologin){
    						setCookie("username",$('#account').textbox('getValue'),expiredays);
        					setCookie("password",$('#pwd').textbox('getValue'),expiredays);//也是要set不然可能之前的状态并不是记住密码所以没保存用户名密码
        					
    						setCookie("bautologin","t",expiredays);//不记住密码但自动登录
        				}
        				else{
        					setCookie("bautologin","f",expiredays);
        					
        					clearCookie("username");
        					clearCookie("password");//不记住密码不自动登录则clear俩
        				}
    				}
    				
    				$('#userwin').window('close');
    				window.location.reload();
    			}
    			else if(result=="fail"){
    				$.messager.alert('提示',"用户名或密码错误！");
    			}
    			else{
    				alert("其他原因登录失败");
    				
    			}
    		}
    	})
    });
    
    $("#logoutbtn").bind('click',function(){
    	$.ajax({
    		url:"./logout.action",
    		async:true,
    		type:"POST",
    		success: function(result){
    			if(result=="success"){
    				window.location.reload();
    				var expiredays = 7; 
    				setCookie("bautologin","f",expiredays);//退出登录当然就是取消下次打开页面会自动登录
    				//$("#checklogin").attr("checked",'false');//这个也要改才怪   				
    				alert("注销成功");    				
    			}
    			else{
    				alert("注销不成功");			
    			}
    		},
    		error:function(){
    			alert("注销服务器返回错误");
    		}    			
    	})    	
    	var cookie_bautologin=getCookie("bautologin");
		//alert(cookie_bautologin);   	
    });
});
