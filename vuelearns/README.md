### vue和angular的区别
#### angular
	*上手较难
	*指令以ng-xxx开头
	*所有属性和方法都存储在$scope中
	*由谷歌维护
	*报错不容易看懂
#### vue
	*简单、易学、更轻量
	*指令以v-xxx开头
	*html代码+json数据，再创建一个vue实例
	*由个人维护  尤雨溪 目前就职于阿里巴巴 2014年2月开源了vue
	*报错可以看懂
### angular实现
	js:
	    let app = angular.module('myApp',[]);
	    app.controller('myController',['$scope',function($scope){
	    	$scope.msg="hello world";
	    }]);
	html:
	    <html ng-app="myApp">
	    <div ng-controller="myController">
	    	{{msg}}
	    </div>
	    </html>
	    
### 2.2 vue实现
	js：
		new Vue({
			el:"#itany", //指定关联的选择器
			data:{ //存储数据
				msg:"hello world",
				name:'tom'
			}
			
					
		});
	
	html：
		<div id="itany">
			{{msg}}
		</div>
### 3.安装vue-devtools插件,便于在chrome中调试vue 
     直接将vue-devtools解压缩，然后将文件夹中的chrome拖放到扩展程序中

## 三、常用指令

### angular中常用的指令：
	ng-model
	ng-repeat
	ng-click
	ng-show
	ng-hide
	ng-if
	
### vue中常用的指令
	v-model  双向数据绑定，一般用于表单元素
	v-for 对数组或对象进行循环
	v-on  用来绑定事件，用法v-on:click
	v-show/v-if
	用来显示或隐藏元素，v-show是通过display实现，v-if是每次删除后再重新创建，与angular中类似
	
### 属性
#### 属性的绑定和简写
v-bind 用于绑定属性 v-bind:属性=""
简写 
v-bind:src="" 简写为:src=""

#### class和style属性
绑定class和style属性时语法比较复杂
方式1：变量形式  不常用
:class="aa"
方式2：数组形式，同时引用多个
:class="[bb,dd]"
常用的方法 json串方式
:class="{redC:flag,bgColor:bbs}"

### 事件和属性
v-on:click=""
简写方式 @click=""

#### 事件对象$event
包含事件相关信息，如事件源、事件类型、偏移量
target、type、offsetx

#### 事件冒泡
阻止事件冒泡：
a)原生js方式
	e.stopPropagation();  //原生js方式
b)vue提供的
	@click.stop=""    //阻止事件冒泡
#### 事件默认行为
	e.preventDefault(); //原生方式 阻止默认事件
	@click.prevent="" //vue方式
#### 键盘事件
	@keydown  @keypress  @keyup 
	回车 @keydown.13=""或@keydown.enter=""
	上：@keydown.38或@keydown.up
	删除键 @keydown.delete
	默认没有 @keydown.a/b/c...事件，可以去自定义键盘事件，也成为自定义键位别名
#### 模板
Vue.js使用基于html的模板语法，可以将Dom绑定到Vue实例中的数据 模板就是{{}},用来进行数据绑定，显示在页面中也称为Mustache语法

#### 数据绑定的方式
	a.双向绑定
	v-model
	b.单向绑定
	方式1：使用两对大括号{{}}，可能会出现闪烁的情况，可以使用v-cloak解决 v-cloak要配合css的display:none一起用 否则不生效
	方式2：使用v-text、v-html
	例如v-text="msg"
#### 其他指令
	v-pre v-once  不需要表达式
	v-pre 不编译，直接原样显示 例如<h2 v-pre>{{msg}}</h2>  页面显示的是{{msg}}
	v-once	数据只绑定一次 例如<h3 v-once>{{msg}}</h3>  例如msg对应的字符串hello  只显示hello v-model="msg"绑定的会随着输入内容改变而改变 但是v-once的值不会改变
