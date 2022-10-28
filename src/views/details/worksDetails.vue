<template>
  <div id="worksDetails">
    <div class="content">
      <div class="header_fixed" v-if="!diaWorkId">
        <div class="header_content">
          <router-link :to="back()">{{$t('submitWork.back')}}</router-link>
          <div>
            <div v-if="authority.delWorks | authority.editWorks" v-show="worksDetail.status===3?false:true" class="edit">
                    <el-button type="primary" size="small" v-if="authority.editWorks" @click.stop="gotoDetail">{{$t('submitWork.edit')}}</el-button>
                    <el-button type="danger" size="small" v-if="authority.delWorks" @click.stop="gotoDel">{{$t('submitWork.del')}}</el-button>
            </div>
            <span class="proedBack" v-if="worksDetail.awardName">
              <span class="proStatus1"></span>
              <span class="proed">{{worksDetail.awardName}}</span>
            </span>
            <span class="proedBack" v-else-if="worksDetail.status===3">
              <span class="proStatus"></span>
              <span class="proed">{{worksDetail.rowName}}{{$t('submitWork.qualify')}}</span>
            </span>
            <span class="passPro" v-else-if="worksDetail.status===4">
              {{worksDetail.rowName}}{{$t('submitWork.noQualify')}}
            </span>
            <span style="position:relative;">
              <qrcode :mdPoolId='worksDetail.mdPoolId' color='true'/>
            </span>
            <!-- <span class="workNum">
              <span>作品编号</span>
              {{worksDetail.id}}
            </span> -->
          </div>
        </div>
      </div>
      <!-- 作品提交须知 -->
      <!-- <div class="content_center">
        <div class="wrapper_bottom" v-if="workRule && workRule.agreement">
            <h2 style="margin:20px 0;border-left: 4px solid #D0021B;">作品提交须知</h2>
            <el-input type="textarea" class="el-fileName-input" autosize disabled v-model="workRule.agreement"></el-input>
        </div>
      </div> -->


      <div
        class="content_top"
        v-if="workRule==null || (workRule.content && workRule.content.includes(1)) || (workRule.content && workRule.content.includes(2)) || (workRule.content && workRule.content.includes(3))"
      >
        <img
          v-if="worksDetail.thunbnail && (workRule == null ||workRule.content && workRule.content.includes(1))"
          :src="worksDetail.thunbnail"
        />
        <img
          v-else-if="!worksDetail.thunbnail && (workRule == null || workRule.content && workRule.content.includes(1))"
          :src="worksDetail.thunbnail || 'https://web.moocollege.com/mooc/hzq/competition/user_center/cerebrum.jpg'"
        />
        <div class="content_top_txt">
          <!-- 作品名称 -->
          <h4 v-if="workRule==null || (workRule.content && workRule.content.includes(2))" :title="worksDetail.title">
            <span>{{worksDetail.title}}</span>
            <span style="clear:both; display: inline-block;"></span>
            <!-- <span  v-if="worksDetail.status===3?true:false" class="iconStau"></span> -->
          </h4>
          <!-- 英文名称 -->
          <h4 v-if="workRule==null || (workRule.content && workRule.content.includes(2))" :title="worksDetail.titleEn" style="word-break: break-word;">
            <small>{{worksDetail.titleEn}}</small>
            <span style="clear:both; display: inline-block;"></span>
          </h4>

          <p
            style="overflowY: auto;height: 100px;margin-top:10px;"
            v-if="workRule==null || (workRule.content && workRule.content.includes(3))"
          >{{worksDetail.description}}</p>
        </div>
      </div>
      <div class="content_center">
        <div class="wrapper_top" v-if="1">
          <div class="teamName">
            <!-- <span class="iconStau"  v-if="worksDetail.status===3?true:false"></span> -->
            {{group && group.groupName}}
          </div>
          <ul>
            <li v-bind:key="index" v-for="(item, index) in teamList">
              <img v-if="item.icon" :src="item.icon" width="40" height="40" />
              <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png" width="40" height="40" />
              <div>
                <p class="message_txt">
                  {{item.name}}
                  <em>|</em>
                  <span>{{item.roleName}}</span>
                </p>
                <p>{{item.college}} {{item.academy}}</p>
                <p>{{item.major}}</p>
              </div>
            </li>
          </ul>
        </div>
        <!--<div class="wrapper_topOne" v-else>-->
        <!--<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=45689134,2554638711&fm=111&gp=0.jpg"-->
        <!--class="circularBead">-->
        <!--<div class="playerMessage">-->
        <!--<p class="name">黄蓓静</p>-->
        <!--<p>浙江大学现代科技学院</p>-->
        <!--<p>电器专修专业</p>-->
        <!--</div>-->
        <!--<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=45689134,2554638711&fm=111&gp=0.jpg"-->
        <!--class="grammaticalization">-->
        <!--</div>-->
        <div
          class="wrapper_center"
          v-if="workRule == null || (workRule.content && workRule.content.includes(4))"
        >
          <h2>{{$t('submitWork.introduce')}}</h2>
          <div
            v-if="workRule == null || (workRule.content && workRule.content.includes(4))"
            style="padding-left:20px;word-wrap: break-word;word-break: break-all;overflow: hidden;white-space: pre-wrap;"
            v-html="worksDetail.infoObj ? worksDetail.infoObj.content : ''"
          ></div>
        </div>

        <!-- 赛题 -->
        <div class="wrapper_center" style="margin-bottom:0" v-if="isTopic">
          <dl style="margin-left:20px;">
						<dt>{{$t('submitWork.topic')}}</dt>
						<dd>{{topicName || '-'}}</dd>
          </dl>
        </div>

        <!-- 作品关键词 -->
        <div
          class="wrapper_center"
          v-if="workRule == null || (workRule.content && workRule.content.includes(5))"
        >
          <dl style="margin-left:20px;">
						<dt>{{workKeyword}}</dt>
						<dd v-for="(item, index) in worksDetail.tagsList" :key="'tags_' + index">{{item.tagname}}</dd>
          </dl>
        </div>

        <div class="wrapper_bottom" v-if="worksDetail.infoObj">
          <h2>{{$t('submitWork.attachment')}}</h2>
          <ul v-if="worksDetail.infoObj.attachList">
            <li v-bind:key="index" v-for="(attach, index) in worksDetail.infoObj.attachList">
              <p class="emphasis">
                <span v-if="attach.attach">*</span>
                {{attach.attachName}}
              </p>

              <div>
                <div class="link" v-bind:key="j" v-for="(item, j) in attach.fileList">
                  <!--<img src="" alt="">-->
                  <span v-if="item.type==4">
                    {{$t('submitWork.introduce')}}：{{item.name}}
                    <a
                      :href="'http://'+ item.url"
                      target="_Blank"
                      :style="{color: '#1D86FF'}"
                    >{{item.url}}</a>
                  </span>
                  <span v-if="item.type==5">{{item.name}}</span>
                  <!-- 图片也交给文件预览 -->
                  <!-- <a
                    v-if="item.type==3"
                    :style="{color: '#1D86FF'}"
                    :href="item.url"
                    target="_blank"
                  >
                  <img style="cursor:pointer;width:80%;max-width:900px;" :src="item.url" alt="">
                  </a> -->

                  <a
                    :style="{color: '#1D86FF'}"
                    :href="item.url"
                    target="_blank"
                    v-if="isAuthDownload(item)"
                    
                  >{{$t('submitWork.download')}}</a>
                  <FileReview :url="item.url" :index="`${index}_${j}`" />
                  <!--<img src="" alt="">-->
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="content_bottom"> -->
      <div class="content_bottom clearfix" v-if="commentList.length > 0">
        <h1>{{$t('submitWork.expert')}}</h1>
        <ul>
          <li v-for="(item,index) in commentList" :key="'comment_' + index">
            <div class="weigui" v-if="item.illegalStatus == 1">已违规</div>
            <!-- <div class="weigui" v-if="item.reviewStatus && item.reviewStatus == 3">已违规</div> -->
            <review :data="item"></review>   
          </li>
          <div style="clear:both;"></div>
        </ul>
      </div>
    </div>
  </div>
