<template>
  <div id="renzheng" class="renzheng">
    <el-tabs @tab-click="handleClick">
      <el-tab-pane v-if="authority.userIdent" label="学生认证" name="first">
        <div class="card-message">
          <div class="card-model">
            <p>身份证正面照</p>
            <el-upload
              class="avatar-uploader"
              action="/usercenter/upload"
              :show-file-list="false"
              name="attach"
              :headers="headers"
              :on-success="handStudentOne"
            >
              <img v-if="student.imageUrlOne" :src="student.imageUrlOne" class="avatar">
              <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/zheng-card.png" class="avatar">
            </el-upload>
          </div>
          <div class="card-model">
            <p>身份证反面照</p>
            <el-upload
              class="avatar-uploader"
              action="/usercenter/upload"
              :show-file-list="false"
              name="attach"
              :headers="headers"
              :on-success="handStudentTwo"
            >
              <img v-if="student.imageUrlTwo" :src="student.imageUrlTwo" class="avatar">
              <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/fang-card.png" class="avatar">
            </el-upload>
          </div>
          <div class="card-model">
            <p>学生证</p>
            <el-upload
              class="avatar-uploader"
              action="/usercenter/upload"
              :show-file-list="false"
              name="attach"
              :headers="headers"
              :on-success="handStudentThree"
            >
              <img v-if="student.imageUrlThree" :src="student.imageUrlThree" class="avatar">
              <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/certificate.png" class="avatar">
            </el-upload>
          </div>
          <div class="attestation">
            <p>请上传能够证明您身份的证件照片，500kb以下jpg/png/gif格式文件</p>
            <el-button class="get_auth_code" type="primary" @click="handleSubmit(1)">提交认证</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="false" label="教师认证" name="second">
        <!-- <div class="card-message">
                    <div class="card-model">
                        <p>身份证正面照</p>
                        <el-upload
                            class="avatar-uploader"
                            action="/usercenter/upload"
                            :show-file-list="false"
                            name="attach"
                            :headers="headers"
                            :on-success="handTeacherOne">
                            <img v-if="teacher.imageUrlOne" :src="teacher.imageUrlOne" class="avatar">
                            <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/zheng-card.png" class="avatar">
                        </el-upload>
                    </div>
                    <div class="card-model">
                        <p>身份证反面照</p>
                        <el-upload
                            class="avatar-uploader"
                            action="/usercenter/upload"
                            :show-file-list="false"
                            name="attach"
                            :headers="headers"
                            :on-success="handTeacherTwo">
                            <img v-if="teacher.imageUrlTwo" :src="teacher.imageUrlTwo" class="avatar">
                            <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/fang-card.png" class="avatar">
                        </el-upload>
                    </div>
                    <div class="card-model">
                        <p>名片/教师证</p>
                        <el-upload
                            class="avatar-uploader"
                            action="/usercenter/upload"
                            :show-file-list="false"
                            name="attach"
                            :headers="headers"
                            :on-success="handTeacherThree">
                            <img v-if="teacher.imageUrlThree" :src="teacher.imageUrlThree" class="avatar">
                            <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/certificate.png" class="avatar">
                        </el-upload>
                    </div>
                    <div class="attestation">
                        <p>请上传能够证明您身份的证件照片，500kb以下jpg/png/gif格式文件</p>
                        <el-button class="get_auth_code" type="primary" @click="handleSubmit(0)">提交认证</el-button>
                    </div>
        </div> -->
        <div class="teacher-container" v-bind:key="item.id" v-for="item in auditList">
          <div class="teacher-info">
            <img
              class="teacher-info-img"
              src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png"
              width="20"
              height="20"
            >
            <span class="teacher-info-name">{{item.idcardName}}</span>
            <img
              class="img-female"
              src="https://web.moocollege.com/mooc/hzq/competition/user_center/male.png"
              alt
              v-if="item.gender !== 2"
            >
            <img
              class="img-female"
              src="https://web.moocollege.com/mooc/hzq/competition/user_center/female.png"
              alt
              v-if="item.gender === 2"
            >
            <span class="teacher-info-name" style="margin-left: 70px">{{item.contactPhone}}</span>
          </div>
          <p class="teacher-school">{{item.school}}·{{item.academy}}</p>
          <p class="teacher-school">{{item.major}}·{{item.studentId}}</p>

          <div class="teacher-img-container">
            <img
              class="teacher-img"
              v-for="(pic, index) in item.picList"
              v-bind:key="index"
              :src="pic"
              width="80"
              height="80"
              @click="handleImg(1, pic)"
            >
          </div>
          <div class="teacher-btn-container">
            <button class="teacher-btn" type="button" @click="handleAudit(item.id, 0)">拒绝</button>
            <span style="margin: 0 10px;">|</span>
            <button class="teacher-btn" type="button" @click="handleAudit(item.id, 1)">通过</button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="authority.organizationIdent" label="在线协议" name="three">
        <school></school>
      </el-tab-pane>
      <el-tab-pane v-if="authority.organizationIdent" label="服务套餐" name="four">
        <servers></servers>
      </el-tab-pane>

    </el-tabs>
    <div class="img-show" v-if="imgShow" @click="imgShow = false">
      <img class="img-original" :src="imgOriginal">
    </div>
  </div>
</template>

