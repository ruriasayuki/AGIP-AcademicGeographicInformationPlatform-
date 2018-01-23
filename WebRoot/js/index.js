// init for index.jsp

$(document).ready(function (e) {
	$('html').css(
		'width',window.screen.availWidth-20);
	$('#myCarousel').carousel({
	interval: 2000
	});
	checkAuthority();
	showMaps("tri","total");
	showMaps("tmi1",1);
	showMaps("tmi2",2);
	showMaps("tmi3",3);
});


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
		$("#"+curdiv).attr("onclick","location='./main.action?mapid="+mapid+"'");
		$("#"+curdiv).children("p").text(mapname);
	}		
}