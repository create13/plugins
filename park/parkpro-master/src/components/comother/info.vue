<template>
	<div class="bg-color">
		<view-box ref="viewBox" :body-padding-bottom="53">
		<div class="header">
			<div class="header-top">
				<div class="top-head">
					<div class="top-left">{{dateTime}}，{{username}}</div>
					<div class="top-right"></div>
				</div>
				<div class="top-second">
					<div class="second-left">
						<span class="color-light">片区:</span>
						<span class="color-dark">{{locations.areas}}</span>
					</div>
				<div class="second-right">
						<span class="color-light">党支部书记:</span>
						<span class="color-dark">{{locations.secretary}}</span>
				</div>
				</div>
				<div class="top-second">
					<div class="second-left">
						<span class="color-light">党支部:</span>
						<span class="color-dark">{{locations.branch}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="annual">年度参与</div>
			<flexbox>
      				<flexbox-item  v-for="(user,index) in users" :key='index'>
      					<div class="flex-demo">
      						<div class="fonts-au">{{user.fonts}}</div>
							<div class="integral">{{user.integral}}</div>
      					</div>
      				</flexbox-item>
    		</flexbox>
    		<div id="echartShow">
    			
    		</div>
		</div>
		<tabbar slot="bottom">
        	<tabbar-item>
        		<img slot="icon" src="../../assets/images/gray-home.png">
        		<img slot="icon-active" src="../../assets/images/iconw-home.png">
        		<span slot="label">首页</span>
      		</tabbar-item>
      		<tabbar-item active-class="reds">
        		<img slot="icon" src="../../assets/images/gray-item.png">
        		<img slot="icon-active" src="../../assets/images/iconw-integral.png">
        		<span slot="label">积分详情</span>
      		</tabbar-item>
      		<tabbar-item>
        		<img slot="icon" src="../../assets/images/gray-active.png">
        		<img slot="icon-active" src="../../assets/images/iconw-activity.png">
        		<span slot="label">活动详情</span>
      		</tabbar-item>
    	</tabbar>
    	</view-box>
	</div>
</template>

<script>
import {Flexbox,FlexboxItem,Tabbar,TabbarItem,ViewBox} from 'vux'
import echarts from 'echarts'
export default {
	data(){
		return {
			users:[{id:1,fonts:'年度积分',integral:38},{id:2,fonts:'活动次数',integral:4}],
			username:'王大陆',
			dateTime:'',
			locations:{areas:'上海中心片区',secretary:'韩xx',branch:'花旗银行第二党支部'},
			charts:''
		}
	},
	components:{
		Flexbox,
		FlexboxItem,
		Tabbar,
		TabbarItem,
		ViewBox
	},
	mounted(){
		let datime = new Date().getHours();
		if(datime>=5 & datime<8){
			this.dateTime = '早上好'
		}
		else if(datime>=8 & datime<11){
			this.dateTime = '上午好'
			
		}
		else if(datime>=11 & datime<13){
			this.dateTime = '中午好'
		}
		else if(datime>=13 & datime<19){
			this.dateTime = '下午好'
		}
		else{
			this.dateTime = '晚上好'
		}
		
		this.$nextTick(function() {
                this.drawAxis('echartShow')
        })
		
	},
	methods:{
		drawAxis(id){	
		let myCharts = echarts.init(document.getElementById(id));
		let option = {
    		tooltip: {
        	trigger: 'axis'
    		},
    		radar: [
        		{
        		name:{
        	    	color:'rgba(45, 45, 45, 1)',
        	    	fontFamily:'PingFang-SC-Regular',
        	    	fontSize:12,
        	    	lineHeight:17
        		},
        		axisLine:{
        			lineStyle:{
        				color:['rgba(255, 206, 140, 1)'],
        				opacity:0.5
        			}
        		},
        		splitLine: {
    				lineStyle: {
        			color: ['#ffe8c6']
   				 	}
				},
				splitArea: {
    				areaStyle: {
        			color: ['#fff4e4','#ffe8c6','#fff6e9']
   				 	}
				},
            	indicator: [
	                {text: '政治学习', max: 100},
	                {text: '组织生活', max: 100},
	                {text: '思想汇报', max: 100},
	                {text: '先锋作用', max: 100},
	                {text: '遵纪守法', max: 100},
	                {text: '公益服务', max: 100},
	                {text: '缴纳党费', max: 100}
            	],
            	center: ['50%','50%'],
            	radius: 60
        		}
    		],
    		series: [
        	{
            	type: 'radar',
            	tooltip: {
                trigger: 'item'
            },
            itemStyle: {normal: {lineStyle: {color :"#F5A39C",width : 2},areaStyle: { color:"#F59D8E",type: 'default'}}},
            data: [
                {
                    value: [80,70,60,65,77,66,90],
                    name: '某软件'
                }
            ]
        	}
    		]
		};
		
		myCharts.setOption(option);
		window.onresize = function () {
    	myCharts.resize();
		};
		
		}
	}
}
</script>

<style scoped>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
.bg-color{background-color:#FFFFFF;height:100%;}
.header{
		width:100%;
		height:1.6rem;
		background: linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1)); 
		background: -webkit-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));  
        background: -o-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));  
        background: -moz-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));  
        background: -mos-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));  
}
.header-top{width:90%;height:1.96rem;border-radius: 5px;background:rgba(255,255,255,1);box-shadow: 0 3px 8px 0 rgba(174,174,174,0.5);position: absolute;top:.24rem;left:5%;}
.top-head{width:78%;height:1.14rem;margin:0 auto;border-bottom:1px solid #EDEDED;}
.top-left{height:.32rem;font-size:.18rem;font-family:PingFangSC-Semibold;color:rgba(62,62,62,1);line-height:.25rem;margin:.49rem 0 .24rem .24rem;font-weight:600;float:left;}
.top-right{width:.66rem;height:.66rem;font-weight:600;float:right;margin:.24rem .3rem .15rem 0;background:url(../../assets/images/icon-head.png) no-repeat;background-size:100% 100%;}
.top-second{width:82%;height:0.17rem;margin:.17rem auto 0 auto;font-size:.12rem;line-height:.17rem;}
.second-left{width:1.53rem;height:0.17rem;float:left;overflow:hidden;}
.second-right{float:right;margin-right:0px;}
.color-light{font-family:PingFang-SC-Medium;color:rgba(153,153,153,1);}
.color-dark{font-family:PingFang-SC-Medium;color:rgba(102,102,102,1);}
.content{width:100%;background-color:#fff;}
.annual{width:93.3%;height:.32rem;font-size:.2rem;font-family:PingFangSC-Semibold;color:rgba(49,49,49,1);line-height:.28rem;margin:.76rem 0rem .13rem 6.6%;font-weight:600;}
.fonts-au{width:100%;height:.2rem;font-size:14px;font-family:PingFang-SC-Medium;
color:rgba(49,49,49,1);line-height:20px;margin: 0 auto;padding-top:.13rem;text-align:center;}
.integral{width:.55rem;height:.37rem; font-size:.26rem;font-family:PingFang-SC-Medium;color:rgba(250,122,0,1);line-height:.37rem;text-align:center;margin:0.04rem auto .1rem auto;}
.vux-flexbox{width:89.4%;height:.8rem;margin:.13rem auto .32rem auto;}
.flex-demo{width:98%;height:.8rem;background:rgba(246,246,246,1);border-radius: 2px;}
.vux-flexbox-item:nth-child(2){margin-right:-1%;}
#echartShow{width:76%;height:2.1rem;margin:0 auto;}
.weui-tabbar{background-color:#FFFFFF;width:100%;position:fixed;}
.weui-tabbar__item{padding:2px 0 0;}
@media only screen and (min-width: 200px) and (max-width:361px) {
	.top-left{margin:.49rem 0 .24rem .15rem;}
	.top-right{margin:.24rem .2rem .15rem 0;}
}
</style>