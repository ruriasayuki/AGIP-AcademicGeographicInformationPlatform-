$(document).ready(function() {
	//密码验证
	var state2 = false;
	$("#pwdNew").textbox('textbox').blur(function () {
		if ($(this).val() == '') {
			$("#newinfo").text("密码不能为空");
			    
		} else {
			if ($(this).val().length < 6) {
				$("#newinfo").text("密码必须大于等于6位，请重新填写");
				        
			} else if ($(this).val().length > 20) {
				$("#newinfo").text("密码必须小于等于20位，请重新填写");
				        
			} else {
	            $("#newinfo").text('');
	            $("#newinfo").append("<img src='./img/3_ok.png' />");
	            state2 = true;
			}
		}
	});
	//确认密码
	var state3 = false;
	$("#pwdNewAgain").textbox('textbox').blur(function () {
		if ($(this).val() == '') {
			$("#painfo").text("密码不能为空");	    
		} else {
			if ($("#pwdNewAgain").textbox('getValue') != $("#pwdNew").val()) {
				$("#painfo").text("两次输入的密码不一致，请重新填写");     
			} else {
	            $("#painfo").text('');
	            $("#painfo").append("<img src='./img/3_ok.png' />");
	            state3 = true;		        
			}
		}
	});
	// 确认修改密码
	$("#modifyOk").click(function() {
		if(state2&&state3){
			$.ajax({
				url : "./pwdOld.action",
				type : "POST",
				dataType : "text",
				data : {
					password : hex_md5($('#pwdOld').val().trim()),
					pwdNew : hex_md5($('#pwdNew').val().trim())
				},
				success : function(result) {
					if (result == "success") {
						// alert("注册成功");
						$.messager.show({
							title : '恭喜您',
							msg : '修改密码成功！',
							showType : 'show',
							timeout : 1000,
							style : {
								right : '',
								bottom : '',
							}
						});
						setTimeout(function() {
							window.location.href = "./index.action"
						}, 3500);
					} else if (result == "fail") {
						$.messager.show({
							title : '提示',
							msg : '原密码有误，请重新填写',
							showType : 'show',
							timeout : 3000,
							style : {
								right : '',
								bottom : '',
							}
						});
					}
				}
			})
		}else{
			$.messager.alert('修改失败', '信息不正确！');
		}

	});
})