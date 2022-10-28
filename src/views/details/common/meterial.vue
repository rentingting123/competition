<template>
  <div class="meterial" v-loading="loading">
    <div class="dialog_title">
      <span>
        {{
          (baseInfo && baseInfo.materialName) ||
          $t("competitionDetails.materials")
        }}
      </span>
      <p></p>
      <!-- <i class="iconfont" @click="hidematerial()" title="关闭">&#xe623;</i> -->
    </div>
<<<<<<< HEAD
=======
    
>>>>>>> relase
    <div class="mess">
      <p>注1：请根据竞赛通知参赛，部分竞赛无须上传报名附加材料，不用提交</p>
      <p>
        注2：本页面提交的是报名附加材料，参赛作品请在<strong>作品提交</strong>处上传
      </p>
      <p>注3：<strong>团队如果有修改</strong>，请重新下载表单并盖章上传</p>
      <p>&nbsp;</p>
    </div>
    <el-form ref="form" :model="forminfor" label-width="80px">
      <el-form-item :label="$t('competitionDetails.events')">
        <competitionSelect
          :value="forminfor.cId"
          type="3"
          :onChange="changeSubmitCId"
          :id="this.id"
        />
      </el-form-item>

      <el-form-item :label="$t('competitionDetails.team')">
        <el-select
          v-model="forminfor.gId"
          filterable
          @change="gIdChange"
          :loading="forminfor.loading"
          :remote-method="selectGroup"
          reserve-keyword
          remote
          :placeholder="$t('competitionDetails.primaryKey')"
        >
          <el-option
            v-for="item in groupList"
            :key="item.groupId"
            :label="item.userName + '-' + item.groupName"
            :value="item.groupId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('competitionDetails.attachment')">
        <upload
          :disabled="!forminfor.cId || !forminfor.gId"
          class="upload-demo"
          :onRemove="onRemove"
          :beforeRemove="beforeRemove"
          :drag="true"
          :fileList="urls"
          accept=".doc, .docx, .pdf, .jpg, .png, .gif"
          name="attach"
          :onSuccess="handleAvatarSuccess"
        >
          <i class="iconfont">&#xe614;</i>
          <div class="el-upload__text">
            {{ $t("competitionDetails.mess4") }}
            <em>{{ $t("competitionDetails.upload") }}</em>
            <div class="el-upload__tip" slot="tip" style="color: #000000">
              {{ $t("competitionDetails.extensions") }}：.pdf .jpg.png.gif.docx
            </div>
          </div>
        </upload>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        :disabled="!forminfor.cId || !forminfor.gId || urls.length < 1"
        class="submit_btn"
        @click="seInformation('forminfor')"
      >
        {{ $t("competitionDetails.submit") }}
      </el-button>
    </span>
  </div>
</template>

<script>
import competitionSelect from "@@/components/subcompetition/index";
import { getGroupId, getBaseInfo } from "@@/utils/commons";
import upload from "@@/components/fileUpload/index";
import jxapi from "@@/api/jxapi/index";

export default {
  props: {
    close: Function,
  },
  components: {
    competitionSelect,
    upload,
  },
  data() {
    return {
      forminfor: {
        competitionId: "", //竞赛ID
        competitionChildId: "", //子竞赛ID
        competitionRange: "", //赛区
        cId: "",
        gId: "",
        //'applyType': '',        //组织 1 个人  2 团队  4  都有
        //groupId: getGroupId()
      },
      groupList: [],
      urls: [], //报名附件
      id: "",
      loading: false,
      baseInfo: {},
    };
  },
  created() {
    this.id =
      this.$route.query.id || parseInt(localStorage.getItem("competitionId"));
    this.baseInfo = getBaseInfo();
  },
  methods: {
    //补交资料弹框
    async gIdChange(v) {
      // console.log(v)
      this.loading = true;
      let list = await jxapi.getSubmitedMateralData({ data: { groupId: v } });
      if (list == "error") {
        this.forminfor.gId = "";
        this.loading = false;
        return;
      }
      this.loading = false;
      this.urls =
        (list &&
          list.fileList.map((_f) => {
            _f.fileKey = _f.url.substr(_f.url.indexOf("webFile/"));
            return _f;
          })) ||
        [];
      this.materaialId = list && list.id;
    },

    handleAvatarSuccess(res, file, fileList) {
      this.urls = fileList;
    },
    async beforeRemove(file, fileList) {
      if (!this.materaialId) return false;
      let del = await jxapi.delMateralData({ data: { id: this.materaialId } });
      if (del == "error") return new Promise().reject();
    },
    onRemove(file, fileList) {
      this.urls = fileList;
    },

    changeSubmitCId(v) {
      this.forminfor.gId = "";
      this.forminfor.cId = v;
      this.selectGroup();
    },
    async selectGroup(search) {
      if (!this.forminfor.cId) return;
      this.forminfor.loading = true;
      let group = await jxapi.groupInfo({
        data: {
          competitionId: this.forminfor.cId,
          sort: search,
        },
      });
      this.forminfor.loading = false;
      if (group == "error") return;
      this.groupList = group.list;
    },
    //关闭补交资料弹框
    hidematerial() {
      //清空数据
      this.forminfor.competitionChildId = "";
      this.forminfor.competitionRange = "";
      return this.close && this.close();
    },
    //补交资料提交
    async seInformation(inform) {
     
      this.repetitionBtn = true;
      this.signUpShow = false;
      //清空数据
      this.forminfor.competitionChildId = "";
      this.forminfor.competitionRange = "";
      let params = {
        fileList: this.urls.map((_f) => ({
          url: _f.url,
          name: _f.name,
        })),
        type: 5,
        groupId: this.forminfor.gId,
        competitionId: this.forminfor.cId,
        id: this.materaialId?this.materaialId:this.id,
      };
       console.log(this.materaialId,params, "this.materaialId");
      let submit = await jxapi.setMateralData({ data: params });
      if (submit == "error") return;
      this.$message.success(this.$t("competitionDetails.submitSuccess"));
      this.$store.state.teamReload = !this.$store.state.teamReload;
      this.close && this.close();
    },
  },
  watch: {
    $route: function (t, f) {
      if (!this.$route.query.id) return;
      this.id = this.$route.query.id;
    },
  },
};
</script>

<style lang="less" scoped>
.meterial {
  display: block;
  margin: 0 auto;
  text-align: center;
  width: 78%;
  .mess {
    color: red;
    p {
      text-align: left;
      font-size: 13px;
      margin-bottom: 5px;
    }
  }
}
.dialog_title {
  position: relative;
  text-align: left;
  margin-bottom: 24px;
  span {
    font-weight: bold;
    font-size: 16px;
  }
  p {
    width: 24px;
    height: 3px;
    background: #1d86ff;
    margin-top: 8px;
  }
  i {
    position: absolute;
    right: -32px;
    top: -8px;
    font-size: 11.2px;
    cursor: pointer;
  }
}
/deep/ .el-form-item__error {
  left: 33.6px;
}
/deep/ .el-cascader {
  width: 358.4px;
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
  }
  /deep/ .el-upload__text {
    margin-top: 16px;
  }
}
.el-select {
  width: 361.6px;
}
.el-input {
  width: 361.6px;
}
label {
  font-size: 12.8px;
  text-align: left;
}
.btn {
  padding-top: 8px;
  width: 100%;
  text-align: left;
  padding-left: 100.8px;
}
</style>
