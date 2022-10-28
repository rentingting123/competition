<template>
  <!-- 高校概貌 -->
  <div class="home" v-show="showPage">
    <div v-if="isBuy">
      <div class="head">
        <div class="head_top">
          <div class="head_title">{{ tabs.schoolcolName }}</div>
          <div class="tabs">{{ tabs.schoolcolMajorC5 }}</div>
          <div class="tabs">{{ tabs.schoolcolCompetentAuthority }}</div>
          <div class="tabs">{{ tabs.schoolcolDegree }}</div>
          <div class="tabs">{{ tabs.schoolcolPublicSchool }}</div>
          <div class="tabs" v-if="tabs.schoolcolSchool11 == 1">双一流大学</div>
          <div class="tabs">{{ tabs.schoolcolArea }}</div>
        </div>
      </div>

      <div class="contents" style="height: 400px">
        <div class="title">
          <div>榜单排名</div>
          <div class="pic">
            <button class="common" :class="{ current: allyears == 0 }" @click="howmatch(1)">单年榜</button>
            <button class="common" :class="{ current: allyears == 1 }" @click="howmatch(5)">五年榜</button>
          </div>
        </div>
        <lineChart v-if="yearslist.days.length > 0" :chartData="yearslist"></lineChart>
        <el-empty v-else :image-size="200"></el-empty>
      </div>
      <div class="contents">
        <div class="title">
          <div class="list" style="height:29px;margin-bottom:8px">
            <div>榜单内国赛清单及对应获奖数量</div>
            <div class="smallList">
              <div @click="getList(1)">
                <span :class="{ circularcurrent: level == '国赛' }" class="circular"></span>
                <div>国赛</div>
              </div>
              <div @click="getList(2)" style="margin-right: 50px">
                <span :class="{ squarecurrent: isRank == 1 }" class="square">
                  <i style="color: #fff" class="el-icon-check"></i>
                </span>
                <div>排行榜</div>
              </div>
              <div @click="getList(3)">
                <span class="circular" :class="{ circularcurrent: level == '省赛' }"></span>省赛
              </div>
              <div @click="getList(4)">
                <span class="square" :class="{ squarecurrent: isProvinceRank === 1 }">
                  <i style="color: #fff" class="el-icon-check"></i>
                </span>省认定
              </div>
            </div>
          </div>
          <div class="pic"></div>
        </div>
        <el-form style="height: 40px;" :inline="true" :model="formData" class="demo-form-inline">
          <div class="forms">
            <div>
              <el-form-item label="年份筛选" label-width="70px">
                <el-date-picker
                  v-model="formData.beginTime"
                  format="yyyy"
                  value-format="yyyy"
                  size="small"
                  type="year"
                  placeholder="请选择年份"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="至" label-width="32px">
                <el-date-picker
                  v-model="formData.endeTime"
                  format="yyyy"
                  value-format="yyyy"
                  size="small"
                  type="year"
                  placeholder="请选择年份"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="onAwardNumSubmit">确认筛选</el-button>
              </el-form-item>
            </div>
            <div></div>
          </div>
        </el-form>
        <template v-if="tableList.length > 0">
          <div class="table">
            <div class="table_box" v-for="(item, index) in tableList" :key="index">
              <div style="width: 56%">
                <span class="table_box_icon">榜</span>
                <span>{{ item.competitionName }}</span>
              </div>
              <div style="width: 30%">
                <span class="comleixing">{{ item.competitionSort }}</span>
                <span>{{ item.awardCount }}</span>
              </div>
              <div
                @click="toPortrait(item.competitionName)"
                style="width: 14%; color: #4ca0e9; cursor: pointer"
              >查看>>
              </div>
            </div>
          </div>
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageSizes"
            layout="total, prev, pager, next"
            :total="totals"
          ></el-pagination>
        </template>
        <el-empty v-else :image-size="200"></el-empty>
      </div>

      <div class="contents">
        <div class="title">
          <div class="list" style="height:29px;margin-bottom:8px">
            <div>竞赛贡献度</div>
            <div class="smallList">
              <div @click="getcontribution(1)">
                <span :class="{ circularcurrent: level1 == '国赛' }" class="circular"></span>
                <div>国赛</div>
              </div>
              <div @click="getcontribution(2)" style="margin-right: 50px">
                <span :class="{ squarecurrent: isRank1 == 1 }" class="square">
                  <i style="color: #fff" class="el-icon-check"></i>
                </span>
                <div>排行榜</div>
              </div>
              <div @click="getcontribution(3)">
                <span class="circular" :class="{ circularcurrent: level1 == '省赛' }"></span>省赛
              </div>
              <div @click="getcontribution(4)">
                <span class="square" :class="{ squarecurrent: isProvinceRank1 == 1 }">
                  <i style="color: #fff" class="el-icon-check"></i>
                </span>省认定
              </div>
            </div>
            <!-- <div class="pic"></div> -->
          </div>
        </div>
        <el-form style="height: 40px" :inline="true" :model="competitionContributeDate" class="demo-form-inline">
          <div class="forms">
            <div>
              <el-form-item label="年份筛选" label-width="70px">
                <el-date-picker
                  v-model="competitionContributeDate.beginTime"
                  format="yyyy"
                  value-format="yyyy"
                  size="small"
                  type="year"
                  placeholder="请选择年份"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="至" label-width="32px">
                <el-date-picker
                  v-model="competitionContributeDate.endTime"
                  format="yyyy"
                  value-format="yyyy"
                  size="small"
                  type="year"
                  placeholder="请选择年份"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="onCompetitionContributeSubmit">确认筛选</el-button>
              </el-form-item>
            </div>
            <div></div>
          </div>
        </el-form>
        <pieChart
          v-if="pieChartData.data1.length > 0"
          :chartData="pieChartData"
        ></pieChart>
        <el-empty v-else :image-size="200"></el-empty>

      </div>
      <div class="contents1" style="height: 405px">
        <div class="sex">
          <div class="title1 sex-column" style="flex:1">
            <div style="margin-left:16px;height:29px;margin-bottom:8px">竞赛参与性别比</div>
            <el-form
              style="height: 40px;text-align: left;"
              :inline="true"
              :model="sexDate"
              class="demo-form-inline"
            >
              <div class="forms">
                <div>
                  <el-form-item label="年份筛选" label-width="80px">
                    <el-date-picker
                      v-model="sexDate.beginTime"
                      format="yyyy"
                      value-format="yyyy"
                      size="small"
                      type="year"
                      placeholder="请选择年份"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="至" label-width="32px">
                    <el-date-picker
                      v-model="sexDate.endTime"
                      format="yyyy"
                      value-format="yyyy"
                      size="small"
                      type="year"
                      placeholder="请选择年份"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="mini" @click="onSexSubmit">确认筛选</el-button>
                  </el-form-item>
                </div>
                <div></div>
              </div>
            </el-form>
            <div class="pic"></div>
            <div v-if="chartData1.data1.length>0">
              <SexChart :chartData="chartData1"></SexChart>
            </div>
            <el-empty v-else :image-size="100"></el-empty>
          </div>
          <div class="title1 sex-column" style="flex:1">
            <div style="margin-left:16px;height:29px;margin-bottom:8px">榜单国赛参与率</div>
            <el-form
              style="height: 40px;text-align: left;"
              :inline="true"
              :model="competitionAttendDate"
              class="demo-form-inline"
            >
              <div class="forms">
                <div>
                  <el-form-item label="年份筛选" label-width="80px">
                    <el-date-picker
                      v-model="competitionAttendDate.beginTime"
                      format="yyyy"
                      value-format="yyyy"
                      size="small"
                      type="year"
                      placeholder="请选择年份"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="至" label-width="32px">
                    <el-date-picker
                      v-model="competitionAttendDate.endTime"
                      format="yyyy"
                      value-format="yyyy"
                      size="small"
                      type="year"
                      placeholder="请选择年份"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="mini" @click="onCompetitionAttendSubmit">确认筛选</el-button>
                  </el-form-item>
                </div>
                <div></div>
              </div>
            </el-form>
            <div class="pic"></div>
            <!-- {{chartData5}} -->
            <ParticipationBarChart v-if="chartData5.data1.length>0" :chartData="chartData5"
                                   :num="num"></ParticipationBarChart>
            <el-empty v-else :image-size="100"></el-empty>
          </div>
        </div>
      </div>
      <div class="contents" style="height: 500px">
        <div class="title" style="height:29px;margin-bottom:8px">
          <div>专业贡献度</div>
          <div class="pic"></div>
        </div>
        <el-form
          style="height: 40px;text-align: left;"
          :inline="true"
          :model="majorDate"
          class="demo-form-inline"
        >
          <div class="forms">
            <div>
              <el-form-item label="年份筛选" label-width="70px">
                <el-date-picker
                  v-model="majorDate.beginTime"
                  format="yyyy"
                  value-format="yyyy"
                  size="small"
                  type="year"
                  placeholder="请选择年份"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="至" label-width="32px">
                <el-date-picker
                  v-model="majorDate.endTime"
                  format="yyyy"
                  value-format="yyyy"
                  size="small"
                  type="year"
                  placeholder="请选择年份"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="onProfessionSubmit">确认筛选</el-button>
              </el-form-item>
            </div>
            <div></div>
          </div>
        </el-form>
        <!-- <Column v-if="barChartData4.days.length > 0" :chartData="barChartData4"></Column>BarChartData4 -->
        <BarChartData4 v-if="barChartData4.days.length > 0" :chartData="barChartData4"></BarChartData4>
        <el-empty v-else :image-size="200"></el-empty>
      </div>
      <div class="contents" style="height: 782px">
        <div class="title" style="height:29px;margin-bottom:8px">
          <div>竞赛年均获奖</div>
          <div class="pic"></div>
        </div>
        <el-form
          style="height: 40px;text-align: left;"
          :inline="true"
          :model="professionDate"
          class="demo-form-inline"
        >
          <div class="forms">
            <div>
              <el-form-item label="年份筛选" label-width="70px">
                <el-date-picker
                  v-model="professionDate.beginTime"
                  format="yyyy"
                  value-format="yyyy"
                  size="small"
                  type="year"
                  placeholder="请选择年份"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="至" label-width="32px">
                <el-date-picker
                  v-model="professionDate.endTime"
                  format="yyyy"
                  value-format="yyyy"
                  size="small"
                  type="year"
                  placeholder="请选择年份"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="onCompetitionAwardSubmit">确认筛选</el-button>
              </el-form-item>
            </div>
            <div></div>
          </div>
        </el-form>
        <!-- <RadarChartData2 :chartData="RadarChartData2"></RadarChartData2> -->
        <div id="square" style="width: 100% !important; height: 100%; margin: 0"
             v-if="RadarChartData2"></div>
        <el-empty v-else :image-size="200"></el-empty>
      </div>
      <div class="contents" style="height: 400px">
        <div class="title">
          <div>本省高校排名</div>
          <div class="pic">
            <el-radio-group @change="changeradio" v-model="schooltime.yearType">
              <el-radio label="1">单年</el-radio>
              <el-date-picker
                @change="changeradio"
                v-model="schooltime.oneTime"
                format="yyyy"
                value-format="yyyy"
                size="small"
                type="year"
                placeholder="请选择年份"
              ></el-date-picker>
              <el-radio label="5">五年</el-radio>
              <el-date-picker
                @change="changeradio"
                v-model="schooltime.fiveTime1"
                format="yyyy"
                value-format="yyyy"
                size="small"
                type="year"
                placeholder="请选择年份"
              ></el-date-picker>
            </el-radio-group>
          </div>
        </div>
        <div class="sear">
          <el-form :model="formSchool">
            <el-form-item class="serach-input" size="small">
              <el-input clearable placeholder="请输入本省高校名称" v-model.trim="formSchool.name" size="small"
                        style="width:300px"></el-input>
              <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearchSchool">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <dothart v-if="chartData2" :chartData="chartData2"></dothart>
        <div v-else>
          <el-empty :image-size="200"></el-empty>
        </div>
      </div>
      <div class="contents" style="height: 400px">
        <div class="title">
          <div>同类型高校排名</div>
          <div class="pic">
            <el-radio-group @change="changeradio1" v-model="schooltime1.yearType">
              <el-radio label="1">单年</el-radio>
              <el-date-picker
                @change="changeradio1"
                v-model="schooltime1.oneTime"
                format="yyyy"
                value-format="yyyy"
                size="small"
                type="year"
                placeholder="请选择年份"
              ></el-date-picker>
              <el-radio label="5">五年</el-radio>
              <el-date-picker
                @change="changeradio1"
                v-model="schooltime1.fiveTime1"
                format="yyyy"
                value-format="yyyy"
                size="small"
                type="year"
                placeholder="请选择年份"
              ></el-date-picker>
            </el-radio-group>
          </div>
        </div>
        <div class="sear">
          <el-form :model="formSchool1">
            <el-form-item class="serach-input" size="small">
              <el-input clearable placeholder="请输入本省高校名称" v-model.trim="formSchool1.name" size="small"
                        style="width:300px"></el-input>
              <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearchSchool1">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- <el-empty :image-size="200"></el-empty> -->
        <dothart v-if="chartData31" :chartData="chartData31"></dothart>
        <div v-else>
          <el-empty :image-size="200"></el-empty>
        </div>
      </div>
    </div>
    <div class="right1" v-else>
      <div class="qrImg">
        <img src="https://web.moocollege.com/mooc/hzq/competition/home/rightImg.png"/>
        <p class="text_9">开通数据服务，可查看多维度竞赛数据分析</p>
        <p class="text_25">如需开通请添加客服微信</p>
      </div>
    </div>
  </div>
