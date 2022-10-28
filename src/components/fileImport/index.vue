<template>
  <div class="leading-in">
    <p class="back_to" @click="backTo()">
      <i class="el-icon-arrow-left" style="margin-right:0.3rem;color:#000;"></i>
      <span>返回</span>
    </p>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">导入</el-menu-item>
    </el-menu>

    <div
      v-if="activeIndex=='1'"
      class="main_content"
      v-loading.fullscreen="fullscreenLoading"
      :element-loading-text="loadingText"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="step-container">
        <el-button
          class="prev-step"
          size="small"
          @click="goToPrevStep()"
          v-show="stepActive == 1"
        >上一步</el-button>
        <el-button
          class="next-step"
          type="primary"
          size="small"
          @click="goToNextStep()"
          v-show="stepActive == 1"
        >下一步</el-button>
        <el-steps :active="stepActive" finish-status="success" simple>
          <el-step title="上传文档"></el-step>
          <el-step title="配对字段"></el-step>
          <el-step title="导入平台"></el-step>
        </el-steps>
      </div>
      <div class="step-one" v-show="stepActive == 0 || stepActive == 2">
        <subCompetitionName
          :width="360"
          v-show="showUpload"
          :onChange="searchChange"
          :value="competitionId"
          type="2"
        />
        <!-- <subCompetitionName 
					:width='360'
					v-show="showUpload"
                    :onChange="searchChange"
                    :id="id"
                    :value="competitionId"
                    type="2"
        />-->
        <upload
          :disabled="!competitionId"
          v-show="showUpload"
          class="upload-demo"
          :drag="true"
          action="/"
          :onSuccess="OnSuccess"
          :onError="OnError"
          :beforeUpload="beforeAvatarUpload"
          :showlist="false"
          :config="{temp:true}"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="notice" v-show="stepActive == 0">
            <a :href="api.downTemp" class="download-mould">
              <i class="iconfont icon-xiazai1"></i>下载模板
            </a>
            支持.xls、.xlsx文件
          </div>
        </upload>

        <div class="leading-in-result" v-show="showResult">
          <div class="leading-in-success" v-show="isSuccess == 2">
            <i class="el-icon-success"></i>导入成功
          </div>
          <div class="leading-in-fail" v-show="isSuccess == 3">
            <i class="el-icon-error"></i>导入失败
          </div>
        </div>
        <div class="process" v-show="showProcess">
          <div>正在匹配...</div>
          <el-progress :percentage="processNum"></el-progress>
        </div>
        <div class="pair-result">
          <div class="success-result" v-show="successMsg != ''">
            <i class="el-icon-success"></i>
            {{ successMsg }}
          </div>
          <div class="fail-result" v-show="failMsg != ''">
            <i class="el-icon-error"></i>&nbsp;
            <span>导入失败，请修改源文档后重新导入</span>
            <div class="fail-msg">{{ failMsg }}</div>
          </div>
        </div>
        <el-row style="text-align: center; margin-top: 3rem;" v-show="stepActive == 2">
          <el-button type="primary" @click="goToNextStep(1)" v-if="btnShow" :disabled="!isSubmit">提交</el-button>
        </el-row>
      </div>
      <div class="step-two" v-show="stepActive == 1">
        <div class="title-row">
          <div>标题行</div>
          <div>第</div>
          <div class="title-row-inp">
            <el-input v-model.trim="titleRow" @keyup.native="getDataByTitleRow()"></el-input>
          </div>
          <div>行</div>
        </div>
        <div class="field-container" v-loading="dataLoading">
          <ul class="parse-field">
            <li>
              <div class="field-title">对应系统字段</div>
              <div class="field-title">解析字段</div>
            </li>
            <li v-for="(item, index) in parseField" :key="index">
              <el-select
                v-model="valArr[index]"
                filterable
                remote
                clearable
                @change="handleChange"
                @focus="options = []"
                placeholder="请选择对应的系统字段"
              >
                <!-- :remote-method="remoteMethod" -->
                <el-option
                  v-for="con in systemField"
                  :label="con.name"
                  :key="con.name"
                  :value="index+','+con.name"
                ></el-option>
              </el-select>
              <el-input v-model="parseField[index]" :readonly="true"></el-input>
            </li>
          </ul>
          <ul class="system-field">
            <li>
              <div class="field-title">系统字段</div>
            </li>
            <li v-for="(item, index) in systemField" :key="index" class="sys-li">
              <span v-if="item.required">*</span>
              <el-input v-model="systemField[index].name" :readonly="true"></el-input>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="step-three" v-show="stepActive == 2">
				
      </div>-->
    </div>
    <div v-else>
      <!--  配对管理 -->
      <pair v-if="activeIndex=='2'" />
    </div>
  </div>
