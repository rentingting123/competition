<template>
<!-- 使用 -->
<!-- <span @click="$router.push({path:'/issue',query:{cid:competitionId}})">发布新闻</span> -->
  <!--动态发布-->
  <div id="issue">
    <!--固定头部-->
    <div class="header_fixed">
      <div class="header_content">
        <p @click="$router.back()">返回</p>
      </div>
    </div>
    <div>
      <!--中间内容-->
      <div class="issue_main">
        <div class="issue_title">
          <span style="line-height:38px">动态标题：</span>
          <el-input placeholder="请输入标题" style="width:700px;" v-model="stateData.title"></el-input>
        </div>
        <div class="issue_img">
          <span>封面图：&nbsp;&nbsp;&nbsp;</span>
          <upload
            class="avatar-uploader"
            accept=".jpg, .png, .gif"
            name="attach"
            :showlist="false"
            :onSuccess="handleAvatarSuccess"
          >
            <img v-if="stateData.icon" :src="stateData.icon" class="avatar" />
            <i v-if="!stateData.icon" class="el-icon-plus avatar-uploader-icon"></i>
            <span v-if="!stateData.icon" class="layout">
              200kb以下
              <br />jpg/png/gif格式文件
            </span>
          </upload>
        </div>
        <!-- 20201116 要求去掉  -->
        <!-- <div class="issue_tag">
          <span>平台动态分类：</span>
          <el-checkbox-group class="tags" v-model="stateData.tags">
            <el-checkbox-button
              class="tag"
              v-for="city in newstype"
              :label="city.type"
              v-if="city.id<5"
              :key="city.id"
            >{{city.name}}</el-checkbox-button>
          </el-checkbox-group>
        </div> -->
        <div class="issue_tag">
          <span>动态分类：</span>
          <el-checkbox-group class="tags" v-model="stateData.tags">
            <el-checkbox-button
              class="tag"
              v-for="city in newstype"
              :label="city.type"
              :key="city.id"
            >{{city.name}}</el-checkbox-button>
          </el-checkbox-group>
        </div>

        <div class="issue_tag">
          <p>上传新闻：<small>（只可上传pdf文件，展示内容为上传的pdf内容）</small></p>
          <upload
            class="avatar-uploader"
            width='738px'
            accept=".pdf"
            name="attach"
            :showlist="false"
            :onSuccess="pdfSuccess"
            :beforeUpload="beforeAvatarUpload"
            style="margin:0 auto"
          >
            <div v-if="!stateData.pdfInfo" class="clearfix" style="margin:10px 0 10px 20px;">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <span  class="layout">
                40M以下
                <br /> pdf格式文件
              </span>
            </div>
          </upload>
          
        </div>
          <div v-if="stateData.pdfInfo" class="pdfupload">
              <FileReview  :url='stateData.pdfInfo' />
              <div class="pdfedit">
                <el-button type="primary" >修改</el-button>
                <el-button type="primary" @click.stop.prevent="delPdf">删除</el-button>
              </div>
            </div>

        <div>
          <p>动态内容:</p>
          <!--富文本编辑器-->
          <editor :setDate="setStateData" :stateData="stateData.news" />
        </div>

        <div class="issue_tag">
          <span>发布时间：</span>
          <el-date-picker v-model="time" type="datetime" placeholder="选择日期时间"></el-date-picker>
          <el-tooltip placement="top" content="选择当前时间以前将直接发布，选择未来时间则会在指定时间定时发布">
            <i class="el-icon-question" style="margin-right:5px;"></i>
          </el-tooltip>
        </div>

        <div class="header_right" v-if="publish">
          <el-button type="primary" @click="toSubmit">提交审核</el-button>
          <el-tooltip content="选择该新闻展示站点" placement="right">
            <i class="el-icon-question" style="margin-right:5px;"></i>
          </el-tooltip>
        </div>
      </div>
    </div>

    <!-- 提交审核 -->
    <el-dialog :close-on-click-modal= false  width="500px" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
      <div slot="title" class="dialog-title">
        提交审核 <span style="font-size:0.8em;">(审核通过后将在该上级平台显示)</span>
      </div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox 
          v-for="list in checkLists" 
          :key="list.id" 
          :label="list.id"
          >
          {{list.groupName}}
        </el-checkbox>
        <el-checkbox :label="1">摩课云竞赛平台首页</el-checkbox>
        <el-checkbox :disabled='true' label="" checked>自有平台（默认）</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" :loading='loading'>取消</el-button>
          <el-button type="primary" @click="editState" :loading='loading'>确定</el-button>
      </span>
    </el-dialog> 
  </div>
