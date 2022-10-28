<template>
  <!--团队-->
  <div id="team">
    <div class="search">
      <h1>{{tabsName}}</h1>
      <el-input
        :placeholder="$t('team.search')"
        prefix-icon="el-icon-search"
        style="width:200px; margin-right:20px;"
        v-model="q"
        @keyup.enter.native="search"
      ></el-input>
      <subCompetitionName 
        :onChange="searchChange"
        type="2"
        :id="id"
      />
      <div class="allDown" v-if="isAdmin">
        <i class="iconfont iconfont-down">&#xe610;</i>
        <span>{{$t('team.downloadForm')}}</span>
      </div>
      <!-- <div v-if="authority.group_add" class="oneApply" @click="onApply">
        <i class="iconfont iconfont-down">&#xe65d;</i>
        <span>团队赛报名</span>
      </div> -->
    </div>
    <ul v-loading='loading'>
      <li
        v-for="(item, index) in teamList"
        v-bind:key="index"
        @click="skip(item.groupId,item.competitionId)"
      >
        <div class="groupStatus">
          <p class="groupStatus3 textOverflow" v-if="item.groupStatus==0">{{statusFilter($t('team.groupStatus0'))}}</p>
          <p class="groupStatus0 textOverflow" v-else-if="item.groupStatus==1">{{statusFilter($t('team.groupStatus1'))}}</p>
          <p class="groupStatus1 textOverflow" v-else-if="item.groupStatus==2">{{statusFilter($t('team.groupStatus2'))}}</p>
          <p class="groupStatus4 textOverflow" v-else-if="item.groupStatus==3">{{statusFilter($t('team.groupStatus3'))}}</p>
          <p class="groupStatus2 textOverflow" v-else-if="item.groupStatus==4">{{statusFilter($t('team.groupStatus4'))}}</p>
          <p class="groupStatus3 textOverflow" v-else-if="item.groupStatus==5">{{statusFilter($t('team.groupStatus5'))}}</p>
          <p class="groupStatus1 textOverflow" v-else-if="item.groupStatus==6">{{statusFilter($t('team.groupStatus6'))}}</p>
          <p class="groupStatus1 textOverflow" v-else-if="item.groupStatus==7">{{statusFilter($t('team.groupStatus7'))}}</p>
        </div>
        <div class="team_top">
          <p class="textOverflow" v-if="item.applyType==1">{{item.userName}}</p>
          <p class="textOverflow" v-else>{{item.groupName}}</p>
          <!-- 
            加入团队功能隐藏，和现有逻辑冲突
            <i
            class="iconfont lackPeople"
            v-if="item.member<item.maxMember"
            @click.stop="applyInTeam(item.groupId)"
          >&#xe628;</i>
          <i class="iconfont fullPeople" v-else @click.stop="full_dialog = true">&#xe628;</i> -->
        </div>
        <a
            :href="item.authenUrl"
            v-if="item.canDownload"
            class="down"
            @click.stop="checkDown(item.groupId)">
            <i class="iconfont iconfont-down">&#xe610;</i>
            <span>下载{{materialName}}</span>
        </a>
        <a v-else class="down"><span>&nbsp;</span></a>

        <div class="team_bottom" >
          <p>
            <img v-if="item.userPic" :src="item.userPic">
            <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png">
            {{item.school}}
          </p>
          <span>{{item.member}}/{{item.maxMember}}</span>
        </div>
     
      </li>
    </ul>
    <!-- 分页 -->
    <div class="cha-pagination" >
      <el-pagination
        hide-on-single-page
        class="cha-page"
        background
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!--团队赛报名弹框-->
    <el-dialog :title="$t('team.signup')" :before-close="beforeClose" :visible.sync="oneApply" :modal-append-to-body="false" :append-to-body='true' width="50rem">
      <!-- <teamUpload v-if="oneApply" :close="oneApply=false"/> -->
      <teamSignup types="1" :getTeam="getTeam" v-if="oneApply"/>
    </el-dialog>

    <!--队伍人数上限弹框-->
    <el-dialog title="提示" :close-on-click-modal= false :visible.sync="full_dialog" custom-class="upper" width="30%">
      <div class="full">
        <h4>温 馨 提 示</h4>
        <p>团队成员已达上限</p>
        <el-button @click="full_dialog = false">知道了</el-button>
      </div>
    </el-dialog>
    <!--申请已提交弹框-->
    <el-dialog title="提示" :close-on-click-modal= false :visible.sync="lack_dialog" custom-class="upper" width="30%">
      <div class="full">
        <h4>温 馨 提 示</h4>
        <p>申请已提交，请等待创建者同意</p>
        <el-button @click="lack_dialog = false">知道了</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex'
