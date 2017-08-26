        $(function(){
            //鼠标移入
            $(".bubble_map").mouseover(function(){
                //简介淡入
                $(this).children(".introduce").stop().fadeIn(500);
                $(this).addClass("shadow");
            });
            //鼠标移出
            $(".bubble_map").mouseout(function(){
                //简介淡出
                $(this).children(".introduce").stop().fadeOut(500);
                $(this).removeClass("shadow");
            });
            //鼠标点击选中
            $(".bubble_map").click(function(){
                $(this).addClass("border");
                $(".bubble_map").not(this).removeClass("border");
            });
        })
        function showDynastyChoose(){
            document.getElementById("dynastyChoose").style.display='block';
            $("#dataDiv").css("height","320px");
        }
        function showDynastyChoose0(){
            document.getElementById("dynastyChoose0").style.display='block';
            $("#dataDiv").css("height","320px");
        }
        
        function hideDynastyChoose(){
            document.getElementById("dynastyChoose").style.display='none';

            $("#dataDiv").css("height","280px");
        }
        function closeData() {
            $("#dataDiv").css("display","none");
        }
        function closeData0() {
            $("#dataDiv0").css("display","none");
        }
        function showData0() {
            $("#dataDiv0").css("display","block");
        }
        function showData() {
            $("#dataDiv").css("display","block");
        }
        
        function submitData1(){
        	closeData();
            var formData = new FormData();
            formData.append('file',$("#file1")[0].files[0]);
            formData.append('layername',$("#layername1").val());
            formData.append('userid',$("#userid").val());
            formData.append('type',$("input[name='type1']:checked").val());
            formData.append('appendDataSrc',$(".appendDataSrc1:selected").attr('name'));
            formData.append('accessibility',$("input[name='accessibility1']:checked").val());
            $.ajax({
                url:"./addLayers.action",
                async:true,
                type:"POST",
                contentType: false,
                processData: false, 
                dataType:"text",
                data:formData,
                success:function(result){
                	var uploadInfo = $(".uploadInfo1");
                    if(result == "success"){	
                    	if(uploadInfo.hasClass("fail")){
                    		uploadInfo.removeClass("fail");                    		
                    	}
                    	uploadInfo.addClass("ok");                   	
                		uploadInfo.parent("div").css("height","140px"); 
                		uploadInfo.html("上传成功");
                    }
                    else{
                    	if(uploadInfo.hasClass("ok")){
                    		uploadInfo.removeClass("ok");                    		
                    	}
                    	uploadInfo.addClass("fail");                   	
                		uploadInfo.parent("div").css("height","140px");   
                		uploadInfo.text(result);
                    }
                }
            })
        }

        function submitData(){
        	closeData();
            var formData = new FormData();
            formData.append('file',$("#file")[0].files[0]);
            formData.append('layername',$("#layername").val());
            formData.append('appendDataSrc',$(".appendDataSrc:selected").attr('name'));
            $.ajax({
                url:"./addLayers.action",
                async:true,
                type:"POST",
                contentType: false,
                processData: false, 
                dataType:"text",
                data:formData,
                success:function(result){
                	var uploadInfo = $(".uploadInfo");
                    if(result == "success"){	
                    	if(uploadInfo.hasClass("fail")){
                    		uploadInfo.removeClass("fail");                    		
                    	}
                    	uploadInfo.addClass("ok");                   	
                		uploadInfo.parent("div").css("height","140px"); 
                		uploadInfo.html("上传成功");
                    }
                    else{
                    	if(uploadInfo.hasClass("ok")){
                    		uploadInfo.removeClass("ok");                    		
                    	}
                    	uploadInfo.addClass("fail");                   	
                		uploadInfo.parent("div").css("height","140px");   
                		uploadInfo.text(result);
                    }
                }
            })
        }