</template>
 

<script>
import review from "../../components/review";
import FileReview from "../../components/fileReview";
import network from "@/api/jxapi/index";
import { getUserInfo } from "@@/utils/commons";
import { mapState } from "vuex";
import { getToken } from "../../utils/oauth";
import qrcode from '@@/components/qrcode'
export default {
  name: "worksDetails",
  props:['diaWorkId','diaCid'],
  data() {
    return {
      worksDetail: {
        title: "",
        description: "",
        status: 1,
        thunbnail: "", // ⽬显示图像⽂件地址
        competitionId: "", // 竞赛id
        tags: [],
        info: "",
        teamName: "",
        user: {}
      },
      teamId: '',
      teamList: [],
      group: {},
      commentList: [],
      id: "",
      workRule: {},
      isDownloadAuth: false,
      competitionId: '',
      user: {},
      isTopic: false,
      topicName: '',
      workKeyword: '作品关键词',
    };
  },

  async created() {
    this.user = getUserInfo();
    this.id = this.$route.params.worksId || this.diaWorkId;
    this.competitionId = this.$route.params.cId || this.diaCid;
    let data = await network.getWorkRuleApiCopy({ data: { poolId: this.id } });
    if (data == "error") return;
    this.workKeyword = data && data.workKeyword || '作品关键词'
    this.workRule = data;
    this.getworksDetail();
    this.getCommentList();

    this.getUserInfo();
    await this.getTeam();
    await this.$store.dispatch("setAuthorityByCode", {
      groupId: this.teamId,
      cId: this.competitionId,
      codes: ["editWorks", "delWorks","downloadWorks"]
    });
  },
  methods: {
      gotoDetail() {
    this.$router.push(`/submitWork/${this.id}`);
  },
  gotoWorksShow(){
    this.$router.push(`/details/worksShow`);
  },
  gotoDel() {
    let vm = this;
    this.$confirm(this.$t('submitWork.delMess'), this.$t('submitWork.confirm'), {
      confirmButtonText: this.$t('submitWork.ok'),
      cancelButtonText: this.$t('submitWork.cancel'),
      type: "warning"
    })
      .then(async () => {
        let isdel = await network.delPool({ data: { id: this.id } });
        if (isdel == "error") return;
        return vm.gotoWorksShow();
      })
      .catch(() => {
        vm.$message.info(this.$t('submitWork.noDel'));
      });
  },
    async getReviewRuleCopy(res) {
      if (res.reviewStatus != 2) return;
      let data = await network.getReviewExpertList({
        data: { poolId: this.id }
      });
      if (data == "error" || !data) return;
      this.commentList = data;
    },
    async getUserInfo() {
      if (getToken()) {
        const data = await network.getUserInfoWithout401();
        this.user = data;
      }
    },
    async getworksDetail() {
      let data = await network.getWorkRuleByCompetitionId({ id: this.id });
      if (data == "error") return;
      this.worksDetail = data;
      this.topicName = data && data.topicName || ''
      this.isTopic = data && data.isTopic ? true : false
      this.getReviewRuleCopy(data);
    },
    async getCommentList() {
      // let data = await network.getCommentList({ id: this.id });
      // if (data == "error") return;
      // this.commentList = data;
    },
    async getTeam() {
      let teamlist = await network.getTeamList({ id: this.id });
      if (teamlist == "error") return this.$message.warning(this.$t('submitWork.teamError'));
      // this.teamList = teamlist.members || [];
      this.teamList = teamlist.members?.sort((a,b)=>(a.sort-b.sort)) || [];
      this.group = teamlist;
      this.teamId=teamlist.groupId;
    },
    isAuthDownload(file) {
      //todo authorityManagement.downloadWorks
      if (file.type === 4 || !file.url) {
        return false;
      }
        return this.authority.downloadWorks
    },
    back() {
      let path = this.$route.path;
      if (path.indexOf("details") === -1) {
        return { path: "/competition/worksShow?id="+this.competitionId };
      } else {
        return { path: "/details/worksShow?id="+this.competitionId };
      }
    }
  },
  components: {
    review,
    FileReview,
    qrcode,
  },
  filters: {
    http(val) {
      if (val.indexOf("http") == -1) {
        return "http://" + val;
      } else {
        return val;
      }
    }
  },
  computed: mapState({
    authority: state => state.authorityManagement
  })
};
</script>

