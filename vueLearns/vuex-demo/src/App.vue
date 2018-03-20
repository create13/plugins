<template>
  <div id="app">
   <button @click="increment">增加</button>
   <button @click='plugs'>减小</button>
   <button @click="incrementAsync">请求增加</button>
   <p>当前数字为：{{count}}</p>
   <p>{{isEvenOrOdd}}</p>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  //方式1 使用this.$store方法
/*  computed:{
  	count(){
  		return this.$store.state.count;
  	}
  }*/
 computed:mapGetters([
 		'count',
 		'isEvenOrOdd'
 ]),
/* computed:mapState([
 		'count'
 ]),*/
 methods:mapActions([
 	'increment',
 	'plugs',
 	'incrementAsync'
 ])
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
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
