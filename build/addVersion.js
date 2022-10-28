const  fs = require('fs'),
packageJson = require("../package.json"),
webpath = packageJson.config,
neWebV = function(v){
    let arr = v.split('.')
    arr.push(parseInt(arr.pop())+1)
    return arr.join('.')
}(webpath.webVersion),
newJson = Object.assign({},packageJson,{config:{...webpath,webVersion:neWebV}})
fs.writeFileSync('./package.json',JSON.stringify(newJson),'utf8')