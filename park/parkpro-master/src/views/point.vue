<template>
  <div>
    <dlbheader></dlbheader>
      <div class="main">
        <div class="mian1">
            <p class="msg1" >{{main1msg1}}</p>
            <p class="msg2" >{{main1msg2}}</p>
        </div>
        <div class="mian2">
          <p class="msg1" >{{main2msg1}}</p>
          <p class="msg2" >{{main2msg2}}</p>

        </div>
        <div class="mian3">
          <p class="msg1" >{{main3msg1}}</p>
          <p class="msg2" >{{main3msg2}}</p>
        </div>


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
      main1msg1:'先锋作用评分',
      main1msg2:'（15分）',
      main2msg1:'遵纪守法评分',
      main2msg2:'（20分）',
      main3msg1:'思想汇报评分',
      main3msg2:'（10分）',





      }

		}
	,
	components:{
    'dlbheader':header,
    'dlbfooter':footer

	}}

</script>
<style scoped>

  .main{text-align: center}
  .main .mian1{background:url(../../src/assets/images/iconw-point1.png) center no-repeat; width:100%;height: 2rem}
  .main .mian2{background:url(../../src/assets/images/iconw-point2.png) center no-repeat ;height: 2rem}
  .main .mian3{background:url(../../src/assets/images/iconw-point3.png)center no-repeat ;height: 2rem}
  .main .msg1{font-size: 0.3rem ;padding-top: 0.7rem;color:	#FFFFFF}
  .main .msg2{font-size: 0.25rem;color: 	#FFFFFF}

</style>