import { getUserInfo, getBaseInfo, getCompetitionId, getGroupId, getTabsName} from "@@/utils/commons";
import jxapi from "@@/api/jxapi/index";
import subCompetitionName from '@@/components/subcompetition/index'
import teamSignup from './teamsignup'

export default {
  props:['tabs'],
  data() {
    return {
      teamList: [], // 选手列表
      competitionId: "",    
      groupName: "",
      pageSize: 12, //一页条数
      page: 1, //当前页数
      total: 0, //分页总条数
      full_dialog: false, // 队伍人数上限弹框
      lack_dialog: false, // 申请已提交弹框
      
      Theme: "", //竞赛主题值
      q: "",
      isAdmin: false,
      user:{},
      loading: false,
      tabsName: '',
      materialName: '',
      baseInfo: {}
    };
  },
  mounted() {
    this.tabsName = getTabsName(this.tabs, 4) || '团队'
    this.user = getUserInfo()
    this.isAdmin = this.user&&this.user.isAdmin;
    let baseInfo = getBaseInfo();
    this.baseInfo = baseInfo || {};
    this.materialName = baseInfo&&baseInfo.materialName || '认证表'
    let page = this.$route.query.page
    this.getTeam('',page)
  },
  methods: {
    ...mapMutations('competitionApply',[
        'openTeam','closeTeam',
    ]),

   async checkDown(id){
     await this.$store.dispatch('setAuthorityByCode',{
            groupId:id,
            codes:['downAuthCompetitor']
        })
      if(this.authority.downAuthCompetitor)  this.onDown(id)
      else this.$message('无权限，请联系队长!')
     
    },
    beforeClose(done) {
      this.closeTeam()
    },

    async getTeam(q, current) {
      if(!this.user) return;
      const obj = {
        // this.$route.query.competitionId 这个是为皮肤查询团队使用的
        competitionId: this.competitionId || this.$route.query.competitionId || getCompetitionId(),
       // selfGroupId: getGroupId()//必须要有默认值不然报错
      };
      const isSetting = true

      if (current) {
        obj.pageNum = current;
      }
      if (q && q != "") {
        obj.sort = q;
      }
      this.teamList = []
      this.loading = true
      let groupInfo = await jxapi.groupInfo({data:obj})
      this.loading = false
      if(groupInfo=='error' || !groupInfo) return 

        const { list, pageSize, total, pageNum } = groupInfo;
          this.teamList = list.map(g => {
            const isDownloadDoc = isSetting;
            return {
              flg: false,
              isDownloadDoc,
              ...g
            };
          });

          this.pageSize = pageSize;
          this.page = pageNum;
          this.total = total;
       
    },
    /**
     * hover显示下载认证表
     * @param idx 下标
     **/
    showDown(idx) {
      //this.teamList[idx].flg = true;
      this.checkDown(this.teamList[idx].groupId)
    },
    /**
     * 点击团队跳转到团队详情界面
     **/
    skip(teamId,competitionId) {
      this.$router.push({path:`/competition/team/${teamId}/${ competitionId }`,query:{page:this.page}});
    },
    /**
     * 下载认证表
     * @param idx 下标
     **/
    async onDown(groupId) {
      const competitionId = getCompetitionId();
      const params = {
        groupId,
        competitionId
      };
      let result = await jxapi.downloadGroupApplyFile({
        data: params,
        config: { 
            responseType: 'arraybuffer'
        }
      })
      if(result=='error') return;
    },
    async applyInTeam(id) {
      let result = await jxapi.applyInTeamApi({id:id});
      if(result=='error') return;
      this.lack_dialog = true;

    },
    // 分页
    handleCurrentChange(pageNum) {
      this.getTeam(this.q, pageNum);
    },
    searchChange(v){
      this.competitionId = v;
      this.search();
    },
    search() {
      this.getTeam(this.q);
    },
    onApply(){
        if(getGroupId()!='-1'){
          this.openTeam()
        }else{
            this.$alert(this.$t('team.improve'), this.$t('team.Lack'), {
            confirmButtonText: this.$t('team.perfect'),
            callback: action => {
            if(action=='confirm')
            this.$router.push("/profile?msg_edit_show=true");
          }
        });
        }
    },
    statusFilter(val){
      if(!val) return '';
      if(!this.materialName) return val;
      return val.replace('认证表', this.materialName)
    }
  },
  computed:  {
    ...mapState({
        oneApply: state => state.competitionApply.openTeam,
        authority: state => state.authorityManagement,
        teamReload: state => state.teamReload
    }),
    id(){
      return getCompetitionId();
    },
  },
  components:{
    subCompetitionName,
    teamSignup
  },
  watch:{
    teamReload(){
      this.getTeam('',this.page)
    }
  }
};
</script>

