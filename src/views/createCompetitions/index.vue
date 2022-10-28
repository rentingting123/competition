<template>
  <div id="createNewCompetition" class="newCompetitionWrapper">
    <div class="header_fixed">
      <div class="header_content">
        <a href="javascript:;" @click="back()">返回</a>
      </div>
    </div>
    <div class="compety_detail">
      <div class="detail_top" style="position: relative">
        <div class="detail_top_msg">
          <upload
              width='300px'
              height='170px'
              class="avatar-uploader"
              accept=".jpg, .png, .jpeg, .gif"
              name="attach"
              drag
              :showlist="false"
              :beforeUpload="detectionId"
              :onSuccess="handTeacher"
              :disabled='finish==0'
              >
              <div class="default_img" v-if="!cerebrumImg">
                <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/cerebrum.jpg">
                <img class="upload_img" src="https://web.moocollege.com/mooc/hzq/competition/user_center/uploadImg.png">
              </div>
              <div v-else class="default_img">
                <img :src="cerebrumImg">
                <img class="upload_img" src="https://web.moocollege.com/mooc/hzq/competition/user_center/uploadImg.png">
              </div>
          </upload>
          <div class="detail_top_cnt">
            <div class="cnt_title">
              <p v-show="!titleShow">{{title}}
                <i class="el-icon-edit-outline" v-if="finish!=0" @click="showCompetitionTitle" style="color:#BABABA"></i>
              </p>
              <el-input type="text" v-show="titleShow" @blur="editCompetitionTitle" v-model="title"></el-input>
            </div>
            <div class="cnt_main">
              <p v-show="!contentShow">
                <span class="cnt_mainp">{{content}}</span>
                <i class="el-icon-edit-outline" v-if="finish!=0" style="color:#BABABA" @click="showCompetitionContent"></i>
              </p>
              <el-input v-show="contentShow" @blur="editCompetitionContent" v-model="content" maxlength="250" type="textarea" style="width:642px;height:80px"></el-input>
            </div>
          </div>
        </div>

        <!-- 时间轴 -->
        <div class="time_line" v-if="competitionId">
          <time-shaft :id="competitionId"></time-shaft>
        </div>

        <!-- end 时间轴 -->
      </div>
    </div>
    <!-- 菜单栏 -->
    <nav-set v-if="competitionId" :competitionId="competitionId" :setTabs='setTabs' ref='navset'/>

    <div class="detail_content" v-if="tabs.length>0">
      <router-view :tabs='tabs'></router-view>
    </div>

  </div>
</template>

<script>
  import network from '@/api/jxapi/index'
  import { getGroupId } from '@@/utils/commons'
  import { mapState } from 'vuex';
  import navSet from './common/navSet'
  import timeShaft from '@/components/timeshaft/index'
  import upload from "@@/components/fileUpload/index";
  import announce from '../admin/list/public'

  export default {

    data() {
      return {
        competitionId: '',  //竞赛id
        cerebrumImg: "",//上传封面
        title: '竞赛标题',
        titleShow: false,//标题编辑的隐藏
        content: '竞赛简介',
        baseInfo: {},
        contentShow: false,//内容的隐藏
        tabs: [],
        finish: 0, // 竞赛是否结束 0结束 1未结束
      }
    },
    async created() {
      //新建竞赛时清除缓存中的competitionId、baseInfo
        if(!this.authority.manageCompetitionList){

            this.$message.error('无权限访问该页面')
            location.href = location.origin;
        }
      if(!this.$route.query.id && this.$route.path == '/createNewCompetition'){
        localStorage.removeItem('competitionId');
        localStorage.removeItem('baseInfo');
        return;
      }
      const id = this.$route.query.id || localStorage.getItem("competitionId");
      if (id) {
        this.competitionId = parseInt(id, 10);
      }
      if(this.competitionId) {
        localStorage.setItem('competitionId',this.competitionId);
        this.getBaseInfo();
        this.$nextTick(()=>{
          this.$refs.navset.detailsApi();
        })
      }

    },
    methods: {
      setTabs(value){
        this.tabs = value
      },
      /**
       * 获取封面、名字、简介、竞赛信息、竞赛指南、时间条
       */
      async getBaseInfo(){
        let res = await network.getCompetitionDetail({id:this.competitionId});
        if(res=='error') return;
        this.baseInfo = res;
        localStorage.setItem('baseInfo',JSON.stringify(res));
        this.cerebrumImg = res.bannerUrl;
        this.title = res.name;
        this.content = res.descrption;
        this.opinion = res.opinion
        this.status = res.status
        this.finish = res && res.finish
      },
      /**
       * 保存封面、名字、简介
       */
      async saveBaseInfo(){
        const obj ={
          name: this.title,
          bannerUrl: this.cerebrumImg || '',
          descrption: this.content,
          authorGroupId: getGroupId()
          // authorGroupId: 0
        }
        if(this.competitionId){
          obj.id = this.competitionId;
        }
        let data = await network.addCompetitionId({data:obj});
        if(data=="error") return;
        this.$message.success('保存成功')
        this.competitionId = data;
        localStorage.setItem('competitionId', data);
        await this.$store.dispatch('AuthorityCompetition',this.competitionId)
      },

      //封面上传
      handTeacher(res,file) {
        this.cerebrumImg = res.location;
        this.saveBaseInfo();
      },
      /**
       * @Description: 上传文件检测是否有id
       */
      detectionId() {
        if (!this.competitionId) {
          this.$message.warning('请完善基本信息(竞赛标题、竞赛内容、封面图)');
          return false;
        }
      },
      /**
       * @Description: 标题保存的编辑
       */
      editCompetitionTitle() {
        this.titleShow = false;
        if(this.title==''){
          return this.title = '竞赛标题'
        }
        this.saveBaseInfo();
      },
      showCompetitionTitle() {
        this.titleShow = true;
        if(this.title=='竞赛标题'){
          this.title = ''
        }
      },
      /**
       * @Description: 内容编辑保存
       */
      editCompetitionContent() {
        this.contentShow = false;
        if(this.content==''){
          return this.content = '竞赛简介'
        }
        this.saveBaseInfo();
      },
      showCompetitionContent() {
        this.contentShow = true;
        if(this.content=='竞赛简介'){
          this.content = ''
        }
      },


      back(){
        this.$router.push('/admin/list')
        // this.$router.go(-1);
      },
    },
    components:{
      timeShaft,
      navSet,
      announce,
      upload
    },
    watch:{
      '$route': function(to, from){
        //console.log(this.$route.query.id)
        if(!this.$route.query.id) return;
        localStorage.setItem('competitionId', this.$route.query.id)
        this.competitionId = this.$route.query.id;
        this.getBaseInfo();
        this.$nextTick(()=>{
          this.$refs.navset.detailsApi();
        })
      }
    },
    computed:mapState({
      authority: state => state.authorityManagement
    })
  }
