## 缩进
1.使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。
2.选择器与 { 之间必须包含空格
```css
.selected {
    margin: 0;
}
```
3.属性名 与之后的 : 之间不允许包含空格， : 与 属性值 之间必须包含空格。
```css
margin: 0;
```
4.列表型属性值书写在单行时， ,后必须跟一个空格

```css
font-family:Arial, sans-serif;
```
5.每行不得超过120个字符，除非单行不可分割
6.当一个rule包含多个selector时，每个选择器声明必须独占一行
```css
.page,
.comment,
.page-body {
    line-height: 20px;
}
```
7.>、+、~选择器的两边各保留一个空格
```css
main > nav {
    padding: 0;
}
main + nav {
    margin: 0;
}
main ~ nav {
    background-color: #69C;
}
```
8.属性选择器中的值必须用双引号包围
不允许用单引号，不允许不使用引号

```css
artical[character="juliet"] {
    font-size: 15px;
}
```
9.属性定义必须另起一行

```css
.selector {
    padding: 0;
    margin: 0;
}
```
10.属性定义后必须以分号结尾

```css
.selector {
    padding: 0;
}
```
## 通用
1. 如无必要，不得为 id、class 选择器添加类型选择器进行限定。
```css
#errort,
.dangers {
    font-color: #c00;
}
```
建议 选择器的嵌套层级应不大于3级，位置靠后的限定条件应尽可能精确

```css
#username input {}
.comment .avatar {}
```
建议 在可以使用缩写的情况下，尽量使用属性缩写。

```css
.post {
    font: 12px/1.5 arial, sans-serif;
}
```
建议 使用 border / margin / padding 等缩写时，应注意隐含值对实际数值的影响，确实需要设置多个方向的值时才使用缩写。
```css
.page {
    margin-right: auto;
    margin-left: auto;
}
```
## 属性书写顺序
Formatting Model(布局方式、位置) > Box Model(尺寸) > Typographic(文本相关) > Visual(视觉效果)

Formatting Model相关属性包括：position/top/right/bottom/left/float/display/overflow等

Box Model 相关属性包括:
border/margin/padding/width/height等

Typographic 相关属性包括:font/line-height/text-align/word-wrap等

Visual 相关属性包括：background/color/transition/list-style等

建议 当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置 clear 或触发 BFC 的方式进行 clearfix。尽量不使用增加空标签的方式。
建议 尽量不使用 !important 声明。
建议 当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和 !important 定义样式。
在可控环境下，期望显示在最上层的元素，z-index 指定为 999999。

## 数值
当数值为0 - 1之间的小数时，省略整数部分的0
```css
panel {
    opcity: .8;
}
```
## url
url()函数中的路径不加引号
```css
body {
    background: url(bg.png);
}
```
建议 url()函数中的绝对路径可省去协议名

body {
    background: url(//baidu.com/img/bg.png) no-repeat 0 0;
}

## 长度
长度为0时须省略单位(也只有长度单位可省)
body {
    padding： 0 5px;
}

## 颜色
rgb颜色值必须使用十六进制记号形式 #rrggbb 不允许使用rgb()

带有alpha的颜色信息可以使用 rgba()。使用 rgba() 时每个逗号后必须保留一个空格。
```css
.success {
    box-shadow: 0 0 2px rgba(0, 128, 0, .3);
    border-color: #008000;
}
```
颜色值可以缩写时，必须使用缩写形式
```css
.success {
    background-color: #aca;
}
```
颜色值不允许使用命名色值

```css
.success {
    color: #90ee90;
}
```
建议 颜色值中的英文字符采用小写。如不用小写也需要保证同一项目内保持大小写一致。
```css
.success {
    background-color: #aca;
}
```
# 2D位置
必须同时给出水平和垂直方向的位置
2D 位置初始值为 0% 0%，但在只有一个方向的值时，另一个方向的值会被解析为 center。为避免理解上的困扰，应同时给出两个方向的值。background-position属性值的定义

```css
body {
    background-position: center top;
}
```
## 字体
`.font-family属性中的字体族名称应使用字体的英文 Family Name,其中如有空格，须放置在引号中
```css
.success {
    font-family: "Microsoft YaHei";
}
```
1.font-family 按「西文字体在前、中文字体在后」、「效果佳 (质量高/更能满足需求) 的字体在前、效果一般的字体在后」的顺序编写，最后必须指定一个通用字体族( serif / sans-serif )。

```css
.artical {
    font-family: Arial, sans-serif; 
}
```
3.font-family 不区分大小写，但在同一个项目中，同样的 Family Name 大小写必须统一。
```css
body{
    font-family: Arial, sans-serif;
}
h1 {
    font-family: Arial,"Microsoft YaHei",sans-serif;
}
```
# 字号
需要在windows平台显示的中文内容，其字号不小于12px

由于 Windows 的字体渲染机制，小于 12px 的文字显示效果极差、难以辨认。

# 字重
css的字重分100 - 900共9档,但目前受字体本身质量和浏览器的限制，实际上支持400 - 700两档，分别等价于关键词normal和bold
浏览器本身使用一系列启发式规则来进行匹配，在 <700 时一般匹配字体的 Regular 字重，>=700 时匹配 Bold 字重。

但已有浏览器开始支持 =600 时匹配 Semibold 字重 (见此表)，故使用数值描述增加了灵活性，也更简短。
```css
h1 {
    font-weight: 700;
}
```
## 使用transition时应指定 transition-property

```css
.box {
    transition :color 1s,border-color 1s;
}
```

## 响应式
1.Media Query 不得单独编排，必须与相关的规则一起定义。
```css
/* Good */
/* header styles */
@media (...) {
    /* header styles */
}

/* main styles */
@media (...) {
    /* main styles */
}

/* footer styles */
@media (...) {
    /* footer styles */
}
```
1.Media Query 如果有多个逗号分隔的条件时，应将每个条件放在单独一行中。
```css
@media
(-webkit-min-device-pixel-ratio: 2), /* Webkit-based browsers */
(min--moz-device-pixel-ratio: 2),    /* Older Firefox browsers (prior to Firefox 16) */
(min-resolution: 2dppx),             /* The standard way */
(min-resolution: 192dpi) {           /* dppx fallback */
    /* Retina-specific stuff here */
}
```
## 兼容性
带私有前缀的属性由长到短排列，按冒号位置对齐
```css
.box {
   -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;

}
```