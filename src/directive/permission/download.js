 /**
  * 文件下载 [fileURL,fileName]
  * Copyright (c) 2019 ruoyi
  */

 export default {
     inserted(el, binding, vnode) {
         const { value } = binding
         if (value && value instanceof Array && value.length > 0) {
             el.style.cssText = 'cursor: pointer;color:write;'
             el.addEventListener('click', (e) => {
                 let link = document.createElement('a')
                 let url = value[0]
                     // 这里是将url转成blob地址，
                 fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
                     link.href = URL.createObjectURL(blob)
                     link.download = value[1] || '下载文件'
                     document.body.appendChild(link)
                     link.click()
                 })
             })

         } else {
             throw new Error(`文件下载指令至少需要一个文件地址`)
         }
     }
 }