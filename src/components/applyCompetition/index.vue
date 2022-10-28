<template>
  <div class="protocol">
    <div class="main">
      <div class="mainMessage">
        <div class="logo">
          <img :src="logo" alt="" />
        </div>
        <h1>欢迎入驻摩课云竞赛执行平台</h1>
        <p class="fontMess">请填写您的基本信息及竞赛认证材料，</p>
        <p class="downMess">1.填写个人信息</p>
        <el-form
          :model="userMessage"
          :rules="rules"
          ref="userMessage"
          :label-position="labelPosition"
        >
          <el-form-item  prop="school" label="所在高校" label-width="80px">
            <Org v-model="userMessage.school" :shoolChange="nameBlur"/>
          </el-form-item>
          <el-form-item prop="name" label="竞赛名称" label-width="80px">
            <el-input
              placeholder="请输入竞赛名称"
              v-model="userMessage.name"
              @blur="nameBlur"
            ></el-input>
          </el-form-item>

          <el-form-item required label="类型" label-width="80px">
            <el-select style="display:inline-block;width:100%" @change="nameBlur" v-model="userMessage.type">
              <el-option
                v-for="item in typelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="tel" label="手机号" label-width="80px">
            <el-input
              placeholder="请输入手机号"
              maxlength="11"
              v-model="userMessage.tel"
            ></el-input>
          </el-form-item>
          <el-form-item required="" label-width="80px" :label="$t('newHome.applyCode')">
            <el-input
              v-model="userMessage.smsCode"
              :placeholder="$t('newHome.applyCodeMess')"
            >
              <template slot="append">
                <div class="sendmess">
                  <p v-if="seconds == 0" @click="send">
                    {{ $t("newHome.sendCode") }}
                  </p>
                  <p v-else class="seconds">{{ seconds }}s</p>
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" label-width="80px">
            <el-input
              placeholder="请输入邮箱"
              v-model="userMessage.email"
            ></el-input>
          </el-form-item>
        </el-form>
        <p class="downMess uploadMess">2.上传竞赛证明材料（PDF/JPG）</p>
        <p class="fontMess1">上传的文件:本校当年竞赛立项通知的文件或校内官网截图</p>
        <el-upload
          class="avatar-uploader"
          :showlist="false"
          :drag="true"
          accept=".jpg,.png,.pdf"
          :before-upload="coverSuccess"
          action="/"
        >
          <div class="avatar">
            <p class="iconfont">&#xe614;</p>
            <p>点击或将文件拖拽到这里上传</p>
          </div>
        </el-upload>

        <span class="file-list">
          <div
            :style="{
              marginBottom: '10px',
              width: '360px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }"
            v-for="(item, j) in dataList"
            :key="j"
          >
            <div>
              <el-input
                :style="{ width: '200px' }"
                v-model="item.name"
              ></el-input>
            </div>
            <span :style="{ cursor: 'pointer' }" @click="remove(j)">
              <el-icon class="el-icon-close"></el-icon>
            </span>
          </div>
        </span>


        <div class=" uploadMess"><el-checkbox v-model="agree"/> <span>我已阅读并同意<a href="">《摩课云竞赛创建竞赛协议》</a></span></div>
        <el-button
          type="primary"
          :disabled="!agree||dataList.length < 1"
          @click="submit('userMessage')"
          v-loading="loading"
          >提交</el-button
        >
      </div>
    </div>
    <!-- 成功的弹窗 -->
    <ok :show="show" v-if="show" :close="close" />
  </div>
</template>

