<template>
  <div id="details" v-loading="qloading">
    <div class="compety_detail">
      <div class="detail_top">
        <div class="detail_top_msg flexRowBetween">
          <div class="div-logoimg">
            <img v-if="bannerUrl" class="detail_logoImg" :src="bannerUrl" alt>
            <img v-else class="detail_logoImg" src="https://web.moocollege.com/mooc/hzq/competition/user_center/cerebrum.jpg" alt>
          </div>
          <div class="detail_top_cnt">
            <p class="cnt_title">{{title}} 
              <el-button  type="primary"
                          size="small"  @click="$router.push('/details?id='+parentCompetitionId)" v-if="parentCompetitionId">返回主竞赛</el-button></p>
            <p class="cnt_main">{{content}}</p>
            <div class="flexRowBetween cnt_bottom">
              <p class="btns">

                <el-tooltip v-if="signUpStatus == 2" class="item" effect="dark" :content="$t('competitionDetails.signupTip')" placement="top">
                     <el-button size="small" @click="$router.push('/details/team?id='+id)" >{{$t('competitionDetails.alreadySignup')}}</el-button>
                </el-tooltip>

               
               
                <el-button
                  v-show="finishs"
                  v-if="signUpStatus==0||signUpStatus==1||signUpStatus==null"
                  type="primary"
                  size="small"
                  :loading="signupLoading"
                  :disabled="signUpStatus==0"
                  class="el-add-signup"
                  @click="toSignUp()"
                >{{$t('competitionDetails.signup')}}</el-button>
                <aggrement v-if="showAggrement" :setAggrement='setAggrement' :competitionId='id'/>
                <!-- 补交资料 -->
                <meterialData :disable = !authority.mangerMaterials v-if="isEdit == 1" />

                <el-button
                  v-show="finishs"
                  type="primary"
                  size="small"
                  style="margin-left:0.5rem"
                  :disabled="!authority.mangerWorks"
                  @click="toSubmitWork"
                >{{$t('competitionDetails.toSubmitWork')}}</el-button>

                <el-button
                  v-show="finishs"
                  size="small"
                  style="margin-left:0.5rem"
                  @click="openHotelBook(compety)"
                  v-if="false && isBook"
                >{{$t('competitionDetails.alreadyHotel')}}</el-button>
                <el-button
                  v-show="finishs"
                  type="primary"
                  size="small"
                  style="margin-left:0.5rem"
                  @click="openHotelBook(compety)"
                  v-else-if="false && isSignUp"
                >{{$t('competitionDetails.hotel')}}</el-button>
                <el-button
                  type="primary"
                  size="small"
                  style="margin-left:0.5rem"
                  v-if="isReviewOpen"
                  @click="openReview()"
                  class="el-add-isEdit"
                >{{$t('competitionDetails.expert')}}</el-button>
                <el-button 
                  v-show="finishs" 
                  class="tag-read" 
                  icon="el-icon-share" 
                  size="small"  
                  @click="shareFun">
                  {{$t('competitionDetails.share')}}
                </el-button>
              </p>

              <p class="person">
                <span>
                  {{$t('competitionDetails.teamNum')}}
                  <em>{{teamNum}}</em>
                </span>
                <em>/</em>
                <span>
                  {{$t('competitionDetails.memberNum')}}
                  <em>{{memberNum}}</em>
                </span>
                <!-- 20201015显示参赛上限，暂定 -->
                <!-- <em>/</em>
                <span>
                  {{$t('competitionDetails.teamMaxMember')}}
                  <em>{{competitionDetails.teamMaxMember || 0}}</em>
                </span>
                <em>/</em>
                <span>
                  {{$t('competitionDetails.teamMaxCoach')}}
                  <em>{{competitionDetails.teamMaxCoach || 0}}</em>
                </span> -->
              </p>
            </div>
          </div>
        </div>
        <div v-if="!finishs" class="mask"></div>
        <div v-if="!finishs" class="maskImg">
          <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/已结束.png" alt="">
        </div>
        <!-- 时间轴 -->
        <time-shaft :disabled="!finishs" v-if="id" :id="id"></time-shaft>
        <!-- end 时间轴 -->
      </div>


       <!-- 提交作品 -->
      <div class="sign_up_dialog" v-if="submitWork">
        <div class="dialog_title">
          <span>{{$t('competitionDetails.teamchooseTitle')}}</span>
          <p></p>
          <i class="iconfont" @click="hideSubmitWork()" :title="$t('competitionDetails.close')">&#xe623;</i>
        </div>
        <el-form ref="form" :model="submitWorkForm" :rules="rules" label-width="80px">
          <el-form-item :label="$t('competitionDetails.events')">
            <el-select 
              v-if="!oneCompetitionName"  
              @change="changeSubmitCId" 
              v-model="values" 
              :no-data-text="$t('competitionDetails.noworks')" 
              :placeholder="$t('competitionDetails.chooseEvents')">
              <el-option
                v-for="(item) in PointsOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled='!item.haveTeam'
              ></el-option>
            </el-select>
            <el-input v-else disabled :value="oneCompetitionName" ></el-input>
          </el-form-item>

           <el-form-item :label="$t('competitionDetails.abc')">
            <el-select v-model="submitWorkForm.gId" 
              filterable 
              :loading="submitWorkForm.loading"
              :remote-method="selectGroup"
              reserve-keyword
              remote
              :placeholder="$t('competitionDetails.primaryKey')">
              <el-option
                v-for="item in groupList"
                :key="item.groupId"
                :disabled="item.groupStatus !== 4"
                :label="item.applyType==1?item.userName:item.userName+'-'+item.groupName"
                :value="item.groupId"
              ></el-option>
            </el-select>
          </el-form-item>  
        </el-form>
        <p class="btn">
          <el-button
            type="primary"
            :disabled="!submitWorkForm.cId||!submitWorkForm.gId"
            class="submit_btn"
            @click="submitWor()"
          >{{$t('competitionDetails.submit')}}</el-button>
        </p>
      </div>

      <div class="detail_nav">
        <span @click="offsetLeft" v-if="btnShow">&lt;</span>
        <div class="astrict">
          <div class="astrictNav">
            <ul ref="navUl">
              <router-link
                v-for="(item,index) in linkList"
                :key="'tab_'+index"
                :to="path(item,index)"
                v-if="item.display != 0"
                tag="li"
              >{{item.tabName}}</router-link>
            </ul>
          </div>
        </div>
        <span @click="offsetRight" v-if="btnShow">&gt;</span>
      </div>
      <div class="detail_content" v-if="linkList.length>0">
        <router-view :tabs='linkList'></router-view>
      </div>
    </div>
    <el-dialog
      :title="$t('competitionDetails.loadingMess')"
      :visible.sync="downShow"
      :show-close="false"
      :close-on-click-modal = false
      :close-on-press-escape = false
      style="padding-top:50px;"
      center>
      <div v-loading="downShow"></div>
   </el-dialog>
  </div>
