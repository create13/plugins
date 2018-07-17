<template>
	<div id="loginPage">
		<x-img :src=bigPic  class="icon-pic"></x-img>
		<div class="checkState" v-show="hideCheck">{{msg}}</div>
		<form id="myForm">
			<div class="input-all clearfix">
				<div class="left-content">
					<i class="img-phone"></i>
					<label for="in-phone" class="font-label">账号</label>
				</div>
				<input type="text" id="in-phone" v-model="account" @focus="acountCheck" required />
			</div>
			<div class="input-all clearfix">
				<div class="left-content">
					<i class="img-locks"></i>
					<label for="in-phone" class="label-lock">密码</label>
				</div>
				<input type="password" id="in-phone" v-model="pass" required />
			</div>
			<div class="passAbout">
				<div class="changePass">修改密码</div>
				<div class="forget">忘记密码</div>
			</div>
			<div class="btn-dl" @click="submitBtn">登录</div>
		</form>
	</div>
</template>
<script>
import bigPic from '@/assets/images/iconw-bigpic.png';
import rem from '@/assets/js/dpr.js';
import {XImg,Icon} from 'vux'
export default {
	data(){
		return {
			bigPic,
			account:'',
			pass:'',
			msg:'',
			hideCheck:false,
			
			
		}
	},
	components:{
		XImg,
		Icon
		
	},
	methods:{
		submitBtn(){
			if(this.account == ""){
				this.hideCheck = true
				this.msg = '账号不能为空'
			}else if(this.pass == ""){
				this.hideCheck = true
				this.msg = '密码不能为空'
				console.log('密码不能为空')
			}else{
				console.log('success');
			}
		},
		acountCheck(){
			this.hideCheck = false
		}
	}
}
</script>
<style scoped>
 #loginPage{background:url(../assets/images/iconw-bg.png) no-repeat;background-size:100% 100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px;}
.icon-pic{width:1.4rem;height:1.2rem;display:block;margin:0.9rem auto 0.52rem auto;}
#myForm{
	width: 86%;
	margin: 0 auto;
}
#myForm .input-all{
	height: 0.42rem;
    line-height: 0.42rem;
    padding-left: 0.61rem;
    padding-right: .3rem;
    border-bottom:2px solid #D1826C;
    position:relative;
    width: calc(100% - .91rem);
}
.input-all #in-phone{
	outline: 0px;
    width: 75%;
    background-color: transparent;
    display: block;
    height: .32rem;
    box-sizing: border-box;
    border:0px;
    color:#fff;
    position:absolute;
    top:.08rem;
}
.input-all .check{width:0.21rem;height:0.21rem;float:right;margin-right:-27px;margin-top:13px;}
.input-all .left-content{width: 0.61rem;height:.32rem ;float:left;margin:0.05rem 0rem 0.05rem -0.52rem;}
.font-label{font-size:12px;color:rgba(255,255,255,0.6);display:block;margin-left:0.11rem;float:left;width:.32rem;line-height:.37rem;}
.img-phone{width:0.09rem;height:0.14rem;background: url(../assets/images/iconw-phone.png) no-repeat;background-size:100% 100%;display:block;
float:left;margin-top:0.12rem;}
.img-locks{width:0.11rem;height:0.13rem;background: url(../assets/images/iconw-key.png) no-repeat;background-size:100% 100%;display:block;
float:left;margin-top:0.12rem;}
.label-lock{font-size:12px;color:rgba(255,255,255,0.6);;display:block;margin-left:0.09rem;float:left;width:.32rem;line-height:.37rem;}
.passAbout{}
.forget{width:.61rem;height:0.17rem;color:#ddd;font-size:12px;float:right;margin-top:.14rem;}
.changePass{width:.61rem;height:0.17rem;color:#ddd;font-size:12px;float:left;margin-top:.14rem;}
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
.btn-dl{margin:.52rem auto;width:2.37rem;height:.42rem;line-height: .42rem;border:1px solid rgba(255,255,255,0.2);border-radius:5px;text-align:center;font-size:16px;color:rgba(255,255,255,0.8);background-color: rgba(255,255,255,0.2);}
.checkState{width: 86%;margin: 0 auto;height:.24rem;line-height:.24rem;font-size:13px;color:#FFF28C;}
</style>