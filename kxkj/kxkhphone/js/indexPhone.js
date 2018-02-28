//点击切换
$(function(){
	$(".header-center1").click(function(){
		if($(this).hasClass("calW")){
			$(this).removeClass("calW");
			$(this).siblings().addClass("calW");
		}else{
			$(this).addClass("calW").siblings().removeClass("calW");
		}
		
	})
	
})