#### 过滤器
用来过滤模型数据，在显示之前进行数据处理和筛选
angular语法 {{data | filter:参数}}
vue语法 {{data | filter(参数)}}
vue1.0中内置许多过滤器，如
currenncy、uppercase、lowercase
limitBy、orderBy、filterBy
vue2.0中全部删除内置过滤器
如何解决：
a.使用第三方工具库，如loadash、date-fns日期格式化、accounting.js货币格式化等
b.使用自定义过滤器
	全局过滤器、局部过滤器
全局方法 Vue.filter(过滤器id,过滤器函数)
局部方法filters	
#### 发送ajax请求
vue本身不支持发送AJAX请求，1.0时候推荐需要vue-resource、2.0的时候推荐使用axios
axios是一个基于Promise的HTTP请求客户端，用来发送请求，也是vue2.0官方推荐的，同时不再对vue-resource进行更新维护
参考：github上搜索axios，查看API文档

#### 使用axios发送AJAX请求
① 安装axios并引入
npm install axios -S
也可直接下载axios.min.js

基本用法
axios([options]);
axios.get(url[,options]);
传参方式：
		1.url传参
		2.params传参
axios.post(url[,data[,options]]);
axios默认发送数据时，数据格式是Request Payload，并非常用的form Data,所以参数必须要以键值对的形式传递，不能以json形式传参
	传参方式：
		1.自己拼接为键值对 name=alice&age=20
		2.使用transformRequest,在请求发送前将请求数据进行转换
		3.如果使用模块化开发，可以使用qs querystring 模块
		
axios本身不支持发送跨域请求，没有提供相应api,作者也暂时没计划在axios添加支持发送跨域请求，所以只能使用第三方库
#### vue-resource
npm install vue-resource -S
用法 引入vue-resource脚本
使用this.$http发送请求
	this.$http.get(url,[options]);	
	this.$http.head(url,[options]);	
	this.$http.jsonp(url,[options]);	
	this.$http.post(url,[body],[options]);
#### vue生命周期
vue实例从创建到销毁的过程，称为生命周期，2.0中生命周期共有8个阶段
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed

#### 计算属性
计算属性也是用来存储数据，但具有以下几个特点：
a.数据可以进行逻辑处理操作
b.对计算属性中的数据进行监视

	computed:{
		reverseMsg(){
			/*可以包含逻辑处理操作，同时reverseMsg 依赖于msg*/
		return this.msg.split(' ').reverse().join(' ');
	}
	}

#### 计算属性  vs 方法
将计算属性的get函数定义为一个方法也可以实现类似的功能
区别：
a.计算属性是基于它的依赖进行更新，只有在相关依赖发生改变时才能更新变化
b.计算属性是缓存的，只要相关依赖没有改变，多次访问计算属性得到的值是之前缓存的计算结果，不会多次执行
计算属性是由两部分组成 get 和 set 分别用来获取计算属性和设置计算属性
默认只有get,如果需要set，要自己添加

### 四、vue实例的属性和方法
#### 1.属性
vm.$el();
vm.$data();
vm.$options();
vm.$refs();
			  vm.属性名 获取data中的属性
			  console.log(vm.msg);
			  vm.$el获取vue实例关联的元素
			  vm.$el 获取vue实例关联的元素
			  console.log(vm.$el);DOM对象  <div id="itany">hello</div>
			  vm.$el.style.color='red';
			 
			  vm.$data 获取数据对象data
			  console.log(vm.$data);
			  console.log(vm.$data.msg);
			  
			  vm.$options 获取自定义属性
			  console.log(vm.$options.name);
			  console.log(vm.$options.age);
			  vm.$options.show();
			  vm.$refs 获取页面中所有添加ref属性的元素
			  console.log(vm.$refs);
			  console.log(vm.$refs.hello);
#### 2.方法
vm.$mount();  手动挂载vue实例
vm.$mount('itany');  若el上配置 可以用这个手动挂载
vm.$destroy(); 销毁实例 清理它与其它实例的连接，解绑它的全部指令及事件监听器
vm.$nextTick(callback);
在dom更新完成后再执行回调函数，一般在修改数据之后使用该方法，以便获取更新后的dom
vm.content = 'jack';
dom还没更新完，vue实现响应式并不是数据发生改变之后dom立刻变化，需要按一定的策略进行更新，需要时间！
	vm.$nextTick(function(){
		console.log(vm.$refs.content.textContent);
	})
