// 事件操作
var eventFun = {
	setStep : function(index) {
		for (var i = 2; i <= index; i++) {
			$("#step" + i + "Li").addClass("blue").removeClass("gray");
			$("#step" + i + "Img").attr("src", "./img/3_blue_blue.png");
		}
		for (var i = index + 1; i <= 4; i++) {
			$("#step" + i + "Li").addClass("gray").removeClass("blue");
			$("#step" + i + "Img").attr("src", "./img/3_gray_gray.png");
		}
		$("#step" + (index + 1) + "Img").attr("src", "./img/3_blue_gray.png");
	}
};

$(document).ready(function() {
	$("#sendemail").click(function() {
/*		eventFun.setStep(2);
		$("div#step1").hide();
		$("div#step2").show();*/
		
		$.ajax({
			url:"./forgetPwd.action",
    		async:true,
    		type:"POST",
    		dataType:"text",
    		data:{
        		username:$('#username').textbox('getValue'),
        	},
        	success:function(data){
        		//alert(data);
        		if(data=="success"){
            		$.messager.show({
            			title:'提示',
            			msg:'验证码已发送到您的绑定邮箱',
            			showType:'show',
            			style:{
            				right:'',
            				bottom:''
            			}
            		});
        			
        			eventFun.setStep(2);
        			$("div#step1").hide();
        			$("div#step2").show();
        		}
        		else{
            		$.messager.alert({
            			title:'错误',
            			msg:'该用户不存在'
            		});
        		}
        	}
			
		})
	});
	$("#next").click(function() {		
		$.ajax({
			url:"./check.action",
    		async:true,
    		type:"POST",
    		dataType:"text",
    		data:{
        		checkcode:$('#checkcode').textbox('getValue'),
        	},
        	success:function(data){
        		//alert(data);
        		if(data=="correct"){
        			eventFun.setStep(3);
        			$("div#step2").hide();
        			$("div#step3").show();
        		}
        		else{
            		$.messager.alert({
            			title:'错误',
            			msg:'验证码错误'
            		});
        		}
        	}
			
		})
	});
	
	
	//密码验证
	var state2 = false;
	$("#password").textbox('textbox').blur(function () {
		if ($(this).val() == '') {
			$("#pinfo").text("密码不能为空");
	    }else {
			if ($(this).val().length < 6) {
				$("#pinfo").text("密码必须大于等于6位，请重新填写");
	        }else if($(this).val().length > 20){
				$("#pinfo").text("密码必须小于等于20位，请重新填写");
	        }else{
   	            $("#pinfo").text('');
   	            $("#pinfo").append("<img src='./img/3_ok.png' />");
   	            state2=true;
			}
		}
	});
	
	//确认密码
	var state3 = false;
	$("#passwordagain").textbox('textbox').blur(function () {
		if ($(this).val() == '') {
			$("#painfo").text("密码不能为空");
	    }else {
			if ($("#passwordagain").textbox('getValue')!=$("#password").val()) {
				$("#painfo").text("两次输入的密码不一致，请重新填写");
	        }else {
	            $("#painfo").text('');
	            $("#painfo").append("<img src='./img/3_ok.png' />");
	            state3=true;
	        }
		}
	});
	
	$("#okbtn").click(function(){
		if(state2&&state3){
			$.ajax({
				url:"./setNewPwd.action",
	    		async:true,
	    		type:"POST",
	    		dataType:"text",
	    		data:{
	        		password:hex_md5($('#password').textbox('getValue'))
	        	},
	        	success:function(data){
	        		if(data=="success"){
	        			//提示成功
	            		$.messager.show({
	            			title:'提示',
	            			msg:'密码已重置',
	            			showType:'show',
	            			timeout:1000,
	            			style:{
	            				right:'',
	            				bottom:''
	            			}
	            		});
	        			//跳转页面
						setTimeout(function(){
							window.location.href="./index.action"
						},1000);
	            		
	        		}
	        		else{
	            		$.messager.alert({
	            			title:'错误',
	            			msg:'密码重置失败'
	            		});
	        		}
	        	}
				
			})	
		}else{
    		$.messager.alert('修改失败','修改信息不正确！');
		}
	})
});
