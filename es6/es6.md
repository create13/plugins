### es6知识点
1. let在for循环之类的里面用 在外面获不到会报错
2.const定义常量 不能改变 但是可以定义let user ={name:"ll",age:24}
const KT =user;这时user中的内容可以改变，因为const的指针对应的是user的id 而不是内存中的数值  
3.变量的解构赋值(数组)let[a,b,c]=[1,2,3]
4.变量的解构赋值(对象)let {a,b,c}={a:1,b:2,c:3}
let {arr:[q,{s}]}={arr:["asw",{s:1}]}
let {length}="ty";
console.log(length)  结果2
5.新增字符串方法
let de="you";
de.includes(o);    结果true
de.startsWith(y);  true
de.endsWith(u) true
de.repeat(3);youyouyou
6.模板字符串
let title = "中国人";
let fonts = "family";
let really = `<div>   
<span>${title}</span>
</div>`

`<div>   
<span>${title + `
`<div>   
<span>${fonts}</span>
</div>`}</span>
</div>`
7.symbol类型
以前的数据类型 undefined null Boolean String Number Object
现在新增一个数据类型 symbol
let a = Symbol();
let b = Symbol();
console.log(a === b);   //输出false

let name = Symbol();
// file1.js
{
    var person = {};
    person[name] = 'file1';
    console.log('person[name]:',person[name]);
}
// file2.js
{
    let name = Symbol();
    person[name] = 'file2';
    console.log('person[name]:',person[name]);
}
8.Proxy
var user = new Proxy({},{
    get: function(obj,prop){
        switch (prop) {
            case 'full_name':
                return obj.fname + ' ' + obj.lname; 
        } 
       
    },set: function(obj,prop) {
    
    }
})
user.fname = 'Bob';
user.lname = 'Wood';
console.log('user.full_name:',user.full_name);
9.set
var arr = [1,2,3,3];
var s = new Set([1,2,3,3]);
console.log(arr); // [1,2,3,3]
console.log(s);  // [1,2,3] 每个值都是唯一的 传入多个相同的值，只会保留一个
s.size 检查数组长度
s.add(4);
console.log(s)  // [1,2,3,4]
s.delete(2);
console.log(s)  // [1,3,4]
s.has(5);
console.log(s.has(5))  //返回false
console.log(s.has(3))  //返回true
s.clear(); 将数组全部清空
console.log(s.clear()) //返回[]