vm.$set(object,key,value);
		this.$set(this.user,'age',25);通过vue实例的$set方法为对象添加属性,可以实时监控
vm.$delete(object,key);
this.$delete(this.user,'age');
vm.$watch(data,callback,[options])
	vm.$watch('content',function(newValue,oldValue){
		console.log("age被修改了新值"+newValue+"原值"+oldValue);
	})
	如果是对象 需要被深度监视 加个true 
		vm.$watch('content',function(newValue,oldValue){
		console.log("age被修改了新值"+newValue+"原值"+oldValue);
	},true)
	
	watch:{
		//使用vue实例提供的watch选项
		msg:(newValue,oldValue) =>{
		console.log("age被修改了新值"+newValue+"原值"+oldValue);
		},
		user:{
			handler:(newValue,oldValue) =>{
			console.log("age被修改了新值"+newValue+"原值"+oldValue);
			},
			deep:true  //深度监视 当对象中的属性发生变化时也会监视
			}
	}
	
### 五、自定义指令
分类：全局指令、局部指令
#### 1.全局指令
使用全局方法 Vue.directive(指令id,定义对象);
	 自定义全局指令
	注：使用指令时必须在指令名称前加前缀v-指令名称
	Vue.directive('hello',{
		bind(){//最常用的！！
			console.log("指令第一次绑定到元素上时调用，只调用一次，可执行初始化操作");
		},
		inserted(){
			console.log("被绑定元素插入到DOM中时调用");
		},
		update(){
			console.log("被绑定的元素所在模板更新时调用");
		},
		componentUpdated(){
			console.log("被绑定元素所在模板完成一次更新周期时调用");
		},
		unbind(){
			console.log("指令与元素解绑时调用，只调用一次");
		}
	});
	Vue.directive('world',{
		bind(el,binding){
			console.log(el);//指令所绑定的元素，dom对象
			el.style.color="red";
			console.log(binding);
		}
	})


或者Vue.directive(指令id,函数);这里会被bind和update调用
	Vue.directive(my-directive,function(){
	//这里会被bind和update调用
	});
	
onmouseover onmouseout
onmousedown onmousemove onmouseup

### 六、过渡(动画)
1.简介
Vue在插入、更新或者移除DOM时，提供多种不同方式的应用过渡效果
本质上还是使用css3动画：transition、animation

2.基本用法
使用transition组件，将要执行动画的元素包含在该组件内 如果给transiton定义name 那么css的类名前面都加这个name前缀 不定义的话 默认是v-
<transition>
运动的元素
</transition>
过渡的css类名：6个
.fade-enter   fade-enter需要放在fade-enter-active的后面
.fade-enter-active
.fade-enter-to
.fade-leave
.fade-leave-active
.fade-leave-to

3.钩子函数 8个
给动画在运行过程之前之后或者离开设置效果
     @before-enter=""
	 @enter=""
	 @after-enter=""
	 @enter-cancelled=""
	 @before-leave=""
	 @leave=""
	 @after-leave=""
	 @leave-cancelled=""
	 
4.结合第三方动画库animate.css一起使用
<transition enter-active-class=" animated bounceInLeft" leave-active-class="animated bounceOutRight">
	<p v-show="flag">块</p>
</transition>
5.多元素动画
<transition-group></transition-group>

### 组件 component
1.什么是组件
组件是Vue.js最强大的功能之一。组件可以扩展html元素，封装可重用的代码
组件是自定义元素（对象）

2.组件定义的方式
方式1：先创建组件构造器，然后由组件构造器创建组件
方式2：直接创建组件

