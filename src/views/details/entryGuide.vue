<template>
  <!--竞赛指南-->
  <div id="entryGuide">
    <!-- 参赛指南 -->
    <div class="tag_content">
      <div class="message_content">
        <div class="editor">
          <div class="tag_name">
            <span></span>
            <div class="title">
              <h1>{{tabsName}}</h1>
              <i class="el-icon-edit-outline" @click="entryGuide_dialog = true" v-if="finish!=0 && isEdit"></i>
            </div>
          </div>
          <template v-if="competitionId">
            <!-- <div class="tag_content_title" v-if="entryGuideData.title">赛题</div> -->
            <div class="tag_content_txt" v-html="entryGuideData.title" style="white-space:pre-wrap"></div>
            <!-- <div class="tag_content_title" v-if="entryGuideData.rule">评审规则</div> -->
            <div class="tag_content_txt" v-html="entryGuideData.rule" style="white-space:pre-wrap"></div>
            <div class="tag_content_title" v-if="awardsListshow">
              {{$t('entryGuide.events')}}
            </div>
            <div class="tag_content_txt" v-for="(item, $index) in awardsList" :key="$index">
              <p
                v-if="item.name && item.unit === '若干'"
              >{{item.name}}&nbsp;{{item.unit}} {{item.prize}}</p>
              <p
                v-else-if="item.name"
              >{{item.name}}&nbsp;{{item.number}}{{item.unit}} {{item.prize}}</p>
              <p v-else></p>
            </div>
            <!-- <div class="tag_content_title" v-if="entryGuideData.guide">参赛指南</div> -->
            <div class="tag_content_txt" v-html="entryGuideData.guide" style="white-space:pre-wrap"></div>
            <dl class="contact">
              <dt class="tag_content_title">{{$t('entryGuide.Contact')}}</dt>
              <dd>
                <p>{{$t('entryGuide.dingding')}}</p>
                <p>{{entryGuideData.qq}}</p>
              </dd>
              <dd>
                <p>{{$t('entryGuide.tel')}}</p>
                <p>{{entryGuideData.phone}}</p>
              </dd>
              <dd>
                <p>{{$t('entryGuide.email')}}</p>
                <p>{{entryGuideData.mail}}</p>
              </dd>
              <dd>
                <p>{{$t('entryGuide.WeChat')}}</p>
                <p>{{entryGuideData.weixin}}</p>
              </dd>
            </dl>
            <div class="tag_content_title" v-if="infoUrls">{{$t('entryGuide.information')}}
                  <span  v-if="!authority.downCompetitionMaterial">({{$t('entryGuide.message')}})</span>
            </div>
          
            <p v-for="(item, index) in infoUrls" :key="'info'+index">
              <a :href="item" class="tag_content_txt" v-if="authority.downCompetitionMaterial" style="color: #4a90e2;">
                <i class="iconfont" style="font-size: 12px;margin-right: 5px" v-if="item">&#xe610;</i>
                {{getFileName(item)}}
              </a>
              <span v-else>
                   {{getFileName(item)}}
              </span>
            </p>
          </template>
        </div>
      </div>
    </div>

    <!--参赛指南弹框-->
    <el-dialog
      :modal-append-to-body="false"
      :visible.sync="entryGuide_dialog"
      :close-on-click-modal="false"
      width="50rem"
      >
      <div class="g-content">
        <p class="m-head">
          {{tabsName}}
        </p>
        <!-- <p class="m-head">赛题：</p> -->
        <!--富文本编辑器-->
        <editor class="m-text" :setDate="setDatetitle" :stateData="entryGuideData.title" />

        <!-- <p class="m-head">评审规则：</p> -->
        <!--富文本编辑器-->
        <editor class="m-text" :setDate="setDaterule" :stateData="entryGuideData.rule" />
        <!-- 删除了上传组件 -->
        <!-- <p class="m-head">参赛指南：</p> -->
        <!--富文本编辑器-->

        <editor class="m-text" :setDate="setDateguide" :stateData="entryGuideData.guide" />

        <dl>
          <dt>联系方式:</dt>
          <dd>
            <p>客服钉钉：</p>
            <el-input placeholder="请输入" v-model="entryGuideData.qq"></el-input>
          </dd>
          <dd>
            <p>客服电话：</p>
            <el-input placeholder="请输入" v-model="entryGuideData.phone"></el-input>
          </dd>
          <dd>
            <p>邮箱：</p>
            <el-input placeholder="请输入" v-model="entryGuideData.mail"></el-input>
          </dd>
          <dd>
            <p>微信公众号：</p>
            <el-input placeholder="请输入" v-model="entryGuideData.weixin"></el-input>
          </dd>
        </dl>

        <div class="m-title">
          <span class="m-titleSpanOne">
            <i></i>奖项
          </span>
          <span class="m-titleSpanTwo">
            <i></i>获奖数
          </span>
          <span>
            奖品
            <em>对应奖励</em>
          </span>
        </div>
        <div class="awards" v-bind:key="index" v-for="(item, index) in awardsList">
          <el-input style="width:90px;" v-model="item.name"></el-input>
          <div class="awardsNums">
            <span class="awardsNums_left">|</span>
            <el-input style="width:50px;" :disabled="item.unit === '若干'" v-model="item.number"></el-input>
            <el-select
              v-model="item.unit"
              filterable
              allow-create
              default-first-option
              @change="changeAwards(item)"
              placeholder="请选择"
              style="width:80px;"
            >
              <el-option
                v-for="obj in options"
                :key="obj.value"
                :label="obj.label"
                :value="obj.value"
              ></el-option>
            </el-select>
            <span class="awardsNums_right">|</span>
          </div>
          <el-input style="width:162px;" v-model="item.prize"></el-input>
          <i class="awardsDel" v-if="!index"></i>
          <i class="iconfont awardsDel" @click="
                    delIdx(index)" v-else>&#xe61e;</i>
        </div>
        <p
          style="font-size:12px; cursor:pointer; color:#409EFF; margin:10px 0;"
          @click="addAwards"
        >+增加1个奖项</p>
        <p class="m-head">大赛资料</p>
        <upload
          class="avatar-uploader"
          accept=".doc, .docx, .pdf, .jpg, .png, .gif"
          :showlist="true"
          :drag="true"
          :onSuccess="upSuccess"
          :onRemove="upRemove"
          :fileList="infoUrlList"
          :config="config"
        >
          <div class="avatar">
            <i class="iconfont">&#xe614;</i>
            <p>点击或将文件拖拽到这里上传</p>
            <p>仅支持扩展名：doc .docx .pdf .jpg.png.gif</p>
          </div>
        </upload>
      </div>
      <div slot="footer" class="group_btn">
        <el-button size="small" @click="entryGuide_dialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editEntryGuide">完 成</el-button>
      </div>
    </el-dialog>
    <el-dialog title="参赛指南" :visible.sync="del" :close-on-click-modal="false" width="30rem">
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="del = false">取 消</el-button>
        <el-button size="small" type="primary" @click="Delete()">完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import network from "@@/api/jxapi/index";
