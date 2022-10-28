<template>
  <table-infinite :loadData="getPageData" :allLoaded="allLoaded">
    <div class="compety_manage">
      <el-dialog title="复制创建竞赛" :visible.sync="copyCompetyDialog" :show-close="false" width="600px">

        <el-form label-position="right" :model="copyCompetyForm" :inline="false" ref="copyCompetyForm"
          label-width="100px">
          <el-form-item label="竞赛名称" prop="competitionindex" :rules="[{ required: true, message: '请选择竞赛名称' }]">
            <el-select v-model="copyCompetyForm.competitionindex" placeholder="请选择" style="width: 330px;"
              @change="competitionNameCHange()">
              <el-option v-for="(item,$index) in competitionNames" :key="$index" :label="item" :value="$index">
              </el-option>
              
            </el-select>
          </el-form-item>

          <el-form-item label="新建" prop="year" required>
            <div class="year-round">

              <el-date-picker style="width: 150px" v-model="copyCompetyForm.year" type="year" value-format="yyyy"
                placeholder="选择年份">
              </el-date-picker>
              年
              <el-input-number placeholder="请输入届数" v-model="copyCompetyForm.round" style="width: 150px"
                controls-position="right" value="" :max="10000" :min="1">
              </el-input-number>
              届
            </div>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="clearCopyForm">取 消</el-button>
          <el-button type="primary" @click="copyCompety">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 搜索栏 -->
      <div class="main_content">
        <div class="search_row">
          <el-select v-model="year" placeholder="竞赛年份" style="width:14.6rem;margin-left:0.5rem"
            @change="getPageData('search')">
            <el-option label="全部(竞赛年份)" value=""></el-option>
            <el-option v-for="(item, index) in years" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>

          <el-autocomplete style="width:14.6rem;margin-left:0.5rem" v-model="competitionName"
            :fetch-suggestions="querySearchAsync" placeholder="搜索竞赛" @select="handleSelect">
          </el-autocomplete>
          <el-button v-if="groupType == 1" @click="toDep"
            style="background:#1D86FF;color:#fff;float:right;margin-right:1rem;">部门管理</el-button>
          <!-- 竞赛手册 -->
          <handbook class="downloadButton" />
          <!-- 竞赛报告 -->
          <apply :type="8" class="downloadButton" />
          <div class="downloadButton"><span @click="downloadAllFiles"><i class="el-icon-download"></i>下载所有附件</span>
          </div>
          <div class="downloadButton"><span @click="guideOutBtn"><i class="el-icon-download"></i>导出数据</span></div>

          <div class="manage_btns">
            <el-button type="primary" size="small" style="font-size:0.7rem" @click="addCompetyBtn"><i
                class="iconfont icon-daoru"></i> 新增竞赛</el-button>
            <el-button type="primary" size="small" style="font-size:0.7rem" @click="copyCompetyBtn"><i
                class="iconfont icon-daoru"></i> 复制创建</el-button>
            <router-link :to="{name: 'leadingIn', params:{id: 0, type: 1}}"> </router-link>
            <el-button type="primary" size="small" style="font-size:0.7rem" @click="guideIntoBtn"><i
                class="iconfont icon-daoru"></i> 导入竞赛</el-button>
            <a href="https://beijing.moocollege.com/template/%E7%AB%9E%E8%B5%9B%E6%A8%A1%E6%9D%BF.xlsx"
              download="竞赛报名模板" style="margin:0 0.5rem">
              <el-button type="success" plain style="font-size:0.7rem" size="small">
                <i class="iconfont icon-xiazai1"></i>
                <em>模板下载</em>
              </el-button>
            </a>
            <el-button type="primary" size="small" style="font-size:0.7rem" @click="guideOutBtn"><i
                class="iconfont icon-daochu"></i> 导出竞赛</el-button>
            <el-button type="primary" @click="createComptyBtn" size="small" style="font-size:0.7rem"><i
                class="iconfont icon-chuangjian"></i> 创建竞赛</el-button>
          </div>
        </div>

        <!-- 搜索栏end -->
        <!-- 竞赛列表 -->
        <div class="main_list" v-loading="loading">
          <div>
            <!-- 列表 -->
            <SchoolBlock v-for="(d, index) in schoolPrizeList" :key="index" :data="d" :year="year" />

            <!-- <div style="font-size: 12px">
              *因未及时获得个别竞赛共三个单年数据，《全国普通高校大学生竞赛白皮书（2012-2017）》中2012-2016的年份数据和统计为预发布数据。
            </div> -->
          </div>
          <!-- <p
            style="text-align: center; color: #909399; font-size: 13px;"
            v-else
          >
            暂无数据
          </p> -->
        </div>
        <!-- end 竞赛列表 -->
      </div>
    </div>
  </table-infinite>
