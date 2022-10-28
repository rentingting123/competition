<template>
  <!-- 对标分析 -->
  <div class="home" v-show="showPage">
    <div v-if="isBuy">
      <div class="head">
        <div class="head_top">
          <div class="tabs">
            {{ schoolcolname }}
          </div>
          <div class="tabs" v-for="(item, index) in reltabs" :key="index">
            {{
              item
            }}
          </div>
         
          <el-button type="primary" size="mini" @click.stop="clickExport">一键生成报告 </el-button>
          <!-- <div
            class="tabs choose"
            style="padding-right: 10px"
            @click="dialogVisible = true"
          >
            + 选择高校
          </div> -->
        </div>
        <div class="head_down">
          <el-form
            style="height: 40px"
            :inline="true"
            :model="formData"
            class="demo-form-inline"
          >
            <div class="forms">
              <el-form-item label="年份筛选" label-width="100px">
                <el-date-picker
                  v-model="formData.beginTime"
                  format="yyyy"
                  value-format="yyyy"
                  size="small"
                  type="year"
                  placeholder="请选择年份"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="至" label-width="32px">
                <el-date-picker
                  v-model="formData.endeTime"
                  format="yyyy"
                  value-format="yyyy"
                  size="small"
                  type="year"
                  placeholder="请选择年份"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="checkschoollist"
                >确认筛选
                </el-button
                >
                
               
                
               
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="contents">
        <div class="title">
          <div>本校及对标竞赛获奖数量</div>
          <div class="pic"></div>
        </div>
        <template v-if="tableData1.length > 0">
          <el-table
          border
          :data="tableData1"
          style="width: 100%; margin-top: 15px"
          :cell-style="handleColor"
        >
          <el-table-column
          align="center"
            v-for="(item, index) in columns"
            :key="index"
            :prop="item.name"
            :label="item.name"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px"
          background
          layout="total, prev, pager, next, jumper"
          :total="tableData1Total"
          :page-sizes = "[2]"
          :page-size="formData.pageSize"
          @current-change="handleNumCurrentChange"
        >
        </el-pagination>
        </template>
        <el-empty v-else :image-size="200"></el-empty>
      </div>
      <div class="contents" style="height: 550px">
        <div class="title">
          <div>本校及对标榜单排名</div>
          <div class="pic">
            <button
              class="common"
              :class="{ current: allyears == 0 }"
              @click="howmatch(1)"
            >
              单年榜
            </button>
            <button
              class="common"
              :class="{ current: allyears == 1 }"
              @click="howmatch(5)"
            >
              五年榜
            </button>
          </div>
        </div>
        <lineCharts v-if="chartDatas.days.length > 0" :chartData="chartDatas"></lineCharts>
        <el-empty v-else :image-size="200"></el-empty>
      </div>
      <div class="contents" style="height: 863px">
        <div class="title">
          <div>本校及对标榜单国赛参与率</div>
          <div class="pic"></div>
        </div>
        <dashboard  :chartData="dashboardchartData"></dashboard>
        <!-- <el-empty v-else :image-size="400"></el-empty> -->
      </div>
      <div class="contents">
        <div class="title">
          <div>本校竞赛排名概况</div>
        </div>
        <el-table
          border
          :data="tableData"
          style="width: 100%; margin-top: 40px"
        >
          <el-table-column label="竞赛类型" prop="type" align="center"></el-table-column>
          <el-table-column label="竞赛名称" prop="name" align="center"> </el-table-column>
          <el-table-column label="高校/位次/获奖学校数" align="center">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.list" :key="index">
                {{ item.schoolName }}: {{ item.rank }} /{{
                  item.awardSchool
                }}
              </div>
            </template>
          </el-table-column
          >
        </el-table>
        <el-pagination
          style="margin-top: 20px"
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-sizes = "[5]"
          :page-size="5"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <div class="contents" style="height: 550px">
        <div class="title">
          <div>本校及对标校竞赛年均获奖</div>
          <div class="pic"></div>
        </div>
        <div class="gongxian" v-if="radarChartlist">
          <radarChart :chartData="radarChartlist"></radarChart>
        </div>
        <el-empty v-else :image-size="200"></el-empty>

      </div>
      <el-dialog
        title="对标高校选择（最多可选8个）"
        :visible.sync="dialogVisible"
        :modal="false"
        :append-to-body="true"
        width="30%"
      >
        <div>
          <div class="chooseschool">
            <el-tag type="info">
              {{ schoolcolname }}
            </el-tag>
            <el-tag
              v-for="(item, index) in tabs"
              :key="index"
              closable
              :disable-transitions="false"
              @close="handleClose(index)"
              type="info"
            >
              {{ item }}
            </el-tag>
          </div>
          <div>
            <el-select
              v-model="selectvalue"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in options"
                :key="item.schoolCode"
                :label="item.schoolName"
                :value="item.schoolName"
              >
              </el-option>
            </el-select>
            <el-button @click="addschool">确定</el-button>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="checkschoollist">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="right" v-else>
      <div class="qrImg">
        <img
          src="https://web.moocollege.com/mooc/hzq/competition/home/rightImg.png"
        />
        <p class="text_9">开通数据服务，可查看多维度竞赛数据分析</p>
        <p class="text_25">如需开通请添加客服微信</p>
      </div>

      <!-- <div class="model"></div> -->
    </div>
  </div>
