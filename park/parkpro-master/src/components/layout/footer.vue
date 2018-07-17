<template>

  <div class="footer">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="首页">
        <img slot="icon" :src="activity?home:homeColor">
        首页
      </mt-tab-item>
      <mt-tab-item id="党员信息">
        <img slot="icon" :src="acin?info:infoColor">
        党员信息
      </mt-tab-item>
      <mt-tab-item id="积分详情">
        <img slot="icon" :src="inte?integral:integralColor">
        积分详情
      </mt-tab-item>
      <mt-tab-item id="活动详情">
        <img slot="icon" :src="detail?active:activeColor">
        活动详情
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>

export default {
	data(){
		return {
		    selected:'',
		    home:'../../src/assets/images/gray-home.png',
		    homeColor:'../../src/assets/images/iconw-home.png',
		    info:'../../src/assets/images/gray-info.png',
		    infoColor:'../../src/assets/images/iconw-partyMembe.png',
		    integral:'../../src/assets/images/gray-item.png',
		    integralColor:'../../src/assets/images/iconw-integral.png',
		    active:'../../src/assets/images/gray-active.png',
		    activeColor:'../../src/assets/images/iconw-activity.png',
		    activity:true,
		    acin:true,
		    inte:true,
		    detail:true
		}
	},
	components:{
		
	},
	watch:{
		selected(newValue,oldValue){
			this.activity = true
			this.acin = true
			this.inte = true
			this.detail = true
			if(newValue == '首页'){
				this.activity = false
			}else if(newValue == '党员信息'){
				this.acin = false
			}else if(newValue == '积分详情'){
				this.inte = false
			}else{
			this.detail = false
				
			}
		}
	}
}
</script>
<style scoped>
.footer{
	height:.49rem;
}
.mint-tabbar{
	background-color:#FFFFFF;
}
.mint-tabbar > .mint-tab-item.is-selected{background-color:#FFFFFF;color:rgba(185,54,71,1);}
</style>
