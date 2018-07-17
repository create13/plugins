<template>
	
	<div style="height:100%;">
   		<view-box ref="viewBox" body-padding-top=".5rem" body-padding-bottom=".5rem">
     		<x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">This is the page title</x-header>
     		<!--<router-view></router-view>-->
     		<div class="aaa">
     			asasas
     		</div>
     		<tabbar slot="bottom">
     			 <tabbar-item>
		        <img slot="icon" src="../../assets/images/gray-home.png">
		        <span slot="label">Wechat</span>
		      </tabbar-item>
		      <tabbar-item>
		        <img slot="icon" src="../../assets/images/gray-active.png">
		        <span slot="label">Message</span>
		      </tabbar-item>
		      <tabbar-item selected>
		        <img slot="icon" src="../../assets/images/gray-info.png">
		        <span slot="label">Explore</span>
		      </tabbar-item>
		      <tabbar-item>
		        <img slot="icon" src="../../assets/images/gray-item.png">
		        <span slot="label">News</span>
     		 </tabbar-item>
     		</tabbar>
   		</view-box>
 	</div>
</template>
<script>

import { ViewBox,XHeader,Tabbar, TabbarItem } from 'vux'
	export default {
		data(){
			return {
				
			}
		},
		components:{
			ViewBox,
			XHeader,
			Tabbar, 
			TabbarItem
			
		}
	}
</script>

<style>
  .aaa{width:100%;height:9rem;line-height:7rem;text-align: center;overflow:hidden}
    *{
    padding: 0;
    margin: 0;
    text-decoration: none;
    letter-spacing: 1px;
  }
  template{
    padding: 0;
    margin: 0;
  }
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  .xinjianIcon{
    width: 40px!important;
    height: 40px!important;
  }
/*  .vux-header .vux-header-title{
    color:#D05354!important;
  }*/
  .font14{
    font-size: 14px;
  }
  .weui-cells,.vux-no-group-title{
    margin-top: 0!important;
  }
  
  
  
</style>