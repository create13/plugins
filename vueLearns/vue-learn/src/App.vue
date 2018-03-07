<template>
  <div id="app">
  	<h1>共享后台管理</h1>
    <router-view class='content'></router-view>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height:100%;
  display:flex;
  flex-direction: column;
}
h1{height:45px;line-height: 45px;}
#app h1{font-size:24px;border-bottom: 1px solid #b7b7b7;}
.content{flex: 1;}
</style>
