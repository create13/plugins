<template>

  <div class="mian2field">

    <mt-field label="时间" :placeholder="time"	readonly="ture" ></mt-field>
    <mt-field label="地点" :placeholder="address"	readonly="ture"></mt-field>
    <mt-field label="发起人" :placeholder="people" readonly="ture"></mt-field>
    <mt-field label="活动内容" :placeholder="content" readonly="ture"></mt-field>
    <a href="#" class="btn">报名</a>

  </div>
</template>
<script>

export default {
  props: [
    'time',
    'address',
    'people',
    'content'




  ],

	data(){

		return {
      time:"2018.05.27",
      address:"花期银行大厦13楼天眼湖会议室",
      people:"韩书记",
      content:"党课",


		}
	},
	components:{

	}
}
</script>
<style scoped>
   .main2field{margin-left: 0.2rem;margin-top: -0.4rem}

   .mian2field>>> .mint-cell{min-height: 0.3rem}
  .mian2field>>> .mint-cell-title{color: #999999}
  .mian2field .btn{display: block;margin-left: 30%;margin-top:0.2rem;background-color: #9B0A1A;color:#FFFFFF;font-size: 0.2rem ;text-align: center;width: 1.5rem}


</style>
