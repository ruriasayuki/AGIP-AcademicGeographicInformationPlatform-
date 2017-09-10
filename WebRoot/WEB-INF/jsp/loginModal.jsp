<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

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