import editor from "@@/components/editor/index";
import upload from "@@/components/fileUpload/index";
import {mapState } from 'vuex'
import { getToken } from "../../utils/oauth";
import { getTabsName } from '@@/utils/commons'
export default {
  name: "entryGuide",
  props:['tabs'],
  data() {
    return {
      isEdit: false,
      entryGuide_dialog: false, // 参赛指南弹框
      editorOption: {
        placeholder: "请输入内容..."
        // modules: {
        //     toolbar: [
        //         ['bold', 'italic'],        // toggled buttons
        //         [{'header': [1, 2, 3, 4, 5, 6, false]}], // 标题 - header
        //         [{'list': 'ordered'}, {'list': 'bullet'}], // 列表 - list
        //         [{'direction': 'rtl'}],  // 文本方向 - direction
        //         [{'align': []}],  // 文本对齐
        //         ['image'],  // 插入图片
        //     ]
        // }
      }, // 富文本编辑
      infoUrlList: [], // 上传文件回显
      options: [
        {
          value: "%",
          label: "%"
        },
        {
          value: "个",
          label: "个"
        },
        {
          value: "若干",
          label: "若干"
        }
      ],
      awardsList: [{}, {}], //奖项列表
      awardsListshow: false, //奖项是否显示
      del: false, //删除弹框
      idx: 0, //下标
      entryGuideData: {
        title: "",
        rule: "",
        guide: "",
        qq: "",
        phone: "",
        mail: "",
        weixin: ""
      }, // 返回的data值
      infoUrls: [],
      competitionData: [],
      upData: {}, // 上传的id
      headers: {},
      entryGuideMap: {
        title: "赛题",
        rule: "评审规则",
        guide: "参赛指南",
        qq: "客服钉钉",
        phone: "客服电话",
        mail: "邮箱",
        weixin: "微信公众号"
      },
      competitionId: "",
      config: {
        fileType: 2,
        noHash: true
      },
      tabsName: '',
      finish: 0, // 竞赛是否结束 0结束 1未结束
    };
  },
  methods: {
    setDateguide(val) {
      this.$set(this.entryGuideData, "guide", val);
    },
    setDatetitle(val) {
      this.$set(this.entryGuideData, "title", val);
    },
    setDaterule(val) {
      this.$set(this.entryGuideData, "rule", val);
    },
    changeAwards(val) {
      // console.log('hellow change')
      // console.log(val)
    },
    /**
     * 删除奖项
     * @param idx 下标
     **/
    delIdx(idx) {
      this.awardsList.splice(idx, 1);
    },
    Delete() {
      let index = this.idx;
      this.awardsList.splice(index, 1);
      this.del = false;
    },
    /**
     * 增加奖项
     **/
    addAwards() {
      this.awardsList.push({
        name: "",
        number: "",
        unit: "",
        award: ""
      });
    },
    /**
     * 请求数据
     **/
    async getGuide() {
      let baseInfo = JSON.parse(localStorage.getItem("baseInfo"));
      if (!baseInfo) {
        this.reload();
        return;
      }
      this.setData(baseInfo);
    },
    async setData(baseInfo) {
      if (baseInfo.competitionRewards) {
        this.awardsList = baseInfo.competitionRewards.awards;
        let name = "";
        for (let i in this.awardsList) {
          name += this.awardsList[i].name;
        }
        if (name) {
          this.awardsListshow = true;
        } else {
          this.awardsListshow = false;
        }
      }
      if (baseInfo.infoUrls) {
        this.infoUrls = baseInfo.infoUrls.infoUrl;
      }
      this.competitionId = baseInfo.id;
      this.upData = { competitionId: baseInfo.id };

      let infos = await network.getCompetitionInfos({
        data: { competitionId: this.competitionId }
      });
      if (infos == "error") return;
      if(infos){
        this.entryGuideData = this.formatCompetitionInfos(
          infos.competition_infos
        );
      }
      this.finish = baseInfo.finish
    },
    /**
     * 发送数据
     **/
    async editEntryGuide() {
      var that = this;
      let obj = {
        competitionInfos: {
          competition_infos: []
        }
      };
      for (let i in this.entryGuideData) {
        if (that.entryGuideMap[i]) {
          obj.competitionInfos.competition_infos.push({
            name: that.entryGuideMap[i],
            intro: that.entryGuideData[i]
          });
        }
      }
      obj["id"] = this.competitionId;

      let save = await network.saveCompetitionInfos({ data: obj });
      if (save == "error") return;
      this.saveAwards();
    },
    async saveAwards() {
      var that = this;
      let competitionData = [];
      this.infoUrlList.forEach(obj => {
        competitionData.push(obj.url);
      });
      let params = {
        competitionRewards: {
          awards: that.awardsList
        },
        infoUrls: {
          infoUrl: competitionData
        },
        id: that.competitionId
      };

      let res = await network.competitionSaveAwards({ data: params });
      if (res == "error") return;
      this.$message.success("保存成功");
      this.entryGuide_dialog = false;
      this.reload();
    },
    /**
     * 上传之前
     **/
    beforeAvatarUpload(file) {},
    /**
     * 上传成功
     **/
    upSuccess(res, file, fileList) {
      this.infoUrlList.push({
        name: file.name,
        url: res.location
      });
    },
    upRemove(res, file, fileList) {
      this.infoUrlList = fileList;
    },
    getFileName(url) {
      if (url) {
        let arr = url.split("/");
        let fileName = arr[arr.length - 1];
        let arr2 = fileName.split("_");
        let suffix = url
          .split(".")
          .pop()
          .toLowerCase();

        if (arr2[0].indexOf(suffix) != -1) {
          return `${arr2[0]}`;
        } else {
          return `${arr2[0]}.${suffix}`;
        }
      }
    },
    infoUrlFn() {
      this.infoUrls.forEach(obj => {
        let arr = obj.split("/");
        let fileName = arr[arr.length - 1];
        let arr2 = fileName.split("_");
        let suffix = obj
          .split(".")
          .pop()
          .toLowerCase();
        let name = "";
        if (arr2[0].indexOf(suffix) != -1) {
          name = arr2[0];
        } else {
          name = arr2[0] + "." + suffix;
        }
        this.infoUrlList.push({
          name: name,
          url: obj
        });
      });
    },
    async reload() {
      var that = this;
      const obj = {
        competitionId: that.competitionId
      };
      const res = await network.getCompetitionDetail({
        id: this.competitionId
      });
      localStorage.setItem("baseInfo", JSON.stringify(res));
      let baseInfo = res;
      this.setData(baseInfo);
    },
    formatCompetitionInfos(data) {
      var obj = {};
      var result = {};
      for (let i in this.entryGuideMap) {
        let temp = this.entryGuideMap[i];
        obj[temp] = i;
      }
      for (let i = 0; i < data.length; i++) {
        let key = obj[data[i].name];
        result[key] = data[i].intro;
      }
      return result;
    }
  },
  created() {
    this.tabsName = getTabsName(this.tabs,1) || '参赛指南'
    this.competitionId = parseInt(localStorage.getItem("competitionId"));
    if (this.competitionId) {
      this.getGuide();
    }

    let Authorization = "Bearer " + getToken();
    if (!getToken()) {
      Authorization = "Basic bGFudGluLXdlYjpsYW50aW4td2ViLXNlY3VyaXR5";
    }
    this.headers = {
      Authorization: Authorization
    };
    let path = this.$route.path;
    let isAdmin = localStorage.getItem("isAdmin") === "true" ? true : false;
    if (path.indexOf("details") === -1) {
      this.isEdit = true;
    }
    this.infoUrlFn();
  },
  components: {
    editor,
    upload
  },
  computed:{
        ...mapState({
      authority: state => state.authorityManagement
    })
  }
};
</script>


