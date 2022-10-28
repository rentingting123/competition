<template>
    <div class="wrapper">
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="域名指向" name="domain">
                <skinSet v-if="activeName=='domain'" />
              </el-tab-pane>
              <el-tab-pane label="开通国省赛模块" name='openskin'>
                  <openskin v-if="activeName=='openskin'" :set='setBase'/>
              </el-tab-pane>
              <el-tab-pane v-if="base" label="基础设置" name='basemessage'>
                  <baseing v-if="activeName=='basemessage'"/>
              </el-tab-pane>
              <el-tab-pane label="新闻通知" name='newsnotice'>
                  <newsnotice v-if="activeName=='newsnotice'"/>
              </el-tab-pane>
              <el-tab-pane label="会议培训" name='training'>
                  <training v-if="activeName=='training'"/>
              </el-tab-pane>
              <el-tab-pane label="投稿管理" name='submission'>
                  <submission v-if="activeName=='submission'"/>
              </el-tab-pane>
            </el-tabs>
            <router-view v-if="false"></router-view>
        </div>
    </div>
</template>
<script>
import baseing from './common/base'
import newsnotice from './common/news/newsnotice'
import training from './common/train/training'
import submission from './common/submission'
import openskin from './common/openskin'
import skinSet from './common/skin'
import { mapState } from 'vuex'

export default {
    components:{
        baseing,
        newsnotice,
        training,
        submission,
        openskin,
        skinSet,
    },
  data() {
    return {
      activeName: "domain",
      base: false,
    };
  },
  computed:{
    ...mapState({
        authority:state => state.authorityManagement,
    })
  },
  created(){
    if(!this.authority.managePlatform){
        this.$message.error('无权限访问该页面')
        location.href = location.origin;
    }
  },
  methods: {
    setBase(){
      this.base = true
    },

    handleClick(tab, event) {
      //console.log(tab, event);
    },

  }
};
</script>
<style lang="less" scoped>
.wrapper {
  // 固定头部
  text-align: left;
  background: #ffffff;
  >div{
      // width: 1200px;
      height: 100%;
      padding: 20px;
  }
}
</style>
