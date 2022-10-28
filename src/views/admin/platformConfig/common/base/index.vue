<template>
  <div class="basic">
    <div class="basTab">
        <!-- 名称 -->
        <div class="setBanner allP">
            <p class="bastitle">
              <span>名称</span>
            </p>
            <el-input v-model="name" style="width: 400px;margin-top:10px;"></el-input>
        </div>
        <!-- 轮播图 -->
        <banners :lists='banList' :close='set'/>
        <!-- 上传视频 -->
        <videoSet :videourl='videourl' :close='set'/>
        <!-- 导航栏设置 -->
        <baseNavSet :navsList='navsList' :close='set'/>
        <!-- 上传竞赛手册 -->
        <pdfSet :value='pdf' :close='set'/>
        <!-- 上级首页地址 -->
        <homeUrlSet :value='homeUrl' :close='set'/>
        <!-- 电话邮箱基础设置 -->
        <bases :base='base' />
        <!-- 友情链接 -->
        <linkset :lists='links'/>
        <!-- 院士专家 -->
        <experts :lists='expertList' :close='set' />


        <div class="allP footer">
            <el-button type="primary" @click="setSkin">保存</el-button>
        </div>
    </div>
  </div>
</template>
<script>
import network from "@/api/jxapi";
import { getGroupId } from "@/utils/commons";
import baseNavSet from './common/baseNavSet'
import banners from './common/banner'
import experts from './common/expert'
import videoSet from './common/video'
import pdfSet from './common/pdf'
import homeUrlSet from './common/homeUrl'
import linkset from './common/links'
import bases from './common/base'

export default {
  data() {
    return {
        base: {
            phone: "",
            qq: "",
            wechat: "",
            email: "",
            recordZJ: '',
            recordICP: '',

        },
        pdf:'',
        homeUrl:'',
        links: [],
        videourl: "",
        banList: [],
        expertList: [],
        navsList: [],
        groupId: "",
        name: '',
    };
  },
  components: {
    baseNavSet,
    experts,
    banners,
    videoSet,
    pdfSet,
    homeUrlSet,
    linkset,
    bases,
  },
  async created() {
    this.groupId = getGroupId();
    if (!this.groupId) return;
    this.getSkin(this.groupId);
  },
  methods: {
    set(name, val){
        this[name] = val
    },
    async getSkin(id) {
      let res = await network.npgetSkin({
        data: {
          id: id + ""
        }
      });
      if (res == "error") return;
      this.banList = (res && res.banList) || [];
      this.name = (res && res.name) || '';
      this.expertList = (res && res.expertList) || [];
      this.links = (res && res.links) || [];
      this.videourl = (res && res.videourl) || "";
      this.base.qq = (res && res.qq) || "";
      this.base.wechat = (res && res.wechat) || "";
      this.base.phone = (res && res.phone) || "";
      this.base.email = (res && res.email) || "";
      this.base.recordZJ = (res && res.recordZJ) || "";
      this.base.recordICP = (res && res.recordICP) || "";
      this.pdf = (res && res.pdf) || "";
      this.homeUrl = (res && res.homeUrl) || "";
      this.navsList = (res && res.navsList) || []

    },
    getNormalNavsList(){
      return [
        {
            name: "首页",
            id: 0,
            show: true,
            disabled: true,
            path: "/home"
        },
        {
            name: "组织机构",
            id: 21,
            show: true,
            path: "/datacenter/news/organization"
        },
        {
            name: "制度文件",
            id: 20,
            show: true,
            path: "/datacenter/news/filesystem",
            childs: [
                {
                    name: "章程细则",
                    id: 201,
                    show: true,
                    path: "/datacenter/news/filesystem/29"
                },
                {
                    name: "文件通知",
                    id: 202,
                    show: true,
                    path: "/datacenter/news/filesystem/30"
                }
            ]
        },
        {
            name: "赛事动态",
            id: 22,
            show: true,
            path: "/datacenter/news/dynamicevents"
        },
        {
            name: "赛事回顾",
            id: 24,
            show: true,
            path: "/datacenter/half/eventreview"
        },
        {
            name: "成果展示",
            id: 321,
            show: true,
            path: "/datacenter/previousworks",
            childs: [
                {
                    name: "创新成果集",
                    id: 32,
                    show: true,
                    path: "/datacenter/half/filesystem/32"
                },
                {
                    name: "竞赛通讯",
                    id: 33,
                    show: true,
                    path: "/datacenter/half/filesystem/33"
                },
                {
                    name: "竞赛成果奖",
                    id: 34,
                    show: true,
                    path: "/datacenter/half/filesystem/34"
                }
            ]
        },
        {
            name: "省市分区赛",
            id: 6,
            show: true,
            path: "/datacenter/divisionseries"
        },
        {
            name: "媒体社评",
            id: 27,
            show: true,
            path: "/datacenter/news/mediaeditorial"
        },
        {
            name: "指导培训",
            id: 8,
            show: true,
            path: "/datacenter/trainingsession"
        },
        {
            name: "我要投稿",
            id: 9,
            show: true,
            path: "/datacenter/contribute",
            childs: [
                {
                    name: "心路历程",
                    id: 90,
                    show: true,
                    path: "/datacenter/contribute/0"
                },
                {
                    name: "科教协同",
                    id: 91,
                    show: true,
                    path: "/datacenter/contribute/1"
                },
                {
                    name: "研究论文",
                    id: 92,
                    show: true,
                    path: "/datacenter/contribute/2"
                },
                {
                    name: "总结交流",
                    id: 93,
                    show: true,
                    path: "/datacenter/contribute/3"
                },
                {
                    name: "媒体社评",
                    id: 94,
                    show: true,
                    path: "/datacenter/contribute/4"
                },
                {
                    name: "赛事简讯",
                    id: 95,
                    show: true,
                    path: "/datacenter/contribute/5"
                }
            ]
        }
      ]
    },
    async setSkin() {
      if (this.banList.length < 1) return this.$message.warning("请上传轮播图");
      if (!this.videourl) return this.$message.warning("请上传视屏");
       if (!this.pdf) return this.$message.warning("请上传pdf");
      if (!this.base.phone) return this.$message.warning("请填写电话");
      if (!this.base.qq) return this.$message.warning("请填写qq");
      if (!this.base.wechat) return this.$message.warning("请填写微信");
      if (!this.base.email) return this.$message.warning("请填写邮箱");
      if (this.links.length < 1) return this.$message.warning("请填写友情链接");
      for (let i in this.links) {
        if (!this.links[i].name)
          return this.$message.warning("请填写友情链接名字");
      }

      if(this.navsList.length<1){
        this.navsList = this.getNormalNavsList();
      }
      let param = {
        id: this.groupId + "",
        name: this.name,
        banList: this.banList,
        videourl: this.videourl,
        phone: this.base.phone,
        qq: this.base.qq,
        wechat: this.base.wechat,
        email: this.base.email,
        recordZJ: this.base.recordZJ,
        recordICP: this.base.recordICP,
        links: this.links,
        pdf:this.pdf,
        homeUrl:this.homeUrl,
        navsList: this.navsList,
        expertList: this.expertList,
      };
      let res = await network.npsetSkin({ data: param });
      if (res == "error") return;
      this.$message.success("设置成功");
    },
    
  }
};
</script>

<style lang="less">
.basic {
    width: 100%;
    height: 100%;
    background: #fff;
    .basTab {
       margin-top: 11px 0 100px;
        .allP {
            padding: 18px 30px 20px;
            border-bottom: 1px solid#F3F3F3;
        }
    }
    .footer{
        text-align: center;
    }
}
</style>
