<template>
  <div class="detail">
		<h2>车辆编号：{{$route.params.id}}</h2>
		<h2>故障信息:{{$route.params.detail}} </h2>
<!--		<input type="checkbox" v-model="method" value="更换二维码" />更换二维码	<br />
		<input type="checkbox" v-model="method" value="更换轮胎" />更换轮胎	<br />
		<input type="checkbox" v-model="method" value="更换其他配件" />更换其他配件	<br />-->
		
		<mt-checklist title="" v-model="method" :options="['更换二维码', '更换轮胎', '更换其他配件']"></mt-checklist>
		
	<!--	<button @click="repaireDone">维修完成</button>-->
		<mt-button @click="repaireDone" type="primary" size="large">维修完成</mt-button>
	<!--	<button @click="back">返回</button>-->
		<mt-button @click="back" type="default" size="large">返回</mt-button>
		
		
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    	method:[]
    }
  },
  methods:{
  	repaireDone(){
  		let id = this.$route.params.id;
  		let method = this.$route.params.method;
  		fetch('/api/repair?id='+id+'&method='+method)
  		.then(res => {
  			return res.json();
  		}).then( json => {
  			console.log(json);
  			if(json.message){
  				alert(json.message);
  			}
  		})
  	},
  	back(){
  		this.$router.push({path:'/'})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,body{height:100%;}1
.mint-button--large{
	width:90%;
	margin:10px auto 0 auto;
}
.mint-checklist{text-align:left;}
.detail h2{text-align:left;
padding-left:5%;
}
</style>
