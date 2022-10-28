<template>
  <div v-if="ready" id="app">
    <Header :index="index" v-if="!noHeader"></Header>
    <router-view class="mainbody" />
    <Footer v-if="!noFooter"></Footer>
    <div class="clues-collect">
      <a target="_blank" href="https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1nzHurQ&scene=SCE00008552">
      <el-button type="primary" icon="el-icon-service">
        在线客服
      </el-button>
      </a>
    </div>
  </div>
</template>

<script>
import Header from "./components/header";
import Footer from "./components/footer";
import Vue from "vue";
import { getGroupId, selectGroup, setUserInfo } from "Lib/commons";
import { getParameterByName, tologin } from "@/utils/util";
import {setToken,setReflashToken,getToken} from '@/utils/oauth'
import network from "@/api/jxapi";
// import VConsole from 'vconsole'

export default {
  name: "App",
  data() {
    return {
      ready: false,
      index: "homepage",
      noFooter: true,
      noHeader: true,
    };
  },
  async created() {
    // 手机版提示，隐藏
    // if(process.env.NODE_ENV != 'production'){
    //   new VConsole();
    // }

    // 检查是否需要自动登录 2020-6-12
    if (getParameterByName("autoLogin")) {
      let url = location.href;
      url = url.substring(0, url.indexOf("autoLogin=") - 1);
      return tologin(url);
      console.log("ceshi发布")
    }
    let ticket = getParameterByName("ticket");
    if (!ticket) return (this.ready = true);
    let res = await network.getTokenbyticket({
      data: {
        ticket: ticket,
      },
    });
    if (res == "error") return;
    setToken(res.access_token);
    setReflashToken(res.refresh_token)
    await setUserInfo.call(this);

    this.$store.state.islogin = true;
    this.ready = true;
  },

  async mounted() {
    if (location.href.indexOf("/details") == -1 && !this.$noAuthority)
      await this.$store.dispatch("setAuthority");

    if (!getGroupId() && getToken())
      await selectGroup(null, true);
    Vue.prototype.$message.error = (msg) =>
      this.$message({ showClose: true, message: msg, type: "error" });
    Vue.prototype.$message.success = (msg) =>
      this.$message({ showClose: true, message: msg, type: "success" });
    Vue.prototype.$message.info = (msg) =>
      this.$message({ showClose: true, message: msg, type: "info" });
    Vue.prototype.$message.warning = (msg) =>
      this.$message({ showClose: true, message: msg, type: "warning" });
    if (location.hash == "#/") {
      this.index = "homepage";
    }else if(location.hash == '#/helpcenter'){
      this.index = 'helpcenter'
    }else if(location.hash == '#/experience'){
        this.index = 'experience'
    }else{
      this.index = "competition";
    }
  },
  watch: {
    $route: function (to, from) {
      if (getParameterByName("ticket")) {
        let url = location.href;
        url = url.substring(0, url.indexOf("ticket=") - 1);
        location.href = url;
      }

      this.noFooter = to.meta.noFooter;
      this.noHeader = to.meta.noHeader;

      if (to.path == "/") {
        this.index = "homepage";
      }else if(to.path == '/helpcenter'){
        this.index = 'helpcenter'
      }else if(to.path == '/experience'){
        this.index = 'experience'
      }else {
        this.index = "competition";
      }
    },
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

html,
body {
  font-family: "PingFang SC", "Source Han Sans", "Microsoft Yahei", "Heiti SC";
  /* overflow-y: hidden; */
}
/* html,body,#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
} */
/* .el-card{
  width: 100%;

} */
.inlineText {
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
  overflow: hidden;
}
a {
  text-decoration: none;
  color: #000;
  font-family: PingFang-SC-Regular;
}

ol,
ul {
  list-style: none;
}
/*文字溢出隐藏用省略号代替*/
.textOverflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cha-pagination {
  height: 6.25rem;
  position: relative;
  margin: 3.125rem auto 0;
}
.cha-pagination .cha-page {
  position: absolute;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline;
}
/*图标库*/
@font-face {
  font-family: 'iconfont';  /* project id 674937 */
  src: url('//at.alicdn.com/t/font_674937_jnwdthbopcp.eot');
  src: url('//at.alicdn.com/t/font_674937_jnwdthbopcp.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_674937_jnwdthbopcp.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_674937_jnwdthbopcp.woff') format('woff'),
  url('//at.alicdn.com/t/font_674937_jnwdthbopcp.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_674937_jnwdthbopcp.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
/*图标颜色*/
.iconfont-down {
  color: #4199ff;
}
.iconfont-add {
  color: #4a4a4a;
}
/*上传图标*/
.icon-up {
  color: #1d86ff;
  font-size: 40px;
  display: inline-block;
  margin: 21px 0;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.clearfix {
  *zoom: 1;
}

#app {
  width: 100%;
  min-width: 60em;
  text-align: center;
  color: #4a4a4a;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  /* padding-top: 4rem;
  padding-bottom: 2rem; */
  /* margin-top: 60px; */
  background: linear-gradient(to bottom, #e4e6e8 0%, #f4f6f9 5%, #f8fafc 100%);
}
.mainbody {
  min-height: calc(100vh - 60px - 36px - 154px);
  /* background: #fff; */

}
/* .mainbody:hover {
  overflow-y: auto;
}
.mainbody {
  padding-right: 17px;
  padding-left: 3px;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
} */
/*  竞赛报名表选中行背景色 */
.cellClass {
  background-color: #ecf5ff !important;
}
.cellClass > td {
  background-color: #ecf5ff !important;
}

/* 超出省略号 */
.ellipsis {
  overflow: hidden;
  word-break: break-all;
  display: -webkit-box;
  /*! autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.clues-collect {
  position: fixed;
  /* 20201203挡住了发布竞赛，位置调整 */
  top: 90%;
  transform: translateY(-50%);
  z-index: 1001;
  right: 10px;
}
</style>