</template>

<script>
import jxapi from "@@/api/jxapi/index";
import upload from "@@/components/fileUpload/index";
import { getBaseInfo, getCompetitionId, getUserInfo } from "@@/utils/commons";
import subCompetitionName from "@@/components/subcompetition/index";
import { isEmpty } from "lodash";
import pair from "./common/pair";

export default {
  props: {
    type: {
      required: true,
      type: Number
    }
  },
  components: {
    upload,
    subCompetitionName,
    pair
  },
  data() {
    return {
      btnShow: true, //提交按钮的显示隐藏
      competitionId: "",
      api: {},
      //downTemp:'',//模版地址
      showUpload: true, // 显示文件上传
      showProcess: false, // 显示进度条
      processNum: 1, // 进度条值
      showResult: true,
      fullscreenLoading: false,
      dataLoading: false, // 通过标题行获取数据loading
      stepActive: 0, // 步骤
      isSuccess: 1, // 导入是否成功 1:尚未导入 2:成功 3:失败
      isEdited: false, // 判断是否编辑过东西
      options: [],
      valArr: [], // 选中的值
      dyArr: [], // 对应数组
      mateArr: {}, // 匹配数组
      exportFiledData: {},
      parseField: [], // 解析字段
      systemField: [], // 系统字段
      mustSystemField: [], // 必须对应系统字段
      url: "", // 文档地址
      successMsg: "", // 匹配成功提示
      failMsg: "", // 匹配失败提示
      isSubmit: false,
      notify: "", // 通知栏实例
      loadingText: "", // 加载text
      titleRow: 1, // 标题行
      searchUrl: "", // 搜索地址
      submithUrl: "", // 匹配和提交
      titleRowUrl: "", // 修改标题行获取数据
      activeIndex: "1", // 默认选择导入模块
      user: {},
      fileName: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.user = getUserInfo();
      //this.competitionId =this.isLastChild ? '':getCompetitionId()
      let type = this.type; //1 结果 2 报名
      this.api = jxapi.fileImport[type];
    },
    handleSelect(val) {
      this.activeIndex = val;
      if (val == "1") {
        this.init();
      }
    },
    // 上传文件前执行函数
    beforeAvatarUpload(file) {
      if (!/\.xls(?:|x)$/.test(file.name)) {
        this.$message.error("仅支持.xls或.xlsx格式文件!");
        return false;
      }
      this.fullscreenLoading = true;
      this.loadingText = "文件正在上传...";
    },
    //上传Oss后请求字段
    async OnSuccess(result, filelist) {
      this.url = result.name;
      this.fileName = filelist.name;
      let res = await this.api.enrol({
        data: { url: result.location, objectKey: result.name }
      });

      this.showResult = true;
      // 上传文件不能提交
      this.isSubmit = false;
      this.fullscreenLoading = false;
      if (res == "error") return (this.isSuccess = 3);

      this.getField(res);
    },
    // 上传成功
    getField(res) {
      // console.log(res);
      let _this = this;
      // if (res.code == 200) {
      //     this.isSuccess = 2;

      // 在第三步上传
      if (this.stepActive == 2) {
        //this.url = res.url;
        this.successMsg = "";
        this.failMsg = "";
        this.showProcess = true;
        this.goToNextStep();
        return;
      }

      setTimeout(function() {
        _this.stepActive = 1;
      }, 600);

      this.parseField = res.data;
      this.systemField = res.sysFiled;
      this.mustSystemField = res.must;

      this.titleRow = res.filed;
      this.isEdited = true;
      this.valArr.length =
        this.parseField.length > this.systemField.length
          ? this.parseField.length
          : this.systemField.length;
      // } else {
      // 	this.isSuccess = 3;
      //     this.$message.error(res.message);
      //     // 在第三步上传
      // 	if (this.stepActive == 2) {
      // 		this.successMsg = '';
      // 		this.failMsg = '';
      // 		return;
      // 	}
      // }
    },
    // 上传失败
    OnError() {
      this.fullscreenLoading = false;
    },

    // 标题行
    async getDataByTitleRow() {
      this.titleRow = this.titleRow.replace(/[^\d]|^[0]/g, "");
      // 必填
      if (!this.titleRow) {
        this.$message.error("请输入标题行");
        return;
      }
      this.dataLoading = true;

      let res = await this.api.titleRow({
        data: {
          cid: this.competitionId,
          objectKey: this.url,
          filed: this.titleRow
        }
      });
      this.dataLoading = false;
      if (res == "error") return;
      this.mateArr = {};
      this.exportFiledData = {};
      this.dyArr = [];
      this.valArr = [];
      this.valArr.length =
        this.parseField.length > this.systemField.length
          ? this.parseField.length
          : this.systemField.length;

      // 获取新数据
      this.parseField = res.data;
      this.systemField = res.sysFiled;
      this.mustSystemField = res.must;
    },

    // 整数检测
    checkNumber() {
      this.titleRow = this.titleRow.replace(/[^\d]/g, "");
    },

    // 选择对应系统字段
    handleChange(res) {
      if (!res) return;
      let tempObj = {};
      let curIndex = res.split(",")[0];
      let team = res.split(",")[1];
      let curField = team.split(".")[1];
      let sysNum = team.split(".")[0];

      //tempObj[this.parseField[curIndex]] = curField;
      //tempObj[sysNum] =parseInt(curIndex);
      this.mateArr[curIndex] = parseInt(sysNum); //.push(tempObj);
      // this.mateArr[sysNum] =parseInt(curIndex)//.push(tempObj);
      this.exportFiledData[sysNum] = this.parseField[curIndex];
      this.dyArr.push(team);
      // this.mateArr[sysNum] = this.mateArr[sysNum]?this.mateArr[sysNum]:[];
      // this.mateArr[sysNum].push(parseInt(curIndex))
      // this.exportFiledData[sysNum] = this.exportFiledData[sysNum]?this.exportFiledData[sysNum]:[];
      // this.exportFiledData[sysNum].push(this.parseField[curIndex])
    },
    // 远程搜索
    async remoteMethod(query) {
      if (query) {
        let res = await this.api.search({ data: { keyword: query } });
        if (res == "error") return;
        this.options = [];
        res.map(item => {
          this.options.push({
            label: item.sys_filed,
            sysNum: item.sys_num,
            value: item.db_filed
          });
        });
      }
    },
    // 上一步
    goToPrevStep() {
      this.$confirm("返回上一步，本页内容不会保存，确定返回上一步吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.stepActive = 0;
          this.isSuccess = 1;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消返回上一步"
          });
        });
    },
    // 下一步
    // type 0匹配  1提交入库
    async goToNextStep(type = 0) {
      let _this = this;
      for (let i = 0; i < this.mustSystemField.length; i++) {
        // 如果有必填的系统字段未选
        if (this.dyArr.indexOf(this.mustSystemField[i]) == -1) {
          if (!type) {
            return this.$message.error("必填系统字段必须匹配!");
          }
        }
      }
      // 必须先匹配
      if (isEmpty(this.mateArr)) {
        this.$message.error("请先匹配");
        return;
      }
      this.showUpload = false;
      this.showResult = false;
      this.stepActive = 2;
      this.isSubmit = false;
      if (type == 1) {
        this.fullscreenLoading = true;
        this.loadingText = "正在提交...";
      } else {
        this.showProcess = true;
        var interval = setInterval(function() {
          if (_this.processNum <= 95) {
            _this.processNum += 2;
          }
        }, 50);
      }
      let dataMateArr = this.getdetail(this.mateArr);
      let res;
      if (type == 1) {
        res = await this.api.submit({
          noError: true,
          data: {
            cid: this.competitionId,
            fileName: this.fileName,
            objectKey: this.url,
            fileddata: dataMateArr,
            exportFiledData: this.exportFiledData,
            filed: this.titleRow,
            isadd: type
          }
        });
      } else {
        res = await this.api.submit({
          data: {
            cid: this.competitionId,
            fileName: this.fileName,
            objectKey: this.url,
            fileddata: dataMateArr,
            exportFiledData: this.exportFiledData,
            filed: this.titleRow,
            isadd: type
          }
        });
      }
      this.processNum = 100;
      clearInterval(interval);
      // 不管成功与否都可以提交
      this.isSubmit = true;
      // 第一步的提交结果隐藏
      this.showResult = false;
      // 隐藏进度条
      this.showProcess = false;
      this.processNum = 1;

      this.fullscreenLoading = false;
      if (res == "error") {
        console.log(error,'123');
        this.showUpload = true;
        this.failMsg = "请根据'查询导入'里的错误提示修改表格后重试！";
        return;
      }
      this.showUpload = false;
      if (type == 1) {
        this.btnShow = false;
        this.$alert(
          "文档内容正在上传中，请稍后前往竞赛结果查询。",
          "温馨提示",
          {
            confirmButtonText: "知道了",
            showClose: false,
            callback: action => {
              this.handleSkip();
            }
          }
        );
      } else {
        this.successMsg = "字段匹配成功，可以导入！";
        this.failMsg = "";
      }
    },
    getdetail(arr) {
      let obj = {};
      for (let i in arr) {
        let j = arr[i];
        if (!obj[j]) {
          obj[j] = [];
        }
        obj[j].push(i);
      }
      return obj;
    },
    // 跳转到竞赛结果
    handleSkip() {
      // this.notify.close();
      this.$router.back();
    },
    // 返回
    backTo() {
      if (this.isEdited) {
        this.$confirm("修改内容未提交，是否确定放弃修改?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "info",
              message: "已放弃修改!"
            });
            this.$router.back();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消放弃修改"
            });
          });
      } else {
        this.$router.back();
      }
    },
    searchChange(v) {
      this.competitionId = v;
    }
  },
  computed: {
    // isLastChild(){
    //     return !!getBaseInfo().childCompetitionsId
    // },
    // lastName(){
    //     return getBaseInfo().name
    // },
    id() {
      return getCompetitionId();
    }
  }
};
</script>

