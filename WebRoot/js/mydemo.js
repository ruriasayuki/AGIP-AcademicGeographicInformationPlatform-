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

function showMapPanel()
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
	$('#mapPanel').window('open');
}

function getMap(varmapid)
{
	location.href="http://localhost:8080/AncientMap/main.action?mapid="+varmapid;
}
function showSavePanel()
{
	$('#savePanel').window('open');
	savemap();
	$('#savePanel').window('close');
}
$(document).ready(function() {
	getData();
	myinit();

});
