<template>
  <div>
    <dlbheader></dlbheader>

      <div class="main">
        <mt-cell :title="title" class="title"></mt-cell>
        <p style="font-size: 0.1rem ;float: left;margin-left:0.1rem">党支部评级：{{star}}</p>
        <p style="font-size: 0.1rem ;margin-left:0.5rem;">&nbsp;&nbsp;&nbsp;&nbsp;现有党员：<b :style="fontcolour">{{number}}</b>人</p>

        <p style="font-size: 0.2rem ;margin-top: 0.5rem ;margin-left: 0.1rem" ><b>党员积分待办事宜</b></p>
        <mt-cell :title="title1" class="titleList"><button class="btn">点击确认</button></mt-cell>
        <mt-cell :title="title2" class="titleList"><button class="btn">点击确认</button></mt-cell>
        <mt-cell :title="title3" class="titleList"><button class="btn">点击确认</button></mt-cell>




    </div>
    <dlbfooter></dlbfooter>
  </div>


</template>
<script>
import header from '../components/layout/header.vue'
import footer from '../components/layout/footer.vue'
export default {
	data(){
		return {

      title:'下午好，花期银行第二党支部书记：',
      star:'三级党支部',
      number:'25',
      fontcolour:{color:'#FF0000'},

      title1:'1.党员先锋作用积分加分确认',
      title2:'2.党员思想汇报加分',
      title3:'3.2018年第三次组织生活会图片上传',



      }

		}
	,
	components:{
   'dlbheader':header,
    'dlbfooter':footer

	}}

</script>
<style scoped>
.footer{ }
  .main{margin-left: 0.1rem}
  .btn{border-radius: 0.1rem;background-color:#B93647;border:none;height:0.3rem;width: 1rem}
  .title{margin-bottom: 0.2rem}
  .titleList{}

</style>
