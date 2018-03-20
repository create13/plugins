<template>
  <div id="app">
  	{{msg}}
  	<h3>
  	<router-link to="/home">主页</router-link>
  	<router-link to="/news">新闻</router-link>
  	</h3>
  	<div>
  		<keep-alive>
  			<router-view></router-view>
  		</keep-alive>
  	</div>
  	<button @click="send">发送ajax请求</button>
  	<myButton @click.native="send"></myButton>
  </div>
</template>

<script>
import axios from 'axios'
import myButton from './components/myButton.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome hi'
    }
  },
  mounted(){
  	console.log(this.$route);
  },
  watch:{
  	$route:function(newValue,oldValue){
  		console.log('路由发生边变化，跳转到：'+newValue.path);
  	}
  },
  methods:{
  	send(){
			axios.get('https://api.github.com/users/create13').then(res =>{
				console.log(res.data);
			}).catch(err =>{
				console.log(err);
			})
  	}
  },
  components:{
  	myButton
  }
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