</template>

<script>
import jxapi from "@/api/jxapi/index";
import { getGroupId,getUserInfo,getCompetitionId,getBaseInfo, getCookie } from "Lib/commons";
import { tologin } from '@/utils/util'
import { mapMutations,mapState,mapActions } from 'vuex'
import { getToken } from "../../utils/oauth";
import ClipboardJS from "clipboard";
import meterialData from './common/meterialData'
import timeShaft from '@/components/timeshaft/index'
import aggrement from './common/aggrement'

export default {
  components: {
    meterialData,
    timeShaft,
    aggrement,
  },
  data() {
    return {
      signupLoading:false,
      competitionDetails:'',
      qloading:true,
      downShow:false,
      parentCompetitionId:'',
      user:'',
      id: "",
      title: "",
      groupList:[],
      content: "",
      bannerUrl: null, //图片
      
      isSignUp: false, // 是否已报名
      //isOpen: 0, //是否可以继续报名 0未开始或已结束，1已经开始可以报名 2是已开始不能再报名
      //isWorkOpen: false, //是否可以上传作品
      //isReviewOpen: false, // 是否开放评审
      //isEdit: 0, //是否可以不交报名材料//0未开始或已结束，1已经开始可以补交 2是已开始不能补交
      isBook: false, //是否预约酒店，1：是 0否,
      
      compety: {}, // 当前竞赛
      linkList: [], // 标签页
      
      
      // material: false, //补交资料
      submitWork:false,//提交作品确认
      teamNum: 0, //团队人数
      memberNum: 0, //参赛人数
      btnShow: false, // 子路由处按钮
      applyType: "",  //组织 1 个人  2 团队  4  都有
      form: {
        competitionId: "", //竞赛ID
        competitionChildId: "", //子竞赛ID
        groupId: getGroupId()
      },
      submitWorkForm:{
        cId:'',
        gId:'',
        search:'',
        loading:false,
      },
      rules: {
        competitionChildId: [
          { required: true, message: this.$t('competitionDetails.tochooseEvents'), trigger: "change" }
        ],
        competitionRange: [
          { required: true, message: this.$t('competitionDetails.tochooseAreas'), trigger: "change" }
        ]
      },
      
      loading: false,
      
      authorGroupId: "",
      groupId: getGroupId(),
      isOneCompetition: false,
      oneCompetitionName:'',
      rowId:'',
      PointsOptions:[],
      values:'',
      showAggrement: false
    };
  },
  created() {
    //查询该竞赛的操作权限
    this.user = getUserInfo();
    this.id =  this.$route.query.id || getCompetitionId();
    if (this.id) {
      localStorage.setItem("competitionId", this.id);
      this.getDetail();
      this.getJudgeStatus();
    }
    
    this.getGrounpNum();
    if(this.user){
      this.getsignUpStatus()
    }
   
  },
  mounted() {
    this.qloading=false

    if(this.$refs.navUl){
      let excess = this.$refs.navUl.offsetWidth - 960; // excess超出部分宽度
      if (excess > 0) {
        this.btnShow = true;
      }
    }
    this.detailsApi();
    var that = this;
    new ClipboardJS(".tag-read", {
      text: function(trigger) {
        that.$message.info(that.$t('competitionDetails.aleardyCopy'));
        return location.href;
      }
    });
  },
  methods: {
    ...mapMutations('competitionApply',[
      'openTeam','openSingle',
    ]),
    ...mapActions('competitionApply',['refresh']),
      //获取报名状态
    async getsignUpStatus(){
      this.$store.dispatch("singUpRefresh",this.id)
    },
    
    changeSubmitCId(v){
      this.rowId = v.substring(v.indexOf('@')+1)
      v = v.substring(0,v.indexOf('@'))
      this.submitWorkForm.gId = ''
      this.submitWorkForm.cId = v

      this.selectGroup()
    },
    
    async submitWor() {
      let group = await jxapi.getWorkRuleByCompetitionIdApi2({
        data:{
        'groupId': this.submitWorkForm.gId,
        'scheduleId' :this.rowId
        }
      })
      if (group == "error") return 
      if(group) {
        this.$router.push({ path: '/submitWork/' + group  })
      }else{
        this.$router.push({ path: '/submitWork/0/'+this.submitWorkForm.cId+'/'+this.submitWorkForm.gId,query:{id:this.rowId} })
      }
    },
    async selectGroup(search){
      if(!this.submitWorkForm.cId) return 
       this.submitWorkForm.loading = true;
      let group = await jxapi.groupInfo({
        data:{
        competitionId:this.submitWorkForm.cId,
       // selfGroupId: this.groupId,
        sort:search
        }
      })
      this.submitWorkForm.loading = false;
      if(group == 'error') return 
      this.groupList = group && group.list || [] //.filter(u=>(u.isSelf==1||this.user.isteacher) && u.promotionStatus!=2) //this.user.type !=null||
    },
    async toSubmitWork() {
      if (!getToken()) {
        return tologin();
      }
  
      let competition = await jxapi.groupChildInfo({data:{competitionId:this.id}});
      if (competition == "error") return 
      if(competition.length<1){
        this.oneCompetition = true;
        this.oneCompetitionName = '';
        // return;
      }
      let arr = [];
      for (let i = 0; i < competition.length; i++) {
        arr.push({
          label: competition[i].name,
          value: competition[i].id +"@"+competition[i].rowId,
          rowName: competition[i].rowName,
          haveTeam: competition[i].haveTeam || false,
          rowId: competition[i].rowId
        });
      }
      this.PointsOptions = arr;

      return this.submitWork = true

      //this.$router.push({ path: "/submitWork/0" });
    },
    /*
     * 获取标签页
     */
    async detailsApi() {
      let contorlTab = await jxapi.getContorlTab({ id: this.id });
      if (contorlTab == "error") return;
      
      // 游客状态，作品展示、选手、团队三个tab页不显示
      if (!getToken()) {
          contorlTab.map(res=>{
            if(res.type==3 || res.type==4 || res.type==7){
              res.display = 0
            }
          })
      }
      this.linkList = contorlTab;
      // 当竞赛信息隐藏时，自动跳转第一个
      if(this.$route.path=='/details' && 0!=this.linkList[0].type){
        this.path(this.linkList[0], 0, true)
      }

      this.$nextTick(() => {
        if(this.$refs.navUl){
          let excess = this.$refs.navUl.offsetWidth - 960; // excess超出部分宽度
          if (excess > 0) {
            this.btnShow = true;
          }
        }
      });
      // console.log(res.data.tabs,"------");
    },
    /*
     * 标签页路径
     * @params url 标签页
     * @params index 标签下标
     */
    path(item, index, flag) {
      let type = item.type
      let url = item.tabName
      let address = null;
      if (type == "") {
        address =this.getPath('/details')
      } else if (type == 0) {
        address =this.getPath('/details')
      } else if (type == 1) {
        address =this.getPath('/details/entryGuide')
      } else if (type == 2 || url == "分赛") {
        address =this.getPath('/details/Points')
      } else if (type == 3) {
        address =this.getPath('/details/player')
      } else if (type == 4) {
        address =this.getPath('/details/team')
      } else if (type == 5) {
        address =this.getPath('/details/dynamicState')
      // } else if (type == 6) {
        // address =this.getPath('/details/rankingList')
      } else if (type == 6) {
        address ={ name: "detailsPage", params: { detailsId: 6 }, query:{type:url,id:this.id} };
      }else if (type == 7) {
        address =this.getPath('/details/worksShow')
      } else {
        address = { name: "detailsPage", params: { detailsId: index }, query:{type:url,id:this.id} };
      }
      if(flag){
        return this.$router.push(address)
      }else{
        return address;
      }
    },
    getPath(url){
      if(this.id){
        return {path:url+'?id='+this.id}
      }else{
        return {path: url}
      }
    },
    async judge() {
      let judge = await jxapi.getJudgeStatus({ id: this.id });
      if (judge == "error") return;
      this.isSignUp=judge.isSignUp == 1;
      this.isBook = judge.isBook == 1;
    },
    async btn() {
       this.refresh(this.id)
    },
    getJudgeStatus() {
      if (!this.id) return;
      this.judge();
      this.btn();
    },
    /*
     * @param detailsApi
     */
    async getDetail() {
      if (!this.id) return;
      //获取当前竞赛Id的控制权限
      this.$store.dispatch('AuthorityDetails',this.id)
      let competitionDetail = await jxapi.getCompetitionDetail({ id: this.id });
      if (competitionDetail == "error") return;
      this.title = competitionDetail.name || this.$t('competitionDetails.load');
      this.content = competitionDetail.descrption || this.$t('competitionDetails.load');
      this.bannerUrl = competitionDetail.bannerUrl;
      this.parentCompetitionId = competitionDetail.parentCompetitionId;
      this.applyType = competitionDetail.applyType;
      this.authorGroupId = competitionDetail.authorGroupId;
      this.competitionDetails=competitionDetail
    },
    // 立即报名
    async toSignUp() {
      this.signupLoading=true
      if (!getToken()) {
        return tologin();
      }
      //无groupId表示用户信息不完整**2019-10-21新版权限无需groupId,2020-4-8新接口检查是否完善
      let completeInfo = await jxapi.checkUserInfo()
      this.signupLoading=false
      if (!completeInfo) {
        this.$alert(this.$t('competitionDetails.mess1'), this.$t('competitionDetails.mess2'), {
          confirmButtonText: this.$t('competitionDetails.mess3'),
          callback: action => {
            if(action=='confirm') this.$router.push("/profile?msg_edit_show=true&backid="+this.id);
          }
        });
        return false;
      }

      // 20210813 yl要求此处不验证，在选择赛项时验证
      // 验证是否需要报名须知
      // let baseInfo = getBaseInfo()
      // if(baseInfo && baseInfo.agreement=='1'){
      //   let agreement = await jxapi.getAgreementAuth({data:{
      //     competitionId: this.id
      //   }})
      //   if(agreement=='error') return;
      //   if(!agreement) return this.showAggrement = true
      // }
      
      this.signUpTo()
    },

    signUpTo(){
      this.openTeam()
      this.$router.push("/details/team?id="+this.id);
    },
    setAggrement(val){
      this.showAggrement = false
      if(val) this.signUpTo();
    },
    //关闭报名弹框
    hideSubmitWork() {
      this.submitWork = false;
    },
    //预约酒店
    openHotelBook() {
      sessionStorage.setItem("edit", this.isBook);
      sessionStorage.setItem("id", this.id);
      window.location.href =
        window.location.origin +
        "/#/bookHotel?id=" +
        this.id +
        "&edit=" +
        (this.isBook ? true : false);
    },
    //评审
    openReview() {
      location.href = "/expert/";
    },
    //分享
    shareFun() {
      // alert("分享");
    },
    // 左键
    offsetLeft() {
      let newLocation = this.$refs.navUl.offsetLeft;
      if (newLocation >= 0) {
      } else {
        if (newLocation > -50) {
          this.$refs.navUl.style.left = "0px";
        } else {
          this.$refs.navUl.style.left = newLocation + 50 + "px";
        }
      }
    },
    // 右键
    offsetRight() {
      let newLocation = this.$refs.navUl.offsetLeft; // newLocation当前位置
      let excess = 960 - this.$refs.navUl.offsetWidth; // excess超出部分宽度
      if (newLocation > excess) {
        this.$refs.navUl.style.left = newLocation - 50 + "px";
      }
    },
    // 根据身份查询的数据信息
    async getGrounpNum(){
        let competitionGrounpNum = await jxapi.getCompetitionGroupNum({data:{competitionId:getCompetitionId()}});
        if (competitionGrounpNum == "error") return;
        this.teamNum = competitionGrounpNum.groupNum;
        this.memberNum = competitionGrounpNum.personNum;
    }
  },
  watch: {
    $route: function(to, from) {
        this.user = getUserInfo();

        this.id =  this.$route.query.id || getCompetitionId();
        if (this.id) {
          localStorage.setItem("competitionId", this.id);
          this.getDetail();
          this.getJudgeStatus();
        }

        this.getGrounpNum();
        this.detailsApi();
    },
    id: function(old){
      if(this.user){
        this.getsignUpStatus()
      }
      
    },
   
  },
  computed:{
    ...mapState({
      isOpen:state => state.competitionApply.signupBtn.isOpen,
      isEdit:state => state.competitionApply.signupBtn.isEdit,
      isWorkOpen:state => state.competitionApply.signupBtn.isWorkOpen,
      isReviewOpen:state => state.competitionApply.signupBtn.isReviewOpen,
      authority:state => state.authorityManagement,
    }),
    finishs(){

      if(this.competitionDetails.finish===0){
        return false
      }else{
        return true
      }
    },
    signUpStatus(){
      return this.$store.state.signUpStatus
    }
    
  },
};
</script>
<style lang="less" scoped>
.compety_detail {
  width: 100%;
  padding-top: 1rem;
  // 公共头部
  .detail_top {
    width: 1040px;
    margin: 0 auto;
    padding: 1rem;
    background: #fff;
    box-sizing: border-box;
    position: relative;
    .detail_top_msg {
      height: 10rem;
      .div-logoimg {
        float: left;
        clear: both;
        .detail_logoImg {
          width: 19rem;
          height: 10.6rem;
        }
      }

      .detail_top_cnt {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: space-between;
        text-align: left;
        margin-left: 20rem;
        height: 100%;
        .cnt_title {
          font-size: 20px;
          letter-spacing: 0;
          font-weight: bold;
          width: 100%;
          margin: -0.5rem 0 0.5rem 0;
        }
        .cnt_main {
          font-size: 14px;
          width: 100%;
          display: -webkit-box !important;
          -webkit-line-clamp: 4;
          /*! autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          overflow-y: overlay;
          height: 80px;
          letter-spacing: 0.2px;
          font-weight: 150;
        }
        .cnt_bottom {
          width: 100%;
          margin-top: 0.8rem;
          .btns {
            font-size: 0.7rem;
            // margin-top: -2.2rem;
            font-size: 14px;
            letter-spacing: 0;
            height: 30px;
            > span {
              color: #1d86ff;
              margin-right: 0.3rem;
            }
            .el-add-signup {
              background-image: linear-gradient(
                -90deg,
                #61b3ff 0%,
                #298cff 100%
              );
              box-shadow: 0 2px 4px 0 rgba(29, 134, 255, 0.2);
              border-radius: 5px !important;
              color: #ffffff;
            }
            .el-add-isEdit {
              background: #30bfaa;
              box-shadow: 0 2px 4px 0 rgba(29, 134, 255, 0.2);
              border-radius: 5px;
              color: #ffffff;
            }
          }
          .person {
            font-size: 0.6rem;
            text-align: right;
            margin-top: -1.5rem;
            span {
              em {
                color: #1d86ff;
                font-style: normal;
              }
            }
          }
        }
      }
    }
    // 时间轴
    .time_line {
      position: relative;
    }
    
    .modification {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #787d81;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      background-color: rgba(255, 255, 255, 0.8);
      span {
        cursor: pointer;
      }
    }
  }

  // 导航
  .detail_nav {
    height: 2.5rem;
    line-height: 2.5rem;
    background: #fff;
    width: 50rem;
    margin: 1rem auto;
    li {
      display: inline-block;
      font-size: 0.9rem;
      // font-weight: bold;
      letter-spacing: 0.23px;
      padding: 0 1.5rem;
      cursor: pointer;
      &:hover {
        color: #1d86ff;
      }
      &.router-link-exact-active {
        color: #1d86ff;
      }
    }
  }
  .sign_up_dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 30rem;
    height: 25rem;
    margin-top: -14.7rem;
    margin-left: -15rem;
    background: #fff;
    z-index: 1041;
    box-shadow: 0.1rem 0.2rem 0.3rem #000;
    border-radius: 0.3rem;
    padding: 2.5rem 3.5rem;
    color: #4a4a4a;
    .dialog_title {
      position: relative;
      text-align: left;
      margin-bottom: 1.5rem;
      span {
        font-weight: bold;
        font-size: 1rem;
      }
      p {
        width: 1.5rem;
        height: 3px;
        background: #1d86ff;
        margin-top: 0.5rem;
      }
      i {
        position: absolute;
        right: -2rem;
        top: -0.5rem;
        font-size: 0.7rem;
        cursor: pointer;
      }
    }
    /deep/ .el-form-item__error {
      left: 2.1rem;
    }
    /deep/ .el-cascader {
      width: 22.4rem;
    }
    .upload-demo {
      text-align: left;
      .iconfont {
        font-size: 48px;
        color: #1890ff;
        margin-top: 20px;
        display: inline-block;
        width: 48px;
        height: 48px;
      }
      & /deep/ .el-upload-dragger {
        height: 150px;
        background: rgba(0, 0, 0, 0.02);
        line-height: normal;
        margin-left: 1.3rem;
      }
      /deep/ .el-upload__text {
        margin-top: 1rem;
      }
    }
    .el-select {
      width: 22.6rem;
    }
    .el-input {
      width: 22.6rem;
    }
    label {
      font-size: 0.8rem;
      text-align: left;
    }
    .btn {
      padding-top: 0.5rem;
      width: 100%;
      text-align: left;
      padding-left: 6.3rem;
    }
  }
  .detail_content{
    width: 1040px;
    margin: 0 auto;
  }

  // 子路由
  .detail_nav {
    width: 1040px;
    // width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    border-radius: 5px 5px 0px 0px;
    margin: 20px auto 16px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .astrict {
      width: 960px;
      margin-right: 20px;
      overflow: hidden;
      .astrictNav {
        width: 1000%;
        position: relative;
      }
    }
    ul {
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.7s;
      display: flex;
      li {
        // margin: 0 20px;
        position: relative;
        cursor: pointer;
        font-size: 14px;
        &.router-link-exact-active {
          color: #1d86ff;
        }
        &:hover {
          color: #1d86ff;
        }
        &.router-link-exact-active::after {
          content: "";
          height: 2px;
          width: 50px;
          background-color: #1d86ff;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        // &.bg{
        //     color:#1D86FF;
        //     &::after{
        //         content: "";
        //         height: 2px;
        //         width: 50px;
        //         background-color: #1D86FF;
        //         position: absolute;
        //         bottom: 0;
        //         left: 50%;
        //         transform: translateX(-50%);
        //     }
        // }
      }
      // li.bg{
      //     color:#1D86FF;
      //     &::after{
      //         content: "";
      //         height: 2px;
      //         width: 50px;
      //         background-color: #1D86FF;
      //         position: absolute;
      //         bottom: 0;
      //         left: 50%;
      //         transform: translateX(-50%);
      //     }
      // }
    }
    > span {
      width: 34px;
      opacity: 0.3;
      background: #d8d8d8;
      cursor: pointer;
      transition: all 0.5s;
      user-select: none;
    }
    > span:hover {
      opacity: 0.7;
    }
    .detail_set {
      height: 50px;
      line-height: 50px;
      margin-right: 16px;
      margin-left: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 14px;
      i {
        margin-top: 2px;
        width: 14px;
        height: 14px;
        background: url("https://web.moocollege.com/mooc/hzq/competition/competition/设置.svg") no-repeat;
        margin-right: 5px;
      }
    }
    .detail_set:hover {
      i {
        background: url("https://web.moocollege.com/mooc/hzq/competition/competition/设置hover.svg") no-repeat;
      }
      span {
        color: #4199ff;
      }
    }
  }
}
.trueShow{
    margin-left:0.5rem;
    display:inline-block;
}
.falseShow{
    margin-left:0.5rem;
    display:none;
}
.mask{
  height: 100px;
  position: absolute;
  width: 97%;
  bottom: 0;
  background: #fff;
  opacity: .8;
  filter: blur(2px);
  z-index: 999;
  line-height: 100px;
}
.maskImg{
  // background: url("https://web.moocollege.com/mooc/hzq/competition/user_center/已结束.png") no-repeat;
  width: 92px;
  height: 36px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  margin-left: -49px;
  z-index: 1000;
  transform: rotate(10deg);
  img{
    width: 100%;
    height: 100%;
  }
}
</style>


