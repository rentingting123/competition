<template>
  <div>
    <div class="oneApplyContent">
      <p>
        <!-- <p v-if="PointsOptions.length"> -->
        <span>*</span>{{$t('team.events')}}
      </p>
      <subCompetitionName
        type="1"
        :onChange="changeBaseInfo"
        :id="id"
        style="width:100%;margin-bottom:20px;"
      />
      <p v-if="autoTeam == 0">
        <span>*</span>{{$t('team.teamName')}}
      </p>
      <el-input v-if="autoTeam==0" v-model.trim="groupName" :placeholder="$t('team.enter')"  style="width:100%;margin-bottom:20px;"></el-input>
      <div class="nameDialog">
        <div class="player">
          <p>
            <span>*</span><em style="font-style:normal;">{{$t('team.leader')}}</em>
            <el-tooltip :content="$t('team.leaderMess')">
              <em class="el-icon-question"></em>
            </el-tooltip>
          </p>
          <el-input v-model.trim="captainName" :placeholder="$t('team.enter')" style="width:100%;"></el-input>
        </div>
        <div class="player">
          <p>
            <span>*</span>{{$t('team.phone')}}
          </p>
          <el-input v-model.trim="captainPhone" :placeholder="$t('team.enter')" style="width:100%;"></el-input>
        </div>
      </div>
      <!-- 20210123队长身份默认为参赛者 -->
      <!-- <p>
        <span>*</span>{{$t('team.captain')}}
      </p>
      <template>
        <el-radio
          v-model="captainRadio"
          @change="changPop"
          label="1"
          :disabled="memberList.length>5"
          style="margin-top:10px;margin-bottom:15px;"
        >{{$t('team.contestants')}}</el-radio>
        <el-radio
          v-model="captainRadio"
          @change="changPop"
          :disabled="adviserList.length>1"
          label="2"
          style="margin-top:10px;margin-bottom:15px;"
        >{{$t('team.teacher')}}</el-radio>
      </template> -->

      <!-- 指导老师 start -->
      <div v-if="teamMaxCoach>0">
        <hr />
        <div class="nameDialog" v-bind:key="item+index" v-for="(item, index) in adviserList">
          <div class="player">
            <p>{{$t('team.teacher')}}：</p>
            <el-input v-model.trim="item.idcardName" :placeholder="$t('team.enter')" style="width:100%;"></el-input>
          </div>
          <div class="player">
            <p>{{$t('team.phone')}}：</p>
            <el-input v-model.trim="item.loginPhonenumber" :placeholder="$t('team.enter')" style="width:100%;"></el-input>
            <i class="iconfont" @click="delAdviser(index)">&#xe61e;</i>
          </div>
        </div>
        <div class="addAdviser" v-if="teamMaxCoach>0" @click="addAdviser">
          <i class="iconfont iconfont-add">&#xe62d;</i>
          <span>{{$t('team.addTeacher')}}</span>
        </div>
      </div>
      <!-- 指导老师 end -->

      <!-- 企业导师 start -->
      <div v-if="teamMaxCompanyTeacher>0">
        <hr />
        <div v-for="(item, index) in companyUsers" class="nameDialog" :key="item+index" >
          <div class="player">
            <p>企业导师：</p>
            <el-input v-model.trim="item.idcardName" :placeholder="$t('team.enter')" style="width:100%;"></el-input>
          </div>
          <div class="player">
            <p>手机号/邮箱：</p>
            <el-input v-model.trim="item.loginPhonenumber" :placeholder="$t('team.enter')" style="width:100%;"></el-input>
            <i class="iconfont" @click="delCompanyTeacher(index)">&#xe61e;</i>
          </div>
        </div>
        <div class="addAdviser" v-if="teamMaxCoach>0" @click="addCompanyTeacher">
          <i class="iconfont iconfont-add">&#xe62d;</i>
          <span>添加企业导师</span>
        </div>
      </div>
      <!-- 企业导师 end -->
      <!-- 团队成员 start -->
      <div v-if="teamMaxMember>1">
        <hr />
        <div class="nameDialog" v-bind:key="index" v-for="(item, index) in memberList">
          <div class="player">
            <p>{{$t('team.teamMembers')}}：</p>
            <el-input v-model.trim="item.idcardName" :placeholder="$t('team.enter')" style="width:100%;"></el-input>
          </div>
          <div class="player">
            <p>{{$t('team.phone')}}：</p>
            <el-input v-model.trim="item.loginPhonenumber" :placeholder="$t('team.enter')" style="width:100%;"></el-input>
            <i class="iconfont" @click="delMember(index)">&#xe61e;</i>
          </div>
        </div>
        <div class="addAdviser" @click="addMember">
          <i class="iconfont iconfont-add">&#xe62d;</i>
          <span>{{$t('team.addMember')}}</span>
        </div>
      </div>
      <div v-if="types == 1" @click="toPath(1)" class="tofind">{{$t('team.findteam')}}</div>
      <!-- 团队成员 start -->
    </div>
    <div v-if="adviserList.length>0||memberList.length>0" class="members">参赛人员将会自动注册，密码为手机号后六位</div>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="!isSkin" @click="closeTeam">{{$t('team.cancel')}}</el-button>
      <el-button
        v-if="!isSkin"
        type="primary"
        :loading="signUpLoding"
        :disabled="signUpStatus!=1"
        @click="signUpTeam()"
      >{{$t('team.submit')}}</el-button>
    </span>

    <!-- 报名信息提示 -->
    <aggrement v-if='show' :info='info' :setAggrement='setAggrement' :competitionId='subCompetitionId' />

  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { cloneDeep } from "lodash";
