<template>
	<div style="height:100%;width:100%;overflow-x:hidden;">
   		<view-box ref="viewBox" body-padding-top=".46rem">
			<r-header :rfs="contents"></r-header>
			<gain :list='list'></gain>
			<div v-show="temporarily" class="temp">暂无数据。。。</div>
   		</view-box>
 	</div>
</template>
<script>
import Xheader from '@/components/comother/rheader'
import Gain from '@/components/comother/gain'
import {ViewBox} from 'vux'
import axios from 'axios'
	export default {
		data(){
			return {
				contents:{rights:'',title:'积分获取明细'},
				list:[],
				temporarily:false
			}
		},
		components:{
			'r-header':Xheader,
			'gain':Gain,
			ViewBox
		},
		methods:{
			details(){
				axios.get('pscoreparty/queryByUserId',{
					params:{
						userid:this.$route.params.userid,
						year:this.$route.params.year
					}
				}).then(res =>{
					console.log(res);
					if(res.data.length == 0){
						this.temporarily = true;
					}
					this.list = res.data;
				}).catch(err =>{
					console.log('fail'+err);
				})
			}
		},
		mounted(){
			this.details();
		}
	}
</script>

<style scoped>
html,body{
	width:100%;
	height:100%;
	overflow-x:hidden;
}
.temp{width:100%;height:.5rem;line-height:.5rem;text-align:center;}
</style>
