<template>
	<div style="height:100%">
        <x-header title="党员缴费" :left-options="{preventGoBack:true}" @on-click-back="backhome()"></x-header>
		<view-box ref="viewBox">
		<div class="card-top">
		<div class="card-img"></div>
		<div class="nr-info">
			<span class="left-info">银行卡用户名：</span>
			<span class="right-info">{{info.name}}</span>
		</div>
		<div class="nr-info">
			<span class="left-info">绑定银行卡号：</span>
			<span class="right-info">{{info.cardId}}</span>
		</div>
		</div>
		<div class="pay">
			<span class="payinfo">11月份应缴党费</span>
			<span class="payPrize">50</span>
			<span class="prize">元</span>
			<span class="payBtn">立即缴纳</span>
		</div>
			<div class="hist">历史党费</div>
			<flexbox>
      				<flexbox-item v-for="(info,index) in collect" :key="index">
      					<div class="flex-demo">
      						<div class="money">
      							<span class="months">{{info.month}}月党费：</span>
      							<span class="dollar">{{info.dues}}元</span>
      						</div>
      						<div class="status" :class="[info.status==1?'greenStatus':'redStatus']"  v-text="info.status==1?'已缴纳':'未缴纳'"></div>
      					</div>
      				</flexbox-item>
    		</flexbox>
    		<div class="btnPay">一键补缴</div>
		</view-box>
	</div>
</template>
<script>
import {XHeader,ViewBox,Group,Cell,Flexbox,FlexboxItem,cookie} from 'vux'

import axios from 'axios'
	export default {
		data(){
			return {
				userId:cookie.get('userId'),
				contents:{title:'党建'},
				info:{name:'王大陆',cardId:'6282451745218551527'},
				collect:[],
				pay:''
			}
		},
		components:{
			XHeader,
			ViewBox,
			Group,
			Cell,
			Flexbox,
			FlexboxItem
		},
		mounted(){
			axios.get('ppartymemberdues/queryByUserId',{
	        	params:{
	        		userid:this.userId
	        	}
	        }).then(res =>{
				this.collect = res.data;
				this.collect.sort((x,y) => {
					return (x.month > y.month ? 1 : -1)
//					return x.month - y.month
				})
				}).catch(err =>{
					console.log('fail'+err);
				})
		},
		methods:{
            backhome(){
                this.$router.push({
                    path:'/'
                })
            }
		}

	}
</script>
<style scoped>
html,body {
  height:100%;
  width:100%;
  line-height:1;
  overflow-x:hidden;
}
	.card-top{width:100%;height:3.15rem;}
	.card-img{width:82%;height:2.1rem;margin:.27rem auto .1rem auto;background: url(../../assets/images/icon-card.jpg) no-repeat;background-size:cover;}
	.nr-info{width:100%;height:.25rem;font-size:.14rem;font-family:PingFangSC-Regular;line-height:.2rem;margin-top:0.07rem;overflow:hidden;}
.left-info{width:1.05rem;color:rgba(153,153,153,1);margin-left:.2rem;}
.right-info{height:.25rem;font-size:.14rem;font-family:PingFangSC-Semibold;color:rgba(102,102,102,1);}
.pay{width:100%;height:.82rem;border-top:0.1rem solid #F3F3F3;border-bottom:0.1rem solid #F3F3F3;background: url(../../assets/images/bag-icon.png) no-repeat;background-size: 100% 100%;}
.hist{width:93.3%;height:.25rem;font-size:.2rem;font-family:PingFangSC-Semibold;color:rgba(49,49,49,1);line-height:.28rem;margin:.1rem 0rem .2rem .2rem;font-weight:600;}
.vux-flexbox{width:89.4%;height:auto;margin:.13rem auto .32rem auto;flex-wrap: wrap}
.flex-demo{width:98%;height:.72rem;background:rgba(246,246,246,1);border-radius: 2px;}
.vux-flexbox-item:nth-child(odd){margin-left:0px!important;}
.vux-flexbox-item:nth-child(even){margin-right:-1%;}
.money{width:84%;margin-left:15.4%;padding-top:.13rem;height:.25rem;}
.money span{display:block;}
.money .months{width:.65rem;height:.2rem;font-size:.14rem;font-family:PingFangSC-Regular;color:rgba(72,72,72,1);
line-height:.2rem;float:left;padding-top:0.03rem;}
.dollar{height:.25rem; font-size:.18rem;font-family:PingFangSC-Medium;color:rgba(83,83,83,1);line-height:.25rem;float:left;font-weight:600;}
.status{width:100%;height:.17rem;line-height:.17rem;text-align:center;font-size:.12rem;font-family:PingFangSC-Medium;margin-top:0.04rem;}
.greenStatus{color:rgba(24,193,25,1);}
.redStatus{color:rgba(218,16,55,1);}
.btnPay{width:89.4%;height:.4rem;line-height:.4rem;text-align:center;font-size:.16rem;font-family:PingFangSC-Medium;color:rgba(255,255,255,1);position:relative;bottom:.2rem;background:rgba(185,54,71,1);border-radius: 4px;margin-left:5.3%;}
.vux-flexbox .vux-flexbox-item{min-width: 47%;width: 48%;margin-bottom:.1rem;-webkit-flex:0;position:relative;}
.payinfo{width:1.16rem;height:.25rem; font-size:.14rem;font-family:PingFangSC-Medium;color:rgba(79,79,79,1);line-height:.2rem;margin:.37rem 0 .2rem .2rem;}
.payBtn{width:.76rem;height:.2rem;border-radius:.1rem;font-size:.12rem;font-family:PingFangSC-Medium;color:rgba(157,14,30,1);line-height:.2rem; margin:.34rem .24rem .24rem .19rem;border:1px solid #C24747;text-align:center;}
.pay span{display:block;float:left;}
.payPrize{height:.44rem; font-size:.26rem;font-family:PingFangSC-Medium;color:rgba(250,122,0,1);line-height:.49rem;margin-top:.19rem;}
.prize{width:.18rem;height:.2rem; font-size:.14rem;font-family:PingFangSC-Medium;color:rgba(79,79,79,1);line-height:.2rem;margin:.37rem 0 .25rem .1rem;}
</style>