3.组件的分类
全局组件、局部组件
全局组件
	/*方式1：先创建组件构造器，然后由组件构造器创建组件*/
	/*1.使用Vue.extend()创建一个组件构造器*/
	var myExtend = Vue.extend({
		template:'<h2>hello world</h2>'
	});
	/*2.使用Vue.component，根据组件构造器来创建组件*/
	Vue.component('val',myExtend)
	/*方式2：直接创建组件（推荐）*/
	Vue.component('my-component',{
		template:'<h2>{{msg}}</h2>',
		data(){  //在组件中存储数据时，必须以函数形式，函数返回一个对象
			return {
				 msg:'自定义的内容'
			}
		}
	})
局部组件
	components:{
		"my-word":{
			template:'<h2>{{name}}</h2>',
			data(){
				return {
					name:'lucy'
				}
			}
		}
	}
	
4.引用模板
将组件的内容放到模板<template>中并引用，<template>必须有且只有一个根元素
<template id="arrDetail">
			<!--<template>必须有且只有一个根元素-->
			<div>
				<h3>{{name}}</h3>
				<ul>
					<li v-for="val in arr">{{val}}</li>
				</ul>
			</div>
</template>

components:{
	"my-word":{
		name:'com-name', //指定组件的名称，默认为标签名，可以不设置
		template:'#arrDetail',
		data(){
			return {
				name:'lucy',
				arr:['tom','jack','mike']
			}
		}
	}
}

5.动态组件
<component :is=""></component>组件
多个组件使用同一个挂载点，然后动态的在它们之间切换
<keep-alive>组件
<keep-alive>
	<component :is="flag"></component>
</keep-alive>

###组件间数据传递

#### 1.父子组件
在一个组件内部定义另一个组件，成为父子组件
子组件只能在父组件内部使用
默认情况下、子组件无法访问父组件中的数据，每个组件实例的作用域是独立的

2.组件间数据传递（通信）
(1)子组件访问父组件的数据
a) 在调用子组件时，绑定想要获取的父组件中的数据
b) 在子组件内部，使用props选项声明获取的数据，即接收来自父组件的数据
注：组件中的数据共用三种形式：data、props、computed
总结：父组件通过props向下传递数据给子组件
(2)父组件访问子组件的数据
a) 在子组件中使用vm.$emit(事件名，数据)触发一个自定义事件，事件名自定义
b) 父组件在使用子组件的地方监听子组件触发的事件，并在父组件中定义方法，用来获取数据
总结：子组件通过events给父组件发送消息，实际上就是子组件把自己的数据发送到父组件

3.单向数据流
props是单向绑定的,当父组件的属性变化时，将传导给子组件，但是不会反过来
而且不允许子组件直接修改父组件中的数据，报错
解决方法：
方式1：如果子组件想把它作为局部数据来使用，可以将数据存入另一个变量中再操作，不影响父组件中的数据
方式2：如果子组件想修改数据并且同步更新到父组件，两个方法：
a.使用.sync(1.0版本中支持，2.0版本中不支持，2.3版本中又开始支持)
需要显式的触发一个更新事件
:name.sync="name"
this.$emit('update:name','alice');
b.可以将父组件中的数据包装成对象，然后在子组件中修改对象的属性(因为对象是引用类型，指向同一个内存空间，推荐方式)

4.非父子组件间的通信
非父子组件间的通信，可以通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件
var Event = new Vue();
Event.$emit(事件名,数据);
Event.$on(事件名,data => {});

#### slot内容分发
	本意：位置、槽
	作业：用来获取组件中的原内容，类似angular中的transclude指令
	
#### vue-router路由
使用Vue.js开发SPA(Single Page Application) 单页面应用
根据不同url地址，显示不同的内容，但显示在同一个页面中，称为单页面应用
参考https://router.vuejs.org/zh-cn
安装路由 引入js插件
npm install vue-router -S
//1.定义相应的组件
	var home ={
		template:'<h3>我是主页</h3>'
	}
	var news ={
		template:'<h3>我是新闻</h3>'
	}
	//2.配置路由
	const routes=[
		{
			path:'/home',
			component:home
		},
		{
			path:'/new',
			component:news
		},
		{
			path:'*',
			redirect:'/home'
		}
	]
	//3.创建路由实例
	const router=new VueRouter({
		routes,//简写 相当于 routes:routes
		/*mode:'history',*/  //更改模式 默认是hash
		linkActiveClass:'active'  //更改活动链接的class类名
	});
	//4.创建根实例并将路由挂载到Vue实例上
		var vm = new Vue({
			el:"#itany",
			router:router,  //注入路由
			data:{
				
			},
			methods:{
				
			},
			computed:{
				
			},
			directives:{
				
			},
			components:{
				
			}
		});
