const oss = require("ali-oss");
const co = require("co"),
    fs = require('fs'),
    path = require('path')
const config = require('./config')
const ossConfig = config.build.oss
const store = oss(ossConfig);

let JsRoot = path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, 'js/'),
    FontRoot = path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, 'fonts/'),
    ImgRoot = path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, 'img/'),
    CssRoot = path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, 'css/'),
    Html = path.resolve(config.build.assetsRoot),
    packageJson = require("./package.json"),
    webpath = packageJson.config,
    name = `cc/${webpath.webVersion}`
    upload(JsRoot,`${name}/static/js/`)
    upload(FontRoot,`${name}/static/fonts/`)
    upload(ImgRoot,`${name}/static/img/`)
    upload(CssRoot,`${name}/static/css/`)
    // upload(Html,`${name}/`)
    function upload(CssRoot,dir){
        fs.readdir(CssRoot, (err, file) => {
            if (err) return console.log(err);
            file.map(fileName => {
                co(function* () {
                    return yield store.put(`${dir}${fileName}`, `${CssRoot}/${fileName}`);
                }).then(val => {
                    console.log(`${val.name} has been uploaded to oss :${val.name}`);
                    fs.unlinkSync(`${CssRoot}/${fileName}`);
                    console.log(`file >> ${dir}${val.name} << upload success! delete file`);
                }).catch(err=>{
                    console.log(err);
                });
            })
        })
    }

    co(function* () {
        return yield store.put(`${name}/index.html`, `${Html}/index.html`);
    })
// fs.readFile(Icon, (err, buffer) => {
//     if (err) return console.log(err)
//     co(function* () {
//         return yield store.put(`${name}/favicon.ico`, Icon);
//     }).then(val => {
//         console.log(`${val.name} has been uploaded to oss :${val.name}`);
//         //fs.unlinkSync(Icon);
//         //console.log(`file >> ${name}/static/${val.name} << upload success! delete file`);
//     })
// })