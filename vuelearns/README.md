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
	    <div ng-conntroller="myController">
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
