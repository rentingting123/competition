<template>
  <div class="compic" v-show="showPage">
    <div v-if="this.isBuy">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <Search
          v-if="activeName !== 'surveyYear'"
          @search="search"
          :objSearch="objSearch"
        ></Search>
        <el-tab-pane label="竞赛画像" name="competitionPortrait">
          <keep-alive>
            <competitionPortrait
              ref="competitionPortrait"
              :currentCId="currentCId"
            />
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="竞赛数据" name="competitionData">
          <keep-alive>
            <CompetitionData
              v-if="activeName == 'competitionData'"
              ref="CompetitionData"
              :currentCId="currentCId"
            />
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="竞赛信息" name="comInformation">
          <keep-alive>
            <ComInformation
              v-if="activeName == 'comInformation'"
              ref="ComInformation"
              :currentCId="currentCId"
            />
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="竞赛标杆" name="competitionBenchmark">
          <keep-alive>
            <CompetitionBenchmark
              v-if="activeName == 'competitionBenchmark'"
              ref="CompetitionBenchmark"
              :currentCId="currentCId"
            />
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="竞赛地域" name="competitionArea">
          <keep-alive>
            <CompetitionArea
              ref="CompetitionArea"
              :currentCId="currentCId"
              v-if="activeName == 'competitionArea'"
            />
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="历年概况" name="surveyYear">
          <keep-alive>
            <SurveyYear
              ref="SurveyYear"
              :currentCId="currentCId"
              v-if="activeName == 'surveyYear'"
            ></SurveyYear>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right" v-else>
      <div class="qrImg">
        <img
          src="https://web.moocollege.com/mooc/hzq/competition/home/rightImg.png"
        />
        <div>
          <p class="text_9">开通数据服务，可查看多维度竞赛数据分析</p>
          <p class="text_25">如需开通请添加客服微信</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {dataServiceApi, userApi} from "../../../api/user/user";
import competitionPortrait from "../competitionPortrait/index";
import CompetitionData from "../competitionData/index";
import ComInformation from "../comInformation/index";
import CompetitionBenchmark from "../competitionBenchmark/index";
import CompetitionArea from "../competitionArea/index";
import SurveyYear from "../surveyYear/index";
import Search from "../competitionPortrait/search";

export default {
  components: {
    competitionPortrait,
    CompetitionData,
    ComInformation,
    CompetitionBenchmark,
    CompetitionArea,
    SurveyYear,
    Search,
  },
  data() {
    return {
      schoolCode: "",
      currentCId: "",
      activeName: "competitionPortrait",
      cId: "",
      yearsList: [],
      obj: {},
      showPage: false,
      isBuy: false,
      objSearch: {},//竞赛角色输入框传参
    };
  },
  watch: {},
  created() {
    this.right()
  },
  methods: {
    async right() {
      const userRight = await userApi();
      const {
        dataServiceRole: {schoolRole},
        idcardName,
        schoolcolCodeID,
      } = userRight;
      const str = schoolRole ? schoolRole.schoolName : schoolRole;
      if (str !== null) {
        const dataServiceSchool = await dataServiceApi(schoolcolCodeID);
        this.isBuy = (dataServiceSchool.payStatus === 1); // 1购买 0
      } else {
        this.isBuy = true;
        this.objSearch = {
          idcardName: idcardName,
          flagSearch: true,
        };
      }
      this.showPage = true
      this.schoolCode = userRight.schoolcolCodeID;
      await this.init();
    },

    // 1 搜索结果回调
    search(val) {
      this.currentCId = val;
      if (typeof val == "object") {
        this.currentCId = val.currentCId;
      } else {
        this.currentCId = val;
      }

      this.obj = val;
      this.init();
    },
    async init() {
      await this.$router.push({
        path: this.$route.path,
        query: Object.assign({}, this.$route.query, this.obj),
      });

      if (this.activeName === "competitionPortrait") {
        await this.$refs.competitionPortrait.getList(this.schoolCode);
      } else if (this.activeName === "competitionData") {
        await this.$refs.CompetitionData.getList();
      } else if (this.activeName === "comInformation") {
        await this.$refs.ComInformation.getList();
      } else if (this.activeName === "competitionBenchmark") {
        await this.$refs.CompetitionBenchmark.getList();
      } else if (this.activeName === "competitionArea") {
        await this.$refs.CompetitionArea.init(this.currentCId);
      } else if (this.activeName === "surveyYear") {
        await this.$refs.SurveyYear.getList();
      }
    },

    handleClick() {
      this.$router.push({
        path: this.$route.path,
        query: Object.assign({}, this.$route.query, {
          activeName: this.activeName,
        }),
      });
      // this.init();
    },
  },
};
</script>

<style scoped>
.compic {
  width: 95%;
  /* height: 100%; */
  /* height: 100vh; */
  /* overflow-y: hidden; */
  margin-top: 17px;
}

.compic ::v-deep .el-tabs {
  position: relative;
}

.compic ::v-deep .el-tabs__nav-scroll {
  padding-top: 24px;
  box-sizing: border-box;
  height: 80px;
}

.compic ::v-deep .el-tabs__nav-wrap {
  overflow: inherit;
  background: #fff;
  height: 80px;
}

.compic ::v-deep .el-tabs__content {
  background-color: #f0f2f4;
  /* padding: 20px; */
}

.compic ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none !important;
}

.compic ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  box-shadow: 0px 2px 4px 0px rgba(210, 207, 207, 0.5);
  cursor: pointer;
  background: #f0f2f4;

  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #0078e2;
  letter-spacing: 2px;
}

.compic ::v-deep .el-tabs__item:hover {
  color: #0078e2;
}

.compic ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: none !important;
  font-size: 18px;
  padding: 0 60px;
  font-size: 18px;
  /* padding: 0 50px; */
  border-radius: 20px 20px 0 0;
  height: 60px;
  line-height: 60px;
}

.btns1 {
  position: absolute;
  top: 50px;
  left: 45px;
  z-index: 20;
  overflow: hidden;
}

.el-input {
  width: 200px;
}

.el-button {
  width: 100px;
  height: 39px;
  font-size: 12px;
  text-align: center;
  margin-left: -14px;
  margin-top: 3px;
}

.compic ::v-deep .el-tabs--card > .el-tabs__header {
  border: none !important;
  box-shadow: 0 2px 4px 0 rgb(210 207 207 / 50%);
  margin-bottom: 0;
  height: 80px;
}

.compic {
  position: relative;
}

.bighead ::v-deep .el-button--primary {
  height: 32px;
  line-height: 8px;
  margin-top: 4px;
  border-radius: 0px;
}

::v-deep .el-input__inner {
  height: 39px;
  line-height: 39px;
  color: #177ddc;
}

.bighead ::v-deep .el-select .el-input__inner {
  width: 68px;
  border-radius: 0;
  height: 39px;
  line-height: 39px;
}

.bighead ::v-deep .el-form-item {
  margin-bottom: 0;
  margin-left: -20px;
}

.compic ::v-deep .el-tabs {
  position: relative;
}

.bighead {
  width: 100%;
  height: 80px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 25px;
}

.qrImg {
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 44;
}

.qrImg img {
  width: 220px;
  height: 217px;
}

.right {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(https://web.moocollege.com/mooc/hzq/competition/home/bgRightFive.png);
  background-repeat: no-repeat;
  background-size: 100%, 100%;
  -webkit-background-size: 100%, 100%;
  -o-background-size: 100%, 100%;
  background-position: center 0;
  z-index: 22;
  font-weight: 700;
  overflow: hidden;
}

</style>