<style lang="less" scoped>
.clearfix {
  // overflow: auto;
  // _height: 1%;
  .weigui{
       position: absolute;
    top: -10px;
    right: -5px;
    background: #555555;
    color: #fff;
    font-size: 14px;
    padding: 2px 8px;
  }
}
.edit {
  display: inline-block;
  margin-right: 16px;
  span{
    cursor: pointer;
    &:hover{
      color: #0078e2;
    }
  }
}
#worksDetails {
  text-align: start;
  .header_fixed {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    // background: #fdf6d0;
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
        margin-left: 20px;
      }
      .iconfont-green {
        color: #52c41a;
      }
      .iconfont-green + span {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
  .content {
    width: 1040px;
    margin: auto;
    // overflow: hidden;
    padding-bottom: 40px;
    > a {
      display: inline-block;
      margin-top: 20px;
      margin-bottom: 30px;
      color: #4a4a4a;
    }
    .content_top {
      width: 100%;
      // max-height: 210px;
      min-height: 80px;
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 20px;
      display: flex;
      align-items: top;
      padding: 30px 55px;
      box-sizing: border-box;
      > img {
        width: 300px;
        height: 170px;
      }
      .content_top_txt {
        width: 640px;
        margin-left: 15px;
        font-size: 14px;
        line-height: 20px;

        h4 {
          font-size: 18px;

          span {
            &:first-child {
              width: 600px;
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;
              height: 56px;
              line-height: 29px;
            }
          }
        }
      }
    }
    .content_center {
      width: 100%;
      margin-bottom: 35px;
      background-color: #fff;
      padding: 0px 55px;
      box-sizing: border-box;
      overflow: hidden;
      .wrapper_top {
        width: 930px;
        margin: 20px auto 40px;
        background: #ffffff;
        box-shadow: 0 4px 8px 0 rgba(101, 101, 101, 0.26);
        border-radius: 5px;
        overflow: hidden;
        ul {
          li {
            display: flex;
            line-height: 24px;
            width: 277px;
            height: 96px;
            margin: 25px 0 0 25px;
            float: left;
            overflow: hidden;
            > img {
              border-radius: 100%;
              margin-right: 8px;
            }
            p {
              font-size: 14px;
            }
            .message_txt {
              font-size: 16px;
              em {
                margin: 0 8px;
              }
              span {
                font-size: 13px;
                color: #89acd5;
              }
            }
          }
        }
        .teamName {
          background: url(https://web.moocollege.com/mooc/hzq/competition/competition/team_detail.png) no-repeat
            top left;
          width: 930px;
          height: 80px;
          line-height: 80px;
          text-indent: 25px;
          color: #fff;
          font-size: 24px;
          position: relative;
          .iconStau {
            position: absolute;
            top: 50%;
            margin-top: -12px;
            left: 66px;
          }
        }
      }
      .wrapper_topOne {
        width: 400px;
        height: 110px;
        padding: 15px 20px;
        margin: 50px auto;
        border-radius: 10px;
        display: flex;
        align-items: center;
        overflow: hidden;
        box-shadow: 0 3px 8px 0 rgba(0, 0, 40, 0.26);
        box-sizing: border-box;
        position: relative;
        .circularBead {
          width: 80px;
          height: 80px;
          border-radius: 100%;
          margin-right: 28px;
          position: relative;
          z-index: 2;
        }
        .playerMessage {
          position: relative;
          z-index: 2;
          p {
            font-size: 14px;
            color: #777;
            line-height: 26px;
          }
          .name {
            font-size: 17px;
            color: #4a4a4a;
          }
        }
        .grammaticalization {
          width: 400px;
          height: 400px;
          position: absolute;
          top: 0;
          right: -200px;
          filter: blur(20px);
          z-index: 1;
        }
      }
      .wrapper_center {
        margin-bottom: 40px;
        > h2 {
          border-left: 4px solid #1d86ff;
          padding-left: 15px;
          font-size: 26px;
          margin-bottom: 30px;
        }
        dl {
          overflow: hidden;
          dt {
            margin-top: 35px;
            margin-bottom: 14px;
          }
          dd {
            padding: 6px 12px;
            background-color: #1d86ff;
            float: left;
            font-size: 14px;
            border-radius: 14px;
            color: #fff;
            margin-bottom: 14px;
            margin-right: 10px;
          }
        }
      }
      .wrapper_bottom {
        margin-bottom: 40px;
        > h2 {
          border-left: 4px solid #1d86ff;
          padding-left: 15px;
          font-size: 26px;
        }
        p {
          font-size: 14px;
          margin-top: 12px;
        }
        li {
          padding-left: 20px;
          border-top: 1px solid #dedede;
          padding-bottom: 40px;
        }
        li:nth-child(1) {
          border-top: none;
        }
        .emphasis {
          margin-top: 35px;
          position: relative;
          span {
            position: absolute;
            left: -10px;
            top: 0;
            color: red;
          }
        }
        .link {
          padding: 10px 0;
        }
      }
    }
    .content_bottom {
      width: 100%;
      // box-sizing: border-box;
      // overflow: hidden;
      // padding-bottom: 500px;
      h1 {
        font-size: 26px;
      }
      ul {
        width: 100%;
        // overflow: hidden;
        padding-bottom: 30px;
        li {
          position: relative;
          width: 475px;
          // height: 96px;
          background: #ffffff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
          border-radius: 5px;
          margin-top: 26px;
          margin-right: 32px;
          float: left;
        }
      }
    }
  }
  .type {
    display: flex;
  }
}

.iconStau {
  background: url("https://web.moocollege.com/mooc/hzq/competition/user_center/晋级.gif");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;
  display: inline-block;
}
.proTeam {
  position: relative;
  width: 500px;
  text-align: left;
}
.proStatus {
  background: url("https://web.moocollege.com/mooc/hzq/competition/user_center/晋级.gif");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;
  display: inline-block;
  position: absolute;
  top: 14px;
}
.proStatus1 {
  background: url("https://web.moocollege.com/mooc/hzq/competition/user_center/获奖.gif");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;
  display: inline-block;
  position: absolute;
  top: 14px;
}
.proedBack {
  padding: 0 5px;
  height: 31px;
  background: #ffe8e8;
  font-size: 14px;
  color: #d0021b;
  display: inline-block;
  line-height: 31px;
  border-radius: 5px;
  margin-left: 14px;
}
.proed {
  margin-left: 28px;
}
.passPro {
  padding: 0 5px;
  height: 30px;
  background: #e5e5e5;
  border-radius: 5px;
  font-size: 14px;
  color: #4a4a4a;
  display: inline-block;
  line-height: 30px;
  text-align: center;
}
.workNum {
  // width: 160px;
  padding: 0 5px;
  height: 30px;
  background: #e5f3ff;
  border-radius: 5px;
  font-size: 14px;
  color: #0078e2;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  span {
    margin-right: 5px;
  }
}
</style>