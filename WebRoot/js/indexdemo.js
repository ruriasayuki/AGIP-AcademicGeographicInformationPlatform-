$(document).ready(function (e) {
    $('.banner').unslider({
        dots: true
    });
//
//	$(".navbar-nav").find('li').find('ul').find('li').mouseover(function(){
//		$(".navbar-nav").find('li').find('ul').find('li').css("background-color",'rgba(0,0, 0, 0.3)');
//		});
//	$(".navbar-nav").find('li').find('ul').find('li').mouseout(function(){
//		$(".navbar-nav").find('li').find('ul').find('li').css("background-color",'rgba(0,0, 0, 0.3)');
//		});
});
function testload(){
	$.ajax({
		url:"./main.action",
		async:true,
		type:"POST",
		dataType:"text",
		data:{
			mapid: 10
		}
	})
}
