<template>
	<div style="height:100%;">
		<view-box ref="viewBox" body-padding-top=".46rem">
			<r-header :rfs="contents"></r-header>
			<p class="titles">上海中心支部组织除草活动</p>
			<p class="time">时间：<span class="dark">{{dateTime}}</span></p>
			<p class="time">地点：<span class="dark">{{location}}</span></p>
			<div class="artical">
				<p>以“亮党员身份，树党员形象，尽党员义务，建和谐爱民”为主题，组织发动党员在社区内广泛开展党员志愿者服务活动。社区党员本着“奉献、服务、互助、和谐”的精神，自愿利用业余时间，根据自身特长和专业特点，无偿为居民提供帮助和服务。在活动中，党员志愿者以“有困难找党员志愿者，有时间做党员志愿者”为口号，认领了环境保护、治安防范、关爱服务、心理疏导、法律援助。</p>
				<p>以“亮党员身份，树党员形象，尽党员义务，建和谐爱民”为主题，组织发动党员在社区内广泛开展党员志愿者服务活动。社区党员本着“奉献、服务、互助、和谐”的精神，自愿利用业余时间，根据自身特长和专业特点，无偿为居民提供帮助和服务。在活动中，党员志愿者以“有困难找党员志愿者，有时间做党员志愿者”为口号，认领了环境保护、治安防范、关爱服务、心理疏导、法律援助。</p>
			</div>
			<p class="allPic">
			<span class="picture">活动图集</span>
			<span class="numberz">{{num}}张</span>
			</p>
			<div class="img-show">
				<img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" width="100"  @click="show(index)">
				<div v-transfer-dom>
	      		<previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange">
	      		</previewer>
	    	</div>
			</div>
			<p class="allPic">
			<span class="picture">参与人员</span>
			<span class="numberz"><span class="color-num">20</span>/23</span>
			</p>
			<div class="wz-fonts">
				王俊凯 李薇薇 维吾尔 王俊凯 李薇薇 维吾尔 王俊凯 李薇薇 维吾尔 王俊凯 李薇薇 维吾尔 王俊凯 李薇薇 维吾尔 王俊凯 李薇薇 维吾尔 王俊凯 李薇薇 李薇薇 王俊凯 李薇薇 维吾尔 王俊凯 李薇薇 维吾尔 王俊凯 王俊凯 李薇薇 维吾尔 王俊凯 李薇薇 维吾尔
			</div>
			<div class="btnMore">查看全部参与人员名单<span class="down"></span></div>
			<p class="allPic">
			<span class="no-picture">未参与人员</span>
			<span class="numberz"><span class="color-num">3</span>/23</span>
			</p>
			<div class="wz-fonts">
				王俊凯 李薇薇 维吾尔 
			</div>
	 	</view-box>
	</div>
</template>

<script>
import Xheader from '@/components/comother/rheader'
import {Previewer, TransferDom,ViewBox} from 'vux'
	export default {
		directives: {
    		TransferDom
  		},
		components:{
			'r-header':Xheader,
			Previewer,
			ViewBox
		},
		methods:{
			show (index) {
      			this.$refs.previewer.show(index)
    		},
    	  	logIndexChange (arg) {
      			console.log(arg)
    		}
		},
		data(){
			return {
				contents:{rights:'',title:'组织生活详情'},
				dateTime:'2019年2月18日',
				location:'陆家嘴',
				num:10,
				list: [{
        			msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        			src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg'
      			},
      			{
        			msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
        			src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg'
      			},
      			{
        			msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
        			src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
      			}],
      			options: {
        			getThumbBoundsFn (index) {
          			// find thumbnail element
		            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
		            // get window scroll Y
		            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
		            // optionally get horizontal scroll
		            // get position of element relative to viewport
		            let rect = thumbnail.getBoundingClientRect()
		            // w = width
		            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
		            // Good guide on how to get element coordinates:
		            // http://javascript.info/tutorial/coordinates
        			}
      			}
				
			}
		}
	}
</script>
<style scoped>
html,body{
	width:100%;
	height:100%;
	overflow-x:hidden;
}
.titles{width:80%;height:.25rem; font-size:.2rem;font-family:PingFangSC-Medium;color:rgba(51,51,51,1);line-height:.28rem;margin:.2rem 12% .1rem 8%;}
.time{width:80%;height:.17rem; font-size:.12rem;font-family:PingFangSC-Medium;color:rgba(153,153,153,1);line-height:.17rem;margin-left:8%;margin-top:.1rem;}
.time .dark{color:#6b6b6b;}
.artical{width:84%;height:auto; font-size:.14rem;font-family:PingFangSC-Regular;color:rgba(102,102,102,1);line-height:.24rem;margin:.18rem 8% .2rem 8%;text-indent:2em;}
.artical p{margin-bottom:.1rem;}
.picture{width:0.9rem;font-size:.2rem;font-family:PingFangSC-Semibold;color:rgba(51,51,51,1);margin-left:8%;display:block;float: left;}
.numberz{ font-size:.14rem;font-family:PingFangSC-Medium;color:rgba(153,153,153,1);display:block;float: left;margin-top:.02rem;}
.allPic{height:.3rem;line-height:.3rem;overflow:hidden;}
.img-show{width:84%;height:auto;margin-left:8%;}
.img-show img{width:32%;height:0.9rem;margin-top:.1rem;}
.img-show img:not(:first-child){margin-left:2%;}
.img-left{width:.37rem;height:.37rem;position:absolute;left:.1rem;top:3.15rem;;z-index:900;}
.img-right{width:.37rem;height:.37rem;position:absolute;right:.1rem;top:3.15rem;z-index:900;}
.color-num{color:rgba(185, 54, 71, 1);}
.line-pic{width:87.2%;margin:.1rem 4.8% .2rem 8%;height:.36rem;overflow:hidden;}
.line-pic img{width:.36rem;height:.36rem;margin-left:.07rem;display:block;float:left;}
.wz-fonts{font-size:.14rem;font-family:PingFangSC-Medium;color:rgba(153,153,153,1);line-height:.24rem;width:87.2%;margin:.1rem 4.8% .2rem 8%;word-spacing:.24rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;}
.no-picture{width:1.1rem;font-size:.2rem;font-family:PingFangSC-Semibold;color:rgba(51,51,51,1);margin-left:8%;display:block;float: left;}
.btnMore{width:1.6rem;height:.3rem;border-radius:15px;margin:.2rem auto;font-size:.1rem;
font-family:PingFangSC-Medium;
color:rgba(204,204,204,1);border:1px solid #E4E4E4;line-height:.3rem;text-align:center;
}
.down{width:0.1rem;height:0.1rem;display:inline-block;background: url(../../assets/images/icon-down.png) no-repeat;background-size:100% 100%;margin-left:.05rem;}
</style>