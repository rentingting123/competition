<template>
  <div class="certSet">
    <el-form class="form" :inline="true" label-width="120px">
      <el-form-item>
        <el-button size="small" @click="back" type="primary"
          >返回列表</el-button
        >
        <el-button size="small" @click="pre" type="primary">上一步</el-button>
        <el-button size="small" @click="next" type="primary">下一步</el-button>
      </el-form-item>
      <el-form-item label="编号规则：" required>
        <div style="width: 800px">
          <el-button size="small" @click="setrules = true">设置</el-button>
          <span>设置证书编号生成规则</span>
        </div>
      </el-form-item>
      <el-form-item label="印章图片：" style="">
        <upload
          class="logouploader"
          :drag="true"
          :showlist="false"
          accept=".png"
          :onSuccess="handlelogoAvatarSuccess"
          :beforeUpload="beforelogoUpload"
        >
          <div class="logoimg" v-if="sealUrl">
            <img :src="sealUrl" class="avatar" />
            <i class="iconfont detail" @click.stop="sealUrl = ''">&#xe61e;</i>
          </div>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </upload>
        <h4>尺寸595*595px</h4>
        <p>请上传电子印章图，仅支持png格式<br />建议电子印章背景为空</p>
      </el-form-item>
      <el-form-item label="背景图片：">
        <upload
          :drag="true"
          class="logouploader"
          :showlist="false"
          accept=".jpg, .png"
          :onSuccess="handleAvatarSuccess"
          :beforeUpload="beforeAvatarUpload"
        >
          <div class="logoimg" v-if="backUrl">
            <img :src="backUrl" class="avatar" />
            <i class="iconfont detail" @click.stop="backUrl = ''">&#xe61e;</i>
          </div>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </upload>
        <h4>尺寸2480*3508PX（竖版）<br />尺寸3508*2480PX（横版）</h4>
        <p>上传背景图可自定义背景，<br />为保证印刷效果，请按照尺寸上传</p>
      </el-form-item>
    </el-form>
    <div class="img">
      <div
        class="type"
        :class="{
          type3: templateId == 3,
          type4: templateId == 4,
          type5: templateId == 5,
          type6: templateId == 6,
          type8: templateId == 8,
        }"
      >
        <img class="bg" :src="background" width="100%" height="100%" />
        <!-- 获奖名单 -->
        <div v-if="templateId == 8" class="orderTitle1">
          <div class="name1 name">
            <i class="iconfont" @click="detailwork = true">&#xe666;</i>
            <p>
              <el-input
                v-if="detailwork"
                @blur="detailwork = false"
                maxlength="4"
                v-model="orderTitlework"
              ></el-input>
              <span v-else>{{ orderTitlework }}</span>
            </p>
            <span>(作品名称)</span>
          </div>
          <div class="name2 name">
            <i class="iconfont" @click="detailstudent = true">&#xe666;</i>
            <p>
              <el-input
                v-if="detailstudent"
                @blur="detailstudent = false"
                maxlength="4"
                v-model="orderTitlestudent"
              ></el-input>
              <span v-else>{{ orderTitlestudent }}</span
              ><span class="small">(排名不分先后)</span>
            </p>
            <span>(成员名称) (学校名称)</span><br />
            <span>(成员名称) (学校名称)</span>
          </div>
          <div class="name3 name">
            <i class="iconfont" @click="detailteacher = true">&#xe666;</i>
            <p>
              <el-input
                v-if="detailteacher"
                @blur="detailteacher = false"
                maxlength="4"
                v-model="orderTitleteacher"
              ></el-input>
              <span v-else>{{ orderTitleteacher }}</span>
            </p>
            <span>(老师名称)</span>
          </div>
        </div>
        <div v-else class="orderTitle">
          <div class="name">
            <i class="iconfont" @click="detailschool = true">&#xe666;</i>
            <p>
              <el-input
                v-if="detailschool"
                @blur="detailschool = false"
                maxlength="4"
                v-model="orderTitleschool"
              ></el-input>
              <span v-else>{{ orderTitleschool }}:</span>
            </p>
            <span>(组织名称)</span>
          </div>
          <div class="name">
            <i class="iconfont" @click="detailstudent = true">&#xe666;</i>
            <p>
              <el-input
                v-if="detailstudent"
                @blur="detailstudent = false"
                maxlength="4"
                v-model="orderTitlestudent"
              ></el-input>
              <span v-else>{{ orderTitlestudent }}:</span>
            </p>
            <span>(获奖者姓名)</span>
          </div>
          <div class="name">
            <i class="iconfont" @click="detailteacher = true">&#xe666;</i>
            <p>
              <el-input
                v-if="detailteacher"
                @blur="detailteacher = false"
                maxlength="4"
                v-model="orderTitleteacher"
              ></el-input>
              <span v-else>{{ orderTitleteacher }}:</span>
            </p>
            <span>(指导老师)</span>
          </div>
          <div class="name">
            <i class="iconfont" @click="detailwork = true">&#xe666;</i>
            <p>
              <el-input
                v-if="detailwork"
                @blur="detailwork = false"
                maxlength="4"
                v-model="orderTitlework"
              ></el-input>
              <span v-else>{{ orderTitlework }}:</span>
            </p>
            <span>(作品名称)</span>
          </div>
        </div>
        <!-- 获奖名单 end -->

        <!-- 证书编号 -->
        <div class="code">
          <div class="codeimg"></div>
          <span>
            <p>证书编号</p>
            <p class="code1">JXmkyjs0001</p>
          </span>
        </div>
        <!-- 证书编号 end -->

        <!-- 获得奖项 -->
        <div v-if="templateId == 8" class="message">
          <p>&nbsp;</p>
          <h3>最具创新奖</h3>
        </div>
        <div v-else class="message">
          <p>
            在首届家用智能机器人——让生活更美好竞赛中荣获在首届家庭智能机器人——让生活更美好竞赛中荣获
          </p>
          <h2>一等奖</h2>
          <h3>特发此证，以资鼓励！</h3>
        </div>
        <!-- 获得奖项 end -->

        <!-- 公司日期 -->
        <div class="footer">
          <div class="name">
            <i class="iconfont" @click="inscribeTextEdit = true">&#xe666;</i>
            <p>
              <el-input
                v-if="inscribeTextEdit"
                @blur="inscribeTextEdit = false"
                v-model="inscribeText"
              ></el-input>
              <span v-else>{{ inscribeText }}</span>
            </p>
          </div>
          <div class="name">
            <i class="iconfont" @click="inscribeDateEdit = true">&#xe666;</i>
            <p>
              <el-input
                v-if="inscribeDateEdit"
                @blur="inscribeDateEdit = false"
                v-model="inscribeDate"
              ></el-input>
              <span v-else>{{ inscribeDate }}</span>
            </p>
          </div>
          <img
            src="https://web.moocollege.com/mooc/hzq/competition/cert/logo.png"
          />
        </div>
        <!-- 公司日期 end -->
      </div>
    </div>

    <el-dialog
      title="设置证书编号规则"
      :append-to-body="true"
      :visible.sync="setrules"
      width="30%"
    >
      <div class="setrules">
        <p>添加自定义字段<span></span></p>
        <!-- 20201130 省厅要求设置自己的编号，从8位到16位 -->
        <el-input v-model="prefix" maxlength="16" autocomplete="off"></el-input>
        <p>
          预览编号：<span>{{ prefix }}XXXX</span>
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setrules = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import upload from "@@/components/fileUpload";
export default {
  props: ["certs", "setCerts", "backurls"],
  components: {
    upload,
  },
  data() {
    return {
      competitionId: "",
      sealUrl: "",
      backUrl: "",
      templateId: 5,
      background:
        "https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/i9y6hO8U_1563265195053/bg5.jpg",
      orderTitleschool: "学校",
      orderTitlestudent: "学生",
      orderTitleteacher: "指导老师",
      orderTitlework: "参赛作品",
      inscribeText: "杭州简学科技有限公司",
      inscribeDate: "2018.12.31",
      detailschool: false,
      detailstudent: false,
      detailteacher: false,
      detailwork: false,
      inscribeTextEdit: false,
      inscribeDateEdit: false,
      prefix: "",
      setrules: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    back() {
      if (this.backurls) {
        this.$router.push(this.backurls);
      } else {
        this.$router.push("/admin/cert");
      }
    },
    init() {
      let res = this.certs;
      this.templateId = res.templateId;
      if (res.backUrl) {
        this.background = res.backUrl;
      } else {
        if (this.templateId == 3) {
          this.background =
            "https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/ob6LrUpi_1563265167457/bg3.jpg";
        } else if (this.templateId == 4) {
          this.background =
            "https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/KOx6nhTX_1563265179988/bg4.jpg";
        } else if (this.templateId == 5) {
          this.background =
            "https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/i9y6hO8U_1563265195053/bg5.jpg";
        } else if (this.templateId == 6) {
          this.background =
            "https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/v5jZmWeF_1563265207591/bg6.jpg";
        } else if (this.templateId == 8) {
          this.background =
            "https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/v5jZmWeF_1563265207591/bg7.jpg";
        }
      }
      if (this.templateId == 8) {
        this.orderTitleschool = "主办单位";
        this.orderTitlestudent = "参赛成员";
        this.orderTitleteacher = "指导老师";
        this.orderTitlework = "参赛作品";
      } else {
        this.orderTitleschool = "学校";
        this.orderTitlestudent = "学生";
        this.orderTitleteacher = "指导老师";
        this.orderTitlework = "参赛作品";
      }
      if (!res.prefix) return;
      this.inscribeText = res.inscribeText;
      this.inscribeDate = res.inscribeDate;
      this.sealUrl = res.sealUrl;
      this.backUrl = res.backUrl;
      this.prefix = res.prefix;
      for (let i in res.orderTitle) {
        if (res.orderTitle[i].code == "school") {
          this.orderTitleschool = res.orderTitle[i].content;
        } else if (res.orderTitle[i].code == "student") {
          this.orderTitlestudent = res.orderTitle[i].content;
        } else if (res.orderTitle[i].code == "teacher") {
          this.orderTitleteacher = res.orderTitle[i].content;
        } else if (res.orderTitle[i].code == "pool") {
          this.orderTitlework = res.orderTitle[i].content;
        }
      }
    },
    pre() {
      return this.setCerts && this.setCerts("", 1);
    },
    next() {
      if (!this.prefix) {
        return this.$message.warning("请设置证书编号");
      }
      let orderTitle = [];
      orderTitle.push({
        code: "school",
        content: this.orderTitleschool,
      });
      orderTitle.push({
        code: "student",
        content: this.orderTitlestudent,
      });
      orderTitle.push({
        code: "teacher",
        content: this.orderTitleteacher,
      });
      orderTitle.push({
        code: "pool",
        content: this.orderTitlework,
      });

      let params = {
        orderTitle: orderTitle,
        inscribeText: this.inscribeText,
        inscribeDate: this.inscribeDate,
        templateId: this.templateId,
        sealUrl: this.sealUrl,
        backUrl: this.backUrl,
        prefix: this.prefix,
      };
      return this.setCerts && this.setCerts(params, 3);
    },
    beforelogoUpload(file) {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        this.$message.error("上传图片的格式只能是 png 格式!");
      }
      const isSize = new Promise(function (resolve, reject) {
        let width = 595;
        let height = 595;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function () {
          let valid = img.width == width && img.height == height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          this.$message.error("上传的图片宽高必须是595*595!");
          return Promise.reject();
        }
      );
      return isPNG && isSize;
    },
    handlelogoAvatarSuccess(res) {
      this.sealUrl = res.location;
    },
    beforeAvatarUpload(file) {
      let _this = this;
      const isPNG = file.type === "image/png" || file.type === "image/jpeg";

      if (!isPNG) {
        this.$message.error("上传图片的格式只能是 jpg或png 格式!");
      }
      const isSize = new Promise(function (resolve, reject) {
        let width = 2480;
        let height = 3508;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function () {
          if (
            _this.templateId == 5 ||
            _this.templateId == 6 ||
            _this.templateId == 8
          ) {
            let valid = img.width == width && img.height == height;
            valid ? resolve() : reject();
          } else {
            let valid = img.width == height && img.height == width;
            valid ? resolve() : reject();
          }
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          this.$message.error("上传的图片宽高必须是2480*3508或3508＊2480!");
          return Promise.reject();
        }
      );
      return isPNG && isSize;
    },
    handleAvatarSuccess(res) {
      this.backUrl = res.location;
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  text-align: left;
  width: 1000px;
  margin-top: 20px;
  span {
    font-size: 14px;
    color: #9b9b9b;
    margin-left: 15px;
  }
  h4 {
    background: #f0f0f0;
    border-radius: 5px;
    width: 240px;
    font-size: 14px;
    color: #4a4a4a;
    text-align: center;
    margin-bottom: 15px;
    line-height: 20px;
    padding: 3px 0;
  }
  p {
    width: 240px;
    font-size: 14px;
    color: #9b9b9b;
    line-height: 22px;
  }
}

.logouploader {
  .logoimg {
    position: relative;
    z-index: 0;
    .detail {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 20px;
      line-height: 24px;
      color: #000;
      z-index: 2;
    }
  }
  i {
    font-size: 50px;
    text-align: center;
    line-height: 180px;
    color: #8c939d;
    cursor: pointer;
  }
  img {
    max-width: 360px;
    max-height: 180px;
    position: relative;
    z-index: 1;
  }
}
.img {
  margin-top: 30px;
  padding-bottom: 30px;
  .type {
    width: 1052.4px;
    height: 744px;
    position: relative;
    color: #635300;
    .orderTitle {
      position: absolute;
      top: 189px;
      left: 110.1px;
      font-size: 19.5px;
      line-height: 26px;
      text-align: left;
      .name {
        margin-bottom: 9.7px;
        width: 660px;
        position: relative;
        i {
          position: absolute;
          top: 0;
          left: -20px;
          cursor: pointer;
        }
        p {
          width: 85px;
          display: inline-block;
          margin-right: 17.9px;
        }
      }
    }
    .code {
      width: 120px;
      height: auto;
      position: absolute;
      top: 60.6px;
      right: 55.8px;
      text-align: left;
      .codeimg {
        width: 120px;
        height: 120px;
        background: #fff;
        margin-bottom: 8.7px;
      }
      p {
        font-size: 15px;
        line-height: 21px;
      }
      p.code1 {
        font-size: 12px;
      }
    }
    .message {
      width: 715.2px;
      height: auto;
      position: absolute;
      top: 350.1px;
      left: 168.3px;
      text-align: left;
      p {
        font-size: 24px;
        line-height: 33px;
        text-indent: 2em;
      }
      h2 {
        font-size: 84px;
        color: #d0021b;
        line-height: 90px;
        text-align: center;
        margin: 26.7px;
      }
      h3 {
        font-size: 19.5px;
        line-height: 26px;
        font-weight: 150;
      }
    }
    .footer {
      width: auto;
      height: auto;
      position: absolute;
      top: 607.2px;
      right: 140.4px;
      font-size: 19.5px;
      line-height: 26px;
      text-align: right;
      .name {
        position: relative;
        z-index: 2;
        height: 26px;
        i {
          position: absolute;
          top: 0;
          left: -20px;
          cursor: pointer;
        }
      }
      img {
        width: 178.5px;
        height: 178.5px;
        position: absolute;
        right: 0;
        top: -93.3px;
        z-index: 1;
      }
    }
  }

  .type5,
  .type6,
  .type8 {
    width: 1116px;
    height: 1578.6px;
    position: relative;
    .orderTitle {
      top: 431px;
      left: 114px;
      font-size: 29.25px;
      line-height: 40px;
      .name {
        margin-bottom: 14px;
        width: 840px;
        p {
          width: 127px;
          margin-right: 27.6px;
        }
      }
    }
    .code {
      width: 180px;
      top: 63.5px;
      right: 57.1px;
      .codeimg {
        width: 180px;
        height: 180px;
        background: #fff;
        margin-bottom: 13px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
      }
      p {
        font-size: 22.5px;
        line-height: 31px;
      }
    }
    .message {
      width: 813.6px;
      top: 687.6px;
      left: 145.8px;
      p {
        font-size: 36px;
        line-height: 50px;
        text-indent: 2em;
      }
      h2 {
        font-size: 126px;
        line-height: 135px;
        margin: 39.6px 0 85.5px;
      }
      h3 {
        font-size: 29.25px;
        line-height: 40px;
        font-weight: 150;
      }
    }
    .footer {
      top: 1224px;
      right: 170.6px;
      font-size: 29.25px;
      line-height: 40px;
    }
  }
  .type8 {
    .code {
      width: auto;
      top: 1069px;
      left: 131px;
      right: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .codeimg {
        width: 116px;
        height: 116px;
        background: rgba(157, 120, 76, 1);
        margin-right: 14px;
        margin-bottom: 0;
      }
      span {
        height: 116px;
        width: 140px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        flex-wrap: wrap;
        align-content: flex-end;
      }
      p {
        width: 138px;
        font-size: 22px;
        color: rgba(74, 74, 74, 1);
        line-height: 31px;
        &.code1 {
          font-size: 22px;
        }
      }
    }
    .message {
      width: 100%;
      top: 292px;
      left: 0;
      text-align: center;
      p {
        width: 100%;
        height: 105px;
        font-size: 77px;
        color: rgba(156, 121, 74, 1);
        line-height: 105px;
        text-indent: 0;
        font-weight: bold;
        margin: 0 auto;
      }
      h3 {
        width: 100%;
        height: 123px;
        font-size: 90px;
        color: rgba(156, 121, 74, 1);
        line-height: 123px;
        font-weight: bold;
        margin: 0 auto;
        margin-top: 96px;
      }
    }
    .footer {
      top: 1218px;
      right: 157px;
      font-size: 29.25px;
      line-height: 40px;
      img {
        top: -59.3px;
      }
    }
    .orderTitle1 {
      position: relative;
      .name {
        position: absolute;
        text-align: left;
        font-size: 29.25px;
        line-height: 40px;
        i {
          position: absolute;
          top: 6px;
          left: -20px;
          cursor: pointer;
        }
        p {
          span {
            font-size: 41px;
            color: rgba(156, 121, 74, 1);
            font-weight: bold;
            margin-bottom: 5px;
          }
          span.small {
            font-size: 23px;
            color: rgba(156, 121, 74, 1);
            line-height: 31px;
            font-weight: normal;
          }
        }
        span {
          font-size: 23px;
          color: rgba(156, 121, 74, 1);
          line-height: 31px;
        }
      }
      .name1 {
        left: 133px;
        top: 726px;
      }
      .name2 {
        left: 612px;
        top: 726px;
      }
      .name3 {
        left: 133px;
        top: 879px;
      }
      .name4 {
        left: 133px;
        top: 1253px;
        p {
          margin-bottom: 23px;
        }
      }
    }
  }
  .type4,
  .type6 {
    color: #415e80;
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
}
.setrules {
  p {
    font-size: 14px;
    color: #4a4a4a;
    line-height: 20px;
    margin: 20px 0;
    span {
      font-size: 12px;
    }
  }
}
</style>

<style lang="less">
.certSet {
  .el-input__inner {
    line-height: 26px;
    height: 26px;
    padding: 0;
  }
}
</style>
