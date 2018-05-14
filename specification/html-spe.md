# 代码风格
1.使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。
```html
<ul>
    <li>first</li>
    <li>second</li>
</ul>
```
建议每行不得超过 120 个字符。
过长的代码不容易阅读与维护。但是考虑到 HTML 的特殊性，不做硬性要求。
2.class 必须单词全字母小写，单词间以 - 分隔。
class 必须代表相应模块或部件的内容或功能，不得以样式信息进行命名。
```html
<div class="sidebar"></div>
```
3.元素 id 必须保证页面唯一
同一个页面中，不同的元素包含相同的 id，不符合 id 的属性含义。并且使用 document.getElementById 时可能导致难以追查的问题。
建议 id 建议单词全字母小写，单词间以 - 分隔。同项目必须保持风格一致。
建议 id、class 命名，在避免冲突并描述清楚的前提下尽可能短。

```html
<!-- good -->
<div id="nav"></div>
<!-- bad -->
<div id="navigation"></div>

<!-- good -->
<p class="comment"></p>
<!-- bad -->
<p class="com"></p>

<!-- good -->
<span class="author"></span>
<!-- bad -->
<span class="red"></span>
```
4.同一页面，应避免使用相同的 name 与 id
IE 浏览器会混淆元素的 id 和 name 属性， document.getElementById 可能获得不期望的元素。所以在对元素的 id 与 name 属性的命名需要非常小心。
```html
<input name="foo">
<div id="foo"></div>
<script>
// IE6 将显示 INPUT
alert(document.getElementById('foo').tagName);
</script>
```
## 标签
1·标签名必须使用小写字母。
```html
<!-- good -->
<p>Hello StyleGuide!</p>

<!-- bad -->
<P>Hello StyleGuide!</P>
```
2.对于无需自闭合的标签，不允许自闭合。
常见无需自闭合标签有input、br、img、hr等。
```html
<!-- good -->
<input type="text" name="title">

<!-- bad -->
<input type="text" name="title" />
```
3.对 HTML5 中规定允许省略的闭合标签，不允许省略闭合标签。
```html
<!-- good -->
<ul>
    <li>first</li>
    <li>second</li>
</ul>

<!-- bad -->
<ul>
    <li>first
    <li>second
</ul>
```
4.标签使用必须符合标签嵌套规则。
比如 div 不得置于 p 中，tbody 必须置于 table 中。
下面是常见标签语义

p - 段落
h1,h2,h3,h4,h5,h6 - 层级标题
strong,em - 强调
ins - 插入
del - 删除
abbr - 缩写
code - 代码标识
cite - 引述来源作品的标题
q - 引用
blockquote - 一段或长篇引用
ul - 无序列表
ol - 有序列表
dl,dt,dd - 定义列表
```html
<!-- good -->
<p>Esprima serves as an important <strong>building block</strong> for some JavaScript language tools.</p>

<!-- bad -->
<div>Esprima serves as an important <span class="strong">building block</span> for some JavaScript language tools.</div>
```
建议  在 CSS 可以实现相同需求的情况下不得使用表格进行布局。
建议 标签的使用应尽量简洁，减少不必要的标签。
<!-- good -->
<img class="avatar" src="image.png">

<!-- bad -->
<span class="avatar">
    <img src="image.png">
</span>
## 属性
1.属性名必须使用小写字母
```html
<!-- good -->
<table cellspacing="0">...</table>

<!-- bad -->
<table cellSpacing="0">...</table>
```
2.属性值必须用双引号包围
不允许使用单引号，不允许不使用引号。
```html
<!-- good -->
<script src-="esl.js"></script>

<!-- bad -->
<script src='esl.js'></script>
<script src=esl.js></script>
```
建议 布尔类型的属性，建议不添加属性值。
```html
<input type="text" disabled>
<input type="checkbox" value="1" checked>
```
建议 自定义属性建议以 xxx- 为前缀，推荐使用 data-。
```html
<ol data-ui-type="Select"></ol>
```
# 通用
1.使用 HTML5 的 doctype 来启用标准模式，建议使用大写的 DOCTYPE。
```html
<!DOCTYPE html>
```
2.页面必须使用精简形式，明确指定字符编码。指定字符编码的 meta 必须是 head 的第一个直接子元素。
```html
<html>
<head>
<meta charset="UTF-8">
</head>
<body>

</body>
</html>
```
3.引入css时必须指明rel="stylesheet"
```html
<link rel="stylesheet" src="page.css">
```
建议 引入 CSS 和 JavaScript 时无须指明 type 属性。
建议 在 head 中引入页面需要的所有 CSS 资源。
建议 JavaScript 应当放在页面末尾，或采用异步加载。
```html
<body>
    <!-- a lot of elements -->
    <script src="init-behavior.js"></script>
</body>
```
建议 移动环境或只针对现代浏览器设计的 Web 应用，如果引用外部资源的 URL 协议部分与页面相同，建议省略协议前缀。
```html
<script src="//s1.bdstatic.com/cache/static/jquery-1.10.2.min_f2fb5194.js"></script>
```
## head

1.页面必须包含 title 标签声明标题。
2.title 必须作为 head 的直接子元素，并紧随 charset 声明之后。
```html
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
```
2. 保证 favicon 可访问。
在未指定 favicon 时，大多数浏览器会请求 Web Server 根目录下的 favicon.ico 。为了保证favicon可访问，避免404，必须遵循以下两种方法之一：

在 Web Server 根目录放置 favicon.ico 文件。
使用 link 指定 favicon。
```html
<link rel="shortcut icon" href="path/to/favicon.ico">
```

#  图片
禁止 img 的 src 取值为空。延迟加载的图片也要增加默认的 src。
src 取值为空，会导致部分浏览器重新加载一次当前页面。
建议 避免为 img 添加不必要的 title 属性。
建议 为重要图片添加 alt 属性
建议 有下载需求的图片采用 img 标签实现，无下载需求的图片采用 CSS 背景图实现。
# 表单
1.有文本标题的控件必须使用 label 标签将其与其标题相关联。
有两种方式：

将控件置于 label 内。
label 的 for 属性指向控件的 id。
推荐使用第一种，减少不必要的 id。如果 DOM 结构不允许直接嵌套，则应使用第二种。
```html
<label><input type="checkbox" name="confirm" value="on"> 我已确认上述条款</label>

<label for="username">用户名：</label> <input type="textbox" name="username" id="username">
```
## 按钮
1. 使用 button 元素时必须指明 type 属性值。
```html
<button type="submit">提交</button>
<button type="button">取消</button>
```
在针对移动设备开发的页面时，根据内容类型指定输入框的 type 属性。
```html
<input type="date">
```
