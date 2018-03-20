<template>
	<div id="itany">
		<h1>welcome to itany</h1>	
		<h2>{{name}}</h2>
		<button @click="change">更改数据配置</button>
		<!--<user-list></user-list>-->
	</div>
</template>
<script>
	important User form './components/user.vue'
	export default{
		data(){
			return {
				name:'tom'
			}
		},
		methods:{
			change(){
				this.name="Alice"
			}
			
		},
		components:{
			'user-list':User
		}
	}
</script>
<style>
	body{
		background-color: #CCCCCC;
	}
</style>