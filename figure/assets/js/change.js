/**
* @description node生成json文件
* @param {String} res 获取到的mtlobj.log文件中的内容
 */
let fs = require('fs');
fs.readFile("../../data/mtlobj.log", function (err, res) {
    if (err) {
        return console.log(err);
    }
    let logStr = res.toString();
    let matchStr = /CM_CN_.*?_B1(?=.mtl)/gi;
    let containMtl = logStr.match(matchStr);
    let getArray = [];
    let idName = 1;
    let objStr = {};
    for (i = 1; i < containMtl.length; i++) {
        objStr = {
            "type": "Feature",
            "properties": {
                "id": ""+idName++,
                "heading": 90,
                "size": 1,
                "name": containMtl[i]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    121.476610,31.227467,-15
                ]
            }
        }
        getArray.push(objStr);
    }
    console.log(getArray);
    //getArray转化成字符串或者二进制
    var strArray = JSON.stringify(getArray);
    /**
    * @description 将生成内容写入到points.json文件
    * @param {Array} strArray 涵盖所有objStr对象的数组
    */
    fs.writeFile("../../data/points.json", strArray, function (err) {
        if (err) {
            console.log(err + "fail");
        }
        console.log("success");
    })


})