import jxapi from "@@/api/jxapi/index";
import aggrement from '../common/aggrement'
import {
  getUserInfo,
  getBaseInfo,
  getCompetitionId,
  getGroupId
} from "@@/utils/commons";
import {checkEmail,checkPhone} from '@@/utils/util'
import subCompetitionName from "@@/components/subcompetition/index";
export default {
  data() {
    return {
      signUpLoding: false,
      groupName: "",
      captainRadio: "1", // 队长身份radio
      // 20210506 华灿奖要求默认不显示列表
      adviserList: [], // 添加指导老师列表
      memberList: [], // 添加团队成员列表
      companyUsers: [], //添加企业导师列表
      subCompetitionId: "",
      teamMaxCoach: 0, // 指导老师人数上限
      teamMaxMember: 0, // 团队参赛者人数上限
      teamMinMember: 0, // 团队参赛者人数下限
      teamMinMember: 0, // 团队参赛者人数下限
      teamMaxCompanyTeacher: 0, // 企业老师人数上限
      captainName: "",
      captainPhone: "",
      isGroupAdmin: false,
      user: {},
      autoTeam: 0,
      show: false,
      info: ''
    };
  },
  mounted() {
    this.changeBaseInfo(this.id)
    // 默认本账号为队长
    this.user = getUserInfo();
    this.captainName = this.user.idcardName;
    this.captainPhone = this.user.contactPhone;
  },
  methods: {
    toPath(num){
      this.$router.push({path:'/searchteam',query:{type:num,comid:this.$route.query.id}})},
    ...mapMutations("competitionApply", ["closeTeam", "openSingle"]),
    setStore() {
      this.$store.dispatch("singUpRefresh", this.subCompetitionId || this.id);
    },
    setAggrement(){
      this.show = false
    },
    async changeBaseInfo(val) {
      this.subCompetitionId = val;
      this.setStore();
      const baseInfo = await jxapi.getCompetitionDetail({ id: val });
      if (baseInfo == "error") return;
      // 验证是否需要报名须知
      if(baseInfo && baseInfo.agreement=='1'){
        let agreement = await jxapi.getAgreementAuth({data:{
          competitionId: val
        }})
        if(agreement=='error') return;
        if(!agreement){
          this.show = true
          this.info = baseInfo
        }
      }


      if (baseInfo.teamMaxCoach) {
        this.teamMaxCoach = baseInfo.teamMaxCoach;
      }
      this.autoTeam = baseInfo.autoTeam==1?baseInfo.autoTeam:0
      if (baseInfo.teamMaxMember) {
        this.teamMaxMember = baseInfo.teamMaxMember;
      }
      if (baseInfo.teamMinMember) {
        this.teamMinMember = baseInfo.teamMinMember;
      }
      if (baseInfo.teamMaxCompanyTeacher) {
        // this.teamMaxCompanyTeacher = baseInfo.teamMaxCompanyTeacher;
        this.teamMaxCompanyTeacher = 2
      }
    },
    async signUpTeam(cb) {

      if (!this.subCompetitionId) {
        this.$message.warning('请选择赛项');
        return cb && cb("err");
      }

      let res = await jxapi.getAgreementAuth({data:{
        competitionId: this.subCompetitionId
      }})
      if(res=='error') return cb && cb("err");
      if(!res){
        this.$message.warning('请认真阅读并接受报名协议')
        return cb && cb("err");
      }

      if (!this.groupName && this.autoTeam==0) {
        this.$message.warning('队伍名不能为空');
        return cb && cb("err");
      }

      this.captainName = this.captainName && this.captainName.trim();
      if (this.captainName == "") {
        this.$message.error('队长姓名不能为空');
        return cb && cb("err");
      }
      if(this.captainPhone){
        if(!this.captainName){
          this.$message.error('队长姓名不能为空');
        return cb && cb("err");
        }
      }
      this.captainPhone = this.captainPhone && this.captainPhone.trim();
      if (!checkPhone(this.captainPhone) && !checkEmail(this.captainPhone)) {
        this.$message.error('请输入正确的队长手机号/邮箱');
        return cb && cb("err");
      }
      
      // 指导老师列表
      let teachers = cloneDeep(this.adviserList);
      if (this.teamMaxCoach == 0) {
        teachers = []
      }else{
        for (let i = 0; i < teachers.length; i++) {
          teachers[i].loginPhonenumber = teachers[i].loginPhonenumber && teachers[i].loginPhonenumber.trim();
          teachers[i].idcardName = teachers[i].idcardName && teachers[i].idcardName.trim();
          teachers[i].isteacher = 1
          const teacher = teachers[i];
          if (!teacher.idcardName) {
            this.$message.error('请输入指导老师信息');
            return cb && cb("err");
          }
          if (!checkPhone(teacher.loginPhonenumber) && !checkEmail(teacher.loginPhonenumber)) {
            this.$message.error('请输入正确的指导老师手机号/邮箱');
            return cb && cb("err");
          }
        }
      }

      // 企业导师列表
      let companyUsers = cloneDeep(this.companyUsers);
      if (this.teamMaxCompanyTeacher == 0) {
        companyUsers = []
      }else{
        for (let i = 0; i < companyUsers.length; i++) {
          companyUsers[i].loginPhonenumber = companyUsers[i].loginPhonenumber && companyUsers[i].loginPhonenumber.trim();
          companyUsers[i].idcardName = companyUsers[i].idcardName && companyUsers[i].idcardName.trim();
          companyUsers[i].isteacher = 11
          const teacher = companyUsers[i];
          if (!teacher.idcardName) {
            this.$message.error('请输入企业导师信息');
            return cb && cb("err");
          }
          if (!checkPhone(teacher.loginPhonenumber) && !checkEmail(teacher.loginPhonenumber)) {
            this.$message.error('请输入正确的企业导师手机号/邮箱');
            return cb && cb("err");
          }
        }
      }
    
      // 团队成员列表
      let users = cloneDeep(this.memberList);
      if(this.teamMaxMember<=1){
        users = []
      }else{
        for (let i = 0; i < users.length; i++) {
          users[i].loginPhonenumber = users[i].loginPhonenumber && users[i].loginPhonenumber.trim();
          users[i].idcardName = users[i].idcardName && users[i].idcardName.trim();
          users[i].isteacher = 0
          const user = users[i];
          if (!user.idcardName) {
            this.$message.error('请输入团队成员信息');
            return cb && cb("err");
          }
          if (!checkPhone(user.loginPhonenumber) && !checkEmail(user.loginPhonenumber)) {
            this.$message.error('请输入正确的团队成员手机号/邮箱');
            return cb && cb("err");
          }
        }
        
        // 判断团队人数
        let userNums = this.memberList && this.memberList.length || 0
        if(this.teamMinMember > userNums+1 || this.teamMaxMember < userNums+1){
          return this.$message.error(`请添加${this.teamMinMember}到${this.teamMaxMember}位成员`)
        }
      }


      let param = {
        competitionId: this.subCompetitionId,
        leaderMobile: this.captainPhone,
        leaderName: this.captainName,
        leaderType: parseInt(this.captainRadio),
        teamName: this.groupName,
        teachers: teachers,
        users: users,
        companyUsers: companyUsers,
        groupId: getGroupId()
      };
      // 20210608华灿奖添加备注字段
      if(this.$route.query.opinion){
        param.opinion = this.$route.query.opinion
      }
      this.signUpLoding = true;
      let code = await jxapi.signUpGroupApi({ data: param });
      if (code == "error") {
        cb && cb("err");
        return (this.signUpLoding = false);
      }
      let user = await jxapi.getUserInfo();
      this.signUpLoding = false;
      if (code == "error") return cb && cb("err");
      localStorage.setItem("userInfo", JSON.stringify(user));
      this.$message.success(this.$t('team.signUp'));
      cb && cb();
      this.setStore();

      this.$store.dispatch("AuthorityDetails", this.subCompetitionId || this.id);
      this.closeTeam();

      this.getTeam && this.getTeam();
    },
    // 添加指导老师
    addAdviser() {
      console.log('指导老师');
      let size = this.adviserList.length;
      if (size >= this.teamMaxCoach) {
        this.$message.warning(this.$t('team.max')+` ${this.teamMaxCoach} `+this.$t('team.maxMess'));
        return;
      }
      this.adviserList.push({});
    },
    // 删除指导老师
    delAdviser(idx) {
      this.adviserList.splice(idx, 1);
      // console.log(idx)
    },
    // 添加企业导师
    addCompanyTeacher() {
      let size = this.companyUsers.length;
      if (size >= this.teamMaxCompanyTeacher) {
        return this.$message.warning(`最多可添加 ${this.teamMaxCompanyTeacher} 位企业导师`);
      }
      this.companyUsers.push({});
    },
    // 删除企业导师
    delCompanyTeacher(i) {
      this.companyUsers.splice(i, 1);
    },
    // 添加团队成员
    addMember() {
      if (this.teamMaxMember == 1 ) {
        return this.$message.warning(this.$t('team.minMember'));
      }
      let size = this.memberList.length + 1;

      if (size >= this.teamMaxMember) {
        return this.$message.warning(this.$t('team.max')+` ${this.teamMaxMember} `+this.$t('team.member'));
      }

      this.memberList.push({});
    },
    // 删除团队成员
    delMember(idx) {
      this.memberList.splice(idx, 1);
    },
    changPop(e) {
      if (this.teamMaxMember == this.memberList.length && e == 1) {
        this.delMember(0);
      }
    }
  },
  computed: {
    id() {
      return getCompetitionId();
    },
    signUpStatus() {
      return this.$store.state.signUpStatus;
    }
  },
  props: {
    getTeam: Function,
    isSkin: Boolean,
    types: String
  },
  components: {
    subCompetitionName,
    aggrement,
  }
};
</script>


<style lang="less" scoped>
// 个人赛报名弹框
.oneApplyContent {
  .tofind{
      width: 100%;
    text-align: center;
    margin-bottom: 18px;
    color: rgb(29, 134, 255);
    cursor: pointer;
    letter-spacing: 1px;
}
  width: 400px;
  margin: auto;

  p {
    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 1px;
    line-height: 26px;
    position: relative;

    > span {
      position: absolute;
      left: -10px;
      top: 3px;
      color: red;
    }
  }

  .nameDialog {
    width: 400px;
    margin: 0px auto 20px;
    display: flex;
    justify-content: space-between;

    .player {
      width: 180px;
      position: relative;

      i {
        position: absolute;
        right: -25px;
        bottom: 8px;
        cursor: pointer;
      }

      i:hover {
        color: red;
      }
    }
  }


  .addAdviser {
    width: 400px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    margin: 0px auto 20px;
    cursor: pointer;
    background: #e9e9e9;

    i {
      margin-right: 5px;
    }
  }

  hr {
    border: none;
    width: 100%;
    height: 1px;
    background-color: #c8c8c8;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}

.members{
    text-align: center;
    color: red;
    margin-bottom: 15px;
  }
.dialog-footer {
  display: block;
  text-align: center;
}
</style>

