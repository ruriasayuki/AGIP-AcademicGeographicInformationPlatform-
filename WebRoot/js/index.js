// init for index.jsp

$(document).ready(function (e) {
	$('html').css(
		'width',window.screen.availWidth-20);
	$('#myCarousel').carousel({
	interval: 2000
	});
	checkAuthority();
});

function checkAuthority()
{
	$.ajax({
			url: "./getActiveAuthority.action",
			async: false,
			type: "POST",
			dataType: "text",
			data: {},
			success: function (flag) {
				if(flag==="true"){
				//TODO 弹窗提示管理员权限开启
				var oldhtml = $('#usermenu').html();
				var newhtml = '<li><a href="${pageContext.request.contextPath}/admin.action">审核管理</a></li>';
				$('#usermenu').html(oldhtml+newhtml);
				}
			}
		});
}