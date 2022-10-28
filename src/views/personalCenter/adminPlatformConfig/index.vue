<template>
  <div class="wrapper">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="域名指向" name="domain">
        <domainSet v-if="'domain'==activeName"/>
      </el-tab-pane>
      <el-tab-pane label="设置logo" name="logo">
        <logoSet v-if="'logo'==activeName"/>
      </el-tab-pane>
      <el-tab-pane label="轮播banner" name="banner">
        <bannerSet v-if="'banner'==activeName"/>
      </el-tab-pane>
      <el-tab-pane label="合作伙伴及机构" name="partner">
        <partnerSet v-if="'partner'==activeName"/>
      </el-tab-pane>
      <el-tab-pane label="竞赛" name="competitions">
        <competitionSet v-if="'competitions'==activeName"/>
      </el-tab-pane>
      <el-tab-pane label="推荐文章" name="news">
        <newsSet v-if="'news'==activeName"/>
      </el-tab-pane>
      <el-tab-pane label="推荐搜索竞赛" name="searchList">
        <searchCompetitionsSet v-if="'searchList'==activeName"/>
      </el-tab-pane>
      <!-- 暂时由后台提供数据 -->
      <el-tab-pane v-if="false" label="设置数量" name="numbers">
        <numbersSet v-if="'numbers'==activeName"/>
      </el-tab-pane>

      <!-- 不知道干啥的，隐藏20200924 -->
      <!-- <el-tab-pane label="竞赛推荐" name="competition">
        <compety-rec></compety-rec>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import competyRec from "./common/competyRec";
import bannerSet from './common/banner'
import logoSet from './common/logo'
import domainSet from './common/domain'
import partnerSet from './common/partner'
import competitionSet from './common/competitions'
import newsSet from './common/news'
import numbersSet from './common/numbers'
import searchCompetitionsSet from './common/searchCompetitions'

export default {
  data() {
    return {
      activeName: "domain",
    };
  },
  components: {
    competyRec,
    bannerSet,
    logoSet,
    domainSet,
    partnerSet,
    competitionSet,
    newsSet,
    numbersSet,
    searchCompetitionsSet,
    
  },
  created() {
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  }
};
</script>
<style lang="less">
</style>