</template>


<script>
import network from "@@/api/jxapi/index";
import editor from "@@/components/editor/index";
import upload from "@@/components/fileUpload/index";
import FileReview from "@@/components/fileReview";
import { mapState } from "vuex";
import moment from "moment";
export default {
  props: ["close", "id", 'cid'],
  name: "issue",
  data() {
    return {
      dialogFormVisible: false, //弹窗
      checkList: [1],
      checkLists: [],
      time: "", // 定时发布时间
      stateData: {
        newsId: "",
        title: "",
        news: "",
        icon: "",
        publishTime: "",
        tags: []
      },
      newstype: [
        // {
        //   name: "通知动态",
        //   id: 1,
        //   type: "0"
        // },
        // {
        //   name: "新闻动态",
        //   id: 2,
        //   type: "1"
        // },
        // {
        //   name: "活动动态",
        //   id: 3,
        //   type: "2"
        // },
        // {
        //   name: "大赛回顾",
        //   id: 4,
        //   type: "3"
        // },
        {
          name: "制度文件",
          id: 5,
          type: "20"
        },
        {
          name: "组织机构",
          id: 6,
          type: "21"
        },
        {
          name: "赛事动态",
          id: 7,
          type: "22"
        },
        {
          name: "赛事回顾",
          id: 9,
          type: "24"
        },
        {
          name: "历届作品",
          id: 10,
          type: "25"
        },
        {
          name: "成果展示",
          id: 11,
          type: "26"
        },
        {
          name: "媒体社评",
          id: 12,
          type: "27"
        },
        {
          name: "寄语",
          id: 13,
          type: "28"
        },
        {
          name: "章程细则",
          id: 14,
          type: "29"
        },
        {
          name: "文件通知",
          id: 15,
          type: "30"
        },
        {
          name: "赛事简讯",
          id: 16,
          type: "31"
        },
        {
          name: "创新成果集",
          id: 17,
          type: "32"
        },
        {
          name: "竞赛通讯",
          id: 18,
          type: "33"
        },
        {
          name: "竞赛成果奖",
          id: 19,
          type: "34"
        },
        {
          name: "结果公示",
          id: 20,
          type: "100"
        }
      ],
      loading: false,
      bannerUrl: 'https://web.moocollege.com/mooc/hzq/competition/user_center/cerebrum.jpg',

    };
  },
  created() {
    // 官网设置中弹窗新增和修改，this.cid this.id
    // 创建的时候使用路由传参数 cid 竞赛id id 新闻id
    this.competitionId = this.cid || this.$route.query.cid || parseInt(localStorage.getItem("competitionId"));
    if (!this.competitionId) return;
    this.getCheckLists();
    this.getNormalPic()

    this.$store.dispatch("AuthorityDetails", this.competitionId);
    this.stateData.newsId = this.id || this.$route.query.id;
    if (this.stateData.newsId) {
      this.getList();
    }
  },
  components: {
    editor,
    upload,
    FileReview,
  },
  methods: {
    async getNormalPic(){
        let res = await network.getCompetitionDetail({ id: this.competitionId });
        if (res == "error") return;
        this.bannerUrl = res && res.bannerUrl || 'https://web.moocollege.com/mooc/hzq/competition/user_center/cerebrum.jpg'
    },
    async getCheckLists(){
      let res = await network.selectUpGroup();
      if(res=='error') return;
      if(res){
        this.checkLists = [...res, ...this.checkLists]
      }
    },
    setStateData(val) {
      this.$set(this.stateData, "news", val);
    },
    toSubmit(){
      if (!this.stateData.title) return this.$message.warning("请输入动态标题");
      if(!this.stateData.news && !this.stateData.pdfInfo){
        return this.$message.warning("请输入动态内容或上传pdf新闻");
      }
        
      let tags = this.stateData.tags.filter(val=>{
        return val!='0'&&val!='1'&&val!='2'&&val!='3'
      })
      if (tags.length < 1) return this.$message.warning("请选择动态分类");

      this.dialogFormVisible = true;
    },
    // 发布动态
    async editState() {

      if (!this.stateData.title) return this.$message.warning("请输入动态标题");
      if(!this.stateData.news && !this.stateData.pdfInfo){
        return this.$message.warning("请输入动态内容或上传pdf新闻");
      }
      
      let tags = this.stateData.tags.filter(val=>{
        return val!='0'&&val!='1'&&val!='2'&&val!='3'
      })
      if (tags.length < 1) return this.$message.warning("请选择动态分类");

      let newsIcon = this.stateData.icon || this.bannerUrl

      //1是发布  0 定时发布
      let publishStatus = !this.time || moment(this.time)<=moment() ? 1 : 0
      this.stateData.publishTime = this.time ? new Date(this.time).getTime() : new Date().getTime();

      let groupIds = [...this.checkList]
      let index = groupIds.indexOf('');
      groupIds.splice(index, 1)

      let newdata = {
        id: this.stateData.newsId,
        newsTitle: this.stateData.title,
        newsTime: this.stateData.publishTime + "",
        newsInfo: this.stateData.news,
        type: tags.join(","),
        newsIcon: newsIcon,
        competitionId: this.competitionId,
        publishStatus: publishStatus,
        groupIds: groupIds,
        pdfInfo: this.stateData.pdfInfo || '',
      };
      this.loading = true
      let setNews = await network.saveNews({ data: newdata });
      this.loading = false
      if (setNews == "error") return;
      this.$message.success("发布成功");
      this.dialogFormVisible = false;
      if (this.close) return this.close();
      this.$router.back();
    },
    handleAvatarSuccess(res) {
      this.stateData.icon = res.location;
    },
    pdfSuccess(res){
      this.$set(this.stateData, 'pdfInfo', null)
      this.$nextTick(()=>{
        this.$set(this.stateData, 'pdfInfo', res.location)
      })
    },
    delPdf(e){
      this.$set(this.stateData, 'pdfInfo', null)
    },
    beforeAvatarUpload(file) {
      const isLt = file.size / 1024 / 1024 < 40;

      if (!isLt) {
          this.$message.error("上传pdf大小不能超过 40M");
      }
      return isLt;
    },

    async getList() {
      let res = await network.getNewsDetail({
        data: { id: this.stateData.newsId }
      });
      if (res == "error") return;
      this.stateData = {
        newsId: res.id,
        title: res.newsTitle,
        news: res.newsInfo,
        icon: res.newsIcon,
        publishTime: res.publishTime,
        tags: res.newsType.split(","),
        pdfInfo: res.pdfInfo
      };
      this.time = parseInt(res.publishTime);
    }
  },
  
  computed: mapState({
    publish: state => state.authorityManagement.publishNews
  })
};
</script>


