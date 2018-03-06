<template>
  <div class="hello">
  	<router-link :to="{name:'Detail',params:{id:10086}}">详情</router-link>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
  
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
