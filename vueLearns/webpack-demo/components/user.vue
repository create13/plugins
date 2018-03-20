<template>
	<div class="user">
		<h2>用户列表</h2>
		<ul>
			<li v-for="value in users">{{value}}</li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				users:['tom','jack','Alice']
			}
		}
	}
</script>
<style scoped>  /*scoped表示该样式只在当前组件中有效 作用在于防止组件间样式冲突*/
	.user h2{
		color:blue;
	}
</style>