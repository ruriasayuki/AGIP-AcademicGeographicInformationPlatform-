$(document).ready(function (e) {
    $('.banner').unslider({
        dots: true
    });
});
function testload(){
	$.ajax({
		url:"./main.action",
		async:true,
		type:"POST",
		dataType:"text",
		data:{
			mapid: 6
		}
	})
}
