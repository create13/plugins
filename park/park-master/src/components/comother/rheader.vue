<template>
	<div>
		<x-header class="bgColors" :title='rfs.title' slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
			<a slot="right" v-text="rfs.rights" @click="eventsName"></a>
		</x-header>
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
		methods:{
			eventsName(){
				this.$emit('subs');
			}
		},
		props:['rfs'],
		mounted(){
			console.log(123213);
		}
		
	}
</script>
<style>
.bgColors{background: linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1)); 
		background: -webkit-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));  
        background: -o-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));  
        background: -moz-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));  
        background: -mos-linear-gradient(to right,rgba(185,54,71,1),rgba(155,10,26,1));}
.vux-header .vux-header-left a, .vux-header .vux-header-left button, .vux-header .vux-header-right a, .vux-header .vux-header-right button{color:#fff!important;font-size:.12rem!important;}
.vux-header .vux-header-left, .vux-header .vux-header-right{color:#fff!important;}
.vux-header .vux-header-left .left-arrow:before{border:1px solid #fff!important;border-width:1px 0 0 1px!important;width:10px!important;height:10px!important;top:10px!important;}
.vux-header .vux-header-title{font-size:.17rem!important;}
.vux-header .vux-header-left, .vux-header .vux-header-right{font-size:.12rem;}
.vux-header .vux-header-left .left-arrow {
    position: absolute;
    width: 12px!important;
    height: 12px!important;
}
</style>
