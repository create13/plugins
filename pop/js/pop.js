/*
 * author:李雯雯
 * 邮箱：13685829587@163.com
 * 电话：15765349613
 */
!function($){
	$.pop=function(options){
		var content ='<div class="popOut"><div class="popUp">'+
	   	'<span class="wz-title">Modal Window</span> <img src="img/img-icon.png" alt="" title="" class="imgMotiply" /></div>'+
		'<div class="popContent"><div class="wz-write"></div></div>'+
		'<div class="popEnd"><button class="sureBtn">OK</button> or<button class="cancel">cancle</button></div></div>'
		$(content).appendTo("body");
		var defaults = {
			popWidth:'550px',
			popHeight:'300px',
			ContentHeight:'150px',
			Contentbackground:'#F7F7F7',
			background:'#E7F8FF',
			titleColor:'#ff0000',
			titleFonts:'Modal Window',
			sureBack:'#7BC475',
			sureFonts:'ok',
			cacleFonts:'cancle',
			cancleBack:'lightgrey'
		}
		var opts = $.extend({},defaults,options);
		$(".imgMotiply,.sureBtn,.cancel").off('click').on('click',function(){
			$.pop().closed();
		})
		return{
			//moveSet方法移动弹出框位置
			moveSet:function(){
				$(".popOut").bind('mousedown',function(e){
				//获取需要拖动元素的坐标
				var leftSet = $(this)[0].offsetLeft;
				var topSet = $(this)[0].offsetTop;
				var xSet = e.pageX;
				var ySet = e.pageY;
				$(document).bind('mousemove',function(event){
				//获取移动了的位置
				var moveSetx = event.pageX - xSet;
				var moveSety = event.pageY - ySet;
				var finalSetx = moveSetx + leftSet;
				var finalSety = moveSety + topSet;
				$(".popOut").css({left:finalSetx,top:finalSety})
			})
			
			})
			$(document).bind('mouseup',function(){
				$(this).unbind('mousemove');
			})
			},
			methodS:function(options){
				$(".popOut").css({'width':options.popWidth,'height':options.popHeight,'backgroundColor':options.background});
				$(".wz-title").css('color',options.titleColor).text(options.titleFonts);
				$(".popContent").css({'height':options.ContentHeight,'backgroundColor':options.Contentbackground});
				$(".sureBtn").css('backgroundColor', options.sureBack).text(options.sureFonts);
				$(".cancel").css('backgroundColor', options.cancleBack).text(options.cacleFonts);;
			},
			showed:function(){
				$(".popOut").show();
			},
			closed:function(){
				$(".popOut").hide();
			}
			
			
		}
	}


}(window.jQuery)