</script>

<style lang="less" scoped>
.newCompetitionWrapper {
  //   background: linear-gradient(to bottom, #e4e6e8 0%, #f4f6f9 5%, #f8fafc 100%);
    background: #f8fafc;
  .detail_top_msg {
    display: flex;
  }
  div,
  ul,
  li,
  p {
    box-sizing: border-box;
  }

  .detail_top_cnt {
    justify-content: start !important;
  } // 固定头部
  .header_fixed {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    // background: #ffffff;
    position: sticky;
    top: 0px;
    z-index: 2;
    text-align: start;
    .header_content {
      width: 1040px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      a {
        color: #4a4a4a;
        font-size: 14px;
        margin-top: 4px;
      }
    }
  }
  .compety_detail {
    width: 100%;
    // padding-top: 1rem; // 公共头部
    .detail_top {
      width: 65rem;
      margin: 0 auto;
      padding: 1rem;
      background: #fff;
      .detail_top_msg {
        height: 8.5rem;
        margin-bottom: 60px;
        .detail_logoImg {
          width: 300px;
          height: 170px;
        }
        .default_img {
          width: 300px;
          height: 170px;
          position: relative;
          img {
            font-size: 1rem;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            vertical-align: middle;
          }
          .upload_img {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.1);
          }
        }
        .detail_top_cnt {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: space-between;
          text-align: left;
          margin-left: 1rem;
          height: 170px;
          .cnt_title {
            letter-spacing: 0;
            font-weight: bold;
            width: 100%;
            margin: 0.5rem 0;

            font-size: 20px;
            color: #4a4a4a;
            letter-spacing: 0;
          }
          .cnt_main {
            font-size: 0.7rem;
            width: 100%;
            height: 100px;
            overflow: hidden;
            p {
              font-size: 14px;
              color: #4a4a4a;
              letter-spacing: 0.2px;
            }
            .cnt_mainp{
              display: -webkit-box !important;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            textarea {
              height: 80px;
            }
          }
          .el-icon-edit-outline{
            cursor: pointer;
          }
          .cnt_bottom {
            margin-top: 15px;
          }
        }
      } // 时间轴
      .time_line {
        position: relative;
        margin-top: 60px;
        margin-left: 40px;
        width: 968px;
        opacity: 0.8;
        background: #ffffff;
      }
    }
  }
  /deep/.el-upload-dragger {
    padding-top: 35px;
  }
}
.newCompetitionWrapper{
  /deep/ .el-upload-dragger {
      padding-top: 0;
      width: 300px;
      height: 170px;
  }
}
.detail_content{
  width: 1040px;
  margin: 0 auto;
}

</style>
