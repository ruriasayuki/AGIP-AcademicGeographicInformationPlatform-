<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script>
	
</script>
</head>
<body>
	<form action="./addLayers2.action" method="post" enctype="multipart/form-data">
		图层名：<input type="text" name="layername"><br>
		是否共享：
				<input type="radio" value="T" name="accessibility">是
				<input type="radio" value="F" name="accessibility">否
				<br>
		图层类型：
				<input type="radio" value="0" name="type">分层设色图
				<input type="radio" value="1" name="type">等级符号图
				<input type="radio" value="2" name="type">点图
				<input type="radio" value="3" name="type">轨迹图
				<br>
		选择数据：<input type="file" name="file"><br>
		<input type="submit" value="上传">
	</form>
</body>
</html>