<style lang="less" scoped>
#team {
  width: 100%;
  margin: auto;
  background-color: #fff;
  padding: 30px 60px;
  text-align: start;
  overflow: hidden;
  box-sizing: border-box;

  .search {
    display: flex;
    align-items: center;

    > h1 {
      font-size: 30px;
      border-left: 4px solid #1d86ff;
      padding-left: 16px;
      font-weight: 500;
      margin-right: 40px;
    }

    .allDown,
    .oneApply {
      cursor: pointer;
      margin-left: 16px;
      span {
        font-size: 14px;
        color: #4199ff;
      }
    }

    .allDown {
      visibility: hidden;
      margin-left: 68px;
      margin-right: 32px;
    }
  }

  ul {
    width: 110%;
    padding: 0 0 20px 5px;
    overflow: hidden;
    margin-top: 20px;
    min-height: 40px;
    li {
      width: 286px;
      float: left;
      box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      margin: 0 12px 20px 12px;
      padding: 15px 20px 15px 20px;
      box-sizing: border-box;
      cursor: pointer;
      .groupStatus{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size:14px;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:20px;
        margin-bottom: 14px;
        p{
          border-radius:4px;
          padding: 2px 6px;
        }
        .groupStatus0{
          background:rgba(245,166,35,1);
        }
        .groupStatus1{
          background:rgba(74,161,242,1);
        }
        .groupStatus2{
          background:rgba(0,170,145,1);
        }
        .groupStatus3,.groupStatus4{
          background:rgba(229,90,107,1);
        }


      }
      .team_top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f7f7f7;
        font-size: 16px;
        padding-bottom: 5px;
        // margin-bottom: 14px;

        .lackPeople {
          color: #1d86ff;
        }

        .fullPeople {
          color: #bbdbff;
        }
      }

      .team_bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding-top: 10px;

        p {
          display: flex;
          align-items: center;
          font-size: 14px;

          img {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            border-radius: 100%;
          }
        }

        span {
          font-size: 14px;
        }

  
      }
            .down {
          width: 100%;
          display: block;
          background-image: linear-gradient(
            -180deg,
            rgba(255, 255, 255, 0.54) 0%,
            #ffffff 50%
          );
          text-align: center;

          i {
            font-size: 12px;
          }

          span {
            color: #4199ff;
            font-size: 12px;
          }
        }
    }
  }

  .full {
    text-align: center;

    h4 {
      font-size: 16px;
    }

    p {
      margin-top: 20px;
      margin-bottom: 50px;
    }
  }



  /deep/ .upper {
    .el-dialog__header {
      display: none;
    }
  }
}
</style>
