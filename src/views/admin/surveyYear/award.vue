<template>
  <div>
    <competecolumn title1="竞赛概况" :chartData="chartData2"></competecolumn>
    <barCharts title1="获奖团队高校TOP20" :chartData="chartData3"></barCharts>
    <barChart title1="获奖专业TOP20" :chartData="chartData1"></barChart>
  </div>
</template>

<script>
import network from "@@/api/jxapi";
import barChart from "@/views/admin/common/barChart";
import barCharts from "@/views/admin/common/barCharts";
import competecolumn from "@/views/admin/common/competecolumn";

export default {
  components: {
    barChart,
    barCharts,
    competecolumn,
  },
  mounted() {
    this.getList()
  },
  props: ["beginYear", "endYear", "currentCId"],
  data() {
    return {
      chartData1: {
        days: [],
        data1: [],
        colors: ["#7585A2"],
        title: "获奖数量",
      },
      chartData3: {
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
        title: ["优秀奖", "一等奖", "二等奖", "三等奖", "其他奖", "单项奖", "教师指导奖", "组织奖", "承办", "秘书处"],
      },
      chartData2: {
        days: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
      },

    };
  },
  methods: {
    async getList() {
      // 竞赛概况
      let res = await network.competitionAwardData({
        data: {
          competitionName: this.$route.query.compicName,
          beginYear: this.beginYear,
          endYear: this.endYear,
        },
      });

      if (res == "error") return;

      console.log(res);
      this.chartData2.days = res.xaxis.data || undefined;

      res.series.forEach((item, index) => {
        let indexa = index + 1;
        this.chartData2["data" + indexa] = item.data;
      });
      //获奖高校top20
      let res3 = await network.getHistoryAwardTop({
        data: {
          competitionName: this.$route.query.compicName,
          beginYear: this.beginYear,
          endYear: this.endYear,
        },
      });
      if (res3 == "error") return;
      this.chartData3.days = res3.yaxis.data;
      res3.series.forEach((item, index) => {
        let indexa = index + 1;
        this.chartData3["data" + indexa] = item.data;
      });
      // 获奖专业TOP20
      let res2 = await network.getHistoryMajorAwardTop({
        data: {
          competitionName: this.$route.query.compicName,
          beginYear: this.beginYear,
          endYear: this.endYear,
        },
      });
      if (res2 == "error") return;
      this.chartData1.data1 = res2.series[0].data;
      this.chartData1.days = res2.yaxis.data;
      res2.series.forEach((item, index) => {
        let indexa = index + 1;
        this.chartData1["data" + indexa] = item.data;
      });
    },
  },
};
</script>

<style scoped>
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
  position: relative;
  padding: 15px;
  height: 550px;
  background: #fff;
  margin-bottom: 20px;
}

.content1::after {
  content: "2022";
  position: absolute;
  display: block;
  font-size: 109px;
  z-index: 2000;
  bottom: 101px;
  right: 190px;
  color: #cbe4fa;
  opacity: 0.6;
  letter-spacing: 5px;
}
</style>
