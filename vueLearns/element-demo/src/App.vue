<template>
  <div id="app">
		{{msg}}
		<br />
		<!--按钮-->
		<el-button>我的按钮</el-button>
		<el-button type="primary">我的按钮</el-button>
		<el-button type="info">我的按钮</el-button>
		<el-button type="warning">我的按钮</el-button>
		<el-button type="success">我的按钮</el-button>
		<el-button type="danger">我的按钮</el-button>
		<br />
		<br />
		<el-button type="success" icon="el-icon-edit">编辑</el-button>
		<el-button type="danger" icon="el-icon-search">搜索</el-button>
		<el-button type="danger">上传<i class="el-icon-upload el-iconn-right"></i></el-button>
		<!--图标-->
		<i class="el-icon-close"></i>
		<i class="el-icon-delete"></i>
		<i class="el-icon-loading"></i>
		<!--布局-->
		<el-row>
			<el-col :span='6' class="grid">I</el-col>
			<el-col :span='6' class="grid">Love</el-col>
			<el-col :span='6' class="grid">You</el-col>
			<el-col :span='6' class="grid">Baby</el-col>
		</el-row>
		<br />
		<!--日期选择器-->
<!--		 <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>-->
    <datapicker></datapicker>
    <br />
    <upload></upload>
  </div>
</template>

<script>
import datapicker from './components/datapicker.vue'
import upload from './components/upload.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome'
    }
  },
  components:{
  	datapicker,
  	upload
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
.grid{
	border:1px solid #ccc;
	font-size:21px;
	padding:10px;
	}
</style>


