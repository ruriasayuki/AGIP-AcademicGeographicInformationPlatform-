    function showLayerPanel() {
        $("#layerPanel").window('open');
    }

    function diappearText(obj) {
        if(obj.value == ""){
            obj.removeAttribute('placeholder');
        }
    }

    function showText(obj,text) {
        if(obj.value == ""){
            obj.setAttribute("placeholder",text);
        }
    }
    var jsonData;
    var selected;
	function getData() {
		$.ajax({
			url:"./searchLayers.action",
			async:true,
			type:"POST",
			dataType:"text",
			data:{
				keyword:$("#keyword").val(),
				type:$("#type").val()
			},
			success:function(result){
				if(result == null || result == ""){
					var table = $("#table");
					var nodes = table.children();
			        for(var i = 0 ;i < nodes.length;i++){
			            nodes.remove();
			        }
					$("#databorder").html("无查询结果");
					$("#table").append("<tr><td>无查询结果</td></tr>");
					$("#count").html("0");
				}else{
					addDataColum(result);			
				}				
			}
		})
	}
    
	//锟斤拷锟斤拷锟斤拷锟斤拷锟?
	function addDataColum(result){
		jsonData = JSON.parse(result);//锟斤拷锟斤拷锟斤拷转锟斤拷锟斤拷json
		var table = $("#table");
		//锟斤拷删锟斤拷锟斤拷锟斤拷锟接节碉拷
		var nodes = table.children();
        for(var i = 0 ;i < nodes.length;i++){
            nodes.remove();
        }
     
        	for(var i = 0 ; i<jsonData.length; i++){
    			var jsonEachData = jsonData[i];//锟斤拷取每一锟斤拷锟斤拷锟斤拷
    			var elementString ="<tr class='tr'>" ;
    			for(var field in jsonEachData){
    				if(field == "layername")
    					elementString += "<td class='layername'>" + jsonEachData[field] +"</td>";
    				if(field == "type"){
    					switch(jsonEachData[field]){
    						case 0:
    							elementString += "<td class='type'>" + "分层设色图" +"</td>";
    							break;
    						case 1:
    							elementString += "<td class='type'>" + "等级符号图" +"</td>";
    							break;
    						case 2:
    							elementString += "<td class='type'>" + "点图" +"</td>";
    							break;
    						case 3:
    							elementString += "<td class='type'>" + "轨迹图" +"</td>";
    							break;
    						default:
    							break;
    					}
    				}					
    				if(field == "userid")
    					elementString += "<td class='author'>" + jsonEachData[field] +"</td>";
    				
    				if(field == "datacontent"){
    					var obj = jsonEachData[field];
    					elementString += "<td style='display:none'>" +  JSON.stringify(obj) + "</td>";
    				}
    				if(field == "id"){
    					elementString += "<td class='layerid' style='display:none'>" +  jsonEachData[field] + "</td>";
    				}
    					
    			}
    			elementString += "</tr>";
    			table.append(elementString);
    		}
        
        
       
        $("#count").html($("#table tr").length);
      	//为table提供tr回调函数
		 $(".tr").click(function(){
            if($(this).hasClass("select")){
                $(this).removeClass("select");
                var contentDateBorder = "";             
                $("#table").find("tr").each(function () {
                	  if($(this).hasClass("select")){
                		  contentDateBorder += $(this).children('td:eq(4)').text() +"<br/><br/>";
                	  }
           		});
                $("#databorder").html(contentDateBorder);
            }
            else{
            	$(this).addClass("select");
            	var contentDateBorder = "";             
                $("#table").find("tr").each(function () {
                	  if($(this).hasClass("select")){
                		  contentDateBorder += $(this).children('td:eq(4)').text() +"<br/><br/>";
                	  }
           		});
                $("#databorder").html(contentDateBorder);
            }
        })
        //为table锟斤拷每一锟斤拷tr锟斤拷一锟斤拷mouseover/mouseout锟铰硷拷
         $(".tr").mouseover(function() {
        	 $(this).addClass("over");
        	 var contentDateBorder = "";             
             $("#table").find("tr").each(function () {
             	  if($(this).hasClass("select") || $(this).hasClass("over")){
             		  contentDateBorder += $(this).children('td:eq(4)').text() +"<br/><br/>";
             	  }
        		});
             $("#databorder").html(contentDateBorder);
        })
        $(".tr").mouseout(function() { 
        	 $(this).removeClass("over");
        	 var contentDateBorder = "";             
             $("#table").find("tr").each(function () {
             	  if($(this).hasClass("select") || $(this).hasClass("over")){
             		  contentDateBorder += $(this).children('td:eq(4)').text() +"<br/><br/>";
             	  }
        		});
             $("#databorder").html(contentDateBorder);
        })
	}

function addLayerToMap()
{
	var selectedset = new Array();
	$(".tr.select").each(function(){
		selectedset.push(parseInt(($(this).find(".layerid").html())));
	});
	var temp = new Array();
	for(var i=0; i<jsonData.length;i++)
	{
		for(var j=0; j<selectedset.length;j++)
			{
				if(jsonData[i].id == selectedset[j])
					{
						temp=temp.concat(layeranaly(jsonData[i]));
						break;
					}
			}
	}
	for(var i=0; i<temp.length;i++)
		{
			if(nothave(temp[i]))mymapmana.maplayerlist.push(temp[i]);
		}
    $("#layerPanel").window('close');
    redraw();
}
	