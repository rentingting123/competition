<template>
  <div class="mark">
    <Column
      title1="参赛TOP20高校"
      title2="参赛团队数量高校TOP20"
      :chartData="barChartData"
      :showStatus="topSchool"
    ></Column>
    <Column
      title1="参赛TOP20专业"
      title2=""
      :chartData="barChartData1"
      :showStatus="topMajor"
    ></Column>
    <Columns
      title1="获奖TOP20高校"
      title2=""
      :chartData="barChartData2"
      :showStatus="topAwardSchool"
    ></Columns>
    <Column
      title1="获奖TOP20专业"
      title2=""
      :chartData="barChartData3"
      :showStatus="topAwardMajor"
    ></Column>
        <Column
          title1="获奖TOP20指导老师"
          title2=""
          :chartData="barChartData4"
          :showStatus="topAwardTeacher"
        ></Column>
  </div>
</template>

<script>
import Column from "@/views/admin/common/column";
import Columns from "@/views/admin/common/columns";
import network from "@/api/jxapi/index";

export default {
  props: ["currentCId"],
  components: {
    Column,
    Columns,
  },
  data() {
    return {
      topSchool: true,
      topMajor: true,
      topAwardSchool:true,
      topAwardMajor: true,
      topAwardTeacher:true,
      barChartData: {
        days: [],
        data1: [],
        colors: ["#278ce6"],
        title: "参赛TOP20高校",
      },
      // 参赛TOP20专业
      barChartData1: {
        days: [],
        data1: [],
        colors: ["#7685a2"],
        title: "参赛TOP20专业",
      },
      // 获奖TOP20高校
      barChartData2: {
        days: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        data5: [],
        data6: [],
        data7: [],
        data8: [],
        data9: [],
        data10: [],
        colors: ["#5B8FF6", "#5AD8A6", "#5D7092", "#F6BD16", "#E8684A", "#3EBBFF", "#409eff", "#5D7092", "#3EBBFF", "#5AD8A6"],
        titles: ["优秀奖", "一等奖", "二等奖", "三等奖", "单项奖", "教师指导奖", "组织奖", "承办奖", "秘书处", "其他奖"],
      },
      // 获奖TOP20专业
      barChartData3: {
        days: [],
        data1: [],
        colors: ["#84d1ef"],
        title: "获奖TOP20专业",
      },
      barChartData4: {
        days: [],
        data1: [],
        colors: [
          "#7685a2",
          "#f7c639",
          "#ec7e65",
          "#84d1ef",
          "#a185d2",
          "#ffaa67",
          "#46a8a7",
          "#ffa8cb",
          "#73a0fb",
          "#c7d9fd",
          "#73deb4",
          "#c7f2e1",
          "#7685a2",
          "#ccd0db",
          "#f7c639",
          "#fce9af",
          "#ec7e65",
          "#f7ccc3",
          "#7685a2",
          "#f7c639",
          "#ec7e65",
          "#84d1ef",
          "#a185d2",
          "#ffaa67",
          "#46a8a7",
          "#ffa8cb",
          "#73a0fb",
          "#c7d9fd",
          "#73deb4",
          "#c7f2e1",
          "#7685a2",
          "#ccd0db",
          "#f7c639",
          "#fce9af",
          "#ec7e65",
          "#f7ccc3",
        ],
        title: "获奖TOP20指导老师",
      }
    };
  },
  watch: {
    currentCId(val) {
      this.getList();
    },
  },
  async created() {
    this.getList();
  },
  methods: {
    async getList() {
      // 获奖TOP20专业
      let res1 = await network.getMajorAwardTop({
        data: {
          competitionId: this.currentCId,
        },
      });
      if (res1 == "error") return;
      this.barChartData3.data1 = res1.series[0].data;
      this.barChartData3.days = res1.xaxis.data;
      console.log(this.barChartData3,'this.barChartData3');

      this.topAwardMajor = this.barChartData3.days.length !== 0;
      // 参赛TOP20专业
      let res2 = await network.getMajorTeamTop({
        data: {
          competitionId: this.currentCId,
        },
      });
      if (res2 == "error") return;
      this.barChartData1.data1 = res2.series[0].data;
      this.barChartData1.days = res2.xaxis.data;
      this.topMajor = this.barChartData1.days.length !== 0;
      // 获奖TOP20高校
      let res3 = await network.getSchoolAwardTop({
        data: {
          competitionId: this.currentCId,
        },
      });
      if (res3 == "error") return;
      res3.series?.forEach((item, index) => {
        let indexa = index + 1;
        this.barChartData2["data" + indexa] = item.data;
      });
      this.barChartData2.days = res3.xaxis.data;
      this.topAwardSchool = this.barChartData2.days.length !== 0;
      // 参赛TOP20高校
      let res4 = await network.getSchoolTeamTop({
        data: {
          competitionId: this.currentCId,
        },
      });
      if (res4 == "error") return;
      res4.series.forEach((item) => {
        if (item.type == "teamNum") {
          this.barChartData.data1 = item.data;
        }
      });
      this.barChartData.days = res4.xaxis.data;
      this.topSchool = this.barChartData.days.length !== 0;
      // 获奖TOP20指导老师
      let res5 = await network.getTeacherAwardTop({
        data: {
          competitionId: this.currentCId,
        },
      });
      if (res5 == "error") return;
      this.barChartData4.days = res5.xaxis.data;
      res5.series.forEach((item) => {
        if (item.type == "award_count") {
          this.barChartData4.data1 = item.data;
        }
      });
      this.topAwardTeacher = this.barChartData4.days.length !== 0;
    },
  },
};
</script>

<style scoped>
.current {
  background-color: #409eff !important;
  color: #fff;
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

.content1 {
  padding: 15px;
  height: 550px;
  background: #fff;
  margin-bottom: 20px;
}
</style>
