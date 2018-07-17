<template>
  <div>
    <dlbheader :header-title="headerTitle"></dlbheader>
    <dlbmain></dlbmain>
  </div>


</template>
<script>
import header from '../components/layout/header.vue'
import main1 from '../components/layout/pointmain.vue'
export default {
	data(){
		return {
      headerTitle:"政治学习积分增加"




      }

		}
	,
	components:{
   'dlbheader':header,
    'dlbmain':main1


	}}

</script>
<style scoped>
  .main{margin-left: 0.2rem}

  .title,.title1{font-size: 0.15rem;margin-top: 0.1rem; }
  .main input{width:95%;height: 0.25rem;margin-top: 0.2rem}
  .main .title1 input{width:95%;height: 1.5rem}
  .main .title1 a span{display:block;margin-top: -0.15rem;font-size:0.4rem ;color: #9B0A1A}
  .btn{margin-top: 0.3rem;border:0.01rem solid #B53141 ;display:block;width:0.4rem;height:0.4rem;text-align: center}
   button{margin-left:0.1rem;height: 0.5rem;background-color: #B93647 ;width:93% ;color: #FFFFFF ;border-radius:0.1rem;font-size: 0.18rem}

</style>
