/*var jsoned = require('./str.js');*/
var fnstr = require('./str.js');
require('../css/index.css');
/*在package.json里将scripts里面的test内容注销掉，并新增 "build":"webpack" 设置后终端命令敲npm run build 效果与直接输入webpack是相同的*/
    /*"test": "echo \"Error: no test specified\" && exit 1"*/
document.write(fnstr("<div class='stySd'>第er次修改</div>"));
var $ =require('jquery');
$(".stySd").text("第二次修改").css({'background-color':'yellow'})