<style lang="less" scoped>
#entryGuide {
  width: 1040px;
  margin: auto;
  background-color: #fff;
  padding: 30px 60px;
  box-sizing: border-box;
  .contact {
    dd {
      p {
        display: inline-block;
        min-width: 80px;
        color: #4a4a4a;
        font-size: 14px;
        line-height: 28px;
        overflow: auto;
      }
    }
  }
}
// 竞赛信息
.tag_content {
  text-align: left;
  .title {
    display: flex;
    align-items: center;
    h1 {
      font-size: 30px;
      border-left: 4px solid #1d86ff;
      padding-left: 16px;
      font-weight: 500;
    }
    i {
      cursor: pointer;
      margin-left: 10px;
    }
  }
  .tag_content_title {
    margin-top: 16px;
    color: #4a4a4a;
    font-size: 18px;
    font-weight: bold;
    line-height: 28px;
  }
  .tag_content_txt {
    color: #4a4a4a;
    font-size: 14px;
    line-height: 28px;
    overflow: auto;
    .tag_content_txt_link {
      color: #4a90e2;
      cursor: pointer;
    }
    .tag_content_attestation {
      margin-left: 5px;
      // cursor: pointer;
    }
    .iconfont {
      margin-left: 5px;
    }
    .tag_content_link {
    }
    .tag_content_v {
      color: #f5a623;
      font-size: 10px;
    }
  }
}

