// init for index.jsp

$(document).ready(function (e) {
	$('html').css(
		'width',window.screen.availWidth-20);
	$('#myCarousel').carousel({
	interval: 2000
	});
	checkAuthority();
	showMaps("tri","total");
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
				var newhtml = '<li><a href="./admin.action">审核管理</a></li>';
				$('#usermenu').html(oldhtml+newhtml);
				}
			}
		});
}
function showMaps(divIdPrefix,type){
	var data=null;
	$.ajax({
		url: "./getMapListForIndex.action",
		async: false,
		type: "POST",
		dataType: "text",
		data: {type:type},
		success: function (res) {
			data = $.parseJSON(res);
		}
	});
	for(maps in data){
		var mapid = data[maps].id;
		var mapname = data[maps].mapname;
		var curdiv = divIdPrefix + (parseInt(maps)+1);
		$("#"+curdiv).find("img").attr("src","./img/map/"+mapid+".jpg");
		$("#"+curdiv).children("a").attr("href","./main.action?mapid="+mapid);
		$("#"+curdiv).children("p").text(mapname);
	}		
}