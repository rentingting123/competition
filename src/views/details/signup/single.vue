<template>
  <div>
    <div class="oneApplyContent">
      <p>
        <span>*</span>
        {{$t('player.events')}}
      </p>
      <!-- <el-input style="width: 100％;margin-bottom:20px;" v-if="!isLastChild" v-model="lastName" disabled/> -->
      <subCompetitionName
        :onChange="changeBaseInfo"
        :id="id"
        type="1"
        :value="subCompetitionId"
        style="width:100%;margin-bottom:20px;"
      />
      <div class="nameDialog">
        <div class="player">
          <p>{{$t('player.name')}}</p>
          <el-input v-model.trim="user.idcardName" :placeholder="$t('player.enter')" style="width:100%;"></el-input>
        </div>
        <div class="player">
          <p>
            <span>*</span>{{$t('player.phone')}}
          </p>
          <el-input :placeholder="$t('player.enter')" v-model.trim="user.loginPhonenumber" style="width:100%;"></el-input>
        </div>
      </div>
      <!-- 指导老师 start -->
      <div v-if="teamMaxCoach>0">
        <hr />
        <div class="nameDialog" v-bind:key="index" v-for="(item, index) in adviserList" >
          <div class="player">
            <p>{{$t('player.teacher')}}</p>
            <el-input v-model.trim="item.idcardName" :placeholder="$t('player.enter')" style="width:100%;"></el-input>
          </div>
          <div class="player">
            <p>{{$t('player.phone')}}</p>
            <el-input v-model.trim="item.loginPhonenumber" :placeholder="$t('player.enter')" style="width:100%;"></el-input>
            <i class="iconfont" @click="delAdviser(index)">&#xe61e;</i>
          </div>
        </div>
        <div class="addAdviser" @click="addAdviser" v-if="teamMaxCoach>0">
          <i class="iconfont iconfont-add">&#xe62d;</i>
          <span>{{$t('player.addTeacher')}}</span>
        </div>
      </div>
      <!-- 指导老师 end -->
      <!-- 企业导师 start -->
      <div v-if="teamMaxCompanyTeacher>0">
        <hr />
        <div class="nameDialog" v-bind:key="index" v-for="(item, index) in companyUsers" >
          <div class="player">
            <p>企业导师：</p>
            <el-input v-model.trim="item.idcardName" :placeholder="$t('player.enter')" style="width:100%;"></el-input>
          </div>
          <div class="player">
            <p>手机号/邮箱：</p>
            <el-input v-model.trim="item.loginPhonenumber" :placeholder="$t('player.enter')" style="width:100%;"></el-input>
            <i class="iconfont" @click="delCompanyTeacher(index)">&#xe61e;</i>
          </div>
        </div>
        <div class="addAdviser" @click="addCompanyTeacher" v-if="teamMaxCoach>0">
          <i class="iconfont iconfont-add">&#xe62d;</i>
          <span>{{$t('player.addTeacher')}}</span>
        </div>
      </div>
      <!-- 企业导师 end -->

      
      <span slot="footer" class="dialog-footer">
        <el-button v-if="haveCancel && !isSkin" @click="closeSingle">{{$t('player.cancel')}}</el-button>
        <el-button v-if="!isSkin" type="primary" :loading="signing" @click="signUpTeam()">{{$t('player.submit')}}</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import subCompetitionName from "@@/components/subcompetition/index";
