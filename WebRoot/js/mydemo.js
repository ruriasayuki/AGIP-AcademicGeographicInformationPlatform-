function changetheme(rec) {
	if (rec == 'gray') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/gray/easyui.css');
	} else if (rec == 'metro') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/metro/easyui.css');
	} else if (rec == 'blue') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/default/easyui.css');
	}
}
function openTestPanel()
{
	$('#TestPanel').window('open');
}
function mydisFunc()
{
	mydis.open();
}
function myshareFunc()
{
	$('#mapPanel').css('display','none');
	$('#searchBox').css('display','none');
	if($('#SharePanel').css('display')=='none')
		$('#SharePanel').css('display','inline');
	else
		$('#SharePanel').css('display','none');
}
function showSearchPanel()
{
	$('#SharePanel').css('display','none');
	$('#mapPanel').css('display','none');
	if($('#searchBox').css('display')=='none')
		$('#searchBox').css('display','inline');
	else
		$('#searchBox').css('display','none');
}
function showMapPanel()
{
	$('#searchBox').css('display','none');
	$('#SharePanel').css('display','none');
	if($('#mapPanel').css('display')=='none')
	{
	var mapsName = new Array();
	$.ajax({
		url:"./getMapList.action",
		async:false,
		type:"POST",
		dataType:"text",
		data:{
			userid:1
		},
		success:function(result){
			var resultobj = $.parseJSON(result);
			for(var i=0;i<resultobj.length;i++)
			{
				var temp = {
					id:resultobj[i].id,
					name:resultobj[i].mapname
				}
				mapsName.push(temp);
			}
		}				
	})
	$('#selectMapName').combobox({
	    
	    valueField:'id',
	    textField:'name',
	    	data:mapsName,
	    	onSelect:function(param)
	    	{
	    		getMap(param.id);
	    	}
	});
	$('#mapPanel').css('display','inline');
	}
	else
	$('#mapPanel').css('display','none');
}

function getMap(varmapid)
{
	//TODO 改成ajax的重定向
	location.href="http://localhost:8080/AncientMap/main.action?mapid="+varmapid;
}
function showSavePanel()
{
	$('#savePanel').window('open');
	savemap();
	$('#savePanel').window('close');
}

function showResultPanel(resultSet)
{
	console.log(resultSet);
}

$(document).ready(function() {
	getData();
	myinit();
	createAutoComplete();
});
