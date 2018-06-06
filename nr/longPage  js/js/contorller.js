//写法1
//$(function(){
//	$(".center-ul li").live('click',function(){
//		var locationed=$(this).index();
//		alert(locationed);
//	})
//})
//写法2
	angular.element(document).ready(function () {	
    $(".center-ul li").live('click',function(){
		var locationed=$(this).index();
		$(".center-line").eq(locationed-1).show().siblings().hide();
		
	})
    $(".squared").live('click',function(){
    	var locationed=$(this).index();
    	$(".squared").eq(locationed).removeClass("normalC").addClass("hover").siblings().removeClass("hover").addClass("normalC");
    })
});