// 竞赛信息弹框
/deep/ .el-dialog__body {
  width: 100%;
  height: 600px;
  box-sizing: border-box;
  overflow: auto;
}
.g-content {
  height: 600px;
  width: 500px;
  // width: 100%;
  padding-right: 40px;
  margin: auto;
  // overflow: auto;
  text-align: start;
  // box-sizing: border-box;
  .m-text {
    width: 500px;
    margin: auto;
  }
  .m-head {
    margin: 20px auto 8px;
    font-size: 14px;
    color: #4a4a4a;
    font-weight: bold;
  }
  .m-title {
    margin-top: 40px;
    display: flex;
    span {
      i {
        margin-right: 5px;
        color: red;
        font-style: normal;
      }
      em {
        margin-left: 15px;
        color: rgba(0, 0, 0, 0.43);
        font-style: normal;
        font-size: 12px;
      }
    }
    .m-titleSpanOne {
      width: 110px;
    }
    .m-titleSpanTwo {
      width: 170px;
    }
  }
  .awards {
    width: 440px;
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    position: relative;
    .awardsNums {
      width: 170px;
      display: flex;
      justify-content: space-between;

      span {
        font-size: 20px;
        color: #dedede;
        font-weight: 100;
      }

      /deep/ .el-input__inner {
        padding: 0;
        padding-left: 5px;
      }
    }
    .awardsDel {
      position: absolute;
      right: -30px;
      top: 32px;
      cursor: pointer;
      &:hover {
        color: #cb3a4c;
      }
    }
  }
  /deep/ .el-upload-dragger {
    width: 480px;
    height: 160px;
    margin: 20px 0;
  }
  dl {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 80px;
    dt {
      width: 100%;
      margin-bottom: 15px;
      margin-top: 25px;
    }
    dd {
      width: 40%;
      margin-top: 10px;
      p {
        margin-bottom: 6px;
      }
    }
  }
  .icon-up {
    color: #1d86ff;
    font-size: 40px;
    display: inline-block;
    margin: 21px 0;
  }
  .el-upload__text {
    color: #000;
    .el-upload__tip {
      color: rgba(0, 0, 0, 0.43);
    }
  }
}
/deep/ .el-dialog__body {
  padding: 30px 20px 0px 20px;
}
/deep/ .el-dialog__footer {
  padding: 0;
}
.group_btn {
  border-top: 1px solid #dedede;
  text-align: right;
  padding: 10px 10px 10px 0;
  box-sizing: border-box;
}

// 富文本编辑框最小高度
/deep/ .ql-editor {
  min-height: 200px;
}
</style>
<style>
.tag_content_txt img {
  max-width: 100%;
}
</style>
