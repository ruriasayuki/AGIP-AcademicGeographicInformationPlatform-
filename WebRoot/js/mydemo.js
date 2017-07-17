function changetheme(rec) {
	if (rec == 'gray') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/gray/easyui.css');
	} else if (rec == 'metro') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/metro/easyui.css');
	} else if (rec == 'blue') {
		$('#easyuiTheme').attr('href', './jquery-easyui-1.5.2/themes/default/easyui.css');
	}
}
$(document).ready(function() {
	myinit();
});