<style lang="less" scoped>
.fail-msg {
  margin-top: 14px;
  color: red;
}
.step-two {
  .title-row {
    width: 100%;
    margin: 0.5rem 0 1.1rem 0;
    background-color: #f1f1f2;
    height: 86px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    & > div:first-child {
      font-size: 0.8rem;
      margin-right: 1.1rem;
    }
    .title-row-inp {
      margin: 0 0.6rem;
      input {
        width: 50px;
        height: 44px;
        padding: 0 12px;
      }
    }
  }
  .field-container {
    display: flex;
    justify-content: space-between;
  }
  li {
    display: flex;
    font-size: 0.7rem;
    margin-bottom: 0.8rem;
    &.sys-li {
      position: relative;
      span {
        position: absolute;
        left: -12px;
        color: #f56c6c;
        line-height: 40px;
      }
    }
    &:first-child {
      margin-bottom: 0.2rem;
    }
    .field-title {
      padding-left: 0.4rem;
    }
    input {
      height: 44px;
      line-height: 44px;
    }
    .field-title:first-child,
    input:first-child {
      width: 140px;
    }
    .field-title:last-child,
    input:last-child {
      margin-left: 0.8rem;
      width: 210px;
    }
  }
}
.leading-in {
  max-width: 1152px;
  margin: 20px auto;
  .back_to {
    text-align: left;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .el-menu-demo {
    background: rgb(246, 248, 250);
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    background: rgb(246, 248, 250);
  }
  .el-menu-item:hover {
    background: rgb(246, 248, 250);
  }
  .step-one {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .el-upload__tip {
    font-size: 16px;
  }
  .el-select {
    width: 360px;
    margin-right: 16px;
  }
  .step-container {
    margin: 30px auto;
  }
}
.el-notification__title {
  text-align: center;
  margin-bottom: 20px;
}
.el-notification button {
  margin: 30px 0 6px 96px;
}
</style>