</template>
<script>
import TableInfinite from "./common/table-infinite";
import SchoolBlock from "./common/schoolBlock";
import apply from "./common/apply";
import handbook from "./common/handbook";
import api from "@/views/admin/dataManagement/common/api/api.js"
export default {
  data() {
    let userInfo = localStorage.getItem("userInfo"),
      white_urls = [];

    userInfo = userInfo && userInfo !== "undefined" ? JSON.parse(userInfo) : {};
    if (userInfo.permission.white_urls) {
      for (
        var i = 0, len = userInfo.permission.white_urls.length;
        i < len;
        i++
      ) {
        if (userInfo.permission.white_urls[i]) {
          white_urls.push(userInfo.permission.white_urls[i].split("#")[1]);
        }
      }
    }

    return {
      schoolPrizeList: [],
      white_urls: white_urls,
      competitionNames: [],
      competitionNames2: [],
      competitionName: "",
      selectCompetionName: "",

      years: [],
      year: "",
      allLoaded: true, // 列表数据是否全部加载
      pages: 1,
      rankStatusType: 1,
      loading: false,
      copyCompetyDialog: false,
      copyCompetyForm: {
        competitionindex: "",
        year: "",
        round: "",
      },
      // 判断用户能否上传修改变量
      can_upload: "",
      can_update: "",
      groupType: "",
    };
  },
  components: {
    "table-infinite": TableInfinite,
    SchoolBlock,
    apply,
    handbook,
  },
  async created() {
    let years = this.$store.state.years;
    if (years && years.length > 0) {
      this.years = this.$store.state.years;
      this.competitionNames = this.$store.state.competitionNames;
      this.schoolPrizeList = this.$store.state.schoolPrizeList;
      this.year = this.$store.state.year;
      this.competitionNames2 = this.$store.state.competitionNames2;
    } else {
      await this.getCondition("init");
    }

    this.groupType = localStorage.getItem("groupType");
  },
  mounted() {
    // 获取登录信息中的can_upload和can_update,用于判断用户是否可以上传和修改
    let a = JSON.parse(localStorage.getItem("userInfo"));
    this.can_upload = a.can_upload;
    this.can_update = a.can_update;
  },
  beforeDestroy() {
    this.$store.state.years = this.years;
    this.$store.state.year = this.year;
    this.$store.state.competitionNames = this.competitionNames;
    this.$store.state.competitionNames2 = this.competitionNames2;
    this.$store.state.schoolPrizeList = this.schoolPrizeList;
  },
  watch: {
    $route(n) {
      console.log(n)
      this.rankStatusType = n.query.type == 2 ? 2 : 1
      this.getPageData("fresh")
    }
  },
  methods: {
    //导出数据
    guideOutBtn() {
      this.loading = true;

      api.exportGet({
        year: this.year,
      })
        .then((res) => {
          this.loading = false;
        });
    },
    //下载所有附件
    downloadAllFiles() {
      this.$message.info("文件打包中")
    },
    // 搜索竞赛
    querySearchAsync(queryString, cb) {
      this.selectCompetionName = "";
      let arr = [];
      for (let key in this.competitionNames2) {
        arr.push({
          value: this.competitionNames2[key],
          key: key,
        });
      }

      var restaurants = arr;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        if (state.value.match(queryString) != null) {
          return state.value;
        }
        // return (state.value.toLowerCase().test(queryString.toLowerCase()) === 0);
      };
    },

    async handleSelect(item) {
      let ele = document.getElementsByClassName("comRef");
      for (let i = 0; i < ele.length; i++) {
        ele[i].className = "";
      }
      this.selectCompetionName = item.value;
      await this.searchCompetion();
    },
    searchCompetion() {
      for (let i = 0; i < this.schoolPrizeList.length; i++) {
        // todo
        this.schoolPrizeList[i].compt.forEach((ele, index) => {
          ele.reword.forEach((el, ind) => {
            if (this.selectCompetionName == el.competitionName) {
              this.schoolPrizeList[i].compt[index].reword[
                ind
              ].competitionName = `<span class="comRef"">${this.selectCompetionName}</span>`;
            }
          });
        });
      }

      this.$nextTick(() => {
        let lis = document.getElementsByClassName("comRef");
        if (!this.selectCompetionName) return;

        if (lis.length <= 0) return this.$message.warning("未找到该竞赛");
        scrollTo(0, lis[0].getBoundingClientRect().top);
      });
    },
    //新增竞赛
    addCompetyBtn() {
      // this.$router.push("/addCompet")
      let _baseUrl =
        process.env.NODE_ENV == "production"
          ? "https://cc.moocollege.com/#/admin/list"
          : "http://cc.mycloudedu.net/#/admin/list";
      window.open(_baseUrl);
    },
    toDep() {
      this.$router.push("/department");
    },
    async getCondition(cb) {
      this.$api.post("/Admin/Competition/yearList", {}).then((res) => {
        this.years = res;
        if (this.years.length > 0) {
          this.year = this.years[0];
        }
        this.getPageData(cb);
      });
      this.$api.post("/Admin/Competition/screenList", {}).then((res) => {
        this.competitionNames = res;
      });
    },

    // 复制竞赛， 根据竞赛id获取年份届数
    async competitionNameCHange() {
      let id = this.copyCompetyForm.competitionindex;
      this.$api
        .post("/Admin/Competition/compettitionDetail", { competitionindex: id })
        .then((res) => {
          this.copyCompetyForm.year = +res.competitionindexcolYear + 1 + "";
          this.copyCompetyForm.round = +res.competitionindexcolRound + 1;
        });
    },
    // 复制竞赛按钮
    // copyCompetyBtn() {
    //     if(this.can_upload=="0"){
    //         this.$message.warning("目前时段不允许上传或添加新数据，如有急需请联系平台管理员")
    //     }else{
    //         this.copyCompetyDialog = true;
    //     }
    // },
    // 导入竞赛按钮
    guideIntoBtn() {
      if (this.can_upload == "0") {
        this.$message.warning(
          "目前时段不允许上传或添加新数据，如有急需请联系平台管理员"
        );
      } else {
        this.$router.push({ name: "leadingIn", params: { id: 0, type: 1 } });
      }
    },
    // 创建竞赛按钮
    createComptyBtn() {
      if (this.can_upload == "0") {
        this.$message.warning(
          "目前时段不允许上传或添加新数据，如有急需请联系平台管理员"
        );
      } else {
        this.$router.push("/compety/add/0");
      }
    },
    // 复制竞赛
    copyCompety() {
      let _this = this;
      this.$refs["copyCompetyForm"].validate(async (valid) => {
        if (!valid) return;

        if (!_this.copyCompetyForm.round) {
          return _this.$message.error("请输入届数");
        }
        _this.$api
          .post("/Admin/Competition/copyCompetition", _this.copyCompetyForm)
          .then((res) => {
            if (res.code == 0) {
              _this.$message.success("复制成功");
            }

            _this.clearCopyForm();
            _this.getPageData("fresh");
          });
      });
    },

    clearCopyForm() {
      this.copyCompetyForm.competitionindex = "";
      this.copyCompetyForm.year = "";
      this.copyCompetyForm.round = "";
      this.copyCompetyDialog = false;
    },

    // cb => string 表示是列表搜索， cb=> function  下拉加载
    async getPageData(cb) {
      if (cb && typeof cb === "string") {
        this.pages = 1;
        this.loading = true;
      }

      let data = { pageNum: this.pages, pageSize: 50 };
      if (this.year !== "") data.year = this.year;
      if (this.groupType == 1) data.rankStatus = this.rankStatusType
      await this.$api
        .post("/Admin/Competition/courseContestsList", data)
        .then((res) => {
          ///Admin/Competition/competitionList
          if (this.loading) this.loading = false;

          if (cb && typeof cb === "string") {
            this.schoolPrizeList = [...res.pageData];
          } else {
            this.schoolPrizeList = [...this.schoolPrizeList, ...res.pageData];
          }
          for (let i = 0; i < this.schoolPrizeList.length; i++) {
            // todo
            this.schoolPrizeList[i].compt.forEach((ele, index) => {
              ele.reword.forEach((el, ind) => {
                this.competitionNames2.push(
                  this.schoolPrizeList[i].compt[index].reword[ind]
                    .competitionName
                );
              });
            });
          }
          this.competitionNames2 = [...new Set(this.competitionNames2)];

          this.pages++;
          this.allLoaded = this.schoolPrizeList.length >= res.total;
          if (cb && typeof cb === "function") cb();
        });
      await this.searchCompetion();
    },
  },
};
</script>
<style lang="less" scoped>
.compety_manage {
  /deep/.el-table__expanded-cell[class*="cell"] {
    padding: 5px 10px;
  }

  .downloadButton {
    float: right;
    margin-right: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #5871a9;
    line-height: 40px;
    letter-spacing: 3px;
    cursor: pointer;
  }
}
</style>