</template>

<script>
import {dataServiceApi, userApi} from "../../../api/user/user";

import network from "@/api/jxapi/index";
import dashboard from "@/views/admin/common/dashboard";
import lineCharts from "@/views/admin/common/lineCharts";
import ringChart from "@/views/admin/common/ringChart";
import radarChart from "@/views/admin/common/radarChart";

export default {
  data() {
    return {
      showPage: false,
      downHref:'',
      isBuy: false,
      currpage: 1,
      pagesize: 10,
      flag: true,
      radarChartlist: {},
      contributionList: [],
      dashboardchartData: {
        series: [],

      },
      chartDatas: {
        days: [],
        series: [],
        yearList1: [150, 230, 224, 218, 135, 147, 260],
        yearList2: [218, 135, 147, 260, 150, 230, 224],
        yearList3: [100, 200, 204, 200, 100, 100, 200],
        yearList4: [150, 250, 254, 258, 155, 157, 250],
      },
      loading: false,
      selectvalue: "",
      options: [],
      dialogVisible: false,
      allyears: 0,
      tabs: [],
      reltabs: [],
      total: 0,
      all: "",
      tableData1Total: 0,
      columns: [],
      formData: {
        beginTime: "2021",
        endeTime: "2022",
        pageNum: 1,
        pageSize: 2,
      },
      schoolcolname: "",
      tableData1: [],
      tableData: [],
      schoolcolCodeID:''
    };
  },
  components: {
    lineCharts,
    dashboard,
    ringChart,
    radarChart,
  },
  mounted() {
    this.right()
    let obj = localStorage.getItem("userInfo");
    this.schoolcolname = JSON.parse(obj).school;

  },
  created() {
// this.handleColor()
  },
  methods: {
    handleColor({row, column, rowIndex, columnIndex}) {
      // console.log(row);
      // console.log(column);
      // console.log(rowIndex);
      // console.log(columnIndex);
    },
    async right() {
      const userRight = await userApi();
      const {
        dataServiceRole: {schoolRole},
        idcardName,
        schoolcolCodeID,
      } = userRight;
      const str = schoolRole ? schoolRole.schoolName : schoolRole;
      if (str !== null) {
        this.schoolcolCodeID = schoolcolCodeID
        const dataServiceSchool = await dataServiceApi(schoolcolCodeID);
        this.reltabs = dataServiceSchool.schoolList || []
        this.isBuy = (dataServiceSchool.payStatus === 1); // 1购买 0

      } else {
        this.isBuy = true;
        this.objSearch = {
          idcardName: idcardName,
          flagSearch: true,
        };
      }
      this.nationalParticipation();
    this.getschoolName();
    this.getList();
    this.howmatch(1);
    this.CompetitionCompareAvgScore();
    //本校竞赛排名情况
    this.CompositionRanking();
      this.showPage = true
    },
    async handleCurrentChange(val) {
      let resRanking = await network.getRankStatistics({
        data: {
          schoolName: this.schoolcolname,
          beginYear: this.formData.beginTime,
          endYear: this.formData.endeTime,
          pageNum: val,
          pageSize: 5,
          schoolNameList: this.reltabs,
        },
      });
      this.tableData = resRanking.list;
      this.total = resRanking.total;
    },
    handleSizeChange() {
    },
    async CompositionRanking() {
      let resRanking = await network.getRankStatistics({
        data: {
          schoolName: this.schoolcolname,
          beginYear: this.formData.beginTime,
          endYear: this.formData.endeTime,
          pageNum: 1,
          pageSize: 5,
          schoolNameList: this.reltabs,
        },
      });
      this.tableData = resRanking.list;
      this.total = resRanking.total;
    },

    async CompetitionCompareAvgScore() {
      let res = await network.CompetitionCompareAvgScore({
        data: {
          schoolName: this.schoolcolname,
          beginYear: this.formData.beginTime,
          endYear: this.formData.endeTime,
          schoolNameList: this.reltabs,
        },
      });
      if (res == "error") return;
      this.radarChartlist = res;
    },
    async nationalParticipation() {
      let res = await network.CompetitionCompareSchoolEnterRate({
        data: {
          schoolName: this.schoolcolname,
          schoolNameList: this.reltabs,
          beginYear: this.formData.beginTime,
          endYear: this.formData.endeTime,
        },
      });
      if (res == "error") return;
      this.dashboardchartData.series = res.series;
    },
    delrelschool(tag) {
      this.tabs.splice(tag, 1);
      this.checkschoollist();
      // this.reltabs.splice(tag, 1);
    },
    clickExport(){
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      
      
      network.getExportList({data:{
        schoolName:this.schoolcolname,//this.schoolcolCodeID,
        schoolNames:this.reltabs.join(',') || this.schoolcolname
      }}).then(res=>{
        
        if(res.url !=''){   
          window.open(res.url, '_self')
        }
        
        loading.close()
      }).catch(res =>{
        loading.close()
      })
    },
    checkschoollist() {
      this.reltabs = this.tabs;
      this.dialogVisible = false;
      this.getList();
      this.howmatch(1);
      this.nationalParticipation(); //本校及对标榜单国赛参与率
      this.CompetitionCompareAvgScore();
      this.CompositionRanking();
    },
    addschool() {
      if (this.tabs.length == 7) {
        this.$message.warning("最多选择8所学校");
      } else {
        let ispush = true;
        this.tabs.forEach((item) => {
          if (item == this.selectvalue) {
            this.$message.error("已选择过该学校");
            ispush = false;
          }
        });
        if (ispush) {
          this.tabs.push(this.selectvalue);
        } else {
          ispush = true;
        }
      }
      this.selectvalue = "";
    },
    remoteMethod(query) {
      if (query !== "") {
        this.selectvalue = query;
        this.loading = true;
        this.getschoolName();
      } else {
        this.options = [];
      }
    },
    async getschoolName() {
      let res = await network.selectSchoolName({
        data: {
          pageNum: 1,
          pageSize: 10,
          schoolName: this.selectvalue,
        },
      });
      if (res == "error") return;
      this.loading = false;
      this.options = res.data;
    },
    handleClose(tag) {
      this.tabs.splice(tag, 1);
    },
    async getList() {
      let res = await network.getCompetitionCompareSchoolAwardCount({
        data: {
          schoolName: this.schoolcolname,
          beginYear: this.formData.beginTime,
          endYear: this.formData.endeTime,
          schoolNameList: this.reltabs,
          pageNum: this.formData.pageNum,
          pageSize: this.formData.pageSize,
        },
      });
      if (res == "error") return;
      this.columns = res.data[0].list;
      let arr = [];
      res.data.forEach((item, index) => {
        item.list.unshift({
          name: "竞赛名称",
          max: item.name,
        });
        let objs = {};
        item.list.forEach((_t) => {
          objs[_t.name] = _t.max;
        });
        arr.push(objs);
      });
      this.tableData1 = arr;
      this.tableData1Total = res.total;
      // console.log(res,'res————————————————————');
    },
    async handleNumCurrentChange(val) {
      let res = await network.getCompetitionCompareSchoolAwardCount({
        data: {
          schoolName: this.schoolcolname,
          beginYear: this.formData.beginTime,
          endYear: this.formData.endeTime,
          schoolNameList: this.reltabs,
          pageNum: val,
          pageSize: this.formData.pageSize,
        },
      });
      if (res == "error") return;
      this.columns = res.data[0].list;
      let arr = [];
      res.data.forEach((item, index) => {
        item.list.unshift({
          name: "竞赛名称",
          max: item.name,
        });
        let objs = {};
        item.list.forEach((_t) => {
          objs[_t.name] = _t.max;
        });
        arr.push(objs);
      });
      this.tableData1 = arr;
      this.tableData1Total = res.total;
    },
    async howmatch(num) {
      let res = await network.CompetitionCompareSchoolRankInfo({
        data: {
          schoolName: this.schoolcolname,
          schoolNameList: this.reltabs,
          yearType: num,
        },
      });
      if (res == "error") return;
      this.chartDatas.days = res.xaxis.data;
      this.chartDatas.series = res.series;
      this.chartDatas.series.forEach(item =>
        delete item.stack
      )
      delete this.chartDatas.series[num - 1].stack
      this.chartDatas.yearList1 = res.series[0].data;
      // console.log(this.chartDatas,'this.chartDatas1111111');

      if (num == 1) {
        this.allyears = 0;
        this.yearList1 = [150, 230, 224, 218, 135, 147, 260];
        this.yearList2 = [218, 135, 147, 260, 150, 230, 224];
        this.yearList3 = [100, 200, 204, 200, 100, 100, 200];
        this.yearList4 = [150, 250, 254, 258, 155, 157, 250];
        // this.drawChart()
      } else {
        this.allyears = 1;
        this.yearList1 = [150, 210, 264, 298, 145, 187, 260];
        this.yearList2 = [140, 220, 274, 238, 155, 107, 290];
        this.yearList3 = [130, 230, 284, 258, 175, 137, 200];
        this.yearList4 = [120, 240, 294, 218, 195, 117, 230];
        //  this.drawChart()
      }
    },
  },
};
</script>