<style lang="less" scoped>
#issue {
  text-align: start;
  background: #fff;

  .header_fixed {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    background: #fdf6d0;
    position: sticky;
    top: 0px;
    z-index: 2;
    text-align: start;
    .header_content {
      width: 800px;
      margin: auto;
      cursor: pointer;
    }
  }
  .issue_main {
    padding-bottom: 100px;
    width: 800px;
    margin: 100px auto 0;
    text-align: start;
    .issue_title {
      margin-bottom: 30px;
      display: flex;
    }
    .issue_img {
      margin-bottom: 30px;
      display: flex;
    }
    .issue_tag {
      .tags {
        margin: 30px 0;
        .tag {
          margin: 10px;
          .el-checkbox-button__inner {
            border-radius: 30px !important;
          }
        }
      }
    }
    .header_right {
      margin: 30px 0;
    }
    .avatar-uploader .el-upload {
      border-radius: 5px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      background: #f0f2f4;
      border-radius: 5px;
      float: left;
    }
    .avatar {
      width: 178px;
      height: 120px;
      display: inline-block;
      float: left;
    }
    .layout {
      font-size: 12px;
      color: #9b9b9b;
      text-align: start;
      float: left;
      margin-top: 80px;
      margin-left: 10px;
    }
  }

  /deep/ .el-dialog__header {
    border-bottom: 1px solid #dedede;
  }
  /deep/.el-dialog__footer{
    padding: 10px 20px;
    border-top: 1px solid #dedede;
  }
  /deep/.el-checkbox{
    display: block;
    margin-top: 17px;
  }
  .pdfupload{
    position: relative;
    margin: 10px 0;
    &:hover{
      .pdfedit{
        display: flex;
      }
    }
    .pdfedit{
      width: 100%;
      padding: 50px 0;
      position: absolute;
      left: 0;
      top: 50px;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: flex-start;
    }

  }
}
</style>

<style lang="less">
.issue_tag {
  .el-checkbox-button__inner {
    border-radius: 30px !important;
  }
}
.issue_tag {
  .el-checkbox-button .el-checkbox-button__inner {
    border: 1px solid #dcdfe6;
  }
  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    border: 1px solid #409eff;
  }
}
.i-text {
  display: block;
  overflow: hidden;
  height: auto;
  background: red;
  // .ql-container.ql-snow {
  //   background-color: #fff;
  //   min-height: 300px;
  // }
}
</style>
