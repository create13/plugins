<template>
	<div id="loginPage">
		<x-img :src=bigPic  class="icon-pic"></x-img>
		<form id="myForm">
			<div class="input-all clearfix">
				<div style="width: 1.28rem;height:.56rem ;float:left;margin:0.16rem 0 0 -1.1rem;border:1px solid red;">
					<i class=""></i>
					<label for="in-phone" class="font-label">账号</label>
				</div>
				<input type="text" id="in-phone" required />
			</div>
			<!--<div class="forget">忘记密码</div>-->
		</form>
	</div>
</template>
<script>
import bigPic from '@/assets/images/iconw-bigpic.png';
import rem from '@/assets/js/dpr.js';
import {Group,XButton,XImg,XInput} from 'vux'
export default {
	data(){
		return {
			bigPic
			
		}
	},
	components:{
		Group,
		XButton,
		XImg,
		XInput
	}
}
</script>
<style scoped>
 #loginPage{background:url(../assets/images/iconw-bg.png) no-repeat;background-size:100% 100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px;}
.icon-pic{width:3.6rem;height:3.3rem;display:block;margin:1.55rem auto 1.14rem auto;}
#myForm{
	width: 86%;
	margin: 0 auto;
}
.input-all{
	height: 0.88rem;
    line-height: 0.88rem;
    padding-left: 1.28rem;
    padding-right: .3rem;
    border-bottom:2px solid #D1826C;
}
.input-all #in-phone{
	outline: 0px;
    width: 100%;
    background-color: transparent;
    display: block;
    height: .88rem;
    box-sizing: border-box;
    border-width: 0;
}
.font-label{font-size:24px;}
/*.img-phone{width:0.17rem;height:0.28rem;background-image: url(../assets/images/iconw-phone.png);}*/
.forget{width:1.22rem;height:0.34rem;color:#ddd;font-size:13px;float:right;margin-right:0.7rem;border:1px solid red;}
 .clearfix:after{
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
}
.clearfix{
    zoom:1;
}
</style>