2.路由嵌套和参数传递
router-link默认会被渲染成a标签，如果想渲染成其他标签 可在router-link中设置tag="" 例如tag="li"
用router-view展现
传参的两种形式：
a.查询字符串： login?name=to&pwd=123
	获取参数{{$route.query}}
b.rest风格url: regist/alice/456
	获取参数{{$route.params}}
	
3.路由实例的方法
	router.push()  添加路由，功能上与<router-link>相同
	router.replace() 替换路由，不产生历史记录
	
4.路由组合动画
引入animate.css
	<transition enter-active-class="animated bounceInleft" leave-active-class="animated bounceOutRight">
		<router-view></router-view>
	</transition>

### 五、单文件组件

#### 1. .vue文件
.vue文件，称为单文件组件，是Vue.js自定义的一种文件格式，一个.vue文件就是一个单独的组件，在文件内封装了组件相关的代码：html、css、js
.vue文件由三部分组成：<template>、<style>、<script>
<template>
html代码
</template>
<style>
css代码
</style>
<script>
js代码
</script>

#### 2.vue-loader
浏览器本身并不认识.vue文件，所以必须对.vue文件进行加载解析，此时需要vue-loader 类似的loader还有许多，如html-loader、css-loader、style-loader、babel-loader等 需要注意的是vue-loader是基于webpack的

#### 3.webpack
webpack是一个前端资源模板化加载器和打包工具，它能够把各种资源都作为模块来使用和处理。实际上，webpack是通过不同的loader将这些资源加载后打包，然后输出打包后文件 简单来说，webpack就是一个模块加载器，所有资源都可以作为模块来加载，最后打包输出