<style scoped>
.green {
  color:#34C759
}
.red {
  color:#FF3B30
}
.gongxian {
  justify-content: space-between;
  flex-wrap: wrap;
  display: flex;
}

.chooseschool {
  display: flex;
  flex-wrap: wrap;
}

.chooseschool > .el-tag {
  margin-right: 15px;
  margin-bottom: 10px;
}

.current {
  background-color: #1890ff !important;
  color: #fff !important;
}

.common {
  cursor: pointer;
  width: 128px;
  background-color: #fff;
  color: #1890ff;
  border: 1px solid #1890ff;
  height: 25px;
  line-height: 25px;
  border-radius: 4px;
}

.contents ::v-deep .el-table th {
  background: #f5fafe;
}

.contents {
  background: #fff;
  margin-top: 15px;
  padding: 15px;
  width: 98%;
}

.center {
  margin-top: 15px;
  padding: 15px 0;
  width: 100%;
  margin-right: 0;
  display: flex;
  justify-content: space-between;
}

.title .pic {
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  display: flex;
  justify-content: space-between;
  margin-right: 15px;
  cursor: pointer;
}

.title {
  width: 100%;
  text-align: left;
  color: black;
  font-size: 16px;
  font-weight: 800;
  position: relative;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  letter-spacing: 1px;
}

