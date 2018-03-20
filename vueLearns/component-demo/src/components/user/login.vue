<template>
	<div id="login">
		{{msg}}
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				msg:'用户登录'
			}
		}
	}
</script>
<style>
	#login{
		font-size:20px;
		color:red;
	}
</style>