[官网](http://webpack.github.io/)

webpack版本：v1.x v2.x

webpack有一个核心配置文件：webpack.config.js,必须放在项目根目录下

### 4.示例，步骤

##### 4.1 创建项目，目录结构如下
webpack-demo
	|-index.html
	|-main.js   入口文件
	|-App.vue   vue文件
	|-package.json  工程文件
	|-webpack.config.js  webpack配置文件
	|-babelrc  Babel 配置文件

##### 4.2 编写App.vue

##### 4.3 安装相关模板
	npm install vue -S
	
	npm install webpack -D
	npm install webpack-cli -D
	npm install webpack-dev-server -D
	
	npm install vue-loader -D
	npm install vue-html-loader -D
	npm install css-loader -D
	npm install vue-style-loader -D
	npm install file-loader -D
	
	npm install babel-loader -D
	npm install babel-core -D
	npm install babel-preset-env -D //根据配置的运行环境自动启用需要的babel插件
	npm install vue-template-compiler -D //预编译模板
	
	合并：npm install -D webpack webpack-dev-server vue-loader vue-html-loader css-loader vue-style-loader file-loader babel-loader babel-core babel-preset-env vue-template-compiler
		
	
##### 4.4 编写main.js

#####  4.5 编写webpack.config.js

##### 4.6 编写.babelrc

#####  4.7 编写package.json

#####  4.8 运行测试
	npm run dev
	
### 六、vue-cli脚手架
1.简介
vue-cli是一个vue脚手架，可以快速构造项目结构
vue-cli本身集成了多种项目模板：
simple 很少使用 简单
webpack 包含ESLint代码规范检查和unit单元测试等
webpack-simple 没有代码规范检查和单元测试
browserify 使用的也比较多
browserify-simple 简化版 没有代码规范检查和单元测试

2.示例，步骤
2.1 安装vue-cli,配置vue命令环境
npm install vue-cli -g
vue --version
vue list

2.2初始化项目，生成项目模板
语法：vue init 模板名 项目名

2.3 进入生成的项目目录，安装模板包
cd vue-cli-demo
npm install
2.4 运行
npm run dev //启动测试服务
npm run build //将项目打包输出dist目录，项目上线的话要将dist目录拷贝到服务器上

3.使用webpack模板
vue init webpack vue-cli-demo2

ESLint是用来统一代码规范和风格的工具，如缩进、空格、符号等，要求比较严格
[官网](http://eslint.org)

### 七、模块化开发
1.vue-router模块化
npm install vue-router -S

1.1 编译main.js
	在main.js中引入vue-router
	import VueRouter from 'vue-router'
	使用 VueRouter
	Vue.use(VueRouter);
1.2编辑App.vue

1.3编辑router.config.js

2.axios模块化
npm install axios -S

使用axios的两种方式：
	方式1：在每个组件中引入axios
	import axios from 'axios'
	方式2:在main.js中全局引入axios并添加到Vue原型中
	在main.js中引入import axios from 'axios'
	Vue.prototype.axios=axios;
	在其他页面调用的时候使用Vue.axios({})或者Vue.axios.get()就可以
	
3.为自定义添加事件
<myButton @click.native="send"></myButton>
 .native 监听组件根元素的原生事件
 
### 八、Element UI
1.简介
Element UI是饿了么团队提供的一套基于Vue2.0的组件库，可以快速搭建网站，提高开发效率
	ElementUI PC端
	MintUI 移动端

[官网](http://element.eleme.io/)

2.快速上手

2.1安装element-ui
npm install element-ui -S

2.2在main.js中引入并使用组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'  //该样式文件需要单独引入
Vue.use(ElementUI);
这种方式引入了ElementUI中所有的组件
还有按需引入这种方法不做过多介绍

2.3在webpack.config.js中添加loader
css样式和字体图标都需要由相应的loader来加载，所以需要style-loader、css-loader

默认并没有style-loader模块、所以需要单独安装
npm install style-loader --save-dev

2.4使用组件

2.5使用less
安装loader,需要两个：less、less-loader
npm install less less-loader -D
在webpack.config.js中添加loader
      {
        test: /\.less$/,
        loader: 'less-loader'
      }
      
### 九、自定义全局插件（插件）
全局组件（插件）：就是指可以在main.js中使用Vue.use()进行全局引入，然后在其他组件中就都可以使用了 如vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
普通组件（插件）:每次使用时都要引入，如axios
import axios from 'axios'

### Vuex
1.简介
Vuex是一个专为Vue.js应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
简单来说，用来集中管理数据，类似React中的Redux,都是基于Flux的前端状态管理框架

2.基本用法

2.1安装vuex
npm install vuex -S

2.2创建store.js文件，在main.js中导入并配置store选项

2.3编辑store.js文件
Vuex的核心是Store(仓库)，相当于是一个容器,一个store实例中包含以下属性的方法
state 定义属性(状态、数据)
getters 用来获取属性
actions 定义方法(动作)
commit 提交变化，修改数据的唯一方式就是显式的提交mutations
mutations 定义变化

2.4 编辑App.vue
在子组件中访问store对象的两种方式：
方式1：通过this.$store访问
方式2：通过mapState、mapGetters、mapActions访问，vuex提供了两个方法：
mapState 获取state
mapGetters 获取getters属性(数据)  
mapActions 获取actions方法(动作)  

3.更好的组织Vuex项目结构

|-src
	|-store
		|-index.js
		|-getters.js
		|-actions.js
		|-mutations.js
		|-modules //分为多个模块，每个模块都可以拥有自己的state、getters、actions、mutations
			|-user.js
			|-cart.js
			|-goods.js
			|....
		

3.更好的组织vuex项目结构
|-src
	|-store
		|-index.js
		|-getters.js
		|-actions.js
		|-mutations.js
		|-modules  //分为多个模块，每个模块都可以拥有state、getters、actions、mutations
			|-user.js
			|-cart.js
			|-goods.js
			|...
			