.title .small {
  font-size: 14px;
  color: #999999;
  display: inline-block;
  margin-left: 20px;
  font-weight: 400;
}

.title::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 2px;
  width: 4px;
  height: 22px;
  background-color: #0078e1;
}

.head_down {
  text-align-last: left;
  margin-top: 10px;
}

.home {
  padding: 0;
  background: transparent;
  overflow: hidden;
  margin-top: 100px;
width: 98%;
}

.choose {
  cursor: pointer;
  border: 1px dashed rgba(0, 0, 0, 0.15) !important;
}

.tabs {
  padding: 0 3px 0 9px;
  /* width: 130px; */
  height: 22px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin: 0 20px 0 0;
  font-size: 14px;
  line-height: 22px;
}

.head {
  padding: 15px;
  width: 98%;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgb(210 207 207 / 50%);
}

.head_top {
  display: flex;
  justify-content: left;
  align-items: center;
}

.qrImg {
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 44;
  /* margin-bottom: 2000px; */
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
  background-image: url(https://web.moocollege.com/mooc/hzq/competition/home/bgRightFour.png);
  background-repeat: no-repeat;
  background-size: 100%, 100%;
  -webkit-background-size: 100%, 100%;
  -o-background-size: 100%, 100%;
  background-position: center 0;
  z-index: 22;
  font-weight: 700;
  overflow: hidden;
}

/* .model {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 33;
  background: #fff;
} */
</style>
