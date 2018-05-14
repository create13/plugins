# 文件
1.在文件结尾处，保留一个空行
# 结构
## 缩进
1.使用4个空格作为一个缩进层级，不允许使用2个空格或tab字符
```javascript
switch (variable) {

    case '1':
        // do...
        break;

    case '2':
        // do...
        break;

    default:
        // do...

}

```
## 空格
2.二元运算符两侧必须有一个空格,一元运算符与操作对象之间不允许有空格
```javascript
    var a = b + c;  //二元运算符
    a++;   //一元运算符
```
3.用作代码块起始的左花括号 {前必须有一个空格

    if (condition) {
    }

    while (condition) {
    }

    function funcName() {
    }

  4.if/else/for/while/function/switch/do/try/catch/finally关键字后，必须有一个空格

    if (condition) {
    }

    while (condition) {
    }

    (function () {
    })();

5.在对象创建时，属性中的:之后必须有空格,:之前不允许有空格。

```javascript
var obj = {
    a: 1,
    b: 2,
    c: 3
};

```

6.函数声明、具名函数表达式、函数调用中，函数名和(之间不允许有空格

```javascript
function funcName() {
}

var funcName = function funcName() {
};

funcName();
```

7.,和;前不允许有空格

    callFunc(a, b);

8.在函数调用、函数声明、括号表达式、属性访问、if/for/while/switch/catch等语句中,()和[]内紧贴括号部分不允许有空格。

```javascript
    callFunc(param1, param2, param3);

    save(this.list[this.indexes[i]]);

    needIncream && (variable += increament);

    if (num > list.length) {
    }

    while (len--) {
    }
```

9.单行声明的数组与对象,如果包含元素,{}和[]内紧贴括号部分不允许包含空格。
```javascript
var arr1 = [];
var arr2 = [1,2,3];
var obj1 = {};
var obj2 = {name:'obj'};
var obj3 = {
    name: 'obj',
    age: 20,
    sex: 1
};
```

10.行尾不得有多余的空格。

## 换行
11.每个独立语句结束后必须换行。
每行不得超过120个字符。

ps:超长的不可分割的代码允许例外，比如复杂的正则表达式。长字符串不在例外之列。
运算符处换行时，运算符必须在新行的行首。

```javascript
if(user.isAuthenticated() 
&& user.isInRole('admin') 
&& user.hasAuthority('add-admin') || user.hasAuthority('delete-admin') 
) {

}
var result = number1 + number2 + number3
    +number4 + number5;
)
```

12.在函数声明、函数表达式、函数调用、对象创建、数组创建、for语句等场景中，不允许在,或;前换行。

```javascript
var obj = {
    a: 1,
    b: 2,
    c: 3
};

foo(
    aVeryVeryLongArgument,
    anotherVeryLongArgument,
    callback
);
```

13.不同行为或逻辑的语句集,使用空行隔开，更易阅读。

```javascript
function setStyle(element,property,value) {
    if (elment == null) {
        return;
    }

    element.style[property] = value;
}
```

## 语句
14.不得省略语句结束的分号。
15.在if/else/for/do/while语句中，即使只有一行，也不得省略块{...}

```javascript
if(condition) {
    callFunc();
}
```

16.函数定义结束不允许添加分号
```javascript
function funcName() {
}

//如果是函数表达式，分号是不允许省略的
var funcName = function () {

};
```

17.IIFE必须在函数表达式外添加 ( ,非IIFE 不得在函数表达式外添加 (

```javascript

var task = (function () {
    return result;
})();

```
## 命名
18.变量使用Camel命名法。

```javascript
var loadingModules = {};
```
19.常量使用全部字母大写，单词间下划线分隔得命名方式
```javascript
var HTML_ENTITY = {};
```
20.函数使用Camel命名法
函数的参数使用Camel命名法
```javascript

function stringFormat(source) {
}

function hear(theBells) {
}

```

21.类使用Pascal命名法
类的方法/属性使用Camel命名法
```javascript
function TextNode(options) {
}
function TextNode(value,engine) {
    this.value = value;
    this.engine = engine; 
}

TextNode.prototype.clone = function () {
    return this;
}
```
22.枚举变量使用Pascal命名法，枚举的属性使用全部字母大写，单词间下划线分隔得命名方式
```javascript
var TargetState = {
    READING: 1,
    README: 2,
    APPLIED: 3,
    READY: 4
} 
```
23.命名空间 使用 Camel命名法。
```javascript
equipments.heavyWeapons = {};
```

24.由多个单词组成的缩写词，在命名中，根据当前命名法和出现的位置，所有字母的大小写与首字母的大小写保持一致。

```javascript
function XMLParser() {
}

function insertHTML(element, html) {
}

var httpRequest = new HTTPRequest();
```
25.类名使用名词
```javascript
function Engine(options) {
}
```
26.boolean类型的变量使用is或has开头
```javascript
var isReady = false;
var hasMoreCommands = false;
```

## 注释
1.单行注释
必须独占一行。//后跟一个空格，缩进与下一行被注释说明的代码一致
2.建议避免使用 /*...*/ 这样的多行注释。有多行注释内容时，使用多个单行注释。
3.为了便于代码阅读和自文档化，以下内容必须包含以/**...*/形式的块注释中。
文件
namespace
类
函数或方法
类属性
事件
全局变量
常量
AMD 模块
4.文档注释前必须空一行
5.类型定义都是以{开始, 以}结束。
常用类型如：{string}, {number}, {boolean}, {Object}, {Function}, {RegExp}, {Array}, {Date}。

类型不仅局限于内置的类型，也可以是自定义的类型。比如定义了一个类 Developer，就可以使用它来定义一个参数和返回值的类型。
6.对于基本类型{string},{number},{boolean}，首字母必须小写
## 文件注释
文件顶部必须包含文件注释，用@file标识文件说明。
建议文件注释中可以用@author标识开发者信息
```javascript
/**
*@file Describe the file
*/

/*
*@file Describe the file
*@author author-name(mail-name@domain.com)
         author-name2(mail-name@domain.com)
*/
```
## 命名空间注释
建议命名空间使用 @namespace 标识。
    使用 @class 标记类或构造函数。
    使用 @extends 标记类的继承信息。
    ```javascript
    /**
    * 描述
    *
    *@namespace
    * @class
    * @extends Developer
    */
    function Fronteer() {
        Developer.call(this);
        // constructor body
    }
    util.inherits(Fronteer, Developer);
    ```
1.使用包装方式扩展类成员时，必须通过@lends进行重新指向。
```javascript
/**
 * 类描述
 *
 * @class
 * @extends Developer
 */
function Fronteer() {
    Developer.call(this);
    // constructor body
}

util.extend(
    Fronteer.prototype,
    /** @lends Fronteer.prototype */{
        _getLevel: function () {
            // TODO
        }
    }
);
```
## 函数/方法注释
1.函数/方法注释必须包含函数说明，有参与和返回值时必须使用注释标识
2.参数和返回值注释必须包含类型信息和说明
3.当函数是内部函数,外部不可访问时，可以使用@inner标识
```javascript
/**
 * 函数描述
 *
 * @param {string} p1 参数1的说明
 * @param {string} p2 参数2的说明，比较长
 *     那就换行了.
 * @param {number=} p3 参数3的说明（可选）
 * @return {Object} 返回值描述
 */
function foo(p1, p2, p3) {
    var p3 = p3 || 10;
    return {
        p1: p1,
        p2: p2,
        p3: p3
    };
}
```
4.对Object中各项的描述，必须使用@param标识
```javascript
/**
*函数描述
*
*@param {Object} option 参数描述
*@param {string} option.url option项描述
*@param {string=} option.method option项描述，可选参数
*/
function foo(option) {
    // TODO
}
```
## 事件注释
1.必须使用@event标识事件，事件参数的标识方法与方法描述的参数标识相同

```javascript
/**
*值变更时触发
*
*@event
*@param {Object} e e描述
*@param {string} e.before before描述
*@param {string} e.after after描述
*/
onchange: function (e) {
}
```
## 常量注释
1.常量必须使用@const 标记，并包含说明和类型信息
```javascript
/*
*常量说明
*
*@const
*@type {string}
*/
var REQUEST_URL = 'myurl.do'
```
## AMD模块注释
1.AMD模块使用@module或@exports标识
# 语言特性
## 变量
1.变量在使用前必须通过var定义
不通过 var 定义变量将导致变量污染全局环境。
```javascript
var name = 'MyName';
```
2.每个var只能声明一个变量
一个 var 声明多个变量，容易导致较长的行长度，并且在修改时容易造成逗号和分号的混淆。

```javascript
var hangModules = [];
var missModules = [];
var visited = {};
```
3.变量必须即用即声明，不得在函数或者其它形式的代码块起始位置统一声明所有变量
```javascript
function kv2List(source) {
    var list = [];

    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            var item = {
                k: key,
                v: source[key]
            };
            list.push(item);
        }
    }

    return list;
}
```
## 条件
1.在 Equality Expression 中使用类型严格的 ===。仅当判断 null 或 undefined 时，允许使用 == null。
(使用===可以避免等于判断中隐式的类型转换)
```javascript
if (age === 30) {
}
```
建议尽可能使用简洁的表达式
```javascript
//字符串为空

if (!name) {
}

//字符串非空
if(name) {
}

//数组非空
if(collect.length) {
}

//布尔不成立
if (!notTrue) {
}


```

建议按执行频率排列分支的顺序。
(按执行频率排列分支的顺序好处是：
1.阅读的人容易找到最常见的情况，增加可读性。
2.提高执行效率。
)

建议对于相同变量或表达式的多值条件，用switch代替if
```javascript
switch (typeof variable) {
    case 'object':
    // ......
    break;
    case 'number':
}
```
建议如果函数或全局中的else块后没有任何语句，可以删除else
```javascript
function getName() {
    if (name) {
        return 'name';
    }
    return 'unname';
}
```

## 循环
建议不要在循环体中包含函数表达式，事先将函数提取到循环体外。

建议对循环内多次使用的不变值，在循环外用变量缓存

建议对有序集合进行遍历时，缓存length

## 类型

建议类型检测优先使用 typeof。对象类型检测使用 instanceof。null 或 undefined 的检测使用 == null

```javascript
//string
typeof variable === 'string'

//number
typeof variable === 'number'

//boolean
typeof variable === 'boolean'

//Function
typeof variable === 'function'

//Object
typeof variable === 'object'

//RegExp
variable instanceof RegExp

//Array
variable instanceof Array

//null
variable === null
//null or undefined
variable == null

//undefined
typeof variable === 'undefined'
```
## 类型转换
建议转换成string时，使用+ ''
```javascript
num + ''
```
建议转换成number时，通常使用 +
```javascript
+str
```
建议string 转换成 number，要转换的字符串结尾包含非数字并期望忽略时，使用 parseInt。
```javascript
var width = '200px';
parseInt(width,10);
```
1.使用parseInt时,必须指定进制
```javascript
parseInt(str,10);
```
建议转换成boolean时，使用!!
```javascript
var num = 3.14;
!!num;
```
建议number去除小数点，使用Math.floor/Math.round/Math.cell，不使用parseInt
```javascript
var num = 3.14;
Math.ceil(num);
```
## 字符串
1.字符串开头和结尾使用单引号''
```javascript
var str = '我是字符串';
var html = '<div class="cls">aaaaa</div>'
```
建议使用数组或+拼接字符串
var str = [
    '<ul>',
        '<li>第一项</li>',
        '<li>第二项</li>',
    '</ul>'
].join('');
//使用 + 拼接字符串
var str2 = ''
    + '<ul>',
    +   '<li>第一项</li>'，
    +   '<li>第二项</li>'，
    + '</ul>';

## 对象
1.使用对象字面量{} 创建新object
```javascript
var obj = {};
```
2.对象创建时，如果一个对象的所有属性均可以不添加引号，则所有属性不得添加引号
```javascript
var info = {
    name: 'someone',
    age: 21
}
```
3.对象创建时，如果任何一个属性需要添加引号，则所有属性必须添加'
```javascript
var info = {
    'name': 'someone',
    'age': 21,
    'more-info': '...'
}
```
4.不允许修改和扩展任何原生对象和宿主对象的原型
```javascript
//以下行为绝对禁止
String.prototype.trim = function () {

}
```
建议对象访问时，尽量使用.
```javascript
info.age
```
建议 for in遍历对象时,使用hasOwnProperty过滤掉原型中的属性

```javascript
var newInfo = {};
for (var key in info) {
    if (info.hasOwnProperty(key)) {
        newInfo[key] = info[key];
    }
}
```
## 数组
1.使用数组字面量[]创建新数组，除非想要创建的是指定长度的数组。
```javascript
var arr = [];
```
2.遍历数组不使用 for in
数组对象可能存在数字以外的属性，这种情况下for in 不会得到正确结果 

```javascript
var arr = ['a','b','c'];
//正确的遍历方式
for (var i = 0,len = arr.length;i < len;i++) {
    console.log(arr[i]);
}
```
建议不因为性能的原因自己实现数组排序功能，尽量使用数组的sort方法
建议清空数组使用.length = 0;

## 函数
建议一个函数长度控制在50行以内
```javascript
// 直接阅读该函数会难以明确其主线逻辑，因此下方是一种更合理的表达方式：

function syncViewStateOnUserAction() {
    syncXStateToView();
    checkAAvailability();
}

function syncXStateToView() {
    if (x.checked) {
        y.checked = true;
        z.value = '';
    }
    else {
        y.checked = false;
    }
}

function checkAAvailability() {
    if (!a.value) {
        displayWarningForAMissing();
    }
    else {
        clearWarnignForA();
    }
}
```
## 参数设计
建议一个函数的参数控制在6个以内
建议通过options参数传递非数据输入型参数
```javascript
/*
* 移除某个元素
*
* @param {Node} element 需要移除的元素
* @param {Object} options 相关逻辑配置
* @param {boolean} options.removeEventListeners 是否同时将所有注册在元素上的事件移除
*/
function removeElement(element, options) {
    element.parent.removeChild(element);
    if (options.removeEventListeners) {
        element.clearEventListeners();
    }
}
```
## 空函数
建议空函数不使用 new Function()的形式

```javascript
var emptyFunction = function () {};
```
建议对于性能有高要求的场合，建议存在一个空函数的常量，提供多处使用共享。
```javascript
var EMPTY_FUNCTION = function () {};

function MyClass() {
}

MyClass.prototype.abstractMethod = EMPTY_FUNCTION;
MyClass.prototype.hooks.before = EMPTY_FUNCTION;
MyClass.prototype.hooks.after = EMPTY_FUNCTION;
```
## 面向对象
1.类的继承方案，实现时需要修正 constructor
```javascript
/**
 * 构建类之间的继承关系
 * 
 * @param {Function} subClass 子类函数
 * @param {Function} superClass 父类函数
 */
function inherits(subClass, superClass) {
    var F = new Function();
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
}
```
2.自定义事件的事件名必须全小写
3.自定义事件只能有一个event参数，如果事件需要传递较多信息，应仔细设计事件对象
建议尽量不要使用with 减少delete的使用

# 浏览器环境
## dom
建议对于单个元素，尽可能使用document.getElementById获取，避免使用document.all
[建议] 对于多个元素的集合，尽可能使用 context.getElementsByTagName 获取。其中 context 可以为 document 或其他元素。指定 tagName 参数为 * 可以获得所有子元素。
```javascript
<div></div>
<span></span>
<script>
var elements = document.getElementsByTagName('*');
//显示为DIV
alert(elments[0].tagName);
</script>