import { mapMutations } from "vuex";
import { cloneDeep } from "lodash";
import jxapi from '@@/api/jxapi/index'
import {getGroupId,getUserInfo} from '@@/utils/commons'
import {checkPhone,checkEmail} from '@@/utils/util'
export default {
    props:{
        haveCancel:{
            default:true
        },
        getPlayer:Function,
        isSkin: Boolean
    },
     
  components: { subCompetitionName },
  data() {
    return {
      adviserList: [{}], // 指导老师列表
      companyUsers: [{}], //添加企业导师列表
      subCompetitionId: '', //竞赛主题值
      signing:false,
      user: {
        idcardName: "",
        loginPhonenumber: "",
        id: null
      },
      teamMaxCoach:0,
      teamMaxCompanyTeacher: 0,
    };
  },
  created() {
    let user = getUserInfo();
    this.isAdmin = user.isAdmin;
    this.isGroupAdmin = user.isGroupAdmin;
    if (user.isteacher == 0) {
      this.user.idcardName = user.idcardName;
      this.user.loginPhonenumber = user.contactPhone;
    }
    let id =  this.subCompetitionId || parseInt(localStorage.getItem("competitionId"))
    this.changeBaseInfo(id)
  },
  methods: {
    ...mapMutations("competitionApply", ["openSingle", "closeSingle",'openTeam']),
    async changeBaseInfo(val) {
      this.subCompetitionId = val;
      const baseInfo = await jxapi.getCompetitionDetail({ id: val });
      if (baseInfo == "error") return;

      // if (baseInfo.applyType == 2) {
      //  this.openTeam()
      //   this.$router.push("/details/team");
      // }

      if (baseInfo.teamMaxCoach) {
        this.teamMaxCoach = baseInfo.teamMaxCoach;
      }
      if (baseInfo.teamMaxCompanyTeacher) {
        this.teamMaxCompanyTeacher = baseInfo.teamMaxCompanyTeacher;
      }
      if (baseInfo.teamMaxMember) {
        this.teamMaxMember = baseInfo.teamMaxMember;
      }
    },
    async signUpTeam(cb) {
      
      this.user.idcardName = this.user.idcardName && this.user.idcardName.trim();
      if (this.user.idcardName == "") {
        this.$message.error('选手姓名不能为空');
        return cb && cb('err')
      }

      this.user.loginPhonenumber = this.user.loginPhonenumber && this.user.loginPhonenumber.trim();
      if ( !checkPhone(this.user.loginPhonenumber) && !checkEmail(this.user.loginPhonenumber)) {
        this.$message.error('请输入正确的选手手机号/邮箱');
        return cb && cb('err')
      }

      // 指导老师列表
      let teachers = cloneDeep(this.adviserList);
      if (this.teamMaxCoach == 0) {
        teachers = []
      }else{
        for (let i = 0; i < teachers.length; i++) {
          teachers[i].loginPhonenumber = teachers[i].loginPhonenumber && teachers[i].loginPhonenumber.trim();
          teachers[i].idcardName = teachers[i].idcardName && teachers[i].idcardName.trim();
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

      let param = {
        competitionId: this.subCompetitionId || parseInt(localStorage.getItem("competitionId")),
        groupId: getGroupId(),
        teachers: teachers,
        users: [this.user],
        companyUsers: companyUsers
      };
      this.signing = true;
      let signResult = await jxapi.signUpPersonal({ data: param });
      this.signing = false;

      if (signResult == "error") return cb && cb('err');
      this.$message.success(this.$t('player.signupSuccess'));
      cb && cb()

      this.$store.dispatch(
        "singUpRefresh",
        this.subCompetitionId || parseInt(localStorage.getItem("competitionId"))
      );
      this.closeSingle();
      this.getPlayer&&this.getPlayer();
    },
    // 添加指导老师
    addAdviser() {
      let size = this.adviserList.length;
      if (size >= this.teamMaxCoach) {
        return this.$message.warning(this.$t('player.max')+` ${this.teamMaxCoach} `+ this.$t('player.maxMess'));
      }
      this.adviserList.push({});
    },
    // 删除指导老师
    delAdviser(idx) {
      this.adviserList.splice(idx, 1);
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
  },
  computed: {
    id() {
      return parseInt(localStorage.getItem("competitionId"));
    }
  }
};
</script>
<style lang="less" scoped>
// 个人赛报名弹框
.oneApplyContent {
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
}
hr {
  border: none;
  width: 100%;
  height: 1px;
  background-color: #c8c8c8;
  margin-top: 10px;
  margin-bottom: 20px;
}
.dialog-footer{
    text-align: center;
    display: inline-block;
    width: 100%;
    margin-top: 20px;
}
</style>
