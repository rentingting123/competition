<template>
  <div>
    <div v-if="isAudio()">
      <div :id="`audio-div-${index}`"></div>
      <audio :src="url" style="width: 100%;" controls="controls">您的浏览器不支持 video 标签。</audio>
    </div>
    <div v-else-if="isVideo()">
      <video :src="url" style="width: 100%;" controlsList="nodownload"  controls="controls">您的浏览器不支持 video 标签。</video>
    </div>
    <div v-else-if="isImg()">
        <img :src="url" style="width: 100%;" alt="作品">
     </div>
      <div v-else-if="isPdf()||ow365Url">
      <div :id="`pdf-div-${index}`" v-loading="loading">
        <div v-if="displayType=='pdf'" >
        <div v-for="page in pageNum" :key="page" :id="`pdf-${index}-${page}`" ></div>
        </div>
        <div v-else-if="displayType=='img'" style="text-align:center">
          <img style='max-width:100%' v-for="item in imgList" :key="item" :src="item" />
        </div>
        <div v-else-if="displayType =='ow365'" :class="owClass" >
            <div class="ow365ctool">
                  <i v-if="owClass=='ow365m'" @click="owClass='ow365l'" class="el-icon-full-screen"></i>
                  <i v-if="owClass=='ow365l'" @click="owClass='ow365m'" class="el-icon-aim"></i>
            </div>
            <iframe style="width:100%;border:none;height:100%" :id="`we365-${index}`" :src="ow365Url"></iframe>
        </div>
      </div>
    </div>
    <div v-else>
      未匹配到显示格式
    </div>
  </div>
</template>

<script>

import network from '@@/utils/network'
import { loadJs } from "@@/utils/util";
//ow365参数
const ow365={
  i:'28879',
  url:'oss.moocollege.com',
}
export default {

  name: "FileReview",
  props: ["url", "index", 'isdownload'],
  data() {
    return {
      ow365Url:'',
      name: "free9",
      videoList: ["mp4", "avi"],
      audioList: ["mp3"],
      imgListExt:["jpg",'png','jpeg','gif'],
      pageNum:0,
      loading:false,
      imgList: [],
      displayType: 'img',
      owClass:'ow365m'
    };
  },
  mounted() {
   
    window.document.oncontextmenu = function(){return false}
    if (this.isPdf()) {
      //todo判断可以下载执行取消工具栏
     if(this.isdownload){
        this.pdfObj(1)
      }else{
        // this.pdfObj(0)
        this.pdfLoad()
      }
    }
  },
  beforeDestroy(){
     window.document.oncontextmenu = null
  },
  methods: {
    //判断是否可以使用ow365 加载
    checkOw(url){
      return url.indexOf(ow365.url)>-1
    },
    //使用365 加载文件
    loadByOw365(file){
      this.displayType='ow365'
      //ow365https没法使用高清模式
       this.ow365Url=`https://ow365.cn/?i=${ow365.i}&ssl=1&furl=${file}`
     // this.ow365Url=`http://ow365.cn/?i=${ow365.i}&ssl=1&n=7&furl=${file}`
    },
  
    pdfObj(toolbar){
      this.loading=true
          let _url =
        this.url.indexOf("http:") > -1
          ? this.url.replace("http:", "https:")
          : this.url;
      try{
        console.log(toolbar)
         PDFObject.embed(_url,`#pdf-div-${this.index}`,{pdfOpenParams: {view: "FitV",toolbar:toolbar}})
         this.loading=false
      }
      catch(e){
        loadJs("https://web.moocollege.com/cc/pdfobject.min.js").then(this.pdfObj.bind(this,toolbar))
      }
    },
    renderPDF(pdf, ci) {
      pdf.getPage(ci).then(page => {
        // 设置展示比例
        const scale = 1.5;
        // 获取pdf尺寸
        const viewport = page.getViewport({scale:scale});
        // 获取需要渲染的元素
        const canvas = document.createElement("canvas");
        canvas.setAttribute("style", "width: 100%");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const container = document.getElementById(`pdf-${this.index}-${ci}`);

        container.appendChild(canvas);

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        page.render(renderContext);
      });
    },

    async pdfLoad(){
      let _url =
        this.url.indexOf("http:") > -1
          ? this.url.replace("http:", "https:")
          : this.url;
      if(this.checkOw(_url))return this.loadByOw365(_url)

      this.loading = true
      const res = await network.node('pdf/get', {data: { url: _url }});
      if(res=="error"||res.list.length<1){

        const PDFJS = require("pdfjs-dist")
        const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry.js')
        PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

        this.displayType = 'pdf';
        let CMAP_URL = 'https://competition-web.oss-cn-hangzhou.aliyuncs.com/cmaps/'//'https://unpkg.com/pdfjs-dist@2.7.570/cmaps/'
        var loadingTask = PDFJS.getDocument({
          url:_url,
          cMapUrl: CMAP_URL,
          cMapPacked: true
        });
        loadingTask.promise.then( pdf => {
          this.pageNum = pdf.numPages
          for (let i = 1; i <= pdf.numPages; i++) {
            this.renderPDF(pdf, i);
          }
          this.loading = false
        }).catch(err=>{
          if(err.message == 'Failed to fetch')
          {window.location.reload()}
          this.$message("PDF文件加载失败："+err.message);
          this.loading = false;
          const errDom = document.createElement('div')
                errDom.innerHTML = "文件加载失败："+err.message
                errDom.className = 'err-pdf-dom'
          const container = document.getElementById(`pdf-div-${this.index}`);
                container.appendChild(errDom)
        });
      }else{
         console.log('res.list', res.list);
        this.imgList = res.list;
        this.displayType = 'img';
        this.loading = false;
      }
    },
    //判断是不是可以用pdf或者ow365加载
    isPdf() {
      if (this.url) {
        return this.url.endsWith(".pdf")||this.checkOw(this.url);
      }
      return false;
    },
    isAudio() {
      if (this.url) {
        const index = this.url.lastIndexOf(".");
        const extra = this.url.substring(index + 1);
        return this.audioList.includes(extra);
      }
      return false;
    },
    isVideo() {
      if (this.url) {
        const index = this.url.lastIndexOf(".");
        const extra = this.url.substring(index + 1);
        return this.videoList.includes(extra.toLowerCase());
      }
      return false;
    },
    isImg(){
       if (this.url) {
        const extra = this.url.split('.').pop();
        return this.imgListExt.includes(extra.toLowerCase());
      }
      return false;
    }
  }
};
</script>

<style>
.pdfobject-container{
  height: calc(100vh - 150px);
}
.err-pdf-dom{
  padding: 20px;
  color: red
}
</style>
<style lang="less" scoped>
  .ow365m{
    width: 100%;
    height: 60vh;
    position: relative;
  }
  .ow365l{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2001;
  }
  .ow365ctool{
    position: absolute;
    top: 1px;
    left: 88px;
    height: 34px;
    width: 34px;
    text-align: center;
    line-height: 34px;
    font-size: 20px;
    color: white;
    font-weight: bold;
    &:hover{
     background-color: #5a5a5a;
    }
    // ::before{
    //   float: left;
    //   width: 1px;
    //   height: 18px;
    //   background-color: rgba(0, 0, 0, 0.5);
    //   box-shadow: 0 0 0 1px rgb(255 255 255 / 8%);
    //   margin: 10px 3px;
    //   position: absolute;
    // }
  }
  
</style>
