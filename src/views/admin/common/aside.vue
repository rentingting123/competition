<template>
  <div style="height: 100%">
    <h5 style="">
      <!-- <i class="iconfont">&#xe689;</i> -->
      <span v-if="authority.manageCompetitionList" slot="title">竞赛管理</span>
      <span v-else slot="title">高校竞赛数据服务</span>

      <div class="smallshow" style="">
        <i class="iconfont" @click="close()" style="font-size: 20px">&#xe6a2;</i>
      </div>
    </h5>
    <el-menu v-if="showMenu" :default-active="active" class="el-menu-vertical-demo" @select="handleSelect"
      background-color="#252C35" text-color="#fff" active-text-color="#1D86FF">
      <!-- <el-submenu>
                <template slot="title">
                  <i class="iconfont">&#xe688;</i>
                  <span>本校竞赛管理</span>
                </template>
                  <el-menu-item index="/admin/schoolComCreation">本校竞赛创建</el-menu-item>
                  <el-menu-item index="/admin/seedata">本校竞赛数据查看及导入导出</el-menu-item>
                  <el-menu-item index="/admin/schooldatatab">本校竞赛数据标签完善</el-menu-item>
                  <el-menu-item index="/admin/dataAudit">数据审核</el-menu-item>
             </el-submenu> -->
      <el-menu-item index="/admin/list" v-if="authority.manageCompetitionList">
        <i class="iconfont">&#xe688;</i>
        <span slot="title">竞赛列表</span>
      </el-menu-item>
      <el-menu-item index="/admin/regManagement">
        <i class="iconfont">&#xe66f;</i>
        <span slot="title">报名管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/workmanagement" v-if="authority.manageQuestionnaire">
        <i class="iconfont icon-zuopinguanli"></i>
        <span slot="title">作品管理</span>
      </el-menu-item>
      <el-menu-item index="/expert/login" v-if="authority.competyReviewDetail">
        <i class="iconfont">&#xe66d;</i>
        <span slot="title">评审管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/financialManagement" v-if="authority.manageFinance">
        <i class="iconfont">&#xe694;</i>
        <span slot="title">财务管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/cert" v-if="authority.setCertificate">
        <i class="iconfont">&#xe67f;</i>
        <span slot="title">证书管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/information" v-if="authority.manageQuestionnaire">
        <i class="iconfont icon-xiaoxizhongxin"></i>
        <span slot="title">消息管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/verify" v-if="authority.managePlatform">
        <i class="iconfont">&#xe619;</i>
        <span slot="title">信息审核</span>
      </el-menu-item>

      <el-menu-item index="/admin/logs" v-if="authority.managePlatform">
        <i class="iconfont">&#xe6cf;</i>
        <span slot="title">操作审计</span>
      </el-menu-item>

      <el-submenu index="/admin/leavmessage" v-if="authority.manageQuestionnaire || authority.managePlatform">
        <template slot="title">
          <i class="iconfont">&#xe688;</i>
          <span>官网管理</span>
        </template>
        <el-menu-item index="/admin/leavmessage" v-if="authority.manageQuestionnaire">
          <i class="iconfont icon-liuyan"></i>
          <span slot="title">留言管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/skin" v-if="authority.managePlatform">
          <i class="iconfont">&#xe670;</i>
          <span slot="title">官网设置</span>
        </el-menu-item>
        <el-menu-item index="/admin/collectionlist" v-if="authority.manageQuestionnaire">
          <i class="iconfont">&#xe629;</i>
          <span slot="title">调查问卷</span>
        </el-menu-item>
      </el-submenu>

      <!-- 2020-06-17 证书管理放在一个页面中 -->
      <!-- <el-submenu index="/admin/cert" v-if="authority.setCertificate">
                <template slot="title">
                    <i class="iconfont">&#xe67f;</i>
                    <span slot="title">证书管理</span>
                </template>
                <el-menu-item index="/admin/cert/setTemplate">模板设置</el-menu-item>
                <el-menu-item index="/admin/cert/generation">证书生成</el-menu-item>
            </el-submenu> -->

      <el-submenu index="/admin/competyManage" v-if="authority.manageQuestionnaire">
        <template slot="title">
          <i class="iconfont">&#xe688;</i>
          <span>数据服务</span>
        </template>
        <!-- <el-menu-item
          index="/admin/competyManage"
          v-if="authority.manageRegistration"
        >
          <i class="iconfont icon-shujutongji"></i>
          <span slot="title">数据管理</span>
        </el-menu-item> -->
        <el-menu-item index="/admin/empowerment" v-if="authority.manageRegistration">
          <i class="iconfont">&#xe6fb;</i>
          <span slot="title">信息管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/compic" v-if="authority.manageRegistration">
          <i class="iconfont">&#xe688;</i>
          <span slot="title">竞赛画像</span>
        </el-menu-item>
        <!-- <el-menu-item
          index="/admin/comData"
          dataManagement
          v-if="authority.manageRegistration"
        >
          <i class="iconfont icon-jiashicang"></i>
          <span slot="title">竞赛驾驶舱</span>
        </el-menu-item> -->
        <!-- // l 新增 -->
        <!-- <el-menu-item index="/admin/dataManagement"> -->
        <el-menu-item index="/admin/dataManagement">
          <i class="iconfont icon-jiashicang"></i>
          <!-- <span slot="title">数据管理222</span> -->
          <a :href="hostName+'compety#/competyManage'" target="_blank" style="color:#fff">数据管理</a>
        </el-menu-item>
      </el-submenu>
     
      <el-submenu index="/admin/competyManage" v-if="authority.manageRegistration && !authority.manageQuestionnaire && authority.dataService">
        <template slot="title">
          <i class="iconfont">&#xe688;</i>
          <span>数据服务</span>
        </template>
        <!-- index="/admin/empowerment" -->
        <el-menu-item >
          <i class="iconfont">&#xe6fb;</i>
          <!-- <span slot="title">数据管理111</span> -->
          <a :href="hostName+'compety#/competyManage'" target="_blank" style="color:#fff">数据管理</a>
        </el-menu-item>
        <el-menu-item index="/admin/collegeStyle" v-if="authority.manageRegistration && !authority.manageQuestionnaire">
          <i class="iconfont">&#xe688;</i>
          <span slot="title">高校概貌</span>
        </el-menu-item>
        <el-menu-item index="/admin/benchmarkingFocus"
          v-if="authority.manageRegistration && !authority.manageQuestionnaire">
          <i class="iconfont">&#xe688;</i>
          <span slot="title">对标分析</span>
        </el-menu-item>
        <el-menu-item index="/admin/compic" v-if="authority.manageRegistration && !authority.manageQuestionnaire">
          <i class="iconfont">&#xe688;</i>
          <span slot="title">竞赛画像</span>
        </el-menu-item>
        <!-- <el-menu-item index="">
          <i class="iconfont icon-shujutongji"></i>
          <span slot="title">数据核对</span>
        </el-menu-item> -->
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    authority: (state) => state.authorityManagement,
  }),
  props: ["change"],
  data() {
    return {
      active: "/admin",
      show: true,
      showMenu: false, //权限未加载出来时，不加载菜单
      hostName:'',
    };
  },
  mounted() {
    console.log(this.$store.state.toPortraitStorePathState, 'aside store');
  },
  async created() {
    this.hostName=process.env.NODE_ENV === 'production' ? 'https://rankadmin.moocollege.com/' : 'https://rankadmin.mycloudedu.net/'
    console.log(this.authority, 'this.authority');
    this.showMenu = true;
    this.active = this.$route.path;
    if (this.active == "/admin/" || this.active == "/admin") {
      if (!this.authority.manageCompetitionList &&this.authority.manageRegistration) {
        console.log(1111)
        this.$router.push("/admin/collegeStyle");
        this.active = "/admin/collegeStyle";
      } else if (!this.authority.manageCompetitionList &&this.authority.manageFinance) {
        console.log(222)
        this.$router.push("/admin/financialManagement");
        this.active = "/admin/financialManagement";
      }else if (this.authority.manageQuestionnaire &&this.authority.manageRegistration) {
        this.$router.push("/admin/compic");
        this.active = "/admin/compic";
      } 
      else {
        console.log(333)
        this.$router.push("/admin/regManagement");
        this.active = "/admin/regManagement";
      }
    }

    this.getName();
  },
  methods: {
    //      handleOpen(key, keyPath) {
    //     this.$router.push(key)
    //   },
    //   handleClose(key, keyPath) {
    //     this.$router.push(key)
    //   },
    handleSelect(key) {
      if (key == "/expert/login") {
        return window.open("http://" + location.host + key);
      }
      this.$router.push(key);
    },
    setName(active, name, title, flag) {
      flag && (this.active = active);
      return this.change && this.change(this.show, name, title);
    },
    getName(key = this.active) {
      if (key == "/admin") {
        this.setName(key, "", "", false);
      } else if (key == "/admin/list") {
        this.setName(key, "竞赛列表", "竞赛列表", false);
      } else if (key == "/createNewCompetition") {
        this.setName("/admin/list", "竞赛列表", "竞赛信息");
      } else if (key == "/admin/createNewCompetition") {
        this.setName("/admin/list", "竞赛列表", "竞赛信息");
      } else if (key == "/competition/entryGuide") {
        this.setName("/admin/list", "竞赛列表", "参赛指南");
      } else if (key == "/competition/Points") {
        this.setName("/admin/list", "竞赛列表", "赛项");
      } else if (key == "/competition/player") {
        this.setName("/admin/list", "竞赛列表", "选手");
      } else if (key == "/competition/team") {
        this.setName("/admin/list", "竞赛列表", "团队");
      } else if (key == "/competition/dynamicState") {
        this.setName("/admin/list", "竞赛列表", "动态");
      } else if (key == "/competition/6") {
        this.setName("/admin/list", "竞赛列表", "排行榜");
      } else if (key == "/competition/worksShow") {
        this.setName("/admin/list", "竞赛列表", "排行榜");
      } else if (key == "/admin/regManagement") {
        this.setName(key, "报名管理", "报名管理", false);
      } else if (key == "/admin/financialManagement") {
        this.setName(key, "财务管理", "财务管理", false);
      } else if (key == "/admin/cert") {
        this.setName(key, "证书管理", "证书管理", false);
      } else if (key == "/admin/workmanagement") {
        this.setName(key, "作品管理", "作品管理", false);
      } else if (key == "/admin/leavmessage") {
        this.setName(key, "留言管理", "留言管理", false);
      } else if (key == "/admin/information") {
        this.setName(key, "", "消息管理", false);
      } else if (key == "/admin/cert/setTemplate") {
        this.setName(key, "证书管理", "模版设置", false);
      } else if (key == "/admin/cert/update") {
        this.setName("/admin/cert/setTemplate", "证书管理", "模版设置");
      } else if (key == "/admin/cert/generation") {
        this.setName(key, "证书管理", "证书生成", false);
      } else if (key == "/admin/cert/generationlook") {
        this.setName("/admin/cert/generation", "证书管理", "查看证书");
      } else if ((key == "/admin/collectionlist", false)) {
        this.setName(key, "调查问卷", "调查问卷");
      } else if (key == "/admin/skin") {
        this.setName(key, "官网设置", "官网设置", false);
      } else if (key == "/admin/verify") {
        this.setName(key, "信息审核", "信息审核", false);
      } else if (key == "/admin/logs") {
        this.setName(key, "操作日志", "查看日志", false);
      } else if (key == "/admin/competyManage") {
        this.setName(key, "数据统计", "数据统计", false);
      }
      // else if (key == "/admin/comData") {
      //   /admin/dataManagement
      //   this.setName(key, "驾驶舱", "驾驶舱", false);
      // }
      else if (key == "/admin/dataManagement") {
        this.setName(key, "数据管理", "数据管理", false);
      }
      else if (key == "/admin/benchmarkingFocus") {
        this.setName(key, "对标重点", "对标重点", false);
      } else if (key == "/admin/collegeStyle") {
        this.setName(key, "高校概貌", "高校概貌", false);
      } else if (key == "/admin/surveyYear") {
        this.setName(key, "历年概况", "历年概况", false);
      } else if (key == "/admin/competitionArea") {
        this.setName(key, "竞赛地域", "竞赛地域", false);
      } else if (key == "/admin/competitionBenchmark") {
        this.setName(key, "竞赛标杆", "竞赛标杆", false);
      } else if (key == "/admin/comInformation") {
        this.setName(key, "竞赛信息", "竞赛信息", false);
      } else if (key == "/admin/competitionData") {
        this.setName(key, "竞赛数据", "竞赛数据", false);
      } else if (key == "/admin/dataAudit") {
        this.setName(key, "数据校对", "数据校对", false);
      } else if (key == "/admin/schoolComCreation") {
        this.setName(key, "本校竞赛创建", "本校竞赛创建", false);
      } else if (key == "/admin/seedata") {
        this.setName(
          key,
          "本校竞赛数据查看及导入导出",
          "本校竞赛数据查看及导入导出",
          false
        );
      } else if (key == "/admin/schooldatatab") {
        this.setName(
          key,
          "本校竞赛数据标签完善",
          "本校竞赛数据标签完善",
          false
        );
      } else if (key == "/admin/compic") {
        this.setName(key, "竞赛画像", "竞赛画像", false);
      }
    },
    close() {
      this.show = false;
      this.getName();
    },
  },
  watch: {
    $route(val) {
      this.getName(val.path);
    },
    '$store.state.toPortraitStorePathState': {
      handler(val) {
        if (val != '') {
          this.active = val
        }
      }
    }
  },
};
</script>

<style lang="less" scoped>
h5 {
  color: #fff;
  background: #252c35;
  text-align: center;
  line-height: 50px;
  // border-bottom: 1px solid rgba(255,255,255,0.5);
  border-bottom: 1px solid #ccc;
  font-size: 20px;
}

.el-menu {
  border-right: none;
}

.el-menu-vertical-demo {
  height: 100%;
}

.smallshow {
  width: 50px;
  height: 50px;
  background-image: linear-gradient(0deg, #0078e2 0%, #2bd2b3 100%);
  line-height: 50px;
  float: right;
  cursor: pointer;
}
</style>