<script>
//import upload from "@@/components/fileUpload/notice";
import Upload from "@@/components/fileUpload/spaceNotice.vue";
import Org from "@@/components/OrgInput";
import util from '@@/utils/util'
import ok from "./ok.vue";
import network from "@@/api/jxapi";
export default {
  data() {
    return {
      logo: "",
      userMessage: {},
      agree:false,
      labelPosition: "left",
      rules: {
        name: [{ required: true, message: "请输入竞赛名字", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱",
            trigger: ["blur", "change"],
          },
        ],
        school: [{ required: true, message: "请输入学校", trigger: "blur" }],
      },
      dataList: [],
      typelList: [
        { label: "国级-学科竞赛", value: "1" },
        { label: "省级-学科竞赛", value: "2" },
        { label: "校级-学科竞赛", value: "3" },
        { label: "校级-学生活动", value: "4" },
      ],
      show: false,
      loading: false,
      seconds: 0,
      uuid:util.randomChar(8),
    };
  },
  created() {
    this.init();
  },
  components: {
    Org,
    ok,
  },
  methods: {
    async nameBlur(e){
     if(!this.userMessage.name&&!this.userMessage.school&&!userMessage.type) return
      let has = await network.ApplyCheck({
        data:{
          competitionName:this.userMessage.name,
          schoolName:(this.userMessage.type=='3'||this.userMessage.type=='4')?this.userMessage.school.split('@')[0]:'',
        }
      })
        if (has == "error") return;
        if(has){
          this.$alert(`${this.userMessage.school.split('@')[0]} 已存在 ${this.userMessage.name} 组织！<br>
          更多信息请微信扫码联系客服！
          <br>
          <img width='100px' src="https://web.moocollege.com/mooc/hzq/vueskin/assets/IMG_6657.JPG">`, '竞赛组织已存在', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          callback: action => {
                this.userMessage.name = ""
          }
        });
        }
    },
    async init() {
      let pageset = await network.getPagesSetting();
      if (pageset == "error") return;

      this.logo = pageset.logo;
    },
    remove(j) {
      this.dataList.splice(j, 1);
    },
    coverSuccess(file) {
      Upload.upload({ file: file, fileType: 2, temp: true }).then((ret) => {
        this.dataList.push({
          name: file.name,
          url: ret.location,
        });
      });

      return false;
    },
    async send() {
      if (!util.checkPhone(this.userMessage.tel)) {
        return this.$message.warning("请输入正确的手机号");
      }
      const res = await network.sendSmsCode({
        data: { mobile: this.userMessage.tel },
        headers: { deviceId: this.uuid },
      });
      if (res == "error") return;

      this.seconds = 59;
      let interval = setInterval(() => {
        if (this.seconds <= 1) {
          clearInterval(interval);
        }
        this.seconds--;
      }, 1000);
    },
    submit(formName) {
      //return console.log(this.userMessage);
      //this.show = true;
      this.$refs[formName].validate(async (valid, obj) => {
        if (!valid) return;
        this.loading = true;
        let data = {
          email: this.userMessage.email,
          name: this.userMessage.name,
          type: this.userMessage.type,
          school: this.userMessage.school.split('@')[0],
          fileList:this.dataList,
          mobile:this.userMessage.tel,
        };

        let res = await network.sendApply({
          data:data,
          urlData:{
            mobile:this.userMessage.tel,
            smsCode:this.userMessage.smsCode
          },
          headers:{deviceId:this.uuid}
        });
        this.loading = false;
        if (res == "error") return;
        this.show = true;
      });
    },
    close() {
      this.show = false;
    },
  },
};
</script>



<style lang="less" scoped>
.sendmess {
  width: 80px;
  cursor: pointer;
  color: #6283ff;
  .seconds {
    color: #4a4a4a;
  }
}
.protocol {
  width: 100%;
  height: 100%;
  min-width: 1600px;
  color: #000;
  background-image: url(./common/bg_left.png), url(./common/bg_right.png);
  background-repeat: no-repeat, no-repeat;
  background-position: left 165px, right top;
  background-color: #ffffff;
  padding-bottom: 100px;
}

.main {
  width: 1200px;
  margin: 0 auto;
}
.mainMessage {
  width: 477px;
  height: auto;
  text-align: left;
  overflow: hidden;
}
.logo {
  margin: 45px 0 13px;
  height: 78px;
  width: 100%;
}
.logo img {
  height: 100%;
  width: auto;
}
h1 {
  font-size: 32px;
  color: #4a4a4a;
  letter-spacing: 3.56px;
}
.fontMess {
  font-size: 16px;
  color: #818181;
  letter-spacing: 3px;
  line-height: 29px;
  margin: 20px 0 94px;
}
.fontMess1 {
  font-size: 16px;
  color: #818181;
  letter-spacing: 2px;
  line-height: 29px;
  margin: 0 0 30px;
}
.downMess {
  font-size: 16px;
  color: #1890ff;
  letter-spacing: 3px;
}
.uploadMess {
  margin: 20px 0 16px;
}
.avatar {
  margin-top: 35px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
}
.avatar .iconfont {
  font-size: 48px;
  color: #1890ff;
  line-height: 48px;
  margin-bottom: 20px;
}
.el-form {
  margin: 13px 0 20px;
}
</style>
<style>
.protocol .el-upload-dragger {
  background-color: rgba(0, 0, 0, 0.02) !important;
}
</style>


