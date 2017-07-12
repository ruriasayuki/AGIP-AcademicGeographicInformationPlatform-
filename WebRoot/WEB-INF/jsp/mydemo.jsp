<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<form id="itemForm" target="_parent" action="${pageContext.request.contextPath }/loginResult.action" method="post" >
<label>账号</label><input id="loginText" name="username"></input>
<br>
<label>密码</label><input id="passwordText" name="password"></input>
<br>
<input id="loginBtn" type="submit" value="登陆"></input> 
</form>
<script type="text/javascript">

</script>
</body>
</html>