</template>

<script>
import {dataServiceApi, userApi} from "../../../api/user/user";
import * as echarts from "echarts";
import network from "@/api/jxapi/index";
import lineChart from "@/views/admin/common/lineChart";
import pieChart from "@/views/admin/common/pieChart";
import barCharts from "@/views/admin/common/barChartsschool";
import barChart from "@/views/admin/common/barChartcollegeStyle";
import Column from "@/views/admin/common/columncollegeStyle";
import dothart from "@/views/admin/common/dothart";
import SexChart from "@/views/admin/common/SexChart"
import BarChartData3 from "@/views/admin/common/BarChartData3"
import BarChartData4 from "@/views/admin/common/BarChartData4"
import RadarChartData2 from "@/views/admin/common/RadarChartData2"
import SunburstChart from "@/views/admin/common/SunburstChart"
import ParticipationBarChart from "@/views/admin/common/ParticipationBarChart"
import {relativeTimeRounding} from "moment";

export default {
  components: {
    lineChart,
    pieChart,
    barCharts,
    barChart,
    Column,
    dothart,
    SexChart,
    ParticipationBarChart,
    BarChartData3,
    BarChartData4,
    RadarChartData2,
    SunburstChart
  },
  data() {
    return {
      isShow: false,//省赛数据有问题暂时隐藏，放开改为true或者删掉v-if
      tabs: [], //头部数据获取
      showPage: false,
      isBuy: false,
      formData: {
        beginTime: "2018", // 年份筛选开始
        endeTime: "2022" // 年份筛选结束
      },
      competitionContributeDate: {
        beginTime: "2018", // 年份筛选开始
        endTime: "2022" // 年份筛选结束
      },
      sexDate: {
        beginTime: "2018", // 年份筛选开始
        endTime: "2022" // 年份筛选结束
      },
      competitionAttendDate: {
        beginTime: "2018", // 年份筛选开始
        endTime: "2022" // 年份筛选结束
      },
      majorDate: {
        beginTime: "2018", // 年份筛选开始
        endTime: "2022" // 年份筛选结束
      },
      professionDate: {
        beginTime: "2018", // 年份筛选开始
        endTime: "2022" // 年份筛选结束
      },
      num: 0,
      yearslist: {
        days: [],
        data1: [],
      },
      tableList: [], //榜单内国赛清单及对应获奖数量
      pieChartData: {
        data1: [], //竞赛贡献度
      },
      chartData3: {
        // 获奖贡献度
        days: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        data5: [],
        colors: ["#5B8FF9", "#5AD8A6", "#5D7092", "#F6BD16", "#E8684A"],
        title: ["其它", "一等奖", "二等奖", "三等奖", "单项奖"],
      },
      chartData5:{
        data1:[]
      },
      chartData1: {
        //竞赛参与性别比
        days: [],
        data1: [],
        colors: ["#8fc31f", "#f35833", "#00ccff"],
        title: [],
      },
      RadarChartData2: {},
      barChartData4: {
        // 专业贡献度
        days: [],
        data1: [],
        colors: ["#73a0fa"],
        title: "参赛团队数量",
      },
      formSchool: {
        name: ''
      },
      formSchool1: {
        name: ''
      },
      chartData2: {}, // 本省高校排名
      chartData31: {},
      schooltime: {
        yearType: "1",
        oneTime: "2021",
        fiveTime2: "",
        fiveTime1: "",
      },
      schooltime1: {
        yearType: "1",
        oneTime: "2021",
        fiveTime2: "",
        fiveTime1: "",
      },

      allyears: 0,

      choosecom: true,

      schoolcolCodeID: "",
      yearList: [150, 230, 224, 218, 135, 147, 260],
      pageNums: 1,
      pageSizes: 10,
      totals: 0,
      isRank: 1,
      isProvinceRank: 0,
      level: "国赛",
      isRank1: 1,
      isProvinceRank1: 0,
      level1: "国赛",
      squarelist: {
        days: [],
        data1: [],
      },
    };
  },
  async created() {
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
      console.log(this.flag, 'this.flag');
    } else {
      this.isBuy = true;
      this.objSearch = {
        idcardName: idcardName,
        flagSearch: true,
      };
    }
    this.showPage = true
    this.init()
  },
  methods: {
    init() {
      let obj = localStorage.getItem("userInfo");
      this.schoolcolCodeID = JSON.parse(obj).schoolcolCodeID;
      this.shcoollist(); // 头部数据
      this.howmatch(1); // 榜单排名
      this.getList(1); //榜单内国赛清单及对应获奖数量
      this.getcontribution(1); //竞赛贡献度
      this.awardContribution(); // 获奖贡献度
      this.sexRatio(); //获取性别比
      this.competitionAttend(); // 榜单国赛参与率
      this.CompetitionSchoolViewMajorInfo(); //专业贡献度
      this.competitionAverageAward(); // 竞赛年均得分
      this.ProvinceRankInfo(); //本省高校排名
      // // 同类型高校排名
      this.sameTypeSchoolRankInfo();
    },
    fn() {
      console.log(123);

    },
    async handleSearchSchool1() {
      if (this.formSchool1.name.length > 0) {
        let res = await network.selectSchoolName({
          data: {
            pageNum: 1,
            pageSize: 1,
            schoolName: this.formSchool1.name,
          },
        });
// console.log(res.data[0].schoolCode,'学校id');
        let year = "";
        if (this.schooltime.yearType == "1") {
          year = this.schooltime.oneTime;
        } else {
          year = this.schooltime.fiveTime1 + "-" + this.schooltime.fiveTime2;
        }
        let res1 = await network.getSameTypeSchoolRankInfo({
          data: {
            schoolCode: res.data[0].schoolCode,
            year: year,
            yearType: this.schooltime.yearType,
          },
        });
        // console.log('本省高校', res);

        if (res == "error") return;

        this.chartData31 = res1;
        this.chartData31.series[0].data.reverse()
        this.chartData31.yaxis.data.reverse()
// this.ProvinceRankInfo ()
      }
    },
    async handleSearchSchool() {
      if (this.formSchool.name.length > 0) {
        let res = await network.selectSchoolName({
          data: {
            pageNum: 1,
            pageSize: 1,
            schoolName: this.formSchool.name,
          },
        });
// console.log(res.data[0].schoolCode,'学校id');
        let year = "";
        if (this.schooltime.yearType == "1") {
          year = this.schooltime.oneTime;
        } else {
          year = this.schooltime.fiveTime1 + "-" + this.schooltime.fiveTime2;
        }
        let res1 = await network.getProvinceRankInfo({
          data: {
            schoolCode: res.data[0].schoolCode,
            year: year,
            yearType: this.schooltime.yearType,
          },
        });
        // console.log('本省高校', res);

        if (res == "error") return;

        this.chartData2 = res1;
        this.chartData2.series[0].data.reverse()
        this.chartData2.yaxis.data.reverse()
        // console.log('本省高校',this.chartData2 );

// this.ProvinceRankInfo ()
      }
    },
    // 头部数据获取
    async shcoollist() {
      let res = await network.getSchoolInfo({
        data: {
          schoolcolCodeId: this.schoolcolCodeID,
        },
      });
      if (res == "error") return;
      this.tabs = res && res[0];
    },
    // 榜单排名
    async howmatch(num) {
      let res = await network.getCompetitionSchoolViewRank({
        data: {
          yearType: num,
          schoolcolCode: this.schoolcolCodeID,
        },
      });
      if (res == "error") return;
      let days = [];
      let lists = [];
      res.forEach((item) => {
        days.push(item.year);
        lists.push(item.rank);
      });
      this.yearslist.days = days;
      this.yearslist.data1 = lists;
      if (num == 1) {
        this.allyears = 0;
      } else {
        this.allyears = 1;
      }
    },
    //榜单内国赛清单及对应获奖数量
    async getList(type) {
      if (type === 1 || type === 2) {
        this.level = "国赛";
        this.isRank = 1;
        this.isProvinceRank = 0;
        let res = await network.getCompetitionSchoolViewRankList({
          data: {
            schoolCode: this.schoolcolCodeID,
            beginYear: this.formData.beginTime,
            endYear: this.formData.endeTime,
            level: this.level,
            isRank: this.isRank,
            pageNum: this.pageNums,
            pageSize: this.pageSizes,
          },
        });
        if (res == "error") return;
        this.totals = res.total;
        this.tableList = res.records;
      } else if (type === 3 || type === 4) {
        this.isProvinceRank = 1;
        this.level = "省赛";
        this.isRank = 0;
        let res = await network.getCompetitionSchoolViewRankList({
          data: {
            schoolCode: this.schoolcolCodeID,
            beginYear: this.formData.beginTime,
            endYear: this.formData.endeTime,
            level: this.level,
            isRank: this.isProvinceRank,
            pageNum: this.pageNums,
            pageSize: this.pageSizes,
          },
        });
        if (res == "error") return;
        this.totals = res.total;
        this.tableList = res.records;
      }

    },
    //竞赛贡献度
    async getcontribution(type) {
      if (type === 1 || type === 2) {
        this.isRank1 = 1;
        this.isProvinceRank1 = 0;
        this.level1 = "国赛";
        let res = await network.getCompetitionContributionRank({
          data: {
            schoolCode: this.schoolcolCodeID,
            beginYear: this.competitionContributeDate.beginTime,
            endYear: this.competitionContributeDate.endTime,
            level: this.level1,
            isRank: this.isRank1,
          },
        });
        if (res == "error") return;
        this.pieChartData.data1 = res;
      } else if (type === 3 || type === 4) {
        this.isRank1 = 0;
        this.isProvinceRank1 = 1;
        this.level1 = "省赛";
        let res = await network.getCompetitionContributionRank({
          data: {
            schoolCode: this.schoolcolCodeID,
            beginYear: this.competitionContributeDate.beginTime,
            endYear: this.competitionContributeDate.endTime,
            level: this.level1,
            isRank: this.isProvinceRank1,
          },
        });
        if (res == "error") return;
        this.pieChartData.data1 = res;
      }

    },
    // 获奖贡献度
    async awardContribution() {
      let res = await network.getCompetitionAwardInfo({
        data: {
          schoolCode: this.schoolcolCodeID,
          beginYear: this.formData.beginTime,
          endYear: this.formData.endeTime,
        },
      });
      if (res == "error") return;
      this.chartData3.days = res.yaxis.data;
      res.series.forEach((item, index) => {
        let indexa = index + 1;
        this.chartData3["data" + indexa] = item.data;
      });
    },
    // 榜单国赛参与率
    async competitionAttend() {
      let res = await network.getCompetitionParticipationRate({
        data: {
          schoolCode: this.schoolcolCodeID,
          beginYear: this.competitionAttendDate.beginTime,
          endYear: this.competitionAttendDate.endTime
        },
      });
      if (res == "error") return;
      this.chartData5.data1 = res.series[0].data;
      // let myChart = echarts.init(document.getElementById("yibiao"));
      // let option = {
      //   series: [
      //     {
      //       radius: "100%",
      //       type: "gauge",
      //       startAngle: 180,
      //       endAngle: 0,
      //       min: 0,
      //       max: 1,
      //       splitNumber: 8,
      //       axisLine: {
      //         lineStyle: {
      //           width: 4,
      //           color: [
      //             [0.25, "#FF6E76"],
      //             [0.5, "#FDDD60"],
      //             [0.75, "#58D9F9"],
      //             [1, "#7CFFB2"],
      //           ],
      //         },
      //       },
      //       pointer: {
      //         icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
      //         length: "12%",
      //         width: 12,
      //         offsetCenter: [0, "-60%"],
      //         itemStyle: {
      //           color: "auto",
      //         },
      //       },
      //       axisTick: {
      //         length: 12,
      //         lineStyle: {
      //           color: "auto",
      //           width: 2,
      //         },
      //       },
      //       splitLine: {
      //         length: 20,
      //         lineStyle: {
      //           color: "auto",
      //           width: 5,
      //         },
      //       },
      //       axisLabel: {
      //         color: "#464646",
      //         fontSize: 14,
      //         distance: -45,
      //         formatter: function (value) {
      //           if (value === 0.875) {
      //             return "A";
      //           } else if (value === 0.625) {
      //             return "B";
      //           } else if (value === 0.375) {
      //             return "C";
      //           } else if (value === 0.125) {
      //             return "D";
      //           }
      //           return "";
      //         },
      //       },
      //       title: {
      //         offsetCenter: [0, "-20%"],
      //         fontSize: 16,
      //       },
      //       detail: {
      //         fontSize: 24,
      //         offsetCenter: [0, "0%"],
      //         valueAnimation: true,
      //         formatter: function (value) {
      //           return Math.round(value * 100) + "%";
      //         },
      //         color: "auto",
      //       },
      //       data: res.series[0].data,
      //     },
      //   ],
      // };
      // myChart.setOptiothis.chartData1n(option);
    },

    // 获取性别比
    async sexRatio() {
      let res = await network.getCompetitionSexRatio({
        data: {
          schoolCode: this.schoolcolCodeID,
          beginYear: this.sexDate.beginTime,
          endYear: this.sexDate.endTime,
        },
      });
      if (res == "error") return;
      this.chartData1.days = res.yaxis.data;
      this.chartData1.data1 = res.series[0].data;
    },
    // 专业贡献度
    async CompetitionSchoolViewMajorInfo() {
      try {
        let res = await network.getCompetitionSchoolViewMajorInfo({
          data: {
            schoolCode: this.schoolcolCodeID,
            beginYear: this.majorDate.beginTime,
            endYear: this.majorDate.endTime,
          },
        });

        console.log('专业贡献度', res);
        if (res == "error") relativeTimeRounding;
        this.barChartData4.days = res.xaxis.data;
        this.barChartData4.data1 = res.series[0].data;
      } catch (err) {
        console.log(err, '34234234242');

      }

    },
    //  竞赛年均得分
    async competitionAverageAward() {
      let res = await network.getCompetitionAvgYearInfo({
        data: {
          schoolCode: this.schoolcolCodeID,
          beginYear: this.professionDate.beginTime,
          endYear: this.professionDate.endTime,
        },
      });
      this.RadarChartData2 = res
      if (res == "error" || res.radar.indicator.length < 1) return;
      let yearList = this.yearList;
      let myChart = echarts.init(document.getElementById("square"));
      var option = {
        tooltip: {
          confine: true,
          trigger: 'item',
        },
        radar: {
          shape: "square", //设置雷达图形状，值有circle、square,默认为方形
          splitNumber: 5, // 雷达图圈数设置
          indicator: res.radar.indicator,

          axisName: {
            formatter: '【{value}】',
            color: '#428BD4',
            padding: [10, 20]
          },
          splitArea: {
            areaStyle: {
              color: ['#74a0fa', '#ec7e64', '#f6da61', '#7785a0'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          axisLine: {
            // 设置雷达图中间射线的颜色
            lineStyle: {
              color: "#d2d2d2",
            },
          },
          splitLine: {
            //网格颜色设置
            show: true,
            lineStyle: {
              width: 1,
              color: "#e4e8f2",
            },
          },
          name: {
            //修改indicator文字的颜色
            textStyle: {
              color: "#fff",
              padding: [6, 20],
              backgroundColor: "#666666",
              textAlign: "center",
              borderRadius: 4,
              lineHeight: 11,
              fontSize: "14",
            },
          },
        },
        series: [
          {
            name: "受理渠道分类",
            type: "radar",
            symbol: "circle", // 单个数值点的样式，还可以取值'rect','angle'等
            symbolSize: 6, // 数值点的大小
            data: res.series[0].data,
            tooltip: {
              show: true,
              trigger: 'item',
            }
          },
        ],
      };
      myChart.setOption(option);
    },
    // 本省高校排名
    async ProvinceRankInfo() {
      let year = "";
      if (this.schooltime.yearType == "1") {
        year = this.schooltime.oneTime;
      } else {
        year = this.schooltime.fiveTime1 + "-" + this.schooltime.fiveTime2;
      }
      let res = await network.getProvinceRankInfo({
        data: {
          schoolCode: this.schoolcolCodeID,
          year: year,
          yearType: this.schooltime.yearType,
        },
      });
      console.log('本省高校', res);

      if (res == "error") return;

      this.chartData2 = res;
      this.chartData2.series[0].data.reverse()
      this.chartData2.yaxis.data.reverse()
      // console.log(this.chartData2,'this.chartData223232323');

    },
    // 同类型高校排名
    async sameTypeSchoolRankInfo() {
      let year = "";
      if (this.schooltime1.yearType == "1") {
        year = this.schooltime1.oneTime;
      } else {
        year = this.schooltime1.fiveTime1 + "-" + this.schooltime1.fiveTime2;
      }
      let res = await network.getSameTypeSchoolRankInfo({
        data: {
          schoolCode: this.schoolcolCodeID,
          year: year,
          yearType: this.schooltime1.yearType,
        },
      });
      if (res == "error") return;
      this.chartData31 = res;
      this.chartData31.series[0].data.reverse()
      this.chartData31.yaxis.data.reverse()
      // console.log(this.chartData31,'chartData31');

    },
    async changeradio1() {
      if (this.schooltime1.yearType == "1") {
        this.schooltime1.fiveTime2 = "";
        this.schooltime1.fiveTime1 = "";
      } else {
        this.schooltime1.oneTime = "";
        if (this.schooltime1.fiveTime1 == "") {
          this.schooltime1.fiveTime1 = "2017";
        }
        this.schooltime1.fiveTime2 = (
          this.schooltime1.fiveTime1 -
          0 +
          4
        ).toString();
      }
      this.sameTypeSchoolRankInfo();
    },
    async changeradio() {
      if (this.schooltime.yearType == "1") {
        this.schooltime.fiveTime2 = "";
        this.schooltime.fiveTime1 = "";
      } else {
        this.schooltime.oneTime = "";
        if (this.schooltime.fiveTime1 == "") {
          this.schooltime.fiveTime1 = "2017";
        }
        this.schooltime.fiveTime2 = (
          this.schooltime.fiveTime1 - 0 + 4
        ).toString();
      }
      this.ProvinceRankInfo();
    },

    // 去竞赛画像页面
    toPortrait(competitionId) {
      this.$store.commit("toPortraitStorePath", "/admin/compic");
      this.$router.push({
        path: "/admin/compic",
        query: {competitionId: competitionId},
      });
    },
    handleCurrentChange(val) {
      this.pageNums = val;
      this.getList();
    },

    // 筛选
    onSubmit() {
      this.shcoollist();
      this.howmatch(1);
      this.getList();
      var a = Math.floor(Math.random() * 100 + 1)
      if (a < 80) {
        a = 80 + Math.floor(Math.random() * 10 + 1)
      }
      this.num = a
      //  获奖贡献度
      this.awardContribution();
      //  获取性别比
      this.sexRatio();
      //  专业贡献度
      this.CompetitionSchoolViewMajorInfo();
      // 本省高校排名
      this.ProvinceRankInfo();
      this.getcontribution();
      this.competitionAverageAward();
      this.competitionAttend();
    },
    onAwardNumSubmit() {
      this.getList();
    },
    onCompetitionContributeSubmit() {
      //  竞赛贡献度
      this.getcontribution();
    },
    onSexSubmit() {
      //性别比
      this.sexRatio();
    },
    onCompetitionAttendSubmit() {
      // 榜单国赛参与率
      this.competitionAttend();
    },
    onProfessionSubmit() {
      //  专业贡献度
      this.CompetitionSchoolViewMajorInfo();
    },
    onCompetitionAwardSubmit() {
      this.competitionAverageAward();
    }
  },
};
</script>

<style scoped>
.home {
  margin-top: 100px;
  overflow: hidden;
  width: 95.5%;
}

.square {
  width: 12px;
  height: 12px;
  margin-right: 5px;
  background: #ffffff;
  border-radius: 2px;
  display: inline-block;
  border: 1px solid #1890ff;
  position: relative;
  font-size: 10px;
  line-height: 13px;
  overflow: hidden;
}

.squarecurrent {
  background-color: #1890ff;
}

.sex {
  display: flex;
}

.sex-column {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.circularcurrent::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 9px;
  background-color: #1890ff;
  height: 8px;
  border-radius: 50%;
}

.circular {
  position: relative;
  width: 13px;
  margin-right: 5px;
  display: inline-block;
  height: 12px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #1890ff;
}

.smallList {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
}

.smallList > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
}

.list {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.rightTop {
  padding: 15px;
  background: #fff;
  height: 48%;
  margin-bottom: 4%;
  box-sizing: border-box;
}

.rightDown {
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
  height: 48%;
}

.center .left {
  background-color: #fff;
  width: 56%;
  /* padding: 15px; */
  height: 564px;
  box-sizing: border-box;
}

.center .right {
  width: 33%;
}

.comleixing {
  background: rgb(241, 113, 96);
  background: #eaae4c;
  padding: 1px 10px;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  margin-right: 15px;
}

.table_box_icon {
  display: inline-block;
  background: #4ca0e9;
  padding: 2px 3px;
  font-size: 14px;
  margin-left: 15px;
  margin-right: 5px;
  border-radius: 5px;
  color: #fff;
}

.table_box {
  text-align: left;
  width: 50%;
  padding: 13px 0;
  display: flex;
  justify-content: space-around;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
}

.el-radio {
  margin-right: 10px;
  margin-left: 10px;
}

.table {
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  flex-wrap: wrap;
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

.contents {
  background: #fff;
  margin-top: 15px;
  padding: 15px;
  width: 98%;
  box-shadow: 0 2px 4px 0 rgb(210 207 207 / 50%);
}

.contents1 {
  background: #fff;
  margin-top: 15px;
  padding: 15px;
  padding-left: 0;
  width: 98%;
  box-shadow: 0 2px 4px 0 rgb(210 207 207 / 50%);
}

.center {
  width: 100%;
  margin-right: 0;
  display: flex;
  justify-content: center;
}

.title .pic {
  font-size: 16px;
  font-weight: 400;
  color: #0078e1;
  display: flex;
  justify-content: space-between;
  margin-right: 15px;
  cursor: pointer;
}

.title1 .pic {
  font-size: 16px;
  font-weight: 400;
  color: #0078e1;
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

.title1 {
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

.sear {
  position: relative;
}

.serach-input {
  position: absolute;
  left: 500px;
  top: -34px;
}

.title .small {
  font-size: 14px;
  color: #999999;
  display: inline-block;
  margin-left: 20px;
  font-weight: 400;
}

.title1 .small {
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

.title1::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 18px;
  width: 4px;
  height: 22px;
  background-color: #0078e1;
}

.forms {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.head_down {
  text-align-last: left;
  margin-top: 10px;
}

.tabs {
  font-size: 14px;
  padding: 3px 10px;
  background-color: #edeef0;
  margin: 0 10px;
  border-radius: 2px;
  min-width: 78px;
}

.head_title {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 2px;
}

.head {
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgb(210 207 207 / 50%);
}

.head_top {
  display: flex;
  justify-content: left;
  align-items: center;
}

#yibiao {
  width: 150% !important;
  height: 150%;
  margin: 0px;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.el-pagination {
  margin: 0 auto;
}

.qrImg {
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 44;
  /* margin-bottom: 3800px; */
}

.qrImg img {
  width: 220px;
  height: 217px;
}

.right1 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(https://web.moocollege.com/mooc/hzq/competition/home/bgRightSix.png);
  background-repeat: no-repeat;
  background-size: 100%, 100%;
  -webkit-background-size: 100%, 100%;
  -o-background-size: 100%, 100%;
  background-position: center 0;
  z-index: 22;
  font-weight: 700;
  overflow: hidden;
}

.model {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 33;
  background: #fff;
}
</style>
