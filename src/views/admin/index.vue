<template>
  <div class="admin">
    <el-container v-if="canshow">
      <el-aside width="180px" v-if="show">
        <aside-nav :show="show" :change="changeAside" />
      </el-aside>
      <el-main>
        <div v-if="$route.path !== '/admin/compic'" class="maintop">
          <div v-if="!show" @click="show = true" class="smallshow">
            <i class="iconfont" style="font-size: 20px">&#xe6a2;</i>
          </div>
          <div style="margin-left: 25px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>竞赛管理</el-breadcrumb-item>
              <el-breadcrumb-item v-if="name">{{ name }}</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>{{ title }}</h2>
          </div>
        </div>
        <router-view class="maindetial" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import asideNav from "./common/aside";
import { mapState } from "vuex";
export default {
  components: {
    asideNav,
  },
  async created() {
    console.log(this.$route.path == "/admin/compic");
    await this.$store.dispatch("setAuthorityByCodeNoID", {
      // cId:this.competitionId,
      codes: [
        "setCertificate",
        "manageCompetitionList",
        "managePlatform",
        "manageRegistration",
        "competyReviewDetail",
        "manageFinance",
        "manageQuestionnaire",
        "selectExpert",
        "uploadSignUpFile",
        "expertPool",
      ],
    });
    this.canshow = true;
  },
  computed: mapState({
    authority: (state) => state.authorityManagement,
  }),
  data() {
    return {
      canshow: false,
      name: "",
      title: "",
      show: true,
    };
  },
  methods: {
    changeAside(show, name, title) {
      this.show = show;
      this.name = name;
      this.title = title;
    },
  },
};
</script>

<style lang="less" scoped>
.admin {
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow-y: auto;
}

/deep/ .el-main {
  width: 100%;
  padding: 0;
  background: #f0f2f4;
  position: relative;
  z-index: inherit;
  // overflow: auto;
}

.maintop {
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(210, 207, 207, 0.5);
  height: 100px;
  font-size: 12px;
  color: #4a4a4a;
  text-align: left;
  position: fixed;
    width: calc(100% - 235px);
    margin: 0 20px;
    z-index: 2;
  > div {
    float: left;
  }
  .smallshow {
    width: 50px;
    height: 50px;
    line-height: 50px;
    background: #161c22;
    text-align: center;
    color: #fff;
    background-image: linear-gradient(0deg, #0078e2 0%, #2bd2b3 100%);
    cursor: pointer;
  }
  .el-breadcrumb {
    padding: 25px 0 10px 0;
  }
  h2 {
    font-size: 18px;
    color: #4a4a4a;
  }
}
.maindetial {
  margin: 4px 20px;
  background: #ffffff;
  padding: 20px;
  min-width: 1080px;
  margin-top: 100px;
}
.el-container {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.el-aside {
  overflow: hidden;
  background-color: rgb(37, 44, 53);
  color: #333;
  text-align: left;
}
</style>
