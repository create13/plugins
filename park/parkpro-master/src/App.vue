<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  height:100%;
  width:100%;
  line-height:1;
  overflow-x:hidden;
  
}
#app{width:100%;height:100%;}
*{
	margin: 0px;
	padding:0px;
	font-family: 'Microsoft YaHei'!important;
	text-decoration: none!important;
}
</style>
