<template>
	<div>
		<x-header class="bgColors" :title='rfs.title' slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"><a slot="right" @on-click-more="" v-text="rfs.rights"></a></x-header>
	</div>
</template>
<script>
import {XHeader} from 'vux'
	export default {
		data(){
			return {

			}
		},
		components:{
			XHeader
		},
		props:['rfs'],
		mounted(){
			/*console.log(this.rfs);*/
		}
		
	}
</script>
<style>
.bgColors{background: linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1)); 
		background: -webkit-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));  
        background: -o-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));  
        background: -moz-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));  
        background: -mos-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));}
.vux-header .vux-header-left a, .vux-header .vux-header-left button, .vux-header .vux-header-right a, .vux-header .vux-header-right button{color:#FFFFFF!important;font-size:.12rem!important;}
.vux-header .vux-header-left, .vux-header .vux-header-right{color:#FFFFFF!important;}
.vux-header .vux-header-left .left-arrow:before{border:1px solid #FFFFFF!important;border-width:1px 0 0 1px!important;}
.vux-header .vux-header-title{font-size:.17rem!important;}
</style>