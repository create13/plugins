<template>
	
	<div style="height:100%;">
   		<view-box ref="viewBox" body-padding-top=".46rem">
			<r-header :rfs="contents"></r-header>
			<div class="detail">
				<div class="allLine" v-for="">
					<span class="colorL"></span>
				<span class="colorW"></span>
				</div>
     		</div>
   		</view-box>
 	</div>
</template>
<script>
import Xheader from './rheader'
	export default {
		data(){
			return {
				contents:{rights:'',title:'积分获取明细'},
				list:[
				{left1:'时间：',left2:'2017.11.22'},
				{left1:'积分类型：',left2:'党员缴纳'},
				{left1:'积分变动：',left2:'+5分'},
				{left1:'审核人：',left2:'支部书记'},
				]
				
			}
		},
		components:{
			'r-header':Xheader,
		}
	}
</script>

<style scoped>
html,body{
	width:100%;
	height:100%;
	overflow-x:hidden;
}
.detail{
	width:76%;
	height:1.42rem;
	margin:.2rem 18.7% 0 5.3%;
	border:1px solid red;
	border-bottom:1px solid #EFEFEF;
}
.allLine{width:100%;height:.2rem;border:1px solid red;overflow:hidden;}
.allLine span{display:block;float:left;}
.colorL{width:.74rem;height:.2rem; font-size:.14rem;font-family:PingFangSC-Regular;color:rgba(153,153,153,1);line-height:.2rem;}
.colorW{width:2rem;height:.2rem; font-size:.14rem;font-family:PingFangSC-Medium;color:rgba(102,102,102,1);line-height:.2rem;}
.colored{color:rgba(185,54,71,1);}
.colorGreen{}
</style>