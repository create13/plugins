$(function(){
	var widthW = window.screen.width;
    var heightW = window.screen.height;
    if(widthW == 768 && heightW == 1024){
    	$(".page-start").css('top','2.8rem');
    }
	$("#btnSubmit").click(function(){
		if ($.html5Validate.isAllpass($(".formgroup"))) {
    		if($("#nv-loca").find("option:selected").text() != ""){
 				$(".mb-bv").show();
	 		}else{
	 				$("#nv-loca").testRemind('请选择大区');
	 		}
		}
	})
	$(".nv-input1").focus(function(){
		$(this).parent().find(".labeleft").css('color',"#FFFFFF").parent().siblings().find(".labeleft,.labetime").css('color',"#a6a4b3");
	})
	$(".nv-input2").focus(function(){
		$(this).parent().find(".labetime").css('color',"#FFFFFF").parent().siblings().find(".labeleft").css('color',"#a6a4b3");
	})
})