<script>
import network from "@/api/jxapi/index";
import { getUserInfo } from '@/utils/commons';
import school from './common/school'
import servers from './common/servers'
import { getToken } from "../../../utils/oauth";
import { mapState } from 'vuex';
export default {
  components:{
    school,
    servers
  },
  computed:mapState({
    authority: state => state.authorityManagement
  }),
  data() {
    return {
      auditList: [],
      headers: {
        Authorization: "Bearer " + getToken()
      },

      //activeName: "first",
      student: {
        imageUrlOne: "", //身份证 正面
        imageUrlTwo: "", //身份证 反面
        imageUrlThree: "" //学生证
      }, //学生
      teacher: {
        imageUrlOne: "", //身份证 正面
        imageUrlTwo: "", //身份证 反面
        imageUrlThree: "" //教师证
      }, //教师
      imgShow: false,
      imgOriginal: "",
      isGroupAdmin: false,
      user:{}
    };
  },
  name: "renzheng",

  created() {

    this.user = getUserInfo()


    this._usercenterUser();
    this.queryAuditList();
  },
  methods: {
    async queryAuditList() {
      const list = await network.getAuditList();
      // debugger
      if (list == "error") return;
      list.map(d => {
        if (!d.isteacher) {
          d.isteacher = 0;
        }
        d.picList = d.isteacher === 0 ? d.studentPic : d.teacherPic;
        return d;
      });
      this.auditList = list;
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handStudentOne(res, file) {
      this.student.imageUrlOne = res.data;
    },
    handStudentTwo(res, file) {
      this.student.imageUrlTwo = res.data;
    },
    handStudentThree(res, file) {
      this.student.imageUrlThree = res.data;
    },
    handTeacherOne(res) {
      this.teacher.imageUrlOne = res.data;
    },
    handTeacherTwo(res, file) {
      this.teacher.imageUrlTwo = res.data;
    },
    handTeacherThree(res, file) {
      this.teacher.imageUrlThree = res.data;
    },
    async handleSubmit(status) {
      let params = [];
      if (status) {
        //学生
        if (
          this.student.imageUrlOne == "" ||
          this.student.imageUrlTwo == "" ||
          this.student.imageUrlThree == ""
        ) {
          this.$message.error("请上传图片!");
          return false;
        } else {
          params = {
            pic: [
              this.student.imageUrlOne,
              this.student.imageUrlTwo,
              this.student.imageUrlThree
            ]
          };

          const student = await network.studentAuth({ data: params });
          if (student == "error") return;
          this.$message.success("成功!");
          this.queryAuditList();
        }
      } else {
        //教师
        if (
          this.teacher.imageUrlOne == "" ||
          this.teacher.imageUrlTwo == "" ||
          this.teacher.imageUrlThree == ""
        ) {
          this.$message.error("请上传图片!");
          return false;
        } else {
          params = {
            pic: [
              this.teacher.imageUrlOne,
              this.teacher.imageUrlTwo,
              this.teacher.imageUrlThree
            ]
          };
          const teacher = await network.teacherAuth({ data: params });
          if (teacher == "error") return;
          this.$message.success("成功!");
        }
      }
    },
    async _usercenterUser() {
      const list = await network.getUserInfo();
      if (list == "error") return;
      this.isGroupAdmin = list.isGroupAdmin;
      this.student.imageUrlOne = list.studentPic ? list.studentPic[0] : "";
      this.student.imageUrlTwo = list.studentPic ? list.studentPic[1] : "";
      this.student.imageUrlThree = list.studentPic ? list.studentPic[2] : "";
      this.teacher.imageUrlOne = list.teacherPic ? list.teacherPic[0] : "";
      this.teacher.imageUrlTwo = list.teacherPic ? list.teacherPic[1] : "";
      this.teacher.imageUrlThree = list.teacherPic ? list.teacherPic[2] : "";
    },
    /**
     * @Description: 审核拒绝 通过
     */
    async handleAudit(id, status) {
      const code = id;
      const allow = status === 1;
      const confirm = allow ? "确认通过此认证?" : "确认拒绝此认证?";
      const message = allow ? "通过成功!" : "拒绝成功!";
      let params = {
        code: code,
        allow: allow
      };
      this.$confirm(confirm, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const list = network.doAudit({ data: params });
        if (list == "error") return;
        this.$message.success(message);
        this.queryAuditList();
      });
    },
    /**
     * @Description: 点击图片 查看原图
     */
    handleImg(status, img) {
      this.imgShow = true;
      this.imgOriginal = img;
    }
  }
};
</script>


<style lang="less" scoped>
.renzheng {
  width: 100%;
  margin-left: 2rem;
  color: #9b9b9b;
  .card-message {
    .card-model {
      display: inline-block;
      margin-right: 18px;
      p {
        margin-bottom: 6px;
        font-size: 16px;
        color: #4a4a4a;
      }
      img.avatar {
        width: 180px;
        height: 120px;
      }
    }
    .attestation {
      margin-top: 17px;
      p {
        font-size: 12px;
        color: #9b9b9b;
      }
      button {
        margin-top: 23px;
      }
    }
  }

  .teacher-container {
    position: relative;
    margin-bottom: 10px;
    width: 660px;
    height: 200px;
    padding: 12px 20px;
    color: #4a4a4a;
    font-size: 16px;
    background: #ffffff;
    border: 1px solid #eaeaea;
    background: #ffffff;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    -webkit-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);

    .teacher-info {
      margin-bottom: 8px;

      .teacher-info-name {
        margin: 0 10px;
      }
      .img-female {
        width: 15px;
        height: 15px;
        margin-left: -10px;
      }
    }
    .teacher-school {
      margin-left: 30px;
    }
    .teacher-img-container {
      margin: 8px 0px 0 30px;
      .teacher-img {
        margin-right: 8px;
        cursor: pointer;
      }
    }
    .teacher-btn-container {
      display: inline-block;
      position: absolute;
      right: 33px;
      bottom: 23px;
      .teacher-btn {
        background: inherit;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }
  }
}

.img-show {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
  cursor: pointer;
  .img-original {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 900px;
    max-height: 600px;
  }
}
</style>