<style lang="less">
.comRef {
  background-color: rgb(241, 154, 74);
}

.manage_btns {
  float: right;
  margin-right: 10px;
}

.main_content {
  .search_row {
    padding: 27px 0;
    background: #eeeeee !important;
  }

  // 列表
  .main_list {
    background-color: #eeeeee;
    // padding-top: 16px;
    font-size: 0.8rem;
    letter-spacing: 1.14px;

    ul {
      li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #e4e4e4;
      }
    }

    .top_row {
      margin-top: 0.3rem;
      margin-bottom: 0.5rem;
    }

    .bottom_row {
      margin-top: 0.5rem;
      margin-bottom: 0.3rem;
    }

    .top_row,
    .bottom_row {
      >p:first-child {
        padding-left: 0.3rem;
      }

      >p:last-child {
        font-size: 0.7rem;
        // width:13.5rem;
        text-align: left;

        em {
          color: #4a90e2;
          letter-spacing: 1px;
          font-size: 0.7rem;
          margin-left: 0.3rem;
        }

        .el-button {
          // margin-left:2rem;
        }
      }

      // 管理竞赛按钮// 查看竞赛按钮
      .manage_btn,
      .look_btn {
        margin-left: 10px;

        img {
          vertical-align: middle;
          display: inline-block;
          margin-right: 0.3rem;
        }
      }

      // 标签
      .tags {
        span {
          background: #ffffff;
          border: 1px solid #738ba2;
          border-radius: 100px;
          padding: 0.1rem 0.4rem;
          margin-right: 0.3rem;
          display: inline-block;
          font-size: 0.7rem;
        }
      }
    }

    .el-button--warning {
      background-color: #f5a623;
      border-color: #f5a623;

      &:hover {
        background: #ebb563;
        border-color: #ebb563;
      }

      &:active {
        background: #cf9236;
        border-color: #cf9236;
      }
    }
  }
}

// 下载模板
.down_model {
  color: #1890ff;
  cursor: pointer;

  i {
    margin-right: 0.2rem;
    font-size: 0.7